

import "./adminUsers.css";
import { AdminViewAppoTable } from "../AdminViewAppointmentTable/adminViewReviewsTable.tsx";

export const AdminViewAppointments = () => {
  return (
    <div className="admin-users-container " style={{minHeight: "100vh"}}>
      <div className="admin-user-title-container">
        <h1 className="admin-users-title"> All Appointments  </h1>
      </div>
      <div className="mt-5">
        <AdminViewAppoTable />
      </div>
    </div>
  );
};
