import { useState, useEffect } from "react";
import { BASE_URL } from "../apis/baseUrl";
import chatUserImg from "../assets/chat-user.jpg";

const checkImageExists = (url: string) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

const useProfilePicture = (filename: string | null) => {
  const [profilePicture, setProfilePicture] = useState<string>(chatUserImg);
  useEffect(() => {
    const updateProfilePicture = async () => {
      if (filename) {
        const imageUrl = `${BASE_URL}${filename}`;
        const imageExists = await checkImageExists(imageUrl);
        if (imageExists) {
          setProfilePicture(imageUrl);
        } else {
          setProfilePicture(chatUserImg);
        }
      } else {
        setProfilePicture(chatUserImg);
      }
    };

    updateProfilePicture();
  }, [filename]);

  return { profilePicture };
};

export { useProfilePicture };
