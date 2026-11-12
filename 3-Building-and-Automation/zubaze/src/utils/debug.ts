/**
 * Debug Utilities for Zubaze API
 * 
 * Helper functions for debugging API issues, especially the 
 * "201 Created but list stays empty" problem
 */

// Enable debug mode via environment variable
export const DEBUG_MODE = import.meta.env.VITE_API_DEBUG === 'true' || import.meta.env.DEV;

/**
 * Debug logger - only logs when debug mode is enabled
 */
export const debugLog = {
  request: (method: string, endpoint: string, data?: unknown) => {
    if (!DEBUG_MODE) return;
    console.log(`📤 ${method} ${endpoint}`, data || '');
  },
  
  response: (status: number, endpoint: string, data?: unknown, duration?: number) => {
    if (!DEBUG_MODE) return;
    const timing = duration ? ` (${duration}ms)` : '';
    console.log(`📥 ${status} ${endpoint}${timing}`, data);
  },
  
  cache: (action: string, queryKey: string[], data?: unknown) => {
    if (!DEBUG_MODE) return;
    console.log(`🔍 Cache ${action}:`, queryKey, data);
  },
  
  error: (context: string, error: unknown) => {
    console.error(`❌ ${context}:`, error);
  },
  
  warn: (message: string, data?: unknown) => {
    console.warn(`⚠️  ${message}`, data || '');
  },
  
  success: (message: string, data?: unknown) => {
    if (!DEBUG_MODE) return;
    console.log(`✅ ${message}`, data || '');
  },
};

/**
 * Check if data exists in React Query cache
 */
export const inspectCache = (queryClient: any, queryKey: string[]) => {
  if (!DEBUG_MODE) return;
  
  const cache = queryClient.getQueryData(queryKey);
  console.log('🔍 Cache inspection:', {
    queryKey,
    exists: !!cache,
    type: Array.isArray(cache) ? 'array' : typeof cache,
    length: Array.isArray(cache) ? cache.length : 'N/A',
    data: cache,
  });
};

/**
 * Compare two arrays to find differences
 */
export const compareLists = <T extends { id: string }>(
  before: T[],
  after: T[],
  label: string
) => {
  if (!DEBUG_MODE) return;
  
  const beforeIds = new Set(before.map(item => item.id));
  const afterIds = new Set(after.map(item => item.id));
  
  const added = after.filter(item => !beforeIds.has(item.id));
  const removed = before.filter(item => !afterIds.has(item.id));
  
  console.log(`🔍 ${label} comparison:`, {
    before: before.length,
    after: after.length,
    added: added.length ? added.map(i => i.id) : 'none',
    removed: removed.length ? removed.map(i => i.id) : 'none',
  });
};

/**
 * Log developer ID for debugging authentication scope issues
 */
export const logDeveloperId = (developerId: string | undefined, context: string) => {
  if (!DEBUG_MODE) return;
  console.log(`🔍 Developer ID (${context}):`, developerId || 'undefined');
};

/**
 * Time a promise and log the duration
 */
export const timePromise = async <T>(
  promise: Promise<T>,
  label: string
): Promise<T> => {
  if (!DEBUG_MODE) return promise;
  
  const start = performance.now();
  try {
    const result = await promise;
    const duration = Math.round(performance.now() - start);
    console.log(`⏱️  ${label}: ${duration}ms`);
    return result;
  } catch (error) {
    const duration = Math.round(performance.now() - start);
    console.error(`⏱️  ${label} failed after ${duration}ms:`, error);
    throw error;
  }
};

/**
 * Pretty print API errors
 */
export const formatApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'object' && error !== null) {
    return JSON.stringify(error, null, 2);
  }
  return String(error);
};

/**
 * Enable debug mode at runtime (for browser console)
 */
declare global {
  interface Window {
    enableDebug: () => void;
    disableDebug: () => void;
    inspectQueryCache: (queryKey: string[]) => void;
  }
}

if (typeof window !== 'undefined') {
  window.enableDebug = () => {
    console.log('🔧 Debug mode enabled - reload page to see all logs');
    localStorage.setItem('VITE_API_DEBUG', 'true');
  };
  
  window.disableDebug = () => {
    console.log('🔧 Debug mode disabled');
    localStorage.removeItem('VITE_API_DEBUG');
  };
  
  window.inspectQueryCache = (_queryKey: string[]) => {
    console.log('🔍 To inspect cache, access the QueryClient from React DevTools');
    console.log('Or use: window.__REACT_QUERY_DEVTOOLS_GLOBAL_HOOK__');
  };
}
