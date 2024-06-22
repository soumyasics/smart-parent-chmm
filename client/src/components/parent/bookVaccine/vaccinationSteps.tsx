import { Col, Row } from "react-bootstrap";
import { StepCard } from "../../common/stepCard/stepCard.tsx";
import bookSlotImg1 from "../../../assets/svg/book-slot-img1.svg";
import bookSlotImg2 from "../../../assets/svg/book-slot-img2.svg";
import bookSlotImg3 from "../../../assets/svg/book-slot-img3.svg";
export const VaccinationSteps = () => {
  return (
    <>
      <Row className="mt-5 d-flex">
        <h4 className="text-center" style={{ color: "#007c7c" }}>
          Get Vaccinated in 3 Easy Steps
        </h4>
        <Col md={4}>
          <StepCard
            header="Step 1"
            title="How to Book Your Appointment on Co-WIN?"
            footer="Book an Appointment on Co-WIN or Walk into any Vaccination Center"
            imgPath={bookSlotImg1}
          />
        </Col>
        <Col md={4}>
          <StepCard
            header="Step 1"
            title="How to Book Your Appointment on Co-WIN?"
            footer="Book an Appointment on Co-WIN or Walk into any Vaccination Center"
            imgPath={bookSlotImg2}
          />
        </Col>
        <Col md={4}>
          <StepCard
            header="Step 1"
            title="How to Book Your Appointment on Co-WIN?"
            footer="Book an Appointment on Co-WIN or Walk into any Vaccination Center"
            imgPath={bookSlotImg3}
          />
        </Col>
      </Row>
    </>
  );
};
