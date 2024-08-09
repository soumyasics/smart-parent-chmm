import { Table } from "react-bootstrap";
import "./adminUserTable.css";
import { useFetchData } from "../../../hooks/useFetchData";

export const AdminViewSubsTable = ({}) => {
  const { data } = useFetchData(`getAllSubscriptions`);
  return (
    <>
      <Table striped bordered hover id="admin-users-table-container">
        <thead>
          <tr>
            <th>Professional Name</th>
            <th>Category</th>
            <th>Professional Email</th>
            <th>Parent Name</th>
            <th>Parent Email</th>
            <th>Payment amount</th>
            <th>Subscription date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((hp: any) => {
            if (hp?.healthProfessionalId.isActive === "suspended") {
              return null;
            }
            if (hp?.healthProfessionalId.category !== "Fitness Specialist") {
              return null;
            }
            return (
              <tr key={hp._id}>
                <td>{hp?.healthProfessionalId?.name}</td>
                <td>{hp?.healthProfessionalId?.category}</td>
                <td>{hp?.healthProfessionalId?.email}</td>
                <td>{hp?.parentId?.name}</td>
                <td>{hp?.parentId?.email}</td>
                <td>{hp?.subscriptionAmount}</td>
                <td>{hp?.date?.substring(0, 10)}</td>
               
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* pagination buttons here */}
    </>
  );
};
