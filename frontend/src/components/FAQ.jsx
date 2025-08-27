import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqItems = [
  {
    question: "How do I activate Lumina AI?",
    answer: "Activation instructions will be available soon. Stay tuned!"
  },
  {
    question: "How is Lumina AI different from other AI tools?",
    answer: "Lumina AI specializes in truly understanding websites and generating 3D assets and animations."
  },
  {
    question: "How much usage is included with my Lumina AI plan?",
    answer: "Plans vary — check your dashboard for detailed usage stats."
  },
  {
    question: "Can Lumina AI generate 3D assets or site animations?",
    answer: "Yes! Lumina AI can generate true 3D sites and interactive animations."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleIndex = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      className="max-w-4xl mx-auto p-6 md:p-12 text-white"
      aria-label="Frequently Asked Questions"
    >
      <h3 className="text-3xl font-semibold mb-10 text-center">FAQ</h3>

      <div className="space-y-4">
        {faqItems.map(({ question, answer }, i) => {
          const isOpen = i === openIndex;
          return (
            <div
              key={i}
              className="bg-white/10 glass rounded-lg shadow-lg p-5 cursor-pointer select-none"
              onClick={() => toggleIndex(i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleIndex(i);
              }}
            >
              {/* Question + Arrow */}
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">{question}</h4>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold select-none"
                >
                  +
                </motion.span>
              </div>

              {/* Answer with smooth scaleY animation */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={`panel-${i}`}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{ transformOrigin: "top" }}
                    className="mt-3 text-white/80 overflow-hidden"
                  >
                    {answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
