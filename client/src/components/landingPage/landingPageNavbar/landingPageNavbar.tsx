import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import styles from "./landingPageNavbar.module.css";
export const LandingPageNavbar = () => {
  const navigate = useNavigate();

  const handleLoginPageNavigate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      return;
    }

    navigate(e.target.value);
  };
  const navigateOptions = [
    // { value: "/", label: "Login" },
    { value: "/parent/login", label: "Parent" },
    { value: "/vaccine-center/login", label: "Vaccine Center" },
    { value: "/asha-worker/login", label: "Asha Worker" },
    { value: "/hp/login", label: "Health Professional" },
  ];

  return (
    <div className="bg-dark text-white px-4">
      <Navbar expand="lg" className="text-white pe-5">
        <Container>
          <Navbar.Brand
            className={`text-white ${styles.commonNavbarBrandLogo}`}
            role="button"
            href="#home"
          >
            Child Crescendo
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="d-flex justify-content-end"
            id="basic-navbar-nav"
          >
            <Nav
              className={`me-auto text-white w-50 ms-5 justify-content-between ${styles.commonNavbarItemsContainer}`}
            >
              <p className="my-0">Home</p>
              <p className="my-0">About Us</p>
              <p className="my-0">Contact</p>
              <p className="my-0">Services</p>
              <p className="my-0">Blogs</p>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Navbar.Collapse className="justify-content-end">
          <div>
            <Form.Select
              onChange={handleLoginPageNavigate}
              defaultValue=""
              style={{ cursor: "pointer" }}
            >
              <option value="" disabled hidden>
                Login
              </option>
              {navigateOptions.map((option) => {
                return (
                  <option
                    key={option.value}
                    value={option.value}
                  >
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
