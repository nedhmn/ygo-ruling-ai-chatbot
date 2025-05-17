"use client";

import { UseChatHelpers } from "@ai-sdk/react";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowUpIcon, StopCircleIcon } from "lucide-react";
import { useSendMessage } from "@/hooks/use-send-message";

interface ChatInputControls {
  chatHelpers: UseChatHelpers;
  input: string;
  setInput: (value: string) => void;
}

const ChatInputControls = ({
  chatHelpers,
  input,
  setInput,
}: ChatInputControls) => {
  const { status } = chatHelpers;
  const isGeneratingResponse = ["streaming", "submitted"].includes(status);

  const { handleSendMessage } = useSendMessage({
    chatHelpers,
    isGeneratingResponse,
    input,
    setInput,
  });

  return (
    <div className="flex justify-end p-2">
      <Button
        size="icon"
        className="transform rounded-[10px] h-8 w-8 focus-visible:ring-1 focus-visible:ring-offset-1"
        onClick={handleSendMessage}
      >
        {isGeneratingResponse ? <StopCircleIcon /> : <ArrowUpIcon />}
      </Button>
    </div>
  );
};

export default ChatInputControls;
