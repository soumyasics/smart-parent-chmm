import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import resetPasswordImg from "../../../assets/pass-reset.jpg";
import axiosInstance from "../../../apis/axiosInstance";
import axios from "axios";
import { PasswordInput } from "../../../components/common/passwordInput/passwordInput";
import "./resetPassword.css";
import {toast} from "react-hot-toast";

interface PasswordResetData {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export const HPResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setNewPassword("");
    setConfirmPassword("")
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      toast.error("Please enter current password");
      return;
    }

    if (password.length < 8) {
      toast.error("Password should be at least 8 characters long.");
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      toast.error("New password should be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(
        "New password and confirm password are not same! Please try agian."
      );
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
      let res = await axiosInstance.patch("resetHPPasswordByEmail", data);
      if (res.status === 200) {
        toast.success("Password reset successfully");
        resetFields()
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

          console.log("mss", msg);
          toast.error(msg);
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      }
    }
  };


  return (
    <>
      <Container className="my-5 shadow forgot-password-container">
        <Row className="justify-content-center">
          <Col md={6} className="text-center ">
            <Image src={resetPasswordImg} className=" mx-auto forgot-password-image" />
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

              <Row className="mt-3">
                <PasswordInput
                  label="Current Password"
                  isLabelReq={true}
                  name="password"
                  value={password}
                  handleChanges={(e) => setPassword(e.target.value)}
                />
              </Row>

              <Row className="mt-3">
                <PasswordInput
                  handleChanges={(e) => setNewPassword(e.target.value)}
                  label="New Password"
                  value={newPassword}
                  name="new password"
                  isLabelReq={true}
                />
              </Row>

              <Row className="mt-3">
                <PasswordInput
                  handleChanges={(e) => setConfirmPassword(e.target.value)}
                  label="Confirm Password"
                  value={confirmPassword}
                  name="confirmPassword"
                  isLabelReq={true}
                />
              </Row>

              
              <div className="d-flex mt-3 justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="mx-auto mt-3"
                >
                  Reset Password
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
