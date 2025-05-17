import ChatMessages from "@/components/chat-messages";
import { useChat } from "@ai-sdk/react";
import ChatInput from "@/components/chat-input";

const Chat = () => {
  const { input, handleInputChange, handleSubmit, messages, status } =
    useChat();

  return (
    <div className="min-h-screen bg-background pb-24">
      <ChatMessages messages={messages} status={status}></ChatMessages>
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        status={status}
      ></ChatInput>
    </div>
  );
};

export default Chat;
