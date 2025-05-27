import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Search, Plus, Edit2, Trash2, Save, X, BookOpen } from 'lucide-react';

const ExamSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    moduleId: '',
    date: ''
  });

  const [formData, setFormData] = useState({
    moduleId: '',
    date: '',
    startTime: '',
    endTime: '',
    note: ''
  });

  
  useEffect(() => {
    
    setModules([
      { _id: '507f1f77bcf86cd799439011', name: 'Mathematics' },
      { _id: '507f1f77bcf86cd799439012', name: 'Physics' },
      { _id: '507f1f77bcf86cd799439013', name: 'Chemistry' },
      { _id: '507f1f77bcf86cd799439014', name: 'Biology' },
      { _id: '507f1f77bcf86cd799439015', name: 'Computer Science' }
    ]);
    fetchSchedules();
  }, []);

  const API_BASE = '/api/exam-schedule';

  const showMessage = (message, type = 'success') => {
    if (type === 'success') {
      setSuccess(message);
      setError('');
    } else {
      setError(message);
      setSuccess('');
    }
    setTimeout(() => {
      setSuccess('');
      setError('');
    }, 3000);
  };

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE);
      if (response.ok) {
        const data = await response.json();
        setSchedules(data);
      } else {
        showMessage('Failed to fetch exam schedules', 'error');
      }
    } catch (err) {
      showMessage('Error connecting to server', 'error');
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!formData.moduleId || !formData.date || !formData.startTime || !formData.endTime) {
      showMessage('Please fill in all required fields', 'error');
      return;
    }

    setLoading(true);

    try {
      const url = editingId ? `${API_BASE}/${editingId}` : API_BASE;
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        showMessage(data.msg);
        resetForm();
        fetchSchedules();
      } else {
        const errorData = await response.json();
        showMessage(errorData.msg || 'Operation failed', 'error');
      }
    } catch (err) {
      showMessage('Error connecting to server', 'error');
    }
    setLoading(false);
  };

  const handleEdit = (schedule) => {
    setFormData({
      moduleId: schedule.moduleId._id || schedule.moduleId,
      date: schedule.date,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      note: schedule.note || ''
    });
    setEditingId(schedule._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this exam schedule?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        showMessage(data.msg);
        fetchSchedules();
      } else {
        showMessage('Failed to delete exam schedule', 'error');
      }
    } catch (err) {
      showMessage('Error connecting to server', 'error');
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchFilters.moduleId) params.append('moduleId', searchFilters.moduleId);
      if (searchFilters.date) params.append('date', searchFilters.date);
      
      const url = params.toString() ? `${API_BASE}/search?${params}` : API_BASE;
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        setSchedules(data);
      } else {
        showMessage('Search failed', 'error');
      }
    } catch (err) {
      showMessage('Error during search', 'error');
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      moduleId: '',
      date: '',
      startTime: '',
      endTime: '',
      note: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const resetSearch = () => {
    setSearchFilters({ moduleId: '', date: '' });
    fetchSchedules();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="h-8 w-8 text-white" />
                <h1 className="text-3xl font-bold text-white">Exam Schedule Manager</h1>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Schedule</span>
              </button>
            </div>
          </div>

      
          {(success || error) && (
            <div className="px-8 py-4">
              <div className={`p-4 rounded-lg ${success ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                {success || error}
              </div>
            </div>
          )}

        
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center space-x-4 mb-4">
              <Search className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-700">Search & Filter</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Module</label>
                <select
                  value={searchFilters.moduleId}
                  onChange={(e) => setSearchFilters({ ...searchFilters, moduleId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Modules</option>
                  {modules.map(module => (
                    <option key={module._id} value={module._id}>{module.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={searchFilters.date}
                  onChange={(e) => setSearchFilters({ ...searchFilters, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end space-x-2">
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </button>
                <button
                  onClick={resetSearch}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {editingId ? 'Edit Exam Schedule' : 'Add New Exam Schedule'}
                  </h3>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Module *</label>
                    <select
                      value={formData.moduleId}
                      onChange={(e) => setFormData({ ...formData, moduleId: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Module</option>
                      {modules.map(module => (
                        <option key={module._id} value={module._id}>{module.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
                      <input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Time *</label>
                      <input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                    <textarea
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Optional notes about the exam..."
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>{loading ? 'Saving...' : (editingId ? 'Update' : 'Create')}</span>
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          
          <div className="px-8 py-6">
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Loading...</p>
              </div>
            )}

            {!loading && schedules.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">No exam schedules found</h3>
                <p className="text-gray-400">Create your first exam schedule to get started.</p>
              </div>
            )}

            {!loading && schedules.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schedules.map((schedule) => (
                  <div key={schedule._id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                          <h3 className="font-semibold text-gray-800">
                            {schedule.moduleId?.name || 'Unknown Module'}
                          </h3>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(schedule)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(schedule._id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{formatDate(schedule.date)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">
                            {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                          </span>
                        </div>

                        {schedule.note && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-700">{schedule.note}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSchedule;