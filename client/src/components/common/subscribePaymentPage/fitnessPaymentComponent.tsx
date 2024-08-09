import { useEffect, useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./payment-page.css";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import axiosInstance from "../../../apis/axiosInstance";
import axios from "axios";
import { isOnlyAlphabets, isOnlyNumbers } from "../../../utils/validation";
import { HPData } from "../../../pages/parent/chatWithHP/types";

interface SubscriptionDataType {
  parentId: string;
  healthProfessionalId: string;
  cardHolderName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVV: string;
  date: string;
  subscriptionAmount: number;
}
export const FitnessPaymentForm = () => {
  const [validated, setValidated] = useState(false);
  const [hpData, setHPData] = useState<null | HPData>(null);

  const { id } = useParams();
  const { userId, userType } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  const [subscriptionData, setsubscriptionData] =
    useState<SubscriptionDataType>({
      parentId: "",
      healthProfessionalId: "",
      cardHolderName: "",
      cardNumber: "",
      cardExpiry: "",
      date: "",
      cardCVV: "",
      subscriptionAmount: 0,
    });

  useEffect(() => {
    if (id) {
      getHPData(id);
    }
  }, [id]);

  const getHPData = async (userId: string) => {
    try {
      const res = await axiosInstance.get(`/getHPDataById/${userId}`);
      if (res.status === 200) {
        let fee = res?.data?.data?.appointmentFee || 0;
        setsubscriptionData((prev) => {
          return {
            ...prev,
            subscriptionAmount: fee,
          };
        });
        setHPData(res.data.data);
      } else {
        throw new Error(`Unexpected error occurred, status: ${res.status}`);
      }
    } catch (error: unknown) {
      console.log("error on get hp data", error);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    if (!id || !userId || !userType) {
      toast.error("Please login again");
      navigate("/parent/login");
      return;
    }

    setsubscriptionData({
      ...subscriptionData,
      date: new Date().toISOString(),
      parentId: userId,
      healthProfessionalId: id,
    });
  }, [userId, userType, id]);

  const handleSubmitPayment = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    if (checkTypes()) {
      // const istDate = convertToIST(subscriptionData.date); // Convert to IST
      // console.log("date", subscriptionData.date);
      // console.log("is da", istDate);
      // return;
      // setsubscriptionData({
      //   ...subscriptionData,
      //   date: istDate,
      // });
      sendDataToServer();
    }
  };
  const convertToIST = (dateTime: string) => {
    const localDate = new Date(dateTime);
    const offset = localDate.getTimezoneOffset() * 60000; // Offset in milliseconds
    const istOffset = 19800000; // IST offset in milliseconds (+5:30)
    const istDate = new Date(localDate.getTime() + offset + istOffset);
    return istDate.toISOString(); // Return in ISO format
  };

  const sendDataToServer = async () => {
    try {
      const res = await axiosInstance.post("fit-newSubscription", subscriptionData);
      if (res.status === 201) {
        toast.success("Subscription successful");
        navigate("/parent/view-subscribed-hp");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errStatus = error?.response?.status;
        if (
          errStatus === 409 ||
          errStatus === 400 ||
          errStatus === 401 ||
          errStatus === 404 ||
          errStatus === 500
        ) {
          const errMsg =
            error?.response?.data?.message ||
            "Some issues occured, please try again";
          toast.error(errMsg);
        } else {
          toast.error("Please login again");
        }
      } else {
        toast.error("Please check your network.");
      }
    }
  };

  const clearData = () => {
    navigate("/parent/view-hp");
  };
  const checkTypes = () => {
    const {
      cardCVV,
      cardExpiry,
      cardHolderName,
      cardNumber,
      healthProfessionalId,
      parentId,
      subscriptionAmount,
    } = subscriptionData;
    if (
      !cardHolderName ||
      !cardNumber ||
      !cardExpiry ||
      !cardCVV ||
      !subscriptionAmount ||
      !healthProfessionalId ||
      !parentId
    ) {
      console.log("subs data", subscriptionData);
      toast.error("Please fill all the fields");
      return false;
    }

    const convertCardNumber = Number(cardNumber);
    if (isNaN(convertCardNumber)) {
      toast.error("Check your card number");
      return false;
    }

    const convertCvv = Number(cardCVV);
    if (isNaN(convertCvv)) {
      toast.error("Check your cvv");
      return false;
    }
    if (cardNumber.length !== 16 || cardCVV.length !== 3) {
      return false;
    }
    return true;
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "cardHolderName") {
      if (value.length !== 0 && !isOnlyAlphabets(value)) {
        return;
      }
    }

    if (name === "cardNumber" && value.length !== 0 && !isOnlyNumbers(value)) {
      return;
    }
    if (name === "cardCVV" && value.length !== 0 && !isOnlyNumbers(value)) {
      return;
    }
    setsubscriptionData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div
      id="subscribe-payment-container"
      style={{ width: "35rem" }}
      className="mt-4 py-3"
    >
      <Form noValidate validated={validated} onSubmit={handleSubmitPayment}>
        <h4 className="text-center text-dark"> Payment Overview </h4>
        <p className="text-center text-dark">
          Please fill your payment details.
        </p>

        {/* <Row>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Appointment Date and time</Form.Label>
              <Form.Control
                value={subscriptionData.date}
                name="date"
                autoFocus
                type="datetime-local"
                required
                min={getCurrentDateTime()}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide appointment date and time.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row> */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Card Holder Name</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="cardHolderName"
            value={subscriptionData.cardHolderName}
            type="text"
            placeholder="Card Holder Name"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide card holder name
          </Form.Control.Feedback>
        </Form.Group>
        <Row>
          <Col>
            {" "}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                name="cardNumber"
                value={subscriptionData.cardNumber}
                type="text"
                placeholder="Card Number"
                pattern="[0-9]{16}"
                minLength={16}
                maxLength={16}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide 16 digits card number
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                value={subscriptionData.cardExpiry}
                name="cardExpiry"
                type="date"
                pattern="[0-9]{2}/[0-9]{2}"
                min={getCurrentDate()}
                required
                placeholder="MM/YY"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide expiry date.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                value={subscriptionData.cardCVV}
                onChange={handleChange}
                placeholder="CVV"
                name="cardCVV"
                pattern="[0-9]{3}"
                type="text"
                required
                minLength={3}
                maxLength={3}
              />
              <Form.Control.Feedback type="invalid">
                Please provide CVV
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <div className="mt-3 d-flex justify-content-between align-items-center">
          <Button
            style={{
              width: "10rem",
              height: "50px",
              fontSize: "20px",
            }}
            onClick={clearData}
            variant="warning"
          >
            {" "}
            Back
          </Button>
          <Button type="submit" style={{ width: "10rem", height: "50px" }}>
            {" "}
            Pay ₹ {subscriptionData.subscriptionAmount}{" "}
          </Button>
        </div>
      </Form>
    </div>
  );
};
