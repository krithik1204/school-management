import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const NoRolePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900 mb-4">No Access Role Assigned</h2>
      <p className="text-slate-700 leading-relaxed">
        You are authenticated, but you do not have any role assigned that grants access to dashboard functionality.
      </p>
      <p className="mt-4 text-slate-600">
        Please contact your administrator to assign a role so you can access the application.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 transition"
        >
          Logout
        </button>
        <a
          href="mailto:support@school.com"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default NoRolePage;
