/**
 * useClients Hook
 * 
 * Manages client data with React Query
 * Developer-only access
 * 
 * DEBUG MODE: Set VITE_API_DEBUG=true or append ?debug=true to URL
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../client';
import { Client } from '../../utils/projects';
import { DEBUG } from '../../config/debug';
import { toast } from 'sonner';

export const useClients = () => {
  const { get, post, patch, delete: del } = useApiClient();
  const queryClient = useQueryClient();

  /**
   * Fetch all clients (developer scope only)
   * 
   * Uses intelligent retry logic to handle DFINITY canister propagation delays
   * and Vercel serverless cold starts (can exceed 600ms)
   */
  const {
    data: clients,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      console.log('🔍 useClients: Fetching clients from API...');
      const result = await get<Client[]>('/clients');
      if (!result.ok) {
        console.error('❌ useClients: API error:', result.error);
        // Attach response structure for retry logic
        const error: any = new Error(result.error || 'Failed to fetch clients');
        error.response = { status: 500, data: [] };
        throw error;
      }
      
      const clients = result.data || [];
      console.log('✅ useClients: Received clients:', clients.length);
      
      // Empty array is a VALID state - user may have no clients yet
      // Don't throw errors for empty responses
      
      if (DEBUG && clients.length > 0) {
        console.log('🔍 clients network response:', clients.map(c => ({ id: c.id, name: c.name })));
      }
      return clients;
    },
    // In debug mode, disable caching to always hit the network
    staleTime: DEBUG ? 0 : 5 * 60 * 1000, // 0 in debug, 5min in production
    gcTime: DEBUG ? 0 : 10 * 60 * 1000, // 0 in debug, 10min in production
    // Intelligent retry with exponential backoff for DFINITY propagation
    // Circuit breaker: max 8 retries (≈45s total with exponential backoff)
    retry: (failureCount, err: any) => {
      const empty = err?.response?.data?.length === 0;
      const notFound = err?.response?.status === 404;
      const shouldRetry = (empty || notFound) && failureCount < 8;
      
      if (DEBUG && shouldRetry) {
        console.log(`🔄 Retry ${failureCount + 1}/8… - waiting for DFINITY propagation...`);
      }
      
      return shouldRetry;
    },
    retryDelay: (attemptIndex) => {
      // Exponential backoff: 1s, 2s, 4s, 8s, max 10s
      const delay = Math.min(1000 * 2 ** attemptIndex, 10000);
      if (DEBUG) {
        console.log(`⏳ Retry delay: ${delay}ms`);
      }
      return delay;
    },
    refetchOnWindowFocus: false, // Prevent spam while tabbing around
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  /**
   * Create a new client with invitation
   * 
   * Uses optimistic updates for instant UI feedback, then relies on
   * the intelligent retry logic in useQuery to handle propagation delays.
   */
  const createClientMutation = useMutation({
    mutationFn: async (clientData: { email: string; name: string }) => {
      if (DEBUG) {
        console.log('🔍 Creating client with data:', clientData);
      }
      const result = await post<Client>('/clients', clientData);
      if (!result.ok) {
        console.error('❌ Failed to create client:', result.error);
        throw new Error(result.error || 'Failed to create client');
      }
      if (DEBUG) {
        console.log('✅ Client created:', result.data);
      }
      return result.data!;
    },
    onSuccess: (newClient) => {
      console.log('✅ onSuccess: Client created successfully:', newClient.id);
      
      // 1. Instantly add to the list (optimistic update)
      queryClient.setQueryData<Client[]>(['clients'], (old) => {
        // Ensure old is always an array
        const oldArray = Array.isArray(old) ? old : [];
        if (DEBUG) {
          console.log('🔍 Current cache before update:', oldArray.map(c => c.id));
        }
        const exists = oldArray.some(c => c.id === newClient.id);
        if (exists) {
          console.log('⚠️  Client already exists in cache, skipping optimistic update');
          return oldArray;
        }
        const updated = [...oldArray, newClient];
        if (DEBUG) {
          console.log('🔍 Updated cache:', updated.map(c => c.id));
        }
        return updated;
      });

      // 2. Mark list as stale - the useQuery retry logic will handle propagation delay
      // No more hard-coded setTimeout - React Query will retry until data is available
      console.log('🔄 Invalidating queries - retry logic will handle DFINITY propagation...');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      console.error('❌ Create client mutation failed:', error);
    },
  });

  /**
   * Update client information
   */
  const updateClientMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Client>;
    }) => {
      const result = await patch<Client>(`/clients/${id}`, updates);
      if (!result.ok) {
        throw new Error(result.error || 'Failed to update client');
      }
      return result.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  /**
   * Assign projects to a client
   */
  const assignProjectsMutation = useMutation({
    mutationFn: async ({
      clientId,
      projectIds,
    }: {
      clientId: string;
      projectIds: string[];
    }) => {
      const result = await post<Client>(`/clients/${clientId}/assign-projects`, {
        projectIds,
      });
      if (!result.ok) {
        throw new Error(result.error || 'Failed to assign projects');
      }
      return result.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  /**
   * Delete a client permanently
   */
  const deleteClientMutation = useMutation({
    mutationFn: async (clientId: string) => {
      if (DEBUG) {
        console.log('🗑️ Deleting client:', clientId);
      }
      const result = await del<{ message: string }>(`/clients/${clientId}`);
      if (!result.ok) {
        console.error('❌ Failed to delete client:', result.error);
        throw new Error(result.error || 'Failed to delete client');
      }
      if (DEBUG) {
        console.log('✅ Client deleted:', clientId);
      }
      return clientId;
    },
    onMutate: async (clientId) => {
      // Cancel outgoing refetches to prevent overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ['clients'] });

      // Snapshot current state
      const previousClients = queryClient.getQueryData<Client[]>(['clients']);

      // Optimistically remove from UI
      queryClient.setQueryData<Client[]>(['clients'], (old) => {
        const oldArray = Array.isArray(old) ? old : [];
        return oldArray.filter(c => c.id !== clientId);
      });

      console.log('🗑️ Optimistically removed client from UI');
      return { previousClients };
    },
    onError: (error, _clientId, context) => {
      // Rollback on error
      if (context?.previousClients) {
        queryClient.setQueryData(['clients'], context.previousClients);
      }
      console.error('❌ Delete client mutation failed:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Failed to delete client: ${errorMsg}`);
    },
    onSuccess: (clientId) => {
      console.log('✅ Client permanently deleted:', clientId);
      toast.success('Client deleted successfully');
      // Invalidate to refetch from server and confirm deletion
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  /**
   * Get a single client by ID
   */
  const useClient = (clientId: string) => {
    return useQuery({
      queryKey: ['clients', clientId],
      queryFn: async () => {
        const result = await get<Client>(`/clients/${clientId}`);
        if (!result.ok) {
          throw new Error(result.error || 'Failed to fetch client');
        }
        return result.data!;
      },
      enabled: !!clientId,
      staleTime: 1000 * 60 * 5,
    });
  };

  return {
    // Data
    clients: clients || [],
    isLoading,
    error: error ? (error as Error).message : null,

    // Actions
    createClient: createClientMutation.mutate,
    updateClient: updateClientMutation.mutate,
    assignProjects: assignProjectsMutation.mutate,
    deleteClient: deleteClientMutation.mutate,
    refetch,

    // Mutation states
    isCreating: createClientMutation.isPending,
    isUpdating: updateClientMutation.isPending,
    isAssigning: assignProjectsMutation.isPending,
    isDeleting: deleteClientMutation.isPending,
    createError: createClientMutation.error
      ? (createClientMutation.error as Error).message
      : null,
    updateError: updateClientMutation.error
      ? (updateClientMutation.error as Error).message
      : null,
    assignError: assignProjectsMutation.error
      ? (assignProjectsMutation.error as Error).message
      : null,
    deleteError: deleteClientMutation.error
      ? (deleteClientMutation.error as Error).message
      : null,

    // Single client fetcher
    useClient,
  };
};
