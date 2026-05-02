import { type FC, useState } from 'react';

type TabType = 'profile' | 'marks' | 'attendance' | 'library';

const StudentPage: FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
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

  const [attendance] = useState({
    presentDays: 42,
    totalDays: 45,
    percentage: 93,
  });

  const [books] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', issuedDate: '2024-04-15' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', issuedDate: '2024-04-20' },
  ]);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">Student Profile</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-600 mb-1">Full Name</p>
                <p className="font-semibold text-slate-900">{profileData.name}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-600 mb-1">Enrollment ID</p>
                <p className="font-semibold text-slate-900">{profileData.enrollmentId}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-600 mb-1">Grade</p>
                <p className="font-semibold text-slate-900">{profileData.grade}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-600 mb-1">Email</p>
                <p className="font-semibold text-slate-900">{profileData.email}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 md:col-span-2">
                <p className="text-sm text-slate-600 mb-1">Phone</p>
                <p className="font-semibold text-slate-900">{profileData.phone}</p>
              </div>
            </div>
          </div>
        );

      case 'marks':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">View Marks</h4>
            <div className="space-y-3">
              {marks.map((mark, index) => (
                <div key={index} className="rounded-3xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900">{mark.subject}</p>
                    <span className="text-2xl font-bold text-blue-600">{mark.marks}</span>
                  </div>
                  <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${mark.marks}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'attendance':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">View Attendance</h4>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
                <p className="text-sm text-slate-600 mb-2">Days Present</p>
                <p className="text-4xl font-bold text-green-600">{attendance.presentDays}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
                <p className="text-sm text-slate-600 mb-2">Total Days</p>
                <p className="text-4xl font-bold text-blue-600">{attendance.totalDays}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
                <p className="text-sm text-slate-600 mb-2">Percentage</p>
                <p className="text-4xl font-bold text-blue-600">{attendance.percentage}%</p>
              </div>
            </div>
          </div>
        );

      case 'library':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">Library Books</h4>
            {books.length ? (
              <ul className="space-y-3">
                {books.map((book) => (
                  <li key={book.id} className="rounded-3xl border border-slate-200 bg-white p-4">
                    <p className="font-semibold text-slate-900">{book.title}</p>
                    <p className="text-sm text-slate-600">Author: {book.author}</p>
                    <p className="text-sm text-slate-600">Issued: {book.issuedDate}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500">No books currently issued.</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900 mb-2">Student Dashboard</h2>
      <p className="text-slate-600 mb-6">
        View your profile, marks, attendance, and library records.
      </p>
      <div className="flex flex-wrap gap-3 mb-6">
        {(['profile', 'marks', 'attendance', 'library'] as TabType[]).map((tab) => (
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
            {tab === 'profile' ? 'View Profile' : tab === 'marks' ? 'View Marks' : tab === 'attendance' ? 'View Attendance' : 'Library Books'}
          </button>
        ))}
      </div>
      {renderContent()}
    </div>
  );
};

export default StudentPage;
