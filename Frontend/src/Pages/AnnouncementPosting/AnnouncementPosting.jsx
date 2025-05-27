import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, AlertCircle, Info, AlertTriangle, Users, GraduationCap, UserCheck } from 'lucide-react';

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info',
    audience: 'students'
  });

  const authToken = 'your-auth-token-here';

  useEffect(() => {
    setAnnouncements([
      {
        _id: '1',
        title: 'Welcome to New Semester',
        message: 'Welcome back everyone! Looking forward to a great semester.',
        type: 'info',
        audience: 'students',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: '2',
        title: 'Staff Meeting Tomorrow',
        message: 'Mandatory staff meeting at 3 PM in the conference room.',
        type: 'urgent',
        audience: 'teachers',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      message: '',
      type: 'info',
      audience: 'students'
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.message.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    
    setLoading(true);

    try {
      if (editingId) {
        const response = await fetch(`/api/announcements/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const data = await response.json();
          setAnnouncements(prev => 
            prev.map(ann => ann._id === editingId ? data.announcement : ann)
          );
          alert('Announcement updated successfully!');
        } else {
          alert('Failed to update announcement');
        }
      } else {
        const response = await fetch('/api/announcements', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const data = await response.json();
          setAnnouncements(prev => [data.announcement, ...prev]);
          alert('Announcement published successfully!');
        } else {
          alert('Failed to create announcement');
        }
      }
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      message: announcement.message,
      type: announcement.type,
      audience: announcement.audience
    });
    setEditingId(announcement._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this announcement?')) {
      return;
    }

    try {
      const response = await fetch(`/api/announcements/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        setAnnouncements(prev => prev.filter(ann => ann._id !== id));
        alert('Announcement deleted successfully!');
      } else {
        alert('Failed to delete announcement');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      default:
        return <Info className="w-5 h-5" style={{ color: '#374258' }} />;
    }
  };

  const getAudienceIcon = (audience) => {
    switch (audience) {
      case 'teachers':
        return <UserCheck className="w-4 h-4" style={{ color: '#f74464' }} />;
      case 'all':
        return <Users className="w-4 h-4" style={{ color: '#6a7285' }} />;
      default:
        return <GraduationCap className="w-4 h-4" style={{ color: '#374258' }} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'urgent':
        return 'border-l-red-500 bg-red-50';
      case 'warning':
        return 'border-l-orange-500 bg-orange-50';
      default:
        return 'bg-white' + ' border-l-4';
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f3f3f3' }}>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6" style={{ borderTop: '4px solid #f74464' }}>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold" style={{ color: '#374258' }}>
              Announcement Management
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              style={{ backgroundColor: '#f74464' }}
            >
              <Plus className="w-5 h-5" />
              New Announcement
            </button>
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
                <h2 className="text-2xl font-semibold mb-6" style={{ color: '#374258' }}>
                  {editingId ? 'Edit Announcement' : 'Create New Announcement'}
                </h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374258' }}>
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                      style={{ 
                        borderColor: '#c4c4c4',
                        focusRingColor: '#f74464'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#f74464'}
                      onBlur={(e) => e.target.style.borderColor = '#c4c4c4'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374258' }}>
                      Message     
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none"
                      style={{ 
                        borderColor: '#c4c4c4'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#f74464'}
                      onBlur={(e) => e.target.style.borderColor = '#c4c4c4'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374258' }}>
                      Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                      style={{ 
                        borderColor: '#c4c4c4'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#f74464'}
                      onBlur={(e) => e.target.style.borderColor = '#c4c4c4'}
                    >
                      <option value="info">Info</option>
                      <option value="warning">Warning</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374258' }}>
                      Audience
                    </label>
                    <select
                      value={formData.audience}
                      onChange={(e) => setFormData(prev => ({ ...prev, audience: e.target.value }))}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                      style={{ 
                        borderColor: '#c4c4c4'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#f74464'}
                      onBlur={(e) => e.target.style.borderColor = '#c4c4c4'}
                    >
                      <option value="students">Students</option>
                      <option value="teachers">Teachers</option>
                      <option value="all">All</option>
                    </select>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-50 shadow-md hover:shadow-lg"
                      style={{ backgroundColor: '#f74464' }}
                    >
                      {loading ? 'Saving...' : editingId ? 'Update' : 'Publish'}
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 py-3 rounded-lg font-medium hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
                      style={{ 
                        backgroundColor: '#6a7285',
                        color: 'white'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {announcements.length === 0 ? (
              <div className="text-center py-12 rounded-lg" style={{ backgroundColor: '#f3f3f3', color: '#6a7285' }}>
                <div className="text-lg font-medium">No announcements yet</div>
                <div className="text-sm mt-2">Create your first announcement to get started!</div>
              </div>
            ) : (
              announcements.map((announcement) => (
                <div
                  key={announcement._id}
                  className="rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border-l-4"
                  style={{
                    backgroundColor: 'white',
                    borderLeftColor: announcement.type === 'urgent' ? '#ef4444' : 
                                   announcement.type === 'warning' ? '#f97316' : '#f74464'
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(announcement.type)}
                      <h3 className="font-semibold text-xl" style={{ color: '#374258' }}>
                        {announcement.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(announcement)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        style={{ color: '#6a7285' }}
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(announcement._id)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors hover:text-red-600"
                        style={{ color: '#6a7285' }}
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-lg mb-4 leading-relaxed" style={{ color: '#374258' }}>
                    {announcement.message}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm" style={{ color: '#6a7285' }}>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-full" style={{ backgroundColor: '#f3f3f3' }}>
                      {getAudienceIcon(announcement.audience)}
                      <span className="capitalize font-medium">{announcement.audience}</span>
                    </div>
                    <span className="font-medium">
                      {new Date(announcement.createdAt).toLocaleDateString()} at{' '}
                      {new Date(announcement.createdAt).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;