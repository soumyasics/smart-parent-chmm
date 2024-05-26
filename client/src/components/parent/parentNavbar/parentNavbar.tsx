import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import styles from "./parentNavbar.module.css";
import { Button, Form, Image } from "react-bootstrap";
import userPlaceholderImg from "../../../assets/user-placeholder.jpg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../apis/baseUrl";
import { userLoggedOut } from "../../../redux/reducers/userSlilce";
export const ParentNavbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const { userData } = useSelector((state: RootState) => state.user);
  const [profilePic, setProfilePic] = useState<string>(userPlaceholderImg);
  const [userName, setUserName] = useState("User Name");
  const dispatch = useDispatch();
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
  }, []);

  const handleLoginPageNavigate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(e.target.value);
  };
  const navigateOptions = [{ value: "/parent/login", label: "Parent" }];

  const navigateParentLogin = () => {
    navigate("/parent/login");
  };

  const handleParentLogout = () => {
    dispatch(userLoggedOut());
    navigate("../parent/login");
  };
  return (
    <div className="bg-dark text-white px-4">
      <Navbar expand="lg" className="text-white pe-5">
        <Container>
          <Navbar.Brand className="text-white" href="#home">
            Child Crescendo
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto  text-white w-50 justify-content-between">
              <p className="my-0 ">Home</p>
              <p className="my-0 ">Todo</p>
              <p className="my-0 ">Vaccination Center</p>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Navbar.Collapse className="justify-content-end">
          {!isAuthenticated ? (
            <Button
              variant={"outline-light"}
              onClick={() => {
                navigateParentLogin();
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
                <p className="  dropdown-item mb-0">Profile</p>
                <p className="  dropdown-item mb-0">Account</p>
                <p className=" dropdown-item mb-0" onClick={handleParentLogout}>
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
