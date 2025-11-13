import type { LoadingOverlayVariantProps } from './loading-overlay.variant'

/**
 * Loading Overlay Props
 * Type definitions for LoadingOverlay component
 */
export interface LoadingOverlayProps extends LoadingOverlayVariantProps {
  /**
   * Whether the loading overlay is visible
   */
  isLoading?: boolean
  /**
   * Optional loading message to display
   */
  message?: string
  /**
   * Optional spinner size
   */
  size?: '1' | '2' | '3' | '4'
}
