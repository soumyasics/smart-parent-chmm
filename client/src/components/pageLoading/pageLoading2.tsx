import { Spinner } from "react-bootstrap";

export const PageLoading2 = () => {
  return (
    <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
  );
};
