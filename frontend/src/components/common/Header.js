import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import MenuDrawer from './MenuDrawer'; // Import the MenuDrawer component

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ boxShadow: '0 4px 4px 0 rgba(0,0,0,.2)' }}>
      <Container className="container-fluid header">
        <Navbar.Brand as={Link} to="/">Navbar scroll</Navbar.Brand>
        <MenuDrawer /> {/* Use the MenuDrawer component as the menu button */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Form className="d-flex me-2">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className="me-2">Search</Button>
          </Form>
          <Button variant="outline-primary" as={Link} to="/login" className="me-2">Login</Button>
          <Button variant="outline-primary" as={Link} to="/register">Register</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
