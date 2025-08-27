import React from 'react';
import { motion } from 'framer-motion';

const footerLinks = {
  Explore: ["Prediction", "News", "Chat", "Pricing"],
  Resources: ["Help Center", "API Docs", "Community"],
  Company: ["Terms & Conditions", "Privacy"]
};

export default function Footer() {
  return (
    <footer className="bg-black/90 text-white text-sm sm:text-base p-6 sm:p-10 mt-16 sm:mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 mb-8 sm:mb-12">
        {Object.entries(footerLinks).map(([title, links]) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">{title}</h4>
            <ul className="space-y-1 sm:space-y-2">
              {links.map((link, i) => (
                <li key={i}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="hover:text-yellow-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center text-white/50 text-xs sm:text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        GoldAI © 2024. All Rights Reserved.
      </motion.div>
    </footer>
  );
}
