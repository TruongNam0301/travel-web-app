import { useEffect } from 'react';
import type { ComponentType } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { tokenManager } from '@/package/storage';

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

    useEffect(() => {
      const isAuthenticated = tokenManager.isAuthenticated();
      
      if (!isAuthenticated) {
        // Clear any stale tokens
        tokenManager.clearTokens();
        
        // Redirect to login with the current location for redirect after login
        navigate('/login', {
          replace: true,
          state: { from: location },
        });
      }
    }, [navigate, location]);

    // Only render if authenticated
    if (!tokenManager.isAuthenticated()) {
      return null;
    }

    return <Component {...props} />;
  };
}

