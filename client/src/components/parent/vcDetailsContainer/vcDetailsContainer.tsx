import { FC } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { VaccinationCenterData } from "../../../types/userTypes";
import { IllustrationSection } from "../../common/illustration/illustration";
import vcCenterImg from "../../../assets/vc-center.jpg";
import { useProfilePicture } from "../../../hooks/useProfilePicture";

interface VCDetailsContainerProps {
  data: VaccinationCenterData;
}

export const VCDetailsContainer: FC<VCDetailsContainerProps> = ({ data }) => {
  const { profilePicture } = useProfilePicture(data.profilePicture.filename);
  console.log("data", data);
  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <IllustrationSection imgPath={vcCenterImg} />
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
              <div className="bg-danger  pt-2 " style={{ minHeight: "300px" }}>
                <Card.Title className="mt-3 text-center">
                  Name: {data.name}
                </Card.Title>
                <Card.Text>
                  <h5>
                    {" "}
                    <strong>Email:</strong> {data.email} <br />
                  </h5>
                  <h5>
                    <strong>Phone Number:</strong> {data.phoneNumber} <br />
                  </h5>
                  <h5>
                    <strong>Address:</strong> {data.address} <br />
                  </h5>
                  <h5>
                    <strong>Category:</strong> {data.category} <br />
                  </h5>
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
