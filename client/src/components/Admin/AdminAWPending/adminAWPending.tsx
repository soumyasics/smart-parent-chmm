import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance.ts";
import AdminDashboardNav from "../AdminDashboardNav/adminDashboardNav.tsx";
import {toast} from 'react-hot-toast'
import "./adminAWPending.css";
import { AdminAWPendingTable } from "../AdminAWPendingTable/adminAWPendingTable.tsx";

export const AdminAWPending = () => {
  const [awPendingData, setawPendingData] = useState([]);
  const [error, setError] = useState("");

  console.log("err", error);
  useEffect(() => {
    getPendingAWs();
  }, []);

  const approveAW = async (id: string) => {
    try {
      const res = await axiosInstance.patch(`/adminApprovedAWRequest/${id}`);
      if (res.status === 200) {
        toast.success("asha worker approved successfully.");
        return;
      }
    } catch (error) {
      console.log("Error on get approve asha worker", error);
    } finally {
      getPendingAWs();
    }
  };
  const rejectAW = async (id: string) => {
    try {
      const res = await axiosInstance.patch(`/adminRejectedAWRequest/${id}`);
      if (res.status === 200) {
        toast.success("Asha Worker rejected successfully.");
        return;
      }
    } catch (error) {
      console.log("Error on get reject asha worker", error);
    } finally {
      getPendingAWs();
    }
  };

  const getPendingAWs = async () => {
    try {
      const res = await axiosInstance.get("/getAllPendingAw");
      if (res.status === 200) {
        const data = res.data?.data;
        setawPendingData(data);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log("Error on get pending asha worker", err);
      setError("Something went wrong. Please check your internet connection");
    }
  };

  return (
    <div className="admin-users-container ">
      <AdminDashboardNav />
      <div className="admin-user-title-container">
        <h1 className="admin-users-title">
          {" "}
           Asha worker Pending Requests
        </h1>
      </div>
      <div className="admin-users-search-container"></div>

      <div className="mt-5" style={{ minHeight: "600px" }}>
        <AdminAWPendingTable
          rejectAW={rejectAW}
          approveAW={approveAW}
          awPendingData={awPendingData}
        />
      </div>
    </div>
  );
};
