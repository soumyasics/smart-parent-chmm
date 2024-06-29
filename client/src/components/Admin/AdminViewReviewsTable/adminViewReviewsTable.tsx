import { Table } from "react-bootstrap";
import "./adminUserTable.css";
import { useFetchData } from "../../../hooks/useFetchData";

export const AdminViewReviewsTable = ({}) => {
  const { data } = useFetchData(`getAllRating`);
  return (
    <>
      <Table striped bordered hover id="admin-users-table-container">
        <thead>
          <tr>
            <th>No.</th>
            <th>Reviewer name</th>
            <th>Health Professional Name</th>
            <th>Review </th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map((rev: any, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{rev?.parentId?.name}</td>
              <td>{rev?.healthProfessionalId?.name}</td>
              <td>{rev?.review}</td>
              <td>{rev?.rating}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* pagination buttons here */}
    </>
  );
};
