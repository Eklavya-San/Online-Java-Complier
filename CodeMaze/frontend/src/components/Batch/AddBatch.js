import React, { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const AddBatch = () => {

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const history = useNavigate();
  const date = new Date();
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userrole !== 'ROLE_ADMIN') {
      toast.error('You do not have permission to access this page.');
      navigate('/studentdashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      batchName: name,
      batchDescription: desc,
      batchCreated: date
    };

    try {
      if (name !== "" && desc !== "") {
        const response = await fetch('http://localhost:6969/batch/create', {
          method: 'post',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
        });

        const data = await response.json();
        console.log('Batch data sent:', data);
        setName('');
        setDesc('');
    
        toast.success('New batch created!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        history("/allbatches")
      } else {
        toast.warn('🦄 Enter all details!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    } catch (error) {
      setName('');
      setDesc('');
      console.error('Error sending form data:', error);
    
      toast.error('Error creating new batch. Please try again later.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

  return (
    <div>
    
      <h1>Add new Batch</h1>
      <form class="was-validated">
        <div class="mb-3">
          <label htmlFor="validationTextarea" class="form-label">Batch Name:</label>
          <textarea className="form-control is-invalid" id="validationTextarea" placeholder="Required" required name="batchName" value={name} onChange={handleNameChange}></textarea>
          <div class="invalid-feedback">
            Please enter a batch name batch-id will auto generate!
          </div>
        </div>
        <div class="mb-3">
          <label htmlfor="validationTextarea" class="form-label">Batch Description:</label>
          <textarea className="form-control is-invalid" id="validationTextarea" placeholder="Required" required name="batchDesc" value={desc} onChange={handleDescChange}></textarea>
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

export default AddBatch;
