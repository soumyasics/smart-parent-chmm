import { Button } from "react-bootstrap";
import { CommonFooter } from "../../../components/common/footer/footer";
import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { useCustomNavigate } from "../../../hooks/useCustomNavigate";
import { ViewAppointmentHPTable } from "../../../components/parent/viewSubscribedHPTable/viewHPTable";
import { useState } from "react";
import { ViewApprovedAppointmentHPTable } from "../../../components/parent/viewSubscribedHPTable/viewApprovedReq";
import { ViewRejectedReqs } from "../../../components/parent/viewSubscribedHPTable/viewRejectedReq";

export const ViewAppointmentHPs = () => {
  const navigateTo = useCustomNavigate();
  const [status, setStatus] = useState("pending");
  const redirectToParentHPChat = () => {
    navigateTo("/parent/chat-hp");
  };
  const changeStatus = (newStatus: string) => {
    setStatus(newStatus);
  };
  return (
    <div>
      <ParentNavbar />

      <div style={{ minHeight: "600px" }}>
        <div className="tw-my-10  tw-flex tw-justify-center tw-align-middle">
          {status === "pending" ? (
            <h4 className="text-success"> Pending Appointments</h4>
          ) : status === "approved" ? (
            <h4 className="text-success"> Approved Appointments</h4>
          ) : (
            <h4 className="text-success"> Rejected Appointments</h4>
          )}

          <Button
            style={{ height: "35px", width: "100px" }}
            className="tw-ml-5"
            onClick={redirectToParentHPChat}
          >
            {" "}
            Chat{" "}
          </Button>
        </div>
        {status === "pending" ? (
          <ViewAppointmentHPTable changeStatus={changeStatus} />
        ) : status === "approved" ? (
          <ViewApprovedAppointmentHPTable changeStatus={changeStatus} />
        ) : (
          <ViewRejectedReqs changeStatus={changeStatus} />
        )}
      </div>
      <CommonFooter />
    </div>
  );
};
