import { type FC, useState } from 'react';

type Teacher = {
  id: number;
  name: string;
  email: string;
  subject: string;
};

type ActionType = 'view' | 'add' | 'edit' | 'delete';

const initialTeachers: Teacher[] = [
  { id: 1, name: 'Brian Lee', email: 'brian@school.com', subject: 'Math' },
  { id: 2, name: 'Diana Park', email: 'diana@school.com', subject: 'Science' },
  { id: 3, name: 'Elena Cruz', email: 'elena@school.com', subject: 'English' },
];

const AdminTeachersPage: FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [action, setAction] = useState<ActionType>('view');
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Math');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editSubject, setEditSubject] = useState('Math');

  const resetForm = () => {
    setName('');
    setEmail('');
    setSubject('Math');
  };

  const handleAdd = () => {
    if (!name.trim() || !email.trim()) return;
    setTeachers((prev) => [
      ...prev,
      { id: prev.length ? Math.max(...prev.map((t) => t.id)) + 1 : 1, name: name.trim(), email: email.trim(), subject },
    ]);
    resetForm();
  };

  const startEdit = (teacher: Teacher) => {
    setSelectedTeacherId(teacher.id);
    setEditName(teacher.name);
    setEditEmail(teacher.email);
    setEditSubject(teacher.subject);
  };

  const saveEdit = () => {
    if (!selectedTeacherId) return;
    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher.id === selectedTeacherId
          ? { ...teacher, name: editName.trim(), email: editEmail.trim(), subject: editSubject }
          : teacher
      )
    );
    setSelectedTeacherId(null);
    setAction('view');
  };

  const deleteTeacher = (id: number) => {
    setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
    if (selectedTeacherId === id) setSelectedTeacherId(null);
  };

  const renderContent = () => {
    switch (action) {
      case 'view':
        return (
          <div className="space-y-4">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{teacher.name}</p>
                    <p className="text-sm text-slate-600">{teacher.email}</p>
                    <p className="text-sm text-slate-700">Subject: {teacher.subject}</p>
                  </div>
                </div>
              </div>
            ))}
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
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                  placeholder="Teacher name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                  placeholder="teacher@school.com"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Add Teacher
            </button>
          </div>
        );

      case 'edit':
        return (
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">Choose a teacher to edit</h4>
              {teachers.length ? (
                <ul className="space-y-3">
                  {teachers.map((teacher) => {
                    const isCurrent = teacher.id === selectedTeacherId;
                    return (
                      <li key={teacher.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="font-semibold text-slate-900">{teacher.name}</p>
                            <p className="text-sm text-slate-600">{teacher.email}</p>
                            <p className="text-sm text-slate-700">Subject: {teacher.subject}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => startEdit(teacher)}
                            className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                          >
                            Edit
                          </button>
                        </div>
                        {isCurrent ? (
                          <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                            <h5 className="text-base font-semibold text-slate-900 mb-3">Edit {teacher.name}</h5>
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
                                <label className="block text-sm font-medium text-slate-700">Subject</label>
                                <input
                                  type="text"
                                  value={editSubject}
                                  onChange={(event) => setEditSubject(event.target.value)}
                                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                                />
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
                                onClick={() => setSelectedTeacherId(null)}
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
                <p className="text-slate-500">No teachers available to edit.</p>
              )}
            </div>
          </div>
        );

      case 'delete':
        return (
          <div className="space-y-4">
            {teachers.length ? (
              <ul className="space-y-3">
                {teachers.map((teacher) => (
                  <li key={teacher.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{teacher.name}</p>
                      <p className="text-sm text-slate-600">{teacher.email}</p>
                      <p className="text-sm text-slate-700">Subject: {teacher.subject}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteTeacher(teacher.id)}
                      className="rounded-2xl bg-red-100 px-4 py-2 text-sm text-red-700 hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500">No teachers available to delete.</p>
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
        <h3 className="text-2xl font-semibold text-slate-900 mb-2">Manage Teachers</h3>
        <p className="text-slate-600 mb-6">
          Use the top links to switch between View, Add, Edit, and Delete teacher modes.
        </p>
        <div className="flex flex-wrap gap-3 mb-6">
          {(['view', 'add', 'edit', 'delete'] as ActionType[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setAction(tab);
                if (tab !== 'edit') setSelectedTeacherId(null);
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                action === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab === 'view' ? 'View Teachers' : tab === 'add' ? 'Add Teacher' : tab === 'edit' ? 'Edit Teacher' : 'Delete Teacher'}
            </button>
          ))}
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminTeachersPage;
