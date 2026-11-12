// DFINITY Backend Interface - matches your current data types exactly
export interface DfinityUser {
    id: string;
    email: string;
    name: string;
    userType: 'client' | 'developer';
    authId: string; // Auth0 user ID
}

export interface DfinityProject {
    id: string;
    name: string;
    url: string;
    adminUrl?: string;
    developerId: string;
    clientId?: string;
    thumbnail?: string;
    projectType: string; // "client-dashboard", "website", etc.
    status: string;
    clientDashboardUrl?: string;
    deadline?: string;
    createdAt: bigint;
}

export interface DfinityClient {
    id: string;
    name: string;
    email: string;
    projects: string[]; // Array of project IDs
    developerId: string; // Which developer owns this client
    createdAt: bigint;
}

// API Result types
export type DfinityResult<T> = {
    ok?: T;
    err?: string;
}

// DFINITY Canister Interface
export interface ZubazStorageActor {
    // User management
    createUser: (user: DfinityUser) => Promise<DfinityResult<DfinityUser>>;
    getUser: (userId: string) => Promise<DfinityUser | undefined>;
    getUserByAuthId: (authId: string) => Promise<DfinityUser | undefined>;

    // Project management
    createProject: (project: DfinityProject) => Promise<DfinityResult<DfinityProject>>;
    getProjectsByDeveloper: (developerId: string) => Promise<DfinityProject[]>;
    getProjectsByClient: (clientId: string) => Promise<DfinityProject[]>;
    getProjectByUrl: (clientDashboardUrl: string) => Promise<DfinityProject | undefined>;
    updateProject: (project: DfinityProject) => Promise<DfinityResult<DfinityProject>>;

    // Client management
    createClient: (client: DfinityClient) => Promise<DfinityResult<DfinityClient>>;
    getClientsByDeveloper: (developerId: string) => Promise<DfinityClient[]>;
    getClient: (clientId: string) => Promise<DfinityClient | undefined>;
    updateClient: (client: DfinityClient) => Promise<DfinityResult<DfinityClient>>;

    // Utility functions
    getAllProjects: () => Promise<DfinityProject[]>;
    getAllClients: () => Promise<DfinityClient[]>;
    getAllUsers: () => Promise<DfinityUser[]>;
    health: () => Promise<string>;
}