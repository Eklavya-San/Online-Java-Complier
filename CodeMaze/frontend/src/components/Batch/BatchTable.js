import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Batchtable.css';


const BatchTable = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userrole !== 'ROLE_ADMIN') {
      toast.error('You do not have permission to access this page.');
      navigate('/studentdashboard');
    }
  }, [navigate]);
  const [batches, setBatches] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('batchId');

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch('http://localhost:6969/batch');
        const data = await response.json();
        setBatches(data);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };
    fetchBatches();
  }, []);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  const filteredBatches = batches.filter((batch) => {
    if (searchBy === 'batchId') {
      return batch.batchId.toString().includes(searchText);
    } else if (searchBy === 'batchName') {
      return batch.batchName.toLowerCase().includes(searchText.toLowerCase());
    }
    return true;
  });


  return (
    <div>
      <h1>All Batches</h1>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <input
            type="text"
            placeholder={`Search by ${searchBy}`}
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <select value={searchBy} onChange={handleSearchByChange}>
            <option value="batchId">Batch ID</option>
            <option value="batchName">Batch Name</option>
          </select>
        </div>
        <Link to="/addbatch">
          <Button className="btn btn-primary">Add Batch</Button>
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Creation Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredBatches.map((batch) => (
            <tr key={batch.batchId}>
              <td data-toggle="tooltip" data-placement="top" title="click to check batch details">
                <Link to={`/batchdetails/${batch.batchId}`}>
                  {batch.batchId}
                </Link>
              </td>
              <td>{batch.batchName}</td>
              <td>{batch.batchDescription}</td>
              <td>{new Date(batch.batchCreated).toLocaleString()}</td>
              <td>
                <Link to={`/updatebatch/${batch.batchId}`}>
                  <Button className='btn btn-edit' >Edit</Button>
                </Link>
              </td>
              <td>
                <Link to={`/deletebatch/${batch.batchId}`}>
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
};

export default BatchTable;
