import { useState } from 'react';

const initialReports = [
  { id: 1, title: 'Monthly Attendance Report', date: '2024-05-01' },
  { id: 2, title: 'Academic Performance Summary', date: '2024-04-30' },
  { id: 3, title: 'Teacher Evaluation Results', date: '2024-04-28' },
];

const PrincipalPage = () => {
  const [activeTab, setActiveTab] = useState('reports');
  const [reports] = useState(initialReports);

  const renderContent = () => {
    switch (activeTab) {
      case 'reports':
        return (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{report.title}</p>
                <p className="text-sm text-slate-600">Date: {report.date}</p>
              </div>
            ))}
          </div>
        );
      case 'analytics':
        return (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-slate-700">Analytics dashboard coming soon.</p>
          </div>
        );
      case 'performance':
        return (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-slate-700">Performance metrics coming soon.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-semibold text-slate-900 mb-2">Principal Dashboard</h3>
        <p className="text-slate-600 mb-6">
          Overview of school operations and key metrics.
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          {(['reports', 'analytics', 'performance']).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default PrincipalPage;