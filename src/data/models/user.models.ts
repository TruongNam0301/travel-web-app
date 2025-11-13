import type { User } from '@/data/entities/user.entities'

/**
 * Update User Request
 */
export interface UpdateUserRequest {
  name?: string
  avatarUrl?: string
  preferences?: Record<string, unknown>
  settings?: Record<string, unknown>
}

/**
 * User Response
 */
export type UserResponse = User
