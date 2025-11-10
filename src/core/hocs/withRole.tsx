import { useEffect } from 'react';
import type { ComponentType } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { tokenManager } from '@/package/storage';
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

      useEffect(() => {
        const isAuthenticated = tokenManager.isAuthenticated();
        
        // First check if user is authenticated at all
        if (!isAuthenticated) {
          // Clear any stale tokens
          tokenManager.clearTokens();
          
          // Redirect to login with the current location for redirect after login
          navigate('/login', {
            replace: true,
            state: { from: location },
          });
          return;
        }

        // Check user role
        const userRole = tokenManager.getUserRoleFromToken();
        
        if (!userRole || !allowedRoles.includes(userRole as UserRole)) {
          // User doesn't have required role - redirect to unauthorized page
          navigate('/unauthorized', { replace: true });
        }
      }, [navigate, location]);

      // Verify authentication and role before rendering
      if (!tokenManager.isAuthenticated()) {
        return null;
      }

      const userRole = tokenManager.getUserRoleFromToken();
      if (!userRole || !allowedRoles.includes(userRole as UserRole)) {
        return null;
      }

      return <Component {...props} />;
    };
  };
}

