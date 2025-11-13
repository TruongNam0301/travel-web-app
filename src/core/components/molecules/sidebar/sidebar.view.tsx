import { Box, Flex, Text, Button, Separator, Avatar } from '@radix-ui/themes'
import { ExitIcon } from '@radix-ui/react-icons'
import type { SidebarProps } from './sidebar.props'
import { sidebarVariants } from './sidebar.variant'
import { useSidebar } from './sidebar.hook'
import { cn } from '@/core/helpers'
import { navigationItems } from './sidebar.constant'

export function SidebarView({ className, variant = 'default' }: SidebarProps) {
  const { user, isActiveRoute, handleNavigation, logout } = useSidebar()

  return (
    <Box
      className={`${sidebarVariants({ variant })} ${className || ''}`.trim()}
    >
      <Flex
        direction="column"
        p="4"
        gap="2"
        style={{ flex: 1, overflowY: 'auto' }}
      >
        <Text size="5" weight="bold" mb="2">
          Plans Agent
        </Text>
        {navigationItems.map((item) => {
          const isActive = isActiveRoute(item.path)
          return (
            <div
              key={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2  transition-colors cursor-pointer  rounded-md',
                {
                  'bg-gray-500 text-black': isActive,
                }
              )}
              onClick={() => handleNavigation(item.path)}
            >
              {item.icon}
              <Text size="2">{item.label}</Text>
            </div>
          )
        })}
      </Flex>

      <Separator size="4" />

      <Box className="border-t border-gray-6 p-4 bg-gray-2">
        {user && (
          <Flex direction="column" gap="3">
            <Flex align="center" gap="3">
              <Avatar
                src={user.avatarUrl || undefined}
                fallback={user.name.charAt(0).toUpperCase()}
                size="3"
                radius="full"
              />
              <Flex direction="column" style={{ flex: 1, minWidth: 0 }}>
                <Text size="2" weight="medium" truncate>
                  {user.name}
                </Text>
                <Text size="1" color="gray" truncate>
                  {user.email}
                </Text>
              </Flex>
            </Flex>
            <Button
              variant="soft"
              color="red"
              size="2"
              onClick={logout}
              className="w-full cursor-pointer"
            >
              <ExitIcon />
              Logout
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
  )
}
