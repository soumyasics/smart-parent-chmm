import { useState, Fragment } from "react";
import AdminSidebar from "../../../Components/Admin/AdminSidebar/AdminSidebar";
import AdminOverview from "../../../Components/Admin/AdminOverview/adminOverview";
import AdminUsers from "../../../Components/Admin/AdminUsers/adminUsers";

import "./adminDashboard.css";
const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("overview");
  const changeActivePage = (page) => {
    setActivePage(page);
  };

  return (
    <Fragment>
      <div className="admin-dashboard-container">
        <AdminSidebar
          activePage={activePage}
          changeActivePage={changeActivePage}
        />

        <div className="admin-dashboard-main-bar">
          <AdminDashboardNav />
          {activePage === "overview" && <AdminOverview />}
          {activePage === "users" && <AdminUsers />}
        </div>
      </div>
    </Fragment>
  );
};
export default AdminDashboard;
