import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import {FC} from 'react';
import { ParentData } from "../types";

interface SidebarProps {
  activeParticipant: ParentData | null;
  chooseParticipant: (participant: ParentData) => void;
}


export const Sidebar: FC<SidebarProps> = ({ activeParticipant, chooseParticipant }) => {
  return (
    <div className="tw-border-r tw-h-full tw-w-1/4 tw-bg-slate-800 tw-p-4 tw-flex tw-flex-col">
      <SearchInput />
      <div className="tw-divider tw-px-3"></div>
      <Conversations
        activeParticipant={activeParticipant}
        chooseParticipant={chooseParticipant}
      />
    </div>
  );
};
