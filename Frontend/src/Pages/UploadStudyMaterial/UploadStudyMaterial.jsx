import React, { useState, useEffect } from 'react';
import { Upload, Edit3, Trash2, File, Plus, X, Save, AlertCircle } from 'lucide-react';

const StudyMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [modules, setModules] = useState([
    { _id: '507f1f77bcf86cd799439011', name: 'Mathematics' },
    { _id: '507f1f77bcf86cd799439012', name: 'Physics' },
    { _id: '507f1f77bcf86cd799439013', name: 'Chemistry' },
    { _id: '507f1f77bcf86cd799439014', name: 'Biology' }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    moduleId: '',
    title: '',
    description: '',
    fileUrl: ''
  });

  
  useEffect(() => {
    setMaterials([
      {
        _id: '1',
        moduleId: '507f1f77bcf86cd799439011',
        title: 'Calculus Fundamentals',
        description: 'Introduction to differential and integral calculus',
        fileUrl: 'https://example.com/calculus.pdf',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: '2',
        moduleId: '507f1f77bcf86cd799439012',
        title: 'Quantum Mechanics Basics',
        description: 'Basic principles of quantum mechanics',
        fileUrl: 'https://example.com/quantum.pdf',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  }, []);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  const resetForm = () => {
    setFormData({
      moduleId: '',
      title: '',
      description: '',
      fileUrl: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.fileUrl || (!editingId && !formData.moduleId)) {
      showMessage('error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      if (editingId) {
        
        const response = await fetch(`/api/study-material/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            fileUrl: formData.fileUrl
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setMaterials(materials.map(m => 
            m._id === editingId ? data.material : m
          ));
          showMessage('success', 'Study material updated successfully!');
        } else {
          const errorData = await response.json();
          showMessage('error', errorData.msg || 'Failed to update material');
        }
      } else {
        
        const response = await fetch('/api/study-material', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 201) {
          const data = await response.json();
          setMaterials([...materials, data.material]);
          showMessage('success', 'Study material added successfully!');
        } else {
          const errorData = await response.json();
          showMessage('error', errorData.error || 'Failed to create material');
        }
      }
      resetForm();
    } catch (error) {
      showMessage('error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (material) => {
    setFormData({
      moduleId: material.moduleId,
      title: material.title,
      description: material.description,
      fileUrl: material.fileUrl
    });
    setEditingId(material._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this study material?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/study-material/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMaterials(materials.filter(m => m._id !== id));
        showMessage('success', 'Study material deleted successfully!');
      } else {
        const errorData = await response.json();
        showMessage('error', errorData.msg || 'Failed to delete material');
      }
    } catch (error) {
      showMessage('error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getModuleName = (moduleId) => {
    const module = modules.find(m => m._id === moduleId);
    return module ? module.name : 'Unknown Module';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-stone-100 p-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-700">
                Study Material Manager
              </h1>
              <p className="text-slate-500 mt-2">Upload, manage, and organize your study materials</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{ backgroundColor: '#f74464' }}
            >
              <Plus size={20} />
              Add Material
            </button>
          </div>
        </div>

    
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <AlertCircle size={20} />
            {message.text}
          </div>
        )}

        
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-700">
                    {editingId ? 'Update Study Material' : 'Add New Study Material'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  {!editingId && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Module *
                      </label>
                      <select
                        value={formData.moduleId}
                        onChange={(e) => setFormData({...formData, moduleId: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
                        style={{ '--tw-ring-color': '#f74464' }}
                      >
                        <option value="">Select a module</option>
                        {modules.map(module => (
                          <option key={module._id} value={module._id}>
                            {module.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
                      style={{ '--tw-ring-color': '#f74464' }}
                      placeholder="Enter material title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all resize-none"
                      style={{ '--tw-ring-color': '#f74464' }}
                      placeholder="Enter material description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      File URL *
                    </label>
                    <input
                      type="url"
                      value={formData.fileUrl}
                      onChange={(e) => setFormData({...formData, fileUrl: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
                      style={{ '--tw-ring-color': '#f74464' }}
                      placeholder="https://example.com/file.pdf"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 text-white py-3 rounded-xl hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 font-semibold disabled:opacity-50"
                      style={{ backgroundColor: '#f74464' }}
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Save size={20} />
                          {editingId ? 'Update Material' : 'Add Material'}
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 border border-gray-300 text-slate-600 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div key={material._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: '#374258' }}>
                      <File className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-700 text-lg line-clamp-1">{material.title}</h3>
                      <p className="text-sm text-slate-500">{getModuleName(material.moduleId)}</p>
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 text-sm mb-4 line-clamp-3">{material.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <a
                    href={material.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-sm flex items-center gap-1 hover:underline transition-colors"
                    style={{ color: '#f74464' }}
                  >
                    <Upload size={16} />
                    View File
                  </a>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(material)}
                      className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all duration-200"
                      title="Edit material"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(material._id)}
                      disabled={loading}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50"
                      title="Delete material"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-slate-400">
                    Created: {new Date(material.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

   
        {materials.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-200">
            <div className="p-6 bg-slate-50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <File className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Study Materials Yet</h3>
            <p className="text-slate-600 mb-6">Start by adding your first study material to get organized.</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all duration-300 inline-flex items-center gap-2"
              style={{ backgroundColor: '#f74464' }}
            >
              <Plus size={20} />
              Add Your First Material
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyMaterial;