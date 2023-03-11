import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPass=()=> {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isGeneratingOtp, setIsGeneratingOtp] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleGenerateOtp = () => {
    setIsGeneratingOtp(true);
    fetch('http://localhost:6969/generateotp', {
      method: 'POST',
      body: email,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
      .then((response) => {
        setIsGeneratingOtp(false);
        if (!response.ok) {
          throw new Error('Failed to generate OTP.');
        }
      })
      .then((data) => {
        console.log('Generate OTP success:', data);
        toast.success('OTP generated successfully!');
      })
      .catch((error) => {
        console.error('Generate OTP error:', error);
        toast.error('Failed to generate OTP!');
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var requestBody= {
      email: email,
      otp: otp,
      newPassword: newPassword,
    }
    console.log(requestBody);
    axios.post('http://localhost:6969/submitotp', requestBody)
      .then((response) => {
        console.log('Submit OTP success:', response.data.message);
        toast.success('Password Updated!');
      })
      .catch((error) => {
        console.error('Submit OTP error:', error);
        toast.error('Failed to update password!');
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicOTP">
          <Form.Label>OTP</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Reset Password
        </Button>
      </Form>



      <div>
        <Button
          variant="secondary"
          onClick={handleGenerateOtp}
          disabled={isGeneratingOtp || !email}
        >
          {isGeneratingOtp ? 'Generating OTP...' : 'Generate OTP'}
        </Button>
      </div>
    </div>
  );
}

export default ForgotPass;
