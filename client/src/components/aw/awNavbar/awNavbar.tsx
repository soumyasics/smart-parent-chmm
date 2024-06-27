import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import styles from "./awNavbar.module.css";
import { Button, Image } from "react-bootstrap";
import userPlaceholderImg from "../../../assets/user-placeholder.jpg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { userLoggedOut } from "../../../redux/reducers/userSlilce";
import { UserData } from "../../../redux/types";
import { useProfilePicture } from "../../../hooks/useProfilePicture";

export const AWNavbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userData, userType } = useSelector(
    (state: RootState) => state.user
  );
  const [ashaWorkerLogin, setAshaWorkerLogin] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<string>(userPlaceholderImg);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();

  let pic = userData?.profilePicture?.filename || null;
  const { profilePicture } = useProfilePicture(pic);

  useEffect(() => {
    if (isAuthenticated && userType === "ashaWorker" && userData) {
      setAshaWorkerLogin(true);
      collectUserDetails(userData);
    } else {
      navigate("/aw/login");
    }
  }, [isAuthenticated, userData, profilePicture]);

  const collectUserDetails = (userData: UserData | null) => {
    const name = userData?.name?.substring(0, 15) || "";
    setUserName(name);
    setProfilePic(profilePicture);
  };

  const navigateAWLogin = () => {
    navigate("/aw/login");
  };

  const navigateToViewParent = () => {
    navigate("/aw/view-parents");
  };
  const navigateAWHome = () => {
    navigate("/aw/home");
  };
  const handleAWLogout = () => {
    dispatch(userLoggedOut());
    navigate("/aw/login");
  };

  const navigateToAWProfile = () => {
    navigate("/aw/profile");
  };
  return (
    <div className="bg-dark text-white px-4">
      <Navbar expand="lg" className="text-white pe-5">
        <Container>
          <Navbar.Brand
            className={`text-white ${styles.cursorPointer}`}
            onClick={navigateAWHome}
          >
            Child Crescendo
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto text-white w-50 ms-5 justify-content-start">
              <p className="my-0 ms-4" onClick={navigateAWHome} style={{cursor: "pointer"}}>
                Home
              </p>
              <p className="my-0 ms-5" onClick={navigateToViewParent} style={{cursor: "pointer"}}>
                Parent
              </p>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Navbar.Collapse className="justify-content-end">
          {!ashaWorkerLogin ? (
            <Button
              variant={"outline-light"}
              onClick={() => {
                navigateAWLogin();
              }}
            >
              {" "}
              Login{" "}
            </Button>
          ) : (
            <div className="dropdown">
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
                className={`dropdown-menu  ${styles.parentNavDropdown}`}
                aria-labelledby="dropdownMenuLink"
              >
                <p
                  className="  dropdown-item mb-0"
                  onClick={navigateToAWProfile}
                >
                  Profile
                </p>
                <p
                  className="text-danger dropdown-item mb-0"
                  onClick={handleAWLogout}
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
