import React from "react";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";


function Header() {
  return (
<Navbar className="justify-content-center" style={{zIndex: '100'}} bg="transparent" expand="lg">
  <Container>
    <Navbar.Brand style={{fontSize: '2rem'}} className="" as={Link} to='/'>White Rifle</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="m-auto">
        <Nav.Link className="h4" as={Link} to='/'>Home</Nav.Link>
        <Nav.Link className="h4" as={Link} to='/leaderboard'>Leaderboard</Nav.Link>
        <Nav.Link className="h4" as={Link} to='/playersearch'>Player Search</Nav.Link>
        <Nav.Link className="h4" as={Link} to='/playerinfo'>Player Info</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}
export default Header;
