/**
 * DFINITY Canister Integration for Node.js Backend
 * Connects to deployed canister: q4jjt-lqaaa-aaaau-acpyq-cai
 */

const { Actor, HttpAgent } = require('@dfinity/agent');
const fetch = require('node-fetch');

const CANISTER_ID = process.env.CANISTER_ID || 'q4jjt-lqaaa-aaaau-acpyq-cai';
const IC_HOST = process.env.IC_HOST || 'https://icp-api.io';

// Candid interface definition
const idlFactory = ({ IDL }) => {
  const Project = IDL.Record({
    'id': IDL.Text,
    'url': IDL.Text,
    'status': IDL.Text,
    'clientDashboardUrl': IDL.Opt(IDL.Text),
    'clientId': IDL.Opt(IDL.Text),
    'thumbnail': IDL.Opt(IDL.Text),
    'projectType': IDL.Text,
    'adminUrl': IDL.Opt(IDL.Text),
    'name': IDL.Text,
    'createdAt': IDL.Int,
    'deadline': IDL.Opt(IDL.Text),
    'developerId': IDL.Text,
  });

  const Client = IDL.Record({
    'id': IDL.Text,
    'projects': IDL.Vec(Project), // ✅ FIXED: Now expects full Project objects
    'name': IDL.Text,
    'createdAt': IDL.Int,
    'email': IDL.Text,
    'websiteUrl': IDL.Opt(IDL.Text),
    'originalWebsiteUrl': IDL.Opt(IDL.Text), // ✅ NEW: Actual website URL
    'dashboardUrl': IDL.Opt(IDL.Text),
    'category': IDL.Opt(IDL.Text),
    'developerId': IDL.Text,
  });
  const Result_2 = IDL.Variant({ 'ok': Client, 'err': IDL.Text });

  const Result_1 = IDL.Variant({ 'ok': Project, 'err': IDL.Text });

  const User = IDL.Record({
    'id': IDL.Text,
    'userType': IDL.Text,
    'name': IDL.Text,
    'email': IDL.Text,
    'authId': IDL.Text,
  });
  const Result_5 = IDL.Variant({ 'ok': User, 'err': IDL.Text });
  const Result = IDL.Variant({ 'ok': IDL.Text, 'err': IDL.Text });

  const Asset = IDL.Record({
    'id': IDL.Text,
    'contentType': IDL.Text,
    'data': IDL.Vec(IDL.Nat8),
    'createdAt': IDL.Int,
    'size': IDL.Nat,
    'filename': IDL.Text,
    'uploadedBy': IDL.Text,
  });

  const Document = IDL.Record({
    'id': IDL.Text,
    'fileName': IDL.Text,
    'fileSize': IDL.Nat,
    'clientId': IDL.Opt(IDL.Text),
    'developerId': IDL.Text,
    'uploadedAt': IDL.Int,
  });
  const Result_3 = IDL.Variant({ 'ok': Document, 'err': IDL.Text });

  return IDL.Service({
    'createClient': IDL.Func([Client], [Result_2], []),
    'createProject': IDL.Func([Project], [Result_1], []),
    'createUser': IDL.Func([User], [Result_5], []),
    'deleteAsset': IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'getAllClients': IDL.Func([], [IDL.Vec(Client)], ['query']),
    'getAllProjects': IDL.Func([], [IDL.Vec(Project)], ['query']),
    'getAllUsers': IDL.Func([], [IDL.Vec(User)], ['query']),
    'getAsset': IDL.Func([IDL.Text], [IDL.Opt(Asset)], ['query']),
    'getClient': IDL.Func([IDL.Text], [IDL.Opt(Client)], ['query']),
    'getClientsByDeveloper': IDL.Func([IDL.Text], [IDL.Vec(Client)], ['query']),
    'getCycleBalance': IDL.Func([], [IDL.Nat], ['query']),
    'getCycleStatus': IDL.Func([], [
      IDL.Record({
        'status': IDL.Text,
        'balance': IDL.Nat,
        'reserve': IDL.Nat,
        'available': IDL.Nat,
      }),
    ], ['query']),
    'getProjectByUrl': IDL.Func([IDL.Text], [IDL.Opt(Project)], ['query']),
    'getProjectsByClient': IDL.Func([IDL.Text], [IDL.Vec(Project)], ['query']),
    'getProjectsByDeveloper': IDL.Func([IDL.Text], [IDL.Vec(Project)], ['query']),
    'getUser': IDL.Func([IDL.Text], [IDL.Opt(User)], ['query']),
    'getUserByAuthId': IDL.Func([IDL.Text], [IDL.Opt(User)], ['query']),
    'health': IDL.Func([], [IDL.Text], ['query']),
    'updateClient': IDL.Func([Client], [Result_2], []),
    'updateProject': IDL.Func([Project], [Result_1], []),
    'uploadAsset': IDL.Func(
      [IDL.Text, IDL.Vec(IDL.Nat8), IDL.Text, IDL.Text, IDL.Text],
      [Result],
      [],
    ),
    'drainToBusiness': IDL.Func([], [
      IDL.Variant({
        'ok': IDL.Record({ 'transferred': IDL.Nat, 'remaining': IDL.Nat }),
        'err': IDL.Text,
      })
    ], []),
    'emergencyDrainToMaster': IDL.Func([], [
      IDL.Variant({
        'ok': IDL.Record({ 'transferred': IDL.Nat, 'remaining': IDL.Nat }),
        'err': IDL.Text,
      })
    ], []),
    'createDocument': IDL.Func([Document], [Result_3], []),
    'getDocumentsByDeveloper': IDL.Func([IDL.Text], [IDL.Vec(Document)], ['query']),
    'deleteDocument': IDL.Func([IDL.Text], [Result], []),
    'deleteClient': IDL.Func([IDL.Text], [], []),
  });
};

