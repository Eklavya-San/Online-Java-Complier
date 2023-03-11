import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FileUploadComponent() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('http://localhost:6969/students/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('File upload failed.');
          }
          return response.text();
        })
        .then((result) => {
          console.log('File upload success:', result);
          toast.success('File upload success!');
        })
        .catch((error) => {
          console.error('File upload error:', error);
          toast.error('File upload error!');
        });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <Button onClick={handleFileUpload}data-toggle="tooltip" data-placement="top" title="Create Batch before adding students" >Upload File</Button>
    </div>
  );
}
export default FileUploadComponent
