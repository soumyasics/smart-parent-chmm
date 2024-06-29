import { useState, Fragment } from "react";
import { AdminSidebar } from "../../../components/Admin/AdminSidebar/AdminSidebar.tsx";
import { AdminParents } from "../../../components/Admin/AdminParents/adminParents.tsx";
import { AdminVCPending } from "../../../components/Admin/AdminVCPending/adminVCPending.tsx";
import "./adminDashboard.css";
import { AdminHPPending } from "../../../components/Admin/AdminHpPending/adminHpPending.tsx";
import { AdminAWPending } from "../../../components/Admin/AdminAWPending/adminAWPending.tsx";
import { AdminHP } from "../../../components/Admin/AdminHP/adminHP.tsx";
import { AdminViewComplaints } from "../../../components/Admin/AdminViewComplaints/adminViewComplaints.tsx";

export const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("parents");
  const changeActivePage = (page: string) => {
    setActivePage(page);
  };

  

  return (
    <Fragment>
      <div className="admin-dashboard-container">
        <AdminSidebar changeActivePage={changeActivePage} />

        <div className="admin-dashboard-main-bar">
          {/* {activePage === "parents" && <} */}
          {activePage === "parents" && <AdminParents />}
          {activePage === "hp" && <AdminHP/>}
          {activePage === "vcPending" && <AdminVCPending />}
          {activePage === "HPPending" && <AdminHPPending />}
          {activePage === "awPending" && <AdminAWPending />}
          {activePage === "complaints" && <AdminViewComplaints />}
        </div>
      </div>
    </Fragment>
  );
};
