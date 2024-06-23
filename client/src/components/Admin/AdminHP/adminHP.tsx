
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance.ts";
import AdminDashboardNav from "../AdminDashboardNav/adminDashboardNav.tsx";
import "./adminHP.css";
import { AdminHPTable } from "../AdminHPTable/adminHPTable.tsx";

export const AdminHP = () => {
  const [HPsData, setHPsData] = useState([]);
  const [error, setError] = useState("");

  console.log("err", error)

  useEffect(() => {
    getHPsData();
  }, []);

  const getHPsData = async () => {
    try {
      const res = await axiosInstance.get("/getAllApprovedHp");
      if (res.status === 200) {
        const data = res.data?.data;
        setHPsData(data);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      setError("Something went wrong. Please check your internet connection");
    }
  };

  return (
    <div className="admin-users-container ">
      <AdminDashboardNav />
      <div className="admin-user-title-container">
        <h1 className="admin-users-title"> All Health Professionals </h1>
      </div>
      <div className="admin-users-search-container"></div>

      <div className="mt-5">
        <AdminHPTable HPsData={HPsData} />
      </div>
    </div>
  );
};
