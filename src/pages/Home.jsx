// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Lottie from "lottie-react";
import heroAnimation from "../assets/heroAnimation.json"; // Ensure this exists or replace with correct path

const features = [
  {
    title: "📝 Create Promise",
    description: "Let users vote on your new campaign promises.",
    path: "/promise-create",
  },
  {
    title: "📜 View Promises",
    description: "Browse promises made in your district.",
    path: "/promise-list",
  },
  {
    title: "📊 View Results",
    description: "Visualize poll results using graphs.",
    path: "/results",
  },
  {
    title: "📂 My Dashboard",
    description: "Manage your created promises and profile.",
    path: "/user-dashboard",
  },
  {
  title: "🏅 My Achievements",
  description: "Unlock badges as you track and fulfill promises.",
  path: "/badges",
},
  {
    title: "🧑‍💼 Reviews",
    description: "Leave feedback on promises.",
    path: "/admin",
  },
  
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#e0eafc] to-[#cfdef3] dark:from-[#1e1e2f] dark:to-[#2e2e45] text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Lottie Animation */}
        <div className="flex justify-center mb-4">
          <Lottie animationData={heroAnimation} loop className="w-72 h-72" />
        </div>

        {/* Heading */}
        <motion.h1
          className="text-5xl font-extrabold text-center mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="text-green-600">PromisePulse</span> 👋
        </motion.h1>
        <motion.p
          className="text-center text-lg mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Empower your community by tracking campaign promises, participating in
          polls, and holding leaders accountable. Let's build transparency together.
        </motion.p>

        {/* Feature Cards with 3D Tilt + Glassmorphism */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Tilt
              key={feature.title}
              glareEnable={true}
              glareMaxOpacity={0.2}
              glareColor="#ffffff"
              glarePosition="all"
              scale={1.04}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              className="bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-xl border border-white/20 dark:border-white/10 p-6 cursor-pointer transition-all hover:shadow-2xl hover:scale-[1.05]"
              onClick={() => navigate(feature.path)}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
