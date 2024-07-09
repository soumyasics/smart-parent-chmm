import { FC } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { VaccinationCenterData } from "../../../types/userTypes";
import { IllustrationSection } from "../../common/illustration/illustration";
import vcCenterImg from "../../../assets/vc-center.jpg";
import { useProfilePicture } from "../../../hooks/useProfilePicture";
import { useNavigate } from "react-router-dom";
interface VCDetailsContainerProps {
  data: VaccinationCenterData;
}

export const VCDetailsContainer: FC<VCDetailsContainerProps> = ({ data }) => {
  const navigate = useNavigate();
  const { profilePicture } = useProfilePicture(data?.profilePicture?.filename);
  return (
    <Container className="mt-5">
      <h3 className="text-center text-primary shadow">
        Vaccination Center Details
      </h3>
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
              <div className="shadow p-2" style={{ minHeight: "300px" }}>
                <Card.Title className="mt-3 text-center">
                  Name: {data?.name}
                </Card.Title>
                <Card.Text>
                  <p>
                    {" "}
                    <strong>Email:</strong> {data?.email} <br />
                  </p>
                  <p>
                    <strong>Phone Number:</strong> {data?.phoneNumber} <br />
                  </p>
                  <p>
                    <strong>Address:</strong> {data?.address} <br />
                  </p>
                  <p>
                    <strong>Category:</strong> {data?.category} <br />
                  </p>
                  <p>
                    <strong>Distrcit:</strong> {data?.district} <br />
                  </p>
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Container className="d-flex flex-wrap gap-5 mt-5">
        {data.vaccines.length > 0 &&
          data?.vaccines?.map((vaccine: any) => {
            return (
              <Card
                className="shadow"
                key={vaccine?._id}
                style={{ width: "18rem" }}
              >
                <Card.Body>
                  <div style={{height: "250px"}}>
                    <Card.Title>
                      Vaccine Name: {vaccine?.vaccineName}
                    </Card.Title>

                    <p>
                      <strong>Dosage: (ml) </strong> {vaccine?.dosageMl}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {vaccine?.vaccineDescription}
                    </p>
                    <p>
                      <strong>Booked Slots:</strong> {vaccine?.bookedSlots}
                    </p>
                    <p>
                      <strong>Age Group:</strong> {vaccine?.ageGroup}
                    </p>
                  </div>
                  <div className="d-flex mt-5 justify-content-center">
                    <Button
                      onClick={() => {
                        navigate("/parent/book-vaccine");
                      }}
                      variant="primary"
                    >
                      Book Slot
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
      </Container>
    </Container>
  );
};
