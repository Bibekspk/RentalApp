import React, { useEffect,useState } from 'react'
import { Form, Row, Col, Table,Button, Modal, ModalFooter } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { ToastContainer } from 'react-toastify';
import AdminNavBar from '../components/AdminNavBar';
import { approveRequest, getRequest } from '../actions/appuserActions';


const RequestInfo = () => {
    const dispatch = useDispatch();
    const requests = useSelector(state => state.userData?.requests?.data);
    useEffect(() => {
        dispatch(getRequest());
    }, []);

    const [show, setShow] = useState(false);
    const [requestData, setRequestData] = useState({});
    

    const handleClick=(e)=>{
        const reqData = {
            RequestID : e.RequestID,
            DateforVisit: e.DateforVisit,
            ownerMail : e.roominfo.hostUser.email,
            ownername : e.roominfo.hostUser.name,
            ownercontact: e.roominfo.hostUser.contact,
            requestorEmail : e.requestor.email,
            requestorName : e.requestor.name,
            requestorContact : e.requestor.contact,
            roomAddress: e.roominfo.address,
            roomInfo: e.roominfo.price
        }
        setRequestData(reqData);
        setShow(true);
    }

    const handleApprove=()=>{
        setShow(false);
        console.log(requestData);
        dispatch(approveRequest(requestData));
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
                                <div style={{overflowX:'auto'}} className="" sm={12} md={12} lg={12}>
                                    
                                    <Table  className="table table-lg table-dark ">

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
                                                        <td><Button onClick={()=>handleClick(item)}  variant="success">Approve</Button></td>
                                                    </tr>
                                                )

                                                )
                                            }

                                        </tbody>
                                    </Table>
                                    <Modal show={show}>
                                        <Modal.Header  style={{color:'black'}}>
                                            <Modal.Title>Room Request Action</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body style={{color:'black'}}>
                                         Do you want to approve request and send mail to the owner and RoomSeeker  
                                        </Modal.Body>

                                        <ModalFooter>
                                            <Button onClick={handleApprove} variant="success">Approve</Button>
                                            <Button onClick={()=>setShow(false)} variant="danger">Close</Button>
                                        </ModalFooter>

                                    </Modal>
                                   
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