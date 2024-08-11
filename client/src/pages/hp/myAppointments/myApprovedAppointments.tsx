import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useFetchData } from "../../../hooks/useFetchData";
import { HPNavbar } from "../../../components/hp/hpNavbar/hpNavbar";
export const MyApprovedAppointments = () => {
  const { userId, userType } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { data } = useFetchData(`/getAllSubscriptionByHPId/${userId}`);
  useEffect(() => {
    if (userId && userType === "healthProfessional") {
      // todo => do something
    } else {
      toast.error("Please login as health professional");
      navigate("/hp/login");
    }
  }, [userId, userType]);

  // if (!data || data.length === 0) {
  //   return (
  //     <div className="tw-flex tw-flex-col tw-items-center">
  //       <p className="tw-text-red-500 tw-font-bold">No subscribers found</p>
  //     </div>
  //   );
  // }

  return (
    <div style={{ minHeight: "100vh" }}>
      <HPNavbar />
      {data.length === 0 ? (
        <div className="tw-flex tw-flex-col tw-items-center mt-5">
          <p className="tw-text-red-500 tw-font-bold">No approved appointments found</p>
        </div>
      ) : (
        <>
          <h4 className="text-center text-primary mt-5">Approved Appointments</h4>

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
                <th>Appointment Date</th>
                <th>Appointment Time</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Payment Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((parent: any, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{parent?.parentId?.name}</td>
                    <td>{parent?.date?.substring(0, 10)}</td>
                    <td>{parent?.date?.substring(11, 16)}</td>
                    <td>{parent?.parentId?.name}</td>
                    <td>{parent?.parentId?.email}</td>
                    <td>{parent?.parentId?.phoneNumber}</td>
                    <td>{parent?.subscriptionAmount}</td>
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
