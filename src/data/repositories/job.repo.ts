import { httpClient } from '@/package/http';
import { API_ENDPOINTS } from '@/data/configs/apiEndpoints';
import type {
  JobResponse,
  JobListResponse,
  CreateJobRequest,
  UpdateJobRequest,
  JobListParams,
} from '@/data/models/job.models';

/**
 * Create a new job for a plan
 * @param planId - Plan ID
 * @param data - Job creation data
 * @returns Created job data
 */
export const createJob = async (
  planId: string,
  data: CreateJobRequest
): Promise<JobResponse> => {
  return httpClient.post<JobResponse>(API_ENDPOINTS.jobs.create(planId), data);
};

/**
 * List all jobs for a plan with pagination
 * @param planId - Plan ID
 * @param params - Query parameters for pagination, filtering, and sorting
 * @returns Paginated list of jobs
 */
export const listJobsByPlan = async (
  planId: string,
  params?: JobListParams
): Promise<JobListResponse> => {
  return httpClient.get<JobListResponse>(
    API_ENDPOINTS.jobs.listByPlan(planId),
    {
      params,
    }
  );
};

/**
 * Get a job by ID
 * @param id - Job ID
 * @returns Job data
 */
export const getJobById = async (id: string): Promise<JobResponse> => {
  return httpClient.get<JobResponse>(API_ENDPOINTS.jobs.getById(id));
};

/**
 * Update a job
 * @param id - Job ID
 * @param data - Job update data
 * @returns Updated job data
 */
export const updateJob = async (
  id: string,
  data: UpdateJobRequest
): Promise<JobResponse> => {
  return httpClient.patch<JobResponse>(API_ENDPOINTS.jobs.update(id), data);
};

/**
 * Cancel a job
 * @param id - Job ID
 */
export const cancelJob = async (id: string): Promise<void> => {
  return httpClient.delete<void>(API_ENDPOINTS.jobs.cancel(id));
};

