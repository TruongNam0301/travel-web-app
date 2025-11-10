import { useMutation } from '@tanstack/react-query';
import {
  createJob,
  updateJob,
  cancelJob,
} from '@/data/repositories/job.repo';
import type { CreateJobRequest, UpdateJobRequest } from '@/data/models/job.models';

/**
 * Create a new job for a plan
 * @returns Mutation hook for creating a job
 */
export const useCreateJob = () => {
  return useMutation({
    mutationFn: ({ planId, data }: { planId: string; data: CreateJobRequest }) =>
      createJob(planId, data),
  });
};

/**
 * Update a job
 * @returns Mutation hook for updating a job
 */
export const useUpdateJob = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateJobRequest }) =>
      updateJob(id, data),
  });
};

/**
 * Cancel a job
 * @returns Mutation hook for canceling a job
 */
export const useCancelJob = () => {
  return useMutation({
    mutationFn: (id: string) => cancelJob(id),
  });
};

