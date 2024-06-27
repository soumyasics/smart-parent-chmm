import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../apis/axiosInstance";
import axios from "axios";
import { capitalizeFirstLetter } from "../../../../utils/modification/capitalizeFirstLetter";
interface SlotBookModalProps {
  show: boolean;
  handleClose: () => void;
  confirmBooking: (value: string) => void;
  bookingDate: string;
  changeBookingDate: (value: string) => void;
}
export const SlotBookModal: FC<SlotBookModalProps> = ({
  show,
  handleClose,
  confirmBooking,
  bookingDate,
  changeBookingDate,
}) => {
  const [childData, setChildData] = useState([]);
  const [error, setError] = useState<null | string>(null);
  const { userId, userType } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  console.log("=>", error, isLoading)

  useEffect(() => {
    if (userId && userType === "parent") {
      getChildDataFromDB();
    } else {
      toast.error("Please login as parent");
      navigate("/parent/login");
    }
  }, [userId, userType]);

  const getChildDataFromDB = async () => {
    try {
      const res = await axiosInstance.get(`/getAllKidsByParentId/${userId}`);
      if (res.status === 200) {
        setChildData(res.data?.data);
      } else {
        throw new Error(`Unexpected error occurred, status: ${res.status}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || null;
        if (status === 400 || status === 500) {
          setError(error.response?.data?.message);
        } else {
          setError("Please check your network!");
        }
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

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
                onChange={(e) => changeBookingDate(e.target.value)}
                value={bookingDate}
              />
              <Form.Label className="mt-3">Choose your kid</Form.Label>

              <Form.Select>
                {childData?.map((child: any) => (
                  <option key={child?._id} value={child?._id}>
                    {capitalizeFirstLetter(child?.name)}
                  </option>
                ))}
              </Form.Select>

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
