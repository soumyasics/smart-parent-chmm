import { Navigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { MessageContainer } from "./chatSection/MessageContainer";
import { Sidebar } from "./sidebar/Sidebar";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ParentData } from "./types";

export const ChatWithParent = () => {
  const { isAuthenticated, userType } = useSelector(
    (state: RootState) => state.user
  );

  const [activeParticipant, setActiveParticipant] = useState<null | ParentData>(
    null
  );

  if (!isAuthenticated && userType !== "vaccineCenter") {
    return <Navigate to="/vc/login" />;
  }

  const chooseParticipant = (participant: ParentData) => {
    setActiveParticipant(participant);
  };

  return (
    <>
      <div className="tw-flex tw-h-screen tw-flex-row">
        <Sidebar
          activeParticipant={activeParticipant}
          chooseParticipant={chooseParticipant}
        />
        <MessageContainer activeParticipant={activeParticipant} />
      </div>
    </>
  );
};
