import { Button, Table } from "react-bootstrap";
import "./adminUserTable.css";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import axios from "axios";
import { WarningModal } from "./warningModal";

export const AdminViewComplaintsTable = ({}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [warningHPId, setWarningHPId] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setWarningHPId("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(`getAllComplaints`);
      if (res.status === 200) {
        const data = res?.data?.data || [];
        setData(data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error?.response?.data?.message || "Something went wrong!";
        setError(message);
      } else {
        setError("Check your network connection!");
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      console.log("error", error);
      console.log("loading", isLoading);
    }
  };

  const suspendHP = async (id: string) => {
    if (!id) {
      toast.error("Network issue.");
      return;
    }
    try {
      const res = await axiosInstance.patch(
        `healthProfessionalDeactivate/${id}`
      );
      if (res.status === 200) {
        toast.success("Health professional suspended successfully");
      } else {
        toast.error("Network issue.");
      }
    } catch (error) {
      console.log("suspendHP =>", error);
      toast.error("Network issue.");
    } finally {
      fetchData();
    }
  };
  const reactivateHP = async (id: string) => {
    if (!id) {
      toast.error("Network issue.");
      return;
    }
    try {
      const res = await axiosInstance.patch(`healthProfessionalActivate/${id}`);
      if (res.status === 200) {
        toast.success("Health professional reactivated successfully");
      } else {
        toast.error("Network issue.");
      }
    } catch (error) {
      console.log("suspendHP =>", error);
      toast.error("Network issue.");
    } finally {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendWarning = (id: string) => {
    setWarningHPId((prev) => (prev = id));
  };
  useEffect(() => {
    if (warningHPId) {
      handleShow();
    }
  }, [warningHPId]);
  return (
    <>
      <div style={{ display: "none" }}>
        <WarningModal
          HPId={warningHPId}
          handleClose={handleClose}
          handleShow={handleShow}
          show={show}
        />
      </div>
      <div className="admin-users-table-container">
        <Table
          striped
          bordered
          hover
          id="admin-users-table-container"
        >
          <thead>
            <tr>
              <th>No.</th>
              <th>Complainor name</th>
              <th>Health Professional Name</th>
              <th>Complaint</th>
              <th>Health Professional Email</th>
              <th>Health Professional Status</th>
              <th>Send Warning</th>
              <th>Take Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((rev: any, i) => {
              const findStatus = () => {
                const hp = rev?.healthProfessionalId;
                console.log("hpp", hp);
                const isActive = hp?.isActive === "active";
                if (isActive) {
                  return "Active";
                }
                return "Suspended";
              };
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{rev?.parentId?.name}</td>
                  <td>{rev?.healthProfessionalId?.name}</td>
                  <td>{rev?.complaint}</td>
                  <td>{rev?.healthProfessionalId?.email}</td>
                  <td>{findStatus()}</td>
                  <td>
                    <Button
                      onClick={() => {
                        sendWarning(rev?.healthProfessionalId?._id);
                      }}
                    >
                      Send{" "}
                    </Button>
                  </td>
                  <td>
                    {findStatus() === "Active" ? (
                      <Button
                        variant={"danger"}
                        onClick={() => {
                          suspendHP(rev?.healthProfessionalId?._id);
                        }}
                      >
                        Suspend
                      </Button>
                    ) : (
                      <Button
                        variant={"success"}
                        onClick={() => {
                          reactivateHP(rev?.healthProfessionalId?._id);
                        }}
                      >
                        Activate
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};
