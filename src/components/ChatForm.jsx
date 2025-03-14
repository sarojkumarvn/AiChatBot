import React, { useRef } from "react";
import { SendBtn } from "./SendBtn";

export const ChatForm = ({ chatHistory, setChatHistory, GenerateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    inputRef.current.value = "";

    // Immediately update chat history with the user's message
    setChatHistory((history) => [
      ...history,
      { role: "user", content: userMessage },
    ]);

    // Simulate bot response
    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", content: "Thinking..." },
      ]);

      // calling the functiob which generate the bot response
      GenerateBotResponse([...chatHistory, { role: "user", content: userMessage }]);
    }, 600);
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex gap-2">
        <form
          action="#"
          className="flex w-full gap-2"
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            ref={inputRef}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleFormSubmit}
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <SendBtn />
          </button>
        </form>
      </div>
    </div>
  );
};
