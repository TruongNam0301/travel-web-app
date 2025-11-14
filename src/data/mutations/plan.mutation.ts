import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createPlan,
  updatePlan,
  deletePlan,
} from '@/data/repositories/plan.repo'
import type {
  CreatePlanRequest,
  UpdatePlanRequest,
} from '@/data/models/plan.models'
import { QUERY_KEYS } from '@/data/configs/queryKeys'

/**
 * Create a new plan
 * @returns Mutation hook for creating a plan
 */
export const useCreatePlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePlanRequest) => createPlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getListPlan],
      })
    },
  })
}

/**
 * Update a plan
 * @returns Mutation hook for updating a plan
 */
export const useUpdatePlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePlanRequest }) =>
      updatePlan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getListPlan],
      })
    },
  })
}

/**
 * Delete a plan (soft delete)
 * @returns Mutation hook for deleting a plan
 */
export const useDeletePlan = () => {
  return useMutation({
    mutationFn: (id: string) => deletePlan(id),
  })
}
