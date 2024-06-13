import { ListGroup } from "react-bootstrap";
import {
  FaUser,
  FaStar,
  FaCog,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";
import { RiTodoFill } from "react-icons/ri";
import { CgDisplayGrid } from "react-icons/cg";
import "./profileLeftSidebar.css";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { userLoggedOut } from "../../../../redux/reducers/userSlilce";
import { useNavigate } from "react-router-dom";

interface ParentProfileLeftSidebarProps {
  changeActivePage: (page: string) => void;
}
export const ParentProfileLeftSidebar: React.FC<
  ParentProfileLeftSidebarProps
> = ({ changeActivePage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleParentLogout = () => {
    dispatch(userLoggedOut());
    navigate("/parent/login");
  };
  return (
    <div className="left-sidebar">
      <h2 className="sidebar-title">Parent Profile</h2>
      <ListGroup variant="flush" id="profile-page-sidebar">
        <ListGroup.Item
          className="sidebar-item d-flex"
          onClick={() => changeActivePage("profile")}
        >
          <FaUser className="sidebar-icon" /> Profile
        </ListGroup.Item>
        <ListGroup.Item
          className="sidebar-item d-flex"
          onClick={() => changeActivePage("add-todo")}
        >
          <RiTodoFill className="sidebar-icon" /> Add Todos
        </ListGroup.Item>
        <ListGroup.Item
          className="sidebar-item d-flex"
          onClick={() => changeActivePage("display-todo")}
        >
          <CgDisplayGrid className="sidebar-icon" /> Display Todos
        </ListGroup.Item>
        <ListGroup.Item
          className="sidebar-item d-flex"
          onClick={() => changeActivePage("notifications")}
        >
          <FaBell className="sidebar-icon" /> Notifications
        </ListGroup.Item>
        <ListGroup.Item
          className="sidebar-item d-flex"
          onClick={() => changeActivePage("child")}
        >
          <FaStar className="sidebar-icon" /> Child
        </ListGroup.Item>
        <ListGroup.Item
          className="sidebar-item d-flex"
          onClick={() => changeActivePage("reset-password")}
        >
          <FaCog className="sidebar-icon" /> Reset Password
        </ListGroup.Item>

        <ListGroup.Item
          className="sidebar-item logout text-danger fw-bold d-flex"
          onClick={handleParentLogout}
        >
          <FaSignOutAlt className="sidebar-icon" /> Log out
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

ParentProfileLeftSidebar.propTypes = {
  changeActivePage: PropTypes.func.isRequired,
};
