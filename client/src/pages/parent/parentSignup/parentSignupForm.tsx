import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import "./parentSignup.css";
export const ParentSignupForm = () => {
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [parentData, setParentData] = useState({
  name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    profilePicture: null,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChanges = (e) => {};

  const handleProfilePictureUpload = (e) => {};
  return (
    <Form
      id="user-signup-form-input"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            required
            type="text"
            placeholder="Enter Your Name"
            name="name"
            onChange={handleChanges}
            value={parentData.name}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter Your Name
          </Form.Control.Feedback>
        </Form.Group>

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
      </div>

      <div className="signup-form-flex-div">
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

        <Form.Group
          style={{
            position: "relative",
          }}
        >
          <div
            style={{
              display: "inline-block",
              cursor: "pointer",
              position: "absolute",
              top: "25px",
              right: "34px",
            }}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>

          <Form.Control
            required
            type={showPassword ? "text" : "password"}
            minLength={8}
            className="password-input-eye-btn-hide"
            placeholder="Password"
            name="password"
            onChange={handleChanges}
            value={parentData.password}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter Atleast 8 Characters.
          </Form.Control.Feedback>
          <Form.Control.Feedback>
            Your password is strong.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="signup-form-flex-div">
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
        <Form.Group>
          <Form.Control
            type="number" // todo: fix minLength issue with number
            required
            minLength={10}
            maxLength={10}
            pattern="[0-9]{10}"
            placeholder="Please Enter Your Phone Number"
            onChange={handleChanges}
            value={parentData.phoneNumber}
            name="phoneNumber"
          />
          <Form.Control.Feedback type="invalid">
            Please provide 10 digit Phone number.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

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

      <div className="signup-form-flex-div">
        <Button id="user-signup-btn" type="submit">
          Sign Up
        </Button>
      </div>
    </Form>
  );
};
