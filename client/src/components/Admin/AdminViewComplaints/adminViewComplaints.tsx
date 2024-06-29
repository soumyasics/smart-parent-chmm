import "./adminUsers.css";
import { AdminViewComplaintsTable } from "../AdminViewComplaintsTable/adminViewComplaintsTable.tsx";

export const AdminViewComplaints = () => {
  return (
    <div className="admin-users-container ">
      <div className="admin-user-title-container">
        <h1 className="admin-users-title"> All Complaints </h1>
      </div>

      <div className="mt-5">
        <AdminViewComplaintsTable />
      </div>
    </div>
  );
};
