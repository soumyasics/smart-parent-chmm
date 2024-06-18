import { Button } from "react-bootstrap";
import "./profileSection.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../apis/axiosInstance";
import axios from "axios";
import { ErrorHandlingUI } from "../../../../components/common/errorHandlingUI/errorHandlingUi";
import userPlaceholderImg from "../../../../assets/user-placeholder-img.jpg";
import { BASE_URL } from "../../../../apis/baseUrl";
import { PageLoadingDark } from "../../../../components/pageLoading/pageLoading2";
import { ProfileEdit } from "../profileEditAndView/profileEdit";
import { ProfileView } from "../profileEditAndView/profileView.tsx";
import {toast} from "react-hot-toast";

type Picture = {
  filename: string;
};

export interface AWData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  experience: string;
  qualification: string;
  profilePicture: Picture | null;
  _id: string;
  createdAt: string;
}
export const AWProfileSection = () => {
  const [awData, setAWData] = useState<null | AWData>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [profilePicture, setProfilePicture] =
    useState<string>(userPlaceholderImg);
  const { isAuthenticated, userType, userId, userData } = useSelector(
    (state: RootState) => state.user
  );
  const [isEditProfileActive, setIsEditProfileActive] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || userType !== "ashaWorker") {
      toast.error("Please login again.");
      navigate("/aw/login");
      return;
    }

    if (userType === "ashaWorker" && userId) {
      getAWData(userId);
    }
  }, [userData]);

  useEffect(() => {
    if (awData) {
      const pic: string = awData?.profilePicture?.filename || "";
      if (pic) {
        setProfilePicture(`${BASE_URL}${pic}`);
      } else {
        setProfilePicture(userPlaceholderImg);
      }
    }
  }, [awData]);


  const getAWData = async (userId: string) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/getAshaWorkerDataById/${userId}`);
      if (res.status === 200) {
        setAWData(res.data.data);
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

  const handleEditProfile = () => {
    setIsEditProfileActive(true);
  };

  const handleCancelEditProfile = () => {
    setIsEditProfileActive(false);
  };

  return (
    <div className="profile-section">
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <PageLoadingDark />
        </div>
      ) : error ? (
        <ErrorHandlingUI error={error} />
      ) : (
        <>
          {isEditProfileActive ? (
            <ProfileEdit
              awData={awData}
              profilePicture={profilePicture}
              handleCancelEditProfile={handleCancelEditProfile}
            />
          ) : (
            <ProfileView
              awData={awData}
              profilePicture={profilePicture}
            />
          )}

          {!isEditProfileActive && (
            <Button
              variant="primary"
              type="submit"
              className="save-button"
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
          )}
        </>
      )}
    </div>
  );
};
