import { useState } from 'react';

const initialStudents = [
  { id: 1, name: 'Cara Smith', email: 'cara@school.com', grade: '10' },
  { id: 2, name: 'David Kim', email: 'david@school.com', grade: '11' },
  { id: 3, name: 'Emma Patel', email: 'emma@school.com', grade: '12' },
];

const AdminStudentsPage = () => {
  const [students, setStudents] = useState(initialStudents);
  const [action, setAction] = useState('view');
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('10');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editGrade, setEditGrade] = useState('10');

  const resetForm = () => {
    setName('');
    setEmail('');
    setGrade('10');
  };

  const handleAdd = () => {
    if (!name.trim() || !email.trim()) return;
    setStudents((prev) => [
      ...prev,
      { id: prev.length ? Math.max(...prev.map((s) => s.id)) + 1 : 1, name: name.trim(), email: email.trim(), grade },
    ]);
    resetForm();
  };

  const startEdit = (student) => {
    setSelectedStudentId(student.id);
    setEditName(student.name);
    setEditEmail(student.email);
    setEditGrade(student.grade);
  };

  const saveEdit = () => {
    if (!selectedStudentId) return;
    setStudents((prev) =>
      prev.map((student) =>
        student.id === selectedStudentId
          ? { ...student, name: editName.trim(), email: editEmail.trim(), grade: editGrade }
          : student
      )
    );
    setSelectedStudentId(null);
    setAction('view');
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
    if (selectedStudentId === id) setSelectedStudentId(null);
  };

  const renderContent = () => {
    switch (action) {
      case 'view':
        return (
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{student.name}</p>
                    <p className="text-sm text-slate-600">{student.email}</p>
                    <p className="text-sm text-slate-700">Grade: {student.grade}</p>
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
                  placeholder="Student name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                  placeholder="student@school.com"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Grade</label>
                <select
                  value={grade}
                  onChange={(event) => setGrade(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                >
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Add Student
            </button>
          </div>
        );

      case 'edit':
        return (
          <div className="space-y-4">
            {students.map((student) => {
              const isEditing = student.id === selectedStudentId;
              return (
                <div key={student.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{student.name}</p>
                      <p className="text-sm text-slate-600">{student.email}</p>
                      <p className="text-sm text-slate-700">Grade: {student.grade}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => startEdit(student)}
                      className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>
                  </div>
                  {isEditing && (
                    <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <h5 className="text-base font-semibold text-slate-900 mb-3">Editing {student.name}</h5>
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
                          <label className="block text-sm font-medium text-slate-700">Grade</label>
                          <select
                            value={editGrade}
                            onChange={(event) => setEditGrade(event.target.value)}
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                          >
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
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
                          onClick={() => setSelectedStudentId(null)}
                          className="rounded-2xl bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );

      case 'delete':
        return (
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{student.name}</p>
                    <p className="text-sm text-slate-600">{student.email}</p>
                    <p className="text-sm text-slate-700">Grade: {student.grade}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteStudent(student.id)}
                    className="rounded-2xl bg-red-100 px-4 py-2 text-sm text-red-700 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-semibold text-slate-900 mb-2">Manage Students</h3>
        <p className="text-slate-600 mb-6">
          Use the top links to switch between View, Add, Edit, and Delete student modes.
        </p>

        <div className="flex flex-wrap gap-3">
          {(['view', 'add', 'edit', 'delete']).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setAction(tab);
                if (tab !== 'edit') setSelectedStudentId(null);
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                action === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab === 'view' ? 'View Students' : tab === 'add' ? 'Add Student' : tab === 'edit' ? 'Edit Student' : 'Delete Student'}
            </button>
          ))}
        </div>

        <div className="mt-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminStudentsPage;