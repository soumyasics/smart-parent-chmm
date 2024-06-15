import { Conversation } from "./Conversation";
import { useFetchData } from "../../../../hooks/useFetchData";
import { useCustomNavigate } from "../../../../hooks/useCustomNavigate";
import { VCData } from "../types.ts";
import { FC, useEffect, useState } from "react";
import { PageLoading2 } from "../../../../components/pageLoading/pageLoading2.tsx";
interface ConversationProps {
  searchedParticipant: string;
  activeParticipant: VCData | null;
  chooseParticipant: (participant: VCData) => void;
}

type fetchDataType = any[];

const Conversations: FC<ConversationProps> = ({
  searchedParticipant,
  activeParticipant,
  chooseParticipant,
}) => {
  const [filteredParticipants, setFilteredParticipants] =
    useState<fetchDataType>([]);
  const { isLoading, data: allVCs, error } = useFetchData("getAllApprovedVc");
  const navigateTo = useCustomNavigate();

  
  useEffect(() => {
    if (searchedParticipant) {
      const filtered = allVCs.filter((vc) => {
        return vc?.name
          .toLowerCase()
          .includes(searchedParticipant.toLowerCase());
      });
      setFilteredParticipants(filtered);
    } else {
      setFilteredParticipants(allVCs);
    }
  }, [searchedParticipant, allVCs]);

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
              navigateTo("/parent/home");
            }}
          >
            Go Back
          </button>
        </div>
      ) : (
        <div>
          {filteredParticipants?.map((vc) => (
            <Conversation
              key={vc?._id}
              vc={vc}
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
