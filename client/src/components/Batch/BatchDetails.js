import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const BatchDetails = () => {
  const [batchDetails, setbatchDetails] = useState([]);
  const [filterType, setFilterType] = useState('prn');
  const [filterValue, setFilterValue] = useState('');

  const paramid = useParams();
  var as = JSON.stringify(paramid);
  const pid = JSON.parse(as);
  var id = pid.id;

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch(`http://localhost:6969/student/findbybatch/${id}`);
        const data = await response.json();
        setbatchDetails(data);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };
    fetchBatches();
  }, [id]);

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filteredDetails = batchDetails.filter((student) => {
    if (filterValue === '') {
      return true;
    }

    switch (filterType) {
      case 'prn':
        return student.stdPrn.toString().includes(filterValue);
      case 'rollno':
        return student.stdRollno.includes(filterValue);
      case 'firstname':
        return student.stdFirstname.toLowerCase().includes(filterValue.toLowerCase());
      case 'lastname':
        return student.stdLastname.toLowerCase().includes(filterValue.toLowerCase());
      case 'email':
        return student.stdEmail.toLowerCase().includes(filterValue.toLowerCase());
      default:
        return true;
    }
  });

  return (
    <div>
      <h1>All Students in Batch {id}</h1>
      <div>
        <label htmlFor="filter-type">Filter by:</label>
        <select id="filter-type" value={filterType} onChange={handleFilterTypeChange}>
          <option value="prn">PRN</option>
          <option value="rollno">Roll No</option>
          <option value="firstname">First Name</option>
          <option value="lastname">Last Name</option>
          <option value="email">Email</option>
        </select>
        <input type="text" value={filterValue} onChange={handleFilterValueChange} />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>PRN</th>
            <th>Roll No</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Batch Id</th>
          </tr>
        </thead>
        <tbody>
          {filteredDetails.map((student) => (
            <tr key={student.stdPrn}>
              <td data-toggle="tooltip" data-placement="top" title="click to check student details">
                <Link to={`/studentdetails/${student.stdPrn}`}>
                  {student.stdPrn}
                </Link>
              </td>

              <td>{student.stdRollno}</td>
              <td>{student.stdEmail}</td>
              <td>{student.stdFirstname}</td>
              <td>{student.stdLastname}</td>
              <td>{student.batchTbl.batchId}</td>
              <td>
                <Link to={`/updatestudent/${student.stdPrn}`}>
                  <Button className='btn btn-edit' >Edit</Button>
                </Link>
              </td>
              <td>
                <Link to={`/deletestudent/${student.stdPrn}`}>
                  <Button className="btn btn-danger"  >
                    Delete
                  </Button>
                </Link>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BatchDetails