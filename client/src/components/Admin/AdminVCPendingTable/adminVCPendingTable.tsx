import { FC } from "react";
import { Button, Table } from "react-bootstrap";
import "./adminParentsTable.css";

export const AdminVCPendingTable = ({
  VCPendingData,
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
          {VCPendingData?.map((v, i) => {
            return (
              <tr key={v._id}>
                <td>{i + 1}</td>
                <td>{v.name}</td>
                <td>{v.email}</td>
                <td>{v.dateOfBirth}</td>
                <td>{v.address}</td>
                <td>{v.phoneNumber}</td>
                <td>
                  <Button variant="success">Accept</Button>
                </td>
                <td>
                  <Button variant="danger">Reject</Button>
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
