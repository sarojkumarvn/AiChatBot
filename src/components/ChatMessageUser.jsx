export const ChatMessageUser = ({ chat }) => {
    if (!chat || !chat.content || chat.role === "model") return null; // Ignore bot messages
  
    return (
      <div className="mb-4 flex justify-end">
        <div className="text-white bg-blue-500 p-3 rounded-lg max-w-[70%] break-words shadow-md">
          <p>{chat.content}</p>
        </div>
      </div>
    );
  };
  