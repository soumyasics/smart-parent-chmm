import { Conversation } from "./Conversation";
import { PageLoading } from "../../../../components/pageLoading/pageLoading";
import { useFetchData } from "../../../../hooks/useFetchData";
import { useCustomNavigate } from "../../../../hooks/useCustomNavigate";
import { ParentData } from "../types.ts";
import { FC } from "react";
import { PageLoading2 } from "../../../../components/pageLoading/pageLoading2.tsx";
interface ConversationProps {
  activeParticipant: ParentData | null;
  chooseParticipant: (participant: ParentData) => void;
}

const Conversations: FC<ConversationProps> = ({
  activeParticipant,
  chooseParticipant,
}) => {
  const { isLoading, data: allParents, error } = useFetchData("/getAllParents");
  const navigateTo = useCustomNavigate();

  return (
    <div className="tw-py-2 tw-flex tw-flex-col tw-overflow-auto">
      {isLoading ? (
        <PageLoading2 />
      ) : error ? (
        <div className="tw-flex tw-flex-col tw-items-center">
          <p className="tw-text-red-500 tw-font-bold"> {error} </p>
          <button
            className="tw-btn tw-btn-error tw-btn-sm"
            onClick={() => {
              navigateTo("/vc/home");
            }}
          >
            Go Back
          </button>
        </div>
      ) : (
        <div>
          {Array.isArray(allParents) &&
            allParents?.map((parent) => (
              <Conversation
                key={parent?._id}
                parent={parent}
                activeParticipant={activeParticipant}
                chooseParticipant={chooseParticipant}
              />
            ))}
        </div>
      )}
    </div>
  );
};
export default Conversations;
