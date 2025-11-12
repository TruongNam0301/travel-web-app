import type { RouteObject } from 'react-router-dom';
import {
  LoginPage,
  RegisterPage,
  UnauthorizedPage,
  NotFoundPage,
  DashboardPage,
} from '../components/pages';
import { withAuth } from '../hocs';

const ProtectedDashboard = withAuth(DashboardPage);

export const routes: RouteObject[] = [
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

