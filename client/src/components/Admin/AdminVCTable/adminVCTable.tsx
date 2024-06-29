import { FC } from "react";
import {  Table } from "react-bootstrap";
import "./adminParentsTable.css";
interface VCData {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  district: string;
  profilePicture: File | null;
}
interface AdminParentsTableProps {
  vcsData: VCData[];
}
export const AdminVCTable: FC<AdminParentsTableProps> = ({
  vcsData,
}) => {
  return (
    <>
      <Table striped bordered hover id="admin-users-table-container">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>District</th>
            <th>Address</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {vcsData?.map((p, i) => {
            return (
              <tr key={p._id}>
                <td>{i + 1}</td>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{p.district}</td>
                <td>{p.address}</td>
                <td>{p.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
