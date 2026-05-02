import { useState } from 'react';

const initialReports = [
  { id: 1, title: 'Attendance Summary', category: 'Attendance', description: 'Weekly attendance data for all grades.' },
  { id: 2, title: 'Academic Performance', category: 'Performance', description: 'Quarterly student achievement trends.' },
  { id: 3, title: 'Operational Overview', category: 'Operations', description: 'Facilities and staffing metrics.' },
];

const AdminReportsPage = () => {
  const [reports, setReports] = useState(initialReports);
  const [action, setAction] = useState('view');
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Attendance');
  const [description, setDescription] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('Attendance');
  const [editDescription, setEditDescription] = useState('');

  const resetForm = () => {
    setTitle('');
    setCategory('Attendance');
    setDescription('');
  };

  const handleAdd = () => {
    if (!title.trim() || !description.trim()) return;
    setReports((prev) => [
      ...prev,
      { id: prev.length ? Math.max(...prev.map((r) => r.id)) + 1 : 1, title: title.trim(), category, description: description.trim() },
    ]);
    resetForm();
  };

  const startEdit = (report) => {
    setSelectedReportId(report.id);
    setEditTitle(report.title);
    setEditCategory(report.category);
    setEditDescription(report.description);
  };

  const saveEdit = () => {
    if (!selectedReportId) return;
    setReports((prev) =>
      prev.map((report) =>
        report.id === selectedReportId
          ? { ...report, title: editTitle.trim(), category: editCategory, description: editDescription.trim() }
          : report
      )
    );
    setSelectedReportId(null);
    setAction('view');
  };

  const deleteReport = (id) => {
    setReports((prev) => prev.filter((report) => report.id !== id));
    if (selectedReportId === id) setSelectedReportId(null);
  };

  const renderContent = () => {
    switch (action) {
      case 'view':
        return (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{report.title}</p>
                    <p className="text-sm text-slate-600">{report.category}</p>
                    <p className="text-sm text-slate-700">{report.description}</p>
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
                <label className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                  placeholder="Report title"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Category</label>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                >
                  <option value="Attendance">Attendance</option>
                  <option value="Performance">Performance</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                  placeholder="Brief description"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Add Report
            </button>
          </div>
        );

      case 'edit':
        return (
          <div className="space-y-4">
            {reports.map((report) => {
              const isEditing = report.id === selectedReportId;
              return (
                <div key={report.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{report.title}</p>
                      <p className="text-sm text-slate-600">{report.category}</p>
                      <p className="text-sm text-slate-700">{report.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => startEdit(report)}
                      className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>
                  </div>
                  {isEditing && (
                    <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <h5 className="text-base font-semibold text-slate-900 mb-3">Editing {report.title}</h5>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-slate-700">Title</label>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(event) => setEditTitle(event.target.value)}
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-slate-700">Category</label>
                          <select
                            value={editCategory}
                            onChange={(event) => setEditCategory(event.target.value)}
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                          >
                            <option value="Attendance">Attendance</option>
                            <option value="Performance">Performance</option>
                            <option value="Operations">Operations</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-slate-700">Description</label>
                          <input
                            type="text"
                            value={editDescription}
                            onChange={(event) => setEditDescription(event.target.value)}
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
                          onClick={() => setSelectedReportId(null)}
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
            {reports.map((report) => (
              <div key={report.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{report.title}</p>
                    <p className="text-sm text-slate-600">{report.category}</p>
                    <p className="text-sm text-slate-700">{report.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteReport(report.id)}
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
        <h3 className="text-2xl font-semibold text-slate-900 mb-2">Manage Reports</h3>
        <p className="text-slate-600 mb-6">
          Use the top links to switch between View, Add, Edit, and Delete report modes.
        </p>

        <div className="flex flex-wrap gap-3">
          {(['view', 'add', 'edit', 'delete']).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setAction(tab);
                if (tab !== 'edit') setSelectedReportId(null);
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                action === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab === 'view' ? 'View Reports' : tab === 'add' ? 'Add Report' : tab === 'edit' ? 'Edit Report' : 'Delete Report'}
            </button>
          ))}
        </div>

        <div className="mt-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminReportsPage;