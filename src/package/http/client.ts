/**
 * HTTP Client
 * Axios instance with base configuration for API communication
 */

import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError } from 'axios';
import type {
  ApiResponse,
  ApiError,
  HttpClientConfig,
} from './types';

/**
 * Default HTTP client configuration
 */
const DEFAULT_CONFIG: HttpClientConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Create axios instance with default configuration
 */
const axiosInstance: AxiosInstance = axios.create(DEFAULT_CONFIG);

/**
 * Type guard to check if error is an AxiosError
 */
export function isAxiosError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error);
}

/**
 * Type guard to check if response is an API error
 */
export function isApiError(data: unknown): data is ApiError {
  return (
    typeof data === 'object' &&
    data !== null &&
    'success' in data &&
    data.success === false &&
    'message' in data &&
    'statusCode' in data
  );
}

/**
 * Extract error message from various error types
 */
export function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    // API returned an error response
    if (error.response?.data && isApiError(error.response.data)) {
      return error.response.data.message;
    }

    // Network or timeout error
    if (error.code === 'ECONNABORTED') {
      return 'Request timeout. Please try again.';
    }

    if (error.code === 'ERR_NETWORK') {
      return 'Network error. Please check your connection.';
    }

    // Generic axios error
    return error.message || 'An unexpected error occurred';
  }

  // Generic error
  if (error instanceof Error) {
    return error.message;
  }

  // Unknown error
  return 'An unexpected error occurred';
}

/**
 * HTTP Client class
 * Provides typed methods for making API requests
 */
class HttpClient {
  private instance: AxiosInstance;

  constructor(config?: Partial<HttpClientConfig>) {
    this.instance = axios.create({
      ...DEFAULT_CONFIG,
      ...config,
    });
  }

  /**
   * Get the axios instance
   * Useful for adding interceptors
   */
  getInstance(): AxiosInstance {
    return this.instance;
  }

  /**
   * Make a GET request
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    return response.data.data;
  }

  /**
   * Make a POST request
   */
  async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.post<ApiResponse<T>>(
      url,
      data,
      config
    );
    return response.data.data;
  }

  /**
   * Make a PUT request
   */
  async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  /**
   * Make a PATCH request
   */
  async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.patch<ApiResponse<T>>(
      url,
      data,
      config
    );
    return response.data.data;
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);
    return response.data.data;
  }

  /**
   * Set base URL
   */
  setBaseURL(baseURL: string): void {
    this.instance.defaults.baseURL = baseURL;
  }

  /**
   * Set default header
   */
  setHeader(key: string, value: string): void {
    this.instance.defaults.headers.common[key] = value;
  }

  /**
   * Remove default header
   */
  removeHeader(key: string): void {
    delete this.instance.defaults.headers.common[key];
  }
}

// Export singleton instance
export const httpClient = new HttpClient();

// Export the raw axios instance for advanced usage
export { axiosInstance };

// Export class for testing purposes
export { HttpClient };

