import { Center } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CreateTestCase from '../testcase/CreateTestCase';
import QuestionDetails from './QuestionDetails';

const UpdateQuestion = () => {
    const paramid = useParams();
    var as = JSON.stringify(paramid);
    const id = JSON.parse(as);
    var pid = id.id;
    const history = useNavigate(); // Use useNavigate hook to get the history object

    const [questionText, setQuestionText] = useState('');
    const [questionMarks, setQuestionMarks] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Fetch question data from server using `id`
        fetch(`http://localhost:6969/question/findbyid/` + pid)
            .then(response => response.json())
            .then(data => {
                setQuestionText(data.questionText);
                setQuestionMarks(data.questionMarks);
            })
            .catch(error => {
                console.error(`Error fetching question data for id=${pid}:`, error);
            });
    }, [pid, showModal]);

    const handleQuestionTextChange = event => {
        setQuestionText(event.target.value);
    };

    const handleQuestionMarksChange = event => {
        setQuestionMarks(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        const requestBody = {
            questionText: questionText,
            questionMarks: questionMarks
        };
        fetch(`http://localhost:6969/question/update/` + pid, {
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
                console.log('Question data updated:', data);
                toast.success('Question data updated:', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                history('/questiontable'); // Use history function to navigate on successful update
            })
            .catch(error => {
                console.error('Error updating question data:', error);

                toast.error('Error updating question. Please try again later', {
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
            <Center><h1>Update Question</h1></Center>
            <h4>Question id: {pid}</h4>
            <form onSubmit={handleSubmit}>
                {/*  */}
                <div className="mb-3">
                    <label htmlFor="questionText" className="form-label">
                        Question Text
                    </label>
                    <textarea
                        className="form-control"
                        id="questionText"
                        name="questionText"
                        rows="6"
                        value={questionText}
                        onChange={handleQuestionTextChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="questionMarks" className="form-label">
                        Question Marks
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="questionMarks"
                        name="questionMarks"
                        value={questionMarks}
                        onChange={handleQuestionMarksChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
            <hr></hr>
            <fieldset>
                <legend>Add Test Cases</legend>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>My Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateTestCase prop={pid} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setShowModal(false)}  >Close</Button>
                    </Modal.Footer>
                </Modal>
                <Button onClick={() => setShowModal(true)}>Add Test Case</Button>
            </fieldset>
            <hr></hr>
            <fieldset>
                <legend>Current test cases</legend>
                <QuestionDetails prop={pid} />
            </fieldset>


        </div>
    )
}
export default UpdateQuestion;
