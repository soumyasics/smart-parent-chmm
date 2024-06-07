import { Alert, Image } from "react-bootstrap";
import errorImg from "../../../assets/error-1.jpg";
export const ErrorHandlingUI = ({
  error = "Something went wrong, please try again.",
}) => {
  return (
    <div>
    
      <div className="d-flex justify-content-center" style={{ width: "100%" }}>
        <Image
          src={errorImg}
          alt="Error"
          style={{ width: "300px" }}
          className=""
        />
      </div>
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    </div>
  );
};
