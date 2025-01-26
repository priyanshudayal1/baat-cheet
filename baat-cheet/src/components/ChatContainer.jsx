import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToNewMessages,
    unsubscribeToMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToNewMessages();

    return () => unsubscribeToMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToNewMessages,
    unsubscribeToMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <ChatInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-900/30">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full ring-2 ring-slate-700/50 overflow-hidden">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs text-slate-400 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className={`chat-bubble ${
              message.senderId === authUser._id 
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                : "bg-slate-800 text-slate-200"
            }`}>
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="max-w-[200px] rounded-md mb-2 hover:scale-105 transition-transform"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <ChatInput />
    </div>
  );
};
export default ChatContainer;
