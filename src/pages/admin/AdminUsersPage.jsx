import { useState } from 'react';

const initialUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@school.com', role: 'Admin' },
  { id: 2, name: 'Brian Lee', email: 'brian@school.com', role: 'Teacher' },
  { id: 3, name: 'Cara Smith', email: 'cara@school.com', role: 'Student' },
];

const roles = ['Admin', 'Teacher', 'Student', 'Principal'];

const AdminUsersPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [activeAction, setActiveAction] = useState('view');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Student');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState('Admin');

  const handleAddUser = () => {
    if (!newName.trim() || !newEmail.trim()) return;
    setUsers((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((user) => user.id)) + 1 : 1,
        name: newName.trim(),
        email: newEmail.trim(),
        role: newRole,
      },
    ]);
    setNewName('');
    setNewEmail('');
    setNewRole('Student');
  };

  const startEdit = (user) => {
    setSelectedUserId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
    setActiveAction('edit');
  };

  const saveEdit = () => {
    if (selectedUserId === null) return;
    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUserId
          ? { ...user, name: editName.trim(), email: editEmail.trim(), role: editRole }
          : user
      )
    );
    setSelectedUserId(null);
    setActiveAction('view');
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    if (selectedUserId === id) {
      setSelectedUserId(null);
    }
  };

  const renderActionContent = () => {
    switch (activeAction) {
      case 'view':
        return (
          <div className="space-y-4">
            {roles.map((role) => {
              const roleUsers = users.filter((user) => user.role === role);
              return (
                <div key={role} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">{role}</h4>
                  {roleUsers.length ? (
                    <ul className="space-y-3">
                      {roleUsers.map((user) => (
                        <li key={user.id} className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="font-semibold text-slate-900">{user.name}</p>
                            <p className="text-sm text-slate-600">{user.email}</p>
                          </div>
                              <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">{user.role}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-500">No users in this role yet.</p>
                  )}
                </div>
              );
            })}
          </div>
        );

      case 'add':
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(event) => setNewEmail(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                  placeholder="user@school.com"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Role</label>
                <select
                  value={newRole}
                  onChange={(event) => setNewRole(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddUser}
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Add User
            </button>
          </div>
        );

      case 'edit':
        return (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-3">Choose a user to edit</h4>
            {users.length ? (
              <ul className="space-y-3">
                {users.map((user) => {
                  const isEditing = user.id === selectedUserId;
                  return (
                    <li
                      key={user.id}
                      className="rounded-2xl border border-slate-200 bg-white p-4"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="font-semibold text-slate-900">{user.name}</p>
                          <p className="text-sm text-slate-600">{user.email}</p>
                          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                            {user.role}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => startEdit(user)}
                          className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          Edit
                        </button>
                      </div>

                      {isEditing ? (
                        <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                          <h5 className="text-base font-semibold text-slate-900 mb-3">Editing {user.name}</h5>
                          <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-slate-700">Name</label>
                              <input
                                type="text"
                                value={editName}
                                onChange={(event) => setEditName(event.target.value)}
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-slate-700">Email</label>
                              <input
                                type="email"
                                value={editEmail}
                                onChange={(event) => setEditEmail(event.target.value)}
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-slate-700">Role</label>
                              <select
                                value={editRole}
                                onChange={(event) => setEditRole(event.target.value)}
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                              >
                                {roles.map((role) => (
                                  <option key={role} value={role}>
                                    {role}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-3">
                            <button
                              type="button"
                              onClick={saveEdit}
                              className="rounded-2xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
                            >
                              Save Changes
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedUserId(null);
                              }}
                              className="rounded-2xl bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-slate-500">No users available to edit.</p>
            )}
          </div>
        );

      case 'delete':
        return (
          <div className="space-y-4">
            {users.length ? (
              <ul className="space-y-3">
                {users.map((user) => (
                  <li key={user.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{user.name}</p>
                      <p className="text-sm text-slate-600">{user.email}</p>
                      <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                        {user.role}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteUser(user.id)}
                      className="rounded-2xl bg-red-100 px-4 py-2 text-sm text-red-700 hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500">No users are available to delete.</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-semibold text-slate-900 mb-2">Manage Users</h3>
        <p className="text-slate-600 mb-6">
          Use the top links to switch between View, Add, Edit, and Delete user modes.
        </p>

        <div className="flex flex-wrap gap-3">
          {(['view', 'add', 'edit', 'delete']).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveAction(tab);
                if (tab !== 'edit') setSelectedUserId(null);
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeAction === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab === 'view' ? 'View Users' : tab === 'add' ? 'Add User' : tab === 'edit' ? 'Edit User' : 'Delete User'}
            </button>
          ))}
        </div>

        <div className="mt-6">{renderActionContent()}</div>
      </div>
    </div>
  );
};

export default AdminUsersPage;