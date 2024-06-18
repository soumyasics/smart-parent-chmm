import { Col, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { AWData } from "../profileSection/profileSection";
function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

interface ProfileViewProps {
  awData: AWData | null;
  profilePicture: string;
}
export const ProfileView: React.FC<ProfileViewProps> = ({
  awData,
  profilePicture,
}) => {
  console.log('aww data', awData)
  return (
    <div>
      <div className="profile-header">
        <img src={profilePicture} alt="Profile" className="profile-image" />
        <div>
          <h3>{awData?.name ? capitalizeFirstLetter(awData.name) : ""}</h3>
          <p>{awData?.address}</p>
        </div>
      </div>
      <div>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label className="fw-bold">Email Address</Form.Label>
              <p>
                <em>{awData?.email}</em>
              </p>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label className="fw-bold">Phone Number</Form.Label>
              <p>
                <em>{awData?.phoneNumber}</em>
              </p>
            </Form.Group>
          </Col>
        </Row>
        <Row>
         

          <Col md={6}>
            <Form.Group controlId="formPostalCode">
              <Form.Label className="fw-bold">Joining Date</Form.Label>

              <p>
                <em>{awData?.createdAt?.substring(0, 10)}</em>
              </p>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPostalCode">
              <Form.Label className="fw-bold">Experience </Form.Label>

              <p>
                <em>{awData?.experience}</em>
              </p>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formLocation">
              <Form.Label className="fw-bold">Qualification</Form.Label>
              <p>
                <em>{awData?.qualification}</em>
              </p>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};
