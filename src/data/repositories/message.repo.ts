import { httpClient } from '@/package/http';
import { API_ENDPOINTS } from '@/data/configs/apiEndpoints';
import type {
  MessageResponse,
  MessageListResponse,
  CreateMessageRequest,
  MessageListParams,
} from '@/data/models/message.models';

/**
 * Create a new message in a conversation
 * @param conversationId - Conversation ID
 * @param data - Message creation data
 * @returns Created message data
 */
export const createMessage = async (
  conversationId: string,
  data: CreateMessageRequest
): Promise<MessageResponse> => {
  return httpClient.post<MessageResponse>(
    API_ENDPOINTS.messages.create(conversationId),
    data
  );
};

/**
 * List all messages in a conversation with pagination
 * @param conversationId - Conversation ID
 * @param params - Query parameters for pagination and sorting
 * @returns Paginated list of messages
 */
export const listMessages = async (
  conversationId: string,
  params?: MessageListParams
): Promise<MessageListResponse> => {
  return httpClient.get<MessageListResponse>(
    API_ENDPOINTS.messages.list(conversationId),
    {
      params,
    }
  );
};

