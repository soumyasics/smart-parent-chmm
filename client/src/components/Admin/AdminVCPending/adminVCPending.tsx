import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance.ts";
import AdminDashboardNav from "../AdminDashboardNav/adminDashboardNav.tsx";
import { AdminVCPendingTable } from "../AdminVCPendingTable/adminVCPendingTable.tsx";
import "./adminVCPending.css";
import {toast} from "react-hot-toast";

export const AdminVCPending = () => {
  const [vcPendingData, setVCPendingData] = useState([]);
  const [error, setError] = useState("");

  console.log("err", error);
  useEffect(() => {
    getPendingVCs();
  }, []);

  const approveVc = async (id: string) => {
    try {
      const res = await axiosInstance.patch(`/approveVCById/${id}`);
      if (res.status === 200) {
        toast.success("Vaccination center approved successfully.");
        return;
      }
    } catch (error) {
      console.log("Error on get approve vaccination centers", error);
    } finally {
      getPendingVCs();
    }
  };
  const rejectVc = async (id: string) => {
    try {
      const res = await axiosInstance.patch(`/rejectVCById/${id}`);
      if (res.status === 200) {
        toast.success("Vaccination center rejected successfully.");
        return;
      }
    } catch (error) {
      console.log("Error on get reject vaccination centers", error);
    } finally {
      getPendingVCs();
    }
  };

  const getPendingVCs = async () => {
    try {
      const res = await axiosInstance.get("/getAllPendingVc");
      if (res.status === 200) {
        const data = res.data?.data;
        setVCPendingData(data);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log("Error on get pending vaccination centers", err);
      setError("Something went wrong. Please check your internet connection");
    }
  };

  return (
    <div className="admin-users-container ">
      <AdminDashboardNav />
      <div className="admin-user-title-container">
        <h1 className="admin-users-title">
          {" "}
           Vaccination Center Pending Requests
        </h1>
      </div>
      <div className="admin-users-search-container"></div>

      <div className="mt-5" style={{ minHeight: "600px" }}>
        <AdminVCPendingTable
          rejectVc={rejectVc}
          approveVc={approveVc}
          vcPendingData={vcPendingData}
        />
      </div>
    </div>
  );
};
