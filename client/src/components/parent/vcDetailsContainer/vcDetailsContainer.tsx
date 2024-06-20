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
  const { profilePicture } = useProfilePicture(data.profilePicture.path);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <IllustrationSection imgPath={vcCenterImg} />
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Image src={data.profilePicture.path} roundedCircle />
              <div>
                <Card.Title>{data.name}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {data.email} <br />
                  <strong>Phone Number:</strong> {data.phoneNumber} <br />
                  <strong>Address:</strong> {data.address} <br />
                  <strong>Category:</strong> {data.category} <br />
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
