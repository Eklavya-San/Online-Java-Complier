import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateTestCase = () => {
  const paramid = useParams();
  var as = JSON.stringify(paramid);
  const id = JSON.parse(as);
  var pid = id.id;
  const history = useNavigate(); // Use useNavigate hook to get the history object

  const [caseInput, setCaseInput] = useState('');
  const [caseMarks, setCaseMarks] = useState(0);
  const [caseOutput, setCaseOutput] = useState('');

  useEffect(() => {
    // Fetch test case data from server using `id`
    fetch(`http://localhost:6969/testcase/findbyid/`+pid)
      .then(response => response.json())
      .then(data => {
        setCaseInput(data.caseInput);
        setCaseMarks(data.caseMarks);
        setCaseOutput(data.caseOutput);
      })
      .catch(error => {
        console.error(`Error fetching test case data for id=${pid}:`, error);
      });
  }, [pid]);

  const handleCaseInputChange = event => {
    setCaseInput(event.target.value);
  };
  const handleCaseMarksChange = event => {
    setCaseMarks(event.target.value);
  };

  const handleCaseOutputChange = event => {
    setCaseOutput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const requestBody = {
      caseInput: caseInput,
      caseMarks: caseMarks,
      caseOutput: caseOutput,
    };
    fetch(`http://localhost:6969/testcase/update/` + pid, {
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
        console.log('Test case data updated:', data);
        toast.success('Test case data updated:', {
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
        console.error('Error updating test case data:', error);

        toast.error('Error updating test case. Please try again later', {
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
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <Card.Title>Update Test Case</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formCaseInput">
                  <Form.Label>Input</Form.Label>
                  <Form.Control
                    type="text"
                    value={caseInput}
                    onChange={handleCaseInputChange}
                    placeholder="Enter input"
                  />
                </Form.Group>
                <Form.Group controlId="formCaseMarks">
                  <Form.Label>Marks</Form.Label>
                  <Form.Control
                    type="number"
                    value={caseMarks}
                    onChange={handleCaseMarksChange}
                    placeholder="Enter marks"
                  />
                </Form.Group>
                <Form.Group controlId="formCaseOutput">
                  <Form.Label>Output</Form.Label>
                  <Form.Control
                    type="text"
                    value={caseOutput}
                    onChange={handleCaseOutputChange}
                    placeholder="Enter output"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
  
}
export default UpdateTestCase;
