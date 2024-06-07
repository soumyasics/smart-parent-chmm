import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import "./forgotPassword.css";

import forgotPasswordImg from "../../../assets/forgot-password-img.png";
import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { CommonFooter } from "../../../components/common/footer/footer";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../apis/axiosInstance";
import axios from "axios";

interface PasswordResetData {
  email: string;
  newPassword: string;
}

export const ParentForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (
      !email ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    ) {
      alert("Please provide a valid email and password.");
      return;
    }
    // Handle the form submission logic here
    let serializedData: PasswordResetData = { email, newPassword: password };
    resetPassword(serializedData);
  };

  const resetPassword = async (data: PasswordResetData) => {
    try {
      let res = await axiosInstance.patch("resetParentPasswordByEmail", data);
      if (res.status === 200) {
        console.log("Password reset successfully");
        alert("Password reset successfully");
        redirectToParentLogin();
      } else {
        console.log("Something went wrong.", res);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errResponseStatus = error.response?.status;
        if (errResponseStatus === 404) {
          alert("Please check your email id");
        } else {
          alert("Something went wrong. Please try again later.");
        }
        console.log("Error on resetting password", error);
      }
    }
  };

  const redirectToParentLogin = () => {
    navigate("/parent/login");
  };
  return (
    <>
      <ParentNavbar />
      <Container className="my-5 shadow forgot-password-container">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <Image src={forgotPasswordImg} className="forgot-password-image" />
            <h2 className="forgot-password-header">Forgot Password?</h2>
            <p className="forgot-password-subtext">
              Enter your email address below to reset your password.
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
              <Form.Group className="mt-3" controlId="formPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide atleast 8 characters password
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-3" controlId="formEmail">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Please confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                />

                {isSubmitted && password === confirmPassword && (
                  <p className="text-success">Passwords match</p>
                )}

                {isSubmitted && password !== confirmPassword && (
                  <p className="text-danger">Passwords do not match</p>
                )}
              </Form.Group>
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
                  onClick={redirectToParentLogin}
                  type="submit"
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
