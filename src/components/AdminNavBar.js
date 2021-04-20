import React from 'react'
import {
  Nav,
  Navbar,
  Container,
} from "react-bootstrap";
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux';
import '../assets/styles/navbar.scss'
import { logout } from '../actions/userActions';
const AdminNavBar = () => {
  const dispatch = useDispatch();

   const logoutClick=()=>{
        localStorage.removeItem("token");
        dispatch(logout());
    }
  return (
    <div>
      <Navbar bg="dark" expand="lg" collapseOnSelect sticky="top">
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
                href="/login"
                onClick={logoutClick}
              >
                Logout
                </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </div>
  )
}

export default AdminNavBar
