import { Col, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { HPData } from "../profileSection/profileSection";
function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

interface ProfileViewProps {
  hpData: HPData | null;
  profilePicture: string;
}
export const ProfileView: React.FC<ProfileViewProps> = ({
  hpData,
  profilePicture,
}) => {
  console.log("hp data", hpData);
  return (
    <div>
      <div className="profile-header">
        <img src={profilePicture} alt="Profile" className="profile-image" />
        <div>
          <h3>{hpData?.name ? capitalizeFirstLetter(hpData.name) : ""}</h3>
          <p>{hpData?.address}</p>
        </div>
      </div>
      <div>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label className="fw-bold">Email Address</Form.Label>
              <p>
                <em>{hpData?.email}</em>
              </p>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label className="fw-bold">Phone Number</Form.Label>
              <p>
                <em>{hpData?.phoneNumber}</em>
              </p>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formLocation">
              <Form.Label className="fw-bold">Experience in years</Form.Label>
              <p>
                <em>{hpData?.department}</em>
              </p>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPostalCode">
              <Form.Label className="fw-bold">Joining Date</Form.Label>

              <p>
                <em>{hpData?.createdAt.substring(0, 10)}</em>
              </p>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formLocation">
              <Form.Label className="fw-bold">Qualification</Form.Label>
              <p>
                <em>{hpData?.qualification}</em>
              </p>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formLocation">
              <Form.Label className="fw-bold">Category</Form.Label>
              <p>
                <em>{hpData?.category}</em>
              </p>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};
