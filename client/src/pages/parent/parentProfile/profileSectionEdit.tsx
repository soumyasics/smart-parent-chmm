
import { Form, Button, Row, Col } from "react-bootstrap";
import "./profileSectionEdit.css";

export const ProfileSection = () => {
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
              <Form.Control type="text" placeholder="Sara" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Tancredi" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Sara.Tancredi@gmail.com"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="(+98) 9123728167" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="e.g. New York, USA" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPostalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control type="text" placeholder="23728167" />
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
