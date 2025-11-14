/**
 * Plan Entity
 * Represents a travel plan
 */
export interface Plan {
  id: string
  userId: string
  title: string
  metadata: {
    description?: string
    startDate?: string
    endDate?: string
  }
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}
