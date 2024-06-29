
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance.ts";
import AdminDashboardNav from "../AdminDashboardNav/adminDashboardNav.tsx";
import "./adminHP.css";
import { AdminAWTable } from "../AdminAWTable/adminAWTable.tsx";

export const AdminAW = () => {
  const [AWsData, setAWsData] = useState([]);
  const [error, setError] = useState("");

  console.log("err", error)

  useEffect(() => {
    getAWsData();
  }, []);

  const getAWsData = async () => {
    try {
      const res = await axiosInstance.get("/getAllApprovedAw");
      if (res.status === 200) {
        const data = res.data?.data;
        setAWsData(data);
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
        <h1 className="admin-users-title"> Asha Workers </h1>
      </div>
      <div className="admin-users-search-container"></div>

      <div className="mt-5">
        <AdminAWTable AWsData={AWsData} />
      </div>
    </div>
  );
};
