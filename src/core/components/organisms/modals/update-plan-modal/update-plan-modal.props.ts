import type { Plan } from '@/data/entities/plan.entities'

export interface UpdatePlanModalProps {
  open: boolean
  onClose: () => void
  onOpen: (open: boolean) => void
  plan: Plan
}
