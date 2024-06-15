import { Spinner } from "react-bootstrap";

export const PageLoading = () => {
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="grow" />
    </div>
  );
};

export const PageLoading2 = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};
