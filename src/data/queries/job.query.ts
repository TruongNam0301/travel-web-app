import { useQuery } from '@tanstack/react-query';
import { listJobsByPlan, getJobById } from '@/data/repositories/job.repo';
import { QUERY_KEYS } from '@/data/configs/queryKeys';
import type { JobListParams } from '@/data/models/job.models';

/**
 * List all jobs for a plan with pagination
 * @param planId - Plan ID
 * @param params - Query parameters for pagination, filtering, and sorting
 * @returns Query result with paginated list of jobs
 */
export const useListJobsByPlan = (planId: string, params?: JobListParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.getListJob, planId, params],
    queryFn: () => listJobsByPlan(planId, params),
  });
};

/**
 * Get a job by ID
 * @param id - Job ID
 * @returns Query result with job data
 */
export const useGetJobById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.getJobById, id],
    queryFn: () => getJobById(id),
  });
};

