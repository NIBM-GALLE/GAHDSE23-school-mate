import { useState } from 'react'; 

export default function StudyMaterial() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [materials, setMaterials] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !file) {
      alert('Please fill in all fields');
      return;
    }

    const newMaterial = {
      title,
      fileUrl: URL.createObjectURL(file), // Temporary file URL for previewing
    };

    setMaterials((prevMaterials) => [...prevMaterials, newMaterial]);
    setTitle('');
    setFile(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f3f3f3] py-8">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-[#374258] mb-6">Upload Study Material</h2>
        <form onSubmit={handleSubmit}>
          {/* Material Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm text-[#374258] font-medium mb-2">
              Material Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-[#c4c4c4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f74464]"
              placeholder="Enter material title"
              required
            />
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm text-[#374258] font-medium mb-2">
              Upload File
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="w-full text-sm text-[#374258] border border-[#c4c4c4] rounded-md"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#f74464] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300 font-medium"
          >
            Upload
          </button>
        </form>
      </div>

      <div className="max-w-lg w-full mt-8">
        <h3 className="text-lg font-semibold text-[#374258] mb-4">Uploaded Study Materials</h3>
        {materials.length === 0 ? (
          <p className="text-sm text-[#6a7285]">No materials uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {materials.map((material, index) => (
              <li key={index} className="p-4 bg-white shadow-md rounded-md">
                <h4 className="text-[#374258] font-medium text-lg">{material.title}</h4>
                <a
                  href={material.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#f74464] hover:underline"
                >
                  View Material
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
