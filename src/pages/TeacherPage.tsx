import { type FC, useState } from 'react';

type Student = {
  id: number;
  name: string;
  enrollmentId: string;
};

type TabType = 'marks' | 'attendance' | 'students';

const initialStudents: Student[] = [
  { id: 1, name: 'Cara Smith', enrollmentId: 'E001' },
  { id: 2, name: 'David Kim', enrollmentId: 'E002' },
  { id: 3, name: 'Emma Patel', enrollmentId: 'E003' },
  { id: 4, name: 'Frank Lopez', enrollmentId: 'E004' },
];

const TeacherPage: FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('marks');
  const [students] = useState<Student[]>(initialStudents);
  const [marksInput, setMarksInput] = useState<{ [key: number]: string }>({});
  const [attendanceInput, setAttendanceInput] = useState<{ [key: number]: boolean }>({});

  const renderContent = () => {
    switch (activeTab) {
      case 'marks':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">Manage Marks</h4>
            <div className="space-y-3">
              {students.map((student) => (
                <div key={student.id} className="rounded-3xl border border-slate-200 bg-white p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{student.name}</p>
                      <p className="text-sm text-slate-600">ID: {student.enrollmentId}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={marksInput[student.id] || ''}
                        onChange={(event) =>
                          setMarksInput((prev) => (
                            { ...prev, [student.id]: event.target.value }
                          ))
                        }
                        className="w-20 rounded-2xl border border-slate-300 px-3 py-2 text-sm"
                        placeholder="Marks"
                      />
                      <span className="text-sm text-slate-600">/ 100</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Save Marks
            </button>
          </div>
        );

      case 'attendance':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">Take Attendance</h4>
            <div className="space-y-3">
              {students.map((student) => (
                <div key={student.id} className="rounded-3xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{student.name}</p>
                      <p className="text-sm text-slate-600">ID: {student.enrollmentId}</p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={attendanceInput[student.id] || false}
                        onChange={(event) =>
                          setAttendanceInput((prev) => ({
                            ...prev,
                            [student.id]: event.target.checked,
                          }))
                        }
                        className="w-5 h-5 rounded border-slate-300"
                      />
                      <span className="text-sm font-medium text-slate-700">Present</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Submit Attendance
            </button>
          </div>
        );

      case 'students':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">View Students</h4>
            {students.length ? (
              <ul className="space-y-3">
                {students.map((student) => (
                  <li key={student.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">{student.name}</p>
                    <p className="text-sm text-slate-600">Enrollment ID: {student.enrollmentId}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500">No students enrolled.</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900 mb-2">Teacher Dashboard</h2>
      <p className="text-slate-600 mb-6">
        Manage your classes, mark attendance, and record student performance.
      </p>
      <div className="flex flex-wrap gap-3 mb-6">
        {(['marks', 'attendance', 'students'] as TabType[]).map((tab) => (
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
            {tab === 'marks' ? 'Manage Marks' : tab === 'attendance' ? 'Take Attendance' : 'View Students'}
          </button>
        ))}
      </div>
      {renderContent()}
    </div>
  );
};

export default TeacherPage;
