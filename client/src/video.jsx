// src/components/VideoPlayer.js

import React from "react";
import myVideo from "./assets/video/my-vid.mp4";

export const VideoPlayer = () => {
  return (
    <div>
      <video width="600" controls autoPlay muted>
        <source src={myVideo} type="video/mp4"  />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
