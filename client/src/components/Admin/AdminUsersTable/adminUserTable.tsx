import { Table } from "react-bootstrap";
import "./adminUserTable.css";


export const AdminUserTable = ({}) => {
  
  return (
    <>
      <Table striped bordered hover id="admin-users-table-container">
        <thead>
          <tr>
            <th>No</th>
            <th>User Name</th>
            <th>Age</th>
            <th>Location</th>
            <th>Contact Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
      {/* pagination buttons here */}
    </>
  );
};

