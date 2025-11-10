import { tokenManager } from '@/package/storage';

/**
 * Unauthorized Hook
 * Custom hook containing unauthorized page logic and state management
 */
export function useUnauthorized() {
  const userRole = tokenManager.getUserRoleFromToken();

  return {
    userRole,
  };
}

