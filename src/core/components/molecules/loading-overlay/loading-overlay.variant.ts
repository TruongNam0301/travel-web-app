import { cva, type VariantProps } from 'class-variance-authority'

export const loadingOverlayVariants = cva(
  'fixed inset-0 z-[9999] flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-black/50 backdrop-blur-sm',
        minimal: 'bg-transparent backdrop-blur-none',
        transparent: 'bg-black/20 backdrop-blur-[2px]',
        solid: 'bg-black/90 backdrop-blur-md',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export const loadingOverlayCardVariants = cva(
  'flex flex-col items-center justify-center gap-4 rounded-lg p-6',
  {
    variants: {
      variant: {
        default: 'bg-[var(--color-panel)] shadow-[0_10px_30px_rgba(0,0,0,0.2)]',
        minimal: 'bg-transparent shadow-none',
        transparent: 'bg-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.1)]',
        solid: 'bg-[var(--color-panel)] shadow-[0_10px_30px_rgba(0,0,0,0.4)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

// Text styling is handled via Radix UI Text component props
// This variant is kept for potential future use or custom styling needs
export const loadingOverlayTextVariants = cva('', {
  variants: {
    variant: {
      default: '',
      minimal: '',
      transparent: '',
      solid: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type LoadingOverlayVariantProps = VariantProps<
  typeof loadingOverlayVariants
>
