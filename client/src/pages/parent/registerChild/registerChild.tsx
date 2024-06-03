import { CommonFooter } from "../../../components/common/footer/footer";
import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { RegisterKidForm } from "./registerKidForm";

export const RegisterChild = () => {
  return (
    <div>
      <ParentNavbar />
      <div style={{ minHeight: "600px" }}>
        <RegisterKidForm />
      </div>
      <CommonFooter />
    </div>
  );
};
