import { ListGroup } from "react-bootstrap";
import {
  FaUser,
  FaHeart,
  FaStar,
  FaCog,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";
import "./profileLeftSidebar.css";
import PropTypes from 'prop-types';

interface ParentProfileLeftSidebarProps {
  changeActivePage: (page: string) => void;
}
export const ParentProfileLeftSidebar: React.FC<
  ParentProfileLeftSidebarProps
> = ({ changeActivePage }) => {
  return (
    <div className="left-sidebar">
      <h2 className="sidebar-title">Parent Profile</h2>
      <ListGroup variant="flush" id="profile-page-sidebar">
        <ListGroup.Item
          className="sidebar-item"
          onClick={() => changeActivePage("profile")}
        >
          <FaUser className="sidebar-icon" /> Profile
        </ListGroup.Item>
        <ListGroup.Item
          className="sidebar-item"
          onClick={() => changeActivePage("todos")}
        >
          <FaHeart className="sidebar-icon" /> Todos
        </ListGroup.Item>
        <ListGroup.Item
          className="sidebar-item"
          onClick={() => changeActivePage("notifications")}
        >
          <FaBell className="sidebar-icon" /> Notifications
        </ListGroup.Item>
        <ListGroup.Item
          className="sidebar-item"
          onClick={() => changeActivePage("child")}
        >
          <FaStar className="sidebar-icon" /> Child
        </ListGroup.Item>
        <ListGroup.Item
          className="sidebar-item"
          onClick={() => changeActivePage("settings")}
        >
          <FaCog className="sidebar-icon" /> Settings
        </ListGroup.Item>

        <ListGroup.Item className="sidebar-item logout text-danger fw-bold">
          <FaSignOutAlt className="sidebar-icon" /> Log out
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

ParentProfileLeftSidebar.propTypes = {
  changeActivePage: PropTypes.func.isRequired
}