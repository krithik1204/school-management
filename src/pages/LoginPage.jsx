import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authApi';
import { loginSuccess } from '../features/auth/authSlice';
import { useApiCall } from '../hooks/useApiCall';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { loading, saving, rejected, error, execute } = useApiCall();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await execute(() => login({ email, password }), { saving: true });
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken ?? null;
      const responseRoles = response?.data?.user?.roles ?? [];
      const userFirstName = response?.data?.user?.firstName || '';
      const userLastName = response?.data?.user?.lastName || '';
      const userFullName = `${userFirstName} ${userLastName}`.trim();
      const userId = response?.data?.user?.id ? String(response.data.user.id) : null;
      const userRoles = responseRoles;

      if (!accessToken) {
        alert('Invalid login response');
        return;
      }

      dispatch(
        loginSuccess({
          fullName: userFullName,
          roles: userRoles,
          accessToken,
          refreshToken,
          userId,
        })
      );

      const redirectPath = userRoles.includes('ROLE_ADMIN')
        ? '/dashboard/admin'
        : userRoles.includes('ROLE_PRINCIPAL')
        ? '/dashboard/principal'
        : userRoles.includes('ROLE_TEACHER')
        ? '/dashboard/teacher'
        : '/dashboard/student';

      navigate(redirectPath);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <section className="p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold text-slate-900 mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="user@school.com"
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 text-white px-5 py-3 hover:bg-blue-700 transition-colors"
          disabled={loading || saving}
        >
          {saving ? 'Logging in...' : 'Login'}
        </button>

        {rejected && error && (
          <div className="text-red-500">{error}</div>
        )}
      </form>
    </section>
  );
};

export default LoginPage;