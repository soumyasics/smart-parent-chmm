import { MessageStart, MessageEnd } from "./Message";
import { useRef, useEffect } from "react";

const Messages = ({ conversation }) => {
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [conversation]);

  return (
    <div
      style={{
        height: "530px",
        display: "flex",
        flexDirection: "column-reverse",
      }}
      className="tw-px-4 tw-py-5 tw-flex-1 tw-overflow-auto "
    >
      <div ref={messageEndRef} />
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
export default Messages;
