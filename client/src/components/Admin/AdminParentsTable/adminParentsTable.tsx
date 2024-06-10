import { FC } from "react";
import { Button, Table } from "react-bootstrap";
import "./adminParentsTable.css";
interface ParentData {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  profilePicture: File | null;
}
interface AdminParentsTableProps {
  parentsData: ParentData[];
}
export const AdminParentsTable: FC<AdminParentsTableProps> = ({
  parentsData,
}) => {
  return (
    <>
      <Table striped bordered hover id="admin-users-table-container">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date Of Birth</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {parentsData?.map((p, i) => {
            return (
              <tr key={p._id}>
                <td>{i + 1}</td>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{p.dateOfBirth}</td>
                <td>{p.address}</td>
                <td>{p.phoneNumber}</td>
                <td>
                  <Button variant="danger">Remove</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* pagination buttons here */}
    </>
  );
};
