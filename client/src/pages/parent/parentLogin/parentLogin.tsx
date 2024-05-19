import { Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import "./parentLogin.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { CommonFooter } from "../../../components/common/footer/footer";
export const ParentLogin = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const navigateParentSignup = () => {
    navigate("/parent/signup");
  };

  return (
    <>
      <ParentNavbar />
      <div className=" shadow  mx-auto mt-5 pt-2" style={{width: "45%"}}>
        <h3 className="text-center mb-5"> Parent Login</h3>
        <Form className="mt-5 mb-5 " noValidate validated={validated}>
          <Row className="w-75 mx-auto mt-5">
            <Col>
              <Form.Group>
                <Form.Control
                  className="user-login-input"
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="w-75 mx-auto mt-5">
            <Col>
              <Form.Group style={{ position: "relative" }}>
                <div
                  style={{
                    display: "inline-block",
                    cursor: "pointer",
                    position: "absolute",
                    top: "7px",
                    right: "75px",
                  }}
                ></div>
                <Form.Control
                  required
                  className="user-login-input password-input-eye-btn-hide"
                  type="text"
                  minLength={8}
                  placeholder="Password"
                  name="password"
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter atleast 8 characters.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div className="user-login-btn-container-2">
            <p>
              Don’t have an account?{" "}
              <span
                className="user-forgot-password"
                onClick={navigateParentSignup}
              >
                {" "}
                Sign Up{" "}
              </span>
            </p>
            <br />

            <Button className="user-login-btn" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
      <CommonFooter />
    </>
  );
};
