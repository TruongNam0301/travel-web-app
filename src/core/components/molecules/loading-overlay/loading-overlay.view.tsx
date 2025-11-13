import { Flex, Spinner, Text } from '@radix-ui/themes'
import type { LoadingOverlayProps } from './loading-overlay.props'
import {
  loadingOverlayVariants,
  loadingOverlayCardVariants,
} from './loading-overlay.variant'

export function LoadingOverlayView({
  isLoading = true,
  message,
  size = '3',
  variant = 'default',
}: LoadingOverlayProps) {
  if (!isLoading) return null

  const showCard = variant !== 'minimal'
  const getTextColor = () => {
    if (variant === 'minimal' || variant === 'transparent') {
      return undefined // Will use inline style for white
    }
    return 'gray' as const
  }

  const getTextStyle = () => {
    if (variant === 'minimal' || variant === 'transparent') {
      return { color: 'white' }
    }
    return undefined
  }

  return (
    <div className={loadingOverlayVariants({ variant })}>
      {showCard ? (
        <div className={loadingOverlayCardVariants({ variant })}>
          <Spinner size={size as '1' | '2' | '3'} />
          {message && (
            <Text
              size="3"
              weight="medium"
              color={getTextColor()}
              style={getTextStyle()}
            >
              {message}
            </Text>
          )}
        </div>
      ) : (
        <Flex direction="column" align="center" justify="center" gap="4">
          <Spinner size={size as '1' | '2' | '3'} />
          {message && (
            <Text
              size="3"
              weight="medium"
              color={getTextColor()}
              style={getTextStyle()}
            >
              {message}
            </Text>
          )}
        </Flex>
      )}
    </div>
  )
}