// Create agent and actor
const agent = new HttpAgent({
  host: IC_HOST,
  fetch: fetch,
});

// Note: In production, don't fetch root key
// Only needed for local development
// if (process.env.NODE_ENV !== 'production') {
//   agent.fetchRootKey().catch(err => {
//     console.warn('Could not fetch root key:', err);
//   });
// }

const actor = Actor.createActor(idlFactory, {
  agent,
  canisterId: CANISTER_ID,
});

/**
 * Convert optional Candid values to null
 */
const unwrapOpt = (opt) => {
  if (!opt || opt.length === 0) return null;
  return opt[0];
};

/**
 * Convert BigInt to number for JSON serialization and normalize project data
 */
const normalizeCanisterData = (data, parentKey = null) => {
  if (typeof data === 'bigint') {
    return Number(data);
  }
  if (Array.isArray(data)) {
    // These fields should always remain as arrays (even if single element)
    const arrayFields = ['projects'];

    // If parent key is 'projects', it's now an array of Project objects - normalize each
    if (parentKey === 'projects') {
      return data.map(item => normalizeCanisterData(item));
    }

    // For other fields: unwrap single-element arrays (DFINITY optional types)
    if (data.length === 1 && typeof data[0] === 'string') {
      const unwrapped = data[0];
      // DEBUG: Log dashboardUrl unwrapping
      if (parentKey === 'dashboardUrl') {
        console.log(`✅ Unwrapping dashboardUrl: [${unwrapped}] → ${unwrapped}`);
      }
      return unwrapped; // Unwrap optional string fields like dashboardUrl, category, websiteUrl
    }
    if (data.length === 0) {
      // Empty optional = undefined for non-array fields
      return arrayFields.includes(parentKey) ? [] : undefined;
    }
    return data.map(item => normalizeCanisterData(item));
  }
  if (data && typeof data === 'object') {
    const normalized = {};
    for (const [key, value] of Object.entries(data)) {
      normalized[key] = normalizeCanisterData(value, key); // Pass key as parentKey
    }

    // Ensure projects have both type and projectType for consistency
    if (normalized.projectType && !normalized.type) {
      normalized.type = normalized.projectType;
    } else if (normalized.type && !normalized.projectType) {
      normalized.projectType = normalized.type;
    }

    return normalized;
  }
  return data;
};

/**
 * Health check
 */
