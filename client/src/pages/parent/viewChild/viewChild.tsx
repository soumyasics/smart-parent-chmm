import { useEffect, useState } from "react";
import { RootState } from "../../../redux/store";
import styles from "./viewChild.module.css";
import { useSelector } from "react-redux";
import axiosInstance from "../../../apis/axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ErrorHandlingUI } from "../../../components/common/errorHandlingUI/errorHandlingUi";
import { DisplayChildDetails } from "./displayChildDetails";
import { PageLoading } from "../../../components/pageLoading/pageLoading.tsx";
import {toast} from "react-hot-toast";
export const ViewChild = () => {
  const [childData, setChildData] = useState([]);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isAuthenticated, userType, userId } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated || userType === "parent" || userId !== null) {
      setIsLoading(true);
      getChildDataFromDB();
    } else {
      toast.error("Please Login again. ");
      navigate("/parent/login");
    }
  }, [isAuthenticated, userType, userId]);

  const getChildDataFromDB = async () => {
    try {
      const res = await axiosInstance.get(`/getAllKidsByParentId/${userId}`);
      if (res.status === 200) {
        setChildData(res.data?.data);
      } else {
        throw new Error(`Unexpected error occurred, status: ${res.status}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || null;
        if (status === 400 || status === 500) {
          setError(error.response?.data?.message);
        } else {
          setError("Please check your network!");
        }
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <div className={`${styles.viewChildContainer}`}>
      {isLoading ? (
        <PageLoading />
      ) : error ? (
        <ErrorHandlingUI error={error} />
      ) : (
        <DisplayChildDetails childData={childData} />
      )}
    </div>
  );
};
