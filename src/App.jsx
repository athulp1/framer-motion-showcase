

// // src/App.jsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import Home from './Home';
// import ParticleBackground from './components/ParticleBackground';
// // import AboutMe from './components/AboutMe'; // Make sure this import is commented out or removed
// import Footer from './components/Footer';

// function App() {
//   // Variants for hero section content
//   const heroContentVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
//   };

//   const heroButtonVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.6, type: "spring", stiffness: 150 } },
//   };

//   return (
//     <div className="min-h-screen text-white font-inter overflow-x-hidden">
//       <ParticleBackground />

//       {/* Hero Section: The initial "wow" welcome section */}
//       <section className="relative h-screen flex flex-col items-center justify-center text-center p-8 overflow-hidden z-10">
//         {/* Background gradient for the hero section */}
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-80"></div>
        
//         {/* Subtle animated background blobs for extra aesthetic appeal */}
//         <div className="absolute inset-0 z-0 opacity-10">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.5 }}
//             className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
//           ></motion.div>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.0, duration: 0.5 }}
//             className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
//           ></motion.div>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.5, duration: 0.5 }}
//             className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
//           ></motion.div>
//         </div>

//         {/* Content for the hero section (animated using Framer Motion) */}
//         <motion.h1
//           variants={heroContentVariants}
//           initial="hidden"
//           animate="visible"
//           className="relative z-10 text-6xl md:text-8xl font-extrabold mb-4 text-white drop-shadow-lg"
//         >
//           Welcome to <span className="text-blue-400">Framer Motion</span> Project!
//         </motion.h1>
//         <motion.p
//           variants={heroContentVariants}
//           initial="hidden"
//           animate="visible"
//           transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
//           className="relative z-10 text-xl md:text-3xl text-gray-200 max-w-3xl leading-relaxed"
//         >
//           Dive into a world of captivating UI animations, meticulously crafted with Framer Motion.
//         </motion.p>
//         <motion.button
//           variants={heroButtonVariants}
//           initial="hidden"
//           animate="visible"
//           transition={{ delay: 0.6, duration: 0.6, type: "spring", stiffness: 150 }}
//           onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
//           className="relative z-10 mt-10 px-8 py-4 bg-blue-500 text-white text-xl font-semibold rounded-full shadow-lg
//                      hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
//         >
//           Explore Animations
//         </motion.button>
//       </section>

//       {/* Main content area where all animation demos will be rendered */}
//       <Home />

//       {/* Advanced Footer */}
//       <Footer />

//       {/* Global CSS for background blobs (used in the hero section) */}
//       <style>{`
//         @keyframes blob {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         .animate-blob {
//           animation: blob 7s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
//         }
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-4000 { animation-delay: 4s; }
//       `}</style>
//     </div>
//   );
// }

// export default App;



























// src/App.jsx
import React from 'react'; // Removed useState, useEffect
import { motion } from 'framer-motion';
import Home from './Home';
import ParticleBackground from './components/ParticleBackground';
import AboutMe from './components/AboutMe';
import Footer from './components/Footer';
// import LoadingScreen from './components/LoadingScreen'; // <<< REMOVED THIS IMPORT

function App() {
  // Removed isLoading state and useEffect for loading simulation

  // Variants for hero section content
  const heroContentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const heroButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, type: "spring", stiffness: 150 } },
  };

  return (
    // Main container for the entire application.
    <div className="min-h-screen text-white font-inter overflow-x-hidden">
      {/* Removed <LoadingScreen isLoading={isLoading} /> */}
      
      {/* The ParticleBackground component renders a full-screen, dynamic particle system. */}
      <ParticleBackground />

      {/* Hero Section: The initial "wow" welcome section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-8 overflow-hidden z-10">
        {/* Background gradient for the hero section */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-80"></div>
        
        {/* Subtle animated background blobs for extra aesthetic appeal */}
        <div className="absolute inset-0 z-0 opacity-10"> {/* Restored opacity to 10% for better visibility */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
          ></motion.div>
        </div>

        {/* Content for the hero section (animated using Framer Motion) */}
        <motion.h1
          variants={heroContentVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-6xl md:text-8xl font-extrabold mb-4 text-white drop-shadow-lg"
        >
          Welcome to <span className="text-blue-400">Framer Motion</span> Project!
        </motion.h1>
        <motion.p
          variants={heroContentVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-xl md:text-3xl text-gray-200 max-w-3xl leading-relaxed"
        >
          Dive into a world of captivating UI animations, meticulously crafted with Framer Motion.
        </motion.p>
        <motion.button
          variants={heroButtonVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6, duration: 0.6, type: "spring", stiffness: 150 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="relative z-10 mt-10 px-8 py-4 bg-blue-500 text-white text-xl font-semibold rounded-full shadow-lg
                     hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
        >
          Explore Animations
        </motion.button>
      </section>

      {/* Main content area where all animation demos will be rendered */}
      <Home />

      {/* About Me Section */}
      <AboutMe />

      {/* Advanced Footer */}
      <Footer />

      {/* Global CSS for background blobs (used in the hero section) */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}

export default App;
