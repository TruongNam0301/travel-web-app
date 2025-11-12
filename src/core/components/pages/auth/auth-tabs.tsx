import { useNavigate } from 'react-router-dom'
import { useMemo, type ReactNode } from 'react'

import { Tabs } from '@radix-ui/themes'

type AuthTabsProps = {
  active: 'login' | 'register'
  children: ReactNode
}

const tabToPath: Record<AuthTabsProps['active'], string> = {
  login: '/login',
  register: '/register',
}

export function AuthTabs({ active, children }: AuthTabsProps) {
  const navigate = useNavigate()

  const handleValueChange = (value: string) => {
    if (value === active) return

    const targetPath =
      tabToPath[value as AuthTabsProps['active']] ?? tabToPath.login
    navigate(targetPath)
  }

  const tabsContent = useMemo(() => children, [children])

  return (
    <Tabs.Root
      value={active}
      onValueChange={handleValueChange}
      style={{ width: '100%' }}
    >
      <Tabs.List
        style={{
          width: '100%',
          borderRadius: '999px',
          backgroundColor: 'hsl(240 20% 96%)',
          padding: '4px',
          marginBottom: '24px',
        }}
      >
        <Tabs.Trigger
          value="login"
          style={{
            flex: 1,
            borderRadius: '999px',
            fontWeight: 600,
          }}
        >
          Login
        </Tabs.Trigger>

        <Tabs.Trigger
          value="register"
          style={{
            flex: 1,
            borderRadius: '999px',
            fontWeight: 600,
          }}
        >
          Register
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value={active}>{tabsContent}</Tabs.Content>
    </Tabs.Root>
  )
}
