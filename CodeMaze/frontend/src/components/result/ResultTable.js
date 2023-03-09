import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResultTable = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.userrole !== 'ROLE_ADMIN') {
            toast.error('You do not have permission to access this page.');
            navigate('/studentdashboard');
        }
    }, [navigate]);
    const [results, setResults] = useState([]);
    const paramid = useParams();
    var as = JSON.stringify(paramid);
    const id = JSON.parse(as);
    var testId = id.id;
    var adminId = id.id1;
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:6969/exam/resultlisttest/${adminId}/${testId}`);
            const data = await response.json();
            setResults(data);
        };
        fetchData();
    }, [adminId, testId]);
    const download = async () => {

        window.location.replace(`http://localhost:6969/exam/resultexptest/${adminId}/${testId}/result_test.pdf`);
    }
    return (
        <div className='container'>
            <hr></hr>
            <center><h3>Result </h3></center>
            <hr></hr>
            <Button onClick={download}>Download pdf</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Test ID</th>
                        <th>Test Name</th>
                        <th>Student PRN</th>
                        <th>Student Roll No</th>
                        <th>Student Firstname</th>
                        <th>Student Lastname</th>
                        <th>Student Obtained Marks</th>
                        <th>Exam Total Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index}>
                            <td>{result.testId}</td>
                            <td>{result.testName}</td>
                            <td>{result.studentPrn}</td>
                            <td>{result.studentRollNo}</td>
                            <td>{result.studentFirstname}</td>
                            <td>{result.studentLastname}</td>
                            <td>{result.studentObtMarks}</td>
                            <td>{result.examTotalMarks}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ResultTable;
