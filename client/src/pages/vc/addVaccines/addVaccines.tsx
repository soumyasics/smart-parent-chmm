import { CommonFooter } from "../../../components/common/footer/footer";
import { VCNavbar } from "../../../components/vc/vcNavbar/vcNavbar";
import { AddVaccineForm } from "./addVaccinesForm";

export const AddVaccines = () => {
  return (
    <div>
      <VCNavbar />
      <div style={{ minHeight: "600px" }}>
        <h2 className="mb-4 text-center mt-4">Add New Vaccine</h2>
        <AddVaccineForm />
      </div>
      <CommonFooter />
    </div>
  );
};
