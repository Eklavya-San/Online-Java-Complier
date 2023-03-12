import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';
import AddBatch from './AddBatch'
import BatchTable from './BatchTable'
import {  Link, Route, Routes, useNavigate } from 'react-router-dom'
import DashBoard from './DashBoard'
import UpdateBatch from './UpdateBatch';
import Remove from './Remove';
import BatchDetails from './BatchDetails';
import Signup from '../student/Signup';
import RemoveStudent from '../student/RemoveStudent';
import UpdateStudent from '../student/UpdateStudent';
import StudentLogin from '../student/StudentLogin';
import CreateTest from '../test/CreateTest';
import Testtable from '../test/Testtable';
import RemoveTest from '../test/RemoveTest';
import UpdateTest from '../test/UpdateTest';
import QuestionTable from '../question/QuestionTable';
import CreateQuestion from '../question/CreateQuestion';
import RemoveQuestion from '../question/RemoveQuestion'
import UpdateQuestion from '../question/UpdateQuestion'
import CreateTestCase from '../testcase/CreateTestCase';
import UpdateTestCase from '../testcase/UpdateTestCase';
import RemoveTestCase from '../testcase/RemoveTestCase';
import ExamScreen from '../student/ExamScreen';
import CreateAdmin from '../admin/CreateAdmin';
import SignInAdmin from '../admin/SigninAdmin';
import CreateExam from '../exam/CreateExam';
import NewExam from '../exam/NewExam';
import AdminDashBoard from '../admin/AdminDashBoard';
import StudentDashboard from '../student/StudentDashboard';
import AdminSignUp from '../admin/AdminSignUp';
import ResultTable from '../result/ResultTable';
import { Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

function Menu() {

    const user = JSON.parse(localStorage.getItem('user'));
    localStorage.getItem("token");
    const navigate = useNavigate();

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
                        <Nav className="me-auto">

                         
                            {/* Admin dropdown */}

                            <NavDropdown title="Admin Menu" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/adminsignup">
                                    Add
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/adminsignin">
                                    Admin sign in
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/adminsignup">
                                    Admin sign up
                                </NavDropdown.Item>
                            </NavDropdown>


                            {/* Batch dropdown */}

                            <NavDropdown title="Batch Menu" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/addbatch">
                                    New
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/allbatches">
                                    List All
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/batchdashboard">
                                    Dashboard
                                </NavDropdown.Item>
                            </NavDropdown>


                            {/* Test dropdown */}

                            <NavDropdown title="Test Menu" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/createtest">
                                    Create Test
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/newexam">
                                    Assign Exam
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/testtable">
                                    Display All Tests
                                </NavDropdown.Item>
                            </NavDropdown>

                            {/* Question dropdown */}

                            <NavDropdown title="Question Menu" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/createquestion">
                                    New Question
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/questiontable">
                                    List All
                                </NavDropdown.Item>
                            </NavDropdown>

                            {/* student dropdown */}

                            <NavDropdown title="Student Menu" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/studentsignup">
                                    student sign up
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/studentlogin">
                                    student sign in
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/exam/:id">
                                    Attempt Exam
                                </NavDropdown.Item>
                            </NavDropdown>



                            <Nav.Link as={Link} to="/about">
                                About
                            </Nav.Link>

                            <Button className='btn btn-danger' onClick={logout}>Logout</Button>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Navbar bg="light" expand="lg" >
                {user != null && (
                    <Nav.Link as={Link} to="/about">
                        <h5 style={{ color: 'black' }}>Welcome, {user.userFirstname}!</h5>
                    </Nav.Link>
                )}
            </Navbar>
          
            <Routes>

                {/* batch routes */}

                <Route path="/batchdashboard" exact element={<DashBoard />}></Route>
                <Route path="/addbatch" exact element={<AddBatch />}></Route>
                <Route path="/updatebatch/:id" exact element={<UpdateBatch />}></Route>
                <Route path="/deletebatch/:id" exact element={<Remove />}></Route>
                <Route path="/allbatches" element={<BatchTable />} />
                <Route path="/batchdetails/:id" exact element={<BatchDetails />} />

                {/* student routes */}

                <Route path="/studentsignup" exact element={<Signup />} />
                <Route path="/deletestudent/:id" exact element={<RemoveStudent />}></Route>
                <Route path="/updatestudent/:id" exact element={<UpdateStudent />}></Route>
                <Route path="/studentlogin" exact element={<StudentLogin />} />
                <Route path="/studentdashboard" exact element={<StudentDashboard />} />
                <Route path="/exam/:id" exact element={<ExamScreen />} />

                {/* test routes */}

                <Route path="/createtest" exact element={<CreateTest />} />
                <Route path="/testtable" exact element={<Testtable />} />
                <Route path="/deletetest/:id" exact element={<RemoveTest />} />
                <Route path="/updatetest/:id" exact element={<UpdateTest />} />

                {/* question routes */}

                <Route path="/createquestion" exact element={<CreateQuestion />} />
                <Route path="/questiontable" exact element={<QuestionTable />} />
                <Route path="/deletequestion/:id" exact element={<RemoveQuestion />} />
                <Route path="/updatequestion/:id" exact element={<UpdateQuestion />} />

                {/* test case routes  */}

                <Route path="/createtestcase" exact element={<CreateTestCase />} />
                <Route path="/updatetestcase/:id" exact element={<UpdateTestCase />} />
                <Route path="/deletetestcase/:id" exact element={<RemoveTestCase />} />

                {/* admin routes  */}

                <Route path="/adminsignup" exact element={<CreateAdmin />} />
                <Route path="/adminsignin" exact element={<SignInAdmin />} />
                <Route path="/createexam" exact element={<CreateExam />} />
                <Route path="/newexam" exact element={<NewExam />} />
                <Route path="/admindashboard" exact element={<AdminDashBoard />} />
                <Route path="/adminsignup" exact element={<AdminSignUp />} />

                {/* result routes  */}
                <Route path="/result/:id/:id1" exact element={<ResultTable />} />


            </Routes>
            </div>
           
     
    );
}

export default Menu;