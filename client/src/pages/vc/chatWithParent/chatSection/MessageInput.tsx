import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  return (
    <form className="tw-px-4 tw-my-3 ">
      <div className="tw-w-full tw-relative">
        <input
          type="text"
          className="tw-border tw-text-sm tw-rounded-lg tw-block tw-w-full tw-p-2.5 tw-bg-gray-700 tw-border-gray-600 tw-text-white"
          placeholder="Send a message"
        />
        <button
          type="submit"
          className="tw-absolute tw-inset-y-0 tw-end-0 tw-flex tw-items-center  tw-pe-3"
        >
          <BsSend />
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
