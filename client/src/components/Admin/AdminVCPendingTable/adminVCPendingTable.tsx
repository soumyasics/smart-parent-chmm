import { FC } from "react";
import { Button, Table } from "react-bootstrap";
import "./adminVCPendingTable.css";

export const AdminVCPendingTable = ({ vcPendingData, rejectVc, approveVc }) => {
  return (
    <>
      <Table striped bordered hover id="admin-users-table-container">
        <thead>
          <tr>
            <th>No</th>
            <th>Center Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Approve</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {vcPendingData?.map((v, i) => {
            return (
              <tr key={v._id}>
                <td>{i + 1}</td>
                <td>{v.name}</td>
                <td>{v.email}</td>
                <td>{v.address}</td>
                <td>{v.phoneNumber}</td>
                <td>
                  <Button
                    onClick={() => {
                      approveVc(v._id);
                    }}
                    variant="success"
                  >
                    Approve
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      rejectVc(v._id);
                    }}
                    variant="danger"
                  >
                    Reject
                  </Button>
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
