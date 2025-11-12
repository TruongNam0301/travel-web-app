import { httpClient } from '@/package/http';
import { API_ENDPOINTS } from '@/data/configs/apiEndpoints';
import type {
  RegisterRequest,
  LoginRequest,
  AuthResponseData,
  TokenRefreshResponseData,
  LogoutResponseData,
} from '@/data/models/auth.models';

/**
 * Register a new user
 * @param data - Registration data
 * @returns Auth response with tokens and user data
 */
export const register = async (
  data: RegisterRequest
): Promise<AuthResponseData> => {
  return httpClient.post<AuthResponseData>(
    API_ENDPOINTS.auth.register(),
    data
  );
};

/**
 * Login user
 * @param data - Login credentials
 * @returns Auth response with tokens and user data
 */
export const login = async (data: LoginRequest): Promise<AuthResponseData> => {
  return httpClient.post<AuthResponseData>(API_ENDPOINTS.auth.login(), data);
};

/**
 * Refresh access token
 * @param refreshToken - The refresh token to use for getting new tokens
 * @returns New tokens
 */
export const refreshToken = async (
  refreshToken: string
): Promise<TokenRefreshResponseData> => {
  return httpClient.post<TokenRefreshResponseData>(
    API_ENDPOINTS.auth.refresh(),
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    }
  );
};

/**
 * Logout user
 * @param refreshToken - The refresh token to revoke
 * @returns Logout response
 */
export const logout = async (
  refreshToken: string
): Promise<LogoutResponseData> => {
  return httpClient.post<LogoutResponseData>(
    API_ENDPOINTS.auth.logout(),
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    }
  );
};

