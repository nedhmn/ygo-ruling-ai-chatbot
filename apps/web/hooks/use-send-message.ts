"use client";

import { UseChatHelpers } from "@ai-sdk/react";

interface UseSendMessageParams {
  chatHelpers: UseChatHelpers;
  isGeneratingResponse: boolean;
  input: string;
  setInput: (value: string) => void;
}

export function useSendMessage({
  chatHelpers,
  isGeneratingResponse,
  input,
  setInput,
}: UseSendMessageParams) {
  const { append, stop } = chatHelpers;

  const handleSendMessage = () => {
    // Cancel message generation
    if (isGeneratingResponse) {
      stop();
      return;
    }

    const message = input.trim();

    // Ignore empty values
    if (message === "") {
      return;
    }

    // Send message to AI
    append({
      role: "user",
      content: message,
      createdAt: new Date(),
    });

    // Reset input
    setInput("");
  };

  return {
    handleSendMessage,
  };
}
