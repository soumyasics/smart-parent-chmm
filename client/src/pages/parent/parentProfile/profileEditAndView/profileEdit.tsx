import { Col, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { ParentData } from "../profileSection";
import { useState } from "react";

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
interface ProfileViewProps {
  parentData: ParentData | null;
  profilePicture: string;
}

export const ProfileEdit: React.FC<ProfileViewProps> = ({
  parentData,
  profilePicture,
}) => {
  const [newParentData, setNewParentData] = useState({
    name: parentData?.name || "",
    phoneNumber: parentData?.phoneNumber || "",
    address: parentData?.address || "",
    profilePicture: null,
  });
  console.log('par d', parentData)

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     // Handle form submission
//   };

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
      <Form>
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
                type="number"
                placeholder="New Phonenumber"
                name="phoneNumber"
                value={newParentData?.phoneNumber}
                onChange={handleChanges}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formLocation">
              <Form.Label className="fw-bold">Address</Form.Label>
              <Form.Control
                type="number"
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
      </Form>
    </div>
  );
};
