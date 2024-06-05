import { Col, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import {ParentData} from "../profileSection";
function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

interface ProfileViewProps {
  parentData: ParentData | null,
  profilePicture: string
}
export const ProfileView: React.FC<ProfileViewProps> = ({ parentData , profilePicture}) => {
  return (
    <div>
      <div className="profile-header">
        <img src={profilePicture} alt="Profile" className="profile-image" />
        <div>
          <h3>
            {parentData?.name ? capitalizeFirstLetter(parentData.name) : ""}
          </h3>
          <p>{parentData?.address}</p>
        </div>
      </div>
      <div>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label className="fw-bold">Email Address</Form.Label>
              <p>
                <em>{parentData?.email}</em>
              </p>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label className="fw-bold">Phone Number</Form.Label>
              <p>
                <em>{parentData?.phoneNumber}</em>
              </p>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formLocation">
              <Form.Label className="fw-bold">Date of Birth</Form.Label>
              <p>
                <em>{parentData?.dateOfBirth}</em>
              </p>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPostalCode">
              <Form.Label className="fw-bold">Account created</Form.Label>

              <p>
                <em>{parentData?.createdAt.substring(0, 10)}</em>
              </p>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};
