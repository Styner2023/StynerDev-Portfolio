// Custom (email + password) authentication for Zubaze
import { useAuthContext, TOKEN_KEY } from '../auth/AuthProvider';

export interface User {
  id: string;
  email: string;
  name: string;
  type: 'client' | 'developer';
}

// Hook to get the current user from the auth context
export const useCurrentUser = (): User | null => {
  const { user } = useAuthContext();

  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name || user.email || 'User',
    type: user.userType,
  };
};

export const useAuth = () => {
  const { isLoading, isAuthenticated, logout } = useAuthContext();
  const user = useCurrentUser();

  return {
    isLoaded: !isLoading,
    isAuthenticated,
    user,
    logout: () => {
      logout();
      window.location.href = '/';
    },
    isClient: user?.type === 'client',
    isDeveloper: user?.type === 'developer'
  };
};

// Non-hook helpers for code that can't use React hooks.
// Reads the stored JWT and decodes its claims (the server verifies on every API call).
export const getCurrentUser = (): User | null => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.sub || '',
      email: payload.email || '',
      name: payload.name || payload.email || 'User',
      type: (payload['https://zubaze.com/user_type'] as 'client' | 'developer') || 'developer',
    };
  } catch {
    return null;
  }
};

export const logout = async () => {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = '/';
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const isClient = (): boolean => {
  const user = getCurrentUser();
  return user?.type === 'client';
};

export const isDeveloper = (): boolean => {
  const user = getCurrentUser();
  return user?.type === 'developer';
};