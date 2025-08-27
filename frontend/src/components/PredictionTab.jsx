import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PredictionTab() {
  const apiUrl = process.env.REACT_APP_API_URL; // <--- use env variable

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
      const res = await fetch(`${apiUrl}/predict`, {
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
        const res = await fetch(`${apiUrl}/news`);
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
        const res = await fetch(`${apiUrl}/sentiment`);
        const data = await res.json();
        setSentiment(data.score);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNews();
    fetchSentiment();
  }, [apiUrl]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setChatLoading(true);

    try {
      const res = await fetch(`${apiUrl}/ask`, {
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

      {/* News & Chat Sections remain unchanged */}
    </div>
  );
}
