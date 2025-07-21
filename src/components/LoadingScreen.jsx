// src/components/LoadingScreen.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// This component will display various advanced loading animations.
// It takes an 'isLoading' prop to control its visibility.
const LoadingScreen = ({ isLoading }) => {
  // State to cycle through different loading animations
  const [currentLoader, setCurrentLoader] = useState(0);

  // Array of unique loader components/styles
  const loaders = [
    // Loader 1: Pulsating Grid Dots (Abstract & Elegant)
    <motion.div
      key="loader1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-5 gap-2 p-4 rounded-lg bg-gray-800 border border-gray-700"
    >
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1, // Staggered delay for each dot
            repeatDelay: 0.5,
          }}
          className="w-4 h-4 rounded-full bg-blue-500"
        />
      ))}
    </motion.div>,

    // Loader 2: Expanding Concentric Circles (Smooth & Hypnotic)
    <motion.div
      key="loader2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-48 h-48 flex items-center justify-center"
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 1, 1],
            opacity: [1, 0.5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
          className="absolute border-4 border-purple-500 rounded-full"
          style={{ width: `${(i + 1) * 25}%`, height: `${(i + 1) * 25}%` }}
        />
      ))}
    </motion.div>,

    // Loader 3: Text Wave (Dynamic & Engaging)
    <motion.div
      key="loader3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="text-white text-4xl font-bold flex"
    >
      {"LOADING...".split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "0%" }}
          animate={{ y: ["0%", "-50%", "0%"] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
          className="inline-block mx-0.5"
        >
          {char}
        </motion.span>
      ))}
    </motion.div>,

    // Loader 4: Spinning Hexagon (Geometric & Futuristic)
    <motion.div
      key="loader4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-32 h-32 flex items-center justify-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute w-full h-full border-4 border-green-500 clip-path-hexagon"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
        className="absolute w-2/3 h-2/3 border-4 border-teal-500 clip-path-hexagon"
      />
      <style>{`
        .clip-path-hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>
    </motion.div>,

    // Loader 5: Line Progress Bar (Sleek & Minimal)
    <motion.div
      key="loader5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden"
    >
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: ["0%", "100%", "0%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="h-full bg-blue-500 rounded-full"
      />
    </motion.div>,

    // Loader 6: Bouncing Dots (Playful & Classic)
    <motion.div
      key="loader6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex space-x-2"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "0%" }}
          animate={{ y: ["0%", "-50%", "0%"] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
          className="w-4 h-4 rounded-full bg-red-500"
        />
      ))}
    </motion.div>,

    // Loader 7: Rotating Cube (3D-like, Simple)
    <motion.div
      key="loader7"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-24 h-24 flex items-center justify-center perspective-1000"
    >
      <motion.div
        animate={{ rotateY: 360, rotateX: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 transform-style-3d"
      >
        <div className="absolute inset-0 border-2 border-white opacity-20"></div>
      </motion.div>
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </motion.div>,

    // Loader 8: Radial Wipe (Smooth & Elegant)
    <motion.div
      key="loader8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-32 h-32 rounded-full bg-gray-700 overflow-hidden"
    >
      <motion.div
        initial={{ rotate: 0, scale: 0 }}
        animate={{ rotate: [0, 360], scale: [0, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500"
        style={{ clipPath: 'circle(50% at 50% 50%)' }}
      />
    </motion.div>,

    // Loader 9: Expanding Lines (Modern & Minimal)
    <motion.div
      key="loader9"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col space-y-2 w-48"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ width: "0%" }}
          animate={{ width: ["0%", "100%", "0%"] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          className="h-2 bg-purple-500 rounded-full"
        />
      ))}
    </motion.div>,

    // Loader 10: Morphing Circle to Square (Creative & Fluid)
    <motion.div
      key="loader10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-32 h-32 flex items-center justify-center"
    >
      <motion.div
        animate={{
          borderRadius: ["50%", "0%", "50%"], // Morph from circle to square and back
          rotate: [0, 90, 180, 270, 360],
          backgroundColor: ["#FF007F", "#00BFFF", "#FF007F"], // Color change
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-24 shadow-lg"
      />
    </motion.div>,
  ];

  // Effect to cycle through loaders every few seconds
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setCurrentLoader((prev) => (prev + 1) % loaders.length);
      }, 4000); // Change loader every 4 seconds
      return () => clearInterval(interval);
    }
  }, [isLoading, loaders.length]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.5, duration: 0.5 } }} // Delay exit for smoother transition
          className="fixed inset-0 z-50 bg-gray-950 flex flex-col items-center justify-center text-white font-inter"
        >
          {/* Main loading content area */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-5xl font-bold mb-8 text-blue-400">Loading Experience...</h2>
            <div className="flex items-center justify-center min-h-[150px] min-w-[150px]">
              {loaders[currentLoader]} {/* Display the current loader */}
            </div>
            <p className="mt-8 text-xl text-gray-300">Please wait, creating magic...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
