import { Navigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { MessageContainer } from "./chatSection/MessageContainer";
import { Sidebar } from "./sidebar/Sidebar";
import { useSelector } from "react-redux";

export const ChatWithParent = () => {
  const { isAuthenticated, userType } = useSelector(
    (state: RootState) => state.user
  );

  if (!isAuthenticated && userType !== "vaccineCenter") {
    return <Navigate to="/vc/login" />;
  }

  return (
    <>
      <div className="tw-flex tw-h-screen tw-flex-row">
        <Sidebar />
        <MessageContainer />
      </div>
    </>
  );
};
