import { useQuery } from '@tanstack/react-query';
import {
  listConversations,
  getConversationById,
} from '@/data/repositories/conversation.repo';
import { QUERY_KEYS } from '@/data/configs/queryKeys';
import type { ConversationListParams } from '@/data/models/conversation.models';

/**
 * List all conversations for a plan with pagination
 * @param planId - Plan ID
 * @param params - Query parameters for pagination and sorting
 * @returns Query result with paginated list of conversations
 */
export const useListConversations = (
  planId: string,
  params?: ConversationListParams
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.getListConversation, planId, params],
    queryFn: () => listConversations(planId, params),
  });
};

/**
 * Get a conversation by ID
 * @param id - Conversation ID
 * @returns Query result with conversation data
 */
export const useGetConversationById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.getConversationById, id],
    queryFn: () => getConversationById(id),
  });
};

