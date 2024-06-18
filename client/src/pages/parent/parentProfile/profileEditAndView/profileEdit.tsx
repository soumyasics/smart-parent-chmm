import { Button, Col, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { ParentData } from "../profileSection";
import { useEffect, useState } from "react";
import { isOnlyAlphabets, isOnlyNumbers } from "../../../../utils/validation";
import axiosMultipartInstance from "../../../../apis/axiosMultipartInstance";
import axios from "axios";
import { RootState } from "../../../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "../../../../redux/reducers/userSlilce";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
interface ProfileViewProps {
  parentData: ParentData | null;
  profilePicture: string;
  handleCancelEditProfile: () => void;
}

export interface NewParentData {
  name?: string;
  phoneNumber?: string;
  address?: string;
  profilePicture?: string | File | null;
}

export const ProfileEdit: React.FC<ProfileViewProps> = ({
  parentData,
  profilePicture,
  handleCancelEditProfile,
}) => {
  const [newParentData, setNewParentData] = useState<NewParentData>({
    name: "",
    phoneNumber: "",
    address: "",
    profilePicture: profilePicture ? profilePicture : null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [parentId, setParentId] = useState<string | null>("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isAuthenticated, userType, userId } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login again.");
      navigate("/parent/login");
      return;
    }
    if (userType === "parent") {
      setParentId(userId);
    }
  }, []);

  useEffect(() => {
    if (parentData) {
      setNewParentData({
        address: parentData.address,
        name: parentData.name,
        phoneNumber: String(parentData.phoneNumber),
        profilePicture: null,
      });
    }
  }, []);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      if (!isOnlyAlphabets(value)) {
        return;
      }
    }
    if (name === "phoneNumber" && value.length !== 0) {
      if (!isOnlyNumbers(value)) {
        return;
      }
    }

    setNewParentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfilePictureUpload = (e: any) => {
    const pic = e.target.files[0];
    setNewParentData((prevData) => ({
      ...prevData,
      profilePicture: pic,
    }));
  };

  const saveNewChanges = (e:any) => {
    e.preventDefault()
    const { name, address, phoneNumber, profilePicture } = newParentData;
    if (!name || !address || !phoneNumber) {
      toast.error("Fields can't be empty");
      return;
    }
    console.log("ph", newParentData);
    console.log("ph", phoneNumber.length);
    if (phoneNumber.length !== 10) {
      toast.error("Invalid phone number");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("phoneNumber", phoneNumber);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    if (parentId) {
      sendDataToServer(formData);
    } else {
      toast.error("Something went wrong. Please login again.");
    }
  };

  const sendDataToServer = async (formData: any) => {
    try {
      setIsLoading(true);
      const res = await axiosMultipartInstance.patch(
        `/updateParentDataById/${userId}`,
        formData
      );
      if (res.status === 200) {
          const data = res.data?.data;
          console.log(" data, d", data)
          dispatch(updateUserData(data));
          handleCancelEditProfile();
          toast.success("Profile updated successfully");

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
        console.log("load", isLoading)
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div>
      <div className="profile-header">
        <img src={profilePicture} alt="Profile" className="profile-image" />
        <div>
          <h3>
            {parentData?.name ? capitalizeFirstLetter(parentData.name) : ""}
          </h3>

          <p>{parentData?.address}</p>
        </div>
      </div>
      <Form onSubmit={saveNewChanges}>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={newParentData?.name}
                onChange={handleChanges}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label className="fw-bold">Phone Number</Form.Label>

              <Form.Control
                type="text"
                placeholder="New Phone Number"
                name="phoneNumber"
                value={newParentData?.phoneNumber}
                onChange={handleChanges}
                maxLength={10}
                minLength={10}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formLocation">
              <Form.Label className="fw-bold">Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="New address"
                name="address"
                value={newParentData?.address}
                onChange={handleChanges}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPostalCode">
              <Form.Group className="position-relative mt-3">
                <Form.Label>Upload your new photo </Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                />
              </Form.Group>
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex w-75  justify-content-between ">
          <Button
            variant="success"
            type="submit"
            className="save-button"
          >
            Save Changes
          </Button>
          <Button
            variant="danger"
            className="save-button"
            onClick={handleCancelEditProfile}
          >
            Cancel
          </Button>
        </div>
      </Form>

      <h3>{error}</h3>
    </div>
  );
};
