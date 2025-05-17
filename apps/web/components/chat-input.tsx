"use client";

import { UseChatHelpers } from "@ai-sdk/react";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Send } from "lucide-react";

type ChatInputProps = {
  input: UseChatHelpers["input"];
  handleInputChange: UseChatHelpers["handleInputChange"];
  handleSubmit: UseChatHelpers["handleSubmit"];
  status: UseChatHelpers["status"];
};

const ChatInput = ({
  input,
  handleInputChange,
  handleSubmit,
  status,
}: ChatInputProps) => {
  const isGeneratingResponse = ["streaming", "submitted"].includes(status);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background py-4">
      <div className="max-w-4xl mx-auto w-full px-4">
        <form onSubmit={handleSubmit} className="relative">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="How can I help with Yu-Gi-Oh! rulings?"
            className="pr-12 py-6 rounded-full focus-visible:ring-1 focus-visible:ring-offset-1"
            disabled={isGeneratingResponse}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 focus-visible:ring-1 focus-visible:ring-offset-1"
            disabled={isGeneratingResponse || input === ""}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
