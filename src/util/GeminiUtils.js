import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAwlvJQ_PZqxd_frYOb9JUPdOAYCoLGrSI");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });





export const getAiResponse = async (userMessage) =>{
    
    const prompt = `You are a chatbot so please give response in a small context of maximun 100 words , Here is the user message: ${userMessage}`
    const result = await model.generateContent(prompt);
    return result.response.text()
  
}
