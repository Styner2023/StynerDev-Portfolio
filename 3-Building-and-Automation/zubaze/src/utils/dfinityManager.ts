// Pure DFINITY Storage Manager - Production-ready data management
import { Project, Client } from '../utils/projects';
import { User } from '../utils/auth';
import { DfinityProject, DfinityClient, DfinityUser } from '../types/dfinity';

// Convert between frontend and DFINITY formats
export const convertProjectToDfinity = (project: Project): DfinityProject => ({
    id: project.id,
    name: project.name,
    url: project.url,
    adminUrl: project.adminUrl,
    developerId: project.developerId,
    clientId: project.clientId,
    thumbnail: project.thumbnail,
    projectType: project.type || 'website',
    status: project.status,
    clientDashboardUrl: project.clientDashboardUrl,
    deadline: project.deadline,
    createdAt: BigInt(Date.now())
});

export const convertProjectFromDfinity = (project: DfinityProject): Project => ({
    id: project.id,
    name: project.name,
    url: project.url,
    adminUrl: project.adminUrl ?? '',
    developerId: project.developerId,
    clientId: project.clientId || undefined,
    thumbnail: project.thumbnail ?? '',
    type: (project.projectType as Project['type']) || 'other',
    status: (project.status as Project['status']) || 'pending',
    clientDashboardUrl: project.clientDashboardUrl || undefined,
    deadline: project.deadline || undefined
});

export const convertClientToDfinity = (client: Client, developerId: string): DfinityClient => ({
    id: client.id,
    name: client.name,
    email: client.email,
    projects: client.projects,
    developerId: developerId,
    createdAt: BigInt(Date.now())
});

export const convertClientFromDfinity = (client: DfinityClient): Client => ({
    id: client.id,
    name: client.name,
    email: client.email,
    projects: client.projects
});

export const convertUserToDfinity = (user: User): DfinityUser => ({
    id: user.id,
    email: user.email,
    name: user.name,
    userType: user.type,
    authId: user.id // For now, use the same ID. In production, this would be Auth0 ID
});

export const convertUserFromDfinity = (user: DfinityUser): User => ({
    id: user.id,
    email: user.email,
    name: user.name,
    type: user.userType as 'client' | 'developer'
});

// Development helper functions
export const logDfinityData = () => {
    console.log('📊 DFINITY Storage Status: Pure DFINITY mode enabled');
    console.log('🚫 localStorage: Not used in production mode');
    console.log('✅ All data stored in DFINITY Internet Computer');
};