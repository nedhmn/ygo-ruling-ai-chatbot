"use client";

import ChatMessages from "@/components/chat-messages";
import { useChat } from "@ai-sdk/react";
import ChatInput from "@/components/chat-input";
import { toast } from "sonner";
import { useState } from "react";

const Chat = () => {
  const [input, setInput] = useState<string>("");

  const chatHelpers = useChat({
    id: "primary",
    maxSteps: 3,
    onError: () => {
      toast.error("An error occurred, please try again!");
    },
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <ChatMessages chatHelpers={chatHelpers} setInput={setInput} />
      <ChatInput chatHelpers={chatHelpers} input={input} setInput={setInput} />
    </div>
  );
};

export default Chat;
