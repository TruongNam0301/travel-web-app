/**
 * HTTP Package
 * Provides HTTP client with interceptors for API communication
 */

export { httpClient, axiosInstance, HttpClient } from './client';

// Interceptors
export {
  setupInterceptors,
  setupRequestInterceptor,
  setupResponseInterceptor,
  resetRefreshState,
} from './interceptors';

// Utility functions
export { isAxiosError, isApiError, getErrorMessage } from './client';

// Types
export type {
  ApiResponse,
  ApiError,
  PaginatedResponse,
  PaginationParams,
  HttpClientConfig,
} from './types';

// Export ApiErrorException class
export { ApiErrorException } from './types';

// Setup interceptors on the default instance
import { axiosInstance } from './client';
import { setupInterceptors } from './interceptors';

// Auto-setup interceptors on import
setupInterceptors(axiosInstance);

