import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function CTA() {
  return (
    <section className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-12 my-16 glass rounded-xl bg-gradient-to-r from-indigo-700 to-purple-700 text-white text-center shadow-lg">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 sm:mb-8 md:mb-10"
      >
        Connect with me! Follow on social media or send me an email.
      </motion.p>

      <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 mb-6 text-2xl sm:text-3xl md:text-4xl">
        <motion.a
          href="https://www.linkedin.com/in/thilak-bangera-b37629318"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          className="hover:text-blue-400"
        >
          <FaLinkedin />
        </motion.a>
        <motion.a
          href="https://github.com/Thilakbangera"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          className="hover:text-gray-300"
        >
          <FaGithub />
        </motion.a>
        <motion.a
          href="mailto:thilakbangera17@gmail.com"
          whileHover={{ scale: 1.2 }}
          className="hover:text-yellow-300"
        >
          <FaEnvelope />
        </motion.a>
      </div>

      <motion.a
        href="https://www.linkedin.com/in/thilak-bangera-b37629318"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-bold shadow-lg inline-block text-sm sm:text-base md:text-lg"
      >
        Visit My Profile
      </motion.a>
    </section>
  );
}
