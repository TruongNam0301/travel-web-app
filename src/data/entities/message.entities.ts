import { type MessageRole } from '@/data/enums/messageRole.enums';

/**
 * Message Entity
 * Represents a message in a conversation
 */
export interface Message {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  createdBy: string;
  isDeleted: boolean;
  createdAt: string;
}

