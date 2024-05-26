import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import styles from "./landingPageNavbar.module.css";
import { Form } from "react-bootstrap";
export const LandingPageNavbar = () => {
  const navigate = useNavigate();

  const handleLoginPageNavigate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(e.target.value);
  };
  const navigateOptions = [
    { value: "/", label: "Login" },
    { value: "/parent/login", label: "Parent" },
    { value: "/vaccine-center/login", label: "Vaccine Center" },
    { value: "/asha-worker/login", label: "Asha Worker" },
    { value: "/health-professional/login", label: "Health Professional" },
  ];

  return (
    <div className="bg-dark text-white px-4">
      <Navbar expand="lg" className="text-white pe-5">
        <Container>
          <Navbar.Brand className="text-white" href="#home">
            Child Crescendo
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto  text-white w-50 justify-content-between">
              <p className="my-0 ">Home</p>
              <p className="my-0 ">About Us</p>
              <p className="my-0 ">Contact</p>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Navbar.Collapse className="justify-content-end">
          <div>
            <Form.Select onChange={handleLoginPageNavigate}>
              {navigateOptions.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </Form.Select>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
