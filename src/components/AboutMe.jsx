
// // src/components/AboutMe.jsx
// import React, { useRef, useState, useEffect } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import * as THREE from 'three';

// // --- Helper 3D Component for AboutMe Background ---
// const FloatingShapes = () => {
//   const mesh1 = useRef();
//   const mesh2 = useRef();
//   const mesh3 = useRef();

//   useFrame(({ clock }) => {
//     if (mesh1.current) {
//       mesh1.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.5;
//       mesh1.current.rotation.y = Math.cos(clock.elapsedTime * 0.5) * 0.5;
//     }
//     if (mesh2.current) {
//       mesh2.current.rotation.x = Math.cos(clock.elapsedTime * 0.4) * 0.6;
//       mesh2.current.rotation.y = Math.sin(clock.elapsedTime * 0.4) * 0.6;
//     }
//     if (mesh3.current) {
//       mesh3.current.rotation.x = Math.sin(clock.elapsedTime * 0.6) * 0.4;
//       mesh3.current.rotation.y = Math.cos(clock.elapsedTime * 0.6) * 0.4;
//     }
//   });

//   return (
//     <>
//       <ambientLight intensity={0.3} />
//       <pointLight position={[10, 10, 10]} intensity={0.5} />
//       <pointLight position={[-10, -10, -10]} intensity={0.3} />

//       <mesh ref={mesh1} position={[-1.5, 1, -2]}>
//         <dodecahedronGeometry args={[0.7, 0]} />
//         <meshStandardMaterial color="#8E2DE2" transparent opacity={0.6} roughness={0.5} metalness={0.5} />
//       </mesh>
//       <mesh ref={mesh2} position={[2, -1.5, -1]}>
//         <icosahedronGeometry args={[0.8, 0]} />
//         <meshStandardMaterial color="#4A00E0" transparent opacity={0.7} roughness={0.4} metalness={0.6} />
//       </mesh>
//       <mesh ref={mesh3} position={[0, 0, -3]}>
//         <torusKnotGeometry args={[1, 0.3, 100, 16]} />
//         <meshStandardMaterial color="#FF007F" transparent opacity={0.5} roughness={0.6} metalness={0.4} />
//       </mesh>
//     </>
//   );
// };

// // --- Main AboutMe Component ---
// const AboutMe = () => {
//   const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
//   const [introRef, introInView] = useInView({ triggerOnce: true, threshold: 0.1 });
//   const [skillsRef, skillsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
//   const [connectRef, connectInView] = useInView({ triggerOnce: true, threshold: 0.1 });
//   const [resumeRef, resumeInView] = useInView({ triggerOnce: true, threshold: 0.1 });

//   const introControls = useAnimation();
//   const skillsControls = useAnimation();
//   const connectControls = useAnimation();
//   const resumeControls = useAnimation();

