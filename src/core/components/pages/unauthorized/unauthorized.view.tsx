import { Link } from 'react-router-dom'
import { useUnauthorized } from './unauthorized.hook'

/**
 * Unauthorized View
 * Presentational component for the unauthorized page (403)
 */
export function UnauthorizedView() {
  const { userRole } = useUnauthorized()

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', color: '#d32f2f' }}>403</h1>
      <h2>Access Denied</h2>
      <p style={{ marginTop: '1rem', fontSize: '1.1rem', color: '#666' }}>
        You don't have permission to access this page.
      </p>
      {userRole && (
        <p style={{ marginTop: '0.5rem', color: '#999' }}>
          Your current role: <strong>{userRole}</strong>
        </p>
      )}
      <div style={{ marginTop: '2rem' }}>
        <Link
          to="/plans"
          style={{
            padding: '0.75rem 1.5rem',
            background: '#1976d2',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            display: 'inline-block',
          }}
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
