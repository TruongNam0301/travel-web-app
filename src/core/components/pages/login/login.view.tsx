
import { useLogin } from './login.hook';

/**
 * Login View
 * Presentational component for the login page
 */
export function LoginView() {
  const { handleLogin } = useLogin();

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Login</h1>
      <p>Select a role to login (demo mode):</p>
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button 
          onClick={() => handleLogin('user')}
          style={{ padding: '1rem', fontSize: '1rem', cursor: 'pointer' }}
        >
          Login as User
        </button>
        <button 
          onClick={() => handleLogin('admin')}
          style={{ padding: '1rem', fontSize: '1rem', cursor: 'pointer' }}
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
}

