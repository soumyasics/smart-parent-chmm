import { useEffect, useState } from "react";
import { CommonFooter } from "../../common/footer/footer";
import { ParentNavbar } from "../parentNavbar/parentNavbar";
import { Col, Row } from "react-bootstrap";
import { DropdownSearch } from "../../common/dropdownSearch/dropdownSearch";
import { DISTRICTS } from "../../../constants/constants.ts";
import { VaccinationSteps } from "./vaccinationSteps.tsx";
import { useFetchData } from "../../../hooks/useFetchData.ts";
import axiosInstance from "../../../apis/axiosInstance.ts";
import { toast } from "react-hot-toast";
import { IoIosRefresh } from "react-icons/io";
import axios from "axios";
import { DisplaySlots } from "./displaySlot/displaySlots.tsx";

interface FindSlot {
  vaccineName: string;
  vaccineCenterName: string;
}
export const BookVaccine = () => {
  const [selectedVaccine, setSelectedVaccine] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedVC, setSelectedVC] = useState<string>("");
  const [availbleDistricts, setAvailbleDistricts] = useState<string[]>([]);
  const [allVaccines, setAllVaccines] = useState<any[]>([]);
  const [allAvailableVCs, setAllAvailableVCs] = useState<any[]>([]);
  const [allVCNames, setAllVCNames] = useState<string[]>([]);
  const [allVaccineNames, setAllVaccineNames] = useState<string[]>([]);
  const [searchVaccine, setSearchVaccinne] = useState<string>("");
  const [searchDistrict, setSearchDistrict] = useState<string>("");
  const [searchVC, setSearchVC] = useState<string>("");
  const [slots, setSlots] = useState<any[]>([]);
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
  };

  // findslot logics
  const findSlot = () => {
    if (selectedVaccine && selectedDistrict && selectedVC) {
      const data = {
        vaccineName: selectedVaccine,
        vaccineCenterName: selectedVC,
      };
      getSlotsData(data);
    } else {
      toast.error("Please select all the fields");
    }
  };

  const getSlotsData = async (data: FindSlot) => {
    try {
      const res = await axiosInstance.post(
        "getVaccinesByNameAndCenterName",
        data
      );
      if (res.status === 200) {
        const slots = res.data.data;
        setSlots(slots);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const msg = error?.response?.data?.message || "Something went wrong";
        toast.error(msg);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <div>
      <ParentNavbar />
      <VaccinationSteps />

      <div style={{ minHeight: "600px" }}>
        <div className="mt-4">
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
                <h5 className="text-center">Search Vaccine</h5>
              )}

              <DropdownSearch
                placeholder="Search vaccine here."
                items={allVaccineNames}
                selectItem={handleSelectedVaccine}
                searchedItem={searchVaccine}
                updateSearchedItem={updateVaccineSearch}
              />
              <div className="mt-3 d-flex justify-content-center fs-3">
                <IoIosRefresh
                  onClick={resetSearch}
                  style={{ cursor: "pointer" }}
                />
              </div>
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
                <div>
                  <button className="btn btn-primary mt-3" onClick={findSlot}>
                    Find Slot
                  </button>
                </div>
              </Col>
            )}
          </Row>
        </div>
        <div>
          <DisplaySlots slots={slots}/>
        </div>
      </div>
      <CommonFooter />
    </div>
  );
};
