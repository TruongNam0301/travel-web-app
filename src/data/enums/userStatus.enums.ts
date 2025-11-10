/**
 * User Status
 * Represents the status of a user account
 */
export const EnumUserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

export type UserStatus = (typeof EnumUserStatus)[keyof typeof EnumUserStatus];

