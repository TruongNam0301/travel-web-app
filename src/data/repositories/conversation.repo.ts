import { httpClient } from '@/package/http';
import { API_ENDPOINTS } from '@/data/configs/apiEndpoints';
import type {
  ConversationResponse,
  ConversationListResponse,
  CreateConversationRequest,
  ConversationListParams,
} from '@/data/models/conversation.models';

/**
 * List all conversations for a plan with pagination
 * @param planId - Plan ID
 * @param params - Query parameters for pagination and sorting
 * @returns Paginated list of conversations
 */
export const listConversations = async (
  planId: string,
  params?: ConversationListParams
): Promise<ConversationListResponse> => {
  return httpClient.get<ConversationListResponse>(
    API_ENDPOINTS.conversations.list(planId),
    {
      params,
    }
  );
};

/**
 * Create a new conversation for a plan
 * @param planId - Plan ID
 * @param data - Conversation creation data
 * @returns Created conversation data
 */
export const createConversation = async (
  planId: string,
  data: CreateConversationRequest
): Promise<ConversationResponse> => {
  return httpClient.post<ConversationResponse>(
    API_ENDPOINTS.conversations.create(planId),
    data
  );
};

/**
 * Get a conversation by ID
 * @param id - Conversation ID
 * @returns Conversation data
 */
export const getConversationById = async (
  id: string
): Promise<ConversationResponse> => {
  return httpClient.get<ConversationResponse>(
    API_ENDPOINTS.conversations.getById(id)
  );
};

