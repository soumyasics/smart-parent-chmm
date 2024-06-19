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
import { PasswordInput } from "../../../components/common/passwordInput/passwordInput";
import {toast} from "react-hot-toast";
import { LandingPageNavbar } from "../../../components/landingPage/landingPageNavbar/landingPageNavbar";

export const HPLogin = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
      toast.error("Please provide a valid email.");
      return;
    }

    const isPasswordValid = validatePassword(password);
    if (!isPasswordValid) {
      toast.error("Please provide valid password");
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
        toast.success("Login Successful");
        setTimeout(() => {
          navigate("/hp/home");
        }, 1200);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;
          if (status === 400 || status === 404 || status === 500 || status === 401) {
            const errMsg =
              error.response?.data?.message ||
              "Somethng went wrong. Please try again later.";
            if (errMsg) {
              toast.error(errMsg);
            }
          } else if (status === 403) {
            const errMsg =
              error.response?.data?.message ||
              "Somethng went wrong. Please try again later.";
            if (errMsg) {
              toast.error(errMsg);
            }
          } else {
            console.log("Unexpected error occued on health professional login.1", error);
          }
        } else {
          toast.error(
            "No response received from the server. Please check your network"
          );
        }
      } else {
        console.log("Unexpected error occued on health professional login.2", error);
      }
    }
  };

  const navigateToHPForgotPassword = () => {
    navigate("/hp/forgot-password");
  }

  return (
    <div>
      <LandingPageNavbar />
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
                <PasswordInput
                  value={password}
                  handleChanges={(e) => setPassword(e.target.value)}
                  label="Password"
                  name="password"
                />
              </Col>
            </Row>
            <div className="user-login-btn-container-2">
              <p
                role="button"
                onClick={navigateToHPForgotPassword}
                className="text-primary mb-3 text-start fw-bold"
              >
                forgot password?
              </p>
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
