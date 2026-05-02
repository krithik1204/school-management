import { type FC, useState } from 'react';

type Report = {
  id: number;
  title: string;
  date: string;
};

type TabType = 'reports' | 'analytics' | 'performance';

const initialReports: Report[] = [
  { id: 1, title: 'Monthly Attendance Report', date: '2024-05-01' },
  { id: 2, title: 'Academic Performance Summary', date: '2024-04-30' },
  { id: 3, title: 'Teacher Evaluation Results', date: '2024-04-28' },
];

const PrincipalPage: FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('reports');
  const [reports] = useState<Report[]>(initialReports);

  const renderContent = () => {
    switch (activeTab) {
      case 'reports':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">School Reports</h4>
            {reports.length ? (
              <ul className="space-y-3">
                {reports.map((report) => (
                  <li key={report.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">{report.title}</p>
                    <p className="text-sm text-slate-600">Generated: {report.date}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500">No reports available.</p>
            )}
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">School Analytics</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h5 className="font-semibold text-slate-900 mb-2">Student Enrollment</h5>
                <p className="text-3xl font-bold text-blue-600">425</p>
                <p className="text-sm text-slate-600">Total students across all grades</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h5 className="font-semibold text-slate-900 mb-2">Teacher Count</h5>
                <p className="text-3xl font-bold text-blue-600">32</p>
                <p className="text-sm text-slate-600">Active faculty members</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h5 className="font-semibold text-slate-900 mb-2">Attendance Rate</h5>
                <p className="text-3xl font-bold text-green-600">94%</p>
                <p className="text-sm text-slate-600">Current month average</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h5 className="font-semibold text-slate-900 mb-2">Pass Rate</h5>
                <p className="text-3xl font-bold text-green-600">91%</p>
                <p className="text-sm text-slate-600">Last semester results</p>
              </div>
            </div>
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">Performance Overview</h4>
            <div className="space-y-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-4">
                <p className="font-semibold text-slate-900 mb-2">Grade 10 Performance</p>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-sm text-slate-600 mt-2">85% average score</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-4">
                <p className="font-semibold text-slate-900 mb-2">Grade 11 Performance</p>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <p className="text-sm text-slate-600 mt-2">78% average score</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-4">
                <p className="font-semibold text-slate-900 mb-2">Grade 12 Performance</p>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
                <p className="text-sm text-slate-600 mt-2">88% average score</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900 mb-2">Principal Dashboard</h2>
      <p className="text-slate-600 mb-6">
        Oversee school performance, reports, and analytics.
      </p>
      <div className="flex flex-wrap gap-3 mb-6">
        {(['reports', 'analytics', 'performance'] as TabType[]).map((tab) => (
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
            {tab === 'reports' ? 'View Reports' : tab === 'analytics' ? 'School Analytics' : 'Performance Overview'}
          </button>
        ))}
      </div>
      {renderContent()}
    </div>
  );
};

export default PrincipalPage;
