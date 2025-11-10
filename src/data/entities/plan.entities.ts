/**
 * Plan Entity
 * Represents a travel plan
 */
export interface Plan {
  id: string;
  userId: string;
  title: string;
  metadata: Record<string, unknown>;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

