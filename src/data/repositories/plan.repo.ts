import { httpClient } from '@/package/http';
import { API_ENDPOINTS } from '@/data/configs/apiEndpoints';
import type {
  PlanResponse,
  PlanListResponse,
  CreatePlanRequest,
  UpdatePlanRequest,
  PlanListParams,
} from '@/data/models/plan.models';

/**
 * List all plans with pagination
 * @param params - Query parameters for pagination, search, and sorting
 * @returns Paginated list of plans
 */
export const listPlans = async (
  params?: PlanListParams
): Promise<PlanListResponse> => {
  return httpClient.get<PlanListResponse>(API_ENDPOINTS.plans.list(), {
    params,
  });
};

/**
 * Create a new plan
 * @param data - Plan creation data
 * @returns Created plan data
 */
export const createPlan = async (
  data: CreatePlanRequest
): Promise<PlanResponse> => {
  return httpClient.post<PlanResponse>(API_ENDPOINTS.plans.create(), data);
};

/**
 * Get a plan by ID
 * @param id - Plan ID
 * @returns Plan data
 */
export const getPlanById = async (id: string): Promise<PlanResponse> => {
  return httpClient.get<PlanResponse>(API_ENDPOINTS.plans.getById(id));
};

/**
 * Update a plan
 * @param id - Plan ID
 * @param data - Plan update data
 * @returns Updated plan data
 */
export const updatePlan = async (
  id: string,
  data: UpdatePlanRequest
): Promise<PlanResponse> => {
  return httpClient.patch<PlanResponse>(API_ENDPOINTS.plans.update(id), data);
};

/**
 * Delete a plan (soft delete)
 * @param id - Plan ID
 */
export const deletePlan = async (id: string): Promise<void> => {
  return httpClient.delete<void>(API_ENDPOINTS.plans.delete(id));
};

