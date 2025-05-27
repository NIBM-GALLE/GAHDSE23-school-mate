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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6" style={{ background: 'linear-gradient(135deg, #f3f3f3 0%, #c4c4c4 100%)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-300">
      
          <div className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #374258 0%, #6a7285 100%)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="h-8 w-8 text-white" />
                <h1 className="text-3xl font-bold text-white">Exam Schedule Manager</h1>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 border-2 border-white hover:border-opacity-80"
                style={{ backgroundColor: '#f74464', boxShadow: '0 4px 12px rgba(247, 68, 100, 0.3)' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e63954'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f74464'}
              >
                <Plus className="h-5 w-5" />
                <span>Add Schedule</span>
              </button>
            </div>
          </div>

      
          {(success || error) && (
            <div className="px-8 py-4">
              <div className={`p-4 rounded-lg border-2 ${success ? 'text-green-800 border-green-300' : 'text-red-800 border-red-300'}`} 
                style={{ backgroundColor: success ? '#f0f9f0' : '#fef2f2' }}>
                {success || error}
              </div>
            </div>
          )}

        
          <div className="px-8 py-6 border-b-2" style={{ borderColor: '#c4c4c4', backgroundColor: '#f8f9fa' }}>
            <div className="flex items-center space-x-4 mb-4">
              <Search className="h-5 w-5" style={{ color: '#6a7285' }} />
              <h2 className="text-lg font-semibold" style={{ color: '#374258' }}>Search & Filter</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#374258' }}>Module</label>
                <select
                  value={searchFilters.moduleId}
                  onChange={(e) => setSearchFilters({ ...searchFilters, moduleId: e.target.value })}
                  className="w-full px-4 py-2 border-2 rounded-lg transition-all duration-200 focus:outline-none"
                  style={{ 
                    borderColor: '#c4c4c4',
                    backgroundColor: 'white'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#f74464';
                    e.target.style.boxShadow = '0 0 0 3px rgba(247, 68, 100, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#c4c4c4';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">All Modules</option>
                  {modules.map(module => (
                    <option key={module._id} value={module._id}>{module.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#374258' }}>Date</label>
                <input
                  type="date"
                  value={searchFilters.date}
                  onChange={(e) => setSearchFilters({ ...searchFilters, date: e.target.value })}
                  className="w-full px-4 py-2 border-2 rounded-lg transition-all duration-200 focus:outline-none"
                  style={{ 
                    borderColor: '#c4c4c4',
                    backgroundColor: 'white'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#f74464';
                    e.target.style.boxShadow = '0 0 0 3px rgba(247, 68, 100, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#c4c4c4';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div className="flex items-end space-x-2">
                <button
                  onClick={handleSearch}
                  className="text-white px-6 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 font-medium"
                  style={{ backgroundColor: '#6a7285', boxShadow: '0 4px 12px rgba(106, 114, 133, 0.3)' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#374258'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#6a7285'}
                >
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </button>
                <button
                  onClick={resetSearch}
                  className="text-white px-6 py-2 rounded-lg transition-all duration-300 font-medium"
                  style={{ backgroundColor: '#c4c4c4' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#6a7285'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#c4c4c4'}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border-2" style={{ borderColor: '#6a7285' }}>
                <div className="px-6 py-4 border-b-2 flex items-center justify-between" style={{ borderColor: '#c4c4c4', backgroundColor: '#f8f9fa' }}>
                  <h3 className="text-xl font-semibold" style={{ color: '#374258' }}>
                    {editingId ? 'Edit Exam Schedule' : 'Add New Exam Schedule'}
                  </h3>
                  <button
                    onClick={resetForm}
                    className="transition-colors duration-200"
                    style={{ color: '#6a7285' }}
                    onMouseEnter={(e) => e.target.style.color = '#f74464'}
                    onMouseLeave={(e) => e.target.style.color = '#6a7285'}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374258' }}>Module *</label>
                    <select
                      value={formData.moduleId}
                      onChange={(e) => setFormData({ ...formData, moduleId: e.target.value })}
                      required
                      className="w-full px-4 py-2 border-2 rounded-lg transition-all duration-200 focus:outline-none"
                      style={{ 
                        borderColor: '#c4c4c4',
                        backgroundColor: 'white'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#f74464';
                        e.target.style.boxShadow = '0 0 0 3px rgba(247, 68, 100, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#c4c4c4';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="">Select Module</option>
                      {modules.map(module => (
                        <option key={module._id} value={module._id}>{module.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374258' }}>Date *</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      className="w-full px-4 py-2 border-2 rounded-lg transition-all duration-200 focus:outline-none"
                      style={{ 
                        borderColor: '#c4c4c4',
                        backgroundColor: 'white'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#f74464';
                        e.target.style.boxShadow = '0 0 0 3px rgba(247, 68, 100, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#c4c4c4';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#374258' }}>Start Time *</label>
                      <input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        required
                        className="w-full px-4 py-2 border-2 rounded-lg transition-all duration-200 focus:outline-none"
                        style={{ 
                          borderColor: '#c4c4c4',
                          backgroundColor: 'white'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#f74464';
                          e.target.style.boxShadow = '0 0 0 3px rgba(247, 68, 100, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#c4c4c4';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#374258' }}>End Time *</label>
                      <input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        required
                        className="w-full px-4 py-2 border-2 rounded-lg transition-all duration-200 focus:outline-none"
                        style={{ 
                          borderColor: '#c4c4c4',
                          backgroundColor: 'white'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#f74464';
                          e.target.style.boxShadow = '0 0 0 3px rgba(247, 68, 100, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#c4c4c4';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374258' }}>Note</label>
                    <textarea
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border-2 rounded-lg transition-all duration-200 focus:outline-none"
                      style={{ 
                        borderColor: '#c4c4c4',
                        backgroundColor: 'white'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#f74464';
                        e.target.style.boxShadow = '0 0 0 3px rgba(247, 68, 100, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#c4c4c4';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="Optional notes about the exam..."
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 text-white py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 font-medium"
                      style={{ 
                        backgroundColor: '#f74464',
                        boxShadow: '0 4px 12px rgba(247, 68, 100, 0.3)'
                      }}
                      onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#e63954')}
                      onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#f74464')}
                    >
                      <Save className="h-4 w-4" />
                      <span>{loading ? 'Saving...' : (editingId ? 'Update' : 'Create')}</span>
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 text-white py-2 px-4 rounded-lg transition-all duration-300 font-medium"
                      style={{ backgroundColor: '#6a7285' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#374258'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#6a7285'}
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
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#f74464' }}></div>
                <p className="mt-2" style={{ color: '#6a7285' }}>Loading...</p>
              </div>
            )}

            {!loading && schedules.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto mb-4" style={{ color: '#c4c4c4' }} />
                <h3 className="text-lg font-medium mb-2" style={{ color: '#6a7285' }}>No exam schedules found</h3>
                <p style={{ color: '#c4c4c4' }}>Create your first exam schedule to get started.</p>
              </div>
            )}

            {!loading && schedules.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schedules.map((schedule) => (
                  <div 
                    key={schedule._id} 
                    className="bg-white rounded-xl shadow-lg border-2 overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                    style={{ 
                      borderColor: '#c4c4c4',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
                    }}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-5 w-5" style={{ color: '#f74464' }} />
                          <h3 className="font-semibold" style={{ color: '#374258' }}>
                            {schedule.moduleId?.name || 'Unknown Module'}
                          </h3>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(schedule)}
                            className="transition-colors duration-200"
                            style={{ color: '#6a7285' }}
                            onMouseEnter={(e) => e.target.style.color = '#f74464'}
                            onMouseLeave={(e) => e.target.style.color = '#6a7285'}
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(schedule._id)}
                            className="transition-colors duration-200"
                            style={{ color: '#6a7285' }}
                            onMouseEnter={(e) => e.target.style.color = '#f74464'}
                            onMouseLeave={(e) => e.target.style.color = '#6a7285'}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2" style={{ color: '#6a7285' }}>
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{formatDate(schedule.date)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2" style={{ color: '#6a7285' }}>
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">
                            {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                          </span>
                        </div>

                        {schedule.note && (
                          <div className="mt-3 p-3 rounded-lg border" style={{ backgroundColor: '#f8f9fa', borderColor: '#c4c4c4' }}>
                            <p className="text-sm" style={{ color: '#374258' }}>{schedule.note}</p>
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