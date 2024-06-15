import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Navigate } from "react-router-dom";
export const ProtectAdminRoutes = ({ children }: { children: JSX.Element }) => {
  const { isAdminLoggedIn } = useSelector((state: RootState) => state.admin);
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" />;
  } else {
    return children;
  }
};
