import { useMutation } from '@tanstack/react-query';
import { createMessage } from '@/data/repositories/message.repo';
import type { CreateMessageRequest } from '@/data/models/message.models';

/**
 * Create a new message in a conversation
 * @returns Mutation hook for creating a message
 */
export const useCreateMessage = () => {
  return useMutation({
    mutationFn: ({
      conversationId,
      data,
    }: {
      conversationId: string;
      data: CreateMessageRequest;
    }) => createMessage(conversationId, data),
  });
};

