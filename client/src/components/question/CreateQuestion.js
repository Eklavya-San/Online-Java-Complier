import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import CreateTestCase from '../testcase/CreateTestCase';


const CreateQuestion = () => {
  const [showModal, setShowModal] = useState(false);

  const [question, setQuestion] = useState({
    questionId: 0,
    questionMarks: 0,
    questionText: ''
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(question)
    };

    fetch('http://localhost:6969/question/create', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Question created:', data);
        toast.success('Question created successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setQuestion({
          questionId: 0,
          questionMarks: 0,
          questionText: ''
        });
      })
      .catch(error => {
        console.error('Error creating question:', error);

        toast.error('Error creating question. Please try again later', {
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
    <div className="container">
      <h1>Create Question</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="questionText" className="form-label">
            Question Text
          </label>
          <textarea
            className="form-control"
            id="questionText"
            name="questionText"
            rows="5"
            value={question.questionText}
            onChange={handleInputChange}
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
            value={question.questionMarks}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
      <br></br>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>My Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateTestCase />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
      <Button onClick={() => setShowModal(true)}>Add Test Case</Button>

    </div>
  );
};

export default CreateQuestion;
