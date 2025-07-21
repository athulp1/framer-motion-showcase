
// // src/components/Footer.jsx
// import React, { useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { Canvas, useFrame } from '@react-three/fiber'; // For 3D Heart
// import { OrbitControls } from '@react-three/drei'; // For 3D Heart camera control (optional)
// import * as THREE from 'three'; // For 3D Heart geometry/materials

// // --- Helper 3D Heart Component for Footer ---
// const Heart3D = ({ isHovered }) => {
//   const mesh = useRef();
//   const scale = isHovered ? 1.2 : 1; // Scale up on hover
//   const color = isHovered ? new THREE.Color("#FF007F") : new THREE.Color("#E94E77"); // Pink/Red on hover

//   useFrame(({ clock }) => {
//     if (mesh.current) {
//       // Subtle continuous pulse/exceed effect
//       mesh.current.scale.lerp(new THREE.Vector3(
//         1 + Math.sin(clock.elapsedTime * 2) * 0.05, // Subtle pulse
//         1 + Math.sin(clock.elapsedTime * 2) * 0.05,
//         1 + Math.sin(clock.elapsedTime * 2) * 0.05
//       ), 0.1);
      
//       // Apply hover scale
//       mesh.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
      
//       // Smooth color transition
//       mesh.current.material.color.lerp(color, 0.1);
      
//       // Subtle rotation
//       mesh.current.rotation.y = clock.elapsedTime * 0.1;
//     }
//   });

//   // Function to create a heart shape geometry
//   const createHeartShape = () => {
//     const shape = new THREE.Shape();
//     const x = 0, y = 0;
//     shape.moveTo(x + 2.5, y + 2.5);
//     shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
//     shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
//     shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
//     shape.bezierCurveTo(x + 6.5, y + 7.7, x + 8, y + 5.5, x + 8, y + 3.5);
//     shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
//     shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

//     const extrudeSettings = {
//       steps: 2, // Number of points on the z-axis
//       depth: 0.5, // How thick the heart is
//       bevelEnabled: false // No bevel for a cleaner look
//     };

//     return new THREE.ExtrudeGeometry(shape, extrudeSettings);
//   };

//   return (
//     <mesh ref={mesh} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.5}> {/* Rotate to face camera */}
//       <primitive object={createHeartShape()} attach="geometry" />
//       <meshStandardMaterial color={color} roughness={0.5} metalness={0.5} />
//     </mesh>
//   );
// };


// const Footer = () => {
//   const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
//   const [isHeartHovered, setIsHeartHovered] = useState(false); // State for heart hover

//   const footerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
//   };

//   const iconVariants = {
//     hidden: { opacity: 0, scale: 0.5 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5 } },
//     hover: { scale: 1.2, color: "#60A5FA" },
//     tap: { scale: 0.9 },
//   };

//   const arrowVariants = {
//     hidden: { opacity: 0, y: 50 }, // Starts invisible and below
//     visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }, // Slides up with spring
//   };

//   // Your actual personal details for the footer
//   const myFooterDetails = {
//     linkedin: "https://www.linkedin.com/in/athul-ganapati-pujari-62a3a2319/",
//     github: "https://github.com/athulp1",
//     email: "athulpujari96@gmail.com",
//     name: "Athul Ganapati Pujari" // Used for copyright
//   };

//   return (
//     <motion.footer
//       ref={ref}
//       variants={footerVariants}
//       initial="hidden"
//       animate={inView ? "visible" : "hidden"}
//       className="relative bg-gray-900 text-gray-400 py-12 px-4 border-t border-gray-700 shadow-inner"
//     >
//       {/* Subtle animated background elements for the footer */}
//       <div className="absolute inset-0 overflow-hidden opacity-20">
//         <motion.div
//           animate={{ x: ["-100%", "100%"] }}
//           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//           className="absolute top-0 left-0 w-32 h-full bg-blue-500 blur-xl opacity-30"
//         ></motion.div>
//         <motion.div
//           animate={{ x: ["100%", "-100%"] }}
//           transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 5 }}
//           className="absolute bottom-0 right-0 w-48 h-full bg-purple-500 blur-xl opacity-30"
//         ></motion.div>
//       </div>

//       <div className="container mx-auto flex flex-col md:flex-row justify-between items-center relative z-10">
//         <div className="text-center md:text-left mb-6 md:mb-0">
//           <h3 className="text-3xl font-bold text-white mb-2">Framer Motion Showcase</h3>
//           <p className="text-lg">Crafting captivating UI experiences.</p>
//         </div>

