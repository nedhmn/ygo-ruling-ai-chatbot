import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import { markdownComponents } from "@repo/ui/components/markdown-components";
import { cn } from "@repo/ui/lib/utils";
import StartMessages from "./start-messages";
import { UseChatHelpers } from "@ai-sdk/react";

type ChatMessagesProps = {
  chatHelpers: UseChatHelpers;
  setInput: (value: string) => void;
};

const ChatMessages = ({ chatHelpers, setInput }: ChatMessagesProps) => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const { messages } = chatHelpers;

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({
        behavior: messages.length > 1 ? "smooth" : "auto",
      });
    }
  }, [messages]);

  return (
    <>
      <div className="max-w-3xl mx-auto w-full px-4 pt-20 pb-10">
        <div className="py-4">
          {messages.length === 0 ? (
            <StartMessages chatHelpers={chatHelpers} setInput={setInput} />
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2 max-w-[80%]",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground system-message-styles"
                    )}
                  >
                    <Markdown components={markdownComponents}>
                      {message.content}
                    </Markdown>
                  </div>
                </div>
              ))}
              <div ref={messagesRef} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatMessages;
