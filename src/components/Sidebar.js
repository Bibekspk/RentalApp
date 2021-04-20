import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import { SidebarData } from './SidebarData';

import { IconContext } from 'react-icons'

import "./Sidebar.scss";


const Sidebar = (props) => {
  return (
    <>

      <Row>
        <Col className="" md={3} lg={3}>
          <IconContext.Provider value={{ color: 'white' }}>
            <nav className='nav-menu active '>
              <ul className='nav-menu-items' >
                <div className="nav-menu-items-ctr">
                  {SidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span style={{ color: 'white' }}>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </div>
              </ul>
            </nav>
          </IconContext.Provider>
        </Col>
        <Col md={9} sm={12} xs={12} lg={9}>
          {props.children}
        </Col>
      </Row>
    </>
  );
}


export default Sidebar;