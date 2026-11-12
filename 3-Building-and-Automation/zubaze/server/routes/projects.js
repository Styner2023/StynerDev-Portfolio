/**
 * Projects API Routes
 * Handles all project-related endpoints with Auth0 verification
 */

const express = require('express');
const router = express.Router();
const { checkJwt, extractUserInfo, requireUserType } = require('../middleware/auth');
const dfinity = require('../services/dfinityIntegration');

// Apply authentication middleware to all routes
router.use(checkJwt);
router.use(extractUserInfo);

/**
 * GET /api/projects
 * Fetch all projects scoped by user type
 * - Developers: Get projects they created
 * - Clients: Get projects assigned to them
 */
router.get('/', async (req, res) => {
  try {
    const { user } = req;
    
    console.log('🔍 GET /api/projects - User:', {
      id: user.id,
      developerId: user.developerId,
      userType: user.userType
    });
    
    if (user.userType === 'developer') {
      const developerId = user.id;
      console.log('🔍 Fetching projects for developerId:', developerId);
      
      const projects = await getProjectsByDeveloper(developerId);
      console.log('🔍 Found projects:', projects.length);
      
      return res.json({
        ok: true,
        data: projects,
      });
    } else if (user.userType === 'client') {
      // Call DFINITY: getProjectsByClient(user.clientId)
      const projects = await getProjectsByClient(user.clientId || user.id);
      
      return res.json({
        ok: true,
        data: projects,
      });
    }
    
    return res.status(403).json({
      ok: false,
      error: 'Invalid user type',
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to fetch projects',
    });
  }
});

/**
 * GET /api/projects/:id
 * Get a single project by ID
 * Authorization: User must have access to the project
 */
router.get('/:id', async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    
    // TODO: Call DFINITY to get project and verify access
    const project = await getProjectById(id);
    
    if (!project) {
      return res.status(404).json({
        ok: false,
        error: 'Project not found',
      });
    }
    
    // Verify access
    const hasAccess = 
      (user.userType === 'developer' && project.developerId === user.developerId) ||
      (user.userType === 'client' && project.clientId === user.clientId);
    
    if (!hasAccess) {
      return res.status(403).json({
        ok: false,
        error: 'Access denied to this project',
      });
    }
    
    return res.json({
      ok: true,
      data: project,
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to fetch project',
    });
  }
});

/**
 * POST /api/projects
 * Create a new project
 * Authorization: Developer only
 */
router.post('/', requireUserType('developer'), async (req, res) => {
  try {
    const { user } = req;
    const projectData = req.body;
    
    // Validate required fields
    if (!projectData.name || !projectData.url) {
      return res.status(400).json({
        ok: false,
        error: 'Project name and URL are required',
      });
    }
    
    // Add developer ID to project
    const newProject = {
      ...projectData,
      developerId: user.developerId || user.id,
      createdAt: new Date().toISOString(),
    };
    
    // TODO: Call DFINITY to create project
    const createdProject = await createProject(newProject);
    
    return res.status(201).json({
      ok: true,
      data: createdProject,
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to create project',
    });
  }
});

/**
 * PATCH /api/projects/:id
 * Update a project
 * Authorization: Developer must own the project
 */
router.patch('/:id', requireUserType('developer'), async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const updates = req.body;
    
    // TODO: Call DFINITY to verify ownership and update
    const project = await getProjectById(id);
    
    if (!project) {
      return res.status(404).json({
        ok: false,
        error: 'Project not found',
      });
    }
    
    // Verify ownership
    if (project.developerId !== user.developerId && project.developerId !== user.id) {
      return res.status(403).json({
        ok: false,
        error: 'You do not have permission to update this project',
      });
    }
    
    // Update project
    const updatedProject = await updateProject(id, updates);
    
    return res.json({
      ok: true,
      data: updatedProject,
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to update project',
    });
  }
});

/**
 * DELETE /api/projects/:id
 * Delete a project
 * Authorization: Developer must own the project
 */
router.delete('/:id', requireUserType('developer'), async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    
    // TODO: Call DFINITY to verify ownership and delete
    const project = await getProjectById(id);
    
    if (!project) {
      return res.status(404).json({
        ok: false,
        error: 'Project not found',
      });
    }
    
    // Verify ownership
    if (project.developerId !== user.developerId && project.developerId !== user.id) {
      return res.status(403).json({
        ok: false,
        error: 'You do not have permission to delete this project',
      });
    }
    
    // Delete project
    await deleteProject(id);
    
    return res.json({
      ok: true,
      data: { message: 'Project deleted successfully' },
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to delete project',
    });
  }
});

// ============================================
// DFINITY Integration Functions
// ============================================

async function getProjectsByDeveloper(developerId) {
  return await dfinity.getProjectsByDeveloper(developerId);
}

async function getProjectsByClient(clientId) {
  const client = await dfinity.getClientById(clientId);
  if (!client) {
    console.log(`⚠️ Client ${clientId} not found - returning empty projects`);
    return [];
  }
  return await dfinity.getProjectsByClient(clientId);
}

async function getProjectById(projectId) {
  return await dfinity.getProjectById(projectId);
}

async function createProject(projectData) {
  return await dfinity.createProject(projectData);
}

async function updateProject(projectId, updates) {
  return await dfinity.updateProject(projectId, updates);
}

async function deleteProject(projectId) {
  console.log('🗑️ Deleting project:', projectId);
  // Note: Canister may not have deleteProject method - update to archived status
  return await dfinity.updateProject(projectId, { status: 'archived' });
}

module.exports = router;
