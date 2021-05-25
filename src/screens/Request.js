import React, { useEffect,useState } from 'react'
import { Form, Row, Col, Table,Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { ToastContainer } from 'react-toastify';
import AdminNavBar from '../components/AdminNavBar';
import { getRequest } from '../actions/appuserActions';


const RequestInfo = () => {
    // const [userID,setUserID] =useState("");
    const dispatch = useDispatch();
    const requests = useSelector(state => state.userData?.requests?.data);

    useEffect(() => {
        dispatch(getRequest());
    }, []);

    const handleClick=(id)=>{
        // setUserID(id);
        // console.log(userID);
        // dispatch(delUser(userID));
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
                                    <Container>
                                    <Table  className="table table-lg table-dark">

                                        <thead>
                                            <tr>
                                                <th className="text-center" scope="col">RequestID</th>
                                                <th className="text-center" scope="col">VisitDetail</th>
                                                <th className="text-center" scope="col">RoomID</th>
                                                <th className="text-center" scope="col">DateofRequest</th>
                                                <th className="text-center" scope="col">DateforVisit</th>
                                                <th className="text-center" scope="col">Owner</th>
                                                <th className="text-center" scope="col">Requestor</th>
                                                <th className="text-center" scope="col">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                               requests && requests.map((item, index) => (
                                                    <tr key={item.RequestID}>
                                                        <td className="text-center" >{item.RequestID}</td>
                                                        <td className="text-center" >{item.VisitDetail}</td>
                                                        <td className="text-center" >{item.RoomID}</td>
                                                        <td className="text-center" >{item.DateofRequest.substring(0,10)}</td>
                                                        <td className="text-center" >{item.DateforVisit}</td>
                                                        <td className="text-center" >{item.roominfo.hostUser.name}</td>
                                                        <td className="text-center" >{item.requestor.name}</td>
                                                        <td><Button onClick={()=>handleClick(item.id)}  variant="success">Approve</Button></td>
                                                    </tr>
                                                )

                                                )
                                            }

                                        </tbody>
                                    </Table>
                                    </Container>
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

export default RequestInfo;