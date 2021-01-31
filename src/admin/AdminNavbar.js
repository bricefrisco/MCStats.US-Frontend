import React from 'react';
import { useSelector } from 'react-redux';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { selectLoggedIn } from '../state/authSlice';

export const AdminNavigation = () => {
  const isLoggedIn = useSelector(selectLoggedIn);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        MCStats
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/admin/panel">
            Servers
          </Nav.Link>
          <NavDropdown
            title="Actions"
            id="basic-nav-dropdown"
            disabled={!isLoggedIn}
          >
            <NavDropdown.Item as={Link} to="/admin/servers/edit">
              Edit Server
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin/servers/add">
              Add Server
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin/servers/remove">
              Remove Server
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavigation;
