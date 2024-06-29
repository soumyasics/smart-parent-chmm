import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance.ts";
import { AdminParentsTable } from "../AdminParentsTable/adminParentsTable.tsx";
import AdminDashboardNav from "../AdminDashboardNav/adminDashboardNav.tsx";
import "./adminParents.css";
import { AdminVCTable } from "../AdminVCTable/adminVCTable.tsx";

export const AdminVC = () => {
  const [vcData, setvcData] = useState([]);
  const [error, setError] = useState("");
  console.log("err", error);

  useEffect(() => {
    getvCData();
  }, []);

  const getvCData = async () => {
    try {
      const res = await axiosInstance.get("/getAllApprovedVc");
      if (res.status === 200) {
        const data = res.data?.data;
        setvcData(data);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      setError("Something went wrong. Please check your internet connection");
    }
  };

  return (
    <div className="admin-users-container " style={{ minHeight: "100vh" }}>
      <AdminDashboardNav />
      <div className="admin-user-title-container">
        <h1 className="admin-users-title"> Vaccination Centers</h1>
      </div>
      <div className="admin-users-search-container"></div>

      <div style={{ minHeight: "600px" }} className="mt-5">
        <AdminVCTable vcsData={vcData} />
      </div>
    </div>
  );
};
