import { useAuth } from '@/core/hooks';

/**
 * Dashboard Hook
 * Custom hook containing dashboard logic and state management
 */
export function useDashboard() {
  const { user, logout } = useAuth();

  return {
    user,
    userRole: user?.role,
    userId: user?.id,
    handleLogout: logout,
  };
}

