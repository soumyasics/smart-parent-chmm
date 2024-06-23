// ActivityForm.js
import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import axiosInstance from "../../../apis/axiosInstance";
import "./addTodoForm.css";
import { ActivityData } from "../../../types/types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isPastDay } from "../../../utils/validation/dateValidation";
import { isOnlyAlphabets } from "../../../utils/validation";
import {toast} from "react-hot-toast";

export const AddTodoForm = () => {
  const [activityName, setActivityName] = useState("");
  const [activityDate, setActivityDate] = useState("");
  const [activityTimeHrs, setActivityTimeHrs] = useState("");
  const [activityTimeMins, setActivityTimeMins] = useState("");
  const navigate = useNavigate();
  // const [activityName, setActivityName] = useState("abc");
  // const [activityDate, setActivityDate] = useState("2024-05-22");
  // const [activityTimeHrs, setActivityTimeHrs] = useState("3");
  // const [activityTimeMins, setActivityTimeMins] = useState("3");

  const [parentId, setParentId] = useState<null | string>(null);
  const { userId } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userId) {
      setParentId(userId);
    } else {
      navigate("/parent/login");
    }
  }, [userId]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission
    let serializedData: ActivityData = {
      activityDate,
      activityName,
      activityTimeHrs,
      activityTimeMins,
      parentId,
    };

    if (
      !activityName ||
      !activityDate ||
      !activityTimeHrs ||
      !activityTimeMins ||
      !parentId
    ) {
      console.log(serializedData, "All fields are required");
      return;
    }

    sendDataToServer(serializedData);
  };

  const resetForm = () => {
    setActivityName("");
    setActivityDate("");
    setActivityTimeHrs("");
    setActivityTimeMins("");
  }

  const sendDataToServer = async (serializedData: ActivityData) => {
    try {
      let res = await axiosInstance.post("addToDo", serializedData);
      if (res.status === 201) {
        toast.success("Item Added Successfully");
        resetForm()
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errStatus = error.response?.status;
        if (errStatus === 400 || errStatus === 500) {
          toast.error("Internal Server Error");
        }
        console.log("Error on send activity data to server", error);
      } else {
        console.log("Unknown error", error);
      }
    }
  };

  const handleActivityDateChange = (e: any) => {
    const isPreviousDay: boolean = isPastDay(e.target.value);
    if (isPreviousDay) {
      toast.error("Activity date cannot be in the past");
      return;
    }
    setActivityDate(e.target.value);
  };

  const handleActivityNameChange = (e: any) => {
    const activity = e.target.value;
    if (isOnlyAlphabets(activity)) {
      setActivityName(activity);
    }
  };

  const handleActivityHours = (e: any) => {
    const hour = e.target.value;

    if (hour.length > 2 || hour > 23 || hour < 0) {
      toast.error("Hours must be between 0 and 24");
      return;
    }
    setActivityTimeHrs(hour);
  };
  const handleActivityMins = (e: any) => {
    const mins = e.target.value;

    if (mins.length > 2 || mins > 59 || mins < 0) {
      toast.error("Minutes must be between 0 and 60");
      return;
    }
    setActivityTimeMins(mins);
  };

  return (
    <Container className="form-container">
      <h2 className="form-header">Activity Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formActivityName">
          <Form.Label>Activity Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter activity name"
            value={activityName}
            onChange={handleActivityNameChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formActivityDate mt-5">
          <Form.Label className="mt-2">Activity Date</Form.Label>
          <Form.Control
            type="date"
            value={activityDate}
            onChange={handleActivityDateChange}
            required
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="formActivityTimeHrs">
              <Form.Label>Activity Time (Hours)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Hrs"
                value={activityTimeHrs}
                onChange={handleActivityHours}
                required
                min="0"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formActivityTimeMins">
              <Form.Label>Activity Time (Minutes)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Mins"
                value={activityTimeMins}
                onChange={handleActivityMins}
                required
                min="0"
                max="59"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="form-button mt-5">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};
