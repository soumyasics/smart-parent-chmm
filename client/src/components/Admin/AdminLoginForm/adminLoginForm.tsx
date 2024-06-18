import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {adminLoggedIn} from "../../../redux/reducers/adminSlice";
import { useDispatch } from "react-redux";
import "./adminLoginForm.css";
import {toast} from "react-hot-toast";
export const AdminLoginForm = () => {
  const [validated, setValidated] = useState(false);
  const email = "admin@gmail.com";
  const password = "admin@123";
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    if (email === inputEmail && password === inputPassword) {
      toast.success("Login successfull");
      dispatch(adminLoggedIn());
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
      
    } else {
      toast.error("Please check your email and password");
    }
  };
  const handleChange = (e: any) => {
    if (e.target.name === "email") {
      setInputEmail(e.target.value);
    } else if (e.target.name === "password") {
      setInputPassword(e.target.value);
    }
  };
  return (
    <div id="admin-login-form-container">
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h5> Admin Login</h5>
          <Form.Group className="mt-3" >
            <Form.Control
              className="admin-login-input"
              type="email"
              onChange={handleChange}
              placeholder="Email"
              required
              name="email"
              value={inputEmail}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Control
              required
              className="admin-login-input  password-input-eye-btn-hide"
              type="password"
              minLength={8}
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={inputPassword}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter atleast 8 characters.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="admin-login-btn-container-2">
            <Button className="admin-login-btn" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};
