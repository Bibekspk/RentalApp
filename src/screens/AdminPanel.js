import React,{useEffect} from 'react'
import { Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import AdminNavBar from '../components/AdminNavBar';
import {  getRooms, getUser } from '../actions/appuserActions';



const AdminPanel = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
        dispatch(getRooms());
    }, [])
    const userinfo = useSelector(state => state.userData?.user);
    const roominfo = useSelector(state => state.userData?.rooms);

    return (
        <div>
            <AdminNavBar />
            <Sidebar>
                <Form id="myForm">

                    <Row className=" card1 ">
                        <div className="main-div" id="main-color">
                            <Col className="mt-1" xs={12} sm={12} md={12} lg={12}>
                                <h2 className='mt-2 mb-3'><strong> WELCOME TO THE ADMIN DASHBOARD </strong></h2>
                                <br/>
                                <h2 className='mt-2 mb-3'><strong> TOTAL NUMBER OF USERS : {userinfo?.length} </strong></h2>
                                <br/>
                                <h2 className='mt-2 mb-3'><strong> TOTAL NUMBER OF ROOMS : {roominfo?.length} </strong></h2>
                                
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