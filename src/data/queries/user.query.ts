import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/data/repositories/user.repo';
import { QUERY_KEYS } from '@/data/configs/queryKeys';

/**
 * Get current user profile
 * @returns Query result with current user data
 */
export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.getCurrentUser],
    queryFn: () => getCurrentUser(),
  });
};

