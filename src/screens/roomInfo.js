import React, { useEffect,useState } from 'react'
import { Form, Row, Col, Table,Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { ToastContainer } from 'react-toastify';
import AdminNavBar from '../components/AdminNavBar';
import { approveRoom, getRooms } from '../actions/appuserActions';


const RoomInfo = () => {
    const [roomID,setroomID] =useState("");
    const dispatch = useDispatch();
    const rooms = useSelector(state => state.userData?.rooms);
    console.log(rooms);
    useEffect(() => {
        dispatch(getRooms());
    }, []);

    const handleClick=(id)=>{
        setroomID(id);
        console.log(roomID);
        dispatch(approveRoom(roomID));
    }
    



    return (
        <div>
            <AdminNavBar />
            <Sidebar >
                <Form id="myForm">
                    <Row className=" card1 ">
                        <div className="main-div" id="main-color">
                            <Col className="mt-1" xs={12} sm={12} md={12} lg={12}>
                                <h2 className='mt-2 mb-3'><strong> ROOMS INFORMATION </strong></h2>
                                <div className="" sm={12} md={12} lg={12}>

                                    <Table  className="table table-lg table-dark">

                                        <thead>
                                            <tr>
                                                <th className="text-center" scope="col">RoomId</th>
                                                <th className="text-center" scope="col">Room Title</th>
                                                <th className="text-center" scope="col">Number of Rooms</th>
                                                <th className="text-center" scope="col">Address</th>
                                                <th className="text-center" scope="col">Price</th>
                                                <th className="text-center" scope="col">Description</th>
                                                <th className="text-center" scope="col">Parking</th>
                                                <th className="text-center" scope="col">Bathroom</th>
                                                <th className="text-center" scope="col">ApprovedStatus</th>
                                                <th className="text-center" scope="col">Hosted User</th>

                                                <th className="text-center" scope="col">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                               rooms && rooms.map((item, index) => (
                                                    <tr key={item.RoomId}>
                                                        <td className="text-center">{item.RoomId}</td>
                                                        <td className="text-center">{item.roomTitle}</td>
                                                        <td className="text-center">{item.roomno}</td>
                                                        <td className="text-center">{item.address}</td>
                                                        <td className="text-center">{item.price}</td>
                                                        <td className="text-center">{item.description}</td>
                                                        <td className="text-center">{item.parking}</td>
                                                        <td className="text-center">{item.bathroom}</td>
                                                        <td className="text-center">{item.ApproveStatus}</td>
                                                        <td className="text-center">{item.userDetail.name}</td>
                                                        <td className="text-center"><Button onClick={()=>handleClick(item.RoomId)}  variant="success">Approve</Button></td>
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