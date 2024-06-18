import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Navigate } from "react-router-dom";

export const ProtectParentLoginPage = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, userType } = useSelector(
    (state: RootState) => state.user
  );
  return isAuthenticated && userType === "parent" ? (
    <Navigate to="/parent/home" />
  ) : (
    children
  );
};
