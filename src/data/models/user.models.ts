import type { User } from '@/data/entities/user.entities';
import type { ApiResponse } from '@/package/http/types';

/**
 * Update User Request
 */
export interface UpdateUserRequest {
  name?: string;
  avatarUrl?: string;
  preferences?: Record<string, unknown>;
  settings?: Record<string, unknown>;
}

/**
 * User Response
 */
export type UserResponse = ApiResponse<User>;

