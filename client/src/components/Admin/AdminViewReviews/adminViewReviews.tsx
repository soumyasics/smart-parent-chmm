

import "./adminUsers.css";
import { AdminViewReviewsTable } from "../AdminViewReviewsTable/adminViewReviewsTable.tsx";

export const AdminViewReviews = () => {
  return (
    <div className="admin-users-container " style={{minHeight: "100vh"}}>
      <div className="admin-user-title-container">
        <h1 className="admin-users-title"> All Reviews  </h1>
      </div>
 

      <div className="mt-5">
        <AdminViewReviewsTable />
      </div>
    </div>
  );
};
