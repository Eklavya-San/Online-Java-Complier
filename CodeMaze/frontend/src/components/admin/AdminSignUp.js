import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminSignUp = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userrole !== 'ROLE_ADMIN') {
      toast.error('You do not have permission to access this page.');
      navigate('/studentdashboard');
    }
  }, [navigate]);
  const [formData, setFormData] = useState({
    adminEmail: '',
    adminFirstname: '',
    adminLastname: '',
    adminPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate form data here
    if (!formData.adminEmail || !formData.adminFirstname || !formData.adminLastname || !formData.adminPassword) {
      toast.error('Please fill in all fields');
    } else {
      // post form data to server
      fetch('http://localhost:6969/signupadmin', {
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
        <center><h3>Admin sign up </h3></center>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="adminEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="adminEmail" value={formData.adminEmail} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="adminFirstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="adminFirstname" value={formData.adminFirstname} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Please enter your first name</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="adminLastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="adminLastname" value={formData.adminLastname} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="adminPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="adminPassword" value={formData.adminPassword} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Please enter a password</Form.Control.Feedback>
        </Form.Group>

        <br></br>
        <Button className="btn btn-primary" type="submit" onClick={handleSubmit}>Submit form</Button>
      </Form>
    </fieldset>
  )
}

export default AdminSignUp;
