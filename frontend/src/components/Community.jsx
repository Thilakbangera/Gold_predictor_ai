import React from "react";
import { motion } from "framer-motion";

export default function Community() {
  return (
    <section
      id="community"
      className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-12 my-16 glass rounded-xl bg-gradient-to-r from-purple-800/70 to-indigo-900/70 text-white shadow-lg text-center"
    >
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2"
      >
        Got questions?
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mb-4 sm:mb-6 md:mb-8 text-base sm:text-lg md:text-xl text-white/80"
      >
        Join the community.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mb-6 sm:mb-8 md:mb-10 max-w-xs sm:max-w-md md:max-w-xl mx-auto text-sm sm:text-base md:text-lg text-white/70"
      >
        Our Discord community and staff are here to help! Share your feedback and ideas.
      </motion.p>

      <motion.a
        href="https://discord.gg/WTXGvBTe"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block px-5 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold shadow-lg text-sm sm:text-base md:text-lg"
      >
        Join Discord
      </motion.a>
    </section>
  );
}
