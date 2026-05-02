import './App.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutApi } from './features/auth/authApi';
import { logout } from './features/auth/authSlice';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, fullName, roles, accessToken, userId } = useSelector(
    (state) => state.auth
  );

  const handleLogout = async () => {
    if (userId && accessToken) {
      try {
        await logoutApi(userId, accessToken);
      } catch (err) {
        console.warn('Logout API failed:', err);
      }
    }

    dispatch(logout());
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-title">School Management</div>

        <nav className="app-nav">
          {!isAuthenticated && (
            <>
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </>
          )}

          {isAuthenticated && (
            <>
              <span className="user-email">{fullName}</span>
              <span className="user-role">
                {roles.map((role) => role.replace('ROLE_', '')) .join(', ')}
              </span>
              <button className="logout-btn" type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </header>

      <main className="app-main">
        <AppRoutes />
      </main>
    </div>
  );
};

export default App;