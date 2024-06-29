import { Table } from "react-bootstrap";
import "./adminUserTable.css";
import { useFetchData } from "../../../hooks/useFetchData";

export const AdminViewComplaintsTable = ({}) => {
  const { data } = useFetchData(`getAllComplaints`);
  return (
    <>
      <Table striped bordered hover id="admin-users-table-container">
        <thead>
          <tr>
            <th>No.</th>
            <th>Complainor name</th>
            <th>Health Professional Name</th>
            <th>Complaint</th>
            <th>Complainor Email</th>
            <th>Health Professional Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((rev: any, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{rev?.parentId?.name}</td>
              <td>{rev?.healthProfessionalId?.name}</td>
              <td>{rev?.complaint}</td>
              <td>{rev?.parentId?.email}</td>
              <td>{rev?.healthProfessionalId?.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* pagination buttons here */}
    </>
  );
};
