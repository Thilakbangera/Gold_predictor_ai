import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PredictionTab() {
  const [exog, setExog] = useState(Array(7).fill(""));
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

  const [sentiment, setSentiment] = useState(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const handleChange = (i, val) => {
    const copy = [...exog];
    copy[i] = val;
    setExog(copy);
  };

  const fetchPrediction = async () => {
    if (exog.some((v) => v === "")) {
      alert("Please fill all 7 past prices");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://gold-predsgd.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exog: exog.map(Number) }),
      });
      const data = await res.json();
      if (data.prediction) setPrediction(data.prediction[0]);
      else alert(data.error);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      setNewsLoading(true);
      try {
        const res = await fetch("https://gold-predsgd.onrender.com/news");
        const data = await res.json();
        setNews(data.articles || []);
      } catch (err) {
        console.error(err);
      } finally {
        setNewsLoading(false);
      }
    };

    const fetchSentiment = async () => {
      try {
        const res = await fetch("https://gold-predsgd.onrender.com/sentiment");
        const data = await res.json();
        setSentiment(data.score);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNews();
    fetchSentiment();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setChatLoading(true);

    try {
      const res = await fetch("https://gold-predsgd.onrender.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      const botMessage = { role: "bot", text: data.answer || "No response" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [...prev, { role: "bot", text: "Error occurred" }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 text-white space-y-10">

      {/* Prediction Section */}
      <motion.section
        id="prediction"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">Gold Price Prediction</h2>
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 mb-4">
          {exog.map((v, i) => (
            <input
              key={i}
              type="number"
              placeholder={`Day ${i + 1}`}
              value={v}
              onChange={(e) => handleChange(i, e.target.value)}
              className="p-2 rounded text-black text-center w-full"
            />
          ))}
        </div>
        <motion.button
          onClick={fetchPrediction}
          whileHover={{ scale: 1.05 }}
          className="px-6 py-2 sm:px-8 sm:py-3 bg-indigo-500 rounded-lg font-semibold"
        >
          {loading ? "Predicting..." : "Predict"}
        </motion.button>

        {prediction !== null && (
          <div className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-center">
            Next Day Price: {prediction.toFixed(2)}
          </div>
        )}
      </motion.section>

      <hr className="border-white/20" />

      {/* News Section */}
      <motion.section
        id="news"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center">Gold News</h2>
        {newsLoading ? (
          <p className="text-center py-8">Loading news...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {news.map((article, i) => (
              <a
                key={i}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-4 rounded-xl shadow-lg hover:scale-105 transition-transform flex flex-col"
              >
                {article.image && (
                  <img src={article.image} alt={article.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                )}
                <h4 className="font-semibold text-lg mb-1">{article.title}</h4>
                <p className="text-white/70 text-sm sm:text-base">{article.body?.slice(0, 150)}</p>
              </a>
            ))}
          </div>
        )}
        {sentiment !== null && (
          <p className="mt-4 text-center text-white/80">
            
          </p>
        )}
      </motion.section>

      <hr className="border-white/20" />

      {/* Chat Section */}
      <motion.section
        id="chat"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-center">AI Chat</h2>
        <div className="glass p-4 sm:p-6 rounded-xl shadow-lg flex flex-col space-y-3 max-h-[400px] overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 sm:p-3 rounded-lg ${
                msg.role === "user" ? "bg-indigo-600 self-end" : "bg-purple-600 self-start"
              } text-white max-w-xs sm:max-w-sm`}
            >
              {msg.text}
            </div>
          ))}
          {chatLoading && <p className="text-white/70">AI is typing...</p>}
        </div>
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask something..."
            className="flex-1 p-3 rounded-xl bg-white/10 text-white placeholder-white/50 focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-semibold text-white hover:scale-105 transition-transform"
          >
            Send
          </button>
        </div>
      </motion.section>
    </div>
  );
}
