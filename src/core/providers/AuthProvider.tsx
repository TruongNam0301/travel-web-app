import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuthStore } from '@/core/stores';
import { TokenManager } from '@/package/storage';
import { getCurrentUser } from '@/data/repositories/user.repo';

interface AuthProviderProps {
  children: ReactNode;
}


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setUser, clearUser, setLoading, setInitialized, isLoading } = useAuthStore();

  useEffect(() => {
    console.log('AuthProvider useEffect');
    const initAuth = async () => {
      setLoading(true);

      try {
        const hasTokens = TokenManager.isHasTokens();    

        if (!hasTokens) {
          clearUser();
          return;
        }

        const user = await getCurrentUser();


        setUser(user?.data ?? null);
      } catch (error) {
        console.error('Auth initialization failed:', error);

        TokenManager.clearTokens();
        clearUser();
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initAuth();
  }, [setUser, clearUser, setLoading, setInitialized]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

