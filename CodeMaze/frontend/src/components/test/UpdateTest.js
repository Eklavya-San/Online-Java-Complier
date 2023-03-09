import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateTest = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userrole !== 'ROLE_ADMIN') {
      toast.error('You do not have permission to access this page.');
      navigate('/studentdashboard');
    }
  }, [navigate]);
  const paramid = useParams();
  var as = JSON.stringify(paramid);
  const id = JSON.parse(as);
  var pid = id.id;
  const history = useNavigate(); // Use useNavigate hook to get the history object

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [maxMarks, setMaxMarks] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Fetch test data from server using `id`
    fetch(`http://localhost:6969/test/findbyid/` + pid)
      .then(response => response.json())
      .then(data => {
        setTitle(data.testTitle);
        setDescription(data.testDescription);
        setDuration(data.testDuration);
        setMaxMarks(data.testMaxMarks);
        setStartDate(data.testStartDate);
        setEndDate(data.testEndDate);
      })
      .catch(error => {
        console.error(`Error fetching test data for id=${pid}:`, error);
      });
  }, [pid]);

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };
  const handleDurationChange = event => {
    setDuration(event.target.value);
  };
  const handleMaxMarksChange = event => {
    setMaxMarks(event.target.value);
  };
  const handleStartDateChange = event => {
    setStartDate(event.target.value);
  };
  const handleEndDateChange = event => {
    setEndDate(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const requestBody = {
      testTitle: title,
      testDescription: description,
      testDuration: duration,
      testMaxMarks: maxMarks,
      testStartDate: startDate,
      testEndDate: endDate,
    };
    fetch(`http://localhost:6969/test/update/` + pid, {
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
        console.log('Test data updated:', data);
        toast.success('Test data updated:', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        history('/testtable'); // Use history function to navigate on successful update
      })
      .catch(error => {
        console.error('Error updating test data:', error);

        toast.error('Error updating test. Please try again later', {
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
    <div className='container'>
      <h1>Update Test</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">
              Duration in Minutes
            </label>
            <input
              type="text"
              className="form-control"
              id="duration"
              name="duration"
              value={duration}
              onChange={handleDurationChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="maxMarks" className="form-label">
              Maximum marks 
            </label>
            <input
              type="text"
              className="form-control"
              id="maxMarks"
              name="maxMarks"
              value={maxMarks}
              onChange={handleMaxMarksChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">
              Start Date
            </label>
            <input
              type="text"
              className="form-control"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">
              End Date
            </label>
            <input
              type="text"
              className="form-control"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
      </form>
    </div>

  )
}
export default UpdateTest;
