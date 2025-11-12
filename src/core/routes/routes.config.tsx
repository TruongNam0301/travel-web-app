import type { RouteObject } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  DashboardPage,
  UnauthorizedPage,
  NotFoundPage,
} from '../components/pages';
import { withAuth } from '../hocs';

// Protected Dashboard (requires authentication)
const ProtectedDashboard = withAuth(DashboardPage);

/**
 * Application route configuration
 * Defines all routes with their protection levels
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: <ProtectedDashboard />,
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

/**
 * Example routes for role-based access:
 * 
 * To add role-based routes:
 * 1. Import withRole and EnumUserRole:
 *    import { withAuth, withRole } from '../hocs';
 *    import { EnumUserRole } from '@/data';
 * 
 * 2. Create protected component:
 *    const AdminOnlyComponent = withRole([EnumUserRole.ADMIN])(YourComponent);
 * 
 * 3. Add route:
 *    {
 *      path: '/admin',
 *      element: <AdminOnlyComponent />,
 *    }
 * 
 * Multiple roles example:
 *    const ProfileComponent = withRole([EnumUserRole.USER, EnumUserRole.ADMIN])(YourComponent);
 */

