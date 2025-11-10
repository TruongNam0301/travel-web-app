import { useMutation } from '@tanstack/react-query';
import {
  createPlan,
  updatePlan,
  deletePlan,
} from '@/data/repositories/plan.repo';
import type { CreatePlanRequest, UpdatePlanRequest } from '@/data/models/plan.models';

/**
 * Create a new plan
 * @returns Mutation hook for creating a plan
 */
export const useCreatePlan = () => {
  return useMutation({
    mutationFn: (data: CreatePlanRequest) => createPlan(data),
  });
};

/**
 * Update a plan
 * @returns Mutation hook for updating a plan
 */
export const useUpdatePlan = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePlanRequest }) =>
      updatePlan(id, data),
  });
};

/**
 * Delete a plan (soft delete)
 * @returns Mutation hook for deleting a plan
 */
export const useDeletePlan = () => {
  return useMutation({
    mutationFn: (id: string) => deletePlan(id),
  });
};

