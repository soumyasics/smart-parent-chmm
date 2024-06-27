import { AWNavbar } from "../../../components/aw/awNavbar/awNavbar";
import { CommonFooter } from "../../../components/common/footer/footer";
import { ViewParentTable } from "./viewParentTable";

export const ViewParentAW = () => {
  return (
    <div>
      <AWNavbar />
      <div style={{ minHeight: "500px" }}>
        <ViewParentTable />
      </div>
      <div className="mt-5">
        <CommonFooter />
      </div>
    </div>
  );
};
