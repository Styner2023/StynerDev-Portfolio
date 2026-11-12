/**
 * Clients API Routes
 * Handles all client-related endpoints with Auth0 verification
 */

const express = require('express');
const router = express.Router();
const { checkJwt, extractUserInfo, requireUserType } = require('../middleware/auth');
const dfinity = require('../services/dfinityIntegration');
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || 'dev-yprosf8bapwtcvyi.us.auth0.com';
const AUTH0_ISSUER = process.env.AUTH0_ISSUER || `https://${AUTH0_DOMAIN}/`;

/**
 * PUBLIC ROUTE: GET /api/clients/by-dashboard/:dashboardUrl
 * Get client data by dashboard URL for public client dashboard access
 * No authentication required - explicitly set credentialsRequired: false
 */
const publicJwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  issuer: AUTH0_ISSUER,
  algorithms: ['RS256'],
  credentialsRequired: false // KEY: Don't require auth token
});

router.get('/by-dashboard/:dashboardUrl', publicJwtCheck, async (req, res) => {
  try {
    const { dashboardUrl } = req.params;
    console.log('🔓 PUBLIC: Looking for client with dashboardUrl:', dashboardUrl);

    // Get all clients and find the one with matching dashboardUrl
    const allClients = await dfinity.actor.getAllClients();
    console.log('🔓 PUBLIC: Total clients in canister:', allClients.length);

    const client = allClients.find(c => {
      // Handle both array and string formats from DFINITY
      const clientDashboardUrl = Array.isArray(c.dashboardUrl) ? c.dashboardUrl[0] : c.dashboardUrl;
      const matches = clientDashboardUrl === dashboardUrl;
      if (!matches) {
        console.log(`  Checking: "${clientDashboardUrl}" vs "${dashboardUrl}" - no match`);
      }
      return matches;
    });

    if (!client) {
      console.log('❌ PUBLIC: Client not found for dashboardUrl:', dashboardUrl);
      console.log('🔓 PUBLIC: Available dashboardUrls:');
      allClients.forEach(c => {
        const url = Array.isArray(c.dashboardUrl) ? c.dashboardUrl[0] : c.dashboardUrl;
        console.log(`  - ${url} (client: ${c.name})`);
      });
      return res.status(404).json({
        ok: false,
        error: 'Client dashboard not found',
        searchedFor: dashboardUrl
      });
    }



    // Normalize the client data (fix BigInt serialization)
    const normalizedClient = dfinity.normalizeCanisterData ? dfinity.normalizeCanisterData(client) : client;

    // Convert BigInts to numbers for JSON serialization
    const safeClient = JSON.parse(JSON.stringify(normalizedClient, (key, value) =>
      typeof value === 'bigint' ? Number(value) : value
    ));

    console.log('✅ PUBLIC: Found client:', safeClient.name, 'with', safeClient.projects?.length || 0, 'projects');

    return res.json({
      ok: true,
      data: safeClient
    });
  } catch (error) {
    console.error('❌ PUBLIC: Error fetching client by dashboard URL:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to fetch client dashboard'
    });
  }
});

// Apply authentication middleware to all OTHER routes (not the public one above)
router.use(checkJwt);
router.use(extractUserInfo);

/**
 * GET /api/clients/debug
 * Debug endpoint to see all clients in canister
 * Authorization: Developer only
 */
router.get('/debug', requireUserType('developer'), async (req, res) => {
  try {
    const { user } = req;
    const allClients = await dfinity.getAllClients();

    console.log('🔍 DEBUG: Total clients in canister:', allClients.length);
    console.log('🔍 DEBUG: Current user ID:', user.id);

    const matchingClients = allClients.filter(c => c.developerId === user.id);
    console.log('🔍 DEBUG: Matching clients for this developer:', matchingClients.length);

    return res.json({
      ok: true,
      data: {
        totalClients: allClients.length,
        currentUserId: user.id,
        matchingClients: matchingClients.length,
        allClients: allClients.map(c => ({
          id: c.id,
          name: c.name,
          developerId: c.developerId,
          matches: c.developerId === user.id
        }))
      }
    });
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to fetch debug info',
    });
  }
});

