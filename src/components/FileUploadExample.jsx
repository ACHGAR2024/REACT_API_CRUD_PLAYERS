// src/components/FileUploadExample.jsx

import  { useState } from 'react';
import axios from 'axios';

const FileUploadExample = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://127.0.0.1:8000/api/players', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        setUploadSuccess(true);
        setSelectedFile(null); // Clear selected file after successful upload
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        setUploadError('Failed to upload file.');
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-200 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Upload File Example</h2>
      <input type="file" onChange={handleFileChange} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleUpload}
      >
        Upload File
      </button>
      {uploadSuccess && <p className="text-green-600 mt-2">File uploaded successfully!</p>}
      {uploadError && <p className="text-red-600 mt-2">{uploadError}</p>}
    </div>
  );
};

export default FileUploadExample;
