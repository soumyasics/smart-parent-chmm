import { FC } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { HealthProfessionalData } from "../../../types/userTypes";
import { IllustrationSection } from "../../common/illustration/illustration";
import vcCenterImg from "../../../assets/vc-center.jpg";
import { useProfilePicture } from "../../../hooks/useProfilePicture";

interface HPDetailsContainerProps {
  data: HealthProfessionalData;
}

export const HPDetailsContainer: FC<HPDetailsContainerProps> = ({ data }) => {
  const { profilePicture } = useProfilePicture(data?.profilePicture?.filename);
  console.log("data", data);
  return (
    <Container className="mt-5">
      <h3 className="text-center text-primary shadow">Health Professional</h3>
      <Row>
        <Col md={6}>
          <IllustrationSection imgPath="https://img.freepik.com/free-vector/health-professional-team-concept-illustration_114360-1618.jpg" />
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-center align-items-center">
                <Image
                  style={{ width: "100px", height: "100px" }}
                  rounded
                  src={profilePicture}
                />
              </div>
              <div className="shadow p-2" style={{ minHeight: "300px" }}>
                <Card.Title className="mt-3 text-center">
                  Name: {data.name}
                </Card.Title>
                <Card.Text>
                  <p>
                    {" "}
                    <strong>Email:</strong> {data.email} <br />
                  </p>
                  <p>
                    <strong>Phone Number:</strong> {data.phoneNumber} <br />
                  </p>
                  <p>
                    <strong>Address:</strong> {data.address} <br />
                  </p>
                  <p>
                    <strong>Category:</strong> {data.category} <br />
                  </p>
                  <p>
                    <strong>Department:</strong> {data.department} <br />
                  </p>
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
