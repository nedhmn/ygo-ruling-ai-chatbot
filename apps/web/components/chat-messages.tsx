import { UIMessage } from "ai";
import { UseChatHelpers } from "@ai-sdk/react";
import { useEffect, useMemo, useRef } from "react";

type ChatMessagesProps = {
  messages: Array<UIMessage>;
  status: UseChatHelpers["status"];
};

const ChatMessages = ({ messages, status }: ChatMessagesProps) => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const messagesLength = useMemo(() => messages.length, [messages]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messagesLength]);

  return (
    <>
      <div className="max-w-4xl mx-auto w-full px-4 pt-20">
        <div className="py-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center min-h-[70vh]">
              <p className="text-foreground text-lg">
                {"Hey there! What's on your mind?"}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {message.content}
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
