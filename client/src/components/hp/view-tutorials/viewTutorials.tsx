import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../../apis/axiosInstance";
import TutorialCard from "./tutorialCard";
import { VideoType } from "./types.ts";
import { ItemsNotFound } from "../../../pages/parent/itemsNotFound/itemsNotFound.tsx";
export const ViewTutroials = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const navigate = useNavigate();
  const { userType, userId } = useSelector((state: RootState) => state.user);
  const getHPVideoTutorials = async (id: string) => {
    try {
      const res = await axiosInstance.get(`/getTutorialsByHPId/${id}`);
      if (res.status === 200) {
        setVideos(res.data.data);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log("Error in getHPVideoTutorials", error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    if (userType !== "healthProfessional" || !userId) {
      toast.error("Please login again");
      navigate("/hp/login");
    } else {
      getHPVideoTutorials(userId);
    }
  }, []);
  return (
    <>
      {videos.length === 0 && (
        <ItemsNotFound
          title="You have not uploaded any videos yet!"
          description=""
        />
      )}
      {videos.length > 0 && (
        <div>
          <h1 className="text-center"> Tutorials</h1>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            {videos.map((video) => {
              return <TutorialCard video={video} key={video._id} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};
