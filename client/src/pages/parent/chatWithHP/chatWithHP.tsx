import { Navigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { MessageContainer } from "./chatSection/MessageContainer";
import { Sidebar } from "./sidebar/Sidebar";
import { useSelector } from "react-redux";
import { useState } from "react";
import { HPData } from "./types";

export const ChatWithHP = () => {
  const { isAuthenticated, userType } = useSelector(
    (state: RootState) => state.user
  );

  const [activeParticipant, setActiveParticipant] = useState<null | HPData>(
    null
  );

  if (!isAuthenticated && userType !== "parent") {
    return <Navigate to="/parent/login" />;
  }

  const chooseParticipant = (participant: HPData) => {
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
