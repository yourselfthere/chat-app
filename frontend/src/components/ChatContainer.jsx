import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();
  useEffect(() => {
    getMessages(selectedUser._id); //dusre ki id
  }, [selectedUser._id, getMessages]);
  if (isMessagesLoading) return <div>Loading...</div>;

  return <div>Hi from ChatContainer</div>;
};

export default ChatContainer;
