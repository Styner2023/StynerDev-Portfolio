import { getCurrentUser } from '../utils/auth';
import { dfinityAPI, dfinityBackend } from '../lib/dfinity';
import { checkStorageHealth } from '../services/dfinityStorage';

export function useDfinity() {
  const user = getCurrentUser();

  const callBackend = async (endpoint: string, data?: unknown) => {
    if (!user) throw new Error('Not authenticated');

    // Use the legacy API for now (will be migrated)
    return dfinityAPI.call(endpoint, user.id, data);
  };

  const uploadImage = async (file: File) => {
    if (!user) throw new Error('Not authenticated');
    return dfinityAPI.uploadImage(file, user.id);
  };

  const testConnection = async () => {
    try {
      const health = await checkStorageHealth();
      return !!health;
    } catch (error) {
      console.error('DFINITY connection failed:', error);
      return false;
    }
  };

  const isStorageEnabled = () => {
    return true; // Always true in pure DFINITY mode
  };

  const getBackend = () => {
    return dfinityBackend;
  };

  return {
    callBackend,
    uploadImage,
    testConnection,
    isStorageEnabled,
    getBackend,
    userId: user?.id
  };
}
