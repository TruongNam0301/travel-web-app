/**
 * Conversation Entity
 * Represents a conversation within a plan
 */
export interface Conversation {
  id: string;
  planId: string;
  title: string | null;
  isDefault: boolean;
  messageCount: number;
  lastMessageAt: string | null;
  lastMessagePreview: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

