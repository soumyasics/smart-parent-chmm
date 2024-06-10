import { useNavigate } from "react-router-dom";
import {
  FcBinoculars,
  FcBusinessman,
  FcBusinesswoman,
  FcVoicePresentation,
} from "react-icons/fc";
import { LuLogOut } from "react-icons/lu";
import "./AdminSidebar.css";

interface AdminSidebarProps {
  changeActivePage: (page: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  changeActivePage,
}) => {
  const navigate = useNavigate();
  function handleLogout() {
    if (localStorage.getItem("crescendo-admin")) {
      localStorage.removeItem("crescendo-admin");
    }
    navigate("/admin/login");
  }
  return (
    <div className="admin-sidebar-container">
      <div className="sidebar-heading ">
        <FcBusinessman />
        <h5> Child Crescendo</h5>
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
          onClick={() => changeActivePage("parents")}
        >
          <FcVoicePresentation />
          <h5>Parents</h5>
        </div>
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("hp")}
        >
          <FcBusinessman />
          <h5>Health Professionals</h5>
        </div>
        <div className="admin-sidebar-link" onClick={handleLogout}>
          <LuLogOut />
          <h5 className="text-danger">Logout</h5>
        </div>
      </div>
    </div>
  );
};