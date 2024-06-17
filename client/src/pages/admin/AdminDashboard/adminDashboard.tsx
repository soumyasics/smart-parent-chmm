import { useState, Fragment } from "react";
import { AdminSidebar } from "../../../components/Admin/AdminSidebar/AdminSidebar.tsx";
import { AdminParents } from "../../../components/Admin/AdminParents/adminParents.tsx";
import { AdminVCPending } from "../../../components/Admin/AdminVCPending/adminVCPending.tsx";
import "./adminDashboard.css";
import { AdminHPPending } from "../../../components/Admin/AdminHpPending/adminHpPending.tsx";

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
          {activePage === "hp" && <AdminParents />}
          {activePage === "vcPending" && <AdminVCPending />}
          {activePage === "HPPending" && <AdminHPPending />}
        </div>
      </div>
    </Fragment>
  );
};
