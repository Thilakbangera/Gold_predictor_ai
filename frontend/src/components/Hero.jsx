import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="text-center py-20 sm:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-snug">
          Track and Predict{' '}
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Gold Prices
          </span>{' '}
          with AI
        </h2>
        <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-xl sm:max-w-2xl mx-auto mb-8">
          Real-time predictions, latest news, and AI insights for smarter investments.
        </p>
        <motion.a
          href="#prediction"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 sm:px-6 md:px-8 py-2 sm:py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl shadow-lg text-white font-semibold inline-block"
        >
          Try Free
        </motion.a>
      </motion.div>

      {/* Decorative Background Blurs */}
      <div className="absolute top-[-80px] sm:top-[-100px] right-[-80px] sm:right-[-100px] w-60 sm:w-72 h-60 sm:h-72 bg-yellow-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-80px] sm:bottom-[-100px] left-[-80px] sm:left-[-100px] w-60 sm:w-72 h-60 sm:h-72 bg-orange-500/20 rounded-full blur-3xl"></div>
    </section>
  );
}
