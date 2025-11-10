import { useQuery } from '@tanstack/react-query';
import { listPlans, getPlanById } from '@/data/repositories/plan.repo';
import { QUERY_KEYS } from '@/data/configs/queryKeys';
import type { PlanListParams } from '@/data/models/plan.models';

/**
 * List all plans with pagination
 * @param params - Query parameters for pagination, search, and sorting
 * @returns Query result with paginated list of plans
 */
export const useListPlans = (params?: PlanListParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.getListPlan, params],
    queryFn: () => listPlans(params),
  });
};

/**
 * Get a plan by ID
 * @param id - Plan ID
 * @returns Query result with plan data
 */
export const useGetPlanById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.getPlanById, id],
    queryFn: () => getPlanById(id),
  });
};

