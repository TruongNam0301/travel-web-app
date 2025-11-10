import { useNavigate, useLocation } from 'react-router-dom';
import { tokenManager } from '@/package/storage';

interface LocationState {
  from?: {
    pathname: string;
  };
}

/**
 * Login Hook
 * Custom hook containing login logic and state management
 */
export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect location if user was redirected here from a protected route
  const from = (location.state as LocationState)?.from?.pathname || '/dashboard';

  const handleLogin = (role: 'user' | 'admin') => {
    // Mock login - In real app, this would call an API
    // For demo purposes, we'll create a mock JWT token
    const mockAccessToken = createMockToken({ sub: '123', role, exp: Math.floor(Date.now() / 1000) + 3600 });
    const mockRefreshToken = 'mock-refresh-token';
    
    tokenManager.setTokens(mockAccessToken, mockRefreshToken);
    
    // Redirect to the page they were trying to access or dashboard
    navigate(from, { replace: true });
  };

  return {
    handleLogin,
  };
}

// Helper function to create a mock JWT token
function createMockToken(payload: Record<string, string | number>): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = 'mock-signature';
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

