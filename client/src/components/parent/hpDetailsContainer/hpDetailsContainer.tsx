import { FC, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { HealthProfessionalData } from "../../../types/userTypes";
import { IllustrationSection } from "../../common/illustration/illustration";
import { useProfilePicture } from "../../../hooks/useProfilePicture";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../apis/axiosInstance";
import { VideoStructureType } from "../../../redux/types";
import { ViewHPRating } from "../../../pages/parent/viewHP/viewHPRating";
import { HPComplaint } from "../../../pages/parent/viewHP/hpComplaint";
import { ReviewModal } from "./reviewModal";
import axios from "axios";

export interface VideoType {
  title: string;
  description: string;
  thumbnail: VideoStructureType;
  video: VideoStructureType;
  HPId: string;
  _id: string;
  target: string;
  duration: string;
}

interface HPDetailsContainerProps {
  data: HealthProfessionalData;
}

interface ParentHPIds {
  parentId: string;
  healthProfessionalId: string;
}

interface AppointmentReq {
  parentId: string;
  healthProfessionalId: string;
  date: string;
  subscriptionAmount: number;
}

export const HPDetailsContainer: FC<HPDetailsContainerProps> = ({ data }) => {
  const [parentHpIds, setParentHpIds] = useState<ParentHPIds>({
    parentId: "",
    healthProfessionalId: "",
  });
  console.log("parnt dat", parentHpIds);
  const [videos, setVideos] = useState<VideoType[]>([]);
  console.log("videos", videos);
  const [subscribed, setSubscribed] = useState(false);
  const { userType, userId } = useSelector((state: RootState) => state.user);
  const { id: healthProfessionalId } = useParams();
  const [showReview, setShowReview] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [isAppointmentExpired, setIsAppointmentExpired] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [bookAppointmentClicked, setBookAppointmentClicked] = useState(false);
  const [subscriptionData, setsubscriptionData] = useState<AppointmentReq>({
    parentId: "",
    healthProfessionalId: "",
    date: "",
    subscriptionAmount: 0,
  });

  const getSubscriptionStatus = async (
    parentId: string,
    healthProfessionalId: string
  ) => {
    try {
      const res = await axiosInstance.post("getSubscriptionStatus", {
        parentId,
        healthProfessionalId,
      });

      if (res.status === 200) {
        setSubscribed(res.data?.suscriptionStatus);
        setAppointmentDate(res.data.appointmentDate);
        setIsRejected(res.data.appointmentStatus === "rejected");
      } else {
        toast.error("Couldn't get subscription status");
      }
    } catch (error) {
      console.log("Couldn't get subscription status", error);
    }
  };
  useEffect(() => {
    if (userType === "parent" && userId && healthProfessionalId) {
      setParentHpIds({
        parentId: userId,
        healthProfessionalId,
      });

      getSubscriptionStatus(userId, healthProfessionalId);
    } else {
      toast.error("Please login again");
      navigate("/parent/view-hp");
    }
  }, []);

  useEffect(() => {
    if (subscribed) {
      getHPVideoTutorials(healthProfessionalId);
    }
  }, [subscribed]);
  useEffect(() => {
    if (appointmentDate) {
      const appointmentDateTime = new Date(appointmentDate);
      const currentDateTime = new Date();
      if (appointmentDateTime < currentDateTime) {
        setIsAppointmentExpired(true);
      } else {
        setIsAppointmentExpired(false);
      }
    }
    
  }, [appointmentDate]);

  const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const getHPVideoTutorials = async (id: string | undefined) => {
    if (!id) {
      return;
    }
    try {
      const res = await axiosInstance.get(`/getTutorialsByHPId/${id}`);
      if (res.status === 200) {
        setVideos(res.data.data);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log("Error in getHPVideoTutorials", error);
      toast.error("Something went wrong");
    }
  };

  const { profilePicture } = useProfilePicture(data?.profilePicture?.filename);
  const navigate = useNavigate();
  

  const handleClose = () => {
    setShowReview(false);
  };
  const handleOpen = () => {
    setShowReview(true);
  };

  useEffect(() => {
    if (healthProfessionalId && userId) {
      setsubscriptionData({
        ...subscriptionData,
        healthProfessionalId,
        parentId: userId,
        subscriptionAmount: data?.appointmentFee || 0,
      });
    }
  }, [healthProfessionalId, userId, data?.appointmentFee]);

  const handleReqSend = (e: any) => {
    e.preventDefault();
    if (!subscriptionData.date) {
      toast.error("Choose appointment date and time");
      return
    }
    sendDataToServer()
  }
  const sendDataToServer = async () => {
    try {
      const res = await axiosInstance.post("appointmentReq", subscriptionData);
      if (res.status === 201) {
        toast.success("Appointment request send successfully.");
        navigate("/parent/view-appointments-hp");
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


  return (
    <>
      <ReviewModal
        show={showReview}
        handleClose={handleClose}
        id={healthProfessionalId}
      />
      <Container className="mt-5">
        <h3 className="text-center text-primary shadow">Health Professional</h3>
        <Row>
          <Col md={4}>
            <IllustrationSection imgPath="https://img.freepik.com/free-vector/health-professional-team-concept-illustration_114360-1618.jpg" />
          </Col>
          <Col md={8}>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-center align-items-center">
                  <Image
                    style={{ width: "100px", height: "100px" }}
                    rounded
                    src={profilePicture}
                  />
                </div>
                <div className="shadow p-2" style={{ minHeight: "300px" }}>
                  <Card.Title className="mt-3 text-center">
                    Name: {data.name}
                  </Card.Title>
                  <Card.Text className="mt-5">
                    <Row>
                      <Col>
                        <p>
                          {" "}
                          <strong>Email:</strong> {data.email} <br />
                        </p>
                        <p>
                          <strong>Phone Number:</strong> {data.phoneNumber}{" "}
                          <br />
                        </p>
                        <p>
                          <strong>Address:</strong> {data.address} <br />
                        </p>
                        <p>
                          <strong>Appointment Fee:</strong>{" "}
                          {data?.appointmentFee || 0} <br />
                        </p>
                      </Col>
                      <Col>
                        <p>
                          <strong>Category:</strong> {data?.category} <br />
                        </p>
                        <p>
                          <strong>Year of experience:</strong>{" "}
                          {data?.department} <br />
                        </p>
                        <p>
                          <strong>Rating:</strong>{" "}
                          {data?.rating?.toFixed(1) || 0} <br />
                        </p>
                      </Col>
                    </Row>
                  </Card.Text>
                  <div className="d-flex justify-content-between px-5 align-items-center">
                    {subscribed && !isAppointmentExpired && !isRejected ? (
                      <div>
                        <h6>Appointment booked on </h6>
                        <p className="mb-0">
                          Date: {appointmentDate.substring(0, 10)}
                        </p>
                        <p>Time: {appointmentDate.substring(11, 16)}</p>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center align-items-center">
                        {bookAppointmentClicked ? (
                          <div className="d-flex justify-content-center align-items-center">
                            <form onSubmit={handleReqSend}>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label>
                                  Appointment Date and time
                                </Form.Label>
                                <Form.Control
                                  value={subscriptionData.date}
                                  name="date"
                                  autoFocus
                                  type="datetime-local"
                                  required
                                  min={getCurrentDateTime()}
                                  onChange={(e) => {
                                    setsubscriptionData((prev) => {
                                      return {
                                        ...prev,
                                        date: e.target.value,
                                      };
                                    });
                                  }}
                                />
                              </Form.Group>
                              <input
                                className="btn btn-success"
                                type="submit"
                                value="Send Request"
                              />
                            </form>
                            <button
                              className="btn btn-warning h-50 ms-3 mb-3"
                              onClick={() => {
                                setBookAppointmentClicked(false);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <Button
                            variant="primary"
                            style={{ height: "40px" }}
                            onClick={() => {
                              setBookAppointmentClicked(true);
                            }}
                          >
                            Book an Appointment
                          </Button>
                        )}
                      </div>
                    )}
                    <Button
                      className="ms-5"
                      variant="success"
                      onClick={handleOpen}
                    >
                      View Reviews
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {healthProfessionalId && subscribed && (
          <>
            <Row className="d-flex justify-content-between">
              <Col>
                <ViewHPRating />
              </Col>
              <Col>
                <HPComplaint />
              </Col>
            </Row>
            {/* {data?.category === "Fitness Specialist" && (
              <div className="mt-5">
                <ViewTutorials healthProfessionalId={healthProfessionalId} />
              </div>
            )}
            {data?.category === "Fitness Specialist" && (
              <div className="mt-5">
                <ParentViewBlogs healthProfessionalId={healthProfessionalId} />
              </div>
            )} */}
          </>
        )}
      </Container>
    </>
  );
};
