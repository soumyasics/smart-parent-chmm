import { formatTimeToIST } from "../../../../utils/time/formatTimeToIst.ts";
import { ChatMessage } from "../types.ts";
import { FC } from "react";
interface MessageStartProps {
  message: ChatMessage;
  profilePic: string;
}

interface MessageEndProps {
  message: ChatMessage;
  profilePic: string;
}

export const MessageStart: FC<MessageStartProps> = ({
  profilePic,
  message,
}) => {
  const createdAt = message?.createdAt || null;
  const timeInIST = createdAt ? formatTimeToIST(createdAt) : "";

  return (
    <div>
      <div className="tw-chat tw-chat-start tw-mt-5">
        <div className="tw-chat-image tw-avatar">
          <div className="tw-w-10 tw-rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={profilePic} />
          </div>
        </div>
        <div className="tw-chat-bubble">{message?.message || ""}</div>
        <div className="tw-chat-footer tw-text-xs tw-text-gray-300 tw-opacity-50 ">
          {timeInIST}
        </div>
      </div>
    </div>
  );
};

export const MessageEnd: FC<MessageEndProps> = ({ profilePic, message }) => {
  const createdAt = message?.createdAt || null;
  const timeInIST = createdAt ? formatTimeToIST(createdAt) : "";

  return (
    <div className={`tw-chat tw-chat-end tw-mt-5`}>
      <div className="tw-chat-image tw-avatar">
        <div className="tw-w-10 tw-rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className="tw-chat-header tw-text-gray-300 tw-text-xs tw-opacity-50">
      </div>
      <div className="tw-chat-bubble">{message?.message || ""}</div>
      <time className="tw-text-xs tw-text-gray-300 tw-opacity-50">
        {timeInIST}
      </time>
    </div>
  );
};
