import { Link } from 'react-router-dom';
import { useNotFound } from './not-found.hook';

/**
 * NotFound View
 * Presentational component for the not found page (404)
 */
export function NotFoundView() {
  useNotFound(); // Hook is called even if not used, for consistency

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', color: '#666' }}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ marginTop: '1rem', fontSize: '1.1rem', color: '#666' }}>
        The page you're looking for doesn't exist.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <Link 
          to="/"
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: '#1976d2', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '4px',
            display: 'inline-block'
          }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

