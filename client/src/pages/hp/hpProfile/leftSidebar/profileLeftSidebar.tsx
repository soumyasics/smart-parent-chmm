import { ListGroup } from "react-bootstrap";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import "./profileLeftSidebar.css";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { userLoggedOut } from "../../../../redux/reducers/userSlilce";
import { useNavigate } from "react-router-dom";
import { FaStickyNote } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { IoMdVideocam } from "react-icons/io";
import { MdOutlineRateReview } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";
interface ParentProfileLeftSidebarProps {
  changeActivePage: (page: string) => void;
}
export const VCProfileLeftSidebar: React.FC<ParentProfileLeftSidebarProps> = ({
  changeActivePage,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleParentLogout = () => {
    dispatch(userLoggedOut());
    navigate("/hp/login");
  };
  return (
    <div className="left-sidebar">
      <h2 className="sidebar-title">Health Professional</h2>
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
          className="sidebar-item d-flex"
          onClick={() => changeActivePage("My-Tutorials")}
        >
          <IoMdVideocam className="sidebar-icon" /> My Tutorials
        </ListGroup.Item>
        <ListGroup.Item
          className="sidebar-item d-flex"
          onClick={() => changeActivePage("My-blogs")}
        >
          <FaStickyNote className="sidebar-icon" /> My Blogs
        </ListGroup.Item>
        <ListGroup.Item
          className="sidebar-item d-flex"
          onClick={() => changeActivePage("My-subscribers")}
        >
          <MdSubscriptions className="sidebar-icon" /> My Subscribers
        </ListGroup.Item>
        <ListGroup.Item
          className="sidebar-item d-flex"
          onClick={() => changeActivePage("My-review")}
        >
          <MdOutlineRateReview className="sidebar-icon" /> Review
        </ListGroup.Item>
        <ListGroup.Item
          className="sidebar-item d-flex"
          onClick={() => changeActivePage("complaints")}
        >
          <FaCommentDots className="sidebar-icon" /> Complaints
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

VCProfileLeftSidebar.propTypes = {
  changeActivePage: PropTypes.func.isRequired,
};
