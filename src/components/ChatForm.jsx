import React, { useRef } from "react";
import { SendBtn } from "./SendBtn";

export const ChatForm = ({ setChatHistory }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    inputRef.current.value = "";
    console.log(userMessage);

    //update the chat history with the users message
    setChatHistory((history) => [
      ...history,
      { role: "user", content: userMessage },
    ]);
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
