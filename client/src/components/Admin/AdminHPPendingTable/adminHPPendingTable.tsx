import { Button, Table } from "react-bootstrap";
import "./adminHPPendingTable.css";
import { useState } from "react";
import { ViewCertificateModal } from "./certificateModal";
import { BASE_URL } from "../../../apis/baseUrl";

export const AdminHPPendingTable = ({
  hpPendingData,
  rejectHP,
  approveHP,
}: any) => {
  const [certificateImg, setCertificateImg] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const viewCert = (hp: any) => {
    console.log("hp", hp)
    if (!hp?.certificateImg) {
      return;
    }
    

    const path = hp?.certificateImg?.filename || null;
    console.log("patth", path)
    if (path) {
      setCertificateImg(BASE_URL + path);
    }
    setModalShow(true);
  }
  
  return (
    <div className="hp-table-container">
      <ViewCertificateModal
        certificateImg={certificateImg}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Table striped bordered hover id="admin-users-table-container">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            {/* <th>Address</th> */}
            <th>Category</th>
            <th>Phone Number</th>
            <th>View Certificate</th>
            <th>Approve</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {hpPendingData?.map((h: any, i: any) => {
            return (
              <tr key={h._id}>
                <td>{i + 1}</td>
                <td>{h.name}</td>
                <td>{h.email}</td>
                {/* <td>{h.address}</td> */}
                <td>{h.category}</td>
                <td>{h.phoneNumber}</td>
                <td>
                  <Button onClick={() => {
                    viewCert(h)
                  }}> View </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      approveHP(h._id);
                    }}
                    variant="success"
                  >
                    Approve
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      rejectHP(h._id);
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
    </div>
  );
};
