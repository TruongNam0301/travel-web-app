/**
 * Query Keys Configuration
 * Centralized query key constants for TanStack Query
 * Used as [QUERY_KEYS.operation, params] pattern
 */

export const QUERY_KEYS = {
  /**
   * Plan query keys
   */
  getListPlan: 'getListPlan',
  getPlanById: 'getPlanById',

  /**
   * Job query keys
   */
  getListJob: 'getListJob',
  getJobById: 'getJobById',

  /**
   * Conversation query keys
   */
  getListConversation: 'getListConversation',
  getConversationById: 'getConversationById',

  /**
   * Message query keys
   */
  getListMessage: 'getListMessage',

  /**
   * User query keys
   */
  getCurrentUser: 'getCurrentUser',
} as const;

