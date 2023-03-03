import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Signup = () => {
  const [formData, setFormData] = useState({
    stdPrn: '',
    stdRollno: '',
    stdFirstname: '',
    stdLastname: '',
    stdEmail: '',
    stdPassword: '',
    batchId: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate form data here
    if (!formData.stdPrn || !formData.stdRollno || !formData.stdFirstname || !formData.stdLastname || !formData.stdEmail || !formData.stdPassword || !formData.batchId) {
      toast.error('Please fill in all fields');
    } else {
      // post form data to server
      fetch('http://localhost:6969/student/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => {
          if (response.ok) {
            // display success message
            toast.success('Signup successful');
          } else {
            // display error message
            toast.error('Signup failed');
          }
        })
        .catch(error => {
          // display error message
          toast.error('Signup failed');
        });
    }
  };

  return (

    <fieldset>
        <div>
            <center><h3>Signup student Form</h3></center>
        </div>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="stdPrn">
        <Form.Label>PRN</Form.Label>
        <Form.Control type="text" name="stdPrn" value={formData.stdPrn} onChange={handleChange} required />
        <Form.Control.Feedback type="invalid">Please enter your PRN</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="stdRollno">
        <Form.Label>Roll No</Form.Label>
        <Form.Control type="text" name="stdRollno" value={formData.stdRollno} onChange={handleChange} required />
        <Form.Control.Feedback type="invalid">Please enter your Roll No</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="stdFirstname">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" name="stdFirstname" value={formData.stdFirstname} onChange={handleChange} required />
        <Form.Control.Feedback type="invalid">Please enter your first name</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="stdLastname">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" name="stdLastname" value={formData.stdLastname} onChange={handleChange} required />
        <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="stdEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="stdEmail" value={formData.stdEmail} onChange={handleChange} required />
        <Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
      </Form.Group>

        <Form.Group controlId="stdPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="stdPassword" value={formData.stdPassword} onChange={handleChange} required />
        <Form.Control.Feedback type="invalid">Please enter a password</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="batchId">
        <Form.Label>Batch ID</Form.Label>
        <Form.Control type="text" name="batchId" value={formData.batchId} onChange={handleChange} required />
        <Form.Control.Feedback type="invalid">Please enter a batch ID</Form.Control.Feedback>
      </Form.Group>

        <br></br>  
          <Button class="btn btn-primary" type="submit" onClick={handleSubmit}>Submit form</Button>
   

    </Form>
    </fieldset>
  )
}
export default Signup;