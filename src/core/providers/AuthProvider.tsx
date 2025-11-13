import { useAuthStore } from '@/core/stores'
import { getCurrentUser } from '@/data/repositories/user.repo'
import { TokenManager } from '@/package/storage'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { LoadingOverlay } from '../components'
import { PUBLIC_ROUTES, ROUTE } from '../routes/routes.constants'
import { useNavigate } from 'react-router-dom'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const {
    setUser,
    clearUser,
    setLoading,
    setInitialized,
    isLoading,
    isInitialized,
  } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true)

      try {
        const hasTokens = TokenManager.isHasTokens()
        if (!hasTokens) throw new Error('No tokens found')

        const user = await getCurrentUser()
        setUser(user)

        if (PUBLIC_ROUTES.includes(window.location.pathname)) {
          navigate(ROUTE.plans)
        }
      } catch {
        TokenManager.clearTokens()
        clearUser()
      } finally {
        setLoading(false)
        setInitialized(true)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading || !isInitialized) {
    return <LoadingOverlay isLoading={isLoading} />
  }

  return <>{children}</>
}
