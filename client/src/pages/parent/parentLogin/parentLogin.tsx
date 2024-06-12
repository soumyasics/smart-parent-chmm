import { Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { CommonFooter } from "../../../components/common/footer/footer";
import { validateEmail } from "../../../utils/validation";
import { validatePassword } from "../../../utils/validation";
import axios from "axios";
import axiosInstance from "../../../apis/axiosInstance";
import { UserState } from "../../../redux/types";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../../redux/reducers/userSlilce";
import { LandingPageNavbar } from "../../../components/landingPage/landingPageNavbar/landingPageNavbar";
import { PasswordInput } from "../../../components/common/passwordInput/passwordInput";
import "./parentLogin.css";

export const ParentLogin = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { isAuthenticated, userType } = useSelector(
  //   (state: RootState) => state.user
  // );
  // useEffect(() => {
  //   if (isAuthenticated && userType === "parent") {
  //     navigate("/parent/home");
  //   }
  // }, [isAuthenticated, userType]);
  const navigateParentSignup = () => {
    navigate("/parent/signup");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

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

      const res = await axiosInstance.post("/loginParent", credentials);
      if (res.status === 200) {
        let data = res.data || null;

        let serializedUserData: UserState = {
          isAuthenticated: true,
          userData: data?.data || null,
          jsonWebToken: data?.token || null,
          userId: data?.data?._id || null,
          userType: "parent",
        };
        dispatch(userLoggedIn(serializedUserData));
        alert("Login Successful");
        setTimeout(() => {
          navigate("/parent/home");
        }, 1200);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;
          if (
            status === 400 ||
            status === 401 ||
            status === 404 ||
            status === 500
          ) {
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

  const navigateToParentForgotPassword = () => {
    navigate("/parent/forgot-password");
  };

  return (
    <>
      <LandingPageNavbar />
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
                handleChanges={(e) => setPassword(e.target.value)}
                label="Password"
                name="password"
                value={password}
              />
            </Col>
          </Row>
          <div className="user-login-btn-container-2">
            <p
              role="button"
              onClick={navigateToParentForgotPassword}
              className="text-primary mb-3 text-start fw-bold"
            >
              forgot password?
            </p>
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
