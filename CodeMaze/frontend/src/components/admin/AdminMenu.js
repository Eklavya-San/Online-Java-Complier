import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg" className='sidebar'>
        <Navbar.Brand as={Link} to="/">
          Batches
        </Navbar.Brand>
                      
        <Navbar.Brand as={Link} to="/exam">
          Exam
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/batchdashboard">
              Dashboard
            </Nav.Link>
            
            <Nav.Link as={Link} to="/newexam">
              New Exam
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
                Admin Sign In
              </NavDropdown.Item>
            </NavDropdown>
            
            <NavDropdown title="Student Menu" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/studentsignup">
                Student Sign Up
              </NavDropdown.Item>
              
              <NavDropdown.Item as={Link} to="/studentlogin">
                Student Sign In
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
                Display All Questions
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AdminMenu;
