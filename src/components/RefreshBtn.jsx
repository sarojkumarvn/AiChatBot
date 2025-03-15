import React from "react";
import { RefreshIcon } from "../assets/Icons/RefreshIcon";

export const RefreshBtn = ({ setChatHistory }) => {
  const refreshChat = () => {
    setChatHistory([
      { role: "model", content: "Hi, how can I help you today?" },
    ]);
  };

  return (
    <button
      onClick={refreshChat}
      className=" px-3 py-1 rounded-full text-white hover:scale-110"
    >
     <RefreshIcon />
    </button>
  );
};
