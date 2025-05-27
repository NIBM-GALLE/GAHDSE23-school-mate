import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Search, Plus, Edit, Trash2, BookOpen, AlertCircle, CheckCircle, X } from 'lucide-react';

const ExamScheduleApp = () => {
  const [exams, setExams] = useState([]);
  const [modules, setModules] = useState([
    { _id: '1', name: 'Mathematics' },
    { _id: '2', name: 'Physics' },
    { _id: '3', name: 'Chemistry' },
    { _id: '4', name: 'Computer Science' },
    { _id: '5', name: 'Biology' }
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [searchFilters, setSearchFilters] = useState({ moduleId: '', date: '' });
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const [formData, setFormData] = useState({
    moduleId: '',
    date: '',
    startTime: '',
    endTime: '',
    note: ''
  });

  const API_BASE = '/api/exams'; 

  
  const apiCall = async (url, options = {}) => {
    setLoading(true);
    try {
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      
      if (options.method === 'POST') {
        const newExam = {
          _id: Date.now().toString(),
          moduleId: modules.find(m => m._id === formData.moduleId),
          ...formData,
          date: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime,
          note: formData.note || ''
        };
        setExams(prev => [...prev, newExam]);
        return { msg: 'Exam schedule published', schedule: newExam };
      } else if (options.method === 'PUT') {
        const updatedExam = {
          ...editingExam,
          moduleId: modules.find(m => m._id === formData.moduleId),
          ...formData
        };
        setExams(prev => prev.map(exam => exam._id === editingExam._id ? updatedExam : exam));
        return { msg: 'Exam schedule updated successfully', schedule: updatedExam };
      } else if (options.method === 'DELETE') {
        const examId = url.split('/').pop();
        setExams(prev => prev.filter(exam => exam._id !== examId));
        return { msg: 'Exam schedule deleted successfully' };
      }
    } catch (error) {
      throw new Error('API call failed');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const resetForm = () => {
    setFormData({
      moduleId: '',
      date: '',
      startTime: '',
      endTime: '',
      note: ''
    });
  };

  const handleCreateExam = async () => {
    if (!formData.moduleId || !formData.date || !formData.startTime || !formData.endTime) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    try {
      const response = await apiCall(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      showNotification('Exam schedule created successfully!');
      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      showNotification('Failed to create exam schedule', 'error');
    }
  };

  const handleUpdateExam = async () => {
    if (!formData.moduleId || !formData.date || !formData.startTime || !formData.endTime) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    try {
      const response = await apiCall(`${API_BASE}/${editingExam._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      showNotification('Exam schedule updated successfully!');
      setShowEditModal(false);
      setEditingExam(null);
      resetForm();
    } catch (error) {
      showNotification('Failed to update exam schedule', 'error');
    }
  };

  const handleDeleteExam = async (examId) => {
    if (window.confirm('Are you sure you want to delete this exam schedule?')) {
      try {
        await apiCall(`${API_BASE}/${examId}`, { method: 'DELETE' });
        showNotification('Exam schedule deleted successfully!');
      } catch (error) {
        showNotification('Failed to delete exam schedule', 'error');
      }
    }
  };

  const openEditModal = (exam) => {
    setEditingExam(exam);
    setFormData({
      moduleId: exam.moduleId._id,
      date: exam.date,
      startTime: exam.startTime,
      endTime: exam.endTime,
      note: exam.note || ''
    });
    setShowEditModal(true);
  };

  const filteredExams = exams.filter(exam => {
    const matchesModule = !searchFilters.moduleId || exam.moduleId._id === searchFilters.moduleId;
    const matchesDate = !searchFilters.date || exam.date === searchFilters.date;
    return matchesModule && matchesDate;
  });

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
       
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Exam Schedule Management</h1>
                <p className="text-gray-600">Manage and organize exam schedules efficiently</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Exam</span>
            </button>
          </div>
        </div>

        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Search className="w-5 h-5 text-gray-500" />
            <h2 className="text-xl font-semibold text-gray-900">Search & Filter</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Module</label>
              <select
                value={searchFilters.moduleId}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, moduleId: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Modules</option>
                {modules.map(module => (
                  <option key={module._id} value={module._id}>{module.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Date</label>
              <input
                type="date"
                value={searchFilters.date}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setSearchFilters({ moduleId: '', date: '' })}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Exam Schedules ({filteredExams.length})
          </h2>
          
          {filteredExams.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-500 mb-2">No exam schedules found</h3>
              <p className="text-gray-400">Create your first exam schedule to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredExams.map(exam => (
                <div key={exam._id} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{exam.moduleId.name}</h3>
                        <p className="text-sm text-gray-500">Module ID: {exam.moduleId._id}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(exam)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteExam(exam._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{formatDate(exam.date)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(exam.startTime)} - {formatTime(exam.endTime)}</span>
                    </div>
                    
                    {exam.note && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                        <p className="text-sm text-yellow-800">{exam.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Create New Exam Schedule</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Module</label>
                <select
                  value={formData.moduleId}
                  onChange={(e) => setFormData(prev => ({ ...prev, moduleId: e.target.value }))}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Note (Optional)</label>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Add any additional notes..."
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateExam}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Exam'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Edit Exam Schedule</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Module</label>
                <select
                  value={formData.moduleId}
                  onChange={(e) => setFormData(prev => ({ ...prev, moduleId: e.target.value }))}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Note (Optional)</label>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Add any additional notes..."
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateExam}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Exam'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
      {notification && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`flex items-center space-x-3 px-6 py-4 rounded-lg shadow-lg ${
            notification.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamScheduleApp;