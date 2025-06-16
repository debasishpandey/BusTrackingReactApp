import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbarc = () => {
  return (
 <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/admin-dashboard">🚌 BusTrack Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="me-auto d-flex gap-3">
            <Link className="nav-link" to="/admin-dashboard">Dashboard</Link>
            <Link className="nav-link" to="/admin-dashboard/bus/view-all">Buses</Link>
            <Link className="nav-link" to="/admin-dashboard/student/view-all">Students</Link>
            <Link className="nav-link" to="/admin-dashboard/driver/view-all">Drivers</Link>
            <Link className="nav-link" to="/admin-dashboard/route">Routes</Link>
            
          </Nav>
          
          <Nav>
            <NavDropdown title="Admin" id="admin-nav-dropdown" align="end">
              <NavDropdown.Item as={Link} to="/admin/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarc;
