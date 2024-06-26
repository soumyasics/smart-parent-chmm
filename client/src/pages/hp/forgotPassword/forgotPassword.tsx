import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import forgotPasswordImg from "../../../assets/forgot-password-img.png";
import { CommonFooter } from "../../../components/common/footer/footer";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../apis/axiosInstance";
import axios from "axios";
import { PasswordInput } from "../../../components/common/passwordInput/passwordInput";
import "./forgotPassword.css";
import { LandingPageNavbar } from "../../../components/landingPage/landingPageNavbar/landingPageNavbar";
import { toast } from "react-hot-toast";

interface PasswordResetData {
  email: string;
  newPassword: string;
}

export const HPForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!password || !confirmPassword || password !== confirmPassword) {
      setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(true);
    }
  }, [password, confirmPassword]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (
      !email ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    ) {
      toast.error(
        "Password and confirm password do not match! Please try agian."
      );
      return;
    }
    if (password.length < 8) {
      toast.error("Password should be at least 8 characters long.");
      return;
    }
    // Handle the form submission logic here
    let serializedData: PasswordResetData = {
      email,
      newPassword: password,
    };
    resetPassword(serializedData);
  };

  const resetPassword = async (data: PasswordResetData) => {
    try {
      let res = await axiosInstance.patch("resetHPPasswordByEmail", data);
      if (res.status === 200) {
        toast.success("Password reset successfully");
        redirectToHPLogin();
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errResponseStatus = error.response?.status;
        if (errResponseStatus === 404) {
          toast.error("Please check your email id");
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
        console.log("Error on resetting password", error);
      }
    }
  };

  const redirectToHPLogin = () => {
    navigate("/hp/login");
  };
  return (
    <>
      <LandingPageNavbar />
      <Container className="my-5 shadow forgot-password-container">
        <Row className="justify-content-center">
          <Col
            md={6}
            className="text-center d-flex flex-wrap flex-column align-content-center"
          >
            <Image
              src={forgotPasswordImg}
              className="forgot-password-image mx-auto"
            />
            <h2 className="forgot-password-header">Forgot Password?</h2>
            <p className="forgot-password-subtext">
              Enter your email address to reset your password.
            </p>
          </Col>
          <Col>
            <Form
              onSubmit={handleSubmit}
              className="shadow p-3 forgot-password-form"
            >
              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>

              <PasswordInput
                label="New Password"
                handleChanges={(e) => {
                  setPassword(e.target.value);
                }}
                isLabelReq={true}
                name="password"
                value={password}
              />
              <PasswordInput
                label="Confirm Password"
                handleChanges={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                isLabelReq={true}
                name="confirmPassword"
                value={confirmPassword}
              />
              {isSubmitted && password.length >= 8 && (
                <div>
                  {isPasswordMatch ? (
                    <p className="text-success">Passwords match</p>
                  ) : (
                    <p className="text-danger">Passwords do not match</p>
                  )}
                </div>
              )}

              <div className="d-flex mt-3 justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="mx-auto mt-3"
                >
                  Reset Password
                </Button>
                <Button
                  variant="success"
                  onClick={() => {
                    navigate("/hp/login");
                  }}
                  className="mx-auto mt-3"
                >
                  Go Back
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <CommonFooter />
    </>
  );
};