/**
 * GET /api/clients
 * Fetch all clients
 * Authorization: Developer only
 */
router.get('/', requireUserType('developer'), async (req, res) => {
  try {
    const { user } = req;

    console.log('🔍 GET /api/clients - User:', {
      id: user.id,
      developerId: user.developerId,
      sub: user.sub,
      authId: user.authId
    });

    // Use user.id as the developer ID (this comes from Auth0 sub)
    const developerId = user.id;
    console.log('🔍 Fetching clients for developerId:', developerId);

    // Wrap DFINITY call with additional error handling
    let clients = [];
    try {
      clients = await getClientsByDeveloper(developerId);
      console.log('🔍 Found clients:', clients.length);
    } catch (dfinityError) {
      console.error('❌ DFINITY error fetching clients:', dfinityError);
      // Return empty array instead of 500 error - client can retry
      return res.json({
        ok: true,
        data: [],
        warning: 'DFINITY service temporarily unavailable'
      });
    }

    // Enhanced debugging
    if (clients.length === 0) {
      console.log('⚠️ No clients found! Checking all clients in canister...');
      try {
        const allClients = await dfinity.getAllClients();
        console.log(`⚠️ Total clients in canister: ${allClients.length}`);
        if (allClients.length > 0) {
          console.log('⚠️ Developer IDs in canister:');
          allClients.forEach(c => {
            console.log(`  - ${c.name}: developerId="${c.developerId}" (matches: ${c.developerId === developerId})`);
          });
        }
      } catch (debugError) {
        console.warn('⚠️ Debug check failed:', debugError);
      }
    }

    // DEBUG: Log what we're returning
    if (clients.length > 0) {
      console.log('🔍 RETURNING CLIENTS TO FRONTEND:');
      clients.forEach((c, i) => {
        console.log(`  Client ${i + 1}:`, {
          name: c.name,
          dashboardUrl: c.dashboardUrl,
          dashboardUrlType: typeof c.dashboardUrl,
          dashboardUrlIsArray: Array.isArray(c.dashboardUrl),
          projectsCount: c.projects?.length || 0,
          projectsType: typeof c.projects,
          firstProjectType: c.projects?.[0] ? typeof c.projects[0] : 'none'
        });
      });
    }

    return res.json({
      ok: true,
      data: clients,
    });
  } catch (error) {
    console.error('❌ Error fetching clients:', error);
    // Log full error for debugging
    console.error('❌ Error stack:', error.stack);
    return res.status(500).json({
      ok: false,
      error: 'Failed to fetch clients',
      message: error.message || 'Unknown error'
    });
  }
});

/**
 * GET /api/clients/:id
 * Get a single client by ID
 * Authorization: Developer must own the client
 */
router.get('/:id', requireUserType('developer'), async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;

    // TODO: Call DFINITY to get client
    const client = await getClientById(id);

    if (!client) {
      return res.status(404).json({
        ok: false,
        error: 'Client not found',
      });
    }

    // Verify ownership
    if (client.developerId !== user.developerId && client.developerId !== user.id) {
      return res.status(403).json({
        ok: false,
        error: 'Access denied to this client',
      });
    }

    return res.json({
      ok: true,
      data: client,
    });
  } catch (error) {
    console.error('Error fetching client:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to fetch client',
    });
  }
});

/**
 * POST /api/clients
 * Create a new client with invitation
 * Authorization: Developer only
 */
