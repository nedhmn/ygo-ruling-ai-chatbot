"use client";

import ChatMessages from "@/components/chat-messages";
import { useChat } from "@ai-sdk/react";
import ChatInput from "@/components/chat-input";
import { toast } from "sonner";

const Chat = () => {
  const chatHelpers = useChat({
    id: "primary",
    maxSteps: 3,
    onError: () => {
      toast.error("An error occurred, please try again!");
    },
  });

  const { messages } = chatHelpers;

  return (
    <div className="min-h-screen bg-background pb-24">
      <ChatMessages messages={messages}></ChatMessages>
      <ChatInput chatHelpers={chatHelpers} />
    </div>
  );
};

export default Chat;
