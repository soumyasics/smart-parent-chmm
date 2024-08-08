import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import styles from "./hpNavbar.module.css";
import { Button, Image } from "react-bootstrap";
import userPlaceholderImg from "../../../assets/user-placeholder.jpg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { userLoggedOut } from "../../../redux/reducers/userSlilce";
import { useProfilePicture } from "../../../hooks/useProfilePicture";
import { UserData } from "../../../redux/types";

export const HPNavbar = () => {
  const [profilePic, setProfilePic] = useState<string>(userPlaceholderImg);
  const [userName, setUserName] = useState("");
  const [isHPLoggedIn, setIsHPLoggedIn] = useState(false);
  const { isAuthenticated, userData, userType } = useSelector(
    (state: RootState) => state.user
  );
  const [isFitnessSpecialist, setIsFitnessSpecialist] = useState(false);

  useEffect(() => {
    if (userData && userData.category && userData.category === "Fitness Specialist") {
      setIsFitnessSpecialist(true);
    } else {
      setIsFitnessSpecialist(false);
    }
  }, [userData]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let pic = userData?.profilePicture?.filename || null;
  const { profilePicture } = useProfilePicture(pic);
  useEffect(() => {
    if (isAuthenticated && userType === "healthProfessional" && userData) {
      setIsHPLoggedIn(true);
      collectUserDetails(userData);
    } else {
      navigate("/hp/login");
    }
  }, [isAuthenticated, userData, profilePicture]);

  const collectUserDetails = (userData: UserData | null) => {
    const name = userData?.name?.substring(0, 15) || "";
    setUserName(name);
    setProfilePic(profilePicture);
  };

  const navigateHPLogin = () => {
    navigate("/hp/login");
  };

  const navigateHPHome = () => {
    navigate("/hp/home");
  };
  const handleHPLogout = () => {
    dispatch(userLoggedOut());
    navigate("/hp/login");
  };

  const navigateToHPProfile = () => {
    navigate("/hp/profile");
  };
  const redirectToTutorials = () => {
    navigate("/hp/tutorials");
  };

  const redirectToCreateBlog = () => {
    navigate("/hp/create-blog");
  };
  const redirectToChatWithParent = () => {
    navigate("/hp/chat");
  };
  const navigateHPAppointments = () => {
    navigate("/hp/appointments");
  };
  return (
    <div className="bg-dark text-white px-4">
      <Navbar expand="lg" className="text-white pe-5">
        <Container>
          <Navbar.Brand
            className={`text-white ${styles.cursorPointer}`}
            onClick={navigateHPHome}
          >
            Child Crescendo
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className={`me-auto  text-white  justify-content-between ${
                isFitnessSpecialist ? "w-75" : "w-50"
              }`}
            >
              <p
                className="my-0 ms-5"
                style={{ cursor: "pointer" }}
                onClick={navigateHPHome}
              >
                Home
              </p>
              <p
                className="my-0"
                style={{ cursor: "pointer" }}
                onClick={navigateHPAppointments}
              >
                Appointments
              </p>
              <p
                className="my-0 "
                onClick={redirectToChatWithParent}
                style={{ cursor: "pointer" }}
              >
                Chat
              </p>
              {isFitnessSpecialist && (
                <p
                  className="my-0 "
                  onClick={redirectToCreateBlog}
                  style={{ cursor: "pointer" }}
                >
                  Blog
                </p>
              )}

              {isFitnessSpecialist && (
                <p
                  className="my-0 "
                  onClick={redirectToTutorials}
                  style={{ cursor: "pointer" }}
                >
                  Tutorials
                </p>
              )}

              {/* <p className="my-0 ">Link 2 </p>
              <p className="my-0 ">Link 3 </p>
              <p className="my-0 ">Link 4</p> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Navbar.Collapse className="justify-content-end">
          {!isHPLoggedIn ? (
            <Button
              variant={"outline-light"}
              onClick={() => {
                navigateHPLogin();
              }}
            >
              {" "}
              Login{" "}
            </Button>
          ) : (
            <div className="dropdown ">
              <button
                style={{ width: "180px" }}
                className="btn d-flex btn-secondary  bg-dark"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <Image
                  src={profilePic}
                  className="me-2"
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                />
                <span>{userName}</span>
              </button>

              <div
                style={{ cursor: "pointer" }}
                className={`dropdown-menu ${styles.parentNavDropdown}`}
                aria-labelledby="dropdownMenuLink"
              >
                <p
                  className="  dropdown-item mb-0"
                  onClick={navigateToHPProfile}
                >
                  Profile
                </p>
                <p
                  className="text-danger dropdown-item mb-0"
                  onClick={handleHPLogout}
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
