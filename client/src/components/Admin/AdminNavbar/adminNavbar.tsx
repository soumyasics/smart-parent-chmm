import { Container, Navbar } from "react-bootstrap";
import "./adminNavbar.css";
export const AdminNavbar = () => {
  return (
    <div id="admin-navbar-container">
      <Navbar id="admin-navbar" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>
            Child <span className="brand-connect">Crescendo </span>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};
