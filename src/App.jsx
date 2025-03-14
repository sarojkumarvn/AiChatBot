import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { ChatBotIcon } from "./components/ChatBotIcon";
import { ChatForm } from "./components/ChatForm";
import { getAiResponse } from "./util/GeminiUtils";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: "model", content: "Hi, how can I help you today?" },
  ]);
  const chatContainerRef = useRef(null);

  const GenerateBotResponse = async (history) => {
    const formattedHistory = history.map((chat) => ({
      role: chat.role,
      content: chat.content,
    }));

    try {
      const response = await getAiResponse(
        formattedHistory[formattedHistory.length - 1].content
      );

      setChatHistory((history) =>
        history.map((chat) =>
          chat.content === "Thinking..."
            ? { role: "model", content: response }
            : chat
        )
      );
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
  };

  // used to scroll the chat container according to the chat history
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const refreshChat = () => {
    setChatHistory([
      { role: "model", content: "Hi, how can I help you today?" },
    ]);
  };

  return (
    <div className="fixed bottom-4 right-4">
      {/* Chatbot Toggle Button */}
      <button
        onClick={toggleChatbot}
        className="bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        💬
      </button>
      {isOpen && (
        <div className="fixed bottom-20 right-4 bg-white shadow-lg rounded-lg w-100 h-[500px] flex flex-col">
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChatBotIcon />
              <h1 className="text-lg font-semibold">AI Chatbot</h1>
            </div>
            <button
              onClick={refreshChat}
              className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-700"
            >
              Refresh
            </button>
          </div>
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 bg-gray-50"
          >
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
