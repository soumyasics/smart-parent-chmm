import { ListGroup } from "react-bootstrap";
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./profileLeftSidebar.css";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { userLoggedOut } from "../../../../redux/reducers/userSlilce";
import { useNavigate } from "react-router-dom";

interface AWProfileLeftSidebarProps {
  changeActivePage: (page: string) => void;
}
export const AWProfileLeftSidebar: React.FC<
AWProfileLeftSidebarProps
> = ({ changeActivePage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAWLogout = () => {
    dispatch(userLoggedOut());
    navigate("/aw/login");
  };
  return (
    <div className="left-sidebar">
      <h2 className="sidebar-title">Asha Worker</h2>
      <ListGroup variant="flush" id="profile-page-sidebar">
        <ListGroup.Item
          className="sidebar-item d-flex"
          onClick={() => changeActivePage("profile")}
        >
          <FaUser className="sidebar-icon" /> Profile
        </ListGroup.Item>
    
       
      
        <ListGroup.Item
          className="sidebar-item d-flex"
          onClick={() => changeActivePage("reset-password")}
        >
          <FaCog className="sidebar-icon" /> Reset Password
        </ListGroup.Item>

        <ListGroup.Item
          className="sidebar-item logout text-danger fw-bold d-flex"
          onClick={handleAWLogout}
        >
          <FaSignOutAlt className="sidebar-icon" /> Log out
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};


AWProfileLeftSidebar.propTypes = {
  changeActivePage: PropTypes.func.isRequired,
};
