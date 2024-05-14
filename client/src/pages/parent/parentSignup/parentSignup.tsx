import { Container, Form } from "react-bootstrap";
import { useState } from "react";
import { ParentSignupForm } from "./parentSignupForm";
import { CommonFooter } from "../../../components/common/footer/footer";
import "./parentSignup.css";
export const ParentSignupPage = () => {
  return (
    <div id="user-signup-page">
      <Container className="user-signup-container">
        <div className="user-signup-form">
          <div className="user-signup-form-heading">
            {" "}
            <h6>Register as Parent</h6>{" "}
          </div>

          <div className="user-signup-input-container">
            <div className="users-signup-form-components">
              <ParentSignupForm />
            </div>
          </div>
        </div>
      </Container>

      <CommonFooter />
    </div>
  );
};