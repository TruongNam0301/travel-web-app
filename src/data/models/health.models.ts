import type { ApiResponse } from '@/package/http/types';

/**
 * Health Check Data
 */
export interface HealthCheckData {
  status: string;
  uptime: number;
  timestamp: string;
  responseTime: number;
  environment: string;
  checks: {
    database: {
      status: string;
      responseTime: number;
    };
    memory: {
      status: string;
      heapUsed: number;
      heapTotal: number;
      rss: number;
    };
    disk: {
      status: string;
      free: number;
      total: number;
      percentFree: number;
    };
  };
}

/**
 * Health Check Response
 */
export type HealthResponse = ApiResponse<HealthCheckData>;

/**
 * Readiness Data
 */
export interface ReadinessData {
  status: string;
}

/**
 * Readiness Response
 */
export type ReadinessResponse = ApiResponse<ReadinessData>;

/**
 * Liveness Data
 */
export interface LivenessData {
  status: string;
}

/**
 * Liveness Response
 */
export type LivenessResponse = ApiResponse<LivenessData>;

