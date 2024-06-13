// import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime";
// import useConversation from "../../zustand/useConversation";

// const Message = ({ message }) => {
// 	const { authUser } = useAuthContext();
// 	const { selectedConversation } = useConversation();
// 	const fromMe = message.senderId === authUser._id;
// 	const formattedTime = extractTime(message.createdAt);
// 	const chatClassName = fromMe ? "chat-end" : "chat-start";
// 	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
// 	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

// 	const shakeClass = message.shouldShake ? "shake" : "";

// 	return (
// 		<div className={`chat ${chatClassName}`}>
// 			<div className='chat-image avatar'>
// 				<div className='w-10 rounded-full'>
// 					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
// 				</div>
// 			</div>
// 			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
// 			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
// 		</div>
// 	);
// };
// export default Message;

export function Message() {
  return (
    <div>
      <div className="tw-chat tw-chat-end">
        <div className="tw-chat tw-chat-start">
          <div className="tw-chat-image tw-avatar">
            <div className="tw-w-10 tw-rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="tw-chat-header">
            Obi-Wan Kenobi
            <time className="tw-text-xs tw-opacity-50">12:45</time>
          </div>
          <div className="tw-chat-bubble">You were the Chosen One!</div>
          <div className="tw-chat-footer tw-opacity-50">Delivered</div>
        </div>
      </div>
    </div>
  );
}
export function Message2() {
  return (
    <div>
      <div className="tw-chat tw-chat-start">
        <div className="tw-chat tw-chat-start">
          <div className="tw-chat-image tw-avatar">
            <div className="tw-w-10 tw-rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="tw-chat-header">
            Obi-Wan Kenobi
            <time className="tw-text-xs tw-opacity-50">12:45</time>
          </div>
          <div className="tw-chat-bubble">You were the Chosen One!</div>
          <div className="tw-chat-footer tw-opacity-50">Delivered</div>
        </div>
      </div>
    </div>
  );
}

export function Message3() {
	return (
	  <div className="tw-chat tw-chat-start">
		<div className="tw-chat-image tw-avatar">
		  <div className="tw-w-10 tw-rounded-full">
			<img
			  alt="Tailwind CSS chat bubble component"
			  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
			/>
		  </div>
		</div>
		<div className="tw-chat-header">
		  Obi-Wan Kenobi
		  <time className="tw-text-xs tw-opacity-50">12:45</time>
		</div>
		<div className="tw-chat-bubble">You were the Chosen One!, This message is a very long . You were the Chosen One!, This message is a very long  You were the Chosen One!, This message is a very long </div>
		<div className="tw-chat-footer tw-opacity-50">Delivered</div>
	  </div>
	);
  }
  