import { FcBinoculars } from "react-icons/fc";
import { FcVoicePresentation } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import { FcCollaboration } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcInTransit } from "react-icons/fc";
import { FcServices } from "react-icons/fc";
import { FcPositiveDynamic } from "react-icons/fc";
import { MdLeaderboard } from "react-icons/md";
import { FcOrganization } from "react-icons/fc";
import { FcPlus } from "react-icons/fc";
import { FcImport } from "react-icons/fc";
import { LuLogOut } from "react-icons/lu";
import { FcDepartment } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { FaSchool } from "react-icons/fa6";
import "./AdminSidebar.css";
const AdminSidebar = ({ activePage, changeActivePage }) => {
  const navigate = useNavigate();
  function handleLogout() {
    if (localStorage.getItem("cc-admin")) {
      localStorage.removeItem("cc-admin");
    }
    navigate("/admin/login");
  }
  return (
    <div className="admin-sidebar-container">
      <div className="sidebar-heading">
        <FcBusinessman />
        <h5> Community Connect</h5>
        <h5> Administration</h5>
      </div>
      <hr className="admin-sidebar-hr" />

      <div className="admin-sidebar-links">
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("overview")}
        >
          <FcBinoculars />
          <h5>Overview</h5>
        </div>
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("users")}
        >
          <FcVoicePresentation />
          <h5>Users</h5>
        </div>
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("institutes")}
        >
          <FaSchool />
          <h5>Institutes</h5>
        </div>
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("orphanages")}
        >
          <FcHome />
          <h5>Orphanages</h5>
        </div>
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("organizations")}
        >
          <FcOrganization />
          <h5>Organizations</h5>
        </div>
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("donation-requests")}
        >
          <FcImport />
          <h5>Donation Requests</h5>
        </div>
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("camps")}
        >
          <FcPlus />
          <h5>Camps</h5>
        </div>
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("leaderboard")}
        >
          <FcPositiveDynamic />
          <h5>Leaderboard</h5>
        </div>
        <div className="admin-sidebar-link" onClick={handleLogout}>
          <LuLogOut />
          <h5 className="text-danger">Logout</h5>
        </div>
       
      </div>
    </div>
  );
};
export default AdminSidebar;
