import { type FC, type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type AxiosResponse } from 'axios';
import { register, type UserRegistrationRequest, type UserRegistrationResponse } from '../features/auth/authApi';
import { useApiCall } from '../hooks/useApiCall';

type UserRole = 'ROLE_ADMIN' | 'ROLE_TEACHER' | 'ROLE_STUDENT' | 'ROLE_PRINCIPAL' | '';

const RegisterPage: FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [medicalRecordNumber, setMedicalRecordNumber] = useState('');
  const [gender, setGender] = useState('Male');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('ROLE_STUDENT');
  const navigate = useNavigate();
  const { loading, saving, rejected, error, execute } = useApiCall<AxiosResponse<UserRegistrationResponse>>();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const request: UserRegistrationRequest = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      medicalRecordNumber,
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
    <section className="p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold text-slate-900 mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Medical Record #</label>
          <input
            type="text"
            value={medicalRecordNumber}
            onChange={(event) => setMedicalRecordNumber(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Role</label>
          <select
            value={role}
            onChange={(event) => setRole(event.target.value as UserRole)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          >
            <option value="ROLE_STUDENT">Student</option>
            <option value="ROLE_TEACHER">Teacher</option>
            <option value="ROLE_ADMIN">Admin</option>
            <option value="ROLE_PRINCIPAL">Principal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Gender</label>
          <select
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Date of Birth</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
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
          {saving ? 'Saving...' : 'Register and continue to login'}
        </button>

        {rejected && error && (
          <div className="text-red-500">{error}</div>
        )}
      </form>
    </section>
  );
};

export default RegisterPage;
