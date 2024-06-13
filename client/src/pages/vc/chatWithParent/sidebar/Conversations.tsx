import { useEffect, useState } from "react";
import {Conversation} from "./Conversation";
import axiosInstance from "../../../../apis/axiosInstance";
import { PageLoading } from "../../../../components/pageLoading/pageLoading";
import axios from "axios";

const Conversations = () => {
  const [allParents, setAllParents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    getParents();
  }, []);
  const getParents = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/getAllParents");
      if (res.status === 200) {
        const data = res?.data?.data || [];
        setAllParents(data);
      } else {
        throw new Error("Error on get all parents");
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
      }, 1500);
    }
  };
  return (
    <div className="tw-py-2 tw-flex tw-flex-col tw-overflow-auto">
      {isLoading ? (
        <PageLoading />
      ) : error ? (
        <div>
          <p> {error} </p>
        </div>
      ) : (
        <div>
          {allParents?.map((parent) => (
            <Conversation parent={parent} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Conversations;
