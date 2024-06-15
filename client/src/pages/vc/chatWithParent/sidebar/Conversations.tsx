import { Conversation } from "./Conversation";
import { useFetchData } from "../../../../hooks/useFetchData";
import { useCustomNavigate } from "../../../../hooks/useCustomNavigate";
import { ParentData } from "../types.ts";
import { FC, useEffect, useState } from "react";
import { PageLoading2 } from "../../../../components/pageLoading/pageLoading2.tsx";
interface ConversationProps {
  searchedParticipant: string;
  activeParticipant: ParentData | null;
  chooseParticipant: (participant: ParentData) => void;
}

type fetchDataType = any[];

const Conversations: FC<ConversationProps> = ({
  searchedParticipant,
  activeParticipant,
  chooseParticipant,
}) => {
  const [filteredParticipants, setFilteredParticipants] =
    useState<fetchDataType>([]);
  const { isLoading, data: allParents, error } = useFetchData("/getAllParents");
  const navigateTo = useCustomNavigate();

  useEffect(() => {
    if (searchedParticipant) {
      const filtered = allParents.filter((parent) => {
        return parent?.name
          .toLowerCase()
          .includes(searchedParticipant.toLowerCase());
      });
      setFilteredParticipants(filtered);
    } else {
      setFilteredParticipants(allParents);
    }
  }, [searchedParticipant, allParents]);

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
          {filteredParticipants?.map((parent) => (
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
