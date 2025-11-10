import { useQuery } from '@tanstack/react-query';
import { listMessages } from '@/data/repositories/message.repo';
import { QUERY_KEYS } from '@/data/configs/queryKeys';
import type { MessageListParams } from '@/data/models/message.models';

/**
 * List all messages in a conversation with pagination
 * @param conversationId - Conversation ID
 * @param params - Query parameters for pagination and sorting
 * @returns Query result with paginated list of messages
 */
export const useListMessages = (
  conversationId: string,
  params?: MessageListParams
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.getListMessage, conversationId, params],
    queryFn: () => listMessages(conversationId, params),
  });
};

