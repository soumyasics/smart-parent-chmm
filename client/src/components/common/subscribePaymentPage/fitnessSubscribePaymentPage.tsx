import { Image } from "react-bootstrap";
import { ParentNavbar } from "../../parent/parentNavbar/parentNavbar";
import { CommonFooter } from "../footer/footer";
import { FitnessPaymentForm } from "./fitnessPaymentComponent.tsx";
export const FitnessPaymentPage = () => {``
  return (
    <div>
      <ParentNavbar />
      <div
        style={{ minHeight: "600px" }}
        className=" d-flex justify-content-between"
      >
        <div className="p-5">
          <FitnessPaymentForm />
        </div>
        <div
          style={{ maxHeight: "29rem" }}
          className="w-50 payment-page-img-section d-flex justify-content-center align-items-center mt-5"
        >
          <Image
            className="w-75"
            src="https://img.freepik.com/free-vector/flat-receiving-cashback-bonus-from-paying-online_88138-766.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709251200&semt=ais"
          />
        </div>
      </div>

      <div>
        <CommonFooter />
      </div>
    </div>
  );
};
