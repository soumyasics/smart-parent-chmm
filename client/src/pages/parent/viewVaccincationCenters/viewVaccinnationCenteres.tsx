import { Button } from "react-bootstrap";
import { CommonFooter } from "../../../components/common/footer/footer";
import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { ViewVaccinationCentersTable } from "../../../components/parent/viewVaccinationCenterTable/viewVaccinationCenterTable";
import { useCustomNavigate } from "../../../hooks/useCustomNavigate";
export const ViewVaccinationCenters = () => {
  const navigateTo = useCustomNavigate();
  const redirectToParentVCChat = () => {
    navigateTo("/parent/chat-vc");
  };
  return (
    <div>
      <ParentNavbar />
      <div style={{ minHeight: "600px" }}>
        <div className="tw-my-10  tw-flex tw-justify-center tw-align-middle">
          <h4> Vaccination Center</h4>
          <Button
            style={{ height: "35px", width: "100px" }}
            className="tw-ml-5"
            onClick={redirectToParentVCChat}
          >
            {" "}
            Chat{" "}
          </Button>
        </div>
        <ViewVaccinationCentersTable />
      </div>
      <CommonFooter />
    </div>
  );
};
