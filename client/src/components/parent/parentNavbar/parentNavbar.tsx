import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import styles from "./parentNavbar.module.css";
import { Button, Image } from "react-bootstrap";
import userPlaceholderImg from "../../../assets/user-placeholder.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../redux/reducers/userSlilce";
import { UserData } from "../../../redux/types";
import { useProfilePicture } from "../../../hooks/useProfilePicture";
export const ParentNavbar = () => {
  const [profilePic, setProfilePic] = useState<string>(userPlaceholderImg);
  const [isParentLoggedIn, setIsParentLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState("User Name");

  const { isAuthenticated, userData, userType } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let pic = userData?.profilePicture?.filename || null;
  const { profilePicture } = useProfilePicture(pic);

  useEffect(() => {
    if (isAuthenticated && userType === "parent") {
      setIsParentLoggedIn(true);
      collectUserDetails(userData);
    } else {
      navigate("/parent/login");
    }
  }, [isAuthenticated, userData, profilePicture]);

  const collectUserDetails = (userData: UserData | null) => {
    const name = userData?.name?.substring(0, 15) || "";
    setUserName(name);
    setProfilePic(profilePicture);
  };

  const navigateParentLogin = () => {
    navigate("/parent/login");
  };

  const redirectParentHome = () => {
    navigate("/parent/home");
  };

  const redirectToParentProfile = () => {
    navigate("/parent/profile");
  };

  const redirectToVaccinationCenters = () => {
    navigate("/parent/view-vc");
  };
  const redirectToBookVaccine = () => {
    navigate("/parent/book-vaccine");
  };
  const redirectToHP = () => {
    navigate("/parent/view-hp");
  };
  const redirectToSubscribedHP = () => {
    navigate("/parent/view-subscribed-hp");
  };
  const redirectToAW = () => {
    navigate("/parent/view-aw");
  };

  const handleLogout = () => {
    dispatch(userLoggedOut());
    navigate("/parent/login");
  };

  const redirectToVaccinationChart = () => {
    navigate("/parent/vc-chart");
  };

  return (
    <div className="bg-dark text-white px-4">
      <Navbar expand="lg" className={`text-white pe-5 ${styles.parentNavbar}`}>
        <Container>
          <Navbar.Brand
            onClick={redirectParentHome}
            role="button"
            className="fw-bold text-white"
          >
            Child Crescendo
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-n av">
            <Nav className="ms-5 text-white w-75 justify-content-between align-items-center">
              <p className="my-0" role="button" onClick={redirectParentHome}>
                Home
              </p>

              <p className="my-0" role="button" onClick={redirectToAW}>
                Asha Workers
              </p>

              <div className="dropdown" role="button">
                <button
                  style={{ width: "180px", border: "none" }}
                  className="btn d-flex btn-secondary bg-dark"
                  id="dropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                >
                  Health Professional
                </button>

                <div
                  style={{ cursor: "pointer" }}
                  className={`dropdown-menu ${styles.parentNavDropdown}`}
                  aria-labelledby="dropdownMenuLink"
                >
                  <p
                    className="dropdown-item mb-0"
                    role="button"
                    onClick={redirectToHP}
                  >
                    View all
                  </p>
                  <p
                    className="dropdown-item mb-0"
                    role="button"
                    onClick={redirectToSubscribedHP}
                  >
                    View Subscribed
                  </p>
                </div>
              </div>

              <div className="dropdown" role="button">
                <button
                  style={{ width: "180px", border: "none" }}
                  className="btn d-flex btn-secondary bg-dark"
                  id="dropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                >
                  Vaccine
                </button>

                <div
                  style={{ cursor: "pointer" }}
                  className={`dropdown-menu ${styles.parentNavDropdown}`}
                  aria-labelledby="dropdownMenuLink"
                >
                  <p
                    className="dropdown-item mb-0"
                    onClick={redirectToVaccinationCenters}
                  >
                    Vaccination Center
                  </p>
                  <p
                    className="dropdown-item mb-0"
                    onClick={redirectToBookVaccine}
                  >
                    Book Vaccine
                  </p>
                  <p
                    className="dropdown-item mb-0"
                    onClick={redirectToVaccinationChart}
                  >
                    Vaccination Chart
                  </p>
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Navbar.Collapse className="justify-content-end">
          {!isParentLoggedIn ? (
            <Button variant={"outline-light"} onClick={navigateParentLogin}>
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
                <span>{userName.split(" ")[0].substring(0, 15)}</span>
              </button>

              <div
                style={{ cursor: "pointer" }}
                className={`dropdown-menu ${styles.parentNavDropdown}`}
                aria-labelledby="dropdownMenuLink"
              >
                <p
                  className="dropdown-item mb-0"
                  onClick={redirectToParentProfile}
                >
                  Profile
                </p>
                <p
                  className="dropdown-item mb-0 text-danger"
                  onClick={handleLogout}
                >
                  Log out
                </p>
              </div>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
