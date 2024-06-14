import { CommonFooter } from "../../../components/common/footer/footer";
import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { ViewVaccinationCentersTable } from "../../../components/parent/viewVaccinationCenterTable/viewVaccinationCenterTable";

export const ViewVaccinationCenters = () => {
  return (
    <div>
      <ParentNavbar />
      <div style={{minHeight: "600px"}}>
        <h3 className="tw-my-10 tw-text-center"> All Available Vaccination Center Details</h3>
        <ViewVaccinationCentersTable />
      </div>
      <CommonFooter />
    </div>
  );
};
