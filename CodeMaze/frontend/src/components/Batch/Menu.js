import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';
import AddBatch from './AddBatch'
import BatchTable from './BatchTable'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
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

function Menu() {
    return (
        <div>
            <BrowserRouter>

                <Navbar bg="light" expand="lg" className='sidebar'>
                    <Container>
                        <Navbar.Brand as={Link} to="/">
                            Batches
                        </Navbar.Brand>
                      
                        <Navbar.Brand as={Link} to="/exam">
                            exam
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/batchdashboard">
                                    Dashboard
                                </Nav.Link>
                                <Nav.Link as={Link} to="/newexam">
                                    new Exam
                                </Nav.Link>
                                <NavDropdown title="Batch Menu" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/addbatch">
                                        Add
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/allbatches">
                                        Display All
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Admin Menu" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/adminsignup">
                                        Add
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/adminsignin">
                                        Admin sign in 
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Student Menu" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/studentsignup">
                                        student sign up
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/studentlogin">
                                        student sign in 
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Test Menu" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/createtest">
                                        Create Test
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/testtable">
                                        Display All Tests
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Question Menu" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/createquestion">
                                        Add Question
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/questiontable">
                                        Display All questions
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
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
                    
                    <Route path="/exam" exact element={<ExamScreen />} />
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
                    <Route path="/adminsignup" exact element={<CreateAdmin/>}/>
                    <Route path="/adminsignin" exact element={<SignInAdmin/>}/>
                    <Route path="/createexam" exact element={<CreateExam/>}/>
                    <Route path="/newexam" exact element={<NewExam/>}/>







                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default Menu;