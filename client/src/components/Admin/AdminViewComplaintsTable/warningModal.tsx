import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FC } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
interface WarningModelProps {
  HPId: string;
  handleClose: () => void;
  handleShow: () => void;
  show: boolean;
}

export const WarningModal: FC<WarningModelProps> = ({
  HPId,
  handleClose,
  show,
}) => {
  const [warningMsg, setWarningMsg] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!warningMsg) {
      toast.error("Please provide a message");
      return;
    }
    if (!HPId) {
      toast.error("Try again.");
      return;
    }

    sendDataToServer({ HPId, warningMsg });
  };
  const sendDataToServer = async (data: {
    HPId: string;
    warningMsg: string;
  }) => {
    try {
      const res = await axiosInstance.post("sendWarning", data);
      console.log("ress", res);
      if (res.status === 200) {
        toast.success("Warning sent successfully");
      }
    } catch (error) {
      console.log("error ", error);
      toast.error("Please try again.");
      navigate("/admin/dashboard");
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send warning message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Message</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Type message.."
                autoFocus
                onChange={(e) => setWarningMsg(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-center w-100">
              <Button className="mx-auto" variant="primary" type="submit">
                Send
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
