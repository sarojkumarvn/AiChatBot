import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getAiResponse = async (userMessage) => {
  const prompt = `You are a chatbot , you are developed by Quickbrain Ai team . please give response in a small context of maximun 100 words , Here is the user message: ${userMessage}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
};
