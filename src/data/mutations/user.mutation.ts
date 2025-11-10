import { useMutation } from '@tanstack/react-query';
import { updateCurrentUser } from '@/data/repositories/user.repo';
import type { UpdateUserRequest } from '@/data/models/user.models';

/**
 * Update current user profile
 * @returns Mutation hook for updating current user
 */
export const useUpdateCurrentUser = () => {
  return useMutation({
    mutationFn: (data: UpdateUserRequest) => updateCurrentUser(data),
  });
};

