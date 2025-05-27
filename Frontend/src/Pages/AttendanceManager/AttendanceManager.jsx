import { useState, useEffect } from 'react';
import { Users, UserCheck, UserX, UserMinus, Search, Plus, Edit2, Trash2, Save, X, Calendar, BookOpen } from 'lucide-react';

// API Base URL - Update this to match your backend
const API_BASE_URL = 'http://localhost:5000/api';

// Utility function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// StatusBadge Component
const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Absent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Excused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'Present':
        return <UserCheck className="w-4 h-4" />;
      case 'Absent':
        return <UserX className="w-4 h-4" />;
      case 'Excused':
        return <UserMinus className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  return (
    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles()}`}>
      {getStatusIcon()}
      <span>{status}</span>
    </span>
  );
};

// AttendanceCard Component
const AttendanceCard = ({ attendance, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-5 h-5 text-slate-600" />
            <h3 className="text-lg font-semibold text-slate-800">
              {typeof attendance.studentId === 'object' ? attendance.studentId.name : attendance.studentId}
            </h3>
          </div>
          <StatusBadge status={attendance.status} />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(attendance)}
            className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(attendance._id)}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-gray-600">
          <BookOpen className="w-4 h-4" />
          <span className="text-sm">
            {typeof attendance.moduleId === 'object' ? attendance.moduleId.name : attendance.moduleId}
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{formatDate(attendance.date)}</span>
        </div>
        
        {attendance.note && (
          <div className="bg-gray-50 rounded-lg p-3 mt-3">
            <p className="text-sm text-gray-700">{attendance.note}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// AttendanceForm Component
const AttendanceForm = ({ attendance, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    moduleId: '',
    date: '',
    status: 'Present',
    note: ''
  });

  useEffect(() => {
    if (attendance) {
      setFormData({
        studentId: typeof attendance.studentId === 'object' ? attendance.studentId._id : attendance.studentId,
        moduleId: typeof attendance.moduleId === 'object' ? attendance.moduleId._id : attendance.moduleId,
        date: attendance.date ? attendance.date.split('T')[0] : '',
        status: attendance.status || 'Present',
        note: attendance.note || ''
      });
    }
  }, [attendance]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-800">
              {attendance ? 'Edit Attendance' : 'Mark Attendance'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student ID
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Enter student ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Module ID
              </label>
              <input
                type="text"
                name="moduleId"
                value={formData.moduleId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Enter module ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attendance Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Excused">Excused</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note (Optional)
              </label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Add any additional notes..."
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-rose-500 text-white py-2 px-4 rounded-lg hover:bg-rose-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{attendance ? 'Update' : 'Mark Attendance'}</span>
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SearchAndFilterBar Component
const SearchAndFilterBar = ({ onSearch, searchParams, onParamsChange }) => {
  const handleSearch = () => {
    onSearch();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
          <input
            type="text"
            value={searchParams.studentId}
            onChange={(e) => onParamsChange({ ...searchParams, studentId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            placeholder="Search by student ID"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Module ID</label>
          <input
            type="text"
            value={searchParams.moduleId}
            onChange={(e) => onParamsChange({ ...searchParams, moduleId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            placeholder="Search by module ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={searchParams.date}
            onChange={(e) => onParamsChange({ ...searchParams, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={searchParams.status}
            onChange={(e) => onParamsChange({ ...searchParams, status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Excused">Excused</option>
          </select>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center space-x-2"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
        <button
          onClick={() => {
            onParamsChange({ studentId: '', moduleId: '', date: '', status: '' });
            onSearch();
          }}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

// AttendanceStats Component
const AttendanceStats = ({ attendanceRecords }) => {
  const stats = attendanceRecords.reduce((acc, record) => {
    acc[record.status] = (acc[record.status] || 0) + 1;
    return acc;
  }, {});

  const total = attendanceRecords.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
        <div className="flex items-center">
          <Users className="w-8 h-8 text-blue-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Records</p>
            <p className="text-2xl font-bold text-gray-900">{total}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
        <div className="flex items-center">
          <UserCheck className="w-8 h-8 text-green-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Present</p>
            <p className="text-2xl font-bold text-gray-900">{stats.Present || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
        <div className="flex items-center">
          <UserX className="w-8 h-8 text-red-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Absent</p>
            <p className="text-2xl font-bold text-gray-900">{stats.Absent || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
        <div className="flex items-center">
          <UserMinus className="w-8 h-8 text-yellow-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Excused</p>
            <p className="text-2xl font-bold text-gray-900">{stats.Excused || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main AttendanceManager Component
const AttendanceManager = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [searchParams, setSearchParams] = useState({ 
    studentId: '', 
    moduleId: '', 
    date: '', 
    status: '' 
  });

  // Fetch all attendance records
  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const data = await apiCall('/attendance');
      setAttendanceRecords(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch attendance records. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Search attendance records
  const searchAttendance = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
      
      const endpoint = queryParams.toString() ? `/attendance/search?${queryParams}` : '/attendance';
      const data = await apiCall(endpoint);
      setAttendanceRecords(data);
      setError(null);
    } catch (err) {
      setError('Failed to search attendance records');
    } finally {
      setLoading(false);
    }
  };

  // Create or update attendance
  const handleSubmit = async (formData) => {
    try {
      if (editingAttendance) {
        await apiCall(`/attendance/${editingAttendance._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiCall('/attendance', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      
      setShowForm(false);
      setEditingAttendance(null);
      fetchAttendance();
    } catch (err) {
      setError('Failed to save attendance record');
    }
  };

  // Delete attendance
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      try {
        await apiCall(`/attendance/${id}`, {
          method: 'DELETE',
        });
        fetchAttendance();
      } catch (err) {
        setError('Failed to delete attendance record');
      }
    }
  };

  // Edit attendance
  const handleEdit = (attendance) => {
    setEditingAttendance(attendance);
    setShowForm(true);
  };

  // Cancel form
  const handleCancel = () => {
    setShowForm(false);
    setEditingAttendance(null);
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-slate-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Attendance Management</h1>
              <p className="mt-2 text-rose-100">Track and manage student attendance efficiently</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-white text-rose-500 px-6 py-3 rounded-lg hover:bg-rose-50 transition-colors flex items-center space-x-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Mark Attendance</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <AttendanceStats attendanceRecords={attendanceRecords} />

        {/* Search and Filter Section */}
        <SearchAndFilterBar
          onSearch={searchAttendance}
          searchParams={searchParams}
          onParamsChange={setSearchParams}
        />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
            <span className="ml-3 text-gray-600">Loading attendance records...</span>
          </div>
        )}

        {/* Attendance Records Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attendanceRecords.length > 0 ? (
              attendanceRecords.map((attendance) => (
                <AttendanceCard
                  key={attendance._id}
                  attendance={attendance}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No attendance records found</h3>
                <p className="text-gray-500 mb-4">Start by marking your first attendance record</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition-colors"
                >
                  Mark Attendance
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <AttendanceForm
          attendance={editingAttendance}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default AttendanceManager;