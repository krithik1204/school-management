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

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

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
    <section className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left side - School Image/Banner */}
        <div className="hidden md:flex items-center justify-center">
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-12 text-white shadow-lg">
            <div className="text-6xl mb-4">🏫</div>
            <h1 className="text-4xl font-bold text-center mb-4">School Management</h1>
            <p className="text-lg text-center text-blue-100">Welcome back to your learning platform</p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="user@school.com"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-2 pt-4">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors"
                disabled={loading || saving}
              >
                {saving ? 'Logging in...' : 'Login'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                disabled={loading || saving}
              >
                Reset
              </button>
            </div>

            {rejected && error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;