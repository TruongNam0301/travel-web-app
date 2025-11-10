import { Link } from 'react-router-dom';
import { useHome } from './home.hook';

/**
 * Home View
 * Presentational component for the home page
 */
export function HomeView() {
  useHome(); // Hook is called even if not used, for consistency

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Travel Web App</h1>
      <p>Explore amazing travel destinations and plan your next adventure!</p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/login" style={{ marginRight: '1rem' }}>
          Login
        </Link>
        <Link to="/dashboard">
          Dashboard
        </Link>
      </div>
    </div>
  );
}

