import { type JobState } from '@/data/enums/jobState.enums';

/**
 * Job Entity
 * Represents a background job for processing tasks
 */
export interface Job {
  id: string;
  planId: string;
  type: string;
  params: Record<string, unknown>;
  state: JobState;
  result: Record<string, unknown> | null;
  error: string | null;
  priority: number;
  retries: number;
  startedAt: string | null;
  finishedAt: string | null;
  durationMs: number | null;
  createdAt: string;
  updatedAt: string;
}

