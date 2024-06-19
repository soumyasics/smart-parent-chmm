import { Button, Table } from "react-bootstrap";
import "./adminAWPendingTable.css";

export const AdminAWPendingTable = ({ awPendingData, rejectAW, approveAW }: any) => {
  return (
    <>
      <Table striped bordered hover id="admin-users-table-container">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Approve</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {awPendingData?.map((h: any, i: any) => {
            return (
              <tr key={h._id}>
                <td>{i + 1}</td>
                <td>{h.name}</td>
                <td>{h.email}</td>
                <td>{h.address}</td>
                <td>{h.phoneNumber}</td>
                <td>
                  <Button
                    onClick={() => {
                      approveAW(h._id);
                    }}
                    variant="success"
                  >
                    Approve
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      rejectAW(h._id);
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
