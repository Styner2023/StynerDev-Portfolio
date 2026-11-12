import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../client';

export const useDocuments = (clientId: string) => {
  const api = useApiClient();
  return useQuery({
    queryKey: ['documents', clientId],
    queryFn: async () => {
      if (!clientId) return [];
      const result = await api.publicGet(`/documents?clientId=${clientId}`);
      return result.ok ? result.data : [];
    },
    enabled: !!clientId,
    staleTime: 30000,
  });
};
