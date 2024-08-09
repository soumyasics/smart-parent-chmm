import { useNavigate } from "react-router-dom";
import { FcBusinessman, FcShop, FcVoicePresentation } from "react-icons/fc";
import { adminLoggedOut } from "../../../redux/reducers/adminSlice";
import { useDispatch } from "react-redux";
import { FcManager } from "react-icons/fc";
import { LuLogOut } from "react-icons/lu";
import { PiWarningCircleBold } from "react-icons/pi";
import { VscOpenPreview } from "react-icons/vsc";
import { RiHospitalFill } from "react-icons/ri";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineSubscriptions } from "react-icons/md";
import "./AdminSidebar.css";

interface AdminSidebarProps {
  changeActivePage: (page: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  changeActivePage,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(adminLoggedOut());
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
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("vc")}
        >
          <RiHospitalFill />
          <h5>Vaccination Centers</h5>
        </div>
        {/* <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("aw")}
        >
          <FcBusinessman />
          <h5>Asha Workers</h5>
        </div> */}

        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("vcPending")}
        >
          <FcShop />
          <h5>Pending Vaccination Centers</h5>
        </div>
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("HPPending")}
        >
          <FcManager />
          <h5>Pending Health Professionals</h5>
        </div>
        {/* <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("awPending")}
        >
          <FcBusinessman />
          <h5>Pending Asha Workers</h5>
        </div> */}
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("appointments")}
        >
          <IoTicketOutline />
          <h5>View Appointments</h5>
        </div>
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("subscriptions")}
        >
          <MdOutlineSubscriptions />
          <h5>View Subscriptions</h5>
        </div>
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("complaints")}
        >
          <PiWarningCircleBold />
          <h5>View Complaints</h5>
        </div>
        <div
          className="admin-sidebar-link"
          onClick={() => changeActivePage("reviews")}
        >
          <VscOpenPreview />
          <h5>View Reviews</h5>
        </div>

        <div className="admin-sidebar-link" onClick={handleLogout}>
          <LuLogOut />
          <h5 className="text-danger">Logout</h5>
        </div>
      </div>
    </div>
  );
};
