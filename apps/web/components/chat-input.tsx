"use client";

import { UseChatHelpers } from "@ai-sdk/react";
import ChatInputControls from "@/components/chat-input-controls";
import ChatInputArea from "@/components/chat-input-area";
import { useState } from "react";

interface ChatInputProps {
  chatHelpers: UseChatHelpers;
}

const ChatInput = ({ chatHelpers }: ChatInputProps) => {
  const [input, setInput] = useState<string>("");

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background py-4">
      <div className="max-w-3xl mx-auto w-full px-4">
        <div className="flex flex-col bg-secondary rounded-[10px]">
          <ChatInputArea
            chatHelpers={chatHelpers}
            input={input}
            setInput={setInput}
          />
          <ChatInputControls
            chatHelpers={chatHelpers}
            input={input}
            setInput={setInput}
          />
        </div>
        <div className="text-muted-foreground text-xs mt-2">
          This is an AI chatbot using RAG. It is trained on GOAT Format
          Yu-Gi-Oh! rulings only.
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
