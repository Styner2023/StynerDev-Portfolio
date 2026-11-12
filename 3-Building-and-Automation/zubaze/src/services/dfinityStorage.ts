// New DFINITY-based storage service to replace localStorage
import { dfinityBackend } from '../lib/dfinity';
import { DfinityUser, DfinityProject, DfinityClient } from '../types/dfinity';

// User management
export const createUserInStorage = async (user: DfinityUser) => {
    try {
        if (!dfinityBackend) {
            throw new Error('DFINITY backend not available');
        }
        const result = await dfinityBackend.createUser(user);
        if ('ok' in result) {
            return result.ok;
        } else {
            throw new Error(result.err);
        }
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const getUserFromStorage = async (userId: string) => {
    try {
        if (!dfinityBackend) {
            return undefined;
        }
        const user = await dfinityBackend.getUser(userId);
        return user;
    } catch (error) {
        console.error('Error getting user:', error);
        return undefined;
    }
};

export const getUserByAuthId = async (authId: string) => {
    try {
        if (!dfinityBackend) {
            return undefined;
        }
        const user = await dfinityBackend.getUserByAuthId(authId);
        return user;
    } catch (error) {
        console.error('Error getting user by auth ID:', error);
        return undefined;
    }
};

// Project management
export const createProjectInStorage = async (project: DfinityProject) => {
    try {
        if (!dfinityBackend) {
            throw new Error('DFINITY backend not available');
        }
        const result = await dfinityBackend.createProject(project);
        if ('ok' in result) {
            return result.ok;
        } else {
            throw new Error(result.err);
        }
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

export const getProjectsByDeveloper = async (developerId: string) => {
    try {
        if (!dfinityBackend) {
            return [];
        }
        const projects = await dfinityBackend.getProjectsByDeveloper(developerId);
        return projects;
    } catch (error) {
        console.error('Error getting developer projects:', error);
        return [];
    }
};

export const getProjectsByClient = async (clientId: string) => {
    try {
        if (!dfinityBackend) {
            return [];
        }
        const projects = await dfinityBackend.getProjectsByClient(clientId);
        return projects;
    } catch (error) {
        console.error('Error getting client projects:', error);
        return [];
    }
};

export const getProjectByUrl = async (clientDashboardUrl: string) => {
    try {
        if (!dfinityBackend) {
            return undefined;
        }
        const project = await dfinityBackend.getProjectByUrl(clientDashboardUrl);
        return project;
    } catch (error) {
        console.error('Error getting project by URL:', error);
        return undefined;
    }
};

export const updateProjectInStorage = async (project: DfinityProject) => {
    try {
        if (!dfinityBackend) {
            throw new Error('DFINITY backend not available');
        }
        const result = await dfinityBackend.updateProject(project);
        if ('ok' in result) {
            return result.ok;
        } else {
            throw new Error(result.err);
        }
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
};

// Client management
export const createClientInStorage = async (client: DfinityClient) => {
    try {
        if (!dfinityBackend) {
            throw new Error('DFINITY backend not available');
        }
        const result = await dfinityBackend.createClient(client);
        if ('ok' in result) {
            return result.ok;
        } else {
            throw new Error(result.err);
        }
    } catch (error) {
        console.error('Error creating client:', error);
        throw error;
    }
};

export const getClientsByDeveloper = async (developerId: string) => {
    try {
        if (!dfinityBackend) {
            return [];
        }
        const clients = await dfinityBackend.getClientsByDeveloper(developerId);
        return clients;
    } catch (error) {
        console.error('Error getting developer clients:', error);
        return [];
    }
};

export const getClientFromStorage = async (clientId: string) => {
    try {
        if (!dfinityBackend) {
            return undefined;
        }
        const client = await dfinityBackend.getClient(clientId);
        return client;
    } catch (error) {
        console.error('Error getting client:', error);
        return undefined;
    }
};

export const updateClientInStorage = async (client: DfinityClient) => {
    try {
        if (!dfinityBackend) {
            throw new Error('DFINITY backend not available');
        }
        const result = await dfinityBackend.updateClient(client);
        if ('ok' in result) {
            return result.ok;
        } else {
            throw new Error(result.err);
        }
    } catch (error) {
        console.error('Error updating client:', error);
        throw error;
    }
};

// Utility functions
export const getAllProjectsFromStorage = async () => {
    try {
        if (!dfinityBackend) {
            return [];
        }
        const projects = await dfinityBackend.getAllProjects();
        return projects;
    } catch (error) {
        console.error('Error getting all projects:', error);
        return [];
    }
};

export const getAllClientsFromStorage = async () => {
    try {
        if (!dfinityBackend) {
            return [];
        }
        const clients = await dfinityBackend.getAllClients();
        return clients;
    } catch (error) {
        console.error('Error getting all clients:', error);
        return [];
    }
};

// Health check
export const checkStorageHealth = async () => {
    try {
        if (!dfinityBackend) {
            return 'DFINITY backend not available';
        }
        const health = await dfinityBackend.health();
        console.log('DFINITY Storage Health:', health);
        return health;
    } catch (error) {
        console.error('Error checking storage health:', error);
        return 'Storage unavailable';
    }
};