import { Message } from "./Message";

const Messages = ({ conversation }) => {
  return (
    <div className="tw-px-4 tw-flex-1 tw-overflow-auto">
      {conversation?.map((message) => {


        return <Message message={message} key={message?._id} />;
      })}
    </div>
  );
};
export default Messages;
