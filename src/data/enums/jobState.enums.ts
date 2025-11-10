/**
 * Job State
 * Represents the different states a job can be in
 */
export const EnumJobState = {
  PENDING: 'PENDING',
  QUEUED: 'QUEUED',
  PROCESSING: 'PROCESSING',
  RETRYING: 'RETRYING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
} as const;

export type JobState = (typeof EnumJobState)[keyof typeof EnumJobState];

