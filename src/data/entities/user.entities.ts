import { type UserRole } from '@/data/enums/userRole.enums';
import { type UserStatus } from '@/data/enums/userStatus.enums';

/**
 * User Entity
 * Represents a user in the system
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: UserRole;
  status: UserStatus;
  preferences: Record<string, unknown>;
  settings: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
}

