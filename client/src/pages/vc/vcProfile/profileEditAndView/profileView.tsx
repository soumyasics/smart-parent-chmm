import { Col, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { VCData } from "../profileSection/profileSection";
function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

interface ProfileViewProps {
  vcData: VCData | null;
  profilePicture: string;
}
export const ProfileView: React.FC<ProfileViewProps> = ({
  vcData,
  profilePicture,
}) => {

  return (
    <div>
      <div className="profile-header">
        <img src={profilePicture} alt="Profile" className="profile-image" />
        <div>
          <h3>
            {vcData?.name ? capitalizeFirstLetter(vcData.name) : ""}
          </h3>
          <p>{vcData?.address}</p>
        </div>
      </div>
      <div>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label className="fw-bold">Email Address</Form.Label>
              <p>
                <em>{vcData?.email}</em>
              </p>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label className="fw-bold">Phone Number</Form.Label>
              <p>
                <em>{vcData?.phoneNumber}</em>
              </p>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formLocation">
              <Form.Label className="fw-bold">Category</Form.Label>
              <p>
                <em>{vcData?.category}</em>
              </p>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPostalCode">
              <Form.Label className="fw-bold">Joining Date</Form.Label>

              <p>
                <em>{vcData?.createdAt.substring(0, 10)}</em>
              </p>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};
