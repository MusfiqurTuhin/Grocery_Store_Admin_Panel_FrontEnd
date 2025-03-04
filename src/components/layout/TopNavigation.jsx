import { Nav, Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const TopNavigation = () => {
  return (
    <>
      <Navbar sticky="top" bg="light" variant="light" className="mb-4">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Grocery_Store_Admin_Panel
          </Navbar.Brand>
          <Nav className="flex-grow-1 justify-content-end">
            <Nav.Link as={NavLink} to="/create" className="fw-bold">
              Create User
            </Nav.Link>
            <Nav.Link as={NavLink} to="/create-product" className="fw-bold">
              Create Product
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default TopNavigation;
