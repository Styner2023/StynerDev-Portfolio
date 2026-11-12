// Pure DFINITY Storage Hook - Production-ready DFINITY storage
import { useState, useEffect } from 'react';
import { Project, Client } from '../utils/projects';
import {
    getAllProjectsFromStorage,
    getAllClientsFromStorage,
    checkStorageHealth
} from '../services/dfinityStorage';
import { convertProjectFromDfinity, convertClientFromDfinity } from '../utils/dfinityManager';

export interface StorageStatus {
    isDfinityConnected: boolean;
    isLoading: boolean;
    error: string | null;
}

export const useDfinityStorage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [status, setStatus] = useState<StorageStatus>({
        isDfinityConnected: false,
        isLoading: true,
        error: null
    });

    // Test DFINITY connection and load data
    useEffect(() => {
        const loadData = async () => {
            try {
                setStatus(prev => ({ ...prev, isLoading: true, error: null }));

                // Check backend health
                const health = await checkStorageHealth();
                console.log('DFINITY Health:', health);

                // Load projects and clients from DFINITY
                const [dfinityProjects, dfinityClients] = await Promise.all([
                    getAllProjectsFromStorage(),
                    getAllClientsFromStorage()
                ]);

                // Convert DFINITY data to frontend format
                const convertedProjects = dfinityProjects.map(convertProjectFromDfinity);
                const convertedClients = dfinityClients.map(convertClientFromDfinity);

                setProjects(convertedProjects);
                setClients(convertedClients);
                setStatus({
                    isDfinityConnected: true,
                    isLoading: false,
                    error: null
                });

                console.log(`✅ Loaded ${convertedProjects.length} projects and ${convertedClients.length} clients from DFINITY`);

            } catch (error) {
                console.error('Failed to load from DFINITY:', error);
                setStatus({
                    isDfinityConnected: false,
                    isLoading: false,
                    error: error instanceof Error ? error.message : 'Failed to connect to DFINITY storage'
                });
            }
        };

        loadData();
    }, []);

    const refreshData = async () => {
        setStatus(prev => ({ ...prev, isLoading: true }));

        try {
            const [dfinityProjects, dfinityClients] = await Promise.all([
                getAllProjectsFromStorage(),
                getAllClientsFromStorage()
            ]);

            const convertedProjects = dfinityProjects.map(convertProjectFromDfinity);
            const convertedClients = dfinityClients.map(convertClientFromDfinity);

            setProjects(convertedProjects);
            setClients(convertedClients);
            setStatus(prev => ({ ...prev, isLoading: false, error: null }));

        } catch (error) {
            console.error('Failed to refresh data:', error);
            setStatus(prev => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to refresh data'
            }));
        }
    };

    return {
        projects,
        clients,
        status,
        refreshData
    };
};

// Helper hooks for specific use cases
export const useDeveloperStorage = () => {
    const { projects, clients, status, refreshData } = useDfinityStorage();

    // Filter for developer-specific data if needed
    return {
        projects,
        clients,
        status,
        refreshData
    };
};

export const useClientStorage = (clientId?: string) => {
    const { projects, clients, status, refreshData } = useDfinityStorage();

    // Filter projects for specific client
    const clientProjects = clientId
        ? projects.filter(p => p.clientId === clientId)
        : projects;

    const client = clientId
        ? clients.find(c => c.id === clientId)
        : undefined;

    return {
        projects: clientProjects,
        client,
        status,
        refreshData
    };
};

// Keep useHybridStorage as alias for backwards compatibility
export const useHybridStorage = useDfinityStorage;