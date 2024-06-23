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
            title="Search for Your Desired Vaccine"
            footer="Search for the vaccine by name to find options available."
            imgPath={bookSlotImg1}
          />
        </Col>
        <Col md={4}>
          <StepCard
            header="Step 2"
            title="Select Your District and Vaccination Center"
            footer="Choose your district to see available vaccination centers and select one."
            imgPath={bookSlotImg2}
          />
        </Col>
        <Col md={4}>
          <StepCard
            header="Step 3"
            title="Find and Book an Appointment Slot"
            footer="Select an available slot and confirm your booking with a chosen date."
            imgPath={bookSlotImg3}
          />
        </Col>
      </Row>
    </>
  );
};
