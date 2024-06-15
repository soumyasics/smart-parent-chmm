import MessageInput from "./MessageInput";
import { Messages } from "./Messages";
import { TiMessages } from "react-icons/ti";
import { VCData } from "../types.ts";
import { FC, useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../../../../utils/modification/capitalizeFirstLetter.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store.ts";
import { useCustomNavigate } from "../../../../hooks/useCustomNavigate.ts";
import axiosInstance from "../../../../apis/axiosInstance.ts";
import axios from "axios";
import { ChatMessage } from "../types.ts";

interface MessageContainerProps {
  activeParticipant: VCData | null;
}

interface GetConversation {
  VCId: string;
  parentId: string;
}
export const MessageContainer: FC<MessageContainerProps> = ({
  activeParticipant,
}) => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const [error, setError] = useState("");
  const isChatSelected = activeParticipant ? true : null;
  const navigateTo = useCustomNavigate();
  const { userId: VCId } = useSelector((state: RootState) => state.user);

  const { userData } = useSelector((state: RootState) => state.user);
  console.log("user data", userData);
  useEffect(() => {
    const parentId = activeParticipant?._id;
    if (VCId && parentId) {
      getConversation({
        VCId,
        parentId,
      });
    } else {
      console.log("Choose a parent first");
    }
  }, [activeParticipant, VCId, message]);

  const getConversation = async (payload: GetConversation) => {
    try {
      const res = await axiosInstance.post("getSingleConversation", payload);
      if (res.status === 200) {
        let data: ChatMessage[] = res.data?.data || [];
        const reversedData = data.reverse();

        setConversation(reversedData);
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errMsg =
          error?.response?.data?.message || "Something went wrong.";
        setError(errMsg);
      } else {
        setError("Something went wrong.");
      }
    }
  };

  const updateMessage = (newMsg: string) => {
    setMessage(newMsg);
  };

  const navigateToHome = () => {
    navigateTo("/parent/home");
  };
  return (
    <div className="tw-w-3/4 tw-flex tw-flex-col tw-bg-gray-900 tw-overflow-auto">
      <>
        {/* Header */}
        <div className="tw-flex tw-w-3/4 tw-bg-slate-500 tw-z-10 tw-px-4 tw-fixed tw-py-2 tw-mb-2">
          <div className="tw-flex-grow">
            {activeParticipant && (
              <>
                <span className="tw-label-text">To:</span>{" "}
                <span className="tw-text-gray-900 tw-font-bold">
                  {capitalizeFirstLetter(activeParticipant?.name || "")}
                </span>
              </>
            )}
          </div>

          <div>
            <button
              className="tw-btn tw-btn-neutral tw-btn-sm"
              onClick={navigateToHome}
            >
              {" "}
              Back{" "}
            </button>
          </div>
        </div>

        {isChatSelected ? (
          <div className="tw-py-10 tw-h-fit ">
            {conversation.length === 0 ? (
              <div className="tw-text-center tw-text-white tw-align-middle tw-h-full">
                <h3 className="tw-mt-5"> Start Chat...</h3>
              </div>
            ) : (
              <Messages conversation={conversation} />
            )}

            <MessageInput
              message={message}
              updateMessage={updateMessage}
              activeParticipant={activeParticipant}
            />
          </div>
        ) : (
          <NoChatSelected username={userData?.name || ""} />
        )}
      </>
    </div>
  );
};

const NoChatSelected = ({ username }: { username: string }) => {
  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-w-full tw-h-full">
      <div className="tw-px-4 tw-text-center tw-sm:text-lg tw-md:text-xl tw-text-gray-200 tw-font-semibold tw-flex tw-flex-col tw-items-center tw-gap-2">
        <p>Welcome 👋 {username} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="tw-text-3xl tw-md:text-6xl tw-text-center" />
      </div>
    </div>
  );
};
