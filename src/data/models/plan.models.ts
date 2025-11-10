import type { Plan } from '@/data/entities/plan.entities';
import type { ApiResponse, PaginatedResponse } from '@/package/http/types';

/**
 * Create Plan Request
 */
export interface CreatePlanRequest {
  title: string;
  metadata?: Record<string, unknown>;
}

/**
 * Update Plan Request
 */
export interface UpdatePlanRequest {
  title?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Plan Response
 */
export type PlanResponse = ApiResponse<Plan>;

/**
 * Plan List Response (Paginated)
 */
export type PlanListResponse = ApiResponse<PaginatedResponse<Plan>>;

/**
 * Plan List Query Parameters
 */
export interface PlanListParams {
  page?: number;
  limit?: number;
  search?: string;
  includeDeleted?: boolean;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

