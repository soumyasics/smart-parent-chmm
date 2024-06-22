import { useEffect, useState } from "react";
import { CommonFooter } from "../../common/footer/footer";
import { ParentNavbar } from "../parentNavbar/parentNavbar";
import { Col, Row } from "react-bootstrap";
import { DropdownSearch } from "../../common/dropdownSearch/dropdownSearch";
import { DISTRICTS } from "../../../constants/constants.ts";
import { StepCard } from "../../common/stepCard/stepCard.tsx";
import bookSlotImg1 from "../../../assets/svg/book-slot-img1.svg";
import bookSlotImg2 from "../../../assets/svg/book-slot-img2.svg";
import bookSlotImg3 from "../../../assets/svg/book-slot-img3.svg";
import { useFetchData } from "../../../hooks/useFetchData.ts";
import axiosInstance from "../../../apis/axiosInstance.ts";
import { toast } from "react-hot-toast";
import { IoIosRefresh } from "react-icons/io";
export const BookVaccine = () => {
  const [selectedVaccine, setSelectedVaccine] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedVC, setSelectedVC] = useState<string>("");
  const [availbleDistricts, setAvailbleDistricts] = useState<string[]>([]);

  const [allVaccines, setAllVaccines] = useState<any[]>([]);
  const [fixedVCs, setFixedVCs] = useState([]);
  const [allAvailableVCs, setAllAvailableVCs] = useState<any[]>([]);
  const [allVCNames, setAllVCNames] = useState<string[]>([]);
  const [allVaccineNames, setAllVaccineNames] = useState<string[]>([]);
  const [searchVaccine, setSearchVaccinne] = useState<string>("");
  const [searchDistrict, setSearchDistrict] = useState<string>("");
  const [searchVC, setSearchVC] = useState<string>("");
  const { data } = useFetchData(`getAllVaccines`);

  const updateVaccineSearch = (value: string) => {
    setSearchVaccinne(value);
  };

  const updateDistrictSearch = (value: string) => {
    setSearchDistrict(value);
  };

  const updateVCSearch = (value: string) => {
    setSearchVC(value);
  };

  useEffect(() => {
    setAvailbleDistricts(DISTRICTS);
    getAllVaccineCenters();
    if (data) {
      setAllVaccines(data);
      const names = data.map((vaccine: any) => vaccine.vaccineName);
      setAllVaccineNames(names);
    }
  }, [data]);

  // whenever avialble vaccination centers change that time vc name will also change
  useEffect(() => {
    const vcNames = allAvailableVCs.map((v) => v.name);
    setAllVCNames(vcNames);
  }, [allAvailableVCs]);

  const handleSelectedVaccine = (vaccineName: string) => {
    setSelectedVaccine(vaccineName);
    findAvailableDistricts(vaccineName);
    updateDistrictSearch("");
    updateVCSearch("");
    setSelectedDistrict("");
    setSelectedVC("");
  };

  const findAvailableDistricts = (vaccineName: string) => {
    const allVaccinesHaveSameName = allVaccines.filter(
      (v) => v.vaccineName === vaccineName
    );
    const vaccineAvailableCenters = allVaccinesHaveSameName.map(
      (v) => v.vaccinationCenterId
    );
    const avilableDist = vaccineAvailableCenters.map((v) => v.district);
    setAvailbleDistricts(avilableDist);
    setAllAvailableVCs(vaccineAvailableCenters);
  };

  const handleDistrictSelection = (district: string) => {
    setSelectedDistrict(district);
    findAvailableVCs(district);

    updateVCSearch("");
    setSelectedVC("");
  };

  const findAvailableVCs = async (district: string) => {
    const allVaccinesHaveSameName = allVaccines.filter(
      (v) => v.vaccineName === selectedVaccine
    );
    const vaccineAvailableCenters = allVaccinesHaveSameName.map(
      (v) => v.vaccinationCenterId
    );

    const allVCsWithSelectedDistrict = vaccineAvailableCenters.filter(
      (v) => v.district === district
    );
    setAllAvailableVCs(allVCsWithSelectedDistrict);
  };

  const getAllVaccineCenters = async () => {
    try {
      const res = await axiosInstance.get("/getAllVaccines");
      if (res.status === 200) {
        const data = res.data?.data || [];
        data;
      } else {
        throw new Error("Something went wrong. Please try again later");
      }
    } catch (error: unknown) {
      console.log("Error on getting all vaccine centers", error);
      toast.error("Error on getting all vaccine centers");
    }
  };

  const handleVCSelection = (value: string) => {
    setSelectedVC(value);
  };

  const resetSearch = () => {
    setSearchVaccinne("");
    setSearchDistrict("");
    setSearchVC("");
    setSelectedDistrict("");
    setSelectedVaccine("");
    setSelectedVC("");
    setAvailbleDistricts(DISTRICTS);
    getAllVaccineCenters();
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
                items={allVaccineNames}
                selectItem={handleSelectedVaccine}
                searchedItem={searchVaccine}
                updateSearchedItem={updateVaccineSearch}
              />
            </Col>

            {selectedVaccine && (
              <Col md={4}>
                {selectedDistrict ? (
                  <h5> District: {selectedDistrict}</h5>
                ) : (
                  <h5>Choose District</h5>
                )}

                <DropdownSearch
                  placeholder="Search district here."
                  items={availbleDistricts}
                  selectItem={handleDistrictSelection}
                  searchedItem={searchDistrict}
                  updateSearchedItem={updateDistrictSearch}
                />

                <div className="mt-3 d-flex justify-content-center fs-3">
                  <IoIosRefresh
                    onClick={resetSearch}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </Col>
            )}
            {selectedDistrict && (
              <Col md={4}>
                {selectedDistrict ? (
                  <h5> Vaccination center: {selectedVC}</h5>
                ) : (
                  <h5>Choose Vaccination center</h5>
                )}

                <DropdownSearch
                  placeholder="Search vaccination center here."
                  items={allVCNames}
                  selectItem={handleVCSelection}
                  searchedItem={searchVC}
                  updateSearchedItem={updateVCSearch}
                />
              </Col>
            )}
          </Row>
        </div>
      </div>
      <CommonFooter />
    </div>
  );
};
