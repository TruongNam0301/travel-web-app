import { httpClient } from '@/package/http';
import { API_ENDPOINTS } from '@/data/configs/apiEndpoints';
import type { UserResponse, UpdateUserRequest } from '@/data/models/user.models';

/**
 * Get current user profile
 * @returns Current user data
 */
export const getCurrentUser = async (): Promise<UserResponse> => {
  return httpClient.get<UserResponse>(API_ENDPOINTS.users.me());
};

/**
 * Update current user profile
 * @param data - User update data
 * @returns Updated user data
 */
export const updateCurrentUser = async (
  data: UpdateUserRequest
): Promise<UserResponse> => {
  return httpClient.patch<UserResponse>(API_ENDPOINTS.users.me(), data);
};

