import { useAuthStore } from '@/core/stores';
import { TokenManager } from '@/package/storage';
import { useNavigate } from 'react-router-dom';
import { logout as logoutRequest } from '@/data/repositories/auth.repo';

/**
 * Custom hook for authentication
 * Provides user state and auth actions
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, isInitialized, clearUser } = useAuthStore();

  const logout = async () => {
    try {
      const refreshToken = TokenManager.getRefreshToken();
      if (refreshToken) {
        // Call logout API to revoke refresh token on server
        await logoutRequest(refreshToken);
      }
    } catch (error) {
      // Even if logout fails on server, clear local tokens
      console.error('Logout error:', error);
    } finally {
      TokenManager.clearTokens();
      clearUser();
      navigate('/login', { replace: true });
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
    logout,
  };
};

