import { Button, Form, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useFetchData } from "../../../hooks/useFetchData";
import { HPNavbar } from "../../../components/hp/hpNavbar/hpNavbar";
import axiosInstance from "../../../apis/axiosInstance";
export const MyPendingAppointments = () => {
  const { userId, userType } = useSelector((state: RootState) => state.user);
  const [filterApp, setFilterApp] = useState<any>([]);
  const navigate = useNavigate();
  const [rejectReqId, setRejectReqId] = useState("");
  const [reasonForRejection, setReasonForRejection] = useState("");
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
      filterData();
    }
  }, [data]);

  const filterData = () => {
    const pendingApp = data.filter(
      (req) => req.appointmentStatus === "pending"
    );
    setFilterApp(pendingApp);
  };

  const approveReq = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      const res = await axiosInstance.post(`/approvedAppointment/${id}`);
      if (res.status === 200) {
        toast.success("Appointment request approved successfully.");
      }
    } catch (error) {
      console.log("Error on approve req", error);
    } finally {
      navigate("/hp/approved-ap");
    }
  };
  const rejectReq = async (id: string) => {
    if (!id) {
      return;
    }
    if (!reasonForRejection) {
      toast.error("Please write the reason for rejection");
      return;
    }

    try {
      const res = await axiosInstance.post(`/rejectAppointment/${id}`, {
        reasonForRejection,
      });
      if (res.status === 200) {
        toast.success("Appointment request rejected successfully.");
      }
    } catch (error) {
      console.log("Error on approve req", error);
    } finally {
      navigate("/hp/rejected-ap");
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <HPNavbar />
      {data.length === 0 ? (
        <div className="tw-flex tw-flex-col tw-items-center mt-5">
          <p className="tw-text-red-500 tw-font-bold">
            No pending appointments found
          </p>
        </div>
      ) : (
        <>
          <h4 className="text-center text-primary mt-5">
            Pending Appointments
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
                <th>Parent Name</th>
                <th>Phone Number</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
                <th>Approve</th>
                <th>Reject</th>
              </tr>
            </thead>
            <tbody>
              {filterApp.map((req: any, i: number) => {
                return (
                  <tr key={req._id}>
                    <td>{i + 1}</td>
                    <td>{req?.parentId?.name}</td>
                    <td>{req?.parentId?.phoneNumber}</td>
                    <td>{req?.date?.substring(0, 10)}</td>
                    <td>{req?.date?.substring(11, 16)}</td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => {
                          approveReq(req._id);
                        }}
                      >
                        Approve
                      </Button>
                    </td>
                    <td>
                      {rejectReqId === req._id ? (
                        <div className="d-flex flex-column">
                          <Form.Control
                            type="text"
                            placeholder="Reason for rejection"
                            onChange={(e) => {
                              setReasonForRejection(e.target.value);
                            }}
                          />
                          <div className="mt-2 d-flex justify-content-between">
                            <Button
                              variant="danger"
                              onClick={() => {
                                rejectReq(req._id);
                              }}
                            >
                              Confirm
                            </Button>
                            <Button
                              className="mt-1"
                              variant="warning"
                              onClick={() => {
                                setRejectReqId("");
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          variant="danger"
                          onClick={() => {
                            setRejectReqId(req._id);
                          }}
                        >
                          Reject
                        </Button>
                      )}
                    </td>
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
