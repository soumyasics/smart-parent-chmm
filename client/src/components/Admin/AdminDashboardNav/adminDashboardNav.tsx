import { IoMdNotifications } from "react-icons/io";
import { IoMdContacts } from "react-icons/io";
import "./adminDashboardNav.css";
const AdminDashboardNav = () => {
  return (
    <div id="admin-dashboard-nav">
      <div className="admin-dashboard-nav-logo-container">
        <IoMdContacts />
        <IoMdNotifications />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl-mtd7OivuW-lrMHRVoCegO0IW8n0rL73IQ&usqp=CAU"
          alt="admin-logo"
        />
      </div>
    </div>
  );
};
export default AdminDashboardNav;
