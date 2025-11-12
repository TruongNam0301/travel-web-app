import { useAuth } from '@/core/hooks';

/**
 * Unauthorized Hook
 * Custom hook containing unauthorized page logic and state management
 */
export function useUnauthorized() {
  const { user } = useAuth();

  return {
    userRole: user?.role,
  };
}

