import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import "./resetPassword.css";
import resetPasswordImg from "../../../assets/pass-reset.jpg";

import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../apis/axiosInstance";
import axios from "axios";

interface PasswordResetData {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export const ParentResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  console.log("p", password, "ne", newPassword, "c", confirmPassword);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (newPassword !== confirmPassword) {
      alert("Password and confirm password should match.");
      return;
    }
    // Handle the form submission logic here
    let serializedData: PasswordResetData = {
      email,
      oldPassword: password,
      newPassword,
    };
    resetPassword(serializedData);
  };

  const resetPassword = async (data: PasswordResetData) => {
    try {
      let res = await axiosInstance.patch("resetParentPasswordByEmail", data);
      if (res.status === 200) {
        console.log("Password reset successfully");
        alert("Password reset successfully");
        redirectToParentProfile();
      } else {
        console.log("Something went wrong.", res);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (
          status === 404 ||
          status === 400 ||
          status === 401 ||
          status === 500
        ) {
          const msg =
            error?.response?.data?.message ||
            "Something went wrong. Please try again later.";

            console.log("mss", msg)
          alert(msg);
        } else {
          alert("Something went wrong. Please try again later.");
        }
      }
    }
  };

  const redirectToParentProfile = () => {
    // navigate("/parent/profile");
  };
  return (
    <>
      <Container className="my-5 shadow forgot-password-container">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <Image src={resetPasswordImg} className="forgot-password-image" />
            <h2 className="forgot-password-header">Reset Password?</h2>
            <p className="forgot-password-subtext">
              Enter your email address and current password to reset your
              password.
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
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your current password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide atleast 8 characters password
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-3" controlId="formPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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

                {isSubmitted && newPassword === confirmPassword && (
                  <p className="text-success">Passwords match</p>
                )}

                {isSubmitted && newPassword !== confirmPassword && (
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
                  onClick={redirectToParentProfile}
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
    </>
  );
};
