/**
 * Message Role
 * Represents the role of the message sender
 */
export const EnumMessageRole = {
  USER: 'user',
  ASSISTANT: 'assistant',
} as const;

export type MessageRole = (typeof EnumMessageRole)[keyof typeof EnumMessageRole];

