import { useEffect } from 'react';
import type { ComponentType } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/core/stores';
import { TokenManager } from '@/package/storage';

/**
 * Higher-Order Component for authentication protection
 * Ensures user is authenticated before accessing the wrapped component
 * 
 * @param Component - The component to protect
 * @returns Protected component that redirects to login if not authenticated
 */
export function withAuth<P extends object>(
  Component: ComponentType<P>
): ComponentType<P> {
  return function AuthenticatedComponent(props: P) {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, isInitialized, isLoading } = useAuthStore();

    useEffect(() => {
      // Wait for auth to be initialized before checking
      if (!isInitialized) return;

      if (!isAuthenticated) {
        // Clear any stale tokens
        TokenManager.clearTokens();
        
        // Redirect to login with the current location for redirect after login
        navigate('/login', {
          replace: true,
          state: { from: location },
        });
      }
    }, [isAuthenticated, isInitialized, navigate, location]);

    // Show loading state while auth is initializing
    if (!isInitialized || isLoading) {
      return null;
    }

    // Only render if authenticated
    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}

