
import { useDashboard } from './dashboard.hook';

/**
 * Dashboard View
 * Presentational component for the dashboard page
 */
export function DashboardView() {
  const { userRole, userId, handleLogout } = useDashboard();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
        <p><strong>User ID:</strong> {userId}</p>
        <p><strong>Role:</strong> {userRole}</p>
        <p><strong>Status:</strong> Authenticated ✓</p>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <button 
          onClick={handleLogout}
          style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

