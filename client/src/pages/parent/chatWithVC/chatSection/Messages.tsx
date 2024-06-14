import { MessageStart, MessageEnd } from "./Message";
import { FC } from "react";
import { ChatMessage } from "../types";

interface MessagesProps {
  conversation: ChatMessage[];
}
export const Messages: FC<MessagesProps> = ({ conversation }) => {
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
        if (message.senderType === "vc") {
          return <MessageEnd message={message} key={message?._id} />;
        } else {
          return <MessageStart message={message} key={message?._id} />;
        }
      })}
    </div>
  );
};
