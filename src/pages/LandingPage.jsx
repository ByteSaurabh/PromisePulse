import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const words = ["Track Promises", "Empower Accountability", "Build a Better Future", "Foster Trust", "Create Change", "Inspire Action", "Drive Transparency", "Commit to Your Goals", "Make a Difference", "Join the Promise Pulse Community"];

const LandingPage = () => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentWord = words[index];
    let charIndex = 0;

    const typing = setInterval(() => {
      setDisplayedText(currentWord.slice(0, charIndex++));
      if (charIndex > currentWord.length) {
        clearInterval(typing);
        setTimeout(() => setIndex((index + 1) % words.length), 2000);
      }
    }, 100);

    return () => clearInterval(typing);
  }, [index]);

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col items-center justify-center overflow-hidden relative"
      style={{ backgroundImage: "url('/images/landing-bg.png')" }}
    >
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-purple-900 opacity-80 z-0"></div>

      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-pink-500 opacity-30 blur-3xl animate-pulse z-10"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
      ></motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold text-center drop-shadow-xl z-10"
      >
        Promise Pulse
      </motion.h1>

      <motion.p
        className="mt-6 text-xl text-center font-light h-12 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {displayedText}
      </motion.p>

      <div className="mt-10 flex gap-6 z-10">
        <Link
          to="/login"
          className="bg-white text-purple-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-purple-100 transition duration-300"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-800 transition duration-300"
        >
          Signup
        </Link>
      </div>

      <div className="absolute bottom-10 text-center text-sm text-gray-300 z-10">
        Created to track promises, build trust & drive transparency 🚀
      </div>
    </div>
  );
};

export default LandingPage;
