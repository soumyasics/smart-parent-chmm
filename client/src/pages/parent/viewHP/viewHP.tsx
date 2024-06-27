import { CommonFooter } from "../../../components/common/footer/footer";
import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { ViewHPTable } from "../../../components/parent/viewHPTable/viewHPTable";
export const ViewHP = () => {
  return (
    <div>
      <ParentNavbar />
      <div style={{ minHeight: "600px" }}>
        <div className="tw-my-10  tw-flex tw-justify-center tw-align-middle">
          <h4> Health Professionals</h4>
        </div>
        <ViewHPTable />
      </div>
      <CommonFooter />
    </div>
  );
};
