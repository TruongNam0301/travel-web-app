import { useEffect } from 'react';
import type { ComponentType } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/core/stores';
import { TokenManager } from '@/package/storage';
import type { UserRole } from '@/data';

/**
 * Higher-Order Component for role-based access control
 * Ensures user has the required role before accessing the wrapped component
 * 
 * @param allowedRoles - Array of roles that are allowed to access the component
 * @returns HOC function that wraps the component with role checking
 */
export function withRole<P extends object>(
  allowedRoles: UserRole[]
): (Component: ComponentType<P>) => ComponentType<P> {
  return function (Component: ComponentType<P>): ComponentType<P> {
    return function RoleProtectedComponent(props: P) {
      const navigate = useNavigate();
      const location = useLocation();
      const { user, isAuthenticated, isInitialized, isLoading } = useAuthStore();

      useEffect(() => {
        // Wait for auth to be initialized before checking
        if (!isInitialized) return;

        // First check if user is authenticated at all
        if (!isAuthenticated || !user) {
          // Clear any stale tokens
          TokenManager.clearTokens();
          
          // Redirect to login with the current location for redirect after login
          navigate('/login', {
            replace: true,
            state: { from: location },
          });
          return;
        }

        // Check user role from store
        if (!allowedRoles.includes(user.role)) {
          // User doesn't have required role - redirect to unauthorized page
          navigate('/unauthorized', { replace: true });
        }
      }, [user, isAuthenticated, isInitialized, navigate, location]);

      // Show loading state while auth is initializing
      if (!isInitialized || isLoading) {
        return null;
      }

      // Verify authentication and role before rendering
      if (!isAuthenticated || !user) {
        return null;
      }

      if (!allowedRoles.includes(user.role)) {
        return null;
      }

      return <Component {...props} />;
    };
  };
}

