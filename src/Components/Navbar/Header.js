import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header({ setAuth, isAuth, authenticated }) {
  let loadingNoti = useSelector((newState) => newState.userInfo);

  console.log("this is in the navbar", loadingNoti);

  return (
    <Navbar
      className="justify-content-center"
      style={{ zIndex: "100" }}
      // bg="transparent"
      expand="lg"
    >
      <Container>
        <Navbar.Brand
          style={{ fontSize: "2rem" }}
          className=""
          as={Link}
          to="/"
        >
          White Rifle
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link className="h4" as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link className="h4" as={Link} to="/leaderboard">
              Leaderboard
            </Nav.Link>
            <Nav.Link className="h4" as={Link} to="/playersearch">
              Player Search
            </Nav.Link>
            <Nav.Link className="h4" as={Link} to="/playerinfo">
              Player Info
            </Nav.Link>
            <Nav.Link className="h4" as={Link} to="/profile">
              Profile
            </Nav.Link>
            {!authenticated ? (
              <Nav.Link className="h4" as={Link} to="/login">
                Login
              </Nav.Link>
            ) : (
              <Nav.Link
                onClick={() => {
                  localStorage.removeItem("token");
                  setAuth(false);
                }}
                className="h4"
                as={Link}
                to="/login"
              >
                Logout
                {loadingNoti.firstName}
              </Nav.Link>
            )}
          </Nav>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