router.post('/', requireUserType('developer'), async (req, res) => {
  const startTime = Date.now();
  console.log('🔄 POST /api/clients - Starting client creation...');
  
  // CRITICAL: Hard timeout wrapper to prevent hanging requests
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Backend timeout after 90 seconds')), 90000)
  );
  
  const operationPromise = (async () => {
  try {
    const { user } = req;
    const { email, name, dashboardUrl, websiteUrl, originalWebsiteUrl, category, projects, phone, contactPerson, profileImage } = req.body;

    // Validate required fields
    if (!email || !name) {
      return res.status(400).json({
        ok: false,
        error: 'Email and name are required',
      });
    }

    // Generate invitation token and client ID
    const invitationToken = generateInvitationToken();
    const clientId = `client_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const projectId = `project_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const developerId = user.id; // Use Auth0 sub as developer ID

    // Use provided originalWebsiteUrl or extract from projects if available
    const finalOriginalWebsiteUrl = originalWebsiteUrl || (projects && projects.length > 0 ? projects[0].url : null);

    // Ensure dashboardUrl is always set with proper fallback
    const finalDashboardUrl = dashboardUrl ||
      name.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Remove special characters
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .concat('-dashboard') ||
      `client-${clientId}-dashboard`; // Ultimate fallback

    console.log('🔍 POST /api/clients - Creating client:', {
      clientId,
      projectId,
      developerId,
      userId: user.id,
      userDeveloperId: user.developerId,
      websiteUrl: websiteUrl, // This is the thumbnail
      originalWebsiteUrl: finalOriginalWebsiteUrl, // This is the actual website
      dashboardUrl: finalDashboardUrl,
      websiteProjectsCount: projects?.length || 0
    });

    // ✅ STEP 1: Create the dashboard project FIRST
    const dashboardProjectData = {
      id: projectId,
      name: `${name}'s Dashboard`,
      url: finalDashboardUrl,
      clientDashboardUrl: finalDashboardUrl,
      clientId: clientId,
      developerId: developerId,
      projectType: 'client-dashboard',
      status: 'active',
      type: 'client-dashboard',
      createdAt: new Date().toISOString(),
    };

    // ✅ SAVE DASHBOARD PROJECT TO DFINITY
    console.log('💾 Saving dashboard project to DFINITY...');
    const createdProject = await dfinity.createProject(dashboardProjectData);
    console.log('✅ Dashboard project saved to DFINITY:', createdProject.id);

    // ✅ STEP 2: Create all website projects BEFORE creating the client
    // CRITICAL: Keep dashboard project separate - it's metadata, not a website card
    const allProjectIds = [projectId]; // Dashboard project (for metadata only)
    const websiteProjectIds = []; // ONLY website projects (these become cards)
    
    if (projects && Array.isArray(projects) && projects.length > 0) {
      console.log(`🔍 Creating ${projects.length} website projects in parallel...`);
      const projectCreationPromises = projects.map(async (proj) => {
        const webProjectId = `project_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        
        // ✅ Upload base64 thumbnails to DFINITY blob storage
        let finalThumbnail = proj.thumbnail;
        
        if (finalThumbnail && finalThumbnail.startsWith('data:image/')) {
          // Base64 thumbnail - upload to DFINITY
          try {
            const base64WithoutPrefix = finalThumbnail.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64WithoutPrefix, 'base64');
            const assetId = `thumbnail_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
            
            console.log(`📤 Uploading base64 thumbnail to DFINITY: ${assetId} (${buffer.length} bytes)`);
            await dfinity.uploadAsset(assetId, buffer, 'image/png', proj.name || 'thumbnail', developerId);
            
            finalThumbnail = `/api/thumbnail/${assetId}`;
            console.log(`✅ Thumbnail uploaded, using URL: ${finalThumbnail}`);
          } catch (uploadError) {
            console.error('❌ Failed to upload thumbnail:', uploadError);
            finalThumbnail = null; // Will use fallback
          }
        }
        
        // Fallback if no thumbnail
        if (!finalThumbnail) {
          finalThumbnail = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/assets/images/default-thumbnail.svg`;
        }
        
        const webProjectData = {
          id: webProjectId,
          name: proj.name,
          url: proj.url,
          adminUrl: proj.adminUrl || null,
          thumbnail: finalThumbnail, // ✅ Always has a thumbnail now
          clientId: clientId,
          developerId: developerId,
          projectType: proj.type || 'ui',
          type: proj.type || 'ui',
          status: 'active',
          createdAt: new Date().toISOString(),
        };
        
        console.log(`🔍 Creating website project ${webProjectId}:`, {
          name: proj.name,
          url: proj.url,
          hasThumbnail: !!proj.thumbnail,
          thumbnailLength: proj.thumbnail?.length,
          usingPlaceholder: !proj.thumbnail
        });
        
        // ✅ SAVE TO DFINITY
        console.log(`💾 Saving website project to DFINITY: ${webProjectId}`);
        await dfinity.createProject(webProjectData);
        console.log(`✅ Website project saved to DFINITY: ${webProjectId}`);
        return webProjectId;
      });
      
      // Wait for all projects to be created in parallel
      const createdWebProjectIds = await Promise.all(projectCreationPromises);
      allProjectIds.push(...createdWebProjectIds);
      websiteProjectIds.push(...createdWebProjectIds);
    }

    console.log('🔍 Total projects created:', allProjectIds.length);
    console.log('🔍 Website projects (for cards):', websiteProjectIds.length);

    // ✅ STEP 3: Now create client with ONLY WEBSITE project IDs
    // CRITICAL: Use websiteProjectIds, NOT allProjectIds
    // The dashboard project is metadata and should NOT appear as a card
    const clientData = {
      id: clientId,
      email,
      name,
      phone: phone || null,
      contactPerson: contactPerson || null,
      profileImage: profileImage || null,
      websiteUrl: websiteUrl || null,
      originalWebsiteUrl: finalOriginalWebsiteUrl || null,
      dashboardUrl: finalDashboardUrl,
      category: category || null,
      developerId: developerId,
      invitationToken,
      status: 'invited',
      projects: websiteProjectIds, // ✅ ONLY website projects (NOT dashboard project)
      createdAt: new Date().toISOString(),
      // Initialize collaboration metrics
      metrics: {
        totalActionItems: 0,
        completedActionItems: 0,
        averageResponseTimeHours: 0,
        responseHistory: [],
        totalRatingsSubmitted: 0,
        totalFeedbackSubmitted: 0,
        dashboardVisits: 0,
        lastVisit: null,
        googleFormsSubmitted: 0,
        googleFormsCompleted: 0
      },
      collaborationScore: {
        overall: 100,
        taskCompletion: 100,
        responseTime: 100,
        requirementsQuality: 100,
        engagement: 0,
        lastCalculated: new Date().toISOString()
      }
    };

    // ✅ SAVE CLIENT TO DFINITY
    console.log('💾 Saving client to DFINITY canister...');
    const createdClient = await dfinity.createClient(clientData);
    console.log('✅ Client saved to DFINITY:', createdClient.id);

    // Send invitation email
    await sendInvitationEmail(email, name, invitationToken);

    const totalTime = Date.now() - startTime;
    console.log(`✅ Client creation completed in ${totalTime}ms`);

    return res.status(201).json({
      ok: true,
      data: {
        client: createdClient,
        dashboardProject: createdProject,
        dashboardUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/client-dashboard/${finalDashboardUrl}`,
      },
    });
  } catch (error) {
    const totalTime = Date.now() - startTime;
    console.error(`❌ Error creating client after ${totalTime}ms:`, error);
    console.error('❌ Error stack:', error.stack);
    console.error('❌ Error message:', error.message);
    
    // Check if it's a timeout error
    if (error.message?.includes('timeout') || error.message?.includes('timed out')) {
      return res.status(504).json({
        ok: false,
        error: 'Request timed out. DFINITY canister may be slow or out of cycles.',
        details: error.toString(),
      });
    }
    
    return res.status(500).json({
      ok: false,
      error: `Failed to create client: ${error.message}`,
      details: error.toString(),
    });
  }
  })(); // End of operationPromise
  
  // Race between operation and timeout
  try {
    await Promise.race([operationPromise, timeoutPromise]);
  } catch (timeoutError) {
    console.error('❌ Request timed out:', timeoutError);
    if (!res.headersSent) {
      return res.status(504).json({
        ok: false,
        error: 'Request timed out after 90 seconds',
        message: 'DFINITY operations took too long. Please try again with fewer websites or simpler data.'
      });
    }
  }
});

