import { useMutation } from '@tanstack/react-query';
import { createConversation } from '@/data/repositories/conversation.repo';
import type { CreateConversationRequest } from '@/data/models/conversation.models';

/**
 * Create a new conversation for a plan
 * @returns Mutation hook for creating a conversation
 */
export const useCreateConversation = () => {
  return useMutation({
    mutationFn: ({
      planId,
      data,
    }: {
      planId: string;
      data: CreateConversationRequest;
    }) => createConversation(planId, data),
  });
};

