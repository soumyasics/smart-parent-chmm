import { CommonFooter } from "../../../components/common/footer/footer";
import { Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../../utils/validation";
import { validatePassword } from "../../../utils/validation";
import axios from "axios";
import axiosInstance from "../../../apis/axiosInstance";
import { UserState } from "../../../redux/types";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../../redux/reducers/userSlilce";

import { HPNavbar } from "../../../components/hp/hpNavbar/hpNavbar";

export const HPLogin = () => {
  const [validated, setValidated] = useState<boolean>(false);
//   const [email, setEmail] = useState<string>("parent1@gmail.com");
//   const [password, setPassword] = useState<string>("12341234");
  const [email, setEmail] = useState<string>("hp1@gmail.com");
  const [password, setPassword] = useState<string>("12341234");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateHPSignup = () => {
    navigate("/hp/signup");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setValidated(true);
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

      const res = await axiosInstance.post("/loginHP", credentials);
      if (res.status === 200) {
        let data = res.data || null;

        let serializedUserData: UserState = {
          isAuthenticated: true,
          userData: data?.data || null,
          jsonWebToken: data?.token || null,
          userId: data?.data?._id || null,
          userType: "healthProfessional",
        };
        dispatch(userLoggedIn(serializedUserData));
        alert("Login Successful");
        setTimeout(() => {
          navigate("../hp/home");
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
    <div>
      <HPNavbar />
      <div>
        <div className="shadow mx-auto mt-5 pt-2" style={{ width: "45%" }}>
          <h3 className="text-center mb-5"> Health Professional Login</h3>
          <Form
            className="mt-5 mb-5"
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
                    value={email}
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
                    type="password"
                    minLength={8}
                    value={password}
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
                  onClick={navigateHPSignup}
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
      </div>
      <CommonFooter />
    </div>
  );
};