/**
 * PATCH /api/clients/:id
 * Update a client
 * Authorization: Developer must own the client
 */
router.patch('/:id', requireUserType('developer'), async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const updates = req.body;

    // TODO: Call DFINITY to verify ownership and update
    const client = await getClientById(id);

    if (!client) {
      return res.status(404).json({
        ok: false,
        error: 'Client not found',
      });
    }

    // Verify ownership
    if (client.developerId !== user.developerId && client.developerId !== user.id) {
      return res.status(403).json({
        ok: false,
        error: 'You do not have permission to update this client',
      });
    }

    // Update client
    const updatedClient = await updateClient(id, updates);

    return res.json({
      ok: true,
      data: updatedClient,
    });
  } catch (error) {
    console.error('Error updating client:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to update client',
    });
  }
});

/**
 * POST /api/clients/:id/assign-projects
 * Assign projects to a client
 * Authorization: Developer must own both the client and projects
 */
router.post('/:id/assign-projects', requireUserType('developer'), async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { projectIds } = req.body;

    if (!projectIds || !Array.isArray(projectIds)) {
      return res.status(400).json({
        ok: false,
        error: 'projectIds must be an array',
      });
    }

    // TODO: Verify client ownership
    const client = await getClientById(id);

    if (!client) {
      return res.status(404).json({
        ok: false,
        error: 'Client not found',
      });
    }

    if (client.developerId !== user.developerId && client.developerId !== user.id) {
      return res.status(403).json({
        ok: false,
        error: 'You do not have permission to modify this client',
      });
    }

    // TODO: Verify all projects belong to this developer
    // TODO: Call DFINITY to assign projects
    const updatedClient = await assignProjectsToClient(id, projectIds);

    return res.json({
      ok: true,
      data: updatedClient,
    });
  } catch (error) {
    console.error('Error assigning projects:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to assign projects',
    });
  }
});

