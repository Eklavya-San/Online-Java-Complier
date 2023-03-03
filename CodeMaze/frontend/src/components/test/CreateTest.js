import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CreateTest = () => {
    const [testDetails, setTestDetails] = useState({
        testTitle: '',
        testDescription: '',
        testDuration: '',
        testMaxMarks: '',
        testEndDate: '',
        testStartDate: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTestDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:6969/test/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testDetails),
            });
            if (response.ok) {
                toast.success('Test created successfully');
                setTestDetails({
                    testTitle: '',
                    testDescription: '',
                    testDuration: '',
                    testMaxMarks: '',
                    testEndDate: '',
                    testStartDate: '',
                });
            } else {
                toast.error('Error creating test');
            }
        } catch (error) {
            console.error('Error creating test:', error);
        }
    };

    return (
        <div>
          <h1>Create New Test</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTestTitle">
              <Form.Label>Test Title</Form.Label>
              <Form.Control type="text" placeholder="Enter test title" value={testDetails.testTitle} onChange={handleInputChange} name="testTitle" />
            </Form.Group>
            <Form.Group controlId="formTestDescription">
              <Form.Label>Test Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter test description" value={testDetails.testDescription} onChange={handleInputChange} name="testDescription" />
            </Form.Group>
            <Form.Group controlId="formTestDuration">
              <Form.Label>Test Duration (in minutes)</Form.Label>
              <Form.Control type="number" placeholder="Enter test duration" value={testDetails.testDuration} onChange={handleInputChange} name="testDuration" />
            </Form.Group>
            <Form.Group controlId="formTestMaxMarks">
              <Form.Label>Test Maximum Marks</Form.Label>
              <Form.Control type="number" placeholder="Enter test maximum marks" value={testDetails.testMaxMarks} onChange={handleInputChange} name="testMaxMarks" />
            </Form.Group>
            <Form.Group controlId="formTestStartDate">
              <Form.Label>Test Start Date</Form.Label>
              <Form.Control type="date" placeholder="Enter test start date" value={testDetails.testStartDate} onChange={handleInputChange} name="testStartDate" />
            </Form.Group>
            <Form.Group controlId="formTestEndDate">
              <Form.Label>Test End Date</Form.Label>
              <Form.Control type="date" placeholder="Enter test end date" value={testDetails.testEndDate} onChange={handleInputChange} name="testEndDate" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      );
      
}
export default CreateTest;
