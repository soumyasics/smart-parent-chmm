import { Button } from "react-bootstrap";
import { CommonFooter } from "../../../components/common/footer/footer";
import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { useCustomNavigate } from "../../../hooks/useCustomNavigate";
import { ViewAppointmentHPTable } from "../../../components/parent/viewSubscribedHPTable/viewHPTable";

export const ViewAppointmentHPs = () => {
  const navigateTo = useCustomNavigate();
  const redirectToParentHPChat = () => {
    navigateTo("/parent/chat-hp");
  };
  return (
    <div>
      <ParentNavbar />

      <div style={{ minHeight: "600px" }}>
        <div className="tw-my-10  tw-flex tw-justify-center tw-align-middle">
          <h4 className="text-success"> My appointments</h4>
          <Button
            style={{ height: "35px", width: "100px" }}
            className="tw-ml-5"
            onClick={redirectToParentHPChat}
          >
            {" "}
            Chat{" "}
          </Button>
        </div>
        <ViewAppointmentHPTable />
      </div>
      <CommonFooter />
    </div>
  );
};
