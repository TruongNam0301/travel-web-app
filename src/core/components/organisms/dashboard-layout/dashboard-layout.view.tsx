import { Box, Flex } from '@radix-ui/themes'
import { Sidebar } from '@/core/components/molecules'
import { Outlet } from 'react-router-dom'

export function DashboardLayoutView() {
  return (
    <Flex minHeight="100vh" width="100%">
      <Sidebar />
      <Box
        asChild
        style={{
          marginLeft: '16rem',
          flex: 1,
          minHeight: '100vh',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <Flex direction="column">
          <Outlet />
        </Flex>
      </Box>
    </Flex>
  )
}
