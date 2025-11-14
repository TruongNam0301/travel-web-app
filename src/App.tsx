import { routes } from '@/core/routes'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { AuthProvider } from '@/core/providers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function AppRoutes() {
  const element = useRoutes(routes)
  return element
}

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes
      },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
