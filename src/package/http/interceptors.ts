/**
 * HTTP Interceptors
 * Request and response interceptors for authentication and error handling
 */

import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { tokenManager } from '@/package/storage';
import { isApiError } from './client';
import type { ApiError } from './types';
import { ApiErrorException } from './types';
import type { TokenRefreshResponse } from '@/data';

/**
 * State for managing token refresh
 * 
 * When a 401 error occurs, the first request triggers a token refresh.
 * Subsequent requests are queued and will be retried after the refresh completes.
 */
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

/**
 * Process queued requests after token refresh
 * @param error - Error to reject all queued requests with, or null to resolve them
 */
const processQueue = (error: Error | null = null): void => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });

  failedQueue = [];
};

/**
 * Handle failed token refresh
 * Clears tokens, resets refresh state, and redirects to login
 */
const handleTokenRefreshFailure = (error?: Error): void => {
  tokenManager.clearTokens();
  isRefreshing = false;
  processQueue(error || new Error('Token refresh failed'));

  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

/**
 * Refresh access token using refresh token
 * @param instance - Axios instance to use for the request
 * @returns Promise with new access and refresh tokens
 */
async function refreshAccessToken(
  instance: AxiosInstance
): Promise<{ accessToken: string; refreshToken: string }> {
  const refreshToken = tokenManager.getRefreshToken();
  
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await instance.post<TokenRefreshResponse>(
    '/auth/refresh',
    { refreshToken }
  );

  return response.data.data;
}

/**
 * Queue request to be retried after token refresh
 * @param instance - Axios instance to use for retrying
 * @param config - Original request configuration
 * @returns Promise that resolves when token refresh completes and request is retried
 */
function queueFailedRequest(
  instance: AxiosInstance,
  config: InternalAxiosRequestConfig
): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    failedQueue.push({ resolve, reject });
  })
    .then(() => {
      // Retry original request with new token
      const accessToken = tokenManager.getAccessToken();
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return instance(config);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

/**
 * Setup request interceptor
 * Adds authentication token to all requests
 */
export function setupRequestInterceptor(instance: AxiosInstance): void {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Get access token from token manager
      const accessToken = tokenManager.getAccessToken();

      // Add token to request headers if it exists
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
}

/**
 * Setup response interceptor
 * Handles token refresh on 401 errors and transforms API errors
 */
export function setupResponseInterceptor(instance: AxiosInstance): void {
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Return successful response as-is
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      // Handle 401 Unauthorized errors with token refresh
      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        // Check if this is a token refresh request itself
        if (originalRequest.url?.includes('/auth/refresh')) {
          handleTokenRefreshFailure();
          return Promise.reject(error);
        }

        // If already refreshing, queue this request
        if (isRefreshing) {
          return queueFailedRequest(instance, originalRequest);
        }

        // Mark as retrying to prevent infinite loops
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Attempt to refresh the access token
          const { accessToken, refreshToken: newRefreshToken } = await refreshAccessToken(instance);

          // Update tokens
          tokenManager.setTokens(accessToken, newRefreshToken);

          // Update authorization header for the original request
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }

          // Process queued requests
          processQueue();
          isRefreshing = false;

          // Retry the original request
          return instance(originalRequest);
        } catch (refreshError) {
          handleTokenRefreshFailure(refreshError as Error);
          return Promise.reject(refreshError);
        }
      }

      // Transform API errors to ApiErrorException
      if (error.response?.data && isApiError(error.response.data)) {
        const apiError = error.response.data as ApiError;
        const errorException = createApiErrorException(apiError);
        return Promise.reject(errorException);
      }

      // For network errors or other errors without response
      if (!error.response) {
        const errorMessage = error.code === 'ECONNABORTED' 
          ? 'Request timeout. Please try again.'
          : error.code === 'ERR_NETWORK'
          ? 'Network error. Please check your connection.'
          : 'An unexpected error occurred';

        return Promise.reject(new Error(errorMessage));
      }

      // Return other errors as-is
      return Promise.reject(error);
    }
  );
}

/**
 * Create ApiErrorException from ApiError
 */
function createApiErrorException(error: ApiError): ApiErrorException {
  return new ApiErrorException(error);
}

/**
 * Setup all interceptors
 */
export function setupInterceptors(instance: AxiosInstance): void {
  setupRequestInterceptor(instance);
  setupResponseInterceptor(instance);
}

/**
 * Reset refresh state
 * Useful for testing or manual intervention
 */
export function resetRefreshState(): void {
  isRefreshing = false;
  failedQueue = [];
}

