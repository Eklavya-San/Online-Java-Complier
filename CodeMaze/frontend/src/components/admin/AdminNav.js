import React, { useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import AddBatch from '../Batch/AddBatch';
import BatchDetails from '../Batch/BatchDetails';
import BatchTable from '../Batch/BatchTable';
import DashBoard from '../Batch/DashBoard';
import Remove from '../Batch/Remove';
import UpdateBatch from '../Batch/UpdateBatch';
import CreateExam from '../exam/CreateExam';
import NewExam from '../exam/NewExam';
import CreateQuestion from '../question/CreateQuestion';
import QuestionTable from '../question/QuestionTable';
import UpdateQuestion from '../question/UpdateQuestion';
import ResultTable from '../result/ResultTable';
import CreateTest from '../test/CreateTest';
import RemoveTest from '../test/RemoveTest';
import Testtable from '../test/Testtable';
import UpdateTest from '../test/UpdateTest';
import CreateTestCase from '../testcase/CreateTestCase';
import RemoveTestCase from '../testcase/RemoveTestCase';
import UpdateTestCase from '../testcase/UpdateTestCase';
import AdminDashBoard from './AdminDashBoard';
import AdminSignUp from './AdminSignUp';
import CreateAdmin from './CreateAdmin';
import SignInAdmin from './SigninAdmin';
import RemoveQuestion from '../question/RemoveQuestion'
import StudentLogin from '../student/StudentLogin';
import StudentDashboard from '../student/StudentDashboard';
import Signup from '../student/Signup';
import ExamScreen from '../student/ExamScreen';
import RemoveStudent from "../student/RemoveStudent"
import UpdateStudent from '../student/UpdateStudent'
const AdminNav = () => {
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
                        <Nav className="me-auto">
                           
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
                 {/* student routes */}

                 <Route path="/studentsignup" exact element={<Signup />} />
                <Route path="/deletestudent/:id" exact element={<RemoveStudent />}></Route>
                <Route path="/updatestudent/:id" exact element={<UpdateStudent />}></Route>
                <Route path="/studentlogin" exact element={<StudentLogin />} />
                <Route path="/studentdashboard" exact element={<StudentDashboard />} />
                <Route path="/exam/:id" exact element={<ExamScreen />} />

                {/* batch routes */}

                <Route path="/batchdashboard" exact element={<DashBoard />}></Route>
                <Route path="/addbatch" exact element={<AddBatch />}></Route>
                <Route path="/updatebatch/:id" exact element={<UpdateBatch />}></Route>
                <Route path="/deletebatch/:id" exact element={<Remove />}></Route>
                <Route path="/allbatches" element={<BatchTable />} />
                <Route path="/batchdetails/:id" exact element={<BatchDetails />} />

                 {/* test routes */}

                 <Route path="/createtest" exact element={<CreateTest />} />
                <Route path="/testtable" exact element={<Testtable />} />
                <Route path="/deletetest/:id" exact element={<RemoveTest />} />
                <Route path="/updatetest/:id" exact element={<UpdateTest />} />

                {/* question routes */}

                <Route path="/createquestion" exact element={<CreateQuestion />} />
                <Route path="/questiontable" exact element={<QuestionTable />} />
                <Route path="/deletequestion/:id" exact element={<RemoveQuestion/>} />
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

                <Route path="/studentdashboard" exact element={<StudentDashboard  />} />
                <Route path="/studentlogin" exact element={<StudentLogin />} />
                </Routes>
        </div>
    )
}

export default AdminNav