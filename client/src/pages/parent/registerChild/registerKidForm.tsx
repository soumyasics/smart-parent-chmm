import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import baby1Img from "../../../assets/baby-1.png";
import axiosMultipartInstance from "../../../apis/axiosMultipartInstance";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const RegisterKidForm = () => {
  const [parentId, setParentId] = useState<string>("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { isAuthenticated, userType, userId } = useSelector(
    (state: RootState) => state.user
  );
  useEffect(() => {
    if (isAuthenticated && userType === "parent" && userId !== null) {
      setParentId(userId);
    } else {
      toast.error("Please Login again. ");
      //todo=> navigate to parent login page here.
    }
  }, []);
  const onSubmit = (data: any) => {
    // convert data to form data
    const formData = new FormData();
    formData.append("parentId", parentId);
    formData.append("name", data.name);
    formData.append("dob", data.dob);
    formData.append("birthWeight", data.birthWeight);
    formData.append("weight", data.weight);
    formData.append("height", data.height);
    formData.append("bloodGroup", data.bloodGroup);
    formData.append("image", data.image[0]);
    // todo=>dob validation here
    sendDataToServer(formData);
  };

  const sendDataToServer = async (formData: any) => {
    try {
      const res = await axiosMultipartInstance.post("/addKid", formData);
      if (res.status === 201) {
        toast.success("Child registration successfull.");

        navigate("/parent/home");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400 || status === 500) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("Please check your network!");
        }
      }
    }
  };

  console.log(watch("name"));
  console.log(watch("bloodGroup"));
  return (
    <Container>
      <h3 className="text-center mt-3"> Register your child details here.</h3>
      <Row className="justify-content-center mt-5 ">
        <Col
          md={5}
          className="d-flex align-items-center justify-content-center"
        >
          {/* Placeholder for Illustration Image */}

          <Image style={{ width: "60%" }} src={baby1Img} alt="baby-1img" />
        </Col>
        <Col md={7}>
          <Form
            style={{ minHeight: "450px" }}
            className="shadow p-3 mb-5   justify-content-between rounded d-flex flex-column"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row>
              <Col>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your kid name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p className="text-danger">Name is required</p>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formDob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    max={new Date().toISOString().split("T")[0]} 
                    {...register("dob", { required: true })}
                  />
                  {errors.dob && (
                    <p className="text-danger">Date of Birth is required</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formBirthWeight">
                  <Form.Label>Birth Weight (kg)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    placeholder="Enter birth weight"
                    {...register("birthWeight", {
                      required: true,
                      pattern: {
                        value: /^\d{1,2}(\.\d{1,2})?$/,
                        message: "Enter a valid birth weight (e.g., 12.34)",
                      },
                    })}
                  />
                  {errors.birthWeight && (
                    <p className="text-danger">
                      Enter a valid birth weight (e.g., 12.34)
                    </p>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formWeight">
                  <Form.Label>Weight (kg)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    placeholder="Enter weight"
                    {...register("weight", {
                      required: true,
                      pattern: {
                        value: /^\d{1,2}(\.\d{1,2})?$/,
                        message: "Enter a valid current weight (e.g., 15.20)",
                      },
                    })}
                  />
                  {errors.weight && (
                    <p className="text-danger">
                      Enter a valid current weight (e.g., 15.20)
                    </p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formHeight">
                  <Form.Label>Height (cm)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter height"
                    maxLength={3}
                    {...register("height", {
                      required: true,
                      pattern: {
                        value: /^\d{1,3}$/,
                        message: "Enter a valid height (up to 3 digits)",
                      },
                    })}
                  />
                  {errors.height && (
                    <p className="text-danger">Enter a valid height (up to 3 digits)</p>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBloodGroup">
                  <Form.Label>Blood Group</Form.Label>
                  <Form.Select {...register("bloodGroup", { required: true })}>
                    <option value="">Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </Form.Select>
                  {errors.bloodGroup && (
                    <p className="text-danger">Blood Group is required</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formImage">
                  <Form.Label>Upload your kid photo</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    {...register("image", { required: true })}
                  />
                  {errors.image && (
                    <p className="text-danger">Image is required</p>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
