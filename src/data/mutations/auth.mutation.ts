import { useMutation } from '@tanstack/react-query';
import {
  register,
  login,
  logout,
  refreshToken,
} from '@/data/repositories/auth.repo';
import type {
  RegisterRequest,
  LoginRequest,
} from '@/data/models/auth.models';

/**
 * Register a new user
 * @returns Mutation hook for user registration
 */
export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
  });
};

/**
 * Login user
 * @returns Mutation hook for user login
 */
export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
  });
};

/**
 * Logout user
 * @returns Mutation hook for user logout
 */
export const useLogout = () => {
  return useMutation({
      mutationFn: (refreshToken: string) => logout(refreshToken),
  });
};

/**
 * Refresh access token
 * @returns Mutation hook for refreshing tokens
 */
export const useRefreshToken = () => {
  return useMutation({
    mutationFn: (token: string) => refreshToken(token),
  });
};

