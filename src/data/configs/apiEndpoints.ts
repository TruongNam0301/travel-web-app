/**
 * API Endpoints Configuration
 * Centralized endpoint builder functions for all API routes
 */

export const API_ENDPOINTS = {
  /**
   * Authentication endpoints
   */
  auth: {
    register: () => '/auth/register',
    login: () => '/auth/login',
    refresh: () => '/auth/refresh',
    logout: () => '/auth/logout',
  },

  /**
   * User endpoints
   */
  users: {
    me: () => '/users/me',
  },

  /**
   * Plan endpoints
   */
  plans: {
    list: () => '/plans',
    create: () => '/plans',
    getById: (id: string) => `/plans/${id}`,
    update: (id: string) => `/plans/${id}`,
    delete: (id: string) => `/plans/${id}`,
  },

  /**
   * Job endpoints
   */
  jobs: {
    create: (planId: string) => `/plans/${planId}/jobs`,
    listByPlan: (planId: string) => `/plans/${planId}/jobs`,
    getById: (id: string) => `/jobs/${id}`,
    update: (id: string) => `/jobs/${id}`,
    cancel: (id: string) => `/jobs/${id}`,
  },

  /**
   * Conversation endpoints
   */
  conversations: {
    list: (planId: string) => `/plans/${planId}/conversations`,
    create: (planId: string) => `/plans/${planId}/conversations`,
    getById: (id: string) => `/conversations/${id}`,
  },

  /**
   * Message endpoints
   */
  messages: {
    create: (conversationId: string) =>
      `/conversations/${conversationId}/messages`,
    list: (conversationId: string) => `/conversations/${conversationId}/messages`,
  },

  /**
   * Health check endpoints
   */
  health: {
    check: () => '/health',
    ready: () => '/health/ready',
    live: () => '/health/live',
  },
} as const;


