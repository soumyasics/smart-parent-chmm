

import "./adminUsers.css";
import { AdminViewSubsTable } from "../AdminViewSubsTable/adminViewReviewsTable.tsx";

export const AdminViewSubscriptions = () => {
  return (
    <div className="admin-users-container " style={{minHeight: "100vh"}}>
      <div className="admin-user-title-container">
        <h1 className="admin-users-title"> All Subscriptions  </h1>
      </div>
      <div className="mt-5">
        <AdminViewSubsTable />
      </div>
    </div>
  );
};
