import { Table } from "react-bootstrap";
import "./adminUserTable.css";
import { useFetchData } from "../../../hooks/useFetchData";

export const AdminViewAppoTable = () => {
  const { data } = useFetchData(`getAllSubscriptions`);
  return (
    <>
      <Table striped bordered hover id="admin-users-table-container">
        <thead>
          <tr>
            <th>Professional Name</th>
            <th>Professional Email</th>
            <th>Parent Name</th>
            <th>Parent Email</th>
            <th>Date</th>
            <th>Time</th>
            <th>Fee</th>
          </tr>
        </thead>
        <tbody>
          {data.map((hp: any) => {
            if (hp?.healthProfessionalId.isActive === "suspended") {
              return null;
            }
            if (hp?.healthProfessionalId.category === "Fitness Specialist") {
              return null;
            }
            return (
              <tr key={hp._id}>
                <td>{hp?.healthProfessionalId?.name}</td>
                <td>{hp?.healthProfessionalId?.email}</td>
                <td>{hp?.parentId?.name}</td>
                <td>{hp?.parentId?.email}</td>
                <td>{hp?.date?.substring(0, 10)}</td>
                <td>{hp?.date?.substring(11, 16)}</td>
                <td>{hp?.subscriptionAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* pagination buttons here */}
    </>
  );
};
