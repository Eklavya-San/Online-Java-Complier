import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Sidebar = () => {
  return (
    <Navbar bg="light" expand="lg" className="flex-column">
      <LinkContainer to="/">
        <Navbar.Brand>Batches</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column">
          <Nav.Link>
            <LinkContainer to="/batchdashboard">
              <Nav.Item>Dashboard</Nav.Item>
            </LinkContainer>
          </Nav.Link>
          <NavDropdown title="Batch Menu" id="basic-nav-dropdown">
            <LinkContainer to="/addbatch">
              <NavDropdown.Item>Add</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/allbatches">
              <NavDropdown.Item>Display All</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          <NavDropdown title="Test Menu" id="basic-nav-dropdown">
            <LinkContainer to="/createtest">
              <NavDropdown.Item>Create Test</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/testtable">
              <NavDropdown.Item>Display All Tests</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          <NavDropdown title="Question Menu" id="basic-nav-dropdown">
            <LinkContainer to="/createquestion">
              <NavDropdown.Item>Add Question</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/questiontable">
              <NavDropdown.Item>Display All questions</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Sidebar;
