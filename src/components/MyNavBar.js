import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

function MyNavBar(props) {
  function logout() {
    localStorage.setItem('user', JSON.stringify({
      isUserLoggedIn: false,
      nick_name: ""
    }))
    props.callBackFromParent(false)
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>Test React</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav>
            <Link  to="/">Home</Link>
          </Nav>
          <Nav style={{"marginLeft": "10px"}}>
            <Link  to="/login">Login</Link>
          </Nav>
        </Nav>
        <Nav>
          {
            props.myNickName !== '' && (
              <NavDropdown title={"Hi, "+props.myNickName} id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/ranking">Ranking</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/my-games">My games</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={(() => logout())}>Logout</NavDropdown.Item>
              </NavDropdown>
            )
            }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default MyNavBar;