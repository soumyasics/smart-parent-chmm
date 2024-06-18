import { MessageStart, MessageEnd } from "./Message";
import { FC } from "react";
import { VCData, ChatMessage } from "../types";
import placeholderImg from "../../../../assets/user-placeholder-img.jpg";
import { useProfilePicture } from "../../../../hooks/useProfilePicture";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
interface MessagesProps {
  conversation: ChatMessage[];
  activeParticipant: VCData | null;
}
export const Messages: FC<MessagesProps> = ({
  activeParticipant,
  conversation,
}) => {
  const { userData, userType } = useSelector((state: RootState) => state.user);
  let activeUserPic = placeholderImg;
  if (userData && userType === "parent") {
    const { profilePicture } = useProfilePicture(
      userData?.profilePicture?.filename || null
    );
    activeUserPic = profilePicture;
  } else {
    // todo=> handle
  }
  const { profilePicture: participantProfilePic } = useProfilePicture(
    activeParticipant?.profilePicture?.filename || null
  );
  return (
    <div
      style={{
        height: "530px",
        display: "flex",
        flexDirection: "column-reverse",
      }}
      className="tw-px-4 tw-py-5 tw-flex-1 tw-overflow-auto "
    >
      {conversation?.map((message) => {
        if (message.senderType === "parent") {
          return (
            <MessageEnd
              profilePic={activeUserPic}
              message={message}
              key={message?._id}
            />
          );
        } else {
          return (
            <MessageStart
              profilePic={participantProfilePic}
              message={message}
              key={message?._id}
            />
          );
        }
      })}
    </div>
  );
};
