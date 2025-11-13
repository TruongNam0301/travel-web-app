import type { RouteObject } from 'react-router-dom'
import {
  DocumentsPage,
  LoginPage,
  PlansPage,
  RegisterPage,
  SettingsPage,
  UnauthorizedPage,
} from '@/core/components/pages'
import { DashboardLayout } from '@/core/components/organisms'
import { withAuth } from '@/core/hocs'
import { ROUTE } from './routes.constants'

const ProtectedDashboardLayout = withAuth(DashboardLayout)

const publicRoutes: RouteObject[] = [
  {
    path: ROUTE.login,
    element: <LoginPage />,
  },
  {
    path: ROUTE.register,
    element: <RegisterPage />,
  },
  {
    path: ROUTE.unauthorized,
    element: <UnauthorizedPage />,
  },
]

const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedDashboardLayout />,
    children: [
      {
        path: ROUTE.plans,
        element: <PlansPage />,
      },
      {
        path: ROUTE.settings,
        element: <SettingsPage />,
      },
      {
        path: ROUTE.documents,
        element: <DocumentsPage />,
      },
    ],
  },
]

export const routes: RouteObject[] = [...publicRoutes, ...protectedRoutes]
