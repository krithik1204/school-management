import { NavLink, Outlet } from 'react-router-dom';

const MultiRoleDashboard = ({ roles }) => {
  const safeRoles = Array.isArray(roles) ? roles : [];
  const links = [
    {
      to: 'admin/users',
      label: 'Manage Users',
      roles: ['ROLE_ADMIN'],
    },
    {
      to: 'admin/teachers',
      label: 'Manage Teachers',
      roles: ['ROLE_ADMIN'],
    },
    {
      to: 'admin/students',
      label: 'Manage Students',
      roles: ['ROLE_ADMIN'],
    },
    {
      to: 'admin/reports',
      label: 'System Reports',
      roles: ['ROLE_ADMIN'],
    },
    {
      to: 'teacher',
      label: 'Teacher Tools',
      roles: ['ROLE_TEACHER'],
    },
    {
      to: 'student',
      label: 'Student Home',
      roles: ['ROLE_STUDENT'],
    },
    {
      to: 'principal',
      label: 'Principal View',
      roles: ['ROLE_PRINCIPAL'],
    },
  ];

  const availableLinks = links.filter((link) =>
    link.roles.some((allowed) => safeRoles.includes(allowed))
  );

  return (
    <div className="flex flex-col lg:flex-row lg:gap-6 min-h-[calc(100vh-96px)] p-6">
      <aside className="w-full lg:w-72 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm h-full mb-6 lg:mb-0">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">School Dashboard</h2>
        <nav className="space-y-2">
          {availableLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="w-full flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm min-h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MultiRoleDashboard;