import { Dialog, Flex, Text } from '@radix-ui/themes'
import clsx from 'clsx'

interface BaseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children?: React.ReactNode
  className?: string
}

export const BaseModal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: BaseModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className={clsx('max-w-md', className)}>
        <Flex direction="column" gap="4">
          {/* Title */}
          {title && (
            <Dialog.Title size="5" weight="bold">
              {title}
            </Dialog.Title>
          )}

          {/* Description */}
          {description && (
            <Dialog.Description>
              <Text size="2" color="gray">
                {description}
              </Text>
            </Dialog.Description>
          )}

          {/* Render dynamic children */}
          {children}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
