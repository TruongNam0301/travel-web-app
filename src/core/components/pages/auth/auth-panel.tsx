import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import type { ReactNode } from 'react'

type AuthPanelProps = {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthPanel({
  title,
  description,
  children,
  footer,
}: AuthPanelProps) {
  return (
    <Card
      size="4"
      style={{
        width: '100%',
        maxWidth: 480,
        boxShadow:
          '0 10px 30px hsl(250 50% 35% / 0.15), 0 2px 12px hsl(250 60% 45% / 0.12)',
      }}
    >
      <Flex direction="column" gap="6">
        <Flex direction="column" gap="2">
          <Heading size="7">{title}</Heading>
          <Text color="gray">{description}</Text>
        </Flex>

        {children}

        {footer ? (
          <Flex direction="column" gap="3">
            <div />
            {footer}
          </Flex>
        ) : null}
      </Flex>
    </Card>
  )
}
