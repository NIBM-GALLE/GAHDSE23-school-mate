import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Search, Plus, Edit2, Trash2, Save, X, BookOpen } from 'lucide-react';

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

// TimetableCard Component
const TimetableCard = ({ timetable, onEdit, onDelete }) => {
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
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-800">
            {typeof timetable.moduleId === 'object' ? timetable.moduleId.name : timetable.moduleId}
          </h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(timetable)}
            className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(timetable._id)}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(timetable.date)}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{timetable.startTime} - {timetable.endTime}</span>
        </div>
        
        {timetable.note && (
          <div className="bg-gray-50 rounded-lg p-3 mt-3">
            <p className="text-sm text-gray-700">{timetable.note}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// TimetableForm Component
const TimetableForm = ({ timetable, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    moduleId: '',
    date: '',
    startTime: '',
    endTime: '',
    note: ''
  });

  useEffect(() => {
    if (timetable) {
      setFormData({
        moduleId: typeof timetable.moduleId === 'object' ? timetable.moduleId._id : timetable.moduleId,
        date: timetable.date ? timetable.date.split('T')[0] : '',
        startTime: timetable.startTime || '',
        endTime: timetable.endTime || '',
        note: timetable.note || ''
      });
    }
  }, [timetable]);

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
              {timetable ? 'Edit Timetable' : 'Add New Timetable'}
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
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
                <span>{timetable ? 'Update' : 'Create'}</span>
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

// SearchBar Component
const SearchBar = ({ onSearch, searchParams, onParamsChange }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="date"
            value={searchParams.date}
            onChange={(e) => onParamsChange({ ...searchParams, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            placeholder="Search by date"
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={searchParams.moduleId}
            onChange={(e) => onParamsChange({ ...searchParams, moduleId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            placeholder="Search by module ID"
          />
        </div>
        <button
          type="button"
          onClick={handleSearch}
          className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center space-x-2"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
        <button
          type="button"
          onClick={() => {
            onParamsChange({ date: '', moduleId: '' });
            onSearch();
          }}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

// Main TimetableManager Component
const TimetableManager = () => {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTimetable, setEditingTimetable] = useState(null);
  const [searchParams, setSearchParams] = useState({ date: '', moduleId: '' });

  // Fetch all timetables
  const fetchTimetables = async () => {
    try {
      setLoading(true);
      const data = await apiCall('/timetables');
      setTimetables(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch timetables. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Search timetables
  const searchTimetables = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (searchParams.date) queryParams.append('date', searchParams.date);
      if (searchParams.moduleId) queryParams.append('moduleId', searchParams.moduleId);
      
      const endpoint = queryParams.toString() ? `/timetables/search?${queryParams}` : '/timetables';
      const data = await apiCall(endpoint);
      setTimetables(data);
      setError(null);
    } catch (err) {
      setError('Failed to search timetables');
    } finally {
      setLoading(false);
    }
  };

  // Create or update timetable
  const handleSubmit = async (formData) => {
    try {
      if (editingTimetable) {
        await apiCall(`/timetables/${editingTimetable._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiCall('/timetables', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      
      setShowForm(false);
      setEditingTimetable(null);
      fetchTimetables();
    } catch (err) {
      setError('Failed to save timetable');
    }
  };

  // Delete timetable
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this timetable?')) {
      try {
        await apiCall(`/timetables/${id}`, {
          method: 'DELETE',
        });
        fetchTimetables();
      } catch (err) {
        setError('Failed to delete timetable');
      }
    }
  };

  // Edit timetable
  const handleEdit = (timetable) => {
    setEditingTimetable(timetable);
    setShowForm(true);
  };

  // Cancel form
  const handleCancel = () => {
    setShowForm(false);
    setEditingTimetable(null);
  };

  useEffect(() => {
    fetchTimetables();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-slate-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Timetable Management</h1>
              <p className="mt-2 text-rose-100">Manage your class schedules efficiently</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-white text-rose-500 px-6 py-3 rounded-lg hover:bg-rose-50 transition-colors flex items-center space-x-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Add Timetable</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <SearchBar
          onSearch={searchTimetables}
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
            <span className="ml-3 text-gray-600">Loading timetables...</span>
          </div>
        )}

        {/* Timetables Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timetables.length > 0 ? (
              timetables.map((timetable) => (
                <TimetableCard
                  key={timetable._id}
                  timetable={timetable}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No timetables found</h3>
                <p className="text-gray-500 mb-4">Get started by creating your first timetable</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition-colors"
                >
                  Add Timetable
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <TimetableForm
          timetable={editingTimetable}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default TimetableManager;