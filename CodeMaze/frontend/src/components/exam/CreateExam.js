import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const CreateExam = () => {
  const [adminId, setAdminId] = useState(3); // default admin ID
  setAdminId(3);
  const [stdIds, setStdIds] = useState([]);
  const [testId, setTestId] = useState(0);
  const [questionIds, setquestionIds] = useState([]);
  const [batchId, setBatchId] = useState(0);
  const [students, setStudents] = useState([]);
  const [tests, setTests] = useState([]);
  const [batches, setBatches] = useState([]);
  const [questions, setQuestions] = useState([]);

  // Fetch all the tests and set them as options for test dropdown
  useEffect(() => {
    fetch('http://localhost:6969/test')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTests(data);
        setTestId(data[0].testId); // set the first test as default
      })
      .catch((error) => {
        console.error('Error fetching tests:', error);
      });
  }, []);

  // Fetch all the batches and set them as options for batch dropdown
  useEffect(() => {
    fetch('http://localhost:6969/batch')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBatches(data);
        setBatchId(data[0].batchId); // set the first batch as default
      })
      .catch((error) => {
        console.error('Error fetching batches:', error);
      });
  }, []);

  // Fetch questions when test ID changes
  useEffect(() => {
    fetch(`http://localhost:6969/question`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, [testId]);

  // Fetch students when batch ID changes
  useEffect(() => {
    fetch(`http://localhost:6969/student/findbybatch/${batchId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  }, [batchId]);

  const handleTestChange = (event) => {
    setTestId(event.target.value);
  };

  const handleBatchChange = (event) => {
    setBatchId(event.target.value);
  };

  const handleStudentChange = (event) => {
    const studentId = Number(event.target.value);
    if (event.target.checked) {
      setStdIds((prevStdIds) => [...prevStdIds, studentId]);
    } else {
      setStdIds((prevStdIds) =>
        prevStdIds.filter((id) => id !== studentId)
      );
    }
  };

  const handleQuestionChange = (event) => {
    const questionId = Number(event.target.value);
    if (event.target.checked) {
      setquestionIds((prevquestionIds) => [...prevquestionIds, questionId]);
    } else {
      setquestionIds((prevquestionIds) =>
        prevquestionIds.filter((id) => id !== questionId)
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = {
      adminId: adminId,
      stdId: stdIds,
      testId: testId,
      questionId: questionIds,
    };
    fetch('http://localhost:6969/exam/createexam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Exam created:', data);
        alert('Exam created successfully');
      })
      .catch((error,requestBody) => {
        alert('This is data:', requestBody);

        console.error('Error creating exam:', error);
        alert('Exam creation failed. Please try again.');
      });
  };

  return (
    <div>
  <div>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTestId">
        <Form.Label>Select Test:</Form.Label>
        <Form.Control as="select" onChange={handleTestChange}>
          {tests.map((test) => (
            <option key={test.testId} value={test.testId}>
              {test.testTitle}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formBatchId">
        <Form.Label>Select Batch:</Form.Label>
        <Form.Control as="select" onChange={handleBatchChange}>
          {batches.map((batch) => (
            <option key={batch.batchId} value={batch.batchId}>
              {batch.batchName}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formStudents">
        <Form.Label>Select Students:</Form.Label>
        {students.map((student) => (
          <Form.Check
            key={student.stdPrn}
            type="checkbox"
            label={student.stdFirstname}
            value={student.stdPrn}
            onChange={handleStudentChange}
          />
        ))}
      </Form.Group>
      <Form.Group controlId="formQuestions">
        <Form.Label>Select Questions:</Form.Label>
        {questions.map((question) => (
          <Form.Check
            key={question.questionId}
            type="checkbox"
            label={question.questionText}
            value={question.questionId}
            onChange={handleQuestionChange}
          />
        ))}
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Exam
      </Button>
    </Form>
  </div>

    </div>
  )
}
export default CreateExam