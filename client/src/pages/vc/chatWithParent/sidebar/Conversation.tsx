import { FC } from "react";
interface ParentData {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  profilePicture: File | null;
}
interface ConversationProps {
  parent: ParentData;
}

const capitalizeFirstCharacter = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export const Conversation: FC<ConversationProps> = ({ parent }) => {
  console.log("parnt", parent);
  return (
    <>
      <div className="tw-flex hover:tw-bg-slate-800 tw-gap-2 tw-items-center tw-hover:bg-sky-500 tw-rounded tw-p-2 tw-py-1 tw-cursor-pointer">
        <div className="tw-avatar tw-online">
          <div className="tw-w-12 tw-rounded-full">
            <img
              src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
              alt="user avatar"
            />
          </div>
        </div>

        <div className="tw-flex tw-flex-col tw-flex-1">
          <div className="tw-flex tw-gap-3 tw-justify-between">
            <p className="tw-font-bold tw-text-gray-200">
              {capitalizeFirstCharacter(parent?.name) || ""}
            </p>
            <span className="tw-text-xl">🎃</span>
          </div>
        </div>
      </div>

      <div className="tw-divider tw-my-0 tw-py-0 tw-h-1" />
    </>
  );
};
