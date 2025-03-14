import React, { useState } from "react";
import "./index.css";
import { ChatBotIcon } from "./components/ChatBotIcon";
import { ChatForm } from "./components/ChatForm";
import { ChatMessageUser } from "./components/ChatMessageUser";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4">
      {/* Chatbot Toggle Button */}
      <button
        onClick={toggleChatbot}
        className={`chatbot-toggle-button ${
          isOpen ? "open" : ""
        } bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-[400px] bg-white rounded-lg shadow-lg flex flex-col h-[500px]">
          {/* Chatbot Header */}
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex items-center gap-2">
            <ChatBotIcon />
            <h1 className="text-lg font-semibold">AI Chatbot</h1>
          </div>

          {/* Chat Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {/* Example Chat Messages from bot */}
            <div className="mb-4">
              <div className="text-gray-700 bg-gray-200 p-3 rounded-lg max-w-[70%]">
                <p>Hello! How can I assist you today?</p>
              </div>
            </div>
            {/* message from user */}
            {chatHistory.map((chat, index) => (
              <ChatMessageUser key={index} chat={chat} /> //passing the values using props
            
            ))}
          
          </div>

          {/* Input Area */}
          <ChatForm setChatHistory={setChatHistory} />
        </div>
      )}
    </div>
  );
}

export default App;
