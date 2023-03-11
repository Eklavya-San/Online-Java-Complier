import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  var adminId = 1;
  const navigate = useNavigate();
  //test table
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch(`http://localhost:6969/exam/examtestlist/${adminId}/${user.userId}`);
        const data = await response.json();
        setTests(data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };
    fetchTests();
  });


  const startExam = (id) => {
    navigate(`/exam/${id}`)
  }

  return (
    <div><hr></hr>

      <h4 className="card-title">Student Dashboard</h4>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Welcome {user.userFirstname}!</h4>

        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p><strong>First Name:</strong> {user.userFirstname}</p>
              <p><strong>Last Name:</strong> {user.userLastname}</p>
              <p><strong>Email:</strong> {user.userEmail}</p>
              <p><strong>Username:</strong> {user.username}</p>
            </div>
            <div className="col-md-6">
              <p><strong>User ID:</strong> {user.userId}</p>
              <p><strong>Roll No:</strong> {user.userRollno}</p>
              <p><strong>Batch ID:</strong> {user.userBatchId}</p>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <center><h3>Available Exams</h3></center>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Test Name</th>
            <th>Duration (in minutes)</th>
            <th>Total Questions</th>
            <th>Max Marks</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr key={test.testId}>
              <td>{test.testId}</td>
              <td>{test.testTitle}</td>
              <td>{test.testDuration}</td>
              <td>{test.totalQuestions}</td>
              <td>{test.testMaxMarks}</td>
              <td>{new Date(test.testStartDate).toLocaleString()}</td>
              <td>{new Date(test.testEndDate).toLocaleString()}</td>
              <td>
                <Button className='btn btn-edit' onClick={() => startExam(test.testId)}>Start Test</Button>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentDashboard;
