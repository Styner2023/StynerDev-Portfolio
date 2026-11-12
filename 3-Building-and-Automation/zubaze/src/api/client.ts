/**
 * API Client for Zubaze Production
 * 
 * This client handles all communication with the backend API layer.
 * All requests are authenticated with Auth0 tokens.
 * The backend verifies tokens and calls the DFINITY canister.
 * 
 * DEBUG MODE: Set VITE_API_DEBUG=true in .env or append ?debug=true to URL
 */

import { useAuthContext } from '../auth/AuthProvider';
import { DEBUG } from '../config/debug';
import { checkResponseFormat } from './schemas';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

/**
 * Hook to create an authenticated API client
 * Uses Auth0 token for all requests
 */
export const useApiClient = () => {
  const { token, isAuthenticated } = useAuthContext();

  /**
   * Make an authenticated API call
   * @param endpoint - API endpoint (e.g., '/projects')
   * @param options - Fetch options
   * @returns Promise with typed response
   */
  const apiCall = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    try {
      // Ensure user is authenticated
      if (!isAuthenticated || !token) {
        console.error('🔒 API call blocked: not authenticated');
        return {
          ok: false,
          error: 'Not authenticated. Please sign in first.',
        };
      }

      // Log the API request
      const method = options.method || 'GET';
      if (DEBUG) {
        console.log(`📤 ${method} ${endpoint}`, options.body ? JSON.parse(options.body as string) : '');
      } else {
        console.log(`🌐 API ${method} ${API_BASE}${endpoint}`);
      }

      // Make the API request
      const startTime = performance.now();
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers,
        },
        // Prevent browser from suspending the request
        keepalive: true,
        // Extended timeout for DFINITY canister operations
        signal: AbortSignal.timeout(120000), // 120 seconds for DFINITY
      });

      const duration = Math.round(performance.now() - startTime);

      if (DEBUG) {
        console.log(`📥 ${response.status} ${endpoint} (${duration}ms)`);
      } else {
        console.log(`📡 Response status: ${response.status} ${response.statusText}`);
      }

      // Parse response
      const responseData = await response.json();

      if (DEBUG) {
        console.log(`📥 Response data:`, responseData);
        // Check for double-wrapping issues (the 365-day bug detector!)
        checkResponseFormat(endpoint, responseData);
      }

      if (!response.ok) {
        console.error('❌ API returned error:', responseData);
        return {
          ok: false,
          error: responseData.error || responseData.message || `Request failed with status ${response.status}`,
        };
      }

      if (!DEBUG) {
        console.log('✅ API call successful');
      }

      // Backend returns { ok: true, data: [...] }, extract the data field
      // This prevents the 365-day "double-wrapped response" bug
      const actualData = responseData.data !== undefined ? responseData.data : responseData;

      return {
        ok: true,
        data: actualData,
      };
    } catch (error) {
      console.error('❌ API call failed with exception:', error);
      
      let errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      // Handle specific error types
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('💡 This is a network error - backend may be unreachable');
        console.error(`💡 Check if ${API_BASE} is accessible`);
        
        // Detect ERR_NETWORK_IO_SUSPENDED (Chrome-specific)
        if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Network request was interrupted. This can happen if:\n- Your computer went to sleep\n- The browser tab became inactive\n- A browser extension blocked the request\n- Network connection was unstable\n\nTips:\n• Keep this browser tab active\n• Disable ad blockers temporarily\n• Check your internet connection\n\nPlease try again.';
        }
      } else if (error.name === 'AbortError') {
        console.error('⏱️ Request timed out after 60 seconds');
        errorMessage = 'Request timed out. The DFINITY canister may be slow or overloaded. Please try again.';
      }
      
      return {
        ok: false,
        error: errorMessage,
      };
    }
  };

  /**
   * GET request helper
   */
  const get = <T>(endpoint: string) => {
    return apiCall<T>(endpoint, { method: 'GET' });
  };

  /**
   * POST request helper
   */
  const post = <T>(endpoint: string, body: unknown) => {
    return apiCall<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  };

  /**
   * PATCH request helper
   */
  const patch = <T>(endpoint: string, body: unknown) => {
    return apiCall<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  };

  /**
   * DELETE request helper
   */
  const del = <T>(endpoint: string) => {
    return apiCall<T>(endpoint, { method: 'DELETE' });
  };

  /**
   * Make a public API call (no authentication required)
   * Used for public endpoints like client dashboards
   */
  const publicGet = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      console.log(`🌍 PUBLIC API GET ${API_BASE}${endpoint}`);

      const startTime = performance.now();
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(0);
      console.log(`⏱️  Request completed in ${duration}ms`);

      const data = await response.json();
      checkResponseFormat(endpoint, data);

      if (!response.ok) {
        console.error(`❌ API returned error: ${data.error || data.message}`);
        return {
          ok: false,
          error: data.error || data.message || `Request failed with status ${response.status}`,
        };
      }

      const actualData = data.data !== undefined ? data.data : data;
      console.log('✅ PUBLIC API call successful:', actualData);

      return {
        ok: true,
        data: actualData,
      };
    } catch (error) {
      console.error('❌ PUBLIC API call failed:', error);
      return {
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  };

  return {
    apiCall,
    get,
    post,
    patch,
    delete: del,
    publicGet,
  };
};

/**
 * Non-hook API client for use outside React components
 * Requires manual token passing
 */
export const createApiClient = (token: string) => {
  const apiCall = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          ok: false,
          error: data.error || data.message || `Request failed with status ${response.status}`,
        };
      }

      return {
        ok: true,
        data,
      };
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  };

  return { apiCall };
};
