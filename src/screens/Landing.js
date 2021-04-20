import React from 'react'
import '../assets/styles/landingpage.scss';
import { Button, Col, Row, Container } from "react-bootstrap";
import Navbarheader from '../components/Navbar'
import { Link } from 'react-router-dom'

const Landing = ({ history }) => {
    return (
        <>
            <Navbarheader />
            <Container>
                <Row className="row-content">
                    <Col s={12} md={12} className='pt-5'>
                        <h1 class="font-weight-bold"> <span style={{ color: '#5850EC' }}>WELCOME TO THE ADMIN PANEL</span> </h1>
                        <p className='text-regular' style={{ color: 'white' }}> This is an application for solving the problems of people around the country for renting rooms or searching rooms</p>
                        <Link to='login'>
                            <Button id="landbtn-pri" variant="primary">LOGIN</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default Landing