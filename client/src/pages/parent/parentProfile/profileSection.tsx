
import { Form, Button, Row, Col } from "react-bootstrap";
import "./profileSection.css";


export const ParentProfileSection = () => {
  

  return (
    <div className="profile-section">
      <div className="profile-header">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="profile-image"
        />
        <div>
          <h3>Sara Tancredi</h3>
          <p>New York, USA</p>
        </div>
      </div>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <h4>Sara</h4>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <p>Sara</p>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <p>Sara@gmail.com</p>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <p>8606463169</p>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <p>Trivandrum </p>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPostalCode">
              <Form.Label>Postal Code</Form.Label>

              <p>123456</p>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="save-button">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};
