import type { Job } from '@/data/entities/job.entities';
import type { JobState } from '@/data/enums/jobState.enums';
import type { ApiResponse, PaginatedResponse } from '@/package/http/types';

/**
 * Create Job Request
 */
export interface CreateJobRequest {
  type: string;
  params?: Record<string, unknown>;
  priority?: number;
}

/**
 * Update Job Request
 */
export interface UpdateJobRequest {
  params?: Record<string, unknown>;
  priority?: number;
}

/**
 * Job Response
 */
export type JobResponse = ApiResponse<Job>;

/**
 * Job List Response (Paginated)
 */
export type JobListResponse = ApiResponse<PaginatedResponse<Job>>;

/**
 * Job List Query Parameters
 */
export interface JobListParams {
  page?: number;
  limit?: number;
  state?: JobState;
  type?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

