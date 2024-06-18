import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance.ts";
import AdminDashboardNav from "../AdminDashboardNav/adminDashboardNav.tsx";
import { AdminHPPendingTable } from "../AdminHPPendingTable/adminHPPendingTable.tsx";
import {toast} from 'react-hot-toast'
import "./adminHPPending.css";

export const AdminHPPending = () => {
  const [hpPendingData, setHPPendingData] = useState([]);
  const [error, setError] = useState("");

  console.log("err", error);
  useEffect(() => {
    getPendingVCs();
  }, []);

  const approveHP = async (id: string) => {
    try {
      const res = await axiosInstance.patch(`/adminApprovedHPRequest/${id}`);
      if (res.status === 200) {
        toast.success("Health professional approved successfully.");
        return;
      }
    } catch (error) {
      console.log("Error on get approve health professional", error);
    } finally {
      getPendingVCs();
    }
  };
  const rejectHP = async (id: string) => {
    try {
      const res = await axiosInstance.patch(`/adminRejectedHPRequest/${id}`);
      if (res.status === 200) {
        toast.success("Health professional rejected successfully.");
        return;
      }
    } catch (error) {
      console.log("Error on get reject health professional", error);
    } finally {
      getPendingVCs();
    }
  };

  const getPendingVCs = async () => {
    try {
      const res = await axiosInstance.get("/getAllPendingHp");
      if (res.status === 200) {
        const data = res.data?.data;
        setHPPendingData(data);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log("Error on get pending health professional", err);
      setError("Something went wrong. Please check your internet connection");
    }
  };

  return (
    <div className="admin-users-container ">
      <AdminDashboardNav />
      <div className="admin-user-title-container">
        <h1 className="admin-users-title">
          {" "}
           Health Professional Pending Requests
        </h1>
      </div>
      <div className="admin-users-search-container"></div>

      <div className="mt-5" style={{ minHeight: "600px" }}>
        <AdminHPPendingTable
          rejectHP={rejectHP}
          approveHP={approveHP}
          hpPendingData={hpPendingData}
        />
      </div>
    </div>
  );
};
