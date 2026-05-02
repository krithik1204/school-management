import { type FC, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

type UserRole = 'ROLE_ADMIN' | 'ROLE_TEACHER' | 'ROLE_STUDENT' | 'ROLE_PRINCIPAL' | '';

type RoleProtectedRouteProps = {
  allowedRoles: string[];
  children: ReactNode;
};

const RoleProtectedRoute: FC<RoleProtectedRouteProps> = ({ allowedRoles, children }) => {
  const location = useLocation();
  const { isAuthenticated, roles } = useSelector((state: RootState) => state.auth);
  const hasAccess = isAuthenticated && allowedRoles.some((allowed) => roles.includes(allowed as UserRole));

  if (!hasAccess) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;
