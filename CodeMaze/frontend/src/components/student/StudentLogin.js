import { Center } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CreateAdmin from '../admin/CreateAdmin';
import ForgotPass from '../common/ForgotPass';
import './modal.css'
import Signup from './Signup'
const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = {
      username: email,
      password: password,
    };
    fetch('http://localhost:6969/signinuser', {
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
        console.log('Student logged in:', data);
        toast.success('Login successful', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });

        //save dto and token in local storage 

        localStorage.setItem('token', 'Bearer ' + data.token);
        localStorage.setItem('user', JSON.stringify(data.dto));
        var user = JSON.parse(localStorage.getItem('user'));
        if (user.userrole === 'ROLE_ADMIN') {
          history('/admindashboard')
        } else {
          history('/studentdashboard')
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        toast.error('Login failed. Please try again.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      });
  };
  
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [forgotPassOpen, setforgotPassOpen] = useState(false);

  const handleAdminModalOpen = () => {
    setAdminModalOpen(true);
  };

  const handleAdminModalClose = () => {
    setAdminModalOpen(false);
  };

  const handleStudentModalOpen = () => {
    setStudentModalOpen(true);
  };

  const handleStudentModalClose = () => {
    setStudentModalOpen(false);
  };

  const handleForgotPassModalClose = () => {
    setforgotPassOpen(false);
  };

  const handleForgotPassModalOpen = () => {
    setforgotPassOpen(true);
  };


  return (
    <div className="container">
      <Center><h3>Login into IACSD EXAM PORTAL</h3></Center>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <br></br>
          <hr></hr>

          <h6>Don't have account yet sign up here</h6>

          <div>
            <Button onClick={handleAdminModalOpen}>Admin Sign Up</Button>
            {adminModalOpen && (
              <>
                <div className="modal-overlay" onClick={handleAdminModalClose} />
                <div className="modal-container">
                  <CreateAdmin />
                </div>
              </>
            )}
          </div>
          <hr></hr>
          <div>
            <Button onClick={handleStudentModalOpen}>Student Sign Up</Button>
            {studentModalOpen && (
              <>
                <div className="modal-overlay" onClick={handleStudentModalClose} />
                <div className="modal-container">
                  <Signup />
                </div>
              </>
            )}
          </div>

          <hr></hr>
          <div>
            <Button onClick={handleForgotPassModalOpen}>Forgot Password</Button>
            {forgotPassOpen && (
              <>
                <div className="modal-overlay" onClick={handleForgotPassModalClose} />
                <div className="modal-container">
                  <ForgotPass />
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
