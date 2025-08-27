import React from "react";
import { FaChartLine, FaNewspaper, FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    { icon: <FaChartLine />, title: "Accurate Predictions" },
    { icon: <FaNewspaper />, title: "Live Market News" },
    { icon: <FaRobot />, title: "AI Chat Assistant" },
  ];

  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {features.map((f, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-6 text-center"
        >
          <div className="text-4xl mb-2">{f.icon}</div>
          <h3 className="text-xl font-bold">{f.title}</h3>
        </motion.div>
      ))}
    </motion.div>
  );
}
