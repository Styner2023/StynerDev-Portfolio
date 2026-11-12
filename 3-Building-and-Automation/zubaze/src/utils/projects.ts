// Projects types and legacy utilities - Now using DFINITY storage
export interface Project {
  id: string;
  name: string;
  url: string;
  adminUrl: string;
  developerId: string;
  clientId?: string;
  thumbnail: string;
  type: 'wordpress' | 'shopify' | 'webflow' | 'next-js' | 'vite' | 'client-dashboard' | 'other';
  projectType?: string; // DFINITY canister stores this separately
  status: 'pending' | 'draft' | 'published' | 'private';
  clientDashboardUrl?: string;
  deadline?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  projects: string[];
  developerId?: string;
  inviteToken?: string;
  clientUrl?: string;
  dashboardUrl?: string;
  websiteUrl?: string | any[]; // Can be string or array of website objects
  assignedProjects?: string[];
  createdAt?: string | number;
  category?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'client' | 'developer';
}

// Sample data for development and testing
export const sampleProjects: Project[] = [
  {
    id: 'project_1',
    name: 'Sample E-commerce Store',
    url: 'https://sample-store.example.com',
    adminUrl: 'https://sample-store.example.com/admin',
    developerId: 'dev_1',
    clientId: 'client_1',
    thumbnail: '/assets/images/portfolio/portfolio-1.png',
    type: 'shopify',
    status: 'published',
    clientDashboardUrl: '/client-dashboard-sample-store',
    deadline: '2024-12-31'
  },
  {
    id: 'project_2',
    name: 'Corporate Website',
    url: 'https://corporate-site.example.com',
    adminUrl: 'https://corporate-site.example.com/wp-admin',
    developerId: 'dev_1',
    clientId: 'client_2',
    thumbnail: '/assets/images/portfolio/portfolio-2.png',
    type: 'wordpress',
    status: 'published',
    clientDashboardUrl: '/client-dashboard-corporate-site',
    deadline: '2024-11-15'
  }
];

export const sampleClients: Client[] = [
  {
    id: 'client_1',
    name: 'Sample Store Owner',
    email: 'owner@samplestore.com',
    projects: ['project_1']
  },
  {
    id: 'client_2',
    name: 'Corporate Client',
    email: 'admin@corporatesite.com',
    projects: ['project_2']
  }
];

// Development helper
export const generateTestClient = (): Client => {
  const clientId = `client_${Date.now()}`;
  return {
    id: clientId,
    name: 'Test Client',
    email: 'test@client.com',
    projects: []
  };
};

// Working functions - Use these for the live site
export const getAllProjects = async (): Promise<Project[]> => {
  try {
    // Get from DFINITY storage only
    const { getAllProjectsFromStorage } = await import('../services/dfinityStorage');
    const dfinityProjects = await getAllProjectsFromStorage();

    // Convert DFINITY projects to Project format
    const convertedProjects: Project[] = dfinityProjects.map(dp => ({
      id: dp.id,
      name: dp.name,
      url: dp.url,
      adminUrl: dp.adminUrl || dp.url,
      developerId: dp.developerId,
      clientId: dp.clientId,
      thumbnail: dp.thumbnail || '/assets/images/portfolio/portfolio-1.png',
      type: (dp.projectType === 'client-dashboard' ? 'client-dashboard' : 'other') as Project['type'],
      status: (dp.status === 'published' || dp.status === 'draft' || dp.status === 'pending' || dp.status === 'private' ? dp.status : 'published') as Project['status'],
      clientDashboardUrl: dp.clientDashboardUrl,
      deadline: dp.deadline
    }));

    return [...sampleProjects, ...convertedProjects];
  } catch (error) {
    console.warn('DFINITY unavailable, using sample data:', error);
    return sampleProjects;
  }
};

export const getAllClients = async (): Promise<Client[]> => {
  try {
    // Get from DFINITY storage only
    const { getAllClientsFromStorage } = await import('../services/dfinityStorage');
    const dfinityClients = await getAllClientsFromStorage();

    // Convert DFINITY clients to Client format
    const convertedClients: Client[] = dfinityClients.map(dc => ({
      id: dc.id,
      name: dc.name,
      email: dc.email,
      projects: dc.projects
    }));

    return [...sampleClients, ...convertedClients];
  } catch (error) {
    console.warn('DFINITY unavailable, using sample data:', error);
    return sampleClients;
  }
};

export const getProjectsByDeveloperId = async (developerId: string): Promise<Project[]> => {
  const projects = await getAllProjects();
  return projects.filter(project => project.developerId === developerId);
};

