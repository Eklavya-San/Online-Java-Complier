import React, { useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import ExamScreen from './ExamScreen';
import Signup from './Signup';
import StudentDashboard from './StudentDashboard';
import StudentLogin from './StudentLogin';

const StudentNav = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    localStorage.getItem("token");
    const navigate = useNavigate();

    const [flag, setflag] = useState("true")

    useEffect(() => {
        if (flag === "false") {
            setflag("true")
            window.location.reload();
            
        }
    }, [flag]);



    

    const logout = () => {
        confirmAlert({
            title: 'Confirm logout',
            message: 'Are you sure you want to log out?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        setflag("false");
                        navigate('/studentlogin');
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    return (
        <div>

            <Navbar bg="light" expand="lg" className='sidebar'>
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        IACSD EXAM PORTAL
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        {user != null && (
                            <Nav.Link as={Link} to="/about">
                                <h5 style={{ color: 'black' }}>Welcome, {user.userFirstname}!</h5>
                            </Nav.Link>
                        )}
                    </Navbar.Collapse>
                    <Button className='btn btn-danger' onClick={logout}>Logout</Button>
                </Container>
            </Navbar>
            <Routes >
            <Route path="/studentdashboard" exact element={<StudentDashboard  />} />
            <Route path="/exam/:id" exact element={<ExamScreen />} />
            <Route path="/studentlogin" exact element={<StudentLogin/>}/>
            <Route path='/studentsignup' exact element={<Signup/>}/>
            </Routes>
        </div >
    )
}

export default StudentNav