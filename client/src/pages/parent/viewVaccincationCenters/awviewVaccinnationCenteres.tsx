import { CommonFooter } from "../../../components/common/footer/footer";
import { AWNavbar } from "../../../components/aw/awNavbar/awNavbar";
import { AWViewVaccinationCentersTable } from "../../../components/parent/viewVaccinationCenterTable/awviewVaccinationCenterTable";
export const AWViewVaccinationCenters = () => {
  return (
    <div>
      <AWNavbar />
      <div style={{ minHeight: "600px" }}>
        <div className="tw-my-10  tw-flex tw-justify-center tw-align-middle">
          <h4> Vaccination Center</h4>
        </div>
        <AWViewVaccinationCentersTable />
      </div>
      <CommonFooter />
    </div>
  );
};
