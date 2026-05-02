import { useState } from 'react';

const StudentPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData] = useState({
    name: 'Cara Smith',
    enrollmentId: 'E001',
    grade: '10',
    email: 'cara@school.com',
    phone: '+1-555-1234',
  });

  const [marks] = useState([
    { subject: 'Math', marks: 92 },
    { subject: 'Science', marks: 88 },
    { subject: 'English', marks: 85 },
    { subject: 'History', marks: 90 },
  ]);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-3">Student Profile</h4>
            <div className="space-y-2">
              <p><strong>Name:</strong> {profileData.name}</p>
              <p><strong>Enrollment ID:</strong> {profileData.enrollmentId}</p>
              <p><strong>Grade:</strong> {profileData.grade}</p>
              <p><strong>Email:</strong> {profileData.email}</p>
              <p><strong>Phone:</strong> {profileData.phone}</p>
            </div>
          </div>
        );
      case 'marks':
        return (
          <div className="space-y-4">
            {marks.map((mark, index) => (
              <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{mark.subject}: {mark.marks}%</p>
              </div>
            ))}
          </div>
        );
      case 'attendance':
        return (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-slate-700">Attendance records coming soon.</p>
          </div>
        );
      case 'library':
        return (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-slate-700">Library access coming soon.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-semibold text-slate-900 mb-2">Student Dashboard</h3>
        <p className="text-slate-600 mb-6">
          View your profile, marks, attendance, and library access.
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          {(['profile', 'marks', 'attendance', 'library']).map((tab) => (
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

export default StudentPage;