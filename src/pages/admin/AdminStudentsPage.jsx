import { useState, useEffect } from 'react';
import { useApiCall } from '../../hooks/useApiCall';

const AdminStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [activeAction, setActiveAction] = useState('view');
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    active: 'all', // 'all', 'active', 'inactive'
    role: 'all' // 'all', 'ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT', 'ROLE_PRINCIPAL'
  });
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('ROLE_STUDENT');
  const [editName, setEditName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhoneNumber, setEditPhoneNumber] = useState('');
  const [editIsActive, setEditIsActive] = useState(true);
  const [editRole, setEditRole] = useState('ROLE_STUDENT');
  const [fetchError, setFetchError] = useState('');
  const { loading, execute } = useApiCall();

  const roles = ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT', 'ROLE_PRINCIPAL'];

  const applyFilters = (studentList) => {
    return studentList.filter((student) => {
      // First name filter
      if (filters.firstName && !student.firstName?.toLowerCase().includes(filters.firstName.toLowerCase())) {
        return false;
      }

      // Last name filter
      if (filters.lastName && !student.lastName?.toLowerCase().includes(filters.lastName.toLowerCase())) {
        return false;
      }

      // Email filter
      if (filters.email && !student.email?.toLowerCase().includes(filters.email.toLowerCase())) {
        return false;
      }

      // Phone number filter
      if (filters.phoneNumber && !student.phoneNumber?.includes(filters.phoneNumber)) {
        return false;
      }

      // Active status filter
      if (filters.active === 'active' && !student.isActive) {
        return false;
      }
      if (filters.active === 'inactive' && student.isActive) {
        return false;
      }

      // Role filter
      if (filters.role !== 'all' && !student.roles?.includes(filters.role)) {
        return false;
      }

      return true;
    });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setFetchError('');
      const resourceServerUrl = import.meta.env.VITE_RESOURCE_SERVER_URL || 'http://localhost:8081';
      const accessToken = sessionStorage.getItem('accessToken');

      if (!accessToken) {
        const message = 'No access token found';
        console.error(message);
        setFetchError(message);
        setStudents([]);
        return;
      }

      const endpoint = '/api/users/role/student';

      const data = await execute(() =>
        fetch(`${resourceServerUrl}${endpoint}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          if (!res.ok) {
            return res.text().then((text) => {
              throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
            });
          }
          return res.json();
        })
      );

      setAllStudents(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('Failed to fetch students:', err);
      setFetchError(message);
      setStudents([]);
      setAllStudents([]);
    }
  };

  // Apply filters whenever filters change
  useEffect(() => {
    const filteredStudents = applyFilters(allStudents);
    setStudents(filteredStudents);
  }, [filters, allStudents]);

  const deleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      return;
    }

    try {
      const resourceServerUrl = import.meta.env.VITE_RESOURCE_SERVER_URL || 'http://localhost:8081';
      const accessToken = sessionStorage.getItem('accessToken');

      if (!accessToken) {
        alert('No access token found. Please login again.');
        return;
      }

      await execute(() =>
        fetch(`${resourceServerUrl}/api/users/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          if (!res.ok) {
            return res.text().then((text) => {
              throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
            });
          }
        })
      );

      // Refresh the students list
      fetchStudents();
      alert('Student deleted successfully!');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('Failed to delete student:', err);
      alert(`Failed to delete student: ${message}`);
    }
  };

  const saveEditedStudent = async () => {
    if (!selectedStudentId) return;

    // Basic validation
    if (!editName.trim() || !editLastName.trim() || !editEmail.trim() || !editPhoneNumber.trim()) {
      alert('Please fill in all required fields (First Name, Last Name, Email, Phone Number)');
      return;
    }

    try {
      const resourceServerUrl = import.meta.env.VITE_RESOURCE_SERVER_URL || 'http://localhost:8081';
      const accessToken = sessionStorage.getItem('accessToken');

      if (!accessToken) {
        alert('No access token found. Please login again.');
        return;
      }

      const studentData = {
        firstName: editName,
        lastName: editLastName,
        email: editEmail,
        phoneNumber: editPhoneNumber,
        roles: [editRole],
        isActive: editIsActive
      };

      await execute(() =>
        fetch(`${resourceServerUrl}/api/users/${selectedStudentId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(studentData),
        }).then((res) => {
          if (!res.ok) {
            return res.text().then((text) => {
              throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
            });
          }
          return res.json();
        })
      );

      // Refresh the students list
      fetchStudents();
      setSelectedStudentId(null);
      alert('Student updated successfully!');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('Failed to update student:', err);
      alert(`Failed to update student: ${message}`);
    }
  };

  const renderActionContent = () => {
    switch (activeAction) {
      case 'view':
        return (
          <div className="space-y-4">
            {loading ? (
              <p className="text-slate-500">Loading students...</p>
            ) : fetchError ? (
              <p className="text-red-500">{fetchError}</p>
            ) : students.length === 0 ? (
              <p className="text-slate-500">No students found.</p>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <ul className="space-y-3">
                  {students.map((student) => {
                    const roleNames = student.roles ? Array.from(student.roles).join(', ') : 'No Role';
                    const displayName = `${student.firstName || ''} ${student.lastName || ''}`.trim() || 'N/A';
                    return (
                      <li
                        key={student.id}
                        className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between"
                      >
                        <div>
                          <p className="font-semibold text-slate-900">{displayName}</p>
                          <p className="text-sm text-slate-600">{student.email}</p>
                          <p className="text-xs text-slate-500">Phone: {student.phoneNumber || 'N/A'}</p>
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium mt-1 ${
                            student.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {student.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                            {roleNames}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        );

      case 'add':
        return (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-slate-600">Student creation should be done through the registration endpoint. This feature can be extended to add new students through the admin panel.</p>
          </div>
        );

      case 'edit':
        return (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-3">Students List</h4>
            {students.length ? (
              <ul className="space-y-3">
                {students.map((student) => {
                  const displayName = `${student.firstName || ''} ${student.lastName || ''}`.trim() || 'N/A';
                  const roleNames = student.roles ? Array.from(student.roles).join(', ') : 'No Role';
                  return (
                    <li key={student.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="font-semibold text-slate-900">{displayName}</p>
                          <p className="text-sm text-slate-600">{student.email}</p>
                          <p className="text-xs text-slate-500">Phone: {student.phoneNumber || 'N/A'}</p>
                          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 mt-2">
                            {roleNames}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedStudentId(student.id);
                            setEditName(student.firstName || '');
                            setEditLastName(student.lastName || '');
                            setEditEmail(student.email || '');
                            setEditPhoneNumber(student.phoneNumber || '');
                            setEditIsActive(student.isActive !== undefined ? student.isActive : true);
                            setEditRole(student.roles ? Array.from(student.roles)[0] : 'ROLE_STUDENT');
                          }}
                          className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          Edit
                        </button>
                      </div>

                      {selectedStudentId === student.id ? (
                        <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                          <h5 className="text-base font-semibold text-slate-900 mb-3">Editing {displayName}</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label>
                              <input
                                type="text"
                                value={editLastName}
                                onChange={(e) => setEditLastName(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                              <input
                                type="email"
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                              <input
                                type="tel"
                                value={editPhoneNumber}
                                onChange={(e) => setEditPhoneNumber(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                              <select
                                value={editRole}
                                onChange={(e) => setEditRole(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                              >
                                {roles.map((role) => (
                                  <option key={role} value={role}>
                                    {role.replace('ROLE_', '')}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="md:col-span-2">
                              <label className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  checked={editIsActive}
                                  onChange={(e) => setEditIsActive(e.target.checked)}
                                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-slate-700">Active Student</span>
                              </label>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={saveEditedStudent}
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
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-slate-500">No students available.</p>
            )}
          </div>
        );

      case 'delete':
        return (
          <div className="space-y-4">
            {students.length ? (
              <ul className="space-y-3">
                {students.map((student) => {
                  const displayName = `${student.firstName || ''} ${student.lastName || ''}`.trim() || 'N/A';
                  return (
                    <li
                      key={student.id}
                      className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{displayName}</p>
                        <p className="text-sm text-slate-600">{student.email}</p>
                        <p className="text-xs text-slate-500">Phone: {student.phoneNumber || 'N/A'}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteStudent(student.id)}
                        className="rounded-2xl bg-red-100 px-4 py-2 text-sm text-red-700 hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-slate-500">No students are available to delete.</p>
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
                setActiveAction(tab);
                if (tab !== 'edit') setSelectedStudentId(null);
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeAction === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab === 'view' ? 'View Students' : tab === 'add' ? 'Add Student' : tab === 'edit' ? 'Edit Student' : 'Delete Student'}
            </button>
          ))}
        </div>

        {activeAction === 'view' && (
          <div className="mt-4 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">Filters</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={filters.firstName}
                    onChange={(e) => setFilters({ ...filters, firstName: e.target.value })}
                    placeholder="Search by first name..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={filters.lastName}
                    onChange={(e) => setFilters({ ...filters, lastName: e.target.value })}
                    placeholder="Search by last name..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={filters.email}
                    onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                    placeholder="Search by email..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={filters.phoneNumber}
                    onChange={(e) => setFilters({ ...filters, phoneNumber: e.target.value })}
                    placeholder="Search by phone..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Active Status</label>
                  <select
                    value={filters.active}
                    onChange={(e) => setFilters({ ...filters, active: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                  <select
                    value={filters.role}
                    onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="all">All Roles</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role.replace('ROLE_', '')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setFilters({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    active: 'all',
                    role: 'all'
                  })}
                  className="rounded-2xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-300"
                >
                  Clear Filters
                </button>
                <span className="text-sm text-slate-600 self-center">
                  Showing {students.length} of {allStudents.length} students
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        {renderActionContent()}
      </div>
    </div>
  );
};

export default AdminStudentsPage;