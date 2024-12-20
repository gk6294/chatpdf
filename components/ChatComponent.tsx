"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";
import { toast } from "sonner";

type Props = { chatId: number };

const ChatComponent = (props: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat", props.chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId: props.chatId,
      });
      return response.data;
    },
  });
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId: props.chatId,
    },
    initialMessages: data || [],
    onError: () => {
      toast.error(
        "An error occurred while processing your request. Please inform admin"
      );
    },
  });
  React.useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  return (
    <div
      className="relative flex flex-col h-full overflow-scroll justify-between bg-gray-900"
      id="message-container"
    >
      {/* header */}
      <div className="sticky top-0 inset-x-0 p-4 bg-gray-900 h-fit ">
        <h3 className="text-xl font-bold text-white">Chat</h3>
      </div>

      {/* message list */}
      <MessageList messages={messages} isLoading={isLoading} />

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 px-2 py-4 bg-gray-900"
      >
        <div className="flex space-x-2 mx-4">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question..."
            className="w-full text-white"
          />
          <Button className="bg-gray-900">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
