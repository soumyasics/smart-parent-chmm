import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useFetchData } from "../../../hooks/useFetchData";
import { HPNavbar } from "../../../components/hp/hpNavbar/hpNavbar";
export const MyRejectedAppointments = () => {
  const { userId, userType } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [filterApp, setFilterApp] = useState<any>([]);
  const { data } = useFetchData(`/getAllSubscriptionByHPId/${userId}`);
  useEffect(() => {
    if (userId && userType === "healthProfessional") {
      // todo => do something
    } else {
      toast.error("Please login as health professional");
      navigate("/hp/login");
    }
  }, [userId, userType]);

  useEffect(() => {
    if (data && data.length > 0) {
      const rej = data.filter((req) => req.appointmentStatus === "rejected");
      setFilterApp(rej);
    }
  }, [data]);
  return (
    <div style={{ minHeight: "100vh" }}>
      <HPNavbar />
      {data.length === 0 ? (
        <div className="tw-flex tw-flex-col tw-items-center mt-5">
          <p className="tw-text-red-500 tw-font-bold">
            No rejected appointments found
          </p>
        </div>
      ) : (
        <>
          <h4 className="text-center text-primary mt-5">
            Rejected Appointments
          </h4>

          <Table
            responsive
            className="my-subscriptions-table mt-5 mx-auto"
            style={{ width: "90%" }}
            bordered
            striped
            hover
          >
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
                <th>Rejected Reason</th>
              </tr>
            </thead>
            <tbody>
              {filterApp.map((parent: any, i: number) => {
                return (
                  <tr key={parent._id}>
                    <td>{i + 1}</td>
                    <td>{parent?.parentId?.name}</td>
                    <td>{parent?.parentId?.phoneNumber}</td>
                    <td>{parent?.parentId?.email}</td>
                    <td>{parent?.date?.substring(0, 10)}</td>
                    <td>{parent?.date?.substring(11, 16)}</td>
                    <td>{parent?.reasonForRejection}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};
