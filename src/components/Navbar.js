import React from 'react'
import {
  Nav,
  Navbar,
  Container,
} from "react-bootstrap";
import { Link } from 'react-router-dom'
import '../assets/styles/navbar.scss'
const Navbarheader = () => {
  return (
    <div>
      <Navbar bg="dark" expand="md" collapseOnSelect sticky="top">
        <Container>
          <Link to='/'>
            <Navbar.Brand style={{fontWeight: 'bold',fontSize: 20, color: 'whitesmoke'}} >RENTAL APP ADMIN PANEL</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#home" className="ml-5" style={{color:'white'}}>
                Home
                </Nav.Link>
              <Nav.Link href="#link" className="ml-5" style={{color:'white'}}>
                Features
                </Nav.Link>
              <Nav.Link href="#link" className="ml-5" style={{color:'white'}}>
                Contact
                </Nav.Link>
              <Nav.Link
                id="btnlogin"
                className="btn ml-5 text-white"
                href="/org_login"
              >
                Login
                </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </div>
  )
}

export default Navbarheader
