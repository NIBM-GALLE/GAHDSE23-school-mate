import React, { useState } from "react";

const initialMaterials = [
  
    {
      "title": "ICT Lesson 1 Notes",
      "moduleId": "ICT101",
      "description": "Introduction to Computer Systems",
      "fileUrl": "https://schoolict.net/al-ict-basic-concepts-of-ict/",
      "status": "Completed"
    },
    {
      "title": "ICT Assignment 1",
      "moduleId": "ICT102",
      "description": "Answer all questions from Chapter 1",
      "fileUrl": "https://www.scribd.com/document/559487839/ICT-Lesson-1-Short-Note-Sinhala",
      "status": "Not Started"
    },
    {
      "title": "Biology Practical Video",
      "moduleId": "SCI201",
      "description": "Plant Cell Observation Demo",
      "fileUrl": "https://example.com/biology-practical.mp4",
      "status": "In Progress"
    },
    {
      "title": "Past Paper Discussion - 2023",
      "moduleId": "GEN301",
      "description": "A/L ICT Paper 2023 Marking Scheme",
      "fileUrl": "https://www.scribd.com/document/767698564/20222023-AL-ICT-Marking-Scheme-English-Medium",
      "status": "Completed"
    },
    {
      "title": "ICT Lesson 2 Notes",
      "moduleId": "ICT103",
      "description": "Software Types and Examples",
      "fileUrl": "https://schoolict.net/al-ict-operating-system/",
      "status": "Not Started"
    },
    {
      "title": "Chemistry Lab Safety Notes",
      "moduleId": "CHEM101",
      "description": "Basic Safety Rules for School Chemistry Labs",
      "fileUrl": "https://eng.pdn.ac.lk/civil/assets/pdf/laboratory_safety_guidelines.pdf",
      "status": "Completed"
    },
    {
      "title": "Commerce Lesson 1",
      "moduleId": "COM101",
      "description": "Introduction to Business Studies",
      "fileUrl": "https://nie.lk/pdffiles/tg/e12syl51.pdf",
      "status": "Not Started"
    },
    {
      "title": "ICT Assignment 2",
      "moduleId": "ICT104",
      "description": "Prepare a presentation on Operating Systems",
      "fileUrl": "https://www.scribd.com/document/741539623/GCE-Advanced-Level-ICT-OPERATING-SYSTEM",
      "status": "In Review"
    },
    {
      "title": "General Knowledge Quiz",
      "moduleId": "GEN302",
      "description": "Complete the online quiz on current affairs",
      "fileUrl": "https://quizizz.com/admin/quiz/649ece6eb3df10001d272929/nati0nal-level-online-quiz-current-affairs",
      "status": "In Progress"
    },
    {
      "title": "Political Science - Constitution Overview",
      "moduleId": "POL101",
      "description": "Key Features of the 1978 Constitution of Sri Lanka",
      "fileUrl": "https://www.parliament.lk/files/pdf/constitution.pdf",
      "status": "Completed"
    },
    {
      "title": "Business Studies - Organizational Structures",
      "moduleId": "BUS101",
      "description": "Understanding Business Organization Types",
      "fileUrl": "https://nie.lk/pdffiles/tg/e12syl51.pdf",
      "status": "Not Started"
    },
    {
      "title": "Applied Maths - Vectors Worksheet",
      "moduleId": "MATH201",
      "description": "Practice Problems on Vector Operations",
      "fileUrl": "https://nie.lk/pdffiles/other/eALOM%20Combine%20Maths%20Pactical%20Question.pdf",
      "status": "In Progress"
    }
  ];
  
