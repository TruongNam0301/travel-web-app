import { useEffect } from 'react'
import type { ComponentType } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/core/stores'
import { TokenManager } from '@/package/storage'

export function withAuth<P extends object>(
  Component: ComponentType<P>
): ComponentType<P> {
  return function AuthenticatedComponent(props: P) {
    const navigate = useNavigate()
    const location = useLocation()
    const { isAuthenticated, isInitialized, isLoading } = useAuthStore()

    useEffect(() => {
      if (!isInitialized) return

      if (!isAuthenticated) {
        TokenManager.clearTokens()

        navigate('/login', {
          replace: true,
          state: { from: location },
        })
      }
    }, [isAuthenticated, isInitialized, navigate, location])

    if (!isInitialized || isLoading) {
      return null
    }

    if (!isAuthenticated) {
      return null
    }

    return <Component {...props} />
  }
}
