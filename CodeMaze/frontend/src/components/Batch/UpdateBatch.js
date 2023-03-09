import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateBatch = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userrole !== 'ROLE_ADMIN') {
      toast.error('You do not have permission to access this page.');
      navigate('/studentdashboard');
    }
  }, [navigate]);
  const  paramid = useParams();
  var as=JSON.stringify(paramid);
   const id = JSON.parse(as);
   var pid = id.id;
  // const [pid, setpid] = useState(id.id);
  const history = useNavigate(); // Use useNavigate hook to get the history object

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    // Fetch batch data from server using `id`
    fetch(`http://localhost:6969/batch/findbyid/`+pid)
      .then(response => response.json())
      .then(data => {
        setName(data.batchName);
        setDesc(data.batchDescription);
      })
      .catch(error => {
        console.error(`Error fetching batch data for id=${pid}:`, error);
      });
  }, [pid]);

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleDescChange = event => {
    setDesc(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const requestBody = {
      batchName: name,
      batchDescription: desc,
    };
    fetch(`http://localhost:6969/batch/update/`+pid, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Batch data updated:', data);
        toast.success('Batch data updated:', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        history('/allbatches'); // Use history function to navigate on successful update
      })
      .catch(error => {
        console.error('Error updating batch data:', error);
       
        toast.success('Error updating batch. Please try again later', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      });
  };

  return (
    <div>
      <h1>Update Batch</h1>
     
      <form class="was-validated">
        <div class="mb-3">
          <label for="validationTextarea" class="form-label">Batch Name:</label>
          <textarea class="form-control is-invalid" id="validationTextarea" placeholder="Required" required name="batchName" value={name} onChange={handleNameChange}></textarea>
          <div class="invalid-feedback">
            Please enter a batch name batch-id will auto generate!
          </div>
        </div>
        <div class="mb-3">
          <label for="validationTextarea" class="form-label">Batch Description:</label>
          <textarea class="form-control is-invalid" id="validationTextarea" placeholder="Required" required name="batchDesc" value={desc} onChange={handleDescChange}></textarea>
          <div class="invalid-feedback">
            Please enter a batch description in the textarea.
          </div>
        </div>
        <div class="mb-3">
          <button class="btn btn-primary" type="submit" onClick={handleSubmit}>Submit form</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBatch;
