import { FC} from "react";
import { BsSend } from "react-icons/bs";
import { useSelector } from "react-redux";
import { ParentData } from "../types";
import { RootState } from "../../../../redux/store";
import axiosInstance from "../../../../apis/axiosInstance";

interface MessageInputProps {
  activeParticipant: ParentData | null;
  message: string;
  updateMessage: (message: string) => void;
}

interface SendMessage {
  VCId: string | null;
  parentId: string;
  message: string;
  receiverType: string;
  senderType: string;
}
const MessageInput: FC<MessageInputProps> = ({
  message,
  updateMessage,
  activeParticipant,
}) => {
  const { userId: VCId } = useSelector((state: RootState) => state.user);
  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    if (!activeParticipant) {
      console.log("Parent data not found!");
      return;
    }

    const payload: SendMessage = {
      VCId,
      parentId: activeParticipant?._id,
      message,
      receiverType: "parent",
      senderType: "vc",
    };
    sendMessageToServer(payload);
  };

  const sendMessageToServer = async (payload: SendMessage) => {
    try {
      const res = await axiosInstance.post("/sendMessageParentAndVC", payload);
      console.log("res send msg", res);
      if (res.status === 200) {
        updateMessage("");
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (error) {
      console.log("Error on send message", error);
    }
  };
  return (
    <form
      className="tw-px-4 tw-my-3"
      style={{ position: "absolute", bottom: 0, width: "75%" }}
      onSubmit={handleSendMessage}
    >
      <div className="tw-w-full tw-relative">
        <input
          type="text"
          className="tw-border tw-text-sm tw-rounded-lg tw-block tw-w-full tw-p-2.5 tw-bg-gray-700 tw-border-gray-600 tw-text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => updateMessage(e.target.value)}
        />
        <button
          type="submit"
          className="tw-absolute tw-inset-y-0 tw-end-0 tw-flex tw-items-center  tw-pe-3"
        >
          <BsSend />
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