//         <div className="flex flex-col items-center md:items-end">
//           <p className="text-xl font-semibold text-white mb-4">Connect With Me</p>
//           <div className="flex space-x-6">
//             <motion.a
//               href={myFooterDetails.linkedin}
//               target="_blank"
//               rel="noopener noreferrer"
//               variants={iconVariants}
//               initial="hidden"
//               animate={inView ? "visible" : "hidden"}
//               whileHover="hover"
//               whileTap="tap"
//               className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
//             >
//               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M20.447 20.452h-3.554v-5.564c0-1.328-.027-3.044-1.852-3.044-1.853 0-2.136 1.445-2.136 2.953v5.655H9.357V9.601h3.413v1.56a3.7 3.7 0 0 1 3.33-1.853c3.563 0 4.214 2.356 4.214 6.78V20.452zM5.957 7.82c-1.22 0-2.2-.98-2.2-2.2 0-1.219.98-2.2 2.2-2.2s2.2.98 2.2 2.2c0 1.22-.98 2.2-2.2 2.2zM7.785 20.452H4.13V9.601h3.655V20.452z" />
//               </svg>
//             </motion.a>

//             <motion.a
//               href={myFooterDetails.github}
//               target="_blank"
//               rel="noopener noreferrer"
//               variants={iconVariants}
//               initial="hidden"
//               animate={inView ? "visible" : "hidden"}
//               whileHover="hover"
//               whileTap="tap"
//               className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
//             >
//               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.09-.745.08-.73.08-.73 1.205.085 1.838 1.238 1.838 1.238 1.07 1.835 2.809 1.305 3.49.998.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.333-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.12-.3-.535-1.52.14-3.18 0 0 1-.32 3.3-.32 1.055 0 2.05.265 2.89.705.996-.275 2.06-.413 3.13-.413 1.07 0 2.134.138 3.13.413.84-.44 1.835-.705 2.89-.705 2.3 0 3.3.32 3.3.32.675 1.66.26 2.88.14 3.18.77.84 1.235 1.91 1.235 3.22 0 4.607-2.805 5.625-5.475 5.92.43.37.82 1.12.82 2.25 0 1.6-.015 2.89-.015 3.285 0 .32.218.695.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z"/>
//               </svg>
//             </motion.a>

//             <motion.a
//               href={`mailto:${myFooterDetails.email}`}
//               variants={iconVariants}
//               initial="hidden"
//               animate={inView ? "visible" : "hidden"}
//               whileHover={{ scale: 1.2, color: "#EF4444" }}
//               whileTap={{ scale: 0.95 }}
//               className="text-gray-400 hover:text-red-400 transition-colors duration-200"
//             >
//               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M22 4H2C.9 4 .009 4.9.009 6L0 18c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4L12 14 2 8V6l10 6 10-6v2z"/>
//               </svg>
//             </motion.a>
//           </div>
//         </div>
//       </div>
//       {/* --- NEW: Heart Symbol and Message --- */}
//       <div className="text-center text-sm text-gray-500 mt-8 relative z-10 flex flex-col items-center">
//         <div 
//           onMouseEnter={() => setIsHeartHovered(true)}
//           onMouseLeave={() => setIsHeartHovered(false)}
//           className="relative w-24 h-24 mb-2 cursor-pointer"
//         >
//           <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
//             <Heart3D isHovered={isHeartHovered} />
//             <ambientLight intensity={0.5} />
//             <pointLight position={[5, 5, 5]} intensity={1} />
//           </Canvas>
//           <motion.div
//             variants={arrowVariants}
//             initial="hidden"
//             animate={isHeartHovered ? "visible" : "hidden"}
//             className="absolute bottom-0 left-1/2 -translate-x-1/2 text-blue-400"
//             style={{ y: isHeartHovered ? '-20px' : '0px' }} // Ensure arrow moves up
//           >
//             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path d="M12 21l-8-8h5V3h6v10h5l-8 8z"/>
//             </svg>
//           </motion.div>
//         </div>
//         <p className="text-gray-400 text-lg font-semibold mt-2">
//           Made with <span className="text-red-500">❤️</span> by {myFooterDetails.name}
//         </p>
//         <p className="text-gray-500 text-sm mt-2">
//           &copy; {new Date().getFullYear()} {myFooterDetails.name}. All rights reserved.
//         </p>
//       </div>
//       {/* --- END NEW --- */}
//     </motion.footer>
//   );
// };

