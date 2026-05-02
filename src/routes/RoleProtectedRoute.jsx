import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const location = useLocation();
  const { isAuthenticated, roles } = useSelector((state) => state.auth);
  const safeRoles = Array.isArray(roles) ? roles : [];
  const hasAccess = isAuthenticated && allowedRoles.some((allowed) => safeRoles.includes(allowed));

  if (!hasAccess) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;