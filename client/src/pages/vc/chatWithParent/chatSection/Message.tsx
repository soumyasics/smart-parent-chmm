import { ChatMessage } from "../types.ts";
import { FC } from "react";
interface MessageStartProps {
  message: ChatMessage;
  profilePic: string;
  name: string;
}

interface MessageEndProps {
  message: ChatMessage;
  profilePic: string;
  name: string;
}

export const MessageStart: FC<MessageStartProps> = ({
  profilePic,
  message,
  name,
}) => {
  return (
    <div>
      <div className="tw-chat tw-chat-start">
        <div className="tw-chat-image tw-avatar">
          <div className="tw-w-10 tw-rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={profilePic} />
          </div>
        </div>
        <div className="tw-chat-header tw-text-gray-300 tw-text-xs tw-opacity-50">
          {name}
          <time className="tw-text-xs tw-opacity-50 tw-ms-3">12:45</time>
        </div>
        <div className="tw-chat-bubble">{message?.message || ""}</div>
        <div className="tw-chat-footer tw-opacity-50">SEnt</div>
      </div>
    </div>
  );
};

export const MessageEnd: FC<MessageEndProps> = ({
  profilePic,
  message,
  name,
}) => {
  return (
    <div className={`tw-chat tw-chat-end`}>
      <div className="tw-chat-image tw-avatar">
        <div className="tw-w-10 tw-rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className="tw-chat-header tw-text-gray-300 tw-text-xs tw-opacity-50">
        {name} &nbsp;
      </div>
      <div className="tw-chat-bubble">{message?.message || ""}</div>
      <time className="tw-text-xs tw-text-gray-300 tw-opacity-50">
        12:45
      </time>
    </div>
  );
};
