import { Table, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { ItemsNotFound } from "../itemsNotFound/itemsNotFound";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const DisplayVaccineBooking = () => {
  const { userType, userId } = useSelector((state: RootState) => state.user);
  const [vaccineBooking, setVaccineBooking] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (userId && userType === "parent") {
      getVaccineBooking(userId);
    } else {
      navigate("/parent/login");
      console.log("Please loggin again");
    }
  }, [userId, userType]);

  const getVaccineBooking = async (parentId: string) => {
    try {
      let res = await axiosInstance.get(`/getBookedSlotsByParent/${parentId}`);
      if (res.status === 200) {
        let data = res.data?.data || [];
        setVaccineBooking(data);
      }
    } catch (error) {
      console.log("Error on getting parent vaccine booking");
      toast.error("Please try again later.");
    }
  };

  return (
    <Container className="my-5" style={{ minHeight: "300px" }}>
      <h2 className="text-center">Booked vaccine slot details </h2>
      {vaccineBooking.length === 0 ? (
        <ItemsNotFound title="You have not booked any vaccines yet." description=""/>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Center Name</th>
              <th>Vaccine name</th>
              <th>Scheduled date</th>
              <th>Phone number</th>
              <th>District</th>
            </tr>
          </thead>
          <tbody>
            {vaccineBooking.length > 0 &&
              vaccineBooking.map((v, index) => {
                return (
                  <tr key={index}>
                    <td>{v?.vaccinationCenterId?.name || ""}</td>
                    <td>{v?.vaccineId?.vaccineName}</td>
                    <td>{v?.bookingDate.substring(0, 10)}</td>
                    <td>{v?.vaccinationCenterId?.phoneNumber}</td>
                    <td>{v?.vaccinationCenterId?.district}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};
