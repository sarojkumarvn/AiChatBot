import React, { useState } from "react";
import "./index.css";
import { ChatBotIcon } from "./components/ChatBotIcon";
import { ChatForm } from "./components/ChatForm";
import { getAiResponse } from "./util/GeminiUtils";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  // const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY

  const GenerateBotResponse = async (history) => {
    const formattedHistory = history.map((chat) => ({
      role: chat.role,
      content: chat.content,
    }));

    try {
      const response = await getAiResponse(
        formattedHistory[formattedHistory.length - 1].content
      );

      setChatHistory((history) => [
        ...history,
        { role: "model", content: response },
      ]);
      console.log("Bot response:", response);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4">
      {/* Chatbot Toggle Button */}
      <button
        onClick={toggleChatbot}
        className="bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 10h.01M15 10h.01M12 14h.01M12 10h.01m6 2a6 6 0 11-12 0 6 6 0 0112 0zM5 16H4a1 1 0 01-1-1v-1a1 1 0 011-1h1m14 0h1a1 1 0 011 1v1a1 1 0 01-1 1h-1m-4 0h-4m4 0a2 2 0 01-2 2h-4a2 2 0 01-2-2m10-4h1a1 1 0 011 1v1a1 1 0 01-1 1h-1m-14 0H4a1 1 0 01-1-1v-1a1 1 0 011-1h1m14 0h1a1 1 0 011 1v1a1 1 0 01-1 1h-1m-14 0H4a1 1 0 01-1-1v-1a1 1 0 011-1h1m10 0h4m-4 0a2 2 0 01-2 2h-4a2 2 0 01-2-2m10-4h1a1 1 0 011 1v1a1 1 0 01-1 1h-1m-14 0H4a1 1 0 01-1-1v-1a1 1 0 011-1h1"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="fixed bottom-20 right-4 bg-white shadow-lg rounded-lg w-80 h-[500px] flex flex-col">
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex items-center gap-2">
            <ChatBotIcon />
            <h1 className="text-lg font-semibold">AI Chatbot</h1>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <div className="mb-4 flex justify-start">
              <div className="bg-gray-200 text-gray-700 p-3 rounded-lg max-w-[70%]">
                <p>Hello! How can I assist you today?</p>
              </div>
            </div>
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  chat.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[70%] ${
                    chat.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <p>{chat.content}</p>
                </div>
              </div>
            ))}
          </div>
          <ChatForm
            setChatHistory={setChatHistory}
            chatHistory={chatHistory}
            GenerateBotResponse={GenerateBotResponse}
          />
        </div>
      )}
    </div>
  );
};

export default App;
