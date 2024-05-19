import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./parentNavbar.module.css";
import { useNavigate } from "react-router-dom";
export const ParentNavbar = () => {
  const navigate = useNavigate();

  const navigateParentLogin = () => {
    navigate("/parent/login");
  };
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
              <p className="my-0 ">Link1</p>
              <p className="my-0 ">Link2</p>
              <p className="my-0 ">Link3</p>
              <p className="my-0 ">Link4</p>
              <p className="my-0 ">Link5</p>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Navbar.Collapse className="justify-content-end">
          {/* <Navbar.Text className="text-white d-flex">:</Navbar.Text> */}
          <span onClick={navigateParentLogin} className={`${styles.loginBtn}`}>
            Login{" "}
          </span>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
