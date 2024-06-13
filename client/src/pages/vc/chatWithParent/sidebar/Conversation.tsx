import { FC, useEffect, useState } from "react";
import chatUserImg from "../../../../assets/chat-user.jpg";
import { BASE_URL } from "../../../../apis/baseUrl";
interface ParentData {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  profilePicture: any
}
interface ConversationProps {
  parent: ParentData;
}

export const Conversation: FC<ConversationProps> = ({ parent }) => {
  const [profilePicture, setProfilePicture] = useState<string>(chatUserImg);

  useEffect(() => {
    console.log("parnt", parent);
    const filename: string | null = parent?.profilePicture?.filename || null;
    if (filename) {
      setProfilePicture(`${BASE_URL}${filename}`);
    }
  }, []);
  const capitalizeFirstCharacter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <>
      <div className="tw-flex tw-my-1 hover:tw-bg-slate-700 tw-align-middle tw-gap-2 tw-items-center tw-hover:bg-sky-500 tw-rounded tw-p-2 tw-py-1 tw-cursor-pointer">
        <div className="tw-avatar tw-online">
          <div className="tw-w-9 tw-rounded-full">
            <img src={profilePicture} alt="user avatar" />
          </div>
        </div>

        <div className="tw-flex tw-flex-col tw-flex-1">
          <div className="tw-flex tw-gap-3 tw-justify-between">
            <p className="tw-font-bold tw-m-0 tw-ms-2 tw-text-gray-200">
              {capitalizeFirstCharacter(parent?.name) || ""}
            </p>
            <span className="tw-text-xl"></span>
          </div>
        </div>
      </div>

      <div className="tw-divider tw-my-0 tw-py-0 tw-h-1" />
    </>
  );
};
