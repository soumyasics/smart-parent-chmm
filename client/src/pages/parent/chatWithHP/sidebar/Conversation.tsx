import { FC } from "react";
import { useProfilePicture } from "../../../../hooks/useProfilePicture";
import { HPData } from "../types";
import {toast} from "react-hot-toast";
interface ConversationProps {
  hp: HPData;
  activeParticipant: HPData | null;
  chooseParticipant: (participant: HPData) => void;
}

export const Conversation: FC<ConversationProps> = ({
  hp,
  chooseParticipant,
}) => {
  const { profilePicture } = useProfilePicture(
    hp?.profilePicture?.filename || null
  );

  const capitalizeFirstCharacter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const chooseActiveParticipant = () => {
    if (hp.isActive === "suspended") {
      toast.error("This health professional has been suspended");
      return;
    }
    chooseParticipant(hp);
  };

  return (
    <>
      <div
        onClick={chooseActiveParticipant}
        className="tw-flex tw-my-1 hover:tw-bg-slate-700 tw-align-middle tw-gap-2 tw-items-center tw-hover:bg-sky-500 tw-rounded tw-p-2 tw-py-1 tw-cursor-pointer"
      >
        <div className="tw-avatar tw-online">
          <div className="tw-w-9 tw-rounded-full">
            <img src={profilePicture} alt="user avatar" />
          </div>
        </div>

        <div className="tw-flex tw-flex-col tw-flex-1">
          <div className="tw-flex tw-gap-3 tw-justify-between">
            <p className="tw-font-bold tw-m-0 tw-ms-2 tw-text-gray-200">
              {capitalizeFirstCharacter(hp?.name) || ""}
            </p>
            <span className="tw-text-xl"></span>
          </div>
        </div>
      </div>

      <div className="tw-divider tw-my-0 tw-py-0 tw-h-1" />
    </>
  );
};
