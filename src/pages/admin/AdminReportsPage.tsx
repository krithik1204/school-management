import { type FC, useState } from 'react';

type Report = {
  id: number;
  title: string;
  category: string;
  description: string;
};

type ActionType = 'view' | 'add' | 'edit' | 'delete';

const initialReports: Report[] = [
  { id: 1, title: 'Attendance Summary', category: 'Attendance', description: 'Weekly attendance data for all grades.' },
  { id: 2, title: 'Academic Performance', category: 'Performance', description: 'Quarterly student achievement trends.' },
  { id: 3, title: 'Operational Overview', category: 'Operations', description: 'Facilities and staffing metrics.' },
];

const AdminReportsPage: FC = () => {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [action, setAction] = useState<ActionType>('view');
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
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

  const startEdit = (report: Report) => {
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

  const deleteReport = (id: number) => {
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
                <h4 className="font-semibold text-slate-900">{report.title}</h4>
                <p className="text-sm text-slate-700">Category: {report.category}</p>
                <p className="text-sm text-slate-600 mt-2">{report.description}</p>
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
                <input
                  type="text"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                />
              </div>
              <div className="space-y-2 md:col-span-3">
                <label className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                  rows={4}
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
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">Choose a report to edit</h4>
              {reports.length ? (
                <ul className="space-y-3">
                  {reports.map((report) => {
                    const isCurrent = report.id === selectedReportId;
                    return (
                      <li key={report.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <div>
                            <h5 className="font-semibold text-slate-900">{report.title}</h5>
                            <p className="text-sm text-slate-700">Category: {report.category}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => startEdit(report)}
                            className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                          >
                            Edit
                          </button>
                        </div>
                        {isCurrent ? (
                          <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                            <h5 className="text-base font-semibold text-slate-900 mb-3">Edit {report.title}</h5>
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
                                <input
                                  type="text"
                                  value={editCategory}
                                  onChange={(event) => setEditCategory(event.target.value)}
                                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                                />
                              </div>
                              <div className="space-y-2 md:col-span-3">
                                <label className="block text-sm font-medium text-slate-700">Description</label>
                                <textarea
                                  value={editDescription}
                                  onChange={(event) => setEditDescription(event.target.value)}
                                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                                  rows={4}
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
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-slate-500">No reports available to edit.</p>
              )}
            </div>
          </div>
        );

      case 'delete':
        return (
          <div className="space-y-4">
            {reports.length ? (
              <ul className="space-y-3">
                {reports.map((report) => (
                  <li key={report.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h5 className="font-semibold text-slate-900">{report.title}</h5>
                      <p className="text-sm text-slate-700">Category: {report.category}</p>
                      <p className="text-sm text-slate-600 mt-2">{report.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteReport(report.id)}
                      className="rounded-2xl bg-red-100 px-4 py-2 text-sm text-red-700 hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500">No reports available to delete.</p>
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
        <h3 className="text-2xl font-semibold text-slate-900 mb-2">System Reports</h3>
        <p className="text-slate-600 mb-6">
          Use the top links to switch between View, Add, Edit, and Delete report modes.
        </p>
        <div className="flex flex-wrap gap-3 mb-6">
          {(['view', 'add', 'edit', 'delete'] as ActionType[]).map((tab) => (
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
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminReportsPage;
