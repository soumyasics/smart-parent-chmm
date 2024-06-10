import { InputGroup, Form } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance.ts";
import { AdminParentsTable } from "../AdminParentsTable/adminParentsTable.tsx";
import AdminDashboardNav from "../AdminDashboardNav/adminDashboardNav.tsx";
import "./adminHP.css";
import { AdminHPTable } from "../AdminHPTable/adminHPTable.tsx";

export const AdminHP = () => {
  const [parentsData, setparentsData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getParentsData();
  }, []);

  const getParentsData = async () => {
    try {
      const res = await axiosInstance.get("/getAllParents");
      if (res.status === 200) {
        const data = res.data?.data;
        setparentsData(data);
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
        <AdminHPTable parentsData={parentsData} />
      </div>
    </div>
  );
};
