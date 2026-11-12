/**
 * useProjects Hook
 * 
 * Manages project data with React Query
 * Automatically scoped by user type (developer/client)
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../client';
import { Project } from '../../utils/projects';

export const useProjects = () => {
  const { get, post, patch } = useApiClient();
  const queryClient = useQueryClient();

  /**
   * Fetch all projects (scoped by user type on backend)
   * - Developers see their created projects
   * - Clients see projects assigned to them
   */
  const {
    data: projects,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      console.log('🔍 useProjects: Fetching projects from API...');
      const result = await get<Project[]>('/projects');
      if (!result.ok) {
        console.error('❌ useProjects: API error:', result.error);
        throw new Error(result.error || 'Failed to fetch projects');
      }
      console.log('✅ useProjects: Received projects:', result.data?.length || 0);
      return result.data || [];
    },
    staleTime: 1000 * 30, // 30 seconds (reduced for immediate updates)
    retry: 3,
    refetchOnWindowFocus: true, // Refetch when window gains focus
    refetchOnMount: true, // Always refetch on mount
    refetchOnReconnect: true, // Refetch when network reconnects
  });

  /**
   * Create a new project (developer only)
   */
  const createProjectMutation = useMutation({
    mutationFn: async (projectData: Omit<Project, 'id'>) => {
      const result = await post<Project>('/projects', projectData);
      if (!result.ok) {
        throw new Error(result.error || 'Failed to create project');
      }
      return result.data!;
    },
    onSuccess: () => {
      // Invalidate and refetch projects
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  /**
   * Update an existing project (developer only)
   */
  const updateProjectMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Project>;
    }) => {
      const result = await patch<Project>(`/projects/${id}`, updates);
      if (!result.ok) {
        throw new Error(result.error || 'Failed to update project');
      }
      return result.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  /**
   * Get a single project by ID
   */
  const useProject = (projectId: string) => {
    return useQuery({
      queryKey: ['projects', projectId],
      queryFn: async () => {
        const result = await get<Project>(`/projects/${projectId}`);
        if (!result.ok) {
          throw new Error(result.error || 'Failed to fetch project');
        }
        return result.data!;
      },
      enabled: !!projectId,
      staleTime: 1000 * 60 * 5,
    });
  };

  return {
    // Data
    projects: projects || [],
    isLoading,
    error: error ? (error as Error).message : null,

    // Actions
    createProject: createProjectMutation.mutate,
    updateProject: updateProjectMutation.mutate,
    refetch,

    // Mutation states
    isCreating: createProjectMutation.isPending,
    isUpdating: updateProjectMutation.isPending,
    createError: createProjectMutation.error
      ? (createProjectMutation.error as Error).message
      : null,
    updateError: updateProjectMutation.error
      ? (updateProjectMutation.error as Error).message
      : null,

    // Single project fetcher
    useProject,
  };
};
