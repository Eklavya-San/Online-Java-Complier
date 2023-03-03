import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';
import AddBatch from './AddBatch'
import BatchTable from './BatchTable'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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

function Menu() {
    return (
        <div>
            <BrowserRouter>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">Batches</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/batchdashboard">Dashboard</Nav.Link>
                                <NavDropdown title="Batch Menu" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/addbatch">Add</NavDropdown.Item>
                                    <NavDropdown.Item href="/allbatches">Display All</NavDropdown.Item>

                                </NavDropdown>
                                <NavDropdown title="Test Menu" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/createtest">Create Test</NavDropdown.Item>
                                    <NavDropdown.Item href="/testtable">Display All Tests</NavDropdown.Item>

                                </NavDropdown>
                                <NavDropdown title="Question Menu" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/createquestion">Add Question</NavDropdown.Item>
                                    <NavDropdown.Item href="/questiontable">Display All questions</NavDropdown.Item>

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
                    {/* <Route path="/studentdetails/:id" exact element={<StudentDetails/>}/> */}
                    <Route path="/studentsignup" exact element={<Signup />} />
                    <Route path="/deletestudent/:id" exact element={<RemoveStudent />}></Route>
                    <Route path="/updatestudent/:id" exact element={<UpdateStudent />}></Route>
                    <Route path="/studentlogin" exact element={<StudentLogin />} />
                    {/* test routes */}
                    <Route path="/createtest" exact element={<CreateTest />} />
                    <Route path="/testtable" exact element={<Testtable />} />
                    <Route path="/deletetest/:id" exact element={<RemoveTest />} />
                    <Route path="/updatetest/:id" exact element={<UpdateTest />} />
                    {/* question routes */}
                    <Route path="/createquestion" exact element={<CreateQuestion />} />
                    <Route path="/questiontable" exact element={<QuestionTable />} />
                    <Route path="/deletequestion/:id" exact element={<RemoveTest />} />
                    <Route path="/updatequestion/:id" exact element={<UpdateTest />} />
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default Menu;