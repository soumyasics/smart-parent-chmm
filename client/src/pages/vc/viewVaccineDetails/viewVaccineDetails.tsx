import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { FC } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Col, Row, Table } from "react-bootstrap";

interface ViewVaccineDetails {
  vaccineId: string;
  showVaccinesPage: () => void;
}

export const ViewVaccineDetails: FC<ViewVaccineDetails> = ({
  vaccineId,
  showVaccinesPage,
}) => {
  const [vaccineDetails, setVaccineDetails] = useState<any>(null);
  const [bookedParents, setBookedParents] = useState<any[]>([]);

  const getVaccineDetails = async () => {
    try {
      const res = await axiosInstance(`getVaccineById/${vaccineId}`);
      const data = res?.data?.data || null;
      const parents = data?.bookedParents || [];
      console.log("data", data);
      setVaccineDetails(data);
      setBookedParents(parents);
      console.log("parents", parents);
    } catch (error) {
      console.log("Error on get vaccine details", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };
  useEffect(() => {
    if (vaccineId) {
      getVaccineDetails();
    }
  }, [vaccineId]);

  console.log("vac ", vaccineDetails);
  return (
    <div>
      <IoIosArrowBack
        className="fs-3"
        style={{ cursor: "pointer" }}
        onClick={showVaccinesPage}
      />
      <h4 className="text-center text-success">Vaccine Details </h4>
      <div className="mt-5 shadow p-4">
        <Row className="m-auto" style={{ width: "90%" }}>
          <Col md={6}>
            <p>
              <span className="fw-bold"> Vaccinne Name:</span>{" "}
              {vaccineDetails?.vaccineName}
            </p>

            <p>
              {" "}
              <span className="fw-bold"> Total Slot:</span>{" "}
              {vaccineDetails?.totalSlots}
            </p>
            <p>
              {" "}
              <span className="fw-bold"> Dosage (ML):</span>{" "}
              {vaccineDetails?.dosageMl}
            </p>
          </Col>
          <Col md={6}>
            <p>
              {" "}
              <span className="fw-bold"> Age Group:</span>{" "}
              {vaccineDetails?.ageGroup}
            </p>
            <p>
              {" "}
              <span className="fw-bold"> Booked slots:</span>{" "}
              {vaccineDetails?.bookedSlots}
            </p>
            <p>
              {" "}
              <span className="fw-bold"> Expiry Date:</span>{" "}
              {vaccineDetails?.expiryDate?.substring(0, 10)}
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="m-auto mt-5" style={{ width: "90%" }}>
            <h6 className="text-center">About </h6>
            <p className="text-center"> {vaccineDetails?.vaccineDescription}</p>
          </Col>
        </Row>
      </div>
      <div className="mt-5">
        <h4 className=" text-center text-success">Booking Details</h4>
        <Table
          bordered
          striped
          style={{ width: "90%" }}
          className="m-auto mt-3"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {bookedParents.map((p) => {
              return (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.phoneNumber}</td>
                  <td>{p.address}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
