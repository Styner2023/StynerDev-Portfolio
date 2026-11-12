import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../client';

export const useCollaborationScore = (clientId: string) => {
  const api = useApiClient();
  
  return useQuery({
    queryKey: ['collaboration-score', clientId],
    queryFn: async () => {
      const result = await api.publicGet(`/clients/${clientId}/collaboration-score`);
      return result.data;
    },
    enabled: !!clientId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTrackActivity = (clientId: string) => {
  const api = useApiClient();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ type, data }: { type: string; data?: any }) => {
      return await api.publicPost(`/clients/${clientId}/track-activity`, { type, data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collaboration-score', clientId] });
    }
  });
};
