import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  isOnlyAlphabets,
  isOnlyNumbers,
  isValidDob,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../../utils/validation";
import axiosMultipartInstance from "../../../apis/axiosMultipartInstance.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "../../../components/common/passwordInput/passwordInput.tsx";
import { toast } from "react-hot-toast";

interface AWData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  experience: string;
  qualification: string;
  profilePicture: File | null;
}
export const AWSignupForm = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false);
  const navigate = useNavigate();
  const [awData, setAWData] = useState<AWData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    qualification: "",
    profilePicture: null,
    dateOfBirth: "",
    gender: "",
    experience: "",
  });

  // Initialize state with inbuilt values for testing
  // const [awData, setAWData] = useState<AWData>({
  //   name: "abc",
  //   email: "aw@gmail.com",
  //   password: "12341234",
  //   confirmPassword: "12341234",
  //   phoneNumber: "1234123412",
  //   address: "abc 343df dfdfff",
  //   qualification: "bcom",
  //   profilePicture: null,
  //   dateOfBirth: "2024-06-20",
  //   gender: "female",
  //   experience: "33",
  // });

  useEffect(() => {
    const password = awData.password;
    const confirmPassword = awData.confirmPassword;
    if (!password || !confirmPassword || password !== confirmPassword) {
      setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(true);
    }
  }, [awData.password, awData.confirmPassword]);

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
      dateOfBirth,
      gender,
      experience,
    } = awData;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      !address ||
      !qualification ||
      !dateOfBirth ||
      !gender ||
      !experience
    ) {
      return;
    }
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      toast.error("Please provide a valid email.");
      return;
    }
    const isPhoneNumberValid = validatePhoneNumber(phoneNumber);
    if (!isPhoneNumberValid) {
      toast.error("Please provide a valid phone number.");
      return;
    }

    const isPasswordValid = validatePassword(password);
    if (!isPasswordValid) {
      toast.error("Please provide valid password");
      return;
    }

    if (!isPasswordMatch) {
      toast.error("Passwords do not match");
      return;
    }

    if (!isValidDob(dateOfBirth) ) {
      toast.error("Please provide a valid date of birth");
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
      experience,
      dateOfBirth,
      gender,
      address,
      qualification,
      profilePicture,
    } = awData;

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);
    formData.append("qualification", qualification);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("gender", gender);
    formData.append("experience", experience);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      let res = await axiosMultipartInstance.post("registerAW", formData);

      if (res.status === 201) {
        toast.success("Registration successfull.");
        setTimeout(() => {
          navigate("/aw/login");
        }, 1200);
      } else {
        console.log("Some issues on AW registsration.", res);
      }
    } catch (error: unknown) {
      console.log("Error occued on hawp registration.", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 500) {
            const errMsg = error.response.data.message;
            if (errMsg) {
              toast.error(errMsg);
            }
          } else {
            console.log(
              "Unexpected error occued on parent registration.1",
              error
            );
          }
        } else {
          toast.error(
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

    if (name === "experience" && value.length !== 0 && !isOnlyNumbers(value)) {
      return;
    }

    if (name === "name" && value.length !== 0 && !isOnlyAlphabets(value)) {
      return;
    }
    setAWData((prevData) => ({ ...prevData, [name]: value }));

    console.log("values", awData);
  };

  const handleProfilePictureUpload = (e: any) => {
    const pic = e.target.files[0];
    setAWData((prevData) => ({
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
                placeholder="Enter your name"
                name="name"
                onChange={handleChanges}
                value={awData.name}
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
                placeholder="Enter your email"
                required
                name="email"
                onChange={handleChanges}
                value={awData.email}
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
            value={awData.password}
            label="Password"
            name="password"
          />
        </Col>
        <Col>
          <PasswordInput
            handleChanges={handleChanges}
            value={awData.confirmPassword}
            label="Confirm Password"
            name="confirmPassword"
          />
        </Col>
      </Row>

      <Row className="mt-3">
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
              value={awData.phoneNumber}
              name="phoneNumber"
            />
            <Form.Control.Feedback type="invalid">
              Please provide 10 digit Phone number.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter your experience years."
              required
              name="experience"
              maxLength={2}
              minLength={1}
              onChange={handleChanges}
              value={awData.experience}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your experience years.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              name="address"
              onChange={handleChanges}
              value={awData.address}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter your address
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter your qualification"
              required
              name="qualification"
              onChange={handleChanges}
              value={awData.qualification}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your qualification
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Form.Group>
            <Form.Select
              name="gender"
              onChange={handleChanges}
              value={awData.gender}
              required
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select your gender
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Form.Group>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Select your date of birth"
              name="dateOfBirth"
              onChange={handleChanges}
              value={awData.dateOfBirth}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please select your date of birth
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="position-relative">
            <Form.Label>Upload your photo </Form.Label>
            <Form.Control
            required
              type="file"
              name="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
              Please upload your photo
            </Form.Control.Feedback>
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
