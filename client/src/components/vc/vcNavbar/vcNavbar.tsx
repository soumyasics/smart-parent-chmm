import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import styles from "./vcNavbar.module.css";
import { Button, Image } from "react-bootstrap";
import userPlaceholderImg from "../../../assets/user-placeholder.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../redux/reducers/userSlilce";
import { useCustomNavigate } from "../../../hooks/useCustomNavigate";
import { UserData } from "../../../redux/types";
import { useProfilePicture } from "../../../hooks/useProfilePicture";

export const VCNavbar = () => {
  const [isVCLoggedIn, setIsVCLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateTo = useCustomNavigate();
  const { isAuthenticated, userType, userData } = useSelector(
    (state: RootState) => state.user
  );
  const [profilePic, setProfilePic] = useState<string>(userPlaceholderImg);
  const [userName, setUserName] = useState("User Name");
  const pic = userData?.profilePicture?.filename || null;
  const { profilePicture } = useProfilePicture(pic);

  // console.log(" pic",pic)
  // console.log("por pic", profilePicture)

  useEffect(() => {
    if (isAuthenticated && userType === "vaccineCenter") {
      setIsVCLoggedIn(true);
      collectUserDetails(userData);
    } else {
      navigate("/vc/login");
    }
  }, [isAuthenticated, userData, profilePicture]);

  const collectUserDetails = (userData: UserData | null) => {
    const name = userData?.name?.substring(0, 15) || "";
    setUserName(name);
    setProfilePic(profilePicture);
  };
  const navigateVCLogin = () => {
    navigate("/vc/login");
  };

  const redirectVCHome = () => {
    navigate("/vc/home");
  };
  const redirectToVCProfile = () => {
    navigate("/vc/profile");
  };

  const redirectToAddVaccines = () => {
    navigate("/vc/add-vaccines");
  };

  const handleLogout = () => {
    dispatch(userLoggedOut());
    navigate("/vc/login");
  };

  return (
    <div className="bg-dark text-white px-4">
      <Navbar expand="lg" className={`text-white pe-5 ${styles.parentNavbar}`}>
        <Container>
          <Navbar.Brand
            onClick={redirectVCHome}
            role="button"
            className="fw-bold text-white"
          >
            Child Crescendo
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-n av">
            <Nav className="ms-5 text-white w-75 justify-content-start gap-5">
              <p className="my-0" role="button" onClick={redirectVCHome}>
                Home
              </p>

              <p
                className="my-0"
                role="button"
                onClick={() => {
                  navigateTo("/vc/chat");
                }}
              >
                Chat
              </p>
              <p className="my-0" role="button" onClick={redirectToAddVaccines}>
                Add Vaccines
              </p>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Navbar.Collapse className="justify-content-end">
          {!isVCLoggedIn ? (
            <Button variant={"outline-light"} onClick={navigateVCLogin}>
              {" "}
              Login{" "}
            </Button>
          ) : (
            <div className="dropdown  ">
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
                <span>{userName.substring(0, 8)}</span>
              </button>

              <div
                style={{ cursor: "pointer" }}
                className={`dropdown-menu ${styles.parentNavDropdown}`}
                aria-labelledby="dropdownMenuLink"
              >
                <p
                  className="  dropdown-item mb-0"
                  onClick={redirectToVCProfile}
                >
                  Profile
                </p>
                <p
                  className="text-danger  dropdown-item mb-0"
                  onClick={handleLogout}
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
