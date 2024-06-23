import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { AddNewVaccineType } from "../../../types/types";
import addVaccines from "../../../assets/vaccines/vaccine-1.jpg";
import { isPastDay } from "../../../utils/validation/dateValidation";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../apis/axiosInstance";
import { toast } from "react-hot-toast";
type ErrorsType = {
  vaccineName: string;
  vaccineDescription: string;
  totalSlots: string;
  expiryDate: string;
  ageGroup: string;
  dosageMl: string;
  sideEffects: string;
};

export const AddVaccineForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [formData, setFormData] = useState<AddNewVaccineType>({
  //   vaccinationCenterId: "",
  //   vaccineName: "",
  //   vaccineDescription: "",
  //   totalSlots: "",
  //   expiryDate: "",
  //   sideEffects: "",
  //   ageGroup: "",
  //   dosageMl: "",
  // });
  const [formData, setFormData] = useState<AddNewVaccineType>({
    vaccinationCenterId: "",
    vaccineName: "a",
    vaccineDescription: "des",
    totalSlots: "3",
    expiryDate: "2026-01-01",
    sideEffects: "side",
    ageGroup: "18 above",
    dosageMl: "5",
  });

  const [errors, setErrors] = useState<ErrorsType>({
    vaccineName: "",
    vaccineDescription: "",
    totalSlots: "",
    expiryDate: "",
    ageGroup: "",
    dosageMl: "",
    sideEffects: "",
  });

  const { isAuthenticated, userType, userId } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !userId || userType !== "vaccineCenter") {
      navigate("/vc/login");
    } else {
      setFormData({
        ...formData,
        vaccinationCenterId: userId,
      });
    }
  }, [isAuthenticated, userType, userId]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors: ErrorsType = {
      vaccineName: "",
      vaccineDescription: "",
      totalSlots: "",
      expiryDate: "",
      ageGroup: "",
      dosageMl: "",
      sideEffects: "",
    };

    if (!formData.vaccineName) {
      newErrors.vaccineName = "Vaccine Name is required";
    }
    if (!formData.vaccineDescription) {
      newErrors.vaccineDescription = "Vaccine Description is required";
    }
    if (formData.totalSlots === "") {
      newErrors.totalSlots =
        "Number of Available Slots is required";
    }
    if (Number(formData.totalSlots) < 0) {
      newErrors.totalSlots = "Cannot be negative";
    }
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry Date is required";
    } else if (isPastDay(formData.expiryDate)) {
      newErrors.expiryDate = "Cannot be past day";
    }

    if (!formData.ageGroup) {
      newErrors.ageGroup = "Age Group is required";
    }

    if (!formData.sideEffects) {
      newErrors.sideEffects =
        "Side Effects is required, if nothing is there, write N/A";
    }

    if (!formData.dosageMl) {
      newErrors.dosageMl = "Dosage is required";
    }

    if (Number(formData.dosageMl) <= 0) {
      newErrors.dosageMl = "Must be greater than 0";
    }
    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    const valid = isInputDataValid();
    if (valid) {
      sendDataToServer(formData);
    } else {
      console.log("Input fields are not valid.");
    }
  };

  const isInputDataValid = () => {
    const validationErrors = validateForm();
    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ""
    );
    setErrors(validationErrors);
    return !hasErrors;
  };
  useEffect(() => {
    if (isSubmitted) {
      isInputDataValid();
    }
  }, [formData]);

  const sendDataToServer = async (data: AddNewVaccineType) => {
    try {
      const res = await axiosInstance.post("addNewVaccine", data);
      console.log("respo", res);
      if (res.status === 200) {
        toast.success("Vaccine added successfully");
        resetFields();
      } else {
        toast.error("Some issues occured, please try again");
      }
    } catch (error) {
      console.log("Error on add vaccine", error);
    }
  };
  const resetFields = () => {
    setFormData({
      vaccinationCenterId: "",
      vaccineName: "",
      vaccineDescription: "",
      totalSlots: "",
      expiryDate: "",
      sideEffects: "",
      ageGroup: "",
      dosageMl: "",
    });
    setIsSubmitted(false);
  };
  return (
    <Container>
      <Row className="my-5">
        <Col md={4} className="d-flex align-items-center ">
          <img src={addVaccines} alt="Illustration" className="img-fluid" />
        </Col>
        <Col md={8} className="shadow p-3">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formVaccineName" className="mb-3">
                  <Form.Label>Vaccine Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="vaccineName"
                    value={formData.vaccineName}
                    onChange={handleChange}
                    placeholder="Enter vaccine name"
                    isInvalid={!!errors.vaccineName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.vaccineName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formDosageMl" className="mb-3">
                  <Form.Label>Dosage (ml)</Form.Label>
                  <Form.Control
                    type="number"
                    name="dosageMl"
                    value={formData.dosageMl}
                    placeholder="Enter dosage in ml"
                    onChange={handleChange}
                    isInvalid={!!errors.dosageMl}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dosageMl}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group
                  controlId="formNumberOfAvailableSlots"
                  className="mb-3"
                >
                  <Form.Label>Number of Available Slots</Form.Label>
                  <Form.Control
                    type="number"
                    name="totalSlots"
                    value={formData.totalSlots}
                    onChange={handleChange}
                    placeholder="Enter number of available slots"
                    isInvalid={!!errors.totalSlots}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.totalSlots}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formExpiryDate" className="mb-3">
                  <Form.Label>Vaccine Expiry Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    isInvalid={!!errors.expiryDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.expiryDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formSideEffects" className="mb-3">
                  <Form.Label>Side Effects</Form.Label>
                  <Form.Control
                    type="text"
                    name="sideEffects"
                    value={formData.sideEffects}
                    onChange={handleChange}
                    placeholder="Enter side effects"
                    isInvalid={!!errors.sideEffects}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.sideEffects}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formAgeGroup" className="mb-3">
                  <Form.Label>Age Group</Form.Label>
                  <Form.Control
                    type="text"
                    name="ageGroup"
                    value={formData.ageGroup}
                    placeholder="Enter age group"
                    onChange={handleChange}
                    isInvalid={!!errors.ageGroup}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.ageGroup}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                {" "}
                <Form.Group controlId="formVaccineDescription" className="mb-3">
                  <Form.Label>Vaccine Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="vaccineDescription"
                    rows={3}
                    placeholder="Enter vaccine description"
                    value={formData.vaccineDescription}
                    onChange={handleChange}
                    isInvalid={!!errors.vaccineDescription}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.vaccineDescription}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Container className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                Add Vaccine
              </Button>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
