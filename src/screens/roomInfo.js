import React, { useEffect,useState } from 'react'
import { Form, Row, Col, Table,Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import AdminNavBar from '../components/AdminNavBar';
import { delUser, getUser } from '../actions/appuserActions';


const RoomInfo = () => {
    const [userID,setUserID] =useState("");
    const dispatch = useDispatch();
    const users = useSelector(state => state.userData?.user);
    console.log(users);
    useEffect(() => {
        dispatch(getUser());
    }, []);

    const handleClick=(id)=>{
        setUserID(id);
        console.log(userID);
        dispatch(delUser(userID));
    }
    



    return (
        <div>
            <AdminNavBar />
            <Sidebar >
                <Form id="myForm">
                    <Row className=" card1 ">
                        <div className="main-div" id="main-color">
                            <Col className="mt-1" xs={12} sm={12} md={12} lg={12}>
                                <h2 className='mt-2 mb-3'><strong> USER INFORMATION </strong></h2>
                                <div className="" sm={12} md={12} lg={12}>

                                    <Table  className="table table-lg table-dark">

                                        <thead>
                                            <tr>
                                                <th className="text-center" scope="col">UserID</th>
                                                <th className="text-center" scope="col">First</th>
                                                <th className="text-center" scope="col">Contact</th>
                                                <th className="text-center" scope="col">Address</th>
                                                <th className="text-center" scope="col">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                               users && users.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.contact}</td>
                                                        <td>{item.address}</td>
                                                        <td><Button onClick={()=>handleClick(item.id)}  variant="danger">Delete</Button></td>
                                                    </tr>
                                                )

                                                )
                                            }

                                        </tbody>
                                    </Table>
                                </div>

                            </Col>
                        </div>
                    </Row>

                </Form>
            </Sidebar>
            <ToastContainer position="top-center" />
        </div>

    )
}

export default RoomInfo;