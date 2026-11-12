/**
 * Dashboard Content Management Hooks
 * 
 * React Query hooks for managing client dashboard content
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../client';
import type { 
  TimelineUpdate, 
  ResourceLink, 
  DeveloperRating, 
  TemplateRating,
  DashboardContent 
} from '../schemas/dashboardContent';

/**
 * Get all dashboard content for a client
 */
export function useDashboardContent(clientId: string) {
  const { get } = useApiClient();
  
  return useQuery<DashboardContent>({
    queryKey: ['dashboard-content', clientId],
    queryFn: async () => {
      const response = await get(`/dashboard-content/${clientId}`);
      return response.data as DashboardContent;
    },
    enabled: !!clientId,
  });
}

/**
 * Add a timeline update
 */
export function useAddTimelineUpdate(clientId: string) {
  const { post, patch } = useApiClient();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Omit<TimelineUpdate, 'id' | 'createdAt' | 'clientId' | 'developerId'>) => {
      const response = await post(`/dashboard-content/${clientId}/timeline-update`, data);
      
      // Track action items if this is an action-item type
      if (data.type === 'action-item' && data.actionItems && data.actionItems.length > 0) {
        await patch(`/clients/${clientId}/update-metrics`, {
          totalActionItems: data.actionItems.length
        });
      }
      
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-content', clientId] });
      queryClient.invalidateQueries({ queryKey: ['collaboration-score', clientId] });
    },
  });
}

/**
 * Update a timeline update
 */
export function useUpdateTimelineUpdate(clientId: string) {
  const { patch, post } = useApiClient();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ updateId, ...data }: { updateId: string } & Partial<TimelineUpdate>) => {
      const response = await patch(`/dashboard-content/${clientId}/timeline-update/${updateId}`, data);
      
      // Track completion if status changed to completed
      if (data.status === 'completed') {
        await post(`/clients/${clientId}/track-activity`, {
          type: 'action_item_response',
          data: {
            updateId,
            sentAt: new Date().toISOString(),
            hoursToRespond: 24 // Default, can be calculated based on actual time
          }
        });
      }
      
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-content', clientId] });
      queryClient.invalidateQueries({ queryKey: ['collaboration-score', clientId] });
    },
  });
}

/**
 * Delete a timeline update
 */
export function useDeleteTimelineUpdate(clientId: string) {
  const { delete: del } = useApiClient();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (updateId: string) => {
      const response = await del(`/dashboard-content/${clientId}/timeline-update/${updateId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-content', clientId] });
    },
  });
}

/**
 * Add a resource link
 */
export function useAddResource(clientId: string) {
  const { post } = useApiClient();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Omit<ResourceLink, 'id' | 'createdAt' | 'clientId' | 'developerId'>) => {
      const response = await post(`/dashboard-content/${clientId}/resource`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-content', clientId] });
    },
  });
}

/**
 * Delete a resource link
 */
export function useDeleteResource(clientId: string) {
  const { delete: del } = useApiClient();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (resourceId: string) => {
      const response = await del(`/dashboard-content/${clientId}/resource/${resourceId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-content', clientId] });
    },
  });
}

/**
 * Add developer rating (client-side)
 */
export function useAddDeveloperRating(clientId: string) {
  const { post } = useApiClient();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Omit<DeveloperRating, 'id' | 'createdAt' | 'clientId' | 'developerId'>) => {
      const response = await post(`/dashboard-content/${clientId}/developer-rating`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ratings', clientId] });
    },
  });
}

/**
 * Add template rating (client-side)
 */
export function useAddTemplateRating(clientId: string) {
  const { post } = useApiClient();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Omit<TemplateRating, 'id' | 'createdAt' | 'clientId' | 'developerId'>) => {
      const response = await post(`/dashboard-content/${clientId}/template-rating`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ratings', clientId] });
    },
  });
}

/**
 * Get all ratings for a client (developer view)
 */
export function useClientRatings(clientId: string) {
  const { get } = useApiClient();
  
  return useQuery<{ developerRatings: DeveloperRating[]; templateRatings: TemplateRating[] }>({
    queryKey: ['ratings', clientId],
    queryFn: async () => {
      const response = await get(`/dashboard-content/${clientId}/ratings`);
      return response.data as { developerRatings: DeveloperRating[]; templateRatings: TemplateRating[] };
    },
    enabled: !!clientId,
  });
}
