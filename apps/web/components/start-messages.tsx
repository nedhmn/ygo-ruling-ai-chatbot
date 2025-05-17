"use client";

import { useSendMessage } from "@/hooks/use-send-message";
import { UseChatHelpers } from "@ai-sdk/react";
import { Card } from "@repo/ui/components/ui/card";

const STARTER_PROMPTS = [
  `Can Exiled Force be the target of its own effect?`,
  `If Spirit Reaper is targeted by Snatch Steal, and Mystical Space Typhoon is chained, will Spirit Reaper still destroy itself?`,
  `Does the effect of Dark Balter the Terrible or Dark Ruler Ha Des negate the effect of Injection Fairy Lily?`,
  `If my opponent already has Set the card declared with Prohibition, can they activate the card?`,
];

interface StartMessagesProps {
  chatHelpers: UseChatHelpers;
  setInput: (value: string) => void;
}

const StartMessages = ({ chatHelpers, setInput }: StartMessagesProps) => {
  const { status } = chatHelpers;
  const isGeneratingResponse = ["streaming", "submitted"].includes(status);

  const { handleSendMessage } = useSendMessage({
    chatHelpers,
    isGeneratingResponse,
    setInput,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <p className="text-foreground text-lg mb-8">
        {"Hey there! What's on your mind?"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        {STARTER_PROMPTS.map((question, index) => (
          <Card
            key={index}
            className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => handleSendMessage(question)}
          >
            <p className="text-foreground">{question}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StartMessages;