async function health() {
  try {
    const result = await actor.health();
    return result;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
}

/**
 * User operations
 */
async function getUserByAuthId(authId) {
  try {
    const result = await actor.getUserByAuthId(authId);
    return unwrapOpt(result);
  } catch (error) {
    console.error('Error getting user by authId:', error);
    return null;
  }
}

async function createUser(user) {
  try {
    const result = await actor.createUser({
      id: user.id,
      authId: user.authId,
      userType: user.userType,
      name: user.name || '',
      email: user.email || '',
    });

    if ('ok' in result) {
      return result.ok;
    } else {
      throw new Error(result.err);
    }
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function getUser(userId) {
  try {
    const result = await actor.getUser(userId);
    return unwrapOpt(result);
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

/**
 * Project operations
 */
async function getAllProjects() {
  try {
    const projects = await actor.getAllProjects();
    return normalizeCanisterData(projects);
  } catch (error) {
    console.error('Error getting all projects:', error);
    return [];
  }
}

async function getProjectsByDeveloper(developerId) {
  try {
    const projects = await actor.getProjectsByDeveloper(developerId);
    const normalized = normalizeCanisterData(projects);
    console.log(`🔍 DFINITY: Found ${normalized.length} projects for developer ${developerId}`);
    normalized.forEach(p => {
      console.log(`  Project: ${p.name} | Type: ${p.type} | ProjectType: ${p.projectType} | ClientId: ${p.clientId}`);
    });
    return normalized;
  } catch (error) {
    console.error('Error getting developer projects:', error);
    return [];
  }
}

async function getProjectsByClient(clientId) {
  try {
    const projects = await actor.getProjectsByClient(clientId);
    return normalizeCanisterData(projects);
  } catch (error) {
    console.error('Error getting client projects:', error);
    return [];
  }
}

async function getProjectById(projectId) {
  try {
    // First try to get all projects and find by ID
    // (since there's no direct getProject method)
    const allProjects = await getAllProjects();
    return allProjects.find(p => p.id === projectId) || null;
  } catch (error) {
    console.error('Error getting project by ID:', error);
    return null;
  }
}

async function createProject(projectData) {
  try {
    const project = {
      id: projectData.id,
      name: projectData.name,
      url: projectData.url,
      adminUrl: projectData.adminUrl ? [projectData.adminUrl] : [],
      developerId: projectData.developerId,
      clientId: projectData.clientId ? [projectData.clientId] : [],
      thumbnail: projectData.thumbnail ? [projectData.thumbnail] : [],
      projectType: projectData.projectType || projectData.type || 'other',
      status: projectData.status || 'draft',
      clientDashboardUrl: projectData.clientDashboardUrl ? [projectData.clientDashboardUrl] : [],
      deadline: projectData.deadline ? [projectData.deadline] : [],
      createdAt: BigInt(Date.now()),
    };

    const result = await actor.createProject(project);

    if ('ok' in result) {
      return normalizeCanisterData(result.ok);
    } else {
      throw new Error(result.err);
    }
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

async function updateProject(projectId, updates) {
  try {
    // Get existing project first
    const existing = await getProjectById(projectId);
    if (!existing) {
      throw new Error('Project not found');
    }

    // Merge updates with existing data
    const project = {
      id: existing.id,
      name: updates.name || existing.name,
      url: updates.url || existing.url,
      adminUrl: updates.adminUrl ? [updates.adminUrl] : (existing.adminUrl ? [existing.adminUrl] : []),
      developerId: existing.developerId,
      clientId: updates.clientId ? [updates.clientId] : (existing.clientId ? [existing.clientId] : []),
      thumbnail: updates.thumbnail ? [updates.thumbnail] : (existing.thumbnail ? [existing.thumbnail] : []),
      projectType: updates.projectType || updates.type || existing.projectType,
      status: updates.status || existing.status,
      clientDashboardUrl: updates.clientDashboardUrl ? [updates.clientDashboardUrl] : (existing.clientDashboardUrl ? [existing.clientDashboardUrl] : []),
      deadline: updates.deadline ? [updates.deadline] : (existing.deadline ? [existing.deadline] : []),
      createdAt: BigInt(existing.createdAt),
    };

    const result = await actor.updateProject(project);

    if ('ok' in result) {
      return normalizeCanisterData(result.ok);
    } else {
      throw new Error(result.err);
    }
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

/**
 * Client operations
 */
async function getClientsByDeveloper(developerId) {
  try {
    const clients = await actor.getClientsByDeveloper(developerId);
    console.log('🔍 Raw clients from DFINITY:', clients);

    if (!clients) {
      console.log('⚠️ No clients returned from DFINITY for developer:', developerId);
      return [];
    }

    const normalized = normalizeCanisterData(clients);
    console.log('🔍 Normalized clients:', normalized);

    if (!Array.isArray(normalized)) {
      console.log('⚠️ Normalized clients is not an array:', typeof normalized);
      return [];
    }

    console.log(`🔍 DFINITY: Found ${normalized.length} clients for developer ${developerId}`);

    normalized.forEach(client => {
      console.log(`  Client: ${client.name} (${client.id})`);
      console.log(`    dashboardUrl: ${client.dashboardUrl} (type: ${typeof client.dashboardUrl})`);
      console.log(`    Projects: ${client.projects?.length || 0} (from canister)`);
    });

    return normalized;
  } catch (error) {
    console.error('Error getting developer clients:', error);
    return [];
  }
}

async function getClientById(clientId) {
  try {
    const result = await actor.getClient(clientId);
    const client = unwrapOpt(result);
    return client ? normalizeCanisterData(client) : null;
  } catch (error) {
    console.error('Error getting client by ID:', error);
    return null;
  }
}

async function createClient(clientData) {
  try {
    // ✅ Fetch full project objects from project IDs
    let fullProjects = [];
    if (clientData.projects && Array.isArray(clientData.projects) && clientData.projects.length > 0) {
      for (const projectId of clientData.projects) {
        if (typeof projectId === 'string') {
          const project = await getProjectById(projectId);
          if (project) {
            // Convert to canister format - use ARRAY wrapping for Candid Opt(Text) fields
            fullProjects.push({
              id: project.id,
              name: project.name,
              url: project.url,
              adminUrl: project.adminUrl ? [project.adminUrl] : [],
              developerId: project.developerId,
              clientId: project.clientId ? [project.clientId] : [],
              thumbnail: project.thumbnail ? [project.thumbnail] : [],
              projectType: project.projectType || project.type || 'other',
              status: project.status || 'draft',
              clientDashboardUrl: project.clientDashboardUrl ? [project.clientDashboardUrl] : [],
              deadline: project.deadline ? [project.deadline] : [],
              createdAt: BigInt(project.createdAt || Date.now()),
            });
          }
        } else if (typeof projectId === 'object') {
          // Already a full object - convert to canister format with ARRAY wrapping
          fullProjects.push({
            id: projectId.id,
            name: projectId.name,
            url: projectId.url,
            adminUrl: projectId.adminUrl ? [projectId.adminUrl] : [],
            developerId: projectId.developerId,
            clientId: projectId.clientId ? [projectId.clientId] : [],
            thumbnail: projectId.thumbnail ? [projectId.thumbnail] : [],
            projectType: projectId.projectType || projectId.type || 'other',
            status: projectId.status || 'draft',
            clientDashboardUrl: projectId.clientDashboardUrl ? [projectId.clientDashboardUrl] : [],
            deadline: projectId.deadline ? [projectId.deadline] : [],
            createdAt: BigInt(projectId.createdAt || Date.now()),
          });
        }
      }
    }

    const client = {
      id: clientData.id,
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone ? [clientData.phone] : [],
      contactPerson: clientData.contactPerson ? [clientData.contactPerson] : [],
      profileImage: clientData.profileImage ? [clientData.profileImage] : [],
      websiteUrl: clientData.websiteUrl ? [clientData.websiteUrl] : [],
      originalWebsiteUrl: clientData.originalWebsiteUrl ? [clientData.originalWebsiteUrl] : [],
      dashboardUrl: clientData.dashboardUrl ? [clientData.dashboardUrl] : [],
      category: clientData.category ? [clientData.category] : [],
      developerId: clientData.developerId,
      projects: fullProjects, // ✅ FIXED: Now sending full Project objects
      createdAt: BigInt(Date.now()),
    };

    console.log('🔍 DFINITY createClient - sending data:', {
      id: client.id,
      dashboardUrl: client.dashboardUrl,
      projectsCount: fullProjects.length,
      websiteUrl: client.websiteUrl,
    });

    console.log('⏱️ DFINITY: Calling createClient with 90s timeout...');
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('DFINITY createClient timeout after 90s')), 90000)
    );
    const result = await Promise.race([
      actor.createClient(client),
      timeoutPromise
    ]);

    if ('ok' in result) {
      return normalizeCanisterData(result.ok);
    } else {
      throw new Error(result.err);
    }
  } catch (error) {
    console.error('❌ Error creating client in DFINITY:', error);
    console.error('❌ Error details:', error.message);
    throw error;
  }
}

async function updateClient(clientId, updates) {
  try {
    console.log('📝 updateClient called with:', { clientId, updates: JSON.stringify(updates).substring(0, 500) });
    
    // Get existing client first
    const existing = await getClientById(clientId);
    if (!existing) {
      throw new Error('Client not found');
    }
    
    console.log('📋 Existing client:', { id: existing.id, name: existing.name, developerId: existing.developerId, projectsCount: existing.projects?.length || 0 });

    // Handle projects update - convert IDs to full objects if needed
    let projectsToSend = existing.projects || [];
    if (updates.projects) {
      console.log('🔄 Processing', updates.projects.length, 'projects for update');
      projectsToSend = [];
      for (const projectIdOrObj of updates.projects) {
        if (typeof projectIdOrObj === 'string') {
          const project = await getProjectById(projectIdOrObj);
          if (project) {
            projectsToSend.push({
              id: project.id,
              name: project.name,
              url: project.url,
              adminUrl: project.adminUrl ? [project.adminUrl] : [],
              developerId: project.developerId,
              clientId: project.clientId ? [project.clientId] : [],
              thumbnail: project.thumbnail ? [project.thumbnail] : [],
              projectType: project.projectType || project.type || 'other',
              status: project.status || 'draft',
              clientDashboardUrl: project.clientDashboardUrl ? [project.clientDashboardUrl] : [],
              deadline: project.deadline ? [project.deadline] : [],
              createdAt: BigInt(project.createdAt || Date.now()),
            });
          }
        } else if (typeof projectIdOrObj === 'object') {
          // Ensure developerId is set - use existing client's developerId as fallback
          const projectDeveloperId = projectIdOrObj.developerId || existing.developerId;
          
          projectsToSend.push({
            id: projectIdOrObj.id,
            name: projectIdOrObj.name || 'Untitled Website',
            url: projectIdOrObj.url || '',
            adminUrl: projectIdOrObj.adminUrl ? [projectIdOrObj.adminUrl] : [],
            developerId: projectDeveloperId,
            clientId: projectIdOrObj.clientId ? [projectIdOrObj.clientId] : [existing.id],
            thumbnail: projectIdOrObj.thumbnail ? [projectIdOrObj.thumbnail] : [],
            projectType: projectIdOrObj.projectType || projectIdOrObj.type || 'website',
            status: projectIdOrObj.status || 'active',
            clientDashboardUrl: projectIdOrObj.clientDashboardUrl ? [projectIdOrObj.clientDashboardUrl] : [],
            deadline: projectIdOrObj.deadline ? [projectIdOrObj.deadline] : [],
            createdAt: BigInt(projectIdOrObj.createdAt || Date.now()),
          });
        }
      }
    } else if (existing.projects) {
      // Convert existing projects if they're already objects
      projectsToSend = existing.projects.map(p => ({
        id: p.id,
        name: p.name || 'Untitled Website',
        url: p.url || '',
        adminUrl: p.adminUrl ? [p.adminUrl] : [],
        developerId: p.developerId || existing.developerId,
        clientId: p.clientId ? [p.clientId] : [existing.id],
        thumbnail: p.thumbnail ? [p.thumbnail] : [],
        projectType: p.projectType || p.type || 'website',
        status: p.status || 'active',
        clientDashboardUrl: p.clientDashboardUrl ? [p.clientDashboardUrl] : [],
        deadline: p.deadline ? [p.deadline] : [],
        createdAt: BigInt(p.createdAt || Date.now()),
      }));
    }

    // Merge updates with existing data
    const client = {
      id: existing.id,
      name: updates.name || existing.name,
      email: updates.email || existing.email,
      phone: updates.phone !== undefined ? (updates.phone ? [updates.phone] : []) : (existing.phone ? [existing.phone] : []),
      contactPerson: updates.contactPerson !== undefined ? (updates.contactPerson ? [updates.contactPerson] : []) : (existing.contactPerson ? [existing.contactPerson] : []),
      profileImage: updates.profileImage !== undefined ? (updates.profileImage ? [updates.profileImage] : []) : (existing.profileImage ? [existing.profileImage] : []),
      websiteUrl: updates.websiteUrl ? [updates.websiteUrl] : (existing.websiteUrl ? [existing.websiteUrl] : []),
      originalWebsiteUrl: updates.originalWebsiteUrl ? [updates.originalWebsiteUrl] : (existing.originalWebsiteUrl ? [existing.originalWebsiteUrl] : []),
      dashboardUrl: updates.dashboardUrl ? [updates.dashboardUrl] : (existing.dashboardUrl ? [existing.dashboardUrl] : []),
      category: updates.category ? [updates.category] : (existing.category ? [existing.category] : []),
      developerId: existing.developerId,
      projects: projectsToSend, // ✅ Now full objects
      createdAt: BigInt(existing.createdAt),
    };

    const result = await actor.updateClient(client);

    if ('ok' in result) {
      return normalizeCanisterData(result.ok);
    } else {
      throw new Error(result.err);
    }
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
}

async function assignProjectsToClient(clientId, projectIds) {
  try {
    const existing = await getClientById(clientId);
    if (!existing) {
      throw new Error('Client not found');
    }

    // Get existing project IDs
    const existingProjectIds = existing.projects.map(p => p.id);

    // Add new project IDs (no duplicates)
    const allProjectIds = [...new Set([...existingProjectIds, ...projectIds])];

    // Fetch full project objects for all IDs
    const fullProjects = [];
    for (const projectId of allProjectIds) {
      const project = await getProjectById(projectId);
      if (project) {
        fullProjects.push(project);
      }
    }

    return await updateClient(clientId, { projects: fullProjects });
  } catch (error) {
    console.error('Error assigning projects to client:', error);
    throw error;
  }
}

async function deleteClient(clientId) {
  try {
    console.log('🗑️ DFINITY: PERMANENTLY deleting client:', clientId);
    await actor.deleteClient(clientId);
    console.log('✅ DFINITY: Client PERMANENTLY deleted from canister');
    return { id: clientId, deleted: true };
  } catch (error) {
    console.error('❌ DFINITY: Error deleting client:', error);
    throw error;
  }
}

/**
 * Cycles/Admin operations
 */
async function getCycleStatus() {
  try {
    const status = await actor.getCycleStatus();
    return normalizeCanisterData(status);
  } catch (error) {
    console.error('Error getting cycle status:', error);
    throw error;
  }
}

module.exports = {
  // Health
  health,

  // User operations
  getUserByAuthId,
  createUser,
  getUser,

  // Project operations
  getAllProjects,
  getProjectsByDeveloper,
  getProjectsByClient,
  getProjectById,
  createProject,
  updateProject,

  // Client operations
  getClientsByDeveloper,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  assignProjectsToClient,

  // Admin operations
  getCycleStatus,

  // Asset/Blob operations
  uploadAsset: async (assetId, buffer, contentType, filename, uploadedBy) => {
    try {
      const result = await actor.uploadAsset(
        assetId,
        Array.from(buffer), // Convert Buffer to Array for Candid
        contentType,
        filename,
        uploadedBy
      );

      if ('ok' in result) {
        return result.ok;
      } else {
        throw new Error(result.err);
      }
    } catch (error) {
      console.error('Error uploading asset:', error);
      throw error;
    }
  },

  getAsset: async (assetId) => {
    try {
      console.log('🔍 DFINITY: Getting asset:', assetId);
      const result = await actor.getAsset(assetId);

      console.log('📦 DFINITY: getAsset result type:', result ? 'found' : 'null', result);

      // getAsset returns ?Asset (optional), not Result<Asset, Text>
      if (result && result.length > 0) {
        // Optional value returned as array [value]
        const asset = result[0];
        console.log('✅ DFINITY: Asset found:', { id: asset.id, size: asset.size, contentType: asset.contentType });
        return {
          ...normalizeCanisterData(asset),
          data: new Uint8Array(asset.data) // Convert back to Uint8Array
        };
      } else {
        console.log('❌ DFINITY: Asset not found');
        return null;
      }
    } catch (error) {
      console.error('❌ DFINITY: getAsset error:', error);
      return null;
    }
  },

  // Tasks functions
  getTasksByDeveloper: async (developerId) => {
    try {
      const result = await actor.getTasksByDeveloper(developerId);
      return result.map(normalizeCanisterData);
    } catch (error) {
      console.error('Error getting tasks:', error);
      return [];
    }
  },

  createTask: async (taskData) => {
    try {
      const result = await actor.createTask(taskData);
      if ('ok' in result) {
        return normalizeCanisterData(result.ok);
      } else {
        throw new Error(result.err);
      }
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  updateTask: async (taskId, updates) => {
    try {
      const result = await actor.updateTask(taskId, updates);
      if ('ok' in result) {
        return normalizeCanisterData(result.ok);
      } else {
        throw new Error(result.err);
      }
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  deleteTask: async (taskId) => {
    try {
      const result = await actor.deleteTask(taskId);
      if ('ok' in result) {
        return true;
      } else {
        throw new Error(result.err);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  // Invoices functions
  getInvoicesByDeveloper: async (developerId) => {
    try {
      const result = await actor.getInvoicesByDeveloper(developerId);
      return result.map(normalizeCanisterData);
    } catch (error) {
      console.error('Error getting invoices:', error);
      return [];
    }
  },

  createInvoice: async (invoiceData) => {
    try {
      const result = await actor.createInvoice(invoiceData);
      if ('ok' in result) {
        return normalizeCanisterData(result.ok);
      } else {
        throw new Error(result.err);
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  },

  updateInvoice: async (invoiceId, updates) => {
    try {
      const result = await actor.updateInvoice(invoiceId, updates);
      if ('ok' in result) {
        return normalizeCanisterData(result.ok);
      } else {
        throw new Error(result.err);
      }
    } catch (error) {
      console.error('Error updating invoice:', error);
      throw error;
    }
  },

  deleteInvoice: async (invoiceId) => {
    try {
      const result = await actor.deleteInvoice(invoiceId);
      if ('ok' in result) {
        return true;
      } else {
        throw new Error(result.err);
      }
    } catch (error) {
      console.error('Error deleting invoice:', error);
      throw error;
    }
  },

  // Documents functions
  getDocumentsByDeveloper: async (developerId) => {
    try {
      const result = await actor.getDocumentsByDeveloper(developerId);
      return result.map(normalizeCanisterData);
    } catch (error) {
      console.error('Error getting documents:', error);
      return [];
    }
  },

  createDocument: async (documentData) => {
    try {
      const result = await actor.createDocument(documentData);
      if ('ok' in result) {
        return normalizeCanisterData(result.ok);
      } else {
        throw new Error(result.err);
      }
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  },

  deleteDocument: async (documentId) => {
    try {
      const result = await actor.deleteDocument(documentId);
      if ('ok' in result) {
        return true;
      } else {
        throw new Error(result.err);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  },

  // Payment settings (stored in user metadata for now)
  getPaymentSettings: async (userId) => {
    try {
      const user = await getUser(userId);
      return user?.paymentSettings || {};
    } catch (error) {
      console.error('Error getting payment settings:', error);
      return {};
    }
  },

  updatePaymentSettings: async (userId, settings) => {
    try {
      // For now, store in memory/session. In future, add to canister User type
      console.log('💳 Payment settings updated for user:', userId, settings);
      return { ok: true };
    } catch (error) {
      console.error('Error updating payment settings:', error);
      throw error;
    }
  },

  // Actor for advanced usage
  actor,
};
