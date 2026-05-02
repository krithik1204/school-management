import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../features/auth/authApi';
import { useApiCall } from '../hooks/useApiCall';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('Male');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ROLE_STUDENT');
  const navigate = useNavigate();
  const { loading, saving, rejected, error, execute } = useApiCall();

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setGender('Male');
    setDateOfBirth('');
    setPassword('');
    setRole('ROLE_STUDENT');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const request = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      gender,
      dateOfBirth,
      roles: [role],
    };

    try {
      await execute(() => register(request), { saving: true });
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start md:items-center">
        {/* Left side - School Image/Banner */}
        <div className="hidden md:flex items-center justify-center">
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-12 text-white shadow-lg min-h-96">
            <div className="text-6xl mb-4">🎓</div>
            <h1 className="text-4xl font-bold text-center mb-4">Join Our School</h1>
            <p className="text-lg text-center text-green-100">Create an account to get started</p>
          </div>
        </div>

        {/* Right side - Register Form with Scrollable Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 max-h-96 md:max-h-screen md:overflow-y-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 sticky top-0 bg-white pt-2">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-0.5">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-0.5">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-0.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-0.5">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-0.5">Role</label>
              <select
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="ROLE_STUDENT">Student</option>
                <option value="ROLE_TEACHER">Teacher</option>
                <option value="ROLE_ADMIN">Admin</option>
                <option value="ROLE_PRINCIPAL">Principal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-0.5">Gender</label>
              <select
                value={gender}
                onChange={(event) => setGender(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-0.5">Date of Birth</label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(event) => setDateOfBirth(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-0.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-2 pt-4 sticky bottom-0 bg-white">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors"
                disabled={loading || saving}
              >
                {saving ? 'Saving...' : 'Register and continue to login'}
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
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200 mt-4">{error}</div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;