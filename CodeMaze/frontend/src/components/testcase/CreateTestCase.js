
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateTestCase = (prop) => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userrole !== 'ROLE_ADMIN') {
      Toast.error('You do not have permission to access this page.');
      navigate('/studentdashboard');
    }
  }, [navigate]);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [marks, setMarks] = useState(0);
  const [questionId, setQuestionId]=useState(parseInt(prop.prop));


  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      caseInput: input,
      caseOutput: output,
      caseMarks: marks,
      questionId: questionId
    };
    

    try {
        console.log(parseInt(prop.prop));
      if (output !== '' && marks >= 0) {
        const response = await fetch('http://localhost:6969/testcase/create', {
          method: 'post',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log('Test case data sent:', data);
        setInput('');
        setOutput('');
        setMarks(0);
        setQuestionId(0);

        toast.success('New test case created!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      } else {
        toast.warn('Enter all details and ensure marks are positive!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
    } catch (error) {
      setInput('');
      setOutput('');
      setMarks(0);
      setQuestionId(0);

      console.error('Error sending form data:', error);

      toast.error('Error creating new test case. Please try again later.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleOutputChange = (event) => {
    setOutput(event.target.value);
  };

  const handleMarksChange = (event) => {
    setMarks(Number(event.target.value));
  };



  return (
    <Container>
      <h5 className="mb-5">Create a New Test Case</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Input</Form.Label>
          <Form.Control className='form
          ' type="textarea" placeholder="Enter input" value={input} onChange={handleInputChange} />
         
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Output</Form.Label>
          <Form.Control type="text" placeholder="Enter output" value={output} onChange={handleOutputChange} />
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Marks</Form.Label>
          <Form.Control type="number" placeholder="Enter marks" value={marks} onChange={handleMarksChange} />
        </Form.Group>
  
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  );
  
  }
  export default CreateTestCase;  