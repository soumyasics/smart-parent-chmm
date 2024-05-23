import { Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { CommonFooter } from "../../../components/common/footer/footer";
import { validateEmail } from "../../../utils/validation";
import { validatePassword } from "../../../utils/validation";
import "./parentLogin.css";
import axiosMultipartInstance from "../../../apis/axiosMultipartInstance";
import axios from "axios";
import axiosInstance from "../../../apis/axiosInstance";
export const ParentLogin = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const navigateParentSignup = () => {
    navigate("/parent/signup");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);
    // if (form.checkValidity() === false) {

    // }
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      alert("Please provide a valid email.");
      return;
    }

    const isPasswordValid = validatePassword(password);
    if (!isPasswordValid) {
      alert("Please proive a valid password");
      return;
    }

    sendDataToServer();
  };

  const sendDataToServer = async () => {
    try {
      let credentials = { email, password };

      const res = await axiosInstance.post("/loginParent", credentials);
      if (res.status === 200) {
        alert("Login Successful");
        setTimeout(() => {
          navigate("../");
        }, 1200);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;
          if (status === 400 || status === 404 || status === 500) {
            const errMsg = error.response.data.message;
            if (errMsg) {
              alert(errMsg);
            }
          } else {
            console.log("Unexpected error occued on parent login.1", error);
          }
        } else {
          alert(
            "No response received from the server. Please check your network"
          );
        }
      } else {
        console.log("Unexpected error occued on parent login.2", error);
      }
    }
  };

  return (
    <>
      <ParentNavbar />
      <div className="shadow mx-auto mt-5 pt-2" style={{ width: "45%" }}>
        <h3 className="text-center mb-5"> Parent Login</h3>
        <Form
          className="mt-5 mb-5 "
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Row className="w-75 mx-auto mt-5">
            <Col>
              <Form.Group>
                <Form.Control
                  className="user-login-input"
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="w-75 mx-auto mt-3">
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
                  onChange={(e) => setPassword(e.target.value)}
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
