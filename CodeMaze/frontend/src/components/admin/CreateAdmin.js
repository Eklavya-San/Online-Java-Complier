import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CreateAdmin = () => {
  const [adminData, setAdminData] = useState({
    adminEmail: '',
    adminFirstname: '',
    adminLastname: '',
    adminPassword: ''
  });

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate form data here
    if (!adminData.adminEmail || !adminData.adminFirstname || !adminData.adminLastname || !adminData.adminPassword) {
      toast.error('Please fill in all fields');
    } else {
      // post form data to server
      fetch('http://localhost:6969/signupadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminData)
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
        <center><h3>SIGN UP</h3></center>
        <center><h6>as admin</h6></center>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="adminEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="adminEmail" value={adminData.adminEmail} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="adminFirstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="adminFirstname" value={adminData.adminFirstname} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Please enter your first name</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="adminLastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="adminLastname" value={adminData.adminLastname} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="adminPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="adminPassword" value={adminData.adminPassword} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Please enter a password</Form.Control.Feedback>
        </Form.Group>

        <br></br>
        <Button className="btn btn-primary" type="submit" onClick={handleSubmit}>Create Admin</Button>
      </Form>
    </fieldset>
  );
};

export default CreateAdmin;
