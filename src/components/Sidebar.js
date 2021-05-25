import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'


import "./Sidebar.scss";


const Sidebar = (props) => {
  return (
    <>

      <Row>
        <Col className="navBar" md={3} lg={3}>
         <ul className = "navList">
           <li className="nav-text"> <a href="/admin">Dashboard </a> </li>
           <li className="nav-text"><a href="/users">Users</a></li>
           <li className="nav-text"><a href="/rooms">Rooms</a> </li>
           <li className="nav-text"><a href="/request"> Requests</a></li>
         </ul>
         
        </Col>
        <Col md={9} sm={12} xs={12} lg={9}>
          {props.children}
        </Col>
      </Row>
    </>
  );
}


export default Sidebar;