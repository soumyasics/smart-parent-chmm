import { HPNavbar } from "../hpNavbar/hpNavbar";
import { CommonFooter } from "../../common/footer/footer";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseUrl";
import toast from "react-hot-toast";
import { capitalizeFirstLetter } from "../../../utils/modification/capitalizeFirstLetter";
import { VideoType } from "./types";

export const WatchTutorialFullScreen = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState<VideoType | null>(null);
  const [videoUrl, setVideoUrl] = useState<null | string>(null);
  useEffect(() => {
    if (id) {
      getTutorial();
    } else {
      console.log("Video id might be wrong.");
    }
  }, []);
  useEffect(() => {
    let tutorialVideoLink = tutorial?.video?.filename || null;
    if (tutorialVideoLink) {
      let URL = `${BASE_URL}${tutorialVideoLink}`;
      // validate if it's a valid video URL
      if (isValidVideoURL(URL)) {
        setVideoUrl(URL);
      } else {
        console.log("Video url might be wrong.");
        setVideoUrl(null);
      }
    } else {
      console.log("Video url might be wrong.");
      setVideoUrl(null);
    }
  }, [tutorial]);

  function isValidVideoURL(url: string) {
    const videoExtensions = [
      ".mp4",
      ".avi",
      ".mov",
      ".wmv",
      ".mkv",
      ".flv",
      ".webm",
      ".ogg",
      ".m4v",
    ];
    let fileExtension = url.substring(url.lastIndexOf(".")).toLowerCase();
    return videoExtensions.includes(fileExtension);
  }
  async function getTutorial() {
    try {
      const res = await axiosInstance.get("getTutorialById/" + id);
      console.log("res", res);
      let tutorial = res?.data?.data || null;
      if (tutorial) {
        setTutorial(tutorial);
      } else {
        throw new Error("Can't fetch resource person tutorial details");
      }
    } catch (error: unknown) {
      toast.error("Tutorial not found");

      navigate("/hp/profile");
    }
  }

  return (
    <div>
      <HPNavbar />
      <div style={{ minHeight: "700px" }} className="p-5">
        <h3 className="text-center">Watch Video Tutorials</h3>
        <div className="mt-5 d-flex gap-5 ">
          <div className="w-100 mx-auto">
            <h4 className="text-dark">
              {capitalizeFirstLetter(tutorial?.title) || "Video title"}
            </h4>

            <iframe
              width="100%"
              height="500px"
              src={videoUrl ? videoUrl : undefined}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p className="mt-5 text-dark ">
              {capitalizeFirstLetter(tutorial?.description) ||
                "Video Description"}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <CommonFooter />
      </div>
    </div>
  );
};
