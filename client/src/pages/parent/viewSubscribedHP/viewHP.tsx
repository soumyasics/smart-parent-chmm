import { Button } from "react-bootstrap";
import { CommonFooter } from "../../../components/common/footer/footer";
import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { useCustomNavigate } from "../../../hooks/useCustomNavigate";
import { ViewSubscribedHPTable } from "../../../components/parent/viewSubscribedHPTable/viewHPTable";

export const ViewSubscribedHP = () => {
  const navigateTo = useCustomNavigate();
  const redirectToParentVCChat = () => {
    navigateTo("/parent/chat-vc");
  };
  return (
    <div>
      <ParentNavbar />
      <div style={{ minHeight: "600px" }}>
        <div className="tw-my-10  tw-flex tw-justify-center tw-align-middle">
          <h4 className="text-success"> Subscribed Health Professionals</h4>
          <Button
            style={{ height: "35px", width: "100px" }}
            className="tw-ml-5"
            onClick={redirectToParentVCChat}
          >
            {" "}
            Chat{" "}
          </Button>
        </div>
        <ViewSubscribedHPTable />
      </div>
      <CommonFooter />
    </div>
  );
};
