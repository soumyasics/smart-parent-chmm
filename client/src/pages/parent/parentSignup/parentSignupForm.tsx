import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import axiosInstance from "../../../apis/axiosInstance.ts";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validatePincode,
} from "../../../utils/validation";
import "./parentSignup.css";
import axiosMultipartInstance from "../../../apis/axiosMultipartInstance.ts";
import axios from "axios";
export const ParentSignupForm = () => {
  const [validated, setValidated] = useState(false);

  const [parentData, setParentData] = useState({
    name: "parent",
    email: "parent1@gmail.com",
    password: "12341234",
    phoneNumber: "1234123412",
    address: "trivandrum",
    dateOfBirth: "2024-05-17",
    profilePicture: null,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    console.log("fo", form.checkValidity());
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    const isEmailValid = validateEmail(parentData.email);
    if (!isEmailValid) {
      alert("Please provide a valid email.");
      return;
    }
    const isPhoneNumberValid = validatePhoneNumber(parentData.phoneNumber);
    if (!isPhoneNumberValid) {
      alert("Please provide a valid phone number.");
      return;
    }

    const isPasswordValid = validatePassword(parentData.password);
    if (!isPasswordValid) {
      alert("Please proive a valid password");
      return;
    }

    sendDataToServer();
  };
  const sendDataToServer = async () => {
    try {
      let res = await axios.post(
        "http://localhost:4044/child_crescendo_api/registerParent",
        parentData
      );

      console.log("ress", res);
    } catch (error) {
      console.log("Error occued on parent registration.", error);
    }
  };

  const handleChanges = (e: any) => {
    const { name, value } = e.target;
    setParentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfilePictureUpload = (e: any) => {
    const pic = e.target.files[0];
    setParentData((prevData) => ({
      ...prevData,
      profilePicture: pic,
    }));
  };
  return (
    <Form
      id="user-signup-form-input"
      noValidate
      validated={true}
      onSubmit={handleSubmit}
    >
      <div className="signup-form-flex-div">
        <Row className="mt-3">
          <Col>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                name="name"
                onChange={handleChanges}
                value={parentData.name}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please Enter Your Name
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Enter Your Email"
                required
                name="email"
                onChange={handleChanges}
                value={parentData.email}
              />
              <Form.Control.Feedback type="invalid">
                Please Enter Your Email
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </div>

      <Row className="mt-3">
        <Col>
          <Form.Group>
            <Form.Control
              required
              type="date"
              placeholder="Please Select Your Date Of Birth"
              name="dateOfBirth"
              onChange={handleChanges}
              value={parentData.dateOfBirth}
            />
            <Form.Control.Feedback type="invalid">
              Please Select Your Date Of Birth.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group
            style={{
              position: "relative",
            }}
          >
            <Form.Control
              required
              type="password"
              minLength={8}
              className="password-input-eye-btn-hide"
              placeholder="Password"
              name="password"
              onChange={handleChanges}
              value={parentData.password}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your password with atleast 8 characters.
            </Form.Control.Feedback>
            <Form.Control.Feedback>
              Your password is strong.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Please Enter Your Address."
              required
              name="address"
              minLength={3}
              onChange={handleChanges}
              value={parentData.address}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Your Address.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              required
              minLength={10}
              maxLength={10}
              pattern="[0-9]{10}"
              placeholder="Please enter your phone number."
              onChange={handleChanges}
              value={parentData.phoneNumber}
              name="phoneNumber"
            />
            <Form.Control.Feedback type="invalid">
              Please provide 10 digit Phone number.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <div className="signup-form-flex-div">
        <Form.Group className="position-relative mt-3">
          <Form.Label>Upload your photo (Square image)</Form.Label>
          <Form.Control
            type="file"
            name="file"
            accept="image/*"
            onChange={handleProfilePictureUpload}
          />
        </Form.Group>
      </div>

      <div className="d-flex justify-content-center mt-3">
        <Button id="user-signup-btn" type="submit">
          Sign Up
        </Button>
      </div>
    </Form>
  );
};
