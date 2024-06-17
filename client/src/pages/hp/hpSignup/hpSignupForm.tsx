import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  isOnlyAlphabets,
  isOnlyNumbers,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../../utils/validation";
import axiosMultipartInstance from "../../../apis/axiosMultipartInstance.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "../../../components/common/passwordInput/passwordInput.tsx";
interface HPData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
  department: string;
  qualification: string;
  profilePicture: File | null;
  certificateImg: File | null;
}
export const HPSignupForm = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false);
  const navigate = useNavigate();
  const [hpData, setHpData] = useState<HPData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    department: "",
    qualification: "",
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

  useEffect(() => {
    const password = hpData.password;
    const confirmPassword = hpData.confirmPassword;
    if (!password || !confirmPassword || password !== confirmPassword) {
      setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(true);
    }
  }, [hpData.password, hpData.confirmPassword]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    const {
      name,
      email,
      password,
      confirmPassword,
      phoneNumber,
      address,
      qualification,
      certificateImg,
      department,
    } = hpData;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      !address ||
      !qualification ||
      !department ||
      !certificateImg
    ) {
      return;
    }
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      alert("Please provide a valid email.");
      return;
    }
    const isPhoneNumberValid = validatePhoneNumber(phoneNumber);
    if (!isPhoneNumberValid) {
      alert("Please provide a valid phone number.");
      return;
    }

    const isPasswordValid = validatePassword(password);
    if (!isPasswordValid) {
      alert("Please provide valid password");
      return;
    }

    if (!isPasswordMatch) {
      alert("Passwords do not match");
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
      department,
      address,
      qualification,
      certificateImg,
      profilePicture,
    } = hpData;

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("department", department);
    formData.append("address", address);
    formData.append("qualification", qualification);

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
    if (name === "phoneNumber" && value.length !== 0 && !isOnlyNumbers(value)) {
      return;
    }

    if (name === "name" && value.length !== 0 && !isOnlyAlphabets(value)) {
      return;
    }
    setHpData((prevData) => ({ ...prevData, [name]: value }));
    
    console.log("values", hpData)
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
          <Col sm={12}>
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

          <Col sm={12}>
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
        </Row>
      </div>

      <Row className="mt-3">
        <Col>
          <PasswordInput
            handleChanges={handleChanges}
            value={hpData.password}
            label="Password"
            name="password"
          />
        </Col>
        <Col>
          <PasswordInput
            handleChanges={handleChanges}
            value={hpData.confirmPassword}
            label="Confirm Password"
            name="confirmPassword"
          />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col sm={12}>
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

        <Col sm={12}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter your department."
              required
              name="department"
              minLength={3}
              onChange={handleChanges}
              value={hpData.department}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your department.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col sm={12}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              name="address"
              onChange={handleChanges}
              value={hpData.address}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter your address
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col sm={12}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter your qualification"
              required
              name="qualification"
              onChange={handleChanges}
              value={hpData.qualification}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your qualification
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col sm={12}>
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
        <Col sm={12}>
          <Form.Group className="position-relative mt-3">
            <Form.Label>Upload your certificate image </Form.Label>
            <Form.Control
              required
              type="file"
              name="file"
              accept="image/*"
              onChange={handleCertificateImgUpload}
            />
            <Form.Control.Feedback type="invalid">
              Please upload your certificate
            </Form.Control.Feedback>
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
