import { httpClient } from '@/package/http';
import { API_ENDPOINTS } from '@/data/configs/apiEndpoints';
import type {
  HealthResponse,
  ReadinessResponse,
  LivenessResponse,
} from '@/data/models/health.models';

/**
 * Check comprehensive health status of the application
 * @returns Health check data
 */
export const checkHealth = async (): Promise<HealthResponse> => {
  return httpClient.get<HealthResponse>(API_ENDPOINTS.health.check());
};

/**
 * Check if the application is ready to serve traffic
 * @returns Readiness status
 */
export const checkReadiness = async (): Promise<ReadinessResponse> => {
  return httpClient.get<ReadinessResponse>(API_ENDPOINTS.health.ready());
};

/**
 * Simple liveness check
 * @returns Liveness status
 */
export const checkLiveness = async (): Promise<LivenessResponse> => {
  return httpClient.get<LivenessResponse>(API_ENDPOINTS.health.live());
};

