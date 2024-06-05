import { Form, Button, Row, Col } from "react-bootstrap";
import "./profileSection.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../apis/axiosInstance";
import axios from "axios";
import { ErrorHandlingUI } from "../../../components/common/errorHandlingUI/errorHandlingUi";
import userPlaceholderImg from "../../../assets/user-placeholder-img.jpg";
import { BASE_URL } from "../../../apis/baseUrl";
import { PageLoading } from "../../../components/pageLoading/pageLoading";
import { PageLoading2 } from "../../../components/pageLoading/pageLoading2";

type ProfilePicture = {
  filename: string;
};
interface ParentData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  createdAt: string;
  profilePicture: ProfilePicture | null;
}
export const ParentProfileSection = () => {
  const [parentData, setParentData] = useState<null | ParentData>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState(userPlaceholderImg);
  const { isAuthenticated, userType, userId } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      alert("Please login again.");
      navigate("/parent/login");
      return;
    }

    if (userType === "parent" && userId) {
      getParentData(userId);
    }
  }, []);

  useEffect(() => {
    if (parentData) {
      const pic: string | null = parentData?.profilePicture?.filename || null;
      if (pic) {
        setProfilePicture(`${BASE_URL}${pic}`);
      } else {
        setProfilePicture(userPlaceholderImg);
      }
    }
  }, [parentData]);

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const getParentData = async (userId: string) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/getParentDataById/${userId}`);
      if (res.status === 200) {
        setParentData(res.data.data);
      } else {
        throw new Error(`Unexpected error occurred, status: ${res.status}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400 || status === 500) {
          const errorMsg =
            error.response?.data?.message ||
            "Some error occurred. Please try again later.";
          setError(errorMsg);
        } else {
          setError("Please check your network.");
        }
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="profile-section">
      {isLoading ? (
        <div>
          <PageLoading2 />
        </div>
      ) : error ? (
        <ErrorHandlingUI error={error} />
      ) : (
        <>
          <div className="profile-header">
            <img src={profilePicture} alt="Profile" className="profile-image" />
            <div>
              <h3>
                {parentData?.name ? capitalizeFirstLetter(parentData.name) : ""}
              </h3>
              <p>{parentData?.address}</p>
            </div>
          </div>

          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label className="fw-bold">Email Address</Form.Label>
                  <p>
                    <em>{parentData?.email}</em>
                  </p>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label className="fw-bold">Phone Number</Form.Label>
                  <p>
                    <em>{parentData?.phoneNumber}</em>
                  </p>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formLocation">
                  <Form.Label className="fw-bold">Date of Birth</Form.Label>
                  <p>
                    <em>{parentData?.dateOfBirth}</em>
                  </p>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPostalCode">
                  <Form.Label className="fw-bold">Account created</Form.Label>

                  <p>
                    <em>{parentData?.createdAt.substring(0, 10)}</em>
                  </p>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="save-button">
              Edit Profile
            </Button>
          </Form>
        </>
      )}
    </div>
  );
};
