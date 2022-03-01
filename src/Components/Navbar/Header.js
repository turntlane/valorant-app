import React from "react";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";


function Header() {
  return (
<Navbar style={{zIndex: '100'}} bg="transparent" expand="lg">
  <Container>
    <Navbar.Brand as={Link} to='/'>React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={Link} to='/'>Home</Nav.Link>
        <Nav.Link as={Link} to='/leaderboard'>Leaderboard</Nav.Link>
        <Nav.Link as={Link} to='/playersearch'>Player Search</Nav.Link>
        <Nav.Link as={Link} to='/playerinfo'>Player Info</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}
export default Header;
