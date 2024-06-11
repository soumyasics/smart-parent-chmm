import { useState } from "react";
import { togglePasswordVisibility } from "../utils/passwordVisibility/passwordVisiblity.ts";
export const usePasswordToggle = () => {
  const [passwordType, setPasswordType] = useState<string>("password");
  const toggleType = () => {
    setPasswordType((prevType) => togglePasswordVisibility(prevType));
  };
  return { passwordType, toggleType };
};