const StudyMaterials = () => {
  const [studyMaterials, setStudyMaterials] = useState(initialMaterials);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");

  // Upload form states
  const [newTitle, setNewTitle] = useState("");
  const [newModuleId, setNewModuleId] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newFileUrl, setNewFileUrl] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [newStatus, setNewStatus] = useState("Not Started");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle file input change - convert file to local URL
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFile(file);
      setNewFileUrl(URL.createObjectURL(file));
    } else {
      setNewFile(null);
      setNewFileUrl("");
    }
  };

  // Handle form submission
  const handleUpload = () => {
    // Basic validation
    if (!newTitle.trim() || !newModuleId.trim() || !newDescription.trim()) {
      setErrorMessage("Please fill in all the fields (Title, Module ID, Description).");
      return;
    }

    if (!newFile && !newFileUrl.trim()) {
      setErrorMessage("Please choose a file or enter a file URL.");
      return;
    }

    // Clear error
    setErrorMessage("");

    // Prepare new material object
    const newMaterial = {
      title: newTitle.trim(),
      moduleId: newModuleId.trim(),
      description: newDescription.trim(),
      fileUrl: newFileUrl.trim(),
      status: newStatus,
    };

    // Add to materials list
    setStudyMaterials((prev) => [newMaterial, ...prev]);

    // Reset form
    setNewTitle("");
    setNewModuleId("");
    setNewDescription("");
    setNewFileUrl("");
    setNewFile(null);
    setNewStatus("Not Started");
  };

  const filteredMaterials = studyMaterials
    .filter((material) =>
      statusFilter === "All" ? true : material.status === statusFilter
    )
    .filter((material) =>
      material.title.toLowerCase().includes(search.toLowerCase()) ||
      material.moduleId.toLowerCase().includes(search.toLowerCase()) ||
      material.description.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "status") return a.status.localeCompare(b.status);
      return 0;
    });

  const renderFilePreview = (url) => {
    if (!url) return null;
    const extension = url.split(".").pop().toLowerCase();
    const previewStyle = "w-full h-32 object-cover rounded";

    if (["png", "jpg", "jpeg", "gif"].includes(extension)) {
      return <img src={url} alt="preview" className={previewStyle} />;
    } else if (["mp4", "mov", "avi"].includes(extension)) {
      return <video controls className={previewStyle} src={url} />;
    } else if (["pdf"].includes(extension)) {
      return (
        <div className="flex items-center justify-center h-32 bg-gray-100 rounded text-gray-700 text-sm">
          📄 PDF Document
        </div>
      );
    } else if (["doc", "docx"].includes(extension)) {
      return (
        <div className="flex items-center justify-center h-32 bg-gray-100 rounded text-gray-700 text-sm">
          📝 Word Document
        </div>
      );
    } else if (["ppt", "pptx"].includes(extension)) {
      return (
        <div className="flex items-center justify-center h-32 bg-gray-100 rounded text-gray-700 text-sm">
          📊 PowerPoint
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center h-32 bg-gray-200 rounded text-gray-700 text-sm">
          ❓ Unknown Format
        </div>
      );
    }
  };

  return (
    <div
      className="min-h-screen p-6 max-w-7xl mx-auto"
      style={{ backgroundColor: "#82CAFF" }}
    >
      {/* Upload Section */}
      <div className="bg-white shadow-md p-6 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-4 text-center">Upload Study Material</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Module ID"
            value={newModuleId}
            onChange={(e) => setNewModuleId(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 sm:col-span-2"
          />

          <input
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.gif,.mp4,.mov,.avi"
            onChange={handleFileChange}
            className="border border-gray-300 rounded px-3 py-2"
          />

          <input
            type="url"
            placeholder="Or paste file URL"
            value={newFileUrl}
            onChange={(e) => {
              setNewFileUrl(e.target.value);
              if (e.target.value) setNewFile(null); // Clear file input if URL is provided
            }}
            className="border border-gray-300 rounded px-3 py-2"
          />

          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        {errorMessage && (
          <p className="text-red-600 text-sm mb-3 text-center">{errorMessage}</p>
        )}
        <div className="text-center">
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Upload File
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {["All", "Not Started", "In Progress", "Completed"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1 rounded-full text-sm border ${
              statusFilter === status
                ? "bg-blue-600 text-white"
                : "bg-white text-black border-gray-300"
            }`}
          >
            {status}
          </button>
        ))}

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-full text-sm"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-full text-sm"
        >
          <option value="title">Sort by Title</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {/* Study Material Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMaterials.map((material, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-3 flex flex-col h-72"
          >
            <div className="mb-2">{renderFilePreview(material.fileUrl)}</div>
            <h3 className="font-semibold text-sm mb-1 truncate">{material.title}</h3>
            <p className="text-gray-500 text-xs mb-1 truncate">{material.moduleId}</p>
            <p className="text-gray-700 text-xs mb-2 truncate">{material.description}</p>
            <span
              className={`mt-auto inline-block px-2 py-0.5 text-xs rounded-full ${
                material.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : material.status === "In Progress"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {material.status}
            </span>

            {/* Download Button */}
            <a
              href={material.fileUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                />
              </svg>
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterials;
