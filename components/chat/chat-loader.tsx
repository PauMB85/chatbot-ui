import { FC } from "react";

const ChatLoader: FC = () => {
  return (
    <div className='chat chat-start'>
      <div className='chat-bubble chat-bubble-secondary'>
        <span className="loading loading-dots loading-md"></span>
      </div>
    </div>
  )
}

export default ChatLoader;