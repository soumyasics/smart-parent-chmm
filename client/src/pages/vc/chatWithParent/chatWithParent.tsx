
import { MessageContainer } from "./chatSection/MessageContainer";
import { Sidebar } from "./sidebar/Sidebar";
export const ChatWithParent = () => {
  return (
    <>
      <div className="tw-flex tw-h-screen tw-flex-row">
        <Sidebar />
        <MessageContainer />
      </div>
    </>
  );
};
