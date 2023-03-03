import React, { useState } from 'react';


const TestInputForm=()=> {
  const [showForm, setShowForm] = useState(false);
  const [testName, setTestName] = useState('');
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [title, setTitle] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'testName':
        setTestName(value);
        break;
      case 'duration':
        setDuration(value);
        break;
      case 'startDate':
        setStartDate(value);
        break;
      case 'endDate':
        setEndDate(value);
        break;
      case 'title':
        setTitle(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if all input fields are filled
    if (!testName || !duration || !startDate || !endDate || !title) {
      alert('Please fill all fields.');
      return;
    }
    // Send form data to server
    const formData = {
      testName,
      duration: Number(duration),
      startDate,
      endDate,
      title,
    };
    fetch('https://example.com/new-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Form data sent:', data);
        // Hide the form after data is submitted
        setShowForm(false);
        // Reset form input fields
        setTestName('');
        setDuration('');
        setStartDate('');
        setEndDate('');
        setTitle('');
        alert('New test created!');
      })
      .catch((error) => {
        console.error('Error sending form data:', error);
        alert('Error creating new test. Please try again later.');
      });
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)}>Create New Test</button>
      {showForm && (
        <div className="popup">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="testName">Test Name:</label>
              <input type="text" id="testName" name="testName" value={testName} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="duration">Duration (in minutes):</label>
              <input type="number" id="duration" name="duration" value={duration} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="startDate">Start Date:</label>
              <input type="date" id="startDate" name="startDate" value={startDate} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="endDate">End Date:</label>
              <input type="date" id="endDate" name="endDate" value={endDate} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" name="title" value={title} onChange={handleInputChange} />
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
      )}


    </div>
  );
}

export default TestInputForm;
