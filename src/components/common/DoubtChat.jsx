import { useState } from "react";
import axios from "axios";

const DoubtChat = () => {
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hi! I'm your AI tutor. Ask me any doubt 😄",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage = { role: "user", text: input };

    // Optimistically add user message
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/api/v1/doubt", {
        message: input,
        history: updatedMessages,
      });

      const botMessage = {
        role: "model",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage = {
        role: "model",
        text: "Sorry, I couldn't process that. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-richblack-900 text-richblack-5">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[70%] p-3 rounded-xl text-sm whitespace-pre-wrap
              ${
                msg.role === "user"
                  ? "ml-auto bg-yellow-50 text-richblack-900"
                  : "mr-auto bg-richblack-700"
              }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="mr-auto bg-richblack-700 p-3 rounded-xl text-sm">
            Thinking...
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-richblack-700 p-3 flex items-center gap-2">
        <textarea
          className="flex-1 bg-richblack-800 rounded-lg p-2 text-sm resize-none focus:outline-none"
          rows={1}
          placeholder="Ask your doubt here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-yellow-50 text-richblack-900 font-semibold disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default DoubtChat;
