import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-[55vh] flex items-center justify-center px-6 overflow-hidden">
      {/* Super Zeher Background */}
      <div className="absolute inset-0 bg-gray-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(45,55,72,0.6)_0%,_rgba(15,23,42,1)_100%)]"></div>

      {/* Glassy Overlay Effect */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/5 rounded-lg border border-white/10"></div>

      {/* Lightning Neon Glow */}
      <motion.div
        className="absolute -top-10 left-10 w-40 h-40 bg-blue-700 blur-[120px] opacity-30"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-10 right-10 w-40 h-40 bg-purple-700 blur-[120px] opacity-30"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Animated Content */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-3xl p-6"
      >
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-lg"
        >
          Unleash Your <span className="text-blue-400">Thoughts</span>
          <br /> With Words & Creativity.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-4 text-lg md:text-xl text-gray-300 drop-shadow-md"
        >
          A platform where ideas transform into powerful stories.
          <br /> Inspire, Express, and Write Your Legacy.
        </motion.p>
      </motion.div>
    </section>
  );
}
