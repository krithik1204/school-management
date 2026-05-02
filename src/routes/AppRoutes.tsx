import { type FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import AdminPage from '../pages/AdminPage';
import TeacherPage from '../pages/TeacherPage';
import StudentPage from '../pages/StudentPage';
import PrincipalPage from '../pages/PrincipalPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import AdminTeachersPage from '../pages/admin/AdminTeachersPage';
import AdminStudentsPage from '../pages/admin/AdminStudentsPage';
import AdminReportsPage from '../pages/admin/AdminReportsPage';
import MultiRoleDashboard from '../features/dashboard/MultiRoleDashboard';
import ProtectedRoute from './ProtectedRoute';
import RoleProtectedRoute from './RoleProtectedRoute';

type UserRole = 'ROLE_ADMIN' | 'ROLE_TEACHER' | 'ROLE_STUDENT' | 'ROLE_PRINCIPAL' | '';

const AppRoutes: FC = () => {
  const { isAuthenticated, roles } = useSelector((state: RootState) => state.auth);

  const defaultDashboard = roles.includes('ROLE_ADMIN')
    ? '/dashboard/admin'
    : roles.includes('ROLE_PRINCIPAL')
    ? '/dashboard/principal'
    : roles.includes('ROLE_TEACHER')
    ? '/dashboard/teacher'
    : roles.includes('ROLE_STUDENT')
    ? '/dashboard/student'
    : '/login';

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={isAuthenticated ? defaultDashboard : '/register'}
            replace
          />
        }
      />

      <Route
        path="/register"
        element={
          !isAuthenticated ? (
            <RegisterPage />
          ) : (
            <Navigate to={defaultDashboard} replace />
          )
        }
      />

      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <LoginPage />
          ) : (
            <Navigate to={defaultDashboard} replace />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MultiRoleDashboard roles={roles} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={defaultDashboard} replace />} />
        <Route
          path="admin"
          element={
            <RoleProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <AdminPage />
            </RoleProtectedRoute>
          }
        >
          <Route index element={<Navigate to="users" replace />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="teachers" element={<AdminTeachersPage />} />
          <Route path="students" element={<AdminStudentsPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
        </Route>
        <Route
          path="teacher"
          element={
            <RoleProtectedRoute allowedRoles={['ROLE_TEACHER']}>
              <TeacherPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="student"
          element={
            <RoleProtectedRoute allowedRoles={['ROLE_STUDENT']}>
              <StudentPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="principal"
          element={
            <RoleProtectedRoute allowedRoles={['ROLE_PRINCIPAL']}>
              <PrincipalPage />
            </RoleProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
