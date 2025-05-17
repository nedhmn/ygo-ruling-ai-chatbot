"use client";

import { UseChatHelpers } from "@ai-sdk/react";
import ChatInputControls from "@/components/chat-input-controls";
import ChatInputArea from "@/components/chat-input-area";
import Footnote from "./footnote";

interface ChatInputProps {
  chatHelpers: UseChatHelpers;
  input: string;
  setInput: (value: string) => void;
}

const ChatInput = ({ chatHelpers, input, setInput }: ChatInputProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background py-4 z-10">
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
        <Footnote />
      </div>
    </div>
  );
};

export default ChatInput;
