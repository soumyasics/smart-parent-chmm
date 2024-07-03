import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Image } from "react-bootstrap";
export const ViewCertificateModal = (props: any) => {
  const obj = {
    onHide: props.onHide,
    show: props.show,
  };
  return (
    <Modal
      {...obj}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter ">
          Health Professional Certificate
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image
          className="mx-auto"
          alt="certificate"
          src={
            props?.certificateImg ||
            "https://cdn-payscale.com/content/placeholder-images/certification-placeholder.png"
          }
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
