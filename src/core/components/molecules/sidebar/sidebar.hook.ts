import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/core/hooks'

/**
 * Custom hook for Sidebar component
 * Handles navigation and active route detection
 */
export function useSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  const isActiveRoute = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    )
  }

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  return {
    user,
    isActiveRoute,
    handleNavigation,
    logout,
  }
}