/**
 * DELETE /api/clients/:id
 * Delete a client
 * Authorization: Developer must own the client
 */
router.delete('/:id', requireUserType('developer'), async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;

    // TODO: Call DFINITY to verify ownership and delete
    const client = await getClientById(id);

    if (!client) {
      return res.status(404).json({
        ok: false,
        error: 'Client not found',
      });
    }

    // Verify ownership
    if (client.developerId !== user.developerId && client.developerId !== user.id) {
      return res.status(403).json({
        ok: false,
        error: 'You do not have permission to delete this client',
      });
    }

    // Delete client
    await deleteClient(id);

    return res.json({
      ok: true,
      data: { message: 'Client deleted successfully' },
    });
  } catch (error) {
    console.error('Error deleting client:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to delete client',
    });
  }
});



// ============================================
// DFINITY Integration Functions
// ============================================

async function getClientsByDeveloper(developerId) {
  const clients = await dfinity.getClientsByDeveloper(developerId);
  // Filter already done in dfinity service
  return clients;
}

async function getClientById(clientId) {
  const client = await dfinity.getClientById(clientId);
  // Filter already done in dfinity service
  return client;
}

async function createClient(clientData) {
  return await dfinity.createClient(clientData);
}

async function createProject(projectData) {
  return await dfinity.createProject(projectData);
}

async function updateClient(clientId, updates) {
  return await dfinity.updateClient(clientId, updates);
}

async function assignProjectsToClient(clientId, projectIds) {
  return await dfinity.assignProjectsToClient(clientId, projectIds);
}

async function deleteClient(clientId) {
  return await dfinity.deleteClient(clientId);
}

// ============================================
// Helper Functions
// ============================================

function generateInvitationToken() {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}

async function sendInvitationEmail(email, name, token) {
  // TODO: Implement email service (SendGrid, AWS SES, etc.)
  console.log(`Invitation email would be sent to ${email} with token: ${token}`);
  const inviteUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/client-sign-up?invite=${token}`;
  console.log(`Invite URL: ${inviteUrl}`);
}

module.exports = router;
