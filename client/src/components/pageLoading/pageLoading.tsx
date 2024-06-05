import { Spinner } from "react-bootstrap";

export const PageLoading = () => {
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="grow" />
    </div>
  );
};
