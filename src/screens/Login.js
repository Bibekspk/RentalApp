import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Navbarheader from "../components/Navbar";
// import Select from "react-select";
import "../assets/styles/OrgLogin.scss";

/**
 * @author
 * @function OrgLogin
 **/

const OrgLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authenticate = useSelector(state => state.userLogin.authenticate);
  const history = useHistory();
  
  if(authenticate){
    history.push('/admin');
  }

  const userLogin = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(login(user));
  };

  return (
    <>
      <Navbarheader />
      <div className="mt-5 ml-5 mr-5" lg={6} md={6} sm={12} xs={12}  >
        <Row>
          <Col sm={0} md={3} lg={3} xl={3}></Col>
          <Col>
            <h1 className="text-center mt-5 ">LOG IN</h1>
            <h5 className="text-center mb-5">BE READY TO USE THE ADMIN PANEL</h5>
            <Form className="text-center " onSubmit={userLogin}>

              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Row>
                <Col md={4} sm={12} xs={12}>
                  <Form.Group>
                    <Form.Check type="checkbox" label="Remember me" />
                  </Form.Group>
                </Col>

                <Col md={6} sm={12} xs={12}>
                  <p>
                    <Link className="text-color">
                      <i>Forgot your password?</i>
                    </Link>
                  </p>
                </Col>
              </Row>
              <Button variant="primary" type="submit">
                SIGN IN
              </Button>
              <Row>
                <Col className="my-3">
                  <strong className="text-center-3">Not a member ? </strong>
                  <Link to="/">
                    Register
                  </Link>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col sm={0} md={3} lg={3} xl={3}></Col>
        </Row>

      </div>
    </>
  );
};
export default OrgLogin;
