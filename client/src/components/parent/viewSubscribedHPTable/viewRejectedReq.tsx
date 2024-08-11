import { Button, Form, Table } from "react-bootstrap";
import { useFetchData } from "../../../hooks/useFetchData";
import { PageLoading } from "../../pageLoading/pageLoading";
import { ErrorHandlingUI } from "../../common/errorHandlingUI/errorHandlingUi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";

export const ViewRejectedReqs = ({  changeStatus }: any) => {
  const { userId } = useSelector((state: RootState) => state.user);
  const {
    isLoading,
    data: allHPs,
    error,
  } = useFetchData(`/getAllSubscriptionByParentId2/${userId}`);
  const navigate = useNavigate();
  const [filterReq, setFilterReq] = useState<any>([])
  const navigateToHPDetails = (id: string) => {
    if (id) {
      navigate(`/parent/view-hp/${id}`);
    } else {
      console.log("Id not found!");
    }
  };

  useEffect(() => {
    if (allHPs && allHPs.length > 0) {
      filterData()
    }
  }, [allHPs])
  const filterData = () => {
    const pendingApp = allHPs.filter(
      (req) => req.appointmentStatus === "rejected"
    );
    setFilterReq(pendingApp);
  };


  if (isLoading) {
    return (
      <div>
        <PageLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <ErrorHandlingUI />
      </div>
    );
  }

  return (
    <div>
      <div className="w-75 mx-auto d-flex justify-content-around">
        <Button onClick={() => {
          changeStatus("pending")
        }} variant="dark">Pending</Button>
        <Button onClick={() => {
          changeStatus("approved")
        }} variant="success">Approved</Button>
        <Button onClick={() => {
          changeStatus("rejected")
        }} variant="danger">Rejected</Button>
      </div>
      <Table
        className="tw-m-auto mt-5"
        bordered
        striped
        style={{ width: "90%" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Category</th>
            <th>Rejected Reason</th>
            <th>View More</th>
          </tr>
        </thead>

        <tbody>
          {filterReq.map((hp: any) => {
            if (hp?.healthProfessionalId.isActive === "suspended") {
              return null;
            }
            if (hp?.healthProfessionalId.category === "Fitness Specialist") {
              return null;
            }
            console.log("hp", hp)
            return (
              <tr key={hp._id}>
                <td>{hp?.healthProfessionalId?.name}</td>
                <td>{hp?.healthProfessionalId?.phoneNumber}</td>
                <td>{hp?.date?.substring(0, 10)}</td>
                <td>{hp?.date?.substring(11, 16)}</td>
                <td>{hp?.healthProfessionalId?.category}</td>
                <td>{hp?.reasonForRejection}</td>
                <td>
                  <Button
                    onClick={() => {
                      navigateToHPDetails(hp?.healthProfessionalId?._id);
                    }}
                  >
                    {" "}
                    View More
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
