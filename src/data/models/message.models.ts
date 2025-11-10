import type { Message } from '@/data/entities/message.entities';
import type { ApiResponse, PaginatedResponse } from '@/package/http/types';

/**
 * Create Message Request
 */
export interface CreateMessageRequest {
  content: string;
}

/**
 * Message Response
 */
export type MessageResponse = ApiResponse<Message>;

/**
 * Message List Response (Paginated)
 */
export type MessageListResponse = ApiResponse<PaginatedResponse<Message>>;

/**
 * Message List Query Parameters
 */
export interface MessageListParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

