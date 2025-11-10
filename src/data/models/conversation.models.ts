import type { Conversation } from '@/data/entities/conversation.entities';
import type { ApiResponse, PaginatedResponse } from '@/package/http/types';

/**
 * Create Conversation Request
 */
export interface CreateConversationRequest {
  title?: string;
  isDefault?: boolean;
}

/**
 * Conversation Response
 */
export type ConversationResponse = ApiResponse<Conversation>;

/**
 * Conversation List Response (Paginated)
 */
export type ConversationListResponse = ApiResponse<PaginatedResponse<Conversation>>;

/**
 * Conversation List Query Parameters
 */
export interface ConversationListParams {
  page?: number;
  limit?: number;
  includeDeleted?: boolean;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

