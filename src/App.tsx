import { routes } from '@/core/routes'
import { BrowserRouter, useRoutes } from 'react-router-dom'

function AppRoutes() {
  const element = useRoutes(routes)
  return element
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
