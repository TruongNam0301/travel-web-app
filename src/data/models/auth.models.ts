import type { User } from '@/data/entities/user.entities';
import type { ApiResponse } from '@/package/http/types';

/**
 * Register Request
 */
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

/**
 * Login Request
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Refresh Token Request
 * Note: The refresh token is sent via Authorization header, not in the request body
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Logout Request
 * Note: The refresh token is sent via Authorization header, not in the request body
 */
export interface LogoutRequest {
  refreshToken: string;
}

/**
 * Auth Response Data
 */
export interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

/**
 * Auth Response
 * Returned on successful registration or login
 */
export type AuthResponse = ApiResponse<AuthResponseData>;

/**
 * Token Refresh Response Data
 */
export interface TokenRefreshResponseData {
  accessToken: string;
  refreshToken: string;
}

/**
 * Token Refresh Response
 * Returned on successful token refresh
 */
export type TokenRefreshResponse = ApiResponse<TokenRefreshResponseData>;

/**
 * Logout Response Data
 */
export interface LogoutResponseData {
  message: string;
}

/**
 * Logout Response
 */
export type LogoutResponse = ApiResponse<LogoutResponseData>;

