import { Spinner } from "react-bootstrap";

export const PageLoading2 = () => {
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" role="status" variant="light">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
export const PageLoadingDark = () => {
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="grow" variant="dark" />
    </div>
  );
};
