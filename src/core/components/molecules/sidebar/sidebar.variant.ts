import { cva, type VariantProps } from 'class-variance-authority'

export const sidebarVariants = cva(
  'fixed left-0 top-0 h-full w-64 bg-[var(--color-panel)] border-r border-[var(--gray-6)] flex flex-col z-50',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export type SidebarVariantProps = VariantProps<typeof sidebarVariants>
