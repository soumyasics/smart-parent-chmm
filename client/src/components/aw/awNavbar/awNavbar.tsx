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
import { BASE_URL } from "../../../apis/baseUrl";
import { userLoggedOut } from "../../../redux/reducers/userSlilce";

export const AWNavbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userData, userType } = useSelector(
    (state: RootState) => state.user
  );
  const [ashaWorkerLogin, setAshaWorkerLogin] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<string>(userPlaceholderImg);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && userType === "ashaWorker") {
      setAshaWorkerLogin(true);
      const name = userData?.name?.substring(0, 15) || "";
      setUserName(name);
    }
  }, [isAuthenticated, userType]);

  useEffect(() => {
    if (userData) {
      const pic = userData.profilePicture?.filename || null;
      if (pic) {
        setProfilePic(`${BASE_URL}${pic}`);
      } else {
        setProfilePic(userPlaceholderImg);
      }
    }
  }, []);

  const navigateAWLogin = () => {
    navigate("/aw/login");
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
            <Nav className="me-auto  text-white w-50 justify-content-between">
              <p className="my-0 ms-4">Home</p>
              <p className="my-0 ">Blog</p>
              <p className="my-0 ">Link 1</p>
              <p className="my-0 ">Link 2 </p>
              <p className="my-0 ">Link 3 </p>
              <p className="my-0 ">Link 4</p>
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
            <div className="dropdown show">
              <button
                className="btn btn-secondary dropdown-toggle bg-dark"
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
                  onClick={navigateToAWProfile}
                >
                  Profile
                </p>
                <p className="  dropdown-item mb-0">Account</p>
                <p className=" dropdown-item mb-0" onClick={handleAWLogout}>
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
