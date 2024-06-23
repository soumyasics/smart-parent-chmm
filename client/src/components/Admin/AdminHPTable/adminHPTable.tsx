import { Button, Table } from "react-bootstrap";
import "./adminHPTable.css";

export const AdminHPTable = ({ HPsData }: any) => {
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
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {HPsData?.map((p: any, i: number) => {
            return (
              <tr key={p._id}>
                <td>{i + 1}</td>
                <td>{p?.name}</td>
                <td>{p?.email}</td>
                <td>{p?.address}</td>
                <td>{p?.phoneNumber}</td>
                <td>{p?.category}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
