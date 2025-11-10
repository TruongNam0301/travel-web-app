import { useNavigate } from 'react-router-dom';
import { tokenManager } from '@/package/storage';

/**
 * Dashboard Hook
 * Custom hook containing dashboard logic and state management
 */
export function useDashboard() {
  const navigate = useNavigate();
  const userRole = tokenManager.getUserRoleFromToken();
  const userId = tokenManager.getUserIdFromToken();

  const handleLogout = () => {
    tokenManager.clearTokens();
    navigate('/login', { replace: true });
  };

  return {
    userRole,
    userId,
    handleLogout,
  };
}

