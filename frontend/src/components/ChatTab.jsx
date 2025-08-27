import React, { useState } from "react";

export default function ChatTab() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.tavily.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_TAVILY_API_KEY}`,
        },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      const botMessage = { role: "bot", text: data.answer || "No response" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [...prev, { role: "bot", text: "Error occurred" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <section id="chat" className="max-w-4xl mx-auto p-6 md:p-12">
      <h3 className="text-3xl font-semibold mb-6 text-center">AI Chat</h3>
      <div className="glass p-6 rounded-xl shadow-lg flex flex-col space-y-4 max-h-[400px] overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg ${
              msg.role === "user" ? "bg-indigo-600 self-end" : "bg-purple-600 self-start"
            } text-white max-w-xs`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <p className="text-white/70">AI is typing...</p>}
      </div>

      <div className="mt-4 flex space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask something..."
          className="flex-1 p-3 rounded-xl bg-white/10 text-white placeholder-white/50 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-semibold text-white hover:scale-105 transition-transform"
        >
          Send
        </button>
      </div>
    </section>
  );
}
