import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Testtable = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userrole !== 'ROLE_ADMIN') {
      toast.error('You do not have permission to access this page.');
      navigate('/studentdashboard');
    }
  }, [navigate]);
  const [tests, setTests] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('testId');
  const user = JSON.parse(localStorage.getItem('user'));
  const adminId = user.userId;

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('http://localhost:6969/test');
        const data = await response.json();
        setTests(data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };
    fetchTests();
  }, []);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  const filteredTests = tests.filter((test) => {
    if (searchBy === 'testId') {
      return test.testId.toString().includes(searchText);
    } else if (searchBy === 'testName') {
      return test.testTitle.toLowerCase().includes(searchText.toLowerCase());
    }
    return true;
  });

  const isTestPastEndDate = (testEndDate) => {
    const today = new Date();
    const endDate = new Date(testEndDate);
    return today > endDate;
  };

  return (
    <div>
      <h1>All Tests</h1>
      <div className="search-bar">
        <div className="form-group">
          <label htmlFor="searchBy">Search By:</label>
          <select
            id="searchBy"
            className="form-control"
            value={searchBy}
            onChange={handleSearchByChange}
          >
            <option value="testId">Test ID</option>
            <option value="testName">Test Name</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="searchText">Search Text:</label>
          <input
            type="text"
            id="searchText"
            className="form-control"
            value={searchText}
            onChange={handleSearchTextChange}
          />
        </div>
      </div>
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
          {filteredTests.map((test) => (
            <tr key={test.testId}>
              <td data-toggle="tooltip" data-placement="top" title="click to check test result">
                {isTestPastEndDate(test.testEndDate) ? (
                  <Link to={`/result/${adminId}/${test.testId}`}>{test.testId}</Link>
                ) : (
                  <span>{test.testId}</span>
                )}
              </td>
              <td>{test.testTitle}</td>
              <td>{test.testDuration}</td>
              <td>{test.testMaxQuestions}</td>
              <td>{test.testMaxMarks}</td>
              <td>{new Date(test.testStartDate).toLocaleString()}</td>
              <td>{new Date(test.testEndDate).toLocaleString()}</td>
              <td>
                <Link to={`/updatetest/${test.testId}`}>
                  <Button className='btn btn-edit' >Edit</Button>
                </Link>
              </td>
              <td>
                <Link to={`/deletetest/${test.testId}`}>
                  <Button className="btn btn-danger" >
                    Delete
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default Testtable;
