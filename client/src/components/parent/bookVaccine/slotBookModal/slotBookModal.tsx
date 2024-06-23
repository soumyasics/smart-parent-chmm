import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FC, useState } from "react";
interface SlotBookModalProps {
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
  confirmBooking: (value: string) => void;
}
export const SlotBookModal: FC<SlotBookModalProps> = ({
  show,
  handleClose,
  confirmBooking,
}) => {
  const [bookingDate, setBookingDate] = useState<string>("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (bookingDate) {
      confirmBooking(bookingDate);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book slot</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Choose slot booking date</Form.Label>
              <Form.Control
                type="date"
                placeholder="name@example.com"
                autoFocus
                required
                onChange={(e) => setBookingDate(e.target.value)}
                value={bookingDate}
              />

              <Form.Control.Feedback type="invalid">
                Please choose a valid date.
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Confirm Booking
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
