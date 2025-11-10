/**
 * User Role
 * Represents the role/permissions of a user
 */
export const EnumUserRole = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

export type UserRole = (typeof EnumUserRole)[keyof typeof EnumUserRole];