//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const cardContainerRef = useRef(null);

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       if (cardContainerRef.current) {
//         const rect = cardContainerRef.current.getBoundingClientRect();
//         setMousePosition({
//           x: event.clientX - rect.left,
//           y: event.clientY - rect.top,
//         });
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   useEffect(() => {
//     if (introInView) introControls.start("visible");
//   }, [introControls, introInView]);

//   useEffect(() => {
//     if (skillsInView) skillsControls.start("visible");
//   }, [skillsControls, skillsInView]);

//   useEffect(() => {
//     if (connectInView) connectControls.start("visible");
//   }, [connectControls, connectInView]);

//   useEffect(() => {
//     if (resumeInView) resumeControls.start("visible");
//   }, [resumeControls, resumeInView]);


//   // --- Animation Variants ---

//   const textContainerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.03,
//         delayChildren: 0.2,
//       },
//     },
//   };
//   const textWordVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const skillsSectionVariants = {
//     hidden: { opacity: 0, scale: 0.9, y: 50 },
//     visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.3 } },
//   };
//   const skillTagVariants = {
//     hidden: { opacity: 0, y: 20, scale: 0.8 },
//     visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 10 } },
//     hover: { scale: 1.1, boxShadow: "0px 0px 15px rgba(76, 201, 240, 0.6)" },
//     tap: { scale: 0.95 },
//   };

//   const connectSectionVariants = {
//     hidden: { opacity: 0, x: 100 },
//     visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.4 } },
//   };
//   const linkVariants = {
//     hidden: { opacity: 0, x: 50 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
//     hover: { scale: 1.1, y: -5 },
//     tap: { scale: 0.9 },
//   };

//   const resumeButtonVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 150, damping: 10, delay: 0.8 } },
//     hover: {
//       scale: 1.05,
//       boxShadow: "0 0 20px rgba(76, 201, 240, 0.8), 0 0 40px rgba(76, 201, 240, 0.4)",
//       transition: { duration: 0.2 }
//     },
//     tap: { scale: 0.95 }
//   };

//   const myDetails = {
//     name: "Athul Ganapati Pujari",
//     education: "B.E. in Electronics and Communication",
//     intro: [
//       "Hello! I'm Athul Ganapati Pujari, a passionate web developer recently graduated with a B.E. in Electronics and Communication.",
//       "This project showcases my dedication to mastering modern animation techniques with Framer Motion, bringing captivating UI experiences to life.",
//       "I thrive on solving complex problems through clean code and thoughtful design, with a keen interest in both frontend interfaces and backend systems."
//     ],
//     skills: [
//       "C", "C++", "SQL", "JavaScript (Basic)",
//       "HTML5", "CSS3", "React.js (Basic)",
//       "MySQL", "DBMS",
//       "Object-Oriented Programming (OOP)", "Data Structures & Algorithms",
//       "Software Development", "Web Technologies", "Backend Systems", "Frontend Interfaces",
//       "Analytical Thinking", "Quick Learning", "Communication", "Team Collaboration"
//     ],
//     linkedin: "https://www.linkedin.com/in/athul-ganapati-pujari-62a3a2319/",
//     github: "https://github.com/athulp1",
//     email: "athulpujari96@gmail.com",
//     resumeLink: "https://drive.google.com/file/d/1zyAEpQndVtO2DI8FweVO2hCZMJstg6iK/view?usp=sharing"
//   };

//   return (
//     <motion.section
//       ref={ref}
//       initial="hidden"
//       animate={inView ? "visible" : "hidden"}
//       className="container mx-auto px-4 py-16 mb-24 relative"
//     >
//       <div
//         ref={cardContainerRef}
//         className="
//           bg-gradient-to-br from-gray-800 to-gray-900
//           rounded-3xl shadow-2xl p-8 md:p-16
//           border border-gray-700
//           flex flex-col items-center text-center
//           w-full max-w-5xl mx-auto
//           relative overflow-hidden
//         "
//       >
//         {/* Dynamic Background Glow/Parallax Effect (follows mouse) */}
//         <motion.div
//           className="absolute inset-0 rounded-3xl overflow-hidden"
//           style={{
//             background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(76, 201, 240, 0.15) 0%, transparent 70%)`,
//           }}
//         />
//         {/* Subtle background pattern/texture */}
//         <div className="absolute inset-0 bg-dots-pattern opacity-10 -z-10 rounded-3xl"></div>
//         {/* Radial gradient for depth */}
//         <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-transparent opacity-20 -z-10 rounded-3xl"></div>
        
//         {/* 3D Floating Shapes Background */}
//         <div className="absolute inset-0 z-0 opacity-30">
//           <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
//             <FloatingShapes />
//           </Canvas>
//         </div>

//         <h2 className="relative z-10 text-6xl md:text-7xl font-extrabold text-blue-400 mb-8 drop-shadow-lg">
//           About Me
//         </h2>
        
//         {/* --- Intro Section (Personalized & Staggered Text Animation) --- */}
//         {myDetails.intro && (
//           <motion.p
//             ref={introRef}
//             variants={textContainerVariants}
//             initial="hidden"
//             animate={introControls}
//             className="relative z-10 text-gray-300 text-xl md:text-2xl leading-relaxed mb-10 max-w-3xl"
//           >
//             {myDetails.intro.map((paragraph, pIndex) => (
//               <span key={pIndex} className="block mb-4">
//                 {paragraph && paragraph.split(" ").map((word, wIndex) => (
//                   <motion.span key={wIndex} variants={textWordVariants} className="inline-block mr-1">
//                     {word}
//                   </motion.span>
//                 ))}
//               </span>
//             ))}
//           </motion.p>
//         )}

//         <h3 className="relative z-10 text-4xl font-bold text-white mb-6">Skills & Expertise</h3>
//         {/* --- Skills Section (Animated Grid-like Pop-in) --- */}
//         {myDetails.skills && (
//           <motion.div
//             ref={skillsRef}
//             variants={skillsSectionVariants} // Apply variants to this container
//             initial="hidden"
//             animate={skillsControls}
//             className="relative z-10 flex flex-wrap justify-center gap-3 mb-10 max-w-4xl"
//           >
//             {myDetails.skills.map((skill, index) => (
//               <motion.span
//                 key={index}
//                 variants={skillTagVariants} // Individual skill tag animation
//                 whileHover="hover"
//                 whileTap="tap"
//                 className="px-5 py-2 bg-gray-700 text-gray-200 rounded-full text-lg font-medium shadow-md cursor-pointer
//                            border border-gray-600 hover:border-blue-500 transition-all duration-200"
//               >
//                 {skill}
//               </motion.span>
//             ))}
//           </motion.div>
//         )}

//         <h3 className="relative z-10 text-4xl font-bold text-white mb-6">Connect with {myDetails.name.split(' ')[0]}</h3>
//         {/* --- Connect Section (Slide in from Right with "Boxes on Boxes" Aesthetic) --- */}
//         <motion.div // This is the container for the contact boxes
//           ref={connectRef}
//           variants={connectSectionVariants} // Apply section animation variants to this container
//           initial="hidden"
//           animate={connectControls}
//           className="relative z-10 flex flex-wrap justify-center gap-6 mb-10"
//         >
//           {/* LinkedIn Box */}
//           <motion.div
//             variants={linkVariants} // Apply individual link animation variants to the box
//             whileHover="hover"
//             whileTap="tap"
//             className="
//               bg-gray-700 rounded-xl p-4 shadow-lg border border-gray-600
//               flex flex-col items-center justify-center text-center
//               w-40 h-32 cursor-pointer
//               transform transition-all duration-200
//               hover:bg-blue-800 hover:border-blue-500 hover:shadow-xl
//             "
//           >
//             <a
//               href={myDetails.linkedin}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex flex-col items-center text-white"
//             >
//               <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M20.447 20.452h-3.554v-5.564c0-1.328-.027-3.044-1.852-3.044-1.853 0-2.136 1.445-2.136 2.953v5.655H9.357V9.601h3.413v1.56a3.7 3.7 0 0 1 3.33-1.853c3.563 0 4.214 2.356 4.214 6.78V20.452zM5.957 7.82c-1.22 0-2.2-.98-2.2-2.2 0-1.219.98-2.2 2.2-2.2s2.2.98 2.2 2.2c0 1.22-.98 2.2-2.2 2.2zM7.785 20.452H4.13V9.601h3.655V20.452z" />
//               </svg>
//               <span className="text-lg font-semibold">LinkedIn</span>
//             </a>
//           </motion.div>

//           {/* GitHub Box */}
//           <motion.div
//             variants={linkVariants}
//             whileHover="hover"
//             whileTap="tap"
//             className="
//               bg-gray-700 rounded-xl p-4 shadow-lg border border-gray-600
//               flex flex-col items-center justify-center text-center
//               w-40 h-32 cursor-pointer
//               transform transition-all duration-200
//               hover:bg-purple-800 hover:border-purple-500 hover:shadow-xl
//             "
//           >
//             <a
//               href={myDetails.github}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex flex-col items-center text-white"
//             >
//               <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.09-.745.08-.73.08-.73 1.205.085 1.838 1.238 1.838 1.238 1.07 1.835 2.809 1.305 3.49.998.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.333-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.12-.3-.535-1.52.14-3.18 0 0 1-.32 3.3-.32 1.055 0 2.05.265 2.89.705.996-.275 2.06-.413 3.13-.413 1.07 0 2.134.138 3.13.413.84-.44 1.835-.705 2.89-.705 2.3 0 3.3.32 3.3.32.675 1.66.26 2.88.14 3.18.77.84 1.235 1.91 1.235 3.22 0 4.607-2.805 5.625-5.475 5.92.43.37.82 1.12.82 2.25 0 1.6-.015 2.89-.015 3.285 0 .32.218.695.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z"/>
//             </svg>
//             <span className="text-lg font-semibold">GitHub</span>
//             </a>
//           </motion.div>

//           {/* Email Box */}
//           <motion.div
//             variants={linkVariants}
//             whileHover="hover"
//             whileTap="tap"
//             className="
//               bg-gray-700 rounded-xl p-4 shadow-lg border border-gray-600
//               flex flex-col items-center justify-center text-center
//               w-40 h-32 cursor-pointer
//               transform transition-all duration-200
//               hover:bg-red-800 hover:border-red-500 hover:shadow-xl
//             "
//           >
//             <a
//               href={`mailto:${myDetails.email}`}
//               className="flex flex-col items-center text-white"
//             >
//               <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M22 4H2C.9 4 .009 4.9.009 6L0 18c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4L12 14 2 8V6l10 6 10-6v2z"/>
//               </svg>
//               <span className="text-lg font-semibold">Email Me</span>
//             </a>
//           </motion.div>
//         </motion.div>

//         {/* View Resume Button */}
//         <motion.a
//           ref={resumeRef} // Ref for this section's visibility
//           href={myDetails.resumeLink}
//           target="_blank"
//           rel="noopener noreferrer"
//           variants={resumeButtonVariants}
//           initial="hidden"
//           animate={resumeControls}
//           whileHover="hover"
//           whileTap="tap"
//           className="relative z-10 mt-8 px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-2xl font-bold rounded-full shadow-lg
//                      border-2 border-transparent hover:border-white transition-all duration-300 transform overflow-hidden"
//         >
//           View My Resume
//           {/* Shine effect overlay for the button */}
//           <motion.span
//             className="absolute inset-0 block bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
//             animate={{ x: ["-100%", "100%"] }}
//             transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
//           />
//         </motion.a>

       
//       </div>

//       {/* Internal CSS for subtle background dots pattern */}
//       <style>{`
//         .bg-dots-pattern {
//           background-image: radial-gradient(circle, #4a5568 1px, transparent 1px);
//           background-size: 20px 20px;
//         }
//       `}</style>
//     </motion.section>
//   );
// };

// export default AboutMe;























// src/components/AboutMe.jsx
import React, { useRef, useState, useEffect } from 'react'; // Ensure all hooks are imported
import { motion, useAnimation } from 'framer-motion'; // Ensure motion and useAnimation are imported
import { useInView } from 'react-intersection-observer'; // Ensure useInView is imported
import { Canvas, useFrame } from '@react-three/fiber'; // Ensure Canvas and useFrame are imported for 3D
import { OrbitControls } from '@react-three/drei'; // Ensure OrbitControls is imported for 3D
import * as THREE from 'three'; // Ensure THREE is imported for 3D materials/colors

// --- Helper 3D Component for AboutMe Background ---
// This component renders subtle, floating 3D shapes.
const FloatingShapes = () => {
  const mesh1 = useRef();
  const mesh2 = useRef();
  const mesh3 = useRef();

  useFrame(({ clock }) => {
    // Animate rotation for continuous subtle movement, creating a dynamic background.
    if (mesh1.current) {
      mesh1.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.5;
      mesh1.current.rotation.y = Math.cos(clock.elapsedTime * 0.5) * 0.5;
    }
    if (mesh2.current) {
      mesh2.current.rotation.x = Math.cos(clock.elapsedTime * 0.4) * 0.6;
      mesh2.current.rotation.y = Math.sin(clock.elapsedTime * 0.4) * 0.6;
    }
    if (mesh3.current) {
      mesh3.current.rotation.x = Math.sin(clock.elapsedTime * 0.6) * 0.4;
      mesh3.current.rotation.y = Math.cos(clock.elapsedTime * 0.6) * 0.4;
    }
  });

  return (
    <>
      {/* Ambient light for general illumination of 3D objects */}
      <ambientLight intensity={0.3} />
      {/* Point lights for dynamic highlights, creating depth and shine */}
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />

      {/* Shape 1: Dodecahedron (a 12-sided polyhedron) */}
      <mesh ref={mesh1} position={[-1.5, 1, -2]}>
        <dodecahedronGeometry args={[0.7, 0]} /> {/* Defines the shape */}
        <meshStandardMaterial color="#8E2DE2" transparent opacity={0.6} roughness={0.5} metalness={0.5} /> {/* Defines its appearance */}
      </mesh>
      {/* Shape 2: Icosahedron (a 20-sided polyhedron) */}
      <mesh ref={mesh2} position={[2, -1.5, -1]}>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#4A00E0" transparent opacity={0.7} roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Shape 3: Torus Knot (a knotted ring shape) */}
      <mesh ref={mesh3} position={[0, 0, -3]}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshStandardMaterial color="#FF007F" transparent opacity={0.5} roughness={0.6} metalness={0.4} />
      </mesh>
    </>
  );
};

// --- Main AboutMe Component ---
const AboutMe = () => {
  // useInView hook for the main About Me section visibility
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  // useInView hooks for individual content sections within AboutMe
  const [introRef, introInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [skillsRef, skillsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [connectRef, connectInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [resumeRef, resumeInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // useAnimation hooks for imperative controls for each section
  const introControls = useAnimation();
  const skillsControls = useAnimation();
  const connectControls = useAnimation();
  const resumeControls = useAnimation();

  // State for mouse position to create a dynamic, interactive background glow effect within the card.
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardContainerRef = useRef(null); // Ref to the main card div to calculate relative mouse position.

  // Effect to track mouse position relative to the inner card for interactive background glow.
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (cardContainerRef.current) {
        const rect = cardContainerRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left, // Mouse X relative to the card
          y: event.clientY - rect.top,  // Mouse Y relative to the card
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove); // Cleanup
  }, []);

  // UseEffects to trigger animations for each section when it comes into view.
  useEffect(() => {
    if (introInView) introControls.start("visible");
  }, [introControls, introInView]);

  useEffect(() => {
    if (skillsInView) skillsControls.start("visible");
  }, [skillsControls, skillsInView]);

  useEffect(() => {
    if (connectInView) connectControls.start("visible");
  }, [connectControls, connectInView]);

  useEffect(() => {
    if (resumeInView) resumeControls.start("visible");
  }, [resumeControls, resumeInView]);


  // --- Animation Variants ---

  // Main Card Wrapper Animation (Slide in from bottom, slight bounce)
  const mainCardVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 15, delay: 0.2 } },
  };

  // Intro Text: Staggered reveal (words)
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // Faster stagger for individual words
        delayChildren: 0.2, // Delay before text starts animating
      },
    },
  };
  const textWordVariants = {
    hidden: { opacity: 0, y: 20 }, // Words start invisible and slightly below.
    visible: { opacity: 1, y: 0 }, // Words animate to visible and their original position.
  };

  // Skills Section: Grid-like pop-in with bounce
  const skillsSectionVariants = { // Correctly defined and used for the skills section container
    hidden: { opacity: 0, scale: 0.9, y: 50 }, // Added y:50 for slide up effect
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.3 } },
  };
  const skillTagVariants = { // Individual skill tag animation
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 10 } },
    hover: { scale: 1.1, boxShadow: "0px 0px 15px rgba(76, 201, 240, 0.6)" }, // Cyan glow on hover
    tap: { scale: 0.95 },
  };

  // Connect Section: Slide in from right with subtle bounce
  const connectSectionVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.4 } },
  };
  const linkVariants = { // Individual link animation
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.1, y: -5 }, // Lift and scale on hover
    tap: { scale: 0.9 },
  };

  // Resume button variants for extra shine and animation
  const resumeButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 150, damping: 10, delay: 0.8 } },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(76, 201, 240, 0.8), 0 0 40px rgba(76, 201, 240, 0.4)", // Stronger cyan glow
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  // YOUR ACTUAL PERSONAL DETAILS ARE DEFINED HERE:
  const myDetails = {
    name: "Athul Ganapati Pujari",
    education: "B.E. in Electronics and Communication",
    intro: [
      "Hello! I'm Athul Ganapati Pujari, a passionate web developer recently graduated with a B.E. in Electronics and Communication.",
      "This project showcases my dedication to mastering modern animation techniques with Framer Motion, bringing captivating UI experiences to life.",
      "I thrive on solving complex problems through clean code and thoughtful design, with a keen interest in both frontend interfaces and backend systems."
    ],
    skills: [
      "C", "C++", "SQL", "JavaScript (Basic)",
      "HTML5", "CSS3", "React.js (Basic)",
      "MySQL", "DBMS",
      "Object-Oriented Programming (OOP)", "Data Structures & Algorithms",
      "Software Development", "Web Technologies", "Backend Systems", "Frontend Interfaces",
      "Analytical Thinking", "Quick Learning", "Communication", "Team Collaboration"
    ],
    linkedin: "https://www.linkedin.com/in/athul-ganapati-pujari-62a3a2319/",
    github: "https://github.com/athulp1",
    email: "athulpujari96@gmail.com",
    resumeLink: "https://drive.google.com/file/d/1zyAEpQndVtO2DI8FweVO2hCZMJstg6iK/view?usp=sharing" // YOUR RESUME LINK IS HERE
  };

  return (
    <motion.section
      ref={ref} // Main section ref for overall visibility detection
      variants={mainCardVariants} // Apply main card animation variants
      initial="hidden"
      animate={inView ? "visible" : "hidden"} // Animate main section on scroll into view
      className="container mx-auto px-4 py-16 mb-24 relative" // 'relative' is needed for absolute positioned children
    >
      {/* This is the new, main parent div for the About Me card's content and its unique background */}
      <div
        ref={cardContainerRef} // Ref for mouse position tracking for the inner glow effect
        className="
          bg-gradient-to-br from-gray-900 to-gray-950 /* Darker, more defined gradient for the main card */
          rounded-3xl shadow-2xl p-8 md:p-16
          border border-gray-700
          flex flex-col items-center text-center
          w-full max-w-5xl mx-auto
          relative overflow-hidden /* Ensure content stays within bounds and allows absolute positioning */
        "
      >
        {/* Dynamic Background Glow/Parallax Effect (follows mouse) */}
        {/* This creates a subtle light source that follows the mouse, making the background react */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(76, 201, 240, 0.15) 0%, transparent 70%)`,
          }}
        />
        {/* Subtle background pattern/texture for the About Me card (dots) */}
        <div className="absolute inset-0 bg-dots-pattern opacity-10 -z-10 rounded-3xl"></div>
        {/* Radial gradient for additional depth within the card */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-transparent opacity-20 -z-10 rounded-3xl"></div>
        
        {/* --- 3D Floating Shapes Background --- */}
        {/* This Canvas renders the subtle 3D shapes behind the content, adding high-end visual flair */}
        <div className="absolute inset-0 z-0 opacity-30">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <FloatingShapes />
            {/* OrbitControls for debugging if needed, but disable for subtle background */}
            {/* <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} /> */}
          </Canvas>
        </div>
        {/* --- END 3D Floating Shapes Background --- */}


        <h2 className="relative z-10 text-6xl md:text-7xl font-extrabold text-blue-400 mb-8 drop-shadow-lg">
          About Me
        </h2>
        
        {/* Conditional rendering to ensure myDetails.intro is available */}
        {myDetails.intro && ( // Ensure intro data exists before mapping
          <motion.p
            ref={introRef} // Ref for this specific section's visibility
            variants={textContainerVariants} // Staggered animation for paragraphs
            initial="hidden"
            animate={introControls} // Controlled by useAnimation when 'introInView' is true
            className="relative z-10 text-gray-300 text-xl md:text-2xl leading-relaxed mb-10 max-w-3xl"
          >
            {myDetails.intro.map((paragraph, pIndex) => (
              <span key={pIndex} className="block mb-4">
                {paragraph && paragraph.split(" ").map((word, wIndex) => ( // Split each paragraph into words
                  <motion.span key={wIndex} variants={textWordVariants} className="inline-block mr-1"> {/* Animate each word */}
                    {word}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.p>
        )}

        <h3 className="relative z-10 text-4xl font-bold text-white mb-6">Skills & Expertise</h3>
        {myDetails.skills && ( // Conditional rendering for skills
          <motion.div
            ref={skillsRef} // Ref for this section's visibility
            variants={skillsSectionVariants} // <<< Correctly apply the skillsSectionVariants here
            initial="hidden"
            animate={skillsControls} // Controlled by useAnimation
            className="relative z-10 flex flex-wrap justify-center gap-3 mb-10 max-w-4xl"
          >
            {myDetails.skills.map((skill, index) => (
              <motion.span
                key={index}
                variants={skillTagVariants} // Individual skill tag animation
                whileHover="hover"
                whileTap="tap"
                className="px-5 py-2 bg-gray-700 text-gray-200 rounded-full text-lg font-medium shadow-md cursor-pointer
                           border border-gray-600 hover:border-blue-500 transition-all duration-200"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        )}

        <h3 className="relative z-10 text-4xl font-bold text-white mb-6">Connect with {myDetails.name.split(' ')[0]}</h3>
        {/* --- Connect Section (Slide in from Right with "Boxes on Boxes" Aesthetic) --- */}
        <motion.div // This is the container for the contact boxes
          ref={connectRef}
          variants={connectSectionVariants} // Apply section animation variants to this container
          initial="hidden"
          animate={connectControls}
          className="relative z-10 flex flex-wrap justify-center gap-6 mb-10"
        >
          {/* LinkedIn Box */}
          <motion.div
            variants={linkVariants} // Apply individual link animation variants to the box
            whileHover="hover"
            whileTap="tap"
            className="
              bg-gray-700 rounded-xl p-4 shadow-lg border border-gray-600
              flex flex-col items-center justify-center text-center
              w-40 h-32 cursor-pointer
              transform transition-all duration-200
              hover:bg-blue-800 hover:border-blue-500 hover:shadow-xl
            "
          >
            <a
              href={myDetails.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-white"
            >
              <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.564c0-1.328-.027-3.044-1.852-3.044-1.853 0-2.136 1.445-2.136 2.953v5.655H9.357V9.601h3.413v1.56a3.7 3.7 0 0 1 3.33-1.853c3.563 0 4.214 2.356 4.214 6.78V20.452zM5.957 7.82c-1.22 0-2.2-.98-2.2-2.2 0-1.219.98-2.2 2.2-2.2s2.2.98 2.2 2.2c0 1.22-.98 2.2-2.2 2.2zM7.785 20.452H4.13V9.601h3.655V20.452z" />
              </svg>
              <span className="text-lg font-semibold">LinkedIn</span>
            </a>
          </motion.div>

          {/* GitHub Box */}
          <motion.div
            variants={linkVariants}
            whileHover="hover"
            whileTap="tap"
            className="
              bg-gray-700 rounded-xl p-4 shadow-lg border border-gray-600
              flex flex-col items-center justify-center text-center
              w-40 h-32 cursor-pointer
              transform transition-all duration-200
              hover:bg-purple-800 hover:border-purple-500 hover:shadow-xl
            "
          >
            <a
              href={myDetails.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-white"
            >
              <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.09-.745.08-.73.08-.73 1.205.085 1.838 1.238 1.838 1.238 1.07 1.835 2.809 1.305 3.49.998.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.333-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.12-.3-.535-1.52.14-3.18 0 0 1-.32 3.3-.32 1.055 0 2.05.265 2.89.705.996-.275 2.06-.413 3.13-.413 1.07 0 2.134.138 3.13.413.84-.44 1.835-.705 2.89-.705 2.3 0 3.3.32 3.3.32.675 1.66.26 2.88.14 3.18.77.84 1.235 1.91 1.235 3.22 0 4.607-2.805 5.625-5.475 5.92.43.37.82 1.12.82 2.25 0 1.6-.015 2.89-.015 3.285 0 .32.218.695.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-lg font-semibold">GitHub</span>
            </a>
          </motion.div>

          {/* Email Box */}
          <motion.div
            variants={linkVariants}
            whileHover="hover"
            whileTap="tap"
            className="
              bg-gray-700 rounded-xl p-4 shadow-lg border border-gray-600
              flex flex-col items-center justify-center text-center
              w-40 h-32 cursor-pointer
              transform transition-all duration-200
              hover:bg-red-800 hover:border-red-500 hover:shadow-xl
            "
          >
            <a
              href={`mailto:${myDetails.email}`}
              className="flex flex-col items-center text-white"
            >
              <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 4H2C.9 4 .009 4.9.009 6L0 18c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4L12 14 2 8V6l10 6 10-6v2z"/>
              </svg>
              <span className="text-lg font-semibold">Email Me</span>
            </a>
          </motion.div>
        </motion.div>

        {/* View Resume Button */}
        <motion.a
          ref={resumeRef} // Ref for this section's visibility
          href={myDetails.resumeLink}
          target="_blank"
          rel="noopener noreferrer"
          variants={resumeButtonVariants}
          initial="hidden"
          animate={resumeControls}
          whileHover="hover"
          whileTap="tap"
          className="relative z-10 mt-8 px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-2xl font-bold rounded-full shadow-lg
                     border-2 border-transparent hover:border-white transition-all duration-300 transform overflow-hidden"
        >
          View My Resume
          {/* Shine effect overlay for the button */}
          <motion.span
            className="absolute inset-0 block bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
          />
        </motion.a>

       
      </div>

      {/* Internal CSS for subtle background dots pattern */}
      <style>{`
        .bg-dots-pattern {
          background-image: radial-gradient(circle, #4a5568 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </motion.section>
  );
};

export default AboutMe;
