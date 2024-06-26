import { ListGroup } from "react-bootstrap";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import "./profileLeftSidebar.css";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { userLoggedOut } from "../../../../redux/reducers/userSlilce";
import { useNavigate } from "react-router-dom";
import { TbVaccine } from "react-icons/tb";
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
    navigate("/vc/login");
  };
  return (
    <div className="left-sidebar">
      <h2 className="sidebar-title">Vaccination Center</h2>
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
          onClick={() => changeActivePage("view-vaccines")}
        >
          <TbVaccine className="sidebar-icon" /> View Vaccines
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
