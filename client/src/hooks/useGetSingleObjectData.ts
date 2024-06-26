import { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance";
import axios from "axios";
import {
  ParentData,
  HealthProfessionalData,
  VaccinationCenterData,
  AshaWorkerData,
} from "../types/userTypes";
type fetchDataType =
  | ParentData
  | HealthProfessionalData
  | VaccinationCenterData
  | AshaWorkerData 
  | null;

export const useGetSingleObjectData = (url: string) => {
  const [data, setData] = useState<fetchDataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // const res = await axiosInstance.get(url);
        const res = await axiosInstance.get(url);
        if (res.status === 200) {
          const data = res?.data?.data || null;
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
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, data, error };
};
