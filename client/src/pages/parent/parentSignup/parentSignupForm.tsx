import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  isValidDob,
  isOnlyAlphabets,
  isOnlyNumbers,
} from "../../../utils/validation";
import axiosMultipartInstance from "../../../apis/axiosMultipartInstance.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./parentSignup.css";

interface ParentData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  profilePicture: File | null;
}
export const ParentSignupForm = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [dobError, setDobError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [parentData, setParentData] = useState<ParentData>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    profilePicture: null,
  });
  // const [parentData, setParentData] = useState<ParentData>({
  //   name: "parent",
  //   email: "parent1@gmail.com",
  //   password: "12341234",
  //   phoneNumber: "1234123412",
  //   address: "trivandrum",
  //   dateOfBirth: "",
  //   profilePicture: null,
  // });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    const { name, email, password, phoneNumber, dateOfBirth, address } =
      parentData;
    if (
      !name ||
      !email ||
      !password ||
      !phoneNumber ||
      !dateOfBirth ||
      !address
    ) {
      alert("Please fill all the fields");
      return;
    }
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

    if (dobError) {
      alert("Please provide a valid date of birth");
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
      address,
      dateOfBirth,
      profilePicture,
    } = parentData;

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);
    formData.append("dateOfBirth", dateOfBirth);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      let res = await axiosMultipartInstance.post("registerParent", formData);

      if (res.status === 201) {
        alert("Parent registration successfull.");
        setTimeout(() => {
          navigate("../parent/login");
        }, 1200);
      } else {
        console.log("Some issues on parent registsration.", res);
      }
    } catch (error: unknown) {
      console.log("Error occued on parent registration.", error);
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

    if (name === "dateOfBirth") {
      const isValid: boolean = isValidDob(value);
      if (isValid) {
        setDobError(null);
      } else {
        setDobError("Invalid date of birth");
      }
    } else if (name === "name" && value) {
      if (!isOnlyAlphabets(value)) {
        return;
      }
    } else if (name === "phoneNumber" && value) {
      if (!isOnlyNumbers(value)) {
        return;
      }
    }

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
      validated={validated}
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
              Please provide your Date of Birth
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
          <Form.Label>Upload your photo </Form.Label>
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