export const getProjectsByClientId = async (clientId: string): Promise<Project[]> => {
  const projects = await getAllProjects();
  return projects.filter(project => project.clientId === clientId);
};

export const getProjectById = async (projectId: string): Promise<Project | undefined> => {
  const projects = await getAllProjects();
  return projects.find(project => project.id === projectId);
};

export const getClientsByDeveloperId = async (developerId: string): Promise<Client[]> => {
  const allClients = await getAllClients();
  return allClients.filter(client =>
    client.projects.some(projectId =>
      sampleProjects.find(p => p.id === projectId)?.developerId === developerId
    )
  );
};

// Working functions for live site
export const getDeveloperProjects = async (developerId: string): Promise<Project[]> => {
  const allProjects = await getAllProjects();
  return allProjects.filter(project => project.developerId === developerId);
};

export const getDeveloperClients = async (developerId: string): Promise<Client[]> => {
  return await getClientsByDeveloperId(developerId);
};

export const getClientProjects = async (clientId: string): Promise<Project[]> => {
  const allProjects = await getAllProjects();
  return allProjects.filter(project => project.clientId === clientId);
};

export const createClientDashboard = async (params: {
  projectName?: string;
  clientName: string;
  clientEmail: string;
  dashboardUrl?: string;
  category?: string;
  developerId: string;
  clientProjects?: Array<{
    name: string;
    url: string;
    adminUrl: string;
    thumbnail: string;
    type: string;
  }>;
}): Promise<{ success: boolean; clientDashboardUrl?: string; error?: string }> => {
  try {
    // Import DFINITY storage functions
    const { createProjectInStorage, createClientInStorage } = await import('../services/dfinityStorage');

    // Generate unique dashboard URL
    const dashboardUrl = params.dashboardUrl || params.projectName?.toLowerCase().replace(/\s+/g, '-') || 'client-dashboard';
    const uniqueUrl = `${dashboardUrl}-${Date.now()}`;
    const clientDashboardUrl = `/client-dashboard-${uniqueUrl}`;

    // Create client record first (NOT a user session, just a data record)
    const clientData = {
      id: `client_${Date.now()}`,
      name: params.clientName,
      email: params.clientEmail,
      projects: [],
      developerId: params.developerId,
      createdAt: BigInt(Date.now())
    };

    // Create client dashboard project
    const clientDashboardProject = {
      id: `dashboard_${Date.now()}`,
      name: params.projectName || `${params.clientName} Dashboard`,
      url: window.location.origin + clientDashboardUrl,
      adminUrl: window.location.origin + clientDashboardUrl,
      developerId: params.developerId,
      clientId: clientData.id,
      thumbnail: '/assets/images/portfolio/portfolio-1.png',
      projectType: 'client-dashboard',
      status: 'published',
      clientDashboardUrl: uniqueUrl,
      createdAt: BigInt(Date.now())
    };

    // Save to DFINITY storage ONLY (no localStorage)
    await createClientInStorage(clientData);
    await createProjectInStorage(clientDashboardProject);

    console.log('✅ Client dashboard saved to DFINITY ONLY:', {
      clientDashboardUrl,
      project: clientDashboardProject,
      client: clientData,
      shareableUrl: window.location.origin + clientDashboardUrl
    });

    // Show shareable URL to developer
    alert(`✅ Client Dashboard Created & Saved to DFINITY!\n\nShareable URL: ${window.location.origin + clientDashboardUrl}\n\nSend this URL to your client: ${params.clientEmail}\n\nStored in DFINITY canister with 96.5T cycles.`);

    return {
      success: true,
      clientDashboardUrl
    };
  } catch (error) {
    console.error('❌ Error creating client dashboard:', error);
    return {
      success: false,
      error: `Failed to create client dashboard: ${error}`
    };
  }
};// Mutation functions - Use DFINITY services directly
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createProject = (_project: Project): void => {
  console.warn('createProject: Use DFINITY storage services instead');
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateProject = (_project: Project): void => {
  console.warn('updateProject: Use DFINITY storage services instead');
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteProject = (_projectId: string): boolean => {
  console.warn('deleteProject: Use DFINITY storage services instead');
  return false;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createClient = (_client: Client): void => {
  console.warn('createClient: Use DFINITY storage services instead');
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const assignProjectToClient = (_projectId: string, _clientId: string): boolean => {
  console.warn('assignProjectToClient: Use DFINITY storage services instead');
  return false;
};