
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance.ts";
import AdminDashboardNav from "../AdminDashboardNav/adminDashboardNav.tsx";
import "./adminVCPending.css";
import { AdminVCPendingTable } from "../AdminVCPendingTable/adminVCPendingTable.tsx";


export const AdminVCPending = () => {
  const [vcPending, setVCPending] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getParentsData();
  }, [])

  const getParentsData = async () => {
    try {
      const res = await axiosInstance.get('/getAllParents')
      if (res.status === 200) {
        const data = res.data?.data;
        setVCPending(data);
      }else {
        throw new Error("Something went wrong");
      }

    }catch(err) {
      setError("Something went wrong. Please check your internet connection");
    }
  }

  return (
    <div className="admin-users-container ">
      <AdminDashboardNav />
      <div className="admin-user-title-container">
        <h1 className="admin-users-title"> All Vaccination Center Pending Requests</h1>
        
      </div>
      <div className="admin-users-search-container">
      
      </div>

      <div className="mt-5">
        <AdminVCPendingTable parentsData={parentsData}/>
      </div>
    </div>
  );
};
