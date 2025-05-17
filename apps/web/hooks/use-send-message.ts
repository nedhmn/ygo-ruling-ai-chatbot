"use client";

import { UseChatHelpers } from "@ai-sdk/react";

interface UseSendMessageParams {
  chatHelpers: UseChatHelpers;
  isGeneratingResponse: boolean;
  setInput: (value: string) => void;
}

export function useSendMessage({
  chatHelpers,
  isGeneratingResponse,
  setInput,
}: UseSendMessageParams) {
  const { append, stop } = chatHelpers;

  const handleSendMessage = (input?: string) => {
    // Cancel message generation
    if (isGeneratingResponse) {
      stop();
      return;
    }

    if (!input) {
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
