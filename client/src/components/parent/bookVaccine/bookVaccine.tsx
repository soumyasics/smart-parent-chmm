import { useState } from "react";
import { CommonFooter } from "../../common/footer/footer";
import { ParentNavbar } from "../parentNavbar/parentNavbar";
import { Col, Row } from "react-bootstrap";
import { DropdownSearch } from "../../common/dropdownSearch/dropdownSearch";
import { DISTRICTS } from "../../../constants/constants.ts";
import { StepCard } from "../../common/stepCard/stepCard.tsx";
import bookSlotImg1 from "../../../assets/svg/book-slot-img1.svg";
import bookSlotImg2 from "../../../assets/svg/book-slot-img2.svg";
import bookSlotImg3 from "../../../assets/svg/book-slot-img3.svg";

export const BookVaccine = () => {
  const [selectedVaccine, setSelectedVaccine] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedVC, setSelectedVC] = useState<string>("");

  const [allVCs, setAllVCs] = useState(["vc1", "vc2"]);
  const [allVaccines, setAllVaccines] = useState([
    "abc",
    "two word",
    "def",
    "ghi",
    "jkl",
    "abcd",
    "mno",
    "pqr",
    "stu",
    "vwxy",
  ]);

  const handleSelectedVaccine = (value: string) => {
    setSelectedVaccine(value);
  };

  const handleDistrictSelection = (value: string) => {
    setSelectedDistrict(value);
  };

  const handleVCSelection = (value: string) => {
    setSelectedVC(value);
  };

  return (
    <div>
      <ParentNavbar />
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
      <div style={{ minHeight: "600px" }}>
        <div className=" mt-4">
          <h4 className="text-center" style={{ color: "#007c7c" }}>
            {" "}
            Find vaccine centers here.
          </h4>

          <Row
            style={{ width: "90%", minHeight: "200px" }}
            className="find-vaccine-box shadow mx-auto py-4 shadow d-flex px-5 justify-content-center align-content-center"
          >
            <Col md={4}>
              {selectedVaccine ? (
                <h5> Vaccine: {selectedVaccine}</h5>
              ) : (
                <h5>Search Vaccine</h5>
              )}

              <DropdownSearch
                placeholder="Search vaccine here."
                items={allVaccines}
                selectItem={handleSelectedVaccine}
              />
            </Col>
            <Col md={4}>
              {selectedDistrict ? (
                <h5> District: {selectedDistrict}</h5>
              ) : (
                <h5>Choose District</h5>
              )}

              <DropdownSearch
                placeholder="Search district here."
                items={DISTRICTS}
                selectItem={handleDistrictSelection}
              />
            </Col>
            <Col md={4}>
              {selectedDistrict ? (
                <h5> Vaccination center: {selectedVC}</h5>
              ) : (
                <h5>Choose Vaccination center</h5>
              )}

              <DropdownSearch
                placeholder="Search vaccination center here."
                items={allVCs}
                selectItem={handleVCSelection}
              />
            </Col>
          </Row>
        </div>
      </div>
      <CommonFooter />
    </div>
  );
};
