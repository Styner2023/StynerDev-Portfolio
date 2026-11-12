/**
 * Debug Configuration
 * 
 * Centralized debug mode detection with runtime override support.
 * Allows toggling debug logs in production via URL parameter.
 * 
 * Usage:
 *   import { DEBUG } from '@/config/debug';
 * 
 * Enable in production:
 *   https://zubaz-react.vercel.app/?debug=true
 */

/**
 * Debug mode is enabled when:
 * 1. VITE_API_DEBUG env var is set to 'true', OR
 * 2. URL contains ?debug=true parameter (runtime override)
 * 
 * The runtime override is crucial for debugging production issues
 * without requiring a redeploy.
 */
export const DEBUG =
  import.meta.env.VITE_API_DEBUG === 'true' ||
  (typeof window !== 'undefined' && window.location.search.includes('debug=true'));

/**
 * Log the debug mode status on initialization
 */
if (typeof window !== 'undefined') {
  if (DEBUG) {
    console.log('🔧 Debug mode ENABLED');
    if (window.location.search.includes('debug=true')) {
      console.log('   → Activated via ?debug=true URL parameter');
    }
    if (import.meta.env.VITE_API_DEBUG === 'true') {
      console.log('   → Activated via VITE_API_DEBUG env variable');
    }
  }
}

/**
 * Helper to enable debug mode at runtime via console
 */
if (typeof window !== 'undefined') {
  (window as any).__enableDebug = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('debug', 'true');
    window.location.href = url.toString();
  };
  
  (window as any).__disableDebug = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('debug');
    window.location.href = url.toString();
  };
}
