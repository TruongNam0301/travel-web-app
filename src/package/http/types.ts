
export interface ApiResponse<T = unknown> {
  success: true;
  data: T;
  timestamp: string;
}


export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
}


export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

/**
 * HTTP client configuration options
 */
export interface HttpClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * Custom error class for API errors
 */
export class ApiErrorException extends Error {
  public readonly statusCode: number;
  public readonly path: string;
  public readonly timestamp: string;
  public readonly success = false as const;

  constructor(error: ApiError) {
    super(error.message);
    this.name = 'ApiErrorException';
    this.statusCode = error.statusCode;
    this.path = error.path;
    this.timestamp = error.timestamp;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    const captureStackTrace = (Error as typeof Error & {
      captureStackTrace?: (targetObject: object, constructorOpt?: unknown) => void;
    }).captureStackTrace;
    
    if (captureStackTrace) {
      captureStackTrace(this, ApiErrorException);
    }
  }

  /**
   * Convert to plain object
   */
  toJSON(): ApiError {
    return {
      success: false,
      message: this.message,
      statusCode: this.statusCode,
      path: this.path,
      timestamp: this.timestamp,
    };
  }
}

