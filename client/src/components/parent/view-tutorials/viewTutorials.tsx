import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../apis/axiosInstance";
import TutorialCard from "./tutorialCard";
import { VideoType } from "./types.ts";
import { ItemsNotFound } from "../../../pages/parent/itemsNotFound/itemsNotFound.tsx";
import { FC } from "react";

interface ViewTutorialsProps {
  healthProfessionalId: string;
}

export const ViewTutorials: FC<ViewTutorialsProps> = ({
  healthProfessionalId,
}) => {
  const [videos, setVideos] = useState<VideoType[]>([]);
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
    getHPVideoTutorials(healthProfessionalId);
  }, []);

  if (videos.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h3>No videos found</h3>
      </div>
    );
  }
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
