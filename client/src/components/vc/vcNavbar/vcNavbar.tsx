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
import { BASE_URL } from "../../../apis/baseUrl";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../redux/reducers/userSlilce";
export const VCNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const { userData } = useSelector((state: RootState) => state.user);
  const [profilePic, setProfilePic] = useState<string>(userPlaceholderImg);
  const [userName, setUserName] = useState("User Name");
  useEffect(() => {
    if (userData) {
      const name = userData.name.substring(0, 15) || "";
      const pic = userData.profilePicture?.filename || null;
      if (pic) {
        setProfilePic(`${BASE_URL}${pic}`);
      } else {
        setProfilePic(userPlaceholderImg);
      }
      setUserName(name);
    }
  }, [userData]);

  const navigateVCLogin = () => {
    navigate("/vc/login");
  };

  const redirectVCHome = () => {
    navigate("/vc/home");
  };
  const redirectToVCProfile = () => {
    navigate("/vc/profile");
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
            <Nav className="ms-5 text-white w-75 justify-content-between">
              <p className="my-0" role="button" onClick={redirectVCHome}>
                Home
              </p>

              <p className="my-0" role="button" >
                Chat
              </p>
              <p className="my-0" role="button">
                Link 2
              </p>
              <p className="my-0" role="button">
                Link 3
              </p>
              <p className="my-0" role="button">
                Link 4
              </p>
              <p className="my-0" role="button">
                Link 5
              </p>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Navbar.Collapse className="justify-content-end">
          {!isAuthenticated ? (
            <Button variant={"outline-light"} onClick={navigateVCLogin}>
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
