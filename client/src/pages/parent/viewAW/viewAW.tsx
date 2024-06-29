import { CommonFooter } from "../../../components/common/footer/footer";
import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { ViewAWTable } from "../../../components/parent/viewAWTable/viewAWTable";
export const ViewAW = () => {
  
  return (
    <div>
      <ParentNavbar />
      <div style={{ minHeight: "600px" }}>
        <div className="tw-my-10  tw-flex tw-justify-center tw-align-middle">
          <h4> Asha Workers</h4>
          
        </div>
        <ViewAWTable />
      </div>
      <CommonFooter />
    </div>
  );
};


