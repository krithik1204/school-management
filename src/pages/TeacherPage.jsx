import { useState } from 'react';

const initialStudents = [
  { id: 1, name: 'Cara Smith', enrollmentId: 'E001' },
  { id: 2, name: 'David Kim', enrollmentId: 'E002' },
  { id: 3, name: 'Emma Patel', enrollmentId: 'E003' },
  { id: 4, name: 'Frank Lopez', enrollmentId: 'E004' },
];

const TeacherPage = () => {
  const [activeTab, setActiveTab] = useState('marks');
  const [students] = useState(initialStudents);

  const renderContent = () => {
    switch (activeTab) {
      case 'marks':
        return (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-slate-700">Marks management coming soon.</p>
          </div>
        );
      case 'attendance':
        return (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-slate-700">Attendance tracking coming soon.</p>
          </div>
        );
      case 'students':
        return (
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{student.name}</p>
                <p className="text-sm text-slate-600">Enrollment ID: {student.enrollmentId}</p>
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
        <h3 className="text-2xl font-semibold text-slate-900 mb-2">Teacher Dashboard</h3>
        <p className="text-slate-600 mb-6">
          Manage student marks, attendance, and view your class list.
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          {(['marks', 'attendance', 'students']).map((tab) => (
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

export default TeacherPage;