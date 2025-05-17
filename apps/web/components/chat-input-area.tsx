"use client";

import { useSendMessage } from "@/hooks/use-send-message";
import { UseChatHelpers } from "@ai-sdk/react";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { KeyboardEvent } from "react";

type ChatInputAreaProps = {
  chatHelpers: UseChatHelpers;
  input: string;
  setInput: (value: string) => void;
};

const ChatInputArea = ({
  chatHelpers,
  input,
  setInput,
}: ChatInputAreaProps) => {
  const { status } = chatHelpers;
  const isGeneratingResponse = ["streaming", "submitted"].includes(status);

  const { handleSendMessage } = useSendMessage({
    chatHelpers,
    isGeneratingResponse,
    input,
    setInput,
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Textarea
      value={input}
      placeholder="How can I help with Yu-Gi-Oh! rulings?"
      className="pr-12 py-3 min-h-[60px] max-h-[120px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none border-0 resize-none"
      disabled={isGeneratingResponse}
      autoFocus
      onChange={(event) => {
        setInput(event.currentTarget.value);
      }}
      onKeyDown={handleKeyDown}
    />
  );
};

export default ChatInputArea;
