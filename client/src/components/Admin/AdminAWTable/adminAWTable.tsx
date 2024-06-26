import {  Table } from "react-bootstrap";
import "./adminHPTable.css";

export const AdminAWTable = ({ AWsData }: any) => {
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
          </tr>
        </thead>
        <tbody>
          {AWsData?.map((p: any, i: number) => {
            return (
              <tr key={p._id}>
                <td>{i + 1}</td>
                <td>{p?.name}</td>
                <td>{p?.email}</td>
                <td>{p?.address}</td>
                <td>{p?.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
