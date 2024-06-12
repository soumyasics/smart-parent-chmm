import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../../utils/validation";
import axiosMultipartInstance from "../../../apis/axiosMultipartInstance.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface HPData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  category: string;
  profilePicture: File | null;
  certificateImg: File | null;
}
export const HPSignupForm = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const navigate = useNavigate();
  const [hpData, setHpData] = useState<HPData>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    category: "",
    profilePicture: null,
    certificateImg: null,
  });

  // Development only
  // const [hpData, setHpData] = useState<HPData>({
  //   name: "hp",
  //   email: "hp@gmail.com",
  //   password: "12341234",
  //   phoneNumber: "1234123412",
  //   category: "doctor",
  //   profilePicture: null,
  //   certificateImg: null,
  // });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    const isEmailValid = validateEmail(hpData.email);
    if (!isEmailValid) {
      alert("Please provide a valid email.");
      return;
    }
    const isPhoneNumberValid = validatePhoneNumber(hpData.phoneNumber);
    if (!isPhoneNumberValid) {
      alert("Please provide a valid phone number.");
      return;
    }

    const isPasswordValid = validatePassword(hpData.password);
    if (!isPasswordValid) {
      alert("Please provide valid password");
      return;
    }

    sendDataToServer();
  };
  const sendDataToServer = async () => {
    const formData = new FormData();
    const {
      name,
      email,
      password,
      phoneNumber,
      category,
      certificateImg,
      profilePicture,
    } = hpData;

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("category", category);

    if (certificateImg) {
      formData.append("certificateImg", certificateImg);
    }
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      let res = await axiosMultipartInstance.post("registerHP", formData);

      if (res.status === 201) {
        alert("Registration successfull.");
        setTimeout(() => {
          navigate("/hp/login");
        }, 1200);
      } else {
        console.log("Some issues on hp registsration.", res);
      }
    } catch (error: unknown) {
      console.log("Error occued on hp registration.", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 500) {
            const errMsg = error.response.data.message;
            if (errMsg) {
              alert(errMsg);
            }
          } else {
            console.log(
              "Unexpected error occued on parent registration.1",
              error
            );
          }
        } else {
          alert(
            "No response received from the server. Please check your network"
          );
        }
      } else {
        console.log("Unexpected error occued on parent registration.2", error);
      }
    }
  };

  const handleChanges = (e: any) => {
    const { name, value } = e.target;
    setHpData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfilePictureUpload = (e: any) => {
    const pic = e.target.files[0];
    setHpData((prevData) => ({
      ...prevData,
      profilePicture: pic,
    }));
  };

  const handleCertificateImgUpload = (e: any) => {
    const pic = e.target.files[0];
    setHpData((prevData) => ({
      ...prevData,
      certificateImg: pic,
    }));
  };
  return (
    <Form
      id="user-signup-form-input"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <div className="signup-form-flex-div">
        <Row className="mt-3">
          <Col>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                onChange={handleChanges}
                value={hpData.name}
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
                type="text"
                required
                minLength={10}
                maxLength={10}
                pattern="[0-9]{10}"
                placeholder="Enter your phone number."
                onChange={handleChanges}
                value={hpData.phoneNumber}
                name="phoneNumber"
              />
              <Form.Control.Feedback type="invalid">
                Please provide 10 digit Phone number.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </div>

      <Row className="mt-3">
        <Col>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              required
              name="email"
              onChange={handleChanges}
              value={hpData.email}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Your Email
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
              placeholder="Enter your password"
              name="password"
              onChange={handleChanges}
              value={hpData.password}
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
              placeholder="Enter Your category."
              required
              name="category"
              minLength={3}
              onChange={handleChanges}
              value={hpData.category}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Your category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="position-relative mt-3">
            <Form.Label>Upload your photo </Form.Label>
            <Form.Control
              type="file"
              name="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="position-relative mt-3">
            <Form.Label>Upload your certificate image </Form.Label>
            <Form.Control
              type="file"
              name="file"
              accept="image/*"
              onChange={handleCertificateImgUpload}
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-center mt-3">
        <Button id="user-signup-btn" type="submit">
          Sign Up
        </Button>
      </div>
    </Form>
  );
};
