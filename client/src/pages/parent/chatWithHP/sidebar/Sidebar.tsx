import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import { FC, useState } from "react";
import { HPData } from "../types";

interface SidebarProps {
  activeParticipant: HPData | null;
  chooseParticipant: (participant: HPData) => void;
}

export const Sidebar: FC<SidebarProps> = ({
  activeParticipant,
  chooseParticipant,
}) => {
  const [searchedParticipant, setSearchedParticipant] = useState<string>("");


  const updateSearchedParticipant = (name: string) => {
    setSearchedParticipant(name);
  };

  return (
    <div className="tw-border-r tw-h-full tw-w-1/4 tw-bg-slate-800 tw-p-4 tw-flex tw-flex-col">
      <SearchInput
        updateSearchedParticipant={updateSearchedParticipant}
      />
      <div className="tw-divider tw-px-3"></div>
      <Conversations
        searchedParticipant={searchedParticipant}
        activeParticipant={activeParticipant}
        chooseParticipant={chooseParticipant}
      />
    </div>
  );
};
