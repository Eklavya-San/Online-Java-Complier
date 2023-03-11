import { Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './QuestionDetails.css'
function TestDetails({ prop }) {

 
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.userrole !== 'ROLE_ADMIN') {
            toast.error('You do not have permission to access this page.');
            navigate('/studentdashboard');
        }
    }, [navigate]);
    const [testCases, setTestCases] = useState([]);
    const id = parseInt(prop);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:6969/testcase/findbyquestion/${id}`);
                const data = await response.json();
                setTestCases(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [id]);

    return (
        <div id="mydiv">
            {testCases.map((testCase) => (
                <div key={testCase.caseId} className="card">
                    <div className="card-header">Test Case {testCase.caseId}
                        <Center>

                            <Link to={`/updatetestcase/${testCase.caseId}`}>
                                <Button className="btn btn-edit">Edit</Button>
                            </Link>
                            <Link to={`/deletetestcase/${testCase.caseId}`}>
                                <Button className="btn btn-danger">Delete</Button>
                            </Link>
                        </Center>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Input</h5>
                        <p className="card-text">{testCase.caseInput}</p>
                        <h5 className="card-title">Output</h5>
                        <p className="card-text">{testCase.caseOutput}</p>
                        <h5 className="card-title">Marks</h5>
                        <p className="card-text">{testCase.caseMarks}</p>



                    </div>
                </div>
            ))}
        </div>
    );
}

export default TestDetails;
