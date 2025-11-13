export const ROUTE = {
  login: '/login',
  register: '/register',
  unauthorized: '/unauthorized',
  plans: '/plans',
  settings: '/settings',
  documents: '/documents',
}

export const PUBLIC_ROUTES = [ROUTE.login, ROUTE.register]

export const PROTECTED_ROUTES = [
  ROUTE.plans,
  ROUTE.settings,
  ROUTE.documents,
  ROUTE.unauthorized,
]
