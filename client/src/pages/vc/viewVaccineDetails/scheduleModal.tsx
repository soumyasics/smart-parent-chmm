import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { toast } from "react-hot-toast";
import { Form } from "react-bootstrap";
import axiosInstance from "../../../apis/axiosInstance";
interface ScheduleDataType {
  vaccinationCenterId: string;
  parentId: string;
  nextBookingDate: string;
  message: string;
}
export const ScheduleModal = ({ show, onHide, parentId }: any) => {
  const { userId } = useSelector((state: RootState) => state.user);
  const propsObj = { show, onHide };
  const [scheduleType, setScheduleType] = useState<ScheduleDataType>({
    vaccinationCenterId: "",
    parentId: "",
    nextBookingDate: "",
    message: "",
  });
  useEffect(() => {
    if (parentId && userId) {
      setScheduleType({
        vaccinationCenterId: userId,
        parentId: parentId,
        nextBookingDate: "",
        message: "",
      });
    } else {
      console.log("parnet id", parentId);
    }
  }, [parentId, userId]);

  const handleChanges = (e: any) => {
    const { name, value } = e.target;
    setScheduleType((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!scheduleType.nextBookingDate) {
      toast.error("Please enter next vaccination date");
      return;
    }
    if (!scheduleType.message) {
      toast.error("Please enter message");
      return;
    }
    console.log("schedule type", scheduleType);

    sendDataToServer(scheduleType);

    clearMsgAndDate();

    onHide();
  };
  const clearMsgAndDate = () => {
    setScheduleType((prev) => ({
      ...prev,
      nextBookingDate: "",
      message: "",
    }));
  };

  const sendDataToServer = async (data: ScheduleDataType) => {
    try {
      const res = await axiosInstance.post(
        "vaccinationScheduleController",
        data
      );
      if (res.status === 200) {
        toast.success("Vaccine scheduled successfully");
      } else {
        toast.error("Some issues occured, please try again");
      }
    } catch (error) {
      console.log("Error on send data to server", error);
    }
  };
  console.log("schedule type", scheduleType);
  return (
    <Modal
      {...propsObj}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Next vaccine schedule
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Next vaccine</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChanges}
              name="message"
              value={scheduleType?.message}
              placeholder="Next vaccine "
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Next vaccination date</Form.Label>
            <Form.Control
              type="date"
              onChange={handleChanges}
              name="nextBookingDate"
              value={scheduleType?.nextBookingDate}
              placeholder="Next vaccination date"
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button variant="success" type="submit">
              Send
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
