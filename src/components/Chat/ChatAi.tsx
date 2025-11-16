"use client";
import "./chat.css";
import {
  FolderClosed,
  LucideThumbsUp,
  MessageSquareIcon,
  RefreshCcw,
  SendIcon,
} from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

export const ChatAi = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!input?.trim()) return;

    const userMessage: ChatMessage = {
      role: "user" as const,
      content: input.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();

      // Handle both streamed and non-streamed responses
      if (data.content) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.content,
          },
        ]);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="cover fixed right-20 bottom-11 bg-white shadow-2xl rounded-xl shadow-[#ababab]">
      {isOpen && (
        <div className="h-[500px] w-[400px] flex flex-col">
          <div className="head bg-primary border-b-2 border-accent p-3 flex justify-between items-center">
            <h1 className="text-xl font-bold flex gap-2 items-center">
              <LucideThumbsUp />
              <div className="title flex flex-col text-black">
                <h3 className="capitalize">Khirdin AI</h3>
                <p className="capitalize text-sm">Chat with Khirdin AI</p>
              </div>
            </h1>
            <div className="flex items-center gap-2">
              <RefreshCcw size={14} className="cursor-pointer" />
              <FolderClosed size={14} className="cursor-pointer" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-4">
                No messages yet. Start a conversation!
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`message mb-3 p-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-100 text-blue-900 rounded-lg rounded-r-none ml-8 flex justify-end"
                      : "bg-white text-gray-900 rounded-lg rounded-l-none mr-8 flex justify-start"
                  }`}
                >
                  {/* <strong className="capitalize">{message.role}: </strong> */}
                  <span>{message.content}</span>
                </div>
              ))
            )}
            {isLoading && (
              <div className="message mb-3 p-2 rounded-lg bg-white rounded-l-none mr-8">
                {/* <strong>assistant: </strong> */}
                <span className="italic">Thinking...</span>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-accent">
            <div className="relative">
              <Input
                type="text"
                name="message"
                id="message"
                className="h-[40px] w-full bg-grey-500 rounded-full shadow-lg pr-12"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer w-8 h-8 flex items-center justify-center "
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
              >
                <SendIcon
                  className={`${
                    isLoading || !input.trim() ? "text-gray-400" : "text-primary"
                  } w-5 h-5`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="icon bg-primary p-3 w-14 h-14 flex items-center justify-center cursor-pointer rounded-full hover:opacity-90 mt-2"
      >
        <MessageSquareIcon color="white" />
      </div>
    </div>
  );
};
