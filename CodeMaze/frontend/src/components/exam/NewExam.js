
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const NewExam = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.userrole !== 'ROLE_ADMIN') {
            toast.error('You do not have permission to access this page.');
            navigate('/studentdashboard');
        }
    }, [navigate]);
    //sending data
    const [adminId, setadminId] = useState(0);
    const [stdId, setstdId] = useState([]);
    const [testId, settestId] = useState();
    const [queId, setqueId] = useState([]);

    //data to create dropdown and checkboxes
    const [tests, settests] = useState([]);
    const [batches, setbatches] = useState([]);
    const [batchId, setbatchId] = useState();
    const [students, setstudents] = useState([]);
    const [questions, setquestions] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    //fetch all tests
    useEffect(() => {
        fetch('http://localhost:6969/test')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error ! status : ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                settests(data);
                settestId(data[0].testId);// set the first test as default
                setadminId(user.userId);

            })
            .catch((errpr) => {
                console.log(`error fetching test:${errpr}`);
            });

    });

    //fetch all batches to find students by batch id

    useEffect(() => {
        fetch(`http://localhost:6969/batch`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error ! status : ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setbatches(data);
                setbatchId(data[0].batchId); //set first batch as default
            })
            .catch((error) => {
                console.error('Error fetching batches:', error);

            })
    }, []);

    //fetch students from selected batch 

    useEffect(() => {
        fetch(`http://localhost:6969/student/findbybatch/${batchId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setstudents(data);
            })
            .catch((error) => {
                console.error('Error fetching students:', error);
            });

    }, [batchId]);

    //fetch all questions
    useEffect(() => {
        fetch(`http://localhost:6969/question`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setquestions(data);
            })
            .catch((error) => {
                console.error('Error fetching questions:', error);
            });
    }, []);

    const handleTestChange = (event) => {
        settestId(event.target.value);
    };

    const handleBatchChange = (event) => {
        setbatchId(event.target.value);
    };

    const handleStudentChange = (event) => {
        const studentId = parseInt(event.target.value);
        if (event.target.checked) {
            setstdId((prevStdIds) => [...prevStdIds, studentId]);
        } else {
            setstdId((prevStdIds) =>
                prevStdIds.filter((id) => id !== studentId)
            );
        }
    };
    const handleQuestionChange = (event) => {
        const questionId = parseInt(event.target.value);
        if (event.target.checked) {
            setqueId((prevquestionIds) => [...prevquestionIds, questionId]);
        } else {
            setqueId((prevquestionIds) =>
                prevquestionIds.filter((id) => id !== questionId)
            );
        }
    };
    const handleCheckAllStudents = (event) => {
        const checked = event.target.checked;
        setstdId(checked ? students.map((s) => s.id) : []);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const requestBody = {
            adminId: adminId,
            stdId: stdId,
            testId: testId,
            queId: queId,
        };
        console.log(requestBody);
        axios.post('http://localhost:6969/exam/createexam', requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log('Exam created:', response.data);
                alert('Exam created successfully');
            })
            .catch((error) => {
                console.error('Error creating exam:', error);
                alert('Exam creation failed. Please try again.');
            });

    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTestId">
                    <Form.Label><h5>Select Test:</h5></Form.Label>
                    <Form.Control as="select" onChange={handleTestChange}>
                        {tests.map((test) => (
                            <option key={test.testId} value={test.testId}>
                                {test.testTitle}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <hr></hr>
                <Form.Group controlId="formBatchId">
                    <Form.Label><h5>Select Batch:</h5></Form.Label>
                    <Form.Control as="select" onChange={handleBatchChange}>
                        {batches.map((batch) => (
                            <option key={batch.batchId} value={batch.batchId}>
                                {batch.batchName}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <hr></hr>

                <Form.Group controlId="formStudents">
                    <Form.Label><h5>Select students:</h5></Form.Label>

                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th><Form.Check
                                    type="checkbox"
                                    label="Check All"
                                    onChange={handleCheckAllStudents}
                                /></th>
                                <th>PRN</th>
                                <th>Roll No</th>
                                <th>Full name</th>
                            </tr>
                        </thead>

                        {students.map((student) => (
                            <tr>
                                <td>
                                    <Form.Check
                                        key={student.stdPrn}
                                        type="checkbox"
                                        value={student.stdPrn}
                                        onChange={handleStudentChange} />
                                </td>
                                <td>{student.stdPrn}</td>
                                <td>{student.stdRollno}</td>
                                <td>{student.stdFirstname + " " + student.stdLastname}</td>
                            </tr>
                        ))}
                    </Table>
                </Form.Group>
                <hr></hr>

                <Form.Group controlId="formQuestions">
                    <Form.Label><h5>Select Questions:</h5></Form.Label>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>CheckBox</th>
                                <th>Question ID</th>
                                <th>Question Text</th>
                                <th>Question Marks</th>
                            </tr>
                        </thead>

                        {questions.map((question) => (
                            <tr>
                                <td>
                                    <Form.Check
                                        key={question.questionId}
                                        type="checkbox"
                                        value={question.questionId}
                                        onChange={handleQuestionChange}
                                    />
                                </td>
                                <td>{question.questionId}</td>
                                <td>{question.questionText}</td>
                                <td>{question.questionMarks}</td>

                            </tr>

                        ))}
                    </Table>
                </Form.Group>

                <hr></hr>

                <Button variant="primary" type="submit">
                    Create Exam
                </Button>
            </Form>

        </div>
    )
}

export default NewExam