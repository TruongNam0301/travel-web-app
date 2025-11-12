import { Box, Flex } from '@radix-ui/themes'

type AuthLayoutProps = {
  children: React.ReactNode
  hero?: React.ReactNode
}

export function AuthLayout({ children, hero }: AuthLayoutProps) {
  return (
    <Flex
      minHeight="100vh"
      width="100%"
      direction={{ initial: 'column', md: 'row' }}
      style={{
        background:
          'radial-gradient(circle at top left, hsl(210 80% 96%), transparent 60%), radial-gradient(circle at bottom right, hsl(160 80% 94%), transparent 55%)',
      }}
    >
      <Flex
        flexGrow="1"
        align="center"
        justify="center"
        px={{ initial: '5', md: '9' }}
        py={{ initial: '8', md: '0' }}
      >
        {children}
      </Flex>

      <Box
        display={{ initial: 'none', md: 'block' }}
        width="45%"
        style={{
          position: 'relative',
          background:
            'linear-gradient(135deg, hsl(210 80% 60%), hsl(250 70% 60%))',
          color: 'white',
        }}
      >
        <Flex
          direction="column"
          justify="between"
          align="start"
          p="8"
          width="100%"
          height="100%"
          gap="8"
          style={{
            backdropFilter: 'blur(12px)',
            backgroundColor: 'hsl(247 61% 13% / 0.35)',
          }}
        >
          {hero}
        </Flex>
      </Box>
    </Flex>
  )
}
