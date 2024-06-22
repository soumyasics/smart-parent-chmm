import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  isOnlyNumbers,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../../utils/validation/index.ts";
import axiosMultipartInstance from "../../../apis/axiosMultipartInstance.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "../../../components/common/passwordInput/passwordInput.tsx";
import { toast } from "react-hot-toast";
import { DISTRICTS } from "../../../constants/constants.ts";
interface VCData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  category: string;
  district: string;
  profilePicture: File | null;
}
export const VCSignupForm = () => {
  const [validated, setValidated] = useState<boolean>(false);
  
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false);
  // const [confirmPassword, setConfirmPassword] = useState<string>("");
  // const [vcData, setVcData] = useState<VCData>({
  //   name: "",
  //   email: "",
  //   password: "",
  //   phoneNumber: "",
  //   address: "",
  //   category: "",
  //   district: "",
  //   profilePicture: null,
  // });

  const [vcData, setVcData] = useState<VCData>({
    name: "Eenjakal",
    email: "Eenjakal@gmail.com",
    password: "12341234",
    phoneNumber: "1234567890",
    address: "Eenjakal PO",
    category: "hospital",
    district: "",
    profilePicture: null,
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("12341234");
  
  
  const navigate = useNavigate();
  useEffect(() => {
    const password = vcData.password;
    if (!password || !confirmPassword || password !== confirmPassword) {
      setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(true);
    }
  }, [vcData.password, confirmPassword]);

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
      phoneNumber,
      address,
      category,
      district,
      profilePicture,
    } = vcData;

    if (!name || !email || !password || !phoneNumber || !address || !category || !district) {
      return;
    }

    if (!isPasswordMatch) {
      toast.error("Passwords do not match");
      return;
    }

    const isEmailValid = validateEmail(vcData.email);
    if (!isEmailValid) {
      toast.error("Please provide a valid email.");
      return;
    }

    if (vcData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const isPhoneNumberValid = validatePhoneNumber(vcData.phoneNumber);
    if (!isPhoneNumberValid) {
      toast.error("Please provide a valid phone number.");
      return;
    }

    const isPasswordValid = validatePassword(vcData.password);
    if (!isPasswordValid) {
      toast.error("Please provide a valid password");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);
    formData.append("category", category);
    formData.append("district", district);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    sendDataToServer(formData);
  };
  const sendDataToServer = async (formData: FormData) => {
    try {
      let res = await axiosMultipartInstance.post("registerVC", formData);

      if (res.status === 201) {
        toast.success("Registration successfull.");
        setTimeout(() => {
          navigate("/vc/login");
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

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phoneNumber" && value.length !== 0 && !isOnlyNumbers(value)) {
      return;
    }
    setVcData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfilePictureUpload = (e: any) => {
    const pic = e.target.files[0];
    setVcData((prevData) => ({
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
                placeholder="Name"
                name="name"
                onChange={handleChanges}
                value={vcData.name}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter vaccine center Name
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Email"
                required
                name="email"
                onChange={handleChanges}
                value={vcData.email}
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
            value={vcData.password}
            label="Password"
            name="password"
          />
        </Col>
        <Col>
          <PasswordInput
            handleChanges={(e) => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
            label="Confirm Password"
            name="confirmPassword"
          />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Form.Group>
            <Form.Select
              required
              name="category"
              value={vcData.category}
              onChange={(e: any) => {
                setVcData((prevData) => ({
                  ...prevData,
                  category: e.target.value,
                }));
              }}
            >
              <option value="">Select Category</option>
              <option value="anganvadi">Anganvadi</option>
              <option value="hospital">Hospital</option>
            </Form.Select>

            <Form.Control.Feedback type="invalid">
              Please Enter Your category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Control
              required
              type="text"
              placeholder="Address"
              name="address"
              onChange={handleChanges}
              value={vcData.address}
            />

            <Form.Control.Feedback type="invalid">
              Please Enter address.
            </Form.Control.Feedback>
          </Form.Group>
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
              placeholder="Phone number."
              onChange={handleChanges}
              value={vcData.phoneNumber}
              name="phoneNumber"
            />
            <Form.Control.Feedback type="invalid">
              Please provide 10 digit Phone number.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Select required name="district" onChange={(e) => {
              setVcData((prevData) => ({
                ...prevData,
                district: e.target.value,
              }));
            }}>
              <option value="">Select District</option>
              {DISTRICTS.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </Form.Select>

            <Form.Control.Feedback type="invalid">
              Please Select District.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="position-relative">
            <Form.Label>Upload vaccination center photo </Form.Label>
            <Form.Control
              type="file"
              name="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
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
