import React from 'react'
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import AdminNavBar from '../components/AdminNavBar';


const AdminPanel = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <AdminNavBar />
            <Sidebar >
                <Form id="myForm">

                    <Row className=" card1 ">
                        <div className="main-div" id="main-color">
                            <Col className="mt-1" xs={12} sm={12} md={12} lg={12}>
                                <h2 className='mt-2 mb-3'><strong> WELCOME TO THE ADMIN DASHBOARD </strong></h2>
                               
                                
                            </Col>
                        </div>
                    </Row>

                </Form>
            </Sidebar>
            <ToastContainer position="top-center" />
        </div>

    )
}

export default AdminPanel