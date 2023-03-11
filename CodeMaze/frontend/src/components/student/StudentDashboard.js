import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

const StudentDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  var adminId = 1;
  const navigate = useNavigate();
  //test table
  const [tests, setTests] = useState([]);
  const [attemptedTests, setAttemptedTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        console.log(user)
        const response = await fetch(`http://localhost:6969/exam/examtestlist/${adminId}/${user.userId}`);
        const data = await response.json();
        const currentTime = new Date();
        const filteredTests = data.filter(test => new Date(test.testEndDate) < currentTime);
        const attemptedTests = data.filter(test => new Date(test.testEndDate) >= currentTime);
        setTests(attemptedTests);
        setAttemptedTests(filteredTests);
        console.log('hello');
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };
    fetchTests();
  },[]);

  const startExam = (id) => {
    
    confirmAlert({
      title: 'Exam Start',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Start Exam',
          onClick: () => {
            navigate(`/exam/${id}`)
          }
        },
        {
          label: 'Decline'
        }
      ]
    });
  }

  return (
    <div>
      <hr></hr>

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
              <p><strong>Roll No:</strong> {user.rollNo}</p>
              <p><strong>Batch ID:</strong> {user.batchId}</p>
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
                <Button
                  className='btn btn-edit'
                  onClick={() => startExam(test.testId)}
                  disabled={attemptedTests.find((attemptedTest) => attemptedTest.testId === test.testId)}
                >
                  {attemptedTests.find((attemptedTest) => attemptedTest.testId === test.testId)
                    ? 'Attempted'
                    : 'Start Test'
                  }
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {attemptedTests.length > 0 && (
        <>
          <hr></hr>
          <center><h3>Attempted or Past Tests</h3></center>
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
               
              </tr>
            </thead>
            <tbody>
              {attemptedTests.map((test) => (
                <tr key={test.testId}>
                  <td>{test.testId}</td>
                  <td>{test.testTitle}</td>
                  <td>{test.testDuration}</td>
                  <td>{test.totalQuestions}</td>
                  <td>{test.testMaxMarks}</td>
                  <td>{new Date(test.testStartDate).toLocaleString()}</td>
                  <td>{new Date(test.testEndDate).toLocaleString()}</td>
                 
                </tr>
              ))}
            </tbody>
          </Table>
          </>)}
          </div>
  )}
  export default StudentDashboard;
