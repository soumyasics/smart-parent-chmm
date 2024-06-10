import {AdminNavbar} from "../../../components/Admin/AdminNavbar/adminNavbar.tsx";
import {AdminLoginForm} from "../../../components/Admin/AdminLoginForm/adminLoginForm.tsx";
import {AdminFooter} from "../../../components/Admin/AdminFooter/adminFooter.tsx";
import "./AdminLogin.css";
export const AdminLogin = () => {
  return (
    <div className="admin-login-container">
      <AdminNavbar />
      <AdminLoginForm />
      <div style={{ position: "absolute", bottom: "0" }} className="w-100">
        <AdminFooter />
      </div>
    </div>
  );
};
