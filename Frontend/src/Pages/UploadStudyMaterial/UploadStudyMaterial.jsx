import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, FileText, Download, X, Save, Book } from 'lucide-react';

const StudyMaterialsApp = () => {
  const [materials, setMaterials] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState('');
  const [searchType, setSearchType] = useState('title');


  const [formData, setFormData] = useState({
    moduleId: '',
    title: '',
    description: '',
    fileUrl: ''
  });


  const API_BASE = 'http://localhost:3000/api';

  
  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/study-materials`);
      if (response.ok) {
        const data = await response.json();
        setMaterials(data);
      }
    } catch (error) {
      console.error('Error fetching materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const createMaterial = async (materialData) => {
    try {
      const response = await fetch(`${API_BASE}/study-materials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(materialData),
      });
      
      if (response.ok) {
        await fetchMaterials();
        setShowAddModal(false);
        resetForm();
        alert('Study material added successfully!');
      }
    } catch (error) {
      console.error('Error creating material:', error);
      alert('Error creating material');
    }
  };

  
  const updateMaterial = async (id, materialData) => {
    try {
      const response = await fetch(`${API_BASE}/study-materials/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(materialData),
      });
      
      if (response.ok) {
        await fetchMaterials();
        setShowEditModal(false);
        setEditingMaterial(null);
        resetForm();
        alert('Study material updated successfully!');
      }
    } catch (error) {
      console.error('Error updating material:', error);
      alert('Error updating material');
    }
  };

  
  const deleteMaterial = async (id) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      try {
        const response = await fetch(`${API_BASE}/study-materials/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          await fetchMaterials();
          alert('Study material deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting material:', error);
        alert('Error deleting material');
      }
    }
  };

  
  const searchMaterials = async () => {
    if (!searchTerm.trim()) {
      fetchMaterials();
      return;
    }

    setLoading(true);
    try {
      let url;
      if (searchType === 'title') {
        url = `${API_BASE}/study-materials/search/title?title=${encodeURIComponent(searchTerm)}`;
      } else if (searchType === 'module') {
        url = `${API_BASE}/study-materials/search/module?moduleId=${encodeURIComponent(searchTerm)}`;
      }
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setMaterials(data);
      }
    } catch (error) {
      console.error('Error searching materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      moduleId: '',
      title: '',
      description: '',
      fileUrl: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.moduleId || !formData.title || !formData.description || !formData.fileUrl) {
      alert('Please fill in all fields');
      return;
    }
    
    if (editingMaterial) {
      updateMaterial(editingMaterial._id, formData);
    } else {
      createMaterial(formData);
    }
  };

  const openEditModal = (material) => {
    setEditingMaterial(material);
    setFormData({
      moduleId: typeof material.moduleId === 'object' ? material.moduleId._id : material.moduleId,
      title: material.title,
      description: material.description,
      fileUrl: material.fileUrl
    });
    setShowEditModal(true);
  };

  
  useEffect(() => {
    fetchMaterials();
   
    setModules([
      { _id: '1', name: 'Mathematics' },
      { _id: '2', name: 'Physics' },
      { _id: '3', name: 'Chemistry' },
      { _id: '4', name: 'Computer Science' }
    ]);
  }, []);

  
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm) {
        searchMaterials();
      } else {
        fetchMaterials();
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, searchType]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Book className="text-blue-600" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">Study Materials</h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus size={20} />
              <span>Add Material</span>
            </button>
          </div>
        </div>

       
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search study materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="title">Search by Title</option>
              <option value="module">Search by Module ID</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm('');
                fetchMaterials();
              }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        
        <div className="bg-white rounded-lg shadow-sm">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading materials...</p>
            </div>
          ) : materials.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600">No study materials found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {materials.map((material) => (
                <div key={material._id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {material.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{material.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {typeof material.moduleId === 'object' 
                            ? material.moduleId.name || 'Module' 
                            : `Module ID: ${material.moduleId}`}
                        </span>
                        {material.fileUrl && (
                          <a
                            href={material.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                          >
                            <Download size={16} />
                            <span>Download</span>
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => openEditModal(material)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteMaterial(material._id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

       
        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingMaterial ? 'Edit Study Material' : 'Add New Study Material'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      setEditingMaterial(null);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Module
                    </label>
                    <select
                      name="moduleId"
                      value={formData.moduleId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a module</option>
                      {modules.map((module) => (
                        <option key={module._id} value={module._id}>
                          {module.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter material title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter material description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      File URL
                    </label>
                    <input
                      type="url"
                      name="fileUrl"
                      value={formData.fileUrl}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/file.pdf"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddModal(false);
                        setShowEditModal(false);
                        setEditingMaterial(null);
                        resetForm();
                      }}
                      className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
                    >
                      <Save size={18} />
                      <span>{editingMaterial ? 'Update' : 'Create'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyMaterialsApp;