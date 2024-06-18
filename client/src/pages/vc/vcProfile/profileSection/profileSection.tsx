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

type ProfilePicture = {
  filename: string;
};

export interface VCData {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  category: string;
  profilePicture: ProfilePicture | null;
  createdAt: string;
}
export const VCProfileSection = () => {
  const [vcData, setVCData] = useState<null | VCData>(null);
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
    if (!isAuthenticated) {
      toast.error("Please login again.");
      navigate("/vc/login");
      return;
    }

    if (userType === "vaccineCenter" && userId) {
      getVCData(userId);
    }
  }, [userData]);

  useEffect(() => {
    if (vcData) {
      const pic: string = vcData?.profilePicture?.filename || "";
      if (pic) {
        setProfilePicture(`${BASE_URL}${pic}`);
      } else {
        setProfilePicture(userPlaceholderImg);
      }
    }
  }, [vcData]);

  // function capitalizeFirstLetter(str: string) {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // }

  const getVCData = async (userId: string) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/getVCDataById/${userId}`);
      if (res.status === 200) {
        setVCData(res.data.data);
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
              vcData={vcData}
              profilePicture={profilePicture}
              handleCancelEditProfile={handleCancelEditProfile}
            />
          ) : (
            <ProfileView
              vcData={vcData}
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
