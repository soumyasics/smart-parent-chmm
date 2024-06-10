
import { InputGroup, Form } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import { AdminUserTable } from "../AdminUsersTable/adminUserTable.tsx";
import "./adminUsers.css";

export const AdminUsers= () => {
  return (
    <div className="admin-users-container ">
      <div className="admin-user-title-container">
        <h1 className="admin-users-title"> All Users  </h1>
      </div>
      <div className="admin-users-search-container">
        <InputGroup className="mt-5">
          <InputGroup.Text>
            <IoIosSearch />
          </InputGroup.Text>
          <Form.Control
            id="user-search-id"
            placeholder="Search Users"
            aria-label="users"
          />
        </InputGroup>
      </div>

      <div className="mt-5">
        <AdminUserTable />
      </div>
    </div>
  );
};
