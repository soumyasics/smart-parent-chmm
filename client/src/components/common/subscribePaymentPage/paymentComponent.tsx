import { useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./payment-page.css";
export const PaymentForm = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const [userAcDetails, setUserAcDetails] = useState({
    acHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    amount: "999",
  });

  const handleSubmitPayment = (event: any) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    const { acHolderName, cardNumber, expiryDate, cvv } = userAcDetails;

    const checkTypes = () => {
      const convertCardNumber = Number(cardNumber);
      if (isNaN(convertCardNumber)) {
        console.log("Check your card number");
        return false;
      }
      const convertCvv = Number(cvv);
      if (isNaN(convertCvv)) {
        console.log("Check your cvv");
        return false;
      }
      return true;
    };

    if (
      !acHolderName ||
      !cardNumber ||
      !expiryDate ||
      !cvv ||
      cvv.length !== 3 ||
      cardNumber.length !== 16
    ) {
      console.log("all fields are mandatory");
      return;
    } else {
      if (checkTypes()) {
        // types are valide
      } else {
        console.log("check types failed");
      }
    }
  };

  const handleChange = (e: any) => {
    setUserAcDetails((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancelAction = () => {
    setUserAcDetails({
      ...userAcDetails,
      acHolderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      amount: "999",
    });

    setValidated(false);
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
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Card Holder Name</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="acHolderName"
            value={userAcDetails.acHolderName}
            type="text"
            placeholder="Card Holder Name"
            autoFocus
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
                value={userAcDetails.cardNumber}
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
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                value={userAcDetails.expiryDate}
                name="expiryDate"
                type="date"
                pattern="[0-9]{2}/[0-9]{2}"
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
                value={userAcDetails.cvv}
                onChange={handleChange}
                placeholder="CVV"
                name="cvv"
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
            onClick={handleCancelAction}
            variant="warning"
          >
            {" "}
            Cancel
          </Button>
          <Button type="submit" style={{ width: "10rem", height: "50px" }}>
            {" "}
            Pay ₹ 999{" "}
          </Button>
        </div>
      </Form>
    </div>
  );
};