// export default Footer;
















// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer'; // Import useInView for scroll animation

const Footer = () => {
  // useInView hook to animate the footer as it scrolls into view
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5 } },
    hover: { scale: 1.2, color: "#60A5FA" },
    tap: { scale: 0.9 },
  };

  // Your actual personal details for the footer
  const myFooterDetails = {
    linkedin: "https://www.linkedin.com/in/athul-ganapati-pujari-62a3a2319/",
    github: "https://github.com/athulp1",
    email: "athulpujari96@gmail.com",
    name: "Athul Ganapati Pujari" // Used for copyright and "Made by" message
  };

  return (
    <motion.footer
      ref={ref} // Attach the observer ref to the footer
      variants={footerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"} // Animate when footer comes into view
      className="relative bg-gray-900 text-gray-400 py-12 px-4 border-t border-gray-700 shadow-inner flex flex-col items-center justify-between" // Adjusted for overall layout
    >
      {/* Subtle animated background elements for the footer (kept for general aesthetic, but can be removed if desired) */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-32 h-full bg-blue-500 blur-xl opacity-30"
        ></motion.div>
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute bottom-0 right-0 w-48 h-full bg-purple-500 blur-xl opacity-30"
        ></motion.div>
      </div>

      {/* Top section of the footer: Branding and Social Icons */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center relative z-10 w-full mb-8">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h3 className="text-3xl font-bold text-white mb-2">Framer Motion Showcase</h3>
          <p className="text-lg">Crafting captivating UI experiences.</p>
        </div>

        {/* Connect With Me Section (Social Icons) */}
        <div className="flex flex-col items-center md:items-end">
          <p className="text-xl font-semibold text-white mb-4">Connect With Me</p>
          <div className="flex space-x-6">
            {/* LinkedIn Icon */}
            <motion.a
              href={myFooterDetails.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: "#60A5FA" }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.564c0-1.328-.027-3.044-1.852-3.044-1.853 0-2.136 1.445-2.136 2.953v5.655H9.357V9.601h3.413v1.56a3.7 3.7 0 0 1 3.33-1.853c3.563 0 4.214 2.356 4.214 6.78V20.452zM5.957 7.82c-1.22 0-2.2-.98-2.2-2.2 0-1.219.98-2.2 2.2-2.2s2.2.98 2.2 2.2c0 1.22-.98 2.2-2.2 2.2zM7.785 20.452H4.13V9.601h3.655V20.452z" />
              </svg>
            </motion.a>

            {/* GitHub Icon */}
            <motion.a
              href={myFooterDetails.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: "#60A5FA" }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.09-.745.08-.73.08-.73 1.205.085 1.838 1.238 1.838 1.238 1.07 1.835 2.809 1.305 3.49.998.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.333-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.12-.3-.535-1.52.14-3.18 0 0 1-.32 3.3-.32 1.055 0 2.05.265 2.89.705.996-.275 2.06-.413 3.13-.413 1.07 0 2.134.138 3.13.413.84-.44 1.835-.705 2.89-.705 2.3 0 3.3.32 3.3.32.675 1.66.26 2.88.14 3.18.77.84 1.235 1.91 1.235 3.22 0 4.607-2.805 5.625-5.475 5.92.43.37.82 1.12.82 2.25 0 1.6-.015 2.89-.015 3.285 0 .32.218.695.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z"/>
              </svg>
            </motion.a>

            {/* Email Icon */}
            <motion.a
              href={`mailto:${myFooterDetails.email}`}
              whileHover={{ scale: 1.2, color: "#EF4444" }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-red-400 transition-colors duration-200"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 4H2C.9 4 .009 4.9.009 6L0 18c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4L12 14 2 8V6l10 6 10-6v2z"/>
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
      {/* --- NEW: Bottom Section with Main Message and Copyright --- */}
      <div className="relative z-10 text-center w-full mt-8"> {/* Added mt-8 for spacing from top section */}
        {/* Main message: Made with Heart by Athul Ganapati Pujari */}
        <p className="text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight"> {/* Reduced mb-4 to mb-2 for closer spacing to copyright */}
          Made with <span className="text-red-500">❤️</span> by {myFooterDetails.name}
        </p>
        
        {/* Copyright message */}
        <p className="text-gray-500 text-sm md:text-base">
          &copy; {new Date().getFullYear()} {myFooterDetails.name}. All rights reserved.
        </p>
      </div>
      {/* --- END NEW --- */}
    </motion.footer>
  );
};

export default Footer;
