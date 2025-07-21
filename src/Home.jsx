// // src/Home.jsx
// import React, { useState, useRef } from 'react'; // Added useState and useRef for various animation states/refs
// import { motion, AnimatePresence } from 'framer-motion'; // AnimatePresence for exit animations
// import { useInView } from 'react-intersection-observer'; // For scroll-triggered animations
// import { useScroll, useTransform } from 'framer-motion'; // For scroll-linked animations

// // Import reusable components
// import AnimationDescriptionCard from './components/AnimationDescriptionCard';
// import Hover3DBall from './animation-demos/Hover3DBall'; 
// import AboutMe from './components/AboutMe'; // <<< NEW IMPORT: AboutMe component

// const Home = () => {
//   // --- useInView hooks for each section (for scroll-triggered animations) ---
//   // We use an array of useInView hooks to manage the visibility of each section.
//   // 'triggerOnce: true' ensures the animation plays only the first time the element enters view.
//   // 'threshold: 0.1' means the animation triggers when at least 10% of the element is visible.
//   const sectionRefs = Array.from({ length: 45 }, () => useInView({ triggerOnce: true, threshold: 0.1 }));

//   // --- State for interactive animations (used in various sections below) ---
//   const [toggleSwitch, setToggleSwitch] = useState(false); // For Toggle Switch animation
//   const [listItems, setListItems] = useState([0, 1, 2]); // For Exit Animation demo
//   // Functions to add/remove items from the list, triggering exit animations
//   const removeItem = (item) => setListItems(listItems.filter((i) => i !== item));
//   const addMoreItems = () => setListItems((prev) => [...prev, prev.length]);
  
//   const [dynamicColor, setDynamicColor] = useState('red'); // For Dynamic Variants (changes color on click)
//   const [focusedInput, setFocusedInput] = useState(false); // For Input Focus animation
//   const constraintsRef = useRef(null); // Ref for draggable constraints (used in Draggable Box with Constraints)
  
//   const [isTall, setIsTall] = useState(false); // For Layout Animation (changes height/width)
//   const [isRound, setIsRound] = useState(false); // For Shared Layout (changes border radius)
//   const [isMoved, setIsMoved] = useState(false); // For Layout Transition Custom (changes margin-left)
  
//   const [isExpanded, setIsExpanded] = useState(false); // For Accordion/Expandable Section
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // For Menu Icon Animation
//   const [cardFlip, setCardFlip] = useState(false); // For Card Flip


//   // --- Scroll-linked animations hooks (using framer-motion's useScroll & useTransform) ---
//   const { scrollYProgress } = useScroll(); // Returns a MotionValue that tracks scroll progress (0 to 1) of the document.

//   // These transforms are for the placeholder scroll animations at the very end
//   // They are defined here but the actual elements are in their respective sections
//   const scrollOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]); 
//   const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 360 * 5]); // Rotates 5 full turns
//   const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]); // For scroll progress bar
//   const scrollParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]); // For parallax effect


//   // --- Animation Variants (reusable animation definitions) ---

//   // Variants for staggered text reveal (used in Animation #4)
//   const sentence = {
//     hidden: { opacity: 1 },
//     visible: {
//       opacity: 1,
//       transition: {
//         delay: 0.5, // Delay before the first child starts animating
//         staggerChildren: 0.08, // Delay between each child's animation start
//       },
//     },
//   };
//   const letter = {
//     hidden: { opacity: 0, y: 50 }, // Each letter starts invisible and 50px down
//     visible: { opacity: 1, y: 0 }, // Each letter animates to visible and its original y position
//   };

//   // Variants for exit animation (used in Animation #22: List Item Removal)
//   const exitItemVariants = {
//     initial: { opacity: 0, x: -100 }, // Initial state for new items / when item appears
//     animate: { opacity: 1, x: 0 },    // Target state when item is present
//     exit: { opacity: 0, x: 100, transition: { duration: 0.3 } }, // State when item is removed
//   };

//   // Variants for custom props with variants (used in Animation #23)
//   const customVariants = {
//     initial: (i) => ({ opacity: 0, x: i * 50 }), // 'i' is the custom prop passed
//     animate: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1 } }),
//   };

//   // Variants for simple variants (used in Animation #16)
//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
//   };

//   // Variants for variant propagation (used in Animation #17)
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
//   };
//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   // Variants for keyframes variants (used in Animation #19)
//   const keyframeVariants = {
//     animate: {
//       scale: [1, 1.2, 0.8, 1.1, 1],
//       rotate: [0, 45, -45, 20, 0],
//       borderRadius: ["20%", "50%", "20%", "50%", "20%"],
//       transition: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 },
//     },
//   };

//   // Variants for sequence with 'when' (used in Animation #20)
//   const sequenceVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { when: "beforeChildren", staggerChildren: 0.2 },
//     },
//   };
//   const sequenceChildVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   // Variants for accordion (used in Animation #31)
//   const accordionVariants = {
//     open: { opacity: 1, height: "auto" },
//     closed: { opacity: 0, height: 0 },
//   };

//   // Variants for menu icon (used in Animation #32)
//   const menuVariants = {
//     open: { rotate: 90, scale: 1.2 },
//     closed: { rotate: 0, scale: 1 },
//   };

//   // Variants for card flip (used in Animation #33 & #45)
//   const flipVariants = {
//     front: { rotateY: 0 },
//     back: { rotateY: 180 },
//   };


//   return (
//     <div className="container mx-auto px-4 py-16">
//       {/* --- Category 1: Basic Appear & Loop (6 Animations) --- */}

//       {/* 1. Interactive 3D Ball (Hover & Rotate) */}
//       <motion.section
//         ref={sectionRefs[0][0]} // Attach useInView ref
//         initial={{ opacity: 0, y: 100 }} // Initial state
//         animate={sectionRefs[0][1] ? { opacity: 1, y: 0 } : {}} // Animate when in view
//         transition={{ duration: 0.8, delay: 0.2 }} // Animation properties
//         className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="1. Interactive 3D Ball (Hover & Rotate)"
//           description="A mesmerizing 3D sphere that scales, rotates, and changes color on hover. This demonstrates Three.js integration with React Three Fiber, and manual animation via useFrame for complex 3D interactive effects."
//           codeSnippet={`
// import React, { useRef, useState } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, Html } from '@react-three/drei';
// import * => THREE from 'three';

// const Sphere = React.forwardRef((props, ref) => {
//   const [hovered, setHovered] = useState(false);
//   const meshRef = useRef();
//   const targetScale = hovered ? 1.2 : 1;
//   const targetColor = hovered ? new THREE.Color('#E94E77') : new THREE.Color('#4A90E2');

//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
//       if (hovered) {
//         meshRef.current.rotation.y += 0.02;
//         meshRef.current.rotation.x += 0.01;
//       } else {
//         meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.05);
//         meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.05);
//       }
//       meshRef.current.material.color.lerp(targetColor, 0.1);
//     }
//   });

//   return (
//     <mesh
//       {...props} ref={(el) => { meshRef.current = el; if (typeof ref === 'function') ref(el); else if (ref) ref.current = el; }}
//       onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}
//     >
//       <sphereGeometry args={[1, 64, 64]} />
//       <meshStandardMaterial color={hovered ? '#E94E77' : '#4A90E2'} />
//     </mesh>
//   );
// });

// const Hover3DBall = () => {
//   return (
//     <Canvas camera={{ position: [0, 0, 5], fov: 75 }} className="w-full h-80 rounded-lg bg-gray-900">
//       <ambientLight intensity={0.5} /><directionalLight position={[10, 10, 5]} intensity={1} /><pointLight position={[-10, -10, -10]} intensity={0.5} />
//       <Sphere position={[0, 0, 0]} />
//       <OrbitControls enableZoom={true} enablePan={false} />
//       <Html position={[0, 2, 0]}><div className="text-white text-lg font-bold bg-black bg-opacity-50 px-3 py-1 rounded-md">Hover Me!</div></Html>
//     </Canvas>
//   );
// };
// export default Hover3DBall;
//           `}
//         >
//           <Hover3DBall />
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 2. Basic Fade In & Slide Up */}
//       <motion.section
//         ref={sectionRefs[1][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[1][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="2. Basic Fade In & Slide Up"
//           description="A simple yet elegant animation where an element fades in and slides up from the bottom as it enters the viewport."
//           codeSnippet={`
// <motion.div
//   initial={{ opacity: 0, y: 50 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.7, ease: "easeOut" }}
//   className="w-48 h-48 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg flex items-center justify-center text-xl font-semibold text-white"
// >
//   Fade & Slide
// </motion.div>
//           `}
//         >
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, ease: "easeOut" }}
//             className="w-48 h-48 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg flex items-center justify-center text-xl font-semibold text-white"
//           >
//             Fade & Slide
//           </motion.div>
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 3. Rotate and Scale In */}
//       <motion.section
//         ref={sectionRefs[2][0]} initial={{ opacity: 0, scale: 0.5, rotate: -90 }} animate={sectionRefs[2][1] ? { opacity: 1, scale: 1, rotate: 0 } : {}}
//         transition={{ duration: 1, type: "spring", damping: 10, stiffness: 100 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="3. Rotate and Scale In"
//           description="An element spins and scales into its final position, using a spring transition for a lively effect."
//           codeSnippet={`
// <motion.div
//   initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
//   animate={{ opacity: 1, scale: 1, rotate: 0 }}
//   transition={{ duration: 1, type: "spring", damping: 10, stiffness: 100 }}
//   className="w-48 h-48 bg-gradient-to-br from-pink-500 to-red-500 rounded-full shadow-lg flex items-center justify-center text-xl font-semibold text-white"
// >
//   Rotate & Scale
// </motion.div>
//           `}
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
//             animate={{ opacity: 1, scale: 1, rotate: 0 }}
//             transition={{ duration: 1, type: "spring", damping: 10, stiffness: 100 }}
//             className="w-48 h-48 bg-gradient-to-br from-pink-500 to-red-500 rounded-full shadow-lg flex items-center justify-center text-xl font-semibold text-white"
//           >
//             Rotate & Scale
//           </motion.div>
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 4. Staggered Text Reveal */}
//       <motion.section
//         ref={sectionRefs[3][0]} initial={{ opacity: 0, y: 50 }} animate={sectionRefs[3][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="4. Staggered Text Reveal"
//           description="Individual letters or words appear one after another, creating a dynamic and engaging text entrance."
//           codeSnippet={`
// const text = "Staggered Text Reveal!";
// const sentence = {
//   hidden: { opacity: 1 },
//   visible: { opacity: 1, transition: { delay: 0.5, staggerChildren: 0.08 } },
// };
// const letter = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

// <motion.h3
//   variants={sentence} initial="hidden" animate={inView4 ? "visible" : "hidden"}
//   className="text-2xl font-bold text-white max-w-sm"
// >
//   {text.split("").map((char, index) => (
//     <motion.span key={index} variants={letter}>{char}</motion.span>
//   ))}
// </motion.h3>
//           `}
//         >
//           {(() => {
//             const text = "Staggered Text Reveal!";
//             const sentence = {
//               hidden: { opacity: 1 },
//               visible: { opacity: 1, transition: { delay: 0.5, staggerChildren: 0.08 } },
//             };
//             const letter = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };
//             return (
//               <motion.h3
//                 variants={sentence} initial="hidden" animate={sectionRefs[3][1] ? "visible" : "hidden"}
//                 className="text-2xl font-bold text-white max-w-sm"
//               >
//                 {text.split("").map((char, index) => (
//                   <motion.span key={index} variants={letter}>{char}</motion.span>
//                 ))}
//               </motion.h3>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 5. Loop Animation (Bouncing Ball) */}
//       <motion.section
//         ref={sectionRefs[4][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[4][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="5. Loop Animation (Bouncing Ball)"
//           description="A simple circle continuously bounces up and down, demonstrating the 'repeat' and 'repeatType' properties for endless animations."
//           codeSnippet={`
// <motion.div
//   animate={{ y: ["0%", "100%", "0%"] }}
//   transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
//   className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg"
// />
//           `}
//         >
//           <div className="w-full h-48 flex items-center justify-center">
//             <motion.div
//               animate={{ y: ["0%", "100%", "0%"] }}
//               transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
//               className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg"
//             />
//           </div>
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 6. Pulse on Mount (using repeatType: "mirror") */}
//       <motion.section
//         ref={sectionRefs[5][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[5][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="6. Pulse on Mount"
//           description="An element gently pulses in size when it appears, creating a subtle attention-grabbing effect using 'repeatType: mirror'."
//           codeSnippet={`
// <motion.div
//   animate={{ scale: [1, 1.05, 1] }}
//   transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
//   className="w-32 h-32 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl shadow-lg flex items-center justify-center text-white font-semibold"
// >
//   Pulse
// </motion.div>
//           `}
//         >
//           <motion.div
//             animate={{ scale: [1, 1.05, 1] }}
//             transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
//             className="w-32 h-32 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl shadow-lg flex items-center justify-center text-white font-semibold"
//           >
//             Pulse
//           </motion.div>
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* --- Category 2: Interaction (5 Animations) --- */}

//       {/* 7. Button Hover Scale & Color */}
//       <motion.section
//         ref={sectionRefs[6][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[6][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="7. Button Hover Scale & Color"
//           description="A button scales up and changes color smoothly when hovered over, providing clear visual feedback."
//           codeSnippet={`
// <motion.button
//   whileHover={{ scale: 1.1, backgroundColor: "#3B82F6" }} // Tailwind blue-600
//   whileTap={{ scale: 0.9 }}
//   className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg font-semibold"
// >
//   Hover Me
// </motion.button>
//           `}
//         >
//           <motion.button
//             whileHover={{ scale: 1.1, backgroundColor: "#3B82F6" }} // Tailwind blue-600
//             whileTap={{ scale: 0.9 }}
//             className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg font-semibold"
//           >
//             Hover Me
//           </motion.button>
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 8. Button Tap Shrink & Bounce */}
//       <motion.section
//         ref={sectionRefs[7][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[7][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="8. Button Tap Shrink & Bounce"
//           description="A button provides tactile feedback by shrinking slightly and then bouncing back on tap/click."
//           codeSnippet={`
// <motion.button
//   whileTap={{ scale: 0.8, y: 5 }}
//   transition={{ type: "spring", stiffness: 400, damping: 10 }}
//   className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg font-semibold"
// >
//   Tap Me
// </motion.button>
//           `}
//         >
//           <motion.button
//             whileTap={{ scale: 0.8, y: 5 }}
//             transition={{ type: "spring", stiffness: 400, damping: 10 }}
//             className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg font-semibold"
//           >
//             Tap Me
//           </motion.button>
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 9. Card Hover Lift & Shadow */}
//       <motion.section
//         ref={sectionRefs[8][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[8][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="9. Card Hover Lift & Shadow"
//           description="A card subtly lifts and its shadow expands on hover, adding depth and interactivity."
//           codeSnippet={`
// <motion.div
//   whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
//   className="w-64 h-40 bg-gray-700 rounded-xl shadow-md flex items-center justify-center text-white font-semibold"
// >
//   Hover Card
// </motion.div>
//           `}
//         >
//           <motion.div
//             whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
//             className="w-64 h-40 bg-gray-700 rounded-xl shadow-md flex items-center justify-center text-white font-semibold"
//           >
//             Hover Card
//           </motion.div>
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 10. Input Focus Border & Label Transform */}
//       <motion.section
//         ref={sectionRefs[9][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[9][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="10. Input Focus Border & Label"
//           description="An input field's border highlights and its label transforms on focus, providing clear visual cues."
//           codeSnippet={`
// const [focused, setFocused] = useState(false);
// <div className="relative">
//   <motion.label
//     htmlFor="animated-input"
//     initial={{ y: 0, fontSize: "1rem", color: "#9CA3AF" }}
//     animate={focused ? { y: -24, fontSize: "0.875rem", color: "#60A5FA" } : {}}
//     transition={{ duration: 0.2 }}
//     className="absolute left-2 top-2 origin-top-left pointer-events-none"
//   >
//     Your Email
//   </motion.label>
//   <motion.input
//     id="animated-input" type="email"
//     onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
//     initial={{ borderColor: "#4B5563" }}
//     animate={focused ? { borderColor: "#60A5FA", boxShadow: "0 0 0 3px rgba(96, 165, 250, 0.5)" } : {}}
//     className="border-2 border-gray-600 rounded-lg p-2 pt-6 bg-gray-900 text-white outline-none"
//   />
// </div>
//           `}
//         >
//           {(() => {
//             // Use local state for this specific demo
//             const [focused, setFocused] = useState(false);
//             return (
//               <div className="relative">
//                 <motion.label
//                   htmlFor="animated-input"
//                   initial={{ y: 0, fontSize: "1rem", color: "#9CA3AF" }} // gray-400
//                   animate={focused ? { y: -24, fontSize: "0.875rem", color: "#60A5FA" } : {}} // blue-400
//                   transition={{ duration: 0.2 }}
//                   className="absolute left-2 top-2 origin-top-left pointer-events-none"
//                 >
//                   Your Email
//                 </motion.label>
//                 <motion.input
//                   id="animated-input"
//                   type="email"
//                   onFocus={() => setFocused(true)}
//                   onBlur={() => setFocused(false)}
//                   initial={{ borderColor: "#4B5563" }} // gray-600
//                   animate={focused ? { borderColor: "#60A5FA", boxShadow: "0 0 0 3px rgba(96, 165, 250, 0.5)" } : {}}
//                   className="border-2 border-gray-600 rounded-lg p-2 pt-6 bg-gray-900 text-white outline-none"
//                 />
//               </div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 11. Toggle Switch (Click to animate) */}
//       <motion.section
//         ref={sectionRefs[10][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[10][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="11. Toggle Switch"
//           description="A visually appealing toggle switch that animates its state change on click, providing clear feedback."
//           codeSnippet={`
// const [toggleSwitch, setToggleSwitch] = useState(false);
// <div
//   onClick={() => setToggleSwitch(!toggleSwitch)}
//   className={\`w-16 h-8 rounded-full flex items-center p-1 cursor-pointer \${toggleSwitch ? 'bg-blue-500' : 'bg-gray-600'}\`}
// >
//   <motion.div
//     layout // Enables automatic animation of layout changes
//     transition={{ type: "spring", stiffness: 700, damping: 30 }}
//     className="w-6 h-6 bg-white rounded-full shadow-md"
//     style={{ x: toggleSwitch ? "calc(100% + 4px)" : "0px" }} // Move the circle
//   />
// </div>
//           `}
//         >
//           <div
//             onClick={() => setToggleSwitch(!toggleSwitch)}
//             className={`w-16 h-8 rounded-full flex items-center p-1 cursor-pointer ${toggleSwitch ? 'bg-blue-500' : 'bg-gray-600'}`}
//           >
//             <motion.div
//               layout // Enables automatic animation of layout changes
//               transition={{ type: "spring", stiffness: 700, damping: 30 }}
//               className="w-6 h-6 bg-white rounded-full shadow-md"
//               style={{ x: toggleSwitch ? "calc(100% + 4px)" : "0px" }} // Move the circle
//             />
//           </div>
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* --- Category 3: Gestures (5 Animations) --- */}

//       {/* 12. Draggable Box (Free Drag) */}
//       <motion.section
//         ref={sectionRefs[11][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[11][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="12. Draggable Box (Free Drag)"
//           description="A simple box that can be freely dragged anywhere on the screen, demonstrating basic drag functionality."
//           codeSnippet={`
// <motion.div
//   drag // Makes the element draggable
//   className="w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
// >
//   Drag Me
// </motion.div>
//           `}
//         >
//           <motion.div
//             drag // Makes the element draggable
//             className="w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
//           >
//             Drag Me
//           </motion.div>
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 13. Draggable Box with Constraints */}
//       <motion.section
//         ref={sectionRefs[12][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[12][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="13. Draggable Box with Constraints"
//           description="A draggable box confined within a specific boundary, useful for sliders or limited movement areas."
//           codeSnippet={`
// const constraintsRef = useRef(null);
// <div ref={constraintsRef} className="w-64 h-32 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
//   <motion.div
//     drag // Makes the element draggable
//     dragConstraints={constraintsRef} // Confines drag to this parent ref
//     className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg cursor-grab"
//   />
// </div>
//           `}
//         >
//           <div ref={constraintsRef} className="w-64 h-32 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
//             <motion.div
//               drag // Makes the element draggable
//               dragConstraints={constraintsRef} // Confines drag to this parent ref
//               className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg cursor-grab"
//             />
//           </div>
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 14. Draggable Box with Snap to Origin */}
//       <motion.section
//         ref={sectionRefs[13][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[13][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="14. Draggable Box with Snap to Origin"
//           description="A draggable element that snaps back to its original position when released, with elasticity."
//           codeSnippet={`
// <motion.div
//   drag
//   dragSnapToOrigin // Snaps back to origin on release
//   dragElastic={0.5} // Adds elasticity when dragging
//   className="w-24 h-24 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
// >
//   Snap
// </motion.div>
//           `}
//         >
//           <motion.div
//             drag
//             dragSnapToOrigin // Snaps back to origin on release
//             dragElastic={0.5} // Adds elasticity when dragging
//             className="w-24 h-24 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
//           >
//             Snap
//           </motion.div>
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 15. Draggable Box with Custom Reset on Drag End */}
//       <motion.section
//         ref={sectionRefs[14][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[14][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="15. Draggable Box with Custom Reset"
//           description="A draggable element that automatically returns to its original position after being released, with a custom spring animation."
//           codeSnippet={`
// const [x, setX] = useState(0);
// const [y, setY] = useState(0);
// <motion.div
//   drag
//   onDragEnd={() => { setX(0); setY(0); }} // Reset position on drag end
//   animate={{ x, y }} // Animate to state-controlled position
//   transition={{ type: "spring", stiffness: 300, damping: 20 }}
//   className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
// >
//   Reset
// </motion.div>
//           `}
//         >
//           {(() => {
//             const [x, setX] = useState(0);
//             const [y, setY] = useState(0);
//             return (
//               <motion.div
//                 drag
//                 onDragEnd={() => { setX(0); setY(0); }}
//                 animate={{ x, y }}
//                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                 className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
//               >
//                 Reset
//               </motion.div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* --- Category 4: Variants & Orchestration (8 Animations) --- */}

//       {/* 16. Simple Variants (Hidden/Visible Card) */}
//       <motion.section
//         ref={sectionRefs[15][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[15][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="16. Simple Variants (Hidden/Visible)"
//           description="Define named animation states (variants) for easy control and reusability."
//           codeSnippet={`
// const cardVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
// };
// <motion.div
//   variants={cardVariants}
//   initial="hidden"
//   animate={inView16 ? "visible" : "hidden"}
//   className="w-64 h-40 bg-gray-700 rounded-xl shadow-lg flex items-center justify-center text-white font-semibold"
// >
//   Variant Card
// </motion.div>
//           `}
//         >
//           {(() => {
//             const cardVariants = {
//               hidden: { opacity: 0, y: 50 },
//               visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
//             };
//             return (
//               <motion.div
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate={sectionRefs[15][1] ? "visible" : "hidden"}
//                 className="w-64 h-40 bg-gray-700 rounded-xl shadow-lg flex items-center justify-center text-white font-semibold"
//               >
//                 Variant Card
//               </motion.div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 17. Variant Propagation (Staggered List Items) */}
//       <motion.section
//         ref={sectionRefs[16][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[16][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="17. Variant Propagation (Staggered List)"
//           description="Parent variants can orchestrate animations of their children, creating elegant staggered effects."
//           codeSnippet={`
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
// };
// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };
// <motion.ul
//   variants={containerVariants} initial="hidden" animate={inView17 ? "visible" : "hidden"}
//   className="list-disc list-inside text-gray-300"
// >
//   {[1, 2, 3].map((num) => (
//     <motion.li key={num} variants={itemVariants} className="mb-2">
//       Item {num}
//     </motion.li>
//   ))}
// </motion.ul>
//           `}
//         >
//           {(() => {
//             const containerVariants = {
//               hidden: { opacity: 0 },
//               visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
//             };
//             const itemVariants = {
//               hidden: { opacity: 0, y: 20 },
//               visible: { opacity: 1, y: 0 },
//             };
//             return (
//               <motion.ul
//                 variants={containerVariants} initial="hidden" animate={sectionRefs[16][1] ? "visible" : "hidden"}
//                 className="list-disc list-inside text-gray-300"
//               >
//                 {[1, 2, 3].map((num) => (
//                   <motion.li key={num} variants={itemVariants} className="mb-2">
//                     Item {num}
//                   </motion.li>
//                 ))}
//               </motion.ul>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 18. Dynamic Variants (Color change based on prop/state) */}
//       <motion.section
//         ref={sectionRefs[17][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[17][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="18. Dynamic Variants"
//           description="Variants can be dynamically selected based on component state or props, enabling conditional animations."
//           codeSnippet={`
// const [dynamicColor, setDynamicColor] = useState('red');
// const colorVariants = {
//   red: { backgroundColor: "#EF4444" }, // Tailwind red-500
//   blue: { backgroundColor: "#3B82F6" }, // Tailwind blue-500
//   green: { backgroundColor: "#22C55E" }, // Tailwind green-500
// };
// <motion.div
//   variants={colorVariants}
//   animate={dynamicColor}
//   onClick={() => setDynamicColor(prev => (prev === 'red' ? 'blue' : prev === 'blue' ? 'green' : 'red'))}
//   className="w-32 h-32 rounded-xl shadow-lg cursor-pointer flex items-center justify-center text-white font-semibold"
// >
//   Click Me
// </motion.div>
//           `}
//         >
//           {(() => {
//             const colorVariants = {
//               red: { backgroundColor: "#EF4444" },
//               blue: { backgroundColor: "#3B82F6" },
//               green: { backgroundColor: "#22C55E" },
//             };
//             return (
//               <motion.div
//                 variants={colorVariants}
//                 animate={dynamicColor}
//                 onClick={() => setDynamicColor(prev => (prev === 'red' ? 'blue' : prev === 'blue' ? 'green' : 'red'))}
//                 className="w-32 h-32 rounded-xl shadow-lg cursor-pointer flex items-center justify-center text-white font-semibold"
//               >
//                 Click Me
//               </motion.div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 19. Keyframes Variants (Complex sequence) */}
//       <motion.section
//         ref={sectionRefs[18][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[18][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="19. Keyframes Variants"
//           description="Define complex animation sequences with multiple steps within a single variant."
//           codeSnippet={`
// const keyframeVariants = {
//   animate: {
//     scale: [1, 1.2, 0.8, 1.1, 1], // Scale sequence
//     rotate: [0, 45, -45, 20, 0], // Rotate sequence
//     borderRadius: ["20%", "50%", "20%", "50%", "20%"], // Border radius sequence
//     transition: {
//       duration: 2,
//       ease: "easeInOut",
//       repeat: Infinity,
//       repeatDelay: 1,
//     },
//   },
// };
// <motion.div
//   variants={keyframeVariants}
//   initial={{ scale: 1, rotate: 0, borderRadius: "20%" }}
//   animate="animate"
//   className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg flex items-center justify-center text-white font-semibold"
// >
//   Keyframes
// </motion.div>
//           `}
//         >
//           {(() => {
//             const keyframeVariants = {
//               animate: {
//                 scale: [1, 1.2, 0.8, 1.1, 1],
//                 rotate: [0, 45, -45, 20, 0],
//                 borderRadius: ["20%", "50%", "20%", "50%", "20%"],
//                 transition: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 },
//               },
//             };
//             return (
//               <motion.div
//                 variants={keyframeVariants}
//                 initial={{ scale: 1, rotate: 0, borderRadius: "20%" }}
//                 animate="animate"
//                 className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg flex items-center justify-center text-white font-semibold"
//               >
//                 Keyframes
//               </motion.div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 20. Sequence with When (Chained animations) */}
//       <motion.section
//         ref={sectionRefs[19][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[19][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="20. Sequence with 'When'"
//           description="Orchestrate animations to play in a specific sequence using the 'when' property in variants."
//           codeSnippet={`
// const sequenceVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       when: "beforeChildren", // Parent animates first
//       staggerChildren: 0.2,
//     },
//   },
// };
// const childVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };
// <motion.div
//   variants={sequenceVariants} initial="hidden" animate={inView20 ? "visible" : "hidden"}
//   className="flex flex-col space-y-2"
// >
//   <motion.div variants={childVariants} className="w-24 h-8 bg-gray-600 rounded"></motion.div>
//   <motion.div variants={childVariants} className="w-24 h-8 bg-gray-600 rounded"></motion.div>
//   <motion.div variants={childVariants} className="w-24 h-8 bg-gray-600 rounded"></motion.div>
// </motion.div>
//           `}
//         >
//           {(() => {
//             const sequenceVariants = {
//               hidden: { opacity: 0 },
//               visible: {
//                 opacity: 1,
//                 transition: { when: "beforeChildren", staggerChildren: 0.2 },
//               },
//             };
//             const childVariants = {
//               hidden: { opacity: 0, y: 20 },
//               visible: { opacity: 1, y: 0 },
//             };
//             return (
//               <motion.div
//                 variants={sequenceVariants} initial="hidden" animate={sectionRefs[19][1] ? "visible" : "hidden"}
//                 className="flex flex-col space-y-2"
//               >
//                 <motion.div variants={childVariants} className="w-24 h-8 bg-gray-600 rounded"></motion.div>
//                 <motion.div variants={childVariants} className="w-24 h-8 bg-gray-600 rounded"></motion.div>
//                 <motion.div variants={childVariants} className="w-24 h-8 bg-gray-600 rounded"></motion.div>
//               </motion.div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 21. Parallel Animations (Multiple properties at once) */}
//       <motion.section
//         ref={sectionRefs[20][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[20][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="21. Parallel Animations"
//           description="Animate multiple properties (e.g., x, y, scale, rotate) simultaneously for complex, fluid movements."
//           codeSnippet={`
// <motion.div
//   animate={{ x: 50, y: -50, scale: 1.2, rotate: 360 }}
//   transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
//   className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-semibold"
// >
//   Parallel
// </motion.div>
//           `}
//         >
//           <motion.div
//             animate={{ x: 50, y: -50, scale: 1.2, rotate: 360 }}
//             transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
//             className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-semibold"
//           >
//             Parallel
//           </motion.div>
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 22. Exit Animation (Item removal from a list) */}
//       <motion.section
//         ref={sectionRefs[21][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[21][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="22. Exit Animation (List Item Removal)"
//           description="Elements animate out gracefully when they are removed from the DOM, requiring AnimatePresence."
//           codeSnippet={`
// const [listItems, setListItems] = useState([0, 1, 2]);
// const removeItem = (item) => setListItems(listItems.filter((i) => i !== item));
// const addMoreItems = () => setListItems((prev) => [...prev, prev.length]);

// const exitItemVariants = {
//   initial: { opacity: 0, x: -100 },
//   animate: { opacity: 1, x: 0 },
//   exit: { opacity: 0, x: 100, transition: { duration: 0.3 } },
// };

// <div className="flex flex-col items-center">
//   <AnimatePresence>
//     {listItems.map((item) => (
//       <motion.div
//         key={item} variants={exitItemVariants} initial="initial" animate="animate" exit="exit"
//         onClick={() => removeItem(item)}
//         className="w-48 bg-gray-700 text-white p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-600"
//       >
//         Item {item} (Click to remove)
//       </motion.div>
//     ))}
//   </AnimatePresence>
//   <button onClick={addMoreItems} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Add Item</button>
// </div>
//           `}
//         >
//           <div className="flex flex-col items-center">
//             <AnimatePresence>
//               {listItems.map((item) => (
//                 <motion.div
//                   key={item}
//                   variants={exitItemVariants}
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   onClick={() => removeItem(item)}
//                   className="w-48 bg-gray-700 text-white p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-600"
//                 >
//                   Item {item} (Click to remove)
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             <button onClick={addMoreItems} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Add Item</button>
//           </div>
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 23. Custom Props with Variants */}
//       <motion.section
//         ref={sectionRefs[22][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[22][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="23. Custom Props with Variants"
//           description="Pass custom data to variants to create flexible and reusable animation logic based on context."
//           codeSnippet={`
// const customVariants = {
//   initial: (i) => ({ opacity: 0, x: i * 50 }),
//   animate: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1 } }),
// };
// <div className="flex space-x-4">
//   {[0, 1, 2].map((i) => (
//     <motion.div
//       key={i} custom={i} variants={customVariants} initial="initial" animate={inView23 ? "animate" : "initial"}
//       className="w-24 h-24 bg-gradient-to-br from-red-400 to-orange-400 rounded-lg flex items-center justify-center text-white font-semibold"
//     >
//       {i}
//     </motion.div>
//   ))}
// </div>
//           `}
//         >
//           {(() => {
//             const customVariants = {
//               initial: (i) => ({ opacity: 0, x: i * 50 }),
//               animate: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1 } }),
//             };
//             return (
//               <div className="flex space-x-4">
//                 {[0, 1, 2].map((i) => (
//                   <motion.div
//                     key={i} custom={i} variants={customVariants} initial="initial" animate={sectionRefs[22][1] ? "animate" : "initial"}
//                     className="w-24 h-24 bg-gradient-to-br from-red-400 to-orange-400 rounded-lg flex items-center justify-center text-white font-semibold"
//                   >
//                     {i}
//                   </motion.div>
//                 ))}
//               </div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* --- Category 5: Layout & Scroll Effects (8 Animations) --- */}

//       {/* 24. Layout Animation (Auto-animate size/position changes) */}
//       <motion.section
//         ref={sectionRefs[23][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[23][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="24. Layout Animation (Auto-animate)"
//           description="Automatically animate changes in an element's size and position when its layout changes, using the 'layout' prop."
//           codeSnippet={`
// const [isTall, setIsTall] = useState(false);
// <motion.div
//   layout // Enables automatic animation of layout changes
//   onClick={() => setIsTall(!isTall)}
//   className={\`bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-lg cursor-pointer flex items-center justify-center text-white font-semibold \${isTall ? 'w-48 h-64' : 'w-32 h-32'}\`}
// >
//   Click Me
// </motion.div>
//           `}
//         >
//           {(() => {
//             const [isTall, setIsTall] = useState(false);
//             return (
//               <motion.div
//                 layout // Enables automatic animation of layout changes
//                 onClick={() => setIsTall(!isTall)}
//                 className={`bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-lg cursor-pointer flex items-center justify-center text-white font-semibold ${isTall ? 'w-48 h-64' : 'w-32 h-32'}`}
//               >
//                 Click Me
//               </motion.div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 25. Shared Layout Transition (Morphing shape) */}
//       <motion.section
//         ref={sectionRefs[24][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[24][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="25. Shared Layout (Morphing Shape)"
//           description="An element smoothly morphs its shape and position when its layout changes, creating a fluid transition."
//           codeSnippet={`
// const [isRound, setIsRound] = useState(false);
// <motion.div
//   layout // Enables automatic layout animation
//   onClick={() => setIsRound(!isRound)}
//   className={\`bg-gradient-to-br from-green-500 to-teal-500 shadow-lg cursor-pointer flex items-center justify-center text-white font-semibold w-32 h-32 \${isRound ? 'rounded-full' : 'rounded-lg'}\`}
// >
//   Click Me
// </motion.div>
//           `}
//         >
//           {(() => {
//             const [isRound, setIsRound] = useState(false);
//             return (
//               <motion.div
//                 layout // Enables automatic layout animation
//                 onClick={() => setIsRound(!isRound)}
//                 className={`bg-gradient-to-br from-green-500 to-teal-500 shadow-lg cursor-pointer flex items-center justify-center text-white font-semibold w-32 h-32 ${isRound ? 'rounded-full' : 'rounded-lg'}`}
//               >
//                 Click Me
//               </motion.div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 26. Layout Transition (Customizing layout animation properties) */}
//       <motion.section
//         ref={sectionRefs[25][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[25][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="26. Layout Transition (Custom)"
//           description="Customize the duration and type of layout animations for fine-grained control over transitions."
//           codeSnippet={`
// const [isMoved, setIsMoved] = useState(false);
// <motion.div
//   layout transition={{ duration: 1, type: "tween", ease: "easeInOut" }}
//   onClick={() => setIsMoved(!isMoved)}
//   className={\`bg-gradient-to-br from-red-500 to-orange-500 rounded-lg shadow-lg cursor-pointer w-32 h-32 flex items-center justify-center text-white font-semibold \${isMoved ? 'ml-32' : ''}\`}
// >
//   Click Me
// </motion.div>
//           `}
//         >
//           {(() => {
//             const [isMoved, setIsMoved] = useState(false);
//             return (
//               <motion.div
//                 layout transition={{ duration: 1, type: "tween", ease: "easeInOut" }}
//                 onClick={() => setIsMoved(!isMoved)}
//                 className={`bg-gradient-to-br from-red-500 to-orange-500 rounded-lg shadow-lg cursor-pointer w-32 h-32 flex items-center justify-center text-white font-semibold ${isMoved ? 'ml-32' : ''}`}
//               >
//                 Click Me
//               </motion.div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 27. Scroll-linked Opacity (using useScroll and useTransform) */}
//       <motion.section
//         ref={sectionRefs[26][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[26][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="27. Scroll-linked Opacity"
//           description="An element's opacity changes dynamically as the user scrolls, creating a fade effect tied to scroll progress."
//           codeSnippet={`
// // This example uses scrollYProgress from useScroll()
// // and useTransform() to map scroll progress to opacity.
// // The component is then styled with style={{ opacity: scrollOpacity }}.
//           `}
//         >
//           {(() => {
//             const { scrollYProgress } = useScroll();
//             const scrollOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]); // Adjust input range based on where you want it to animate

//             return (
//               <motion.div
//                 style={{ opacity: scrollOpacity }}
//                 className="w-full h-48 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl shadow-lg flex items-center justify-center text-white text-2xl font-bold"
//               >
//                 Scroll to Fade
//               </motion.div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 28. Scroll-linked Progress Bar */}
//       <motion.section
//         ref={sectionRefs[27][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[27][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="28. Scroll-linked Progress Bar"
//           description="A progress bar that fills up dynamically as the user scrolls down the page, indicating scroll progress."
//           codeSnippet={`
// // This example uses scrollYProgress from useScroll()
// // and useTransform() to map scroll progress to scaleX.
// // The progress bar is then styled with style={{ scaleX }}.
//           `}
//         >
//           {(() => {
//             const { scrollYProgress } = useScroll();
//             const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]); // Maps 0-1 scroll to 0-1 scale

//             return (
//               <div className="w-full bg-gray-700 rounded-full h-4">
//                 <motion.div
//                   style={{ scaleX, originX: 0 }} // originX: 0 makes it scale from left
//                   className="h-full bg-blue-500 rounded-full"
//                 />
//               </div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 29. Parallax Effect (Element moves slower on scroll) */}
//       <motion.section
//         ref={sectionRefs[28][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[28][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="29. Parallax Effect"
//           description="An element moves at a different speed than the scroll, creating a subtle depth illusion (parallax)."
//           codeSnippet={`
// // This example uses scrollYProgress from useScroll()
// // and useTransform() to map scroll progress to a negative Y translation.
// // The element moves up slower than the scroll.
//           `}
//         >
//           {(() => {
//             const { scrollYProgress } = useScroll();
//             const scrollParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]); // Moves up 50% of its height

//             return (
//               <div className="relative w-full h-48 bg-gray-700 rounded-lg overflow-hidden">
//                 <motion.div
//                   style={{ y: scrollParallaxY }}
//                   className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold"
//                 >
//                   Parallax Background
//                 </motion.div>
//                 <div className="relative z-10 flex items-center justify-center h-full text-white text-xl">
//                   Foreground Content
//                 </div>
//               </div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 30. Scroll-linked Rotation */}
//       <motion.section
//         ref={sectionRefs[29][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[29][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="30. Scroll-linked Rotation"
//           description="An element rotates continuously as the user scrolls down the page, adding dynamic visual interest."
//           codeSnippet={`
// // This example uses scrollYProgress from useScroll()
// // and useTransform() to map scroll progress to a rotation value.
//           `}
//         >
//           {(() => {
//             const { scrollYProgress } = useScroll();
//             const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 360 * 5]); // Rotates 5 full turns

//             return (
//               <motion.div
//                 style={{ rotate: scrollRotate }}
//                 className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-lime-500 rounded-xl shadow-lg flex items-center justify-center text-white text-xl font-bold"
//               >
//                 Rotate!
//               </motion.div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* --- Category 6: Advanced Interactions & UI Patterns (5+ Animations) --- */}

//       {/* 31. Accordion/Expandable Section */}
//       <motion.section
//         ref={sectionRefs[30][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[30][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="31. Accordion/Expandable Section"
//           description="Animate the expansion and collapse of content sections using Framer Motion's height animation."
//           codeSnippet={`
// const [isExpanded, setIsExpanded] = useState(false);
// const accordionVariants = {
//   open: { opacity: 1, height: "auto" },
//   closed: { opacity: 0, height: 0 },
// };
// <div className="w-full">
//   <button
//     onClick={() => setIsExpanded(!isExpanded)}
//     className="w-full bg-gray-700 text-white p-4 rounded-t-lg font-semibold hover:bg-gray-600 transition-colors"
//   >
//     Toggle Content
//   </button>
//   <AnimatePresence>
//     {isExpanded && (
//       <motion.div
//         variants={accordionVariants}
//         initial="closed"
//         animate="open"
//         exit="closed"
//         className="bg-gray-900 text-gray-300 p-4 rounded-b-lg overflow-hidden"
//       >
//         <p>This is the content that expands and collapses smoothly.</p>
//         <p className="mt-2">Framer Motion handles height animations beautifully.</p>
//       </motion.div>
//     )}
//   </AnimatePresence>
// </div>
//           `}
//         >
//           {(() => {
//             const accordionVariants = {
//               open: { opacity: 1, height: "auto" },
//               closed: { opacity: 0, height: 0 },
//             };
//             return (
//               <div className="w-full">
//                 <button
//                   onClick={() => setIsExpanded(!isExpanded)}
//                   className="w-full bg-gray-700 text-white p-4 rounded-t-lg font-semibold hover:bg-gray-600 transition-colors"
//                 >
//                   Toggle Content
//                 </button>
//                 <AnimatePresence>
//                   {isExpanded && (
//                     <motion.div
//                       variants={accordionVariants}
//                       initial="closed"
//                       animate="open"
//                       exit="closed"
//                       className="bg-gray-900 text-gray-300 p-4 rounded-b-lg overflow-hidden"
//                     >
//                       <p>This is the content that expands and collapses smoothly.</p>
//                       <p className="mt-2">Framer Motion handles height animations beautifully.</p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 32. Menu Icon Animation (Hamburger to X) */}
//       <motion.section
//         ref={sectionRefs[31][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[31][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="32. Menu Icon Animation (Hamburger to X)"
//           description="Transform a hamburger icon into a close icon with a smooth, visually appealing animation."
//           codeSnippet={`
// const [isMenuOpen, setIsMenuOpen] = useState(false);
// const menuVariants = {
//   open: { rotate: 90, scale: 1.2 },
//   closed: { rotate: 0, scale: 1 },
// };
// <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
//   <motion.div
//     variants={menuVariants}
//     animate={isMenuOpen ? "open" : "closed"}
//     className="w-8 h-8 flex flex-col justify-around items-center"
//   >
//     <span className="block w-6 h-0.5 bg-white rounded"></span>
//     <span className="block w-6 h-0.5 bg-white rounded"></span>
//     <span className="block w-6 h-0.5 bg-white rounded"></span>
//   </motion.div>
// </button>
//           `}
//         >
//           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
//             <motion.div
//               variants={menuVariants}
//               animate={isMenuOpen ? "open" : "closed"}
//               className="w-8 h-8 flex flex-col justify-around items-center"
//             >
//               <span className="block w-6 h-0.5 bg-white rounded"></span>
//               <span className="block w-6 h-0.5 bg-white rounded"></span>
//               <span className="block w-6 h-0.5 bg-white rounded"></span>
//             </motion.div>
//           </button>
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 33. Card Flip (RotateY) */}
//       <motion.section
//         ref={sectionRefs[32][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[32][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="33. Card Flip (RotateY)"
//           description="Animate a card flipping on its Y-axis to reveal its back side, creating a dynamic content transition."
//           codeSnippet={`
// const [cardFlip, setCardFlip] = useState(false);
// const flipVariants = {
//   front: { rotateY: 0 },
//   back: { rotateY: 180 },
// };
// <motion.div
//   onClick={() => setCardFlip(!cardFlip)}
//   variants={flipVariants}
//   animate={cardFlip ? "back" : "front"}
//   transition={{ duration: 0.8 }}
//   className="relative w-48 h-64 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl shadow-lg cursor-pointer preserve-3d"
//   style={{ transformStyle: "preserve-3d" }} // Important for 3D flip
// >
//   <div className="absolute inset-0 backface-hidden flex items-center justify-center text-white text-2xl font-bold">
//     Front
//   </div>
//   <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center text-white text-2xl font-bold">
//     Back
//   </div>
// </motion.div>
// // You'll need additional global CSS for .preserve-3d, .backface-hidden, .rotate-y-180 (see index.css)
//           `}
//         >
//           {(() => {
//             const flipVariants = {
//               front: { rotateY: 0 },
//               back: { rotateY: 180 },
//             };
//             return (
//               <motion.div
//                 onClick={() => setCardFlip(!cardFlip)}
//                 variants={flipVariants}
//                 animate={cardFlip ? "back" : "front"}
//                 transition={{ duration: 0.8 }}
//                 className="relative w-48 h-64 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl shadow-lg cursor-pointer"
//                 style={{ transformStyle: "preserve-3d" }} // Important for 3D flip
//               >
//                 <div className="absolute inset-0 backface-hidden flex items-center justify-center text-white text-2xl font-bold">
//                   Front
//                 </div>
//                 <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center text-white text-2xl font-bold">
//                   Back
//                 </div>
//               </motion.div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 34. Drag with Momentum (Fling) */}
//       <motion.section
//         ref={sectionRefs[33][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[33][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="34. Drag with Momentum (Fling)"
//           description="A draggable element that continues to move after being released, simulating real-world momentum."
//           codeSnippet={`
// <motion.div
//   drag
//   dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
//   className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
// >
//   Fling Me
// </motion.div>
//           `}
//         >
//           <motion.div
//             drag
//             dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
//             className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
//           >
//             Fling Me
//           </motion.div>
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 35. Path Animation (SVG Line Drawing) */}
//       <motion.section
//         ref={sectionRefs[34][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[34][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="35. Path Animation (SVG Line Drawing)"
//           description="Animate the drawing of an SVG path, creating a dynamic and engaging visual effect."
//           codeSnippet={`
// <svg width="100" height="100" viewBox="0 0 100 100" className="stroke-blue-400 stroke-2 fill-none">
//   <motion.path
//     d="M20,20 L80,20 L80,80 L20,80 L20,20" // A square path
//     initial={{ pathLength: 0 }}
//     animate={{ pathLength: 1 }}
//     transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
//   />
// </svg>
//           `}
//         >
//           <svg width="100" height="100" viewBox="0 0 100 100" className="stroke-blue-400 stroke-2 fill-none">
//             <motion.path
//               d="M20,20 L80,20 L80,80 L20,80 L20,20" // A square path
//               initial={{ pathLength: 0 }}
//               animate={{ pathLength: 1 }}
//               transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
//             />
//           </svg>
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 36. Animate Presence with Fade & Scale */}
//       <motion.section
//         ref={sectionRefs[35][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[35][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="36. Animate Presence (Fade & Scale)"
//           description="Animate elements smoothly when they are added or removed from the DOM, using AnimatePresence."
//           codeSnippet={`
// const [isVisible, setIsVisible] = useState(true);
// <div className="flex flex-col items-center">
//   <button onClick={() => setIsVisible(!isVisible)} className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4">
//     Toggle Element
//   </button>
//   <AnimatePresence>
//     {isVisible && (
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.8 }}
//         transition={{ duration: 0.3 }}
//         className="w-48 h-32 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg shadow-lg flex items-center justify-center text-white font-semibold"
//       >
//         I Appear/Disappear!
//       </motion.div>
//     )}
//   </AnimatePresence>
// </div>
//           `}
//         >
//           {(() => {
//             const [isVisible, setIsVisible] = useState(true);
//             return (
//               <div className="flex flex-col items-center">
//                 <button onClick={() => setIsVisible(!isVisible)} className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4">
//                   Toggle Element
//                 </button>
//                 <AnimatePresence>
//                   {isVisible && (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.8 }}
//                       transition={{ duration: 0.3 }}
//                       className="w-48 h-32 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg shadow-lg flex items-center justify-center text-white font-semibold"
//                     >
//                       I Appear/Disappear!
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 37. Drag with Bounds (using pixels) */}
//       <motion.section
//         ref={sectionRefs[36][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[36][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="37. Drag with Bounds (Pixels)"
//           description="Confine a draggable element to specific pixel boundaries, useful for custom sliders or limited drag areas."
//           codeSnippet={`
// <motion.div
//   drag dragConstraints={{ left: -50, right: 50, top: -20, bottom: 20 }}
//   className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-lime-500 rounded-xl shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
// >
//   Bounded Drag
// </motion.div>
//           `}
//         >
//           <motion.div
//             drag dragConstraints={{ left: -50, right: 50, top: -20, bottom: 20 }}
//             className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-lime-500 rounded-xl shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
//           >
//             Bounded Drag
//           </motion.div>
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 38. Scroll-linked Parallax Background */}
//       <motion.section
//         ref={sectionRefs[37][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[37][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="38. Scroll-linked Parallax Background"
//           description="Create a classic parallax effect where a background element scrolls slower than the foreground content."
//           codeSnippet={`
// // This requires a parent element with overflow-hidden and relative positioning
// // and the background element using useTransform for its Y position.
// // Example:
// // <div className="relative h-64 overflow-hidden">
// //   <motion.div style={{ y: backgroundY }} className="absolute inset-0 bg-cover bg-center" />
// //   <div className="relative z-10">Foreground content</div>
// // </div>
//           `}
//         >
//           {(() => {
//             const { scrollYProgress } = useScroll();
//             const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // Background moves 50% slower

//             return (
//               <div className="relative w-full h-48 overflow-hidden rounded-lg shadow-lg">
//                 <motion.div
//                   style={{ y: backgroundY }}
//                   className="absolute inset-0 bg-cover bg-center"
//                   // Placeholder image for demo (using a gradient for visual representation)
//                   animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
//                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//                   style={{ backgroundImage: `linear-gradient(45deg, #334155, #1e293b, #334155)` }}
//                 />
//                 <div className="relative z-10 flex items-center justify-center h-full text-white text-xl bg-black bg-opacity-50">
//                   Scroll for Parallax
//                 </div>
//               </div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 39. Scroll-linked Sticky Header (with opacity/transform) */}
//       <motion.section
//         ref={sectionRefs[38][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[38][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="39. Scroll-linked Sticky Header"
//           description="A header that changes its appearance (e.g., shrinks, changes opacity) as the user scrolls down the page."
//           codeSnippet={`
// // This typically involves a fixed header component
// // that uses useScroll and useTransform to animate its properties.
// // Example:
// // const { scrollY } = useScroll();
// // const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.5]);
// // const headerHeight = useTransform(scrollY, [0, 100], [80, 50]);
// // <motion.header style={{ opacity: headerOpacity, height: headerHeight }} />
//           `}
//         >
//           {(() => {
//             // This is a simplified demo within the card
//             const { scrollYProgress } = useScroll();
//             const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
//             const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.5]);

//             return (
//               <motion.div
//                 style={{ scale: headerScale, opacity: headerOpacity, originY: 0 }}
//                 className="w-full bg-blue-600 text-white p-4 text-center font-bold rounded-lg shadow-lg"
//               >
//                 Sticky Header Demo
//               </motion.div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 40. Custom Cursor Animation (Follows mouse) */}
//       <motion.section
//         ref={sectionRefs[39][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[39][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="40. Custom Cursor Animation"
//           description="A custom element that follows the mouse cursor, adding a unique interactive touch to the page."
//           codeSnippet={`
// // This requires a global component usually in App.jsx or main.jsx
// // and event listeners for mousemove.
// // Example:
// // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
// // useEffect(() => {
// //   const updateMousePosition = (e) => { setMousePosition({ x: e.clientX, y: e.clientY }); };
// //   window.addEventListener("mousemove", updateMousePosition);
// //   return () => window.removeEventListener("mousemove", updateMousePosition);
// // }, []);
// // <motion.div
// //   animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
// //   transition={{ type: "spring", stiffness: 100, damping: 10 }}
// //   className="fixed w-6 h-6 bg-blue-400 rounded-full pointer-events-none z-50"
// // />
//           `}
//         >
//           {(() => {
//             // This demo will simulate the cursor movement within the card for demonstration
//             const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//             const cardRef = useRef(null);

//             const handleMouseMove = (e) => {
//               if (cardRef.current) {
//                 const rect = cardRef.current.getBoundingClientRect();
//                 setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
//               }
//             };

//             return (
//               <div
//                 ref={cardRef}
//                 onMouseMove={handleMouseMove}
//                 className="relative w-full h-48 bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center text-gray-400 text-lg"
//               >
//                 Move mouse here
//                 <motion.div
//                   animate={{ x: mousePos.x - 12, y: mousePos.y - 12 }}
//                   transition={{ type: "spring", stiffness: 100, damping: 10 }}
//                   className="absolute w-6 h-6 bg-blue-400 rounded-full pointer-events-none"
//                 />
//               </div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 41. Text Highlight on Hover */}
//       <motion.section
//         ref={sectionRefs[40][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[40][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="41. Text Highlight on Hover"
//           description="Individual words or phrases highlight with an animated background on hover."
//           codeSnippet={`
// const highlightVariants = {
//   rest: { backgroundColor: "rgba(0,0,0,0)" },
//   hover: { backgroundColor: "rgba(96, 165, 250, 0.2)" }, // blue-400 with opacity
// };
// <p className="text-xl text-white">
//   This is a <motion.span variants={highlightVariants} initial="rest" whileHover="hover" className="rounded px-1 cursor-pointer">highlighted</motion.span> word.
// </p>
//           `}
//         >
//           {(() => {
//             const highlightVariants = {
//               rest: { backgroundColor: "rgba(0,0,0,0)" },
//               hover: { backgroundColor: "rgba(96, 165, 250, 0.2)" }, // blue-400 with opacity
//             };
//             return (
//               <p className="text-xl text-white">
//                 This is a <motion.span variants={highlightVariants} initial="rest" whileHover="hover" className="rounded px-1 cursor-pointer">highlighted</motion.span> word.
//               </p>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 42. Pop-up Modal with AnimatePresence */}
//       <motion.section
//         ref={sectionRefs[41][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[41][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="42. Pop-up Modal"
//           description="A modal window that fades in and out with a subtle scale animation, using AnimatePresence for smooth entry/exit."
//           codeSnippet={`
// const [showModal, setShowModal] = useState(false);
// const modalVariants = {
//   hidden: { opacity: 0, scale: 0.75 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
//   exit: { opacity: 0, scale: 0.75, transition: { duration: 0.15 } },
// };
// <div className="flex flex-col items-center">
//   <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4">
//     Open Modal
//   </button>
//   <AnimatePresence>
//     {showModal && (
//       <motion.div
//         variants={modalVariants} initial="hidden" animate="visible" exit="exit"
//         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//       >
//         <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center">
//           <h3 className="text-2xl font-bold mb-4">Modal Title</h3>
//           <p className="text-gray-300 mb-6">This is a smoothly animated modal!</p>
//           <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-red-500 text-white rounded-lg">
//             Close
//           </button>
//         </div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// </div>
//           `}
//         >
//           {(() => {
//             const [showModal, setShowModal] = useState(false);
//             const modalVariants = {
//               hidden: { opacity: 0, scale: 0.75 },
//               visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
//               exit: { opacity: 0, scale: 0.75, transition: { duration: 0.15 } },
//             };
//             return (
//               <div className="flex flex-col items-center">
//                 <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4">
//                   Open Modal
//                 </button>
//                 <AnimatePresence>
//                   {showModal && (
//                     <motion.div
//                       variants={modalVariants} initial="hidden" animate="visible" exit="exit"
//                       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//                     >
//                       <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center">
//                         <h3 className="text-2xl font-bold mb-4">Modal Title</h3>
//                         <p className="text-gray-300 mb-6">This is a smoothly animated modal!</p>
//                         <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-red-500 text-white rounded-lg">
//                           Close
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 43. Confetti Burst on Click */}
//       <motion.section
//         ref={sectionRefs[42][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[42][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="43. Confetti Burst on Click"
//           description="Simulate a confetti burst animation on click, adding a celebratory visual effect."
//           codeSnippet={`
// // This involves creating many small animated divs on click.
// // For a simple demo, we can animate a single element to simulate a burst.
// const [burst, setBurst] = useState(false);
// <motion.div
//   onClick={() => setBurst(true)}
//   onAnimationComplete={() => setBurst(false)} // Reset after animation
//   animate={burst ? { scale: [1, 2, 0], opacity: [1, 0.5, 0] } : {}}
//   transition={{ duration: 0.5 }}
//   className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-lg cursor-pointer flex items-center justify-center text-white font-bold"
// >
//   Click for Burst!
// </motion.div>
//           `}
//         >
//           {(() => {
//             const [burst, setBurst] = useState(false);
//             return (
//               <motion.div
//                 onClick={() => setBurst(true)}
//                 onAnimationComplete={() => setBurst(false)} // Reset after animation
//                 animate={burst ? { scale: [1, 2, 0], opacity: [1, 0.5, 0] } : {}}
//                 transition={{ duration: 0.5 }}
//                 className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-lg cursor-pointer flex items-center justify-center text-white font-bold"
//               >
//                 Click for Burst!
//               </motion.div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 44. Typing Text Animation */}
//       <motion.section
//         ref={sectionRefs[43][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[43][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="44. Typing Text Animation"
//           description="Text appears as if being typed out, character by character, creating an engaging entrance."
//           codeSnippet={`
// const text = "This text is typing...";
// <motion.p
//   initial={{ width: 0 }}
//   animate={{ width: "100%" }}
//   transition={{ duration: 2, ease: "linear", delay: 0.5 }}
//   className="overflow-hidden whitespace-nowrap border-r-2 border-white pr-1 text-xl font-mono text-white"
// >
//   {text}
// </motion.p>
//           `}
//         >
//           {(() => {
//             const text = "This text is typing...";
//             return (
//               <motion.p
//                 initial={{ width: 0 }}
//                 animate={{ width: "100%" }}
//                 transition={{ duration: 2, ease: "linear", delay: 0.5 }}
//                 className="overflow-hidden whitespace-nowrap border-r-2 border-white pr-1 text-xl font-mono text-white"
//               >
//                 {text}
//               </motion.p>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* 45. Card Flip with Content Change */}
//       <motion.section
//         ref={sectionRefs[44][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[44][1] ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
//       >
//         <AnimationDescriptionCard
//           title="45. Card Flip with Content Change"
//           description="A card flips to reveal new content on its back side, demonstrating complex 3D transforms and content switching."
//           codeSnippet={`
// const [cardFlip, setCardFlip] = useState(false);
// const flipVariants = {
//   front: { rotateY: 0 },
//   back: { rotateY: 180 },
// };
// <motion.div
//   onClick={() => setCardFlip(!cardFlip)}
//   variants={flipVariants}
//   animate={cardFlip ? "back" : "front"}
//   transition={{ duration: 0.8 }}
//   className="relative w-48 h-64 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl shadow-lg cursor-pointer preserve-3d"
//   style={{ transformStyle: "preserve-3d" }}
// >
//   <div className="absolute inset-0 backface-hidden flex items-center justify-center text-white text-2xl font-bold">
//     Front Content
//   </div>
//   <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center text-white text-2xl font-bold">
//     Back Content
//   </div>
// </motion.div>
// // Add global CSS for .preserve-3d, .backface-hidden, .rotate-y-180 (see index.css)
//           `}
//         >
//           {(() => {
//             const flipVariants = {
//               front: { rotateY: 0 },
//               back: { rotateY: 180 },
//             };
//             return (
//               <motion.div
//                 onClick={() => setCardFlip(!cardFlip)}
//                 variants={flipVariants}
//                 animate={cardFlip ? "back" : "front"}
//                 transition={{ duration: 0.8 }}
//                 className="relative w-48 h-64 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl shadow-lg cursor-pointer"
//                 style={{ transformStyle: "preserve-3d" }}
//               >
//                 <div className="absolute inset-0 backface-hidden flex items-center justify-center text-white text-2xl font-bold">
//                   Front Content
//                 </div>
//                 <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center text-white text-2xl font-bold">
//                   Back Content
//                 </div>
//               </motion.div>
//             );
//           })()}
//         </AnimationDescriptionCard>
//       </motion.section>

//       {/* --- NEW: About Me Section --- */}
//       {/* This section provides a personal touch and professional links */}
//       <AboutMe />

//       {/* --- Global CSS for 3D transforms (for Card Flip) --- */}
//       {/* This style block is critical for 3D transforms like card flips */}
//       {/* It defines utility classes that need to be globally available in index.css */}
//       <style>{`
//         /* Used for 3D transforms to ensure elements render correctly in 3D space */
//         .preserve-3d {
//           transform-style: preserve-3d;
//         }
//         /* Hides the back face of an element when it's rotated away from the viewer */
//         .backface-hidden {
//           backface-visibility: hidden;
//         }
//         /* Rotates an element 180 degrees around its Y-axis, effectively flipping it */
//         .rotate-y-180 {
//           transform: rotateY(180deg);
//         }
//       `}</style>

//     </div>
//   );
// };

// export default Home;













































// src/Home.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScroll, useTransform } from 'framer-motion';

// Import reusable components
import AnimationDescriptionCard from './components/AnimationDescriptionCard';
import Hover3DBall from './animation-demos/Hover3DBall'; 
import AboutMe from './components/AboutMe'; // AboutMe is now imported here for rendering

const Home = () => {
  // --- useInView hooks for each section (for scroll-triggered animations) ---
  // We use an array of useInView hooks to manage the visibility of each section.
  // Now expanded to 55 sections.
  const sectionRefs = Array.from({ length: 55 }, () => useInView({ triggerOnce: true, threshold: 0.1 }));

  // --- State for interactive animations (used in various sections below) ---
  const [toggleSwitch, setToggleSwitch] = useState(false); // For Toggle Switch animation
  const [listItems, setListItems] = useState([0, 1, 2]); // For Exit Animation demo
  // Functions to add/remove items from the list, triggering exit animations
  const removeItem = (item) => setListItems(listItems.filter((i) => i !== item));
  const addMoreItems = () => setListItems((prev) => [...prev, prev.length]);
  
  const [dynamicColor, setDynamicColor] = useState('red'); // For Dynamic Variants (changes color on click)
  const [focusedInput, setFocusedInput] = useState(false); // For Input Focus animation
  const constraintsRef = useRef(null); // Ref for draggable constraints (used in Draggable Box with Constraints)
  
  const [isTall, setIsTall] = useState(false); // For Layout Animation (changes height/width)
  const [isRound, setIsRound] = useState(false); // For Shared Layout (changes border radius)
  const [isMoved, setIsMoved] = useState(false); // For Layout Transition Custom (changes margin-left)
  
  const [isExpanded, setIsExpanded] = useState(false); // For Accordion/Expandable Section
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For Menu Icon Animation
  const [cardFlip, setCardFlip] = useState(false); // For Card Flip


  // --- Scroll-linked animations hooks (using framer-motion's useScroll & useTransform) ---
  const { scrollYProgress } = useScroll(); // Returns a MotionValue that tracks scroll progress (0 to 1) of the document.

  // These transforms are for the placeholder scroll animations at the very end
  // They are defined here but the actual elements are in their respective sections
  const scrollOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]); 
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 360 * 5]); // Rotates 5 full turns
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]); // For scroll progress bar
  const scrollParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]); // For parallax effect


  // --- Animation Variants (reusable animation definitions) ---

  // Variants for staggered text reveal (used in Animation #4)
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5, // Delay before the first child starts animating
        staggerChildren: 0.08, // Delay between each child's animation start
      },
    },
  };
  const letter = {
    hidden: { opacity: 0, y: 50 }, // Each letter starts invisible and 50px down
    visible: { opacity: 1, y: 0 }, // Each letter animates to visible and its original y position
  };

  // Variants for exit animation (used in Animation #22: List Item Removal)
  const exitItemVariants = {
    initial: { opacity: 0, x: -100 }, // Initial state for new items / when item appears
    animate: { opacity: 1, x: 0 },    // Target state when item is present
    exit: { opacity: 0, x: 100, transition: { duration: 0.3 } }, // State when item is removed
  };

  // Variants for custom props with variants (used in Animation #23)
  const customVariants = {
    initial: (i) => ({ opacity: 0, x: i * 50 }), // 'i' is the custom prop passed
    animate: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1 } }),
  };

  // Variants for simple variants (used in Animation #16)
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  // Variants for variant propagation (used in Animation #17)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Variants for keyframes variants (used in Animation #19)
  const keyframeVariants = {
    animate: {
      scale: [1, 1.2, 0.8, 1.1, 1],
      rotate: [0, 45, -45, 20, 0],
      borderRadius: ["20%", "50%", "20%", "50%", "20%"],
      transition: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 },
    },
  };

  // Variants for sequence with 'when' (used in Animation #20)
  const sequenceVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.2 },
    },
  };
  const sequenceChildVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Variants for accordion (used in Animation #31)
  const accordionVariants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };

  // Variants for menu icon (used in Animation #32)
  const menuVariants = {
    open: { rotate: 90, scale: 1.2 },
    closed: { rotate: 0, scale: 1 },
  };

  // Variants for card flip (used in Animation #33 & #45)
  const flipVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };


  return (
    <div className="container mx-auto px-4 py-16">
      {/* --- Category 1: Basic Appear & Loop (6 Animations) --- */}

      {/* 1. Interactive 3D Ball (Hover & Rotate) */}
      <motion.section
        ref={sectionRefs[0][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[0][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="1. Interactive 3D Ball (Hover & Rotate)"
          description="A mesmerizing 3D sphere that scales, rotates, and changes color on hover. This demonstrates Three.js integration with React Three Fiber, and manual animation via useFrame for complex 3D interactive effects."
          codeSnippet={`
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

const Sphere = React.forwardRef((props, ref) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();
  const targetScale = hovered ? 1.2 : 1;
  const targetColor = hovered ? new THREE.Color('#E94E77') : new THREE.Color('#4A90E2');

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      if (hovered) {
        meshRef.current.rotation.y += 0.02;
        meshRef.current.rotation.x += 0.01;
      } else {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.05);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.05);
      }
      meshRef.current.material.color.lerp(targetColor, 0.1);
    }
  });

  return (
    <mesh
      {...props} ref={(el) => { meshRef.current = el; if (typeof ref === 'function') ref(el); else if (ref) ref.current = el; }}
      onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color={hovered ? '#E94E77' : '#4A90E2'} />
    </mesh>
  );
});
const Hover3DBall = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }} className="w-full h-80 rounded-lg bg-gray-900">
      <ambientLight intensity={0.5} /><directionalLight position={[10, 10, 5]} intensity={1} /><pointLight position={[-10, -10, -10]} intensity={0.5} />
      <Sphere position={[0, 0, 0]} />
      <OrbitControls enableZoom={true} enablePan={false} />
      <Html position={[0, 2, 0]}><div className="text-white text-lg font-bold bg-black bg-opacity-50 px-3 py-1 rounded-md">Hover Me!</div></Html>
    </Canvas>
  );
};
export default Hover3DBall;
          `}
        >
          <Hover3DBall />
        </AnimationDescriptionCard>
      </motion.section>

      {/* 2. Basic Fade In & Slide Up */}
      <motion.section
        ref={sectionRefs[1][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[1][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="2. Basic Fade In & Slide Up"
          description="A simple yet elegant animation where an element fades in and slides up from the bottom as it enters the viewport."
          codeSnippet={`
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  className="w-48 h-48 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg flex items-center justify-center text-xl font-semibold text-white"
>
  Fade & Slide
</motion.div>
          `}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-48 h-48 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg flex items-center justify-center text-xl font-semibold text-white"
          >
            Fade & Slide
          </motion.div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 3. Rotate and Scale In */}
      <motion.section
        ref={sectionRefs[2][0]} initial={{ opacity: 0, scale: 0.5, rotate: -90 }} animate={sectionRefs[2][1] ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 1, type: "spring", damping: 10, stiffness: 100 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="3. Rotate and Scale In"
          description="An element spins and scales into its final position, using a spring transition for a lively effect."
          codeSnippet={`
<motion.div
  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
  animate={{ opacity: 1, scale: 1, rotate: 0 }}
  transition={{ duration: 1, type: "spring", damping: 10, stiffness: 100 }}
  className="w-48 h-48 bg-gradient-to-br from-pink-500 to-red-500 rounded-full shadow-lg flex items-center justify-center text-xl font-semibold text-white"
>
  Rotate & Scale
</motion.div>
          `}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="w-48 h-48 bg-gradient-to-br from-pink-500 to-red-500 rounded-full shadow-lg flex items-center justify-center text-xl font-semibold text-white"
          >
            Rotate & Scale
          </motion.div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 4. Staggered Text Reveal */}
      <motion.section
        ref={sectionRefs[3][0]} initial={{ opacity: 0, y: 50 }} animate={sectionRefs[3][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="4. Staggered Text Reveal"
          description="Individual letters or words appear one after another, creating a dynamic and engaging text entrance."
          codeSnippet={`
const text = "Staggered Text Reveal!";
const sentence = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { delay: 0.5, staggerChildren: 0.08 } },
};
const letter = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

<motion.h3
  variants={sentence} initial="hidden" animate={inView4 ? "visible" : "hidden"}
  className="text-2xl font-bold text-white max-w-sm"
>
  {text.split("").map((char, index) => (
    <motion.span key={index} variants={letter}>{char}</motion.span>
  ))}
</motion.h3>
          `}
        >
          {(() => {
            const text = "Staggered Text Reveal!";
            const sentence = {
              hidden: { opacity: 1 },
              visible: { opacity: 1, transition: { delay: 0.5, staggerChildren: 0.08 } },
            };
            const letter = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };
            return (
              <motion.h3
                variants={sentence} initial="hidden" animate={sectionRefs[3][1] ? "visible" : "hidden"}
                className="text-2xl font-bold text-white max-w-sm"
              >
                {text.split("").map((char, index) => (
                  <motion.span key={index} variants={letter}>{char}</motion.span>
                ))}
              </motion.h3>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 5. Loop Animation (Bouncing Ball) */}
      <motion.section
        ref={sectionRefs[4][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[4][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="5. Loop Animation (Bouncing Ball)"
          description="A simple circle continuously bounces up and down, demonstrating the 'repeat' and 'repeatType' properties for endless animations."
          codeSnippet={`
<motion.div
  animate={{ y: ["0%", "100%", "0%"] }}
  transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
  className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg"
/>
          `}
        >
          <div className="w-full h-48 flex items-center justify-center">
            <motion.div
              animate={{ y: ["0%", "100%", "0%"] }}
              transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
              className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg"
            />
          </div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 6. Pulse on Mount (using repeatType: "mirror") */}
      <motion.section
        ref={sectionRefs[5][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[5][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="6. Pulse on Mount"
          description="An element gently pulses in size when it appears, creating a subtle attention-grabbing effect using 'repeatType: mirror'."
          codeSnippet={`
<motion.div
  animate={{ scale: [1, 1.05, 1] }}
  transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
  className="w-32 h-32 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl shadow-lg flex items-center justify-center text-white font-semibold"
>
  Pulse
</motion.div>
          `}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            className="w-32 h-32 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl shadow-lg flex items-center justify-center text-white font-semibold"
          >
            Pulse
          </motion.div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* --- Category 2: Interaction (5 Animations) --- */}

      {/* 7. Button Hover Scale & Color */}
      <motion.section
        ref={sectionRefs[6][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[6][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="7. Button Hover Scale & Color"
          description="A button scales up and changes color smoothly when hovered over, providing clear visual feedback."
          codeSnippet={`
<motion.button
  whileHover={{ scale: 1.1, backgroundColor: "#3B82F6" }} // Tailwind blue-600
  whileTap={{ scale: 0.9 }}
  className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg font-semibold"
>
  Hover Me
</motion.button>
          `}
        >
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#3B82F6" }} // Tailwind blue-600
            whileTap={{ scale: 0.9 }}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg font-semibold"
          >
            Hover Me
          </motion.button>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 8. Button Tap Shrink & Bounce */}
      <motion.section
        ref={sectionRefs[7][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[7][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="8. Button Tap Shrink & Bounce"
          description="A button provides tactile feedback by shrinking slightly and then bouncing back on tap/click."
          codeSnippet={`
<motion.button
  whileTap={{ scale: 0.8, y: 5 }}
  transition={{ type: "spring", stiffness: 400, damping: 10 }}
  className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg font-semibold"
>
  Tap Me
</motion.button>
          `}
        >
          <motion.button
            whileTap={{ scale: 0.8, y: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg font-semibold"
          >
            Tap Me
          </motion.button>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 9. Card Hover Lift & Shadow */}
      <motion.section
        ref={sectionRefs[8][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[8][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="9. Card Hover Lift & Shadow"
          description="A card subtly lifts and its shadow expands on hover, adding depth and interactivity."
          codeSnippet={`
<motion.div
  whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
  className="w-64 h-40 bg-gray-700 rounded-xl shadow-md flex items-center justify-center text-white font-semibold"
>
  Hover Card
</motion.div>
          `}
        >
          <motion.div
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
            className="w-64 h-40 bg-gray-700 rounded-xl shadow-md flex items-center justify-center text-white font-semibold"
          >
            Hover Card
          </motion.div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 10. Input Focus Border & Label Transform */}
      <motion.section
        ref={sectionRefs[9][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[9][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="10. Input Focus Border & Label"
          description="An input field's border highlights and its label transforms on focus, providing clear visual cues."
          codeSnippet={`
const [focused, setFocused] = useState(false);
<div className="relative">
  <motion.label
    htmlFor="animated-input"
    initial={{ y: 0, fontSize: "1rem", color: "#9CA3AF" }}
    animate={focused ? { y: -24, fontSize: "0.875rem", color: "#60A5FA" } : {}}
    transition={{ duration: 0.2 }}
    className="absolute left-2 top-2 origin-top-left pointer-events-none"
  >
    Your Email
  </motion.label>
  <motion.input
    id="animated-input" type="email"
    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
    initial={{ borderColor: "#4B5563" }}
    animate={focused ? { borderColor: "#60A5FA", boxShadow: "0 0 0 3px rgba(96, 165, 250, 0.5)" } : {}}
    className="border-2 border-gray-600 rounded-lg p-2 pt-6 bg-gray-900 text-white outline-none"
  />
</div>
          `}
        >
          {(() => {
            // Use local state for this specific demo
            const [focused, setFocused] = useState(false);
            return (
              <div className="relative">
                <motion.label
                  htmlFor="animated-input"
                  initial={{ y: 0, fontSize: "1rem", color: "#9CA3AF" }} // gray-400
                  animate={focused ? { y: -24, fontSize: "0.875rem", color: "#60A5FA" } : {}} // blue-400
                  transition={{ duration: 0.2 }}
                  className="absolute left-2 top-2 origin-top-left pointer-events-none"
                >
                  Your Email
                </motion.label>
                <motion.input
                  id="animated-input"
                  type="email"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  initial={{ borderColor: "#4B5563" }} // gray-600
                  animate={focused ? { borderColor: "#60A5FA", boxShadow: "0 0 0 3px rgba(96, 165, 250, 0.5)" } : {}}
                  className="border-2 border-gray-600 rounded-lg p-2 pt-6 bg-gray-900 text-white outline-none"
                />
              </div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 11. Toggle Switch (Click to animate) */}
      <motion.section
        ref={sectionRefs[10][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[10][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="11. Toggle Switch"
          description="A visually appealing toggle switch that animates its state change on click, providing clear feedback."
          codeSnippet={`
const [toggleSwitch, setToggleSwitch] = useState(false);
<div
  onClick={() => setToggleSwitch(!toggleSwitch)}
  className={\`w-16 h-8 rounded-full flex items-center p-1 cursor-pointer \${toggleSwitch ? 'bg-blue-500' : 'bg-gray-600'}\`}
>
  <motion.div
    layout // Enables automatic animation of layout changes
    transition={{ type: "spring", stiffness: 700, damping: 30 }}
    className="w-6 h-6 bg-white rounded-full shadow-md"
    style={{ x: toggleSwitch ? "calc(100% + 4px)" : "0px" }} // Move the circle
  />
</div>
          `}
        >
          <div
            onClick={() => setToggleSwitch(!toggleSwitch)}
            className={`w-16 h-8 rounded-full flex items-center p-1 cursor-pointer ${toggleSwitch ? 'bg-blue-500' : 'bg-gray-600'}`}
          >
            <motion.div
              layout // Enables automatic animation of layout changes
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
              className="w-6 h-6 bg-white rounded-full shadow-md"
              style={{ x: toggleSwitch ? "calc(100% + 4px)" : "0px" }} // Move the circle
            />
          </div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* --- Category 3: Gestures (5 Animations) --- */}

      {/* 12. Draggable Box (Free Drag) */}
      <motion.section
        ref={sectionRefs[11][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[11][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="12. Draggable Box (Free Drag)"
          description="A simple box that can be freely dragged anywhere on the screen, demonstrating basic drag functionality."
          codeSnippet={`
<motion.div
  drag // Makes the element draggable
  className="w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
>
  Drag Me
</motion.div>
          `}
        >
          <motion.div
            drag // Makes the element draggable
            className="w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
          >
            Drag Me
          </motion.div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 13. Draggable Box with Constraints */}
      <motion.section
        ref={sectionRefs[12][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[12][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="13. Draggable Box with Constraints"
          description="A draggable box confined within a specific boundary, useful for sliders or limited movement areas."
          codeSnippet={`
const constraintsRef = useRef(null);
<div ref={constraintsRef} className="w-64 h-32 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
  <motion.div
    drag // Makes the element draggable
    dragConstraints={constraintsRef} // Confines drag to this parent ref
    className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg cursor-grab"
  />
</div>
          `}
        >
          <div ref={constraintsRef} className="w-64 h-32 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
            <motion.div
              drag // Makes the element draggable
              dragConstraints={constraintsRef} // Confines drag to this parent ref
              className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg cursor-grab"
            />
          </div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 14. Draggable Box with Snap to Origin */}
      <motion.section
        ref={sectionRefs[13][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[13][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="14. Draggable Box with Snap to Origin"
          description="A draggable element that snaps back to its original position when released, with elasticity."
          codeSnippet={`
<motion.div
  drag
  dragSnapToOrigin // Snaps back to origin on release
  dragElastic={0.5} // Adds elasticity when dragging
  className="w-24 h-24 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
>
  Snap
</motion.div>
          `}
        >
          <motion.div
            drag
            dragSnapToOrigin // Snaps back to origin on release
            dragElastic={0.5} // Adds elasticity when dragging
            className="w-24 h-24 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
          >
            Snap
          </motion.div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 15. Draggable Box with Custom Reset on Drag End */}
      <motion.section
        ref={sectionRefs[14][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[14][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="15. Draggable Box with Custom Reset"
          description="A draggable element that automatically returns to its original position after being released, with a custom spring animation."
          codeSnippet={`
const [x, setX] = useState(0);
const [y, setY] = useState(0);
<motion.div
  drag
  onDragEnd={() => { setX(0); setY(0); }} // Reset position on drag end
  animate={{ x, y }} // Animate to state-controlled position
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
>
  Reset
</motion.div>
          `}
        >
          {(() => {
            const [x, setX] = useState(0);
            const [y, setY] = useState(0);
            return (
              <motion.div
                drag
                onDragEnd={() => { setX(0); setY(0); }}
                animate={{ x, y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
              >
                Reset
              </motion.div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* --- Category 4: Variants & Orchestration (8 Animations) --- */}

      {/* 16. Simple Variants (Hidden/Visible Card) */}
      <motion.section
        ref={sectionRefs[15][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[15][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="16. Simple Variants (Hidden/Visible)"
          description="Define named animation states (variants) for easy control and reusability."
          codeSnippet={`
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
<motion.div
  variants={cardVariants}
  initial="hidden"
  animate={inView16 ? "visible" : "hidden"}
  className="w-64 h-40 bg-gray-700 rounded-xl shadow-lg flex items-center justify-center text-white font-semibold"
>
  Variant Card
</motion.div>
          `}
        >
          {(() => {
            const cardVariants = {
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            };
            return (
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate={sectionRefs[15][1] ? "visible" : "hidden"}
                className="w-64 h-40 bg-gray-700 rounded-xl shadow-lg flex items-center justify-center text-white font-semibold"
              >
                Variant Card
              </motion.div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 17. Variant Propagation (Staggered List Items) */}
      <motion.section
        ref={sectionRefs[16][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[16][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="17. Variant Propagation (Staggered List)"
          description="Parent variants can orchestrate animations of their children, creating elegant staggered effects."
          codeSnippet={`
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
<motion.ul
  variants={containerVariants} initial="hidden" animate={inView17 ? "visible" : "hidden"}
  className="list-disc list-inside text-gray-300"
>
  {[1, 2, 3].map((num) => (
    <motion.li key={num} variants={itemVariants} className="mb-2">
      Item {num}
    </motion.li>
  ))}
</motion.ul>
          `}
        >
          {(() => {
            const containerVariants = {
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            };
            const itemVariants = {
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            };
            return (
              <motion.ul
                variants={containerVariants} initial="hidden" animate={sectionRefs[16][1] ? "visible" : "hidden"}
                className="list-disc list-inside text-gray-300"
              >
                {[1, 2, 3].map((num) => (
                  <motion.li key={num} variants={itemVariants} className="mb-2">
                    Item {num}
                  </motion.li>
                ))}
              </motion.ul>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 18. Dynamic Variants (Color change based on prop/state) */}
      <motion.section
        ref={sectionRefs[17][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[17][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="18. Dynamic Variants"
          description="Variants can be dynamically selected based on component state or props, enabling conditional animations."
          codeSnippet={`
const [dynamicColor, setDynamicColor] = useState('red');
const colorVariants = {
  red: { backgroundColor: "#EF4444" }, // Tailwind red-500
  blue: { backgroundColor: "#3B82F6" }, // Tailwind blue-500
  green: { backgroundColor: "#22C55E" }, // Tailwind green-500
};
<motion.div
  variants={colorVariants}
  animate={dynamicColor}
  onClick={() => setDynamicColor(prev => (prev === 'red' ? 'blue' : prev === 'blue' ? 'green' : 'red'))}
  className="w-32 h-32 rounded-xl shadow-lg cursor-pointer flex items-center justify-center text-white font-semibold"
>
  Click Me
</motion.div>
          `}
        >
          {(() => {
            const colorVariants = {
              red: { backgroundColor: "#EF4444" },
              blue: { backgroundColor: "#3B82F6" },
              green: { backgroundColor: "#22C55E" },
            };
            return (
              <motion.div
                variants={colorVariants}
                animate={dynamicColor}
                onClick={() => setDynamicColor(prev => (prev === 'red' ? 'blue' : prev === 'blue' ? 'green' : 'red'))}
                className="w-32 h-32 rounded-xl shadow-lg cursor-pointer flex items-center justify-center text-white font-semibold"
              >
                Click Me
              </motion.div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 19. Keyframes Variants (Complex sequence) */}
      <motion.section
        ref={sectionRefs[18][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[18][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="19. Keyframes Variants"
          description="Define complex animation sequences with multiple steps within a single variant."
          codeSnippet={`
const keyframeVariants = {
  animate: {
    scale: [1, 1.2, 0.8, 1.1, 1], // Scale sequence
    rotate: [0, 45, -45, 20, 0], // Rotate sequence
    borderRadius: ["20%", "50%", "20%", "50%", "20%"], // Border radius sequence
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};
<motion.div
  variants={keyframeVariants}
  initial={{ scale: 1, rotate: 0, borderRadius: "20%" }}
  animate="animate"
  className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg flex items-center justify-center text-white font-semibold"
>
  Keyframes
</motion.div>
          `}
        >
          {(() => {
            const keyframeVariants = {
              animate: {
                scale: [1, 1.2, 0.8, 1.1, 1],
                rotate: [0, 45, -45, 20, 0],
                borderRadius: ["20%", "50%", "20%", "50%", "20%"],
                transition: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 },
              },
            };
            return (
              <motion.div
                variants={keyframeVariants}
                initial={{ scale: 1, rotate: 0, borderRadius: "20%" }}
                animate="animate"
                className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg flex items-center justify-center text-white font-semibold"
              >
                Keyframes
              </motion.div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 20. Sequence with When (Chained animations) */}
      <motion.section
        ref={sectionRefs[19][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[19][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="20. Sequence with 'When'"
          description="Orchestrate animations to play in a specific sequence using the 'when' property in variants."
          codeSnippet={`
const sequenceVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren", // Parent animates first
      staggerChildren: 0.2,
    },
  },
};
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
<motion.div
  variants={sequenceVariants} initial="hidden" animate={inView20 ? "visible" : "hidden"}
  className="flex flex-col space-y-2"
>
  <motion.div variants={childVariants} className="w-24 h-8 bg-gray-600 rounded"></motion.div>
  <motion.div variants={childVariants} className="w-24 h-8 bg-gray-600 rounded"></motion.div>
  <motion.div variants={childVariants} className="w-24 h-8 bg-gray-600 rounded"></motion.div>
</motion.div>
          `}
        >
          {(() => {
            const sequenceVariants = {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { when: "beforeChildren", staggerChildren: 0.2 },
              },
            };
            const childVariants = {
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            };
            return (
              <motion.div
                variants={sequenceVariants} initial="hidden" animate={sectionRefs[19][1] ? "visible" : "hidden"}
                className="flex flex-col space-y-2"
              >
                <motion.div variants={childVariants} className="w-24 h-8 bg-gray-600 rounded"></motion.div>
                <motion.div variants={childVariants} className="w-24 h-8 bg-gray-600 rounded"></motion.div>
                <motion.div variants={childVariants} className="w-24 h-8 bg-gray-600 rounded"></motion.div>
              </motion.div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 21. Parallel Animations (Multiple properties at once) */}
      <motion.section
        ref={sectionRefs[20][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[20][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="21. Parallel Animations"
          description="Animate multiple properties (e.g., x, y, scale, rotate) simultaneously for complex, fluid movements."
          codeSnippet={`
<motion.div
  animate={{ x: 50, y: -50, scale: 1.2, rotate: 360 }}
  transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
  className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-semibold"
>
  Parallel
</motion.div>
          `}
        >
          <motion.div
            animate={{ x: 50, y: -50, scale: 1.2, rotate: 360 }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-semibold"
          >
            Parallel
          </motion.div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 22. Exit Animation (Item removal from a list) */}
      <motion.section
        ref={sectionRefs[21][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[21][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="22. Exit Animation (List Item Removal)"
          description="Elements animate out gracefully when they are removed from the DOM, requiring AnimatePresence."
          codeSnippet={`
const [listItems, setListItems] = useState([0, 1, 2]);
const removeItem = (item) => setListItems(listItems.filter((i) => i !== item));
const addMoreItems = () => setListItems((prev) => [...prev, prev.length]);

const exitItemVariants = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100, transition: { duration: 0.3 } },
};

<div className="flex flex-col items-center">
  <AnimatePresence>
    {listItems.map((item) => (
      <motion.div
        key={item} variants={exitItemVariants} initial="initial" animate="animate" exit="exit"
        onClick={() => removeItem(item)}
        className="w-48 bg-gray-700 text-white p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-600"
      >
        Item {item} (Click to remove)
      </motion.div>
    ))}
  </AnimatePresence>
  <button onClick={addMoreItems} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Add Item</button>
</div>
          `}
        >
          <div className="flex flex-col items-center">
            <AnimatePresence>
              {listItems.map((item) => (
                <motion.div
                  key={item}
                  variants={exitItemVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  onClick={() => removeItem(item)}
                  className="w-48 bg-gray-700 text-white p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-600"
                >
                  Item {item} (Click to remove)
                </motion.div>
              ))}
            </AnimatePresence>
            <button onClick={addMoreItems} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Add Item</button>
          </div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 23. Custom Props with Variants */}
      <motion.section
        ref={sectionRefs[22][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[22][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="23. Custom Props with Variants"
          description="Pass custom data to variants to create flexible and reusable animation logic based on context."
          codeSnippet={`
const customVariants = {
  initial: (i) => ({ opacity: 0, x: i * 50 }),
  animate: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1 } }),
};
<div className="flex space-x-4">
  {[0, 1, 2].map((i) => (
    <motion.div
      key={i} custom={i} variants={customVariants} initial="initial" animate={inView23 ? "animate" : "initial"}
      className="w-24 h-24 bg-gradient-to-br from-red-400 to-orange-400 rounded-lg flex items-center justify-center text-white font-semibold"
    >
      {i}
    </motion.div>
  ))}
</div>
          `}
        >
          {(() => {
            const customVariants = {
              initial: (i) => ({ opacity: 0, x: i * 50 }),
              animate: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1 } }),
            };
            return (
              <div className="flex space-x-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i} custom={i} variants={customVariants} initial="hidden" animate={sectionRefs[22][1] ? "animate" : "hidden"}
                    className="w-24 h-24 bg-gradient-to-br from-red-400 to-orange-400 rounded-lg flex items-center justify-center text-white font-semibold"
                  >
                    {i}
                  </motion.div>
                ))}
              </div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* --- Category 5: Layout & Scroll Effects (8 Animations) --- */}

      {/* 24. Layout Animation (Auto-animate size/position changes) */}
      <motion.section
        ref={sectionRefs[23][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[23][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="24. Layout Animation (Auto-animate)"
          description="Automatically animate changes in an element's size and position when its layout changes, using the 'layout' prop."
          codeSnippet={`
const [isTall, setIsTall] = useState(false);
<motion.div
  layout // Enables automatic animation of layout changes
  onClick={() => setIsTall(!isTall)}
  className={\`bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-lg cursor-pointer flex items-center justify-center text-white font-semibold \${isTall ? 'w-48 h-64' : 'w-32 h-32'}\`}
>
  Click Me
</motion.div>
          `}
        >
          {(() => {
            const [isTall, setIsTall] = useState(false);
            return (
              <motion.div
                layout // Enables automatic animation of layout changes
                onClick={() => setIsTall(!isTall)}
                className={`bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-lg cursor-pointer flex items-center justify-center text-white font-semibold ${isTall ? 'w-48 h-64' : 'w-32 h-32'}`}
              >
                Click Me
              </motion.div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 25. Shared Layout Transition (Morphing shape) */}
      <motion.section
        ref={sectionRefs[24][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[24][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="25. Shared Layout (Morphing Shape)"
          description="An element smoothly morphs its shape and position when its layout changes, creating a fluid transition."
          codeSnippet={`
const [isRound, setIsRound] = useState(false);
<motion.div
  layout // Enables automatic layout animation
  onClick={() => setIsRound(!isRound)}
  className={\`bg-gradient-to-br from-green-500 to-teal-500 shadow-lg cursor-pointer flex items-center justify-center text-white font-semibold w-32 h-32 \${isRound ? 'rounded-full' : 'rounded-lg'}\`}
>
  Click Me
</motion.div>
          `}
        >
          {(() => {
            const [isRound, setIsRound] = useState(false);
            return (
              <motion.div
                layout // Enables automatic layout animation
                onClick={() => setIsRound(!isRound)}
                className={`bg-gradient-to-br from-green-500 to-teal-500 shadow-lg cursor-pointer flex items-center justify-center text-white font-semibold w-32 h-32 ${isRound ? 'rounded-full' : 'rounded-lg'}`}
              >
                Click Me
              </motion.div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 26. Layout Transition (Customizing layout animation properties) */}
      <motion.section
        ref={sectionRefs[25][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[25][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="26. Layout Transition (Custom)"
          description="Customize the duration and type of layout animations for fine-grained control over transitions."
          codeSnippet={`
const [isMoved, setIsMoved] = useState(false);
<motion.div
  layout transition={{ duration: 1, type: "tween", ease: "easeInOut" }}
  onClick={() => setIsMoved(!isMoved)}
  className={\`bg-gradient-to-br from-red-500 to-orange-500 rounded-lg shadow-lg cursor-pointer w-32 h-32 flex items-center justify-center text-white font-semibold \${isMoved ? 'ml-32' : ''}\`}
>
  Click Me
</motion.div>
          `}
        >
          {(() => {
            const [isMoved, setIsMoved] = useState(false);
            return (
              <motion.div
                layout transition={{ duration: 1, type: "tween", ease: "easeInOut" }}
                onClick={() => setIsMoved(!isMoved)}
                className={`bg-gradient-to-br from-red-500 to-orange-500 rounded-lg shadow-lg cursor-pointer w-32 h-32 flex items-center justify-center text-white font-semibold ${isMoved ? 'ml-32' : ''}`}
              >
                Click Me
              </motion.div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 27. Scroll-linked Opacity (using useScroll and useTransform) */}
      <motion.section
        ref={sectionRefs[26][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[26][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="27. Scroll-linked Opacity"
          description="An element's opacity changes dynamically as the user scrolls, creating a fade effect tied to scroll progress."
          codeSnippet={`
// This example uses scrollYProgress from useScroll()
// and useTransform() to map scroll progress to opacity.
// The component is then styled with style={{ opacity: scrollOpacity }}.
          `}
        >
          {(() => {
            const { scrollYProgress } = useScroll();
            const scrollOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]); // Adjust input range based on where you want it to animate

            return (
              <motion.div
                style={{ opacity: scrollOpacity }}
                className="w-full h-48 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl shadow-lg flex items-center justify-center text-white text-2xl font-bold"
              >
                Scroll to Fade
              </motion.div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 28. Scroll-linked Progress Bar */}
      <motion.section
        ref={sectionRefs[27][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[27][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="28. Scroll-linked Progress Bar"
          description="A progress bar that fills up dynamically as the user scrolls down the page, indicating scroll progress."
          codeSnippet={`
// This example uses scrollYProgress from useScroll()
// and useTransform() to map scroll progress to scaleX.
// The progress bar is then styled with style={{ scaleX }}.
          `}
        >
          {(() => {
            const { scrollYProgress } = useScroll();
            const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]); // Maps 0-1 scroll to 0-1 scale

            return (
              <div className="w-full bg-gray-700 rounded-full h-4">
                <motion.div
                  style={{ scaleX, originX: 0 }} // originX: 0 makes it scale from left
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 29. Parallax Effect (Element moves slower on scroll) */}
      <motion.section
        ref={sectionRefs[28][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[28][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="29. Parallax Effect"
          description="An element moves at a different speed than the scroll, creating a subtle depth illusion (parallax)."
          codeSnippet={`
// This example uses scrollYProgress from useScroll()
// and useTransform() to map scroll progress to a negative Y translation.
// The element moves up slower than the scroll.
          `}
        >
          {(() => {
            const { scrollYProgress } = useScroll();
            const scrollParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]); // Moves up 50% of its height

            return (
              <div className="relative w-full h-48 bg-gray-700 rounded-lg overflow-hidden">
                <motion.div
                  style={{ y: scrollParallaxY }}
                  className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold"
                >
                  Parallax Background
                </motion.div>
                <div className="relative z-10 flex items-center justify-center h-full text-white text-xl">
                  Foreground Content
                </div>
              </div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 30. Scroll-linked Rotation */}
      <motion.section
        ref={sectionRefs[29][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[29][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="30. Scroll-linked Rotation"
          description="An element rotates continuously as the user scrolls down the page, adding dynamic visual interest."
          codeSnippet={`
// This example uses scrollYProgress from useScroll()
// and useTransform() to map scroll progress to a rotation value.
          `}
        >
          {(() => {
            const { scrollYProgress } = useScroll();
            const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 360 * 5]); // Rotates 5 full turns

            return (
              <motion.div
                style={{ rotate: scrollRotate }}
                className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-lime-500 rounded-xl shadow-lg flex items-center justify-center text-white text-xl font-bold"
              >
                Rotate!
              </motion.div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* --- Category 6: Advanced Interactions & UI Patterns (5+ Animations) --- */}

      {/* 31. Accordion/Expandable Section */}
      <motion.section
        ref={sectionRefs[30][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[30][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="31. Accordion/Expandable Section"
          description="Animate the expansion and collapse of content sections using Framer Motion's height animation."
          codeSnippet={`
const [isExpanded, setIsExpanded] = useState(false);
const accordionVariants = {
  open: { opacity: 1, height: "auto" },
  closed: { opacity: 0, height: 0 },
};
<div className="w-full">
  <button
    onClick={() => setIsExpanded(!isExpanded)}
    className="w-full bg-gray-700 text-white p-4 rounded-t-lg font-semibold hover:bg-gray-600 transition-colors"
  >
    Toggle Content
  </button>
  <AnimatePresence>
    {isExpanded && (
      <motion.div
        variants={accordionVariants}
        initial="closed"
        animate="open"
        exit="closed"
        className="bg-gray-900 text-gray-300 p-4 rounded-b-lg overflow-hidden"
      >
        <p>This is the content that expands and collapses smoothly.</p>
        <p className="mt-2">Framer Motion handles height animations beautifully.</p>
      </motion.div>
    )}
  </AnimatePresence>
</div>
          `}
        >
          {(() => {
            const [isExpanded, setIsExpanded] = useState(false);
            const accordionVariants = {
              open: { opacity: 1, height: "auto" },
              closed: { opacity: 0, height: 0 },
            };
            return (
              <div className="w-full">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-full bg-gray-700 text-white p-4 rounded-t-lg font-semibold hover:bg-gray-600 transition-colors"
                >
                  Toggle Content
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      variants={accordionVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="bg-gray-900 text-gray-300 p-4 rounded-b-lg overflow-hidden"
                    >
                      <p>This is the content that expands and collapses smoothly.</p>
                      <p className="mt-2">Framer Motion handles height animations beautifully.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 32. Menu Icon Animation (Hamburger to X) */}
      <motion.section
        ref={sectionRefs[31][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[31][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="32. Menu Icon Animation (Hamburger to X)"
          description="Transform a hamburger icon into a close icon with a smooth, visually appealing animation."
          codeSnippet={`
const [isMenuOpen, setIsMenuOpen] = useState(false);
const menuVariants = {
  open: { rotate: 90, scale: 1.2 },
  closed: { rotate: 0, scale: 1 },
};
<button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
  <motion.div
    variants={menuVariants}
    animate={isMenuOpen ? "open" : "closed"}
    className="w-8 h-8 flex flex-col justify-around items-center"
  >
    <span className="block w-6 h-0.5 bg-white rounded"></span>
    <span className="block w-6 h-0.5 bg-white rounded"></span>
    <span className="block w-6 h-0.5 bg-white rounded"></span>
  </motion.div>
</button>
          `}
        >
          {(() => {
            const [isMenuOpen, setIsMenuOpen] = useState(false);
            const menuVariants = {
              open: { rotate: 90, scale: 1.2 },
              closed: { rotate: 0, scale: 1 },
            };
            return (
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                <motion.div
                  variants={menuVariants}
                  animate={isMenuOpen ? "open" : "closed"}
                  className="w-8 h-8 flex flex-col justify-around items-center"
                >
                  <span className="block w-6 h-0.5 bg-white rounded"></span>
                  <span className="block w-6 h-0.5 bg-white rounded"></span>
                  <span className="block w-6 h-0.5 bg-white rounded"></span>
                </motion.div>
              </button>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 33. Card Flip (RotateY) */}
      <motion.section
        ref={sectionRefs[32][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[32][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="33. Card Flip (RotateY)"
          description="Animate a card flipping on its Y-axis to reveal its back side, creating a dynamic content transition."
          codeSnippet={`
const [cardFlip, setCardFlip] = useState(false);
const flipVariants = {
  front: { rotateY: 0 },
  back: { rotateY: 180 },
};
<motion.div
  onClick={() => setCardFlip(!cardFlip)}
  variants={flipVariants}
  animate={cardFlip ? "back" : "front"}
  transition={{ duration: 0.8 }}
  className="relative w-48 h-64 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl shadow-lg cursor-pointer preserve-3d"
  style={{ transformStyle: "preserve-3d" }} // Important for 3D flip
>
  <div className="absolute inset-0 backface-hidden flex items-center justify-center text-white text-2xl font-bold">
    Front
  </div>
  <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center text-white text-2xl font-bold">
    Back
  </div>
</motion.div>
// Add global CSS for .preserve-3d, .backface-hidden, .rotate-y-180 (see index.css)
          `}
        >
          {(() => {
            const [cardFlip, setCardFlip] = useState(false);
            const flipVariants = {
              front: { rotateY: 0 },
              back: { rotateY: 180 },
            };
            return (
              <motion.div
                onClick={() => setCardFlip(!cardFlip)}
                variants={flipVariants}
                animate={cardFlip ? "back" : "front"}
                transition={{ duration: 0.8 }}
                className="relative w-48 h-64 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl shadow-lg cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 backface-hidden flex items-center justify-center text-white text-2xl font-bold">
                  Front
                </div>
                <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center text-white text-2xl font-bold">
                  Back
                </div>
              </motion.div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 34. Drag with Momentum (Fling) */}
      <motion.section
        ref={sectionRefs[33][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[33][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="34. Drag with Momentum (Fling)"
          description="A draggable element that continues to move after being released, simulating real-world momentum."
          codeSnippet={`
<motion.div
  drag // Makes the element draggable
  className="w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
>
  Fling Me
</motion.div>
          `}
        >
          <motion.div
            drag // Makes the element draggable
            className="w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
          >
            Fling Me
          </motion.div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 35. Path Animation (SVG Line Drawing) */}
      <motion.section
        ref={sectionRefs[34][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[34][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="35. Path Animation (SVG Line Drawing)"
          description="Animate the drawing of an SVG path, creating a dynamic and engaging visual effect."
          codeSnippet={`
<svg width="100" height="100" viewBox="0 0 100 100" className="stroke-blue-400 stroke-2 fill-none">
  <motion.path
    d="M20,20 L80,20 L80,80 L20,80 L20,20" // A square path
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
  />
</svg>
          `}
        >
          <svg width="100" height="100" viewBox="0 0 100 100" className="stroke-blue-400 stroke-2 fill-none">
            <motion.path
              d="M20,20 L80,20 L80,80 L20,80 L20,20" // A square path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            />
          </svg>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 36. Animate Presence with Fade & Scale */}
      <motion.section
        ref={sectionRefs[35][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[35][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="36. Animate Presence (Fade & Scale)"
          description="Animate elements smoothly when they are added or removed from the DOM, using AnimatePresence."
          codeSnippet={`
const [isVisible, setIsVisible] = useState(true);
<div className="flex flex-col items-center">
  <button onClick={() => setIsVisible(!isVisible)} className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4">
    Toggle Element
  </button>
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="w-48 h-32 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg shadow-lg flex items-center justify-center text-white font-semibold"
      >
        I Appear/Disappear!
      </motion.div>
    )}
  </AnimatePresence>
</div>
          `}
        >
          {(() => {
            const [isVisible, setIsVisible] = useState(true);
            return (
              <div className="flex flex-col items-center">
                <button onClick={() => setIsVisible(!isVisible)} className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4">
                  Toggle Element
                </button>
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="w-48 h-32 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg shadow-lg flex items-center justify-center text-white font-semibold"
                    >
                      I Appear/Disappear!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 37. Drag with Bounds (using pixels) */}
      <motion.section
        ref={sectionRefs[36][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[36][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="37. Drag with Bounds (Pixels)"
          description="Confine a draggable element to specific pixel boundaries, useful for custom sliders or limited drag areas."
          codeSnippet={`
<motion.div
  drag dragConstraints={{ left: -50, right: 50, top: -20, bottom: 20 }}
  className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-lime-500 rounded-xl shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
>
  Bounded Drag
</motion.div>
          `}
        >
          <motion.div
            drag dragConstraints={{ left: -50, right: 50, top: -20, bottom: 20 }}
            className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-lime-500 rounded-xl shadow-lg cursor-grab flex items-center justify-center text-white font-semibold"
          >
            Bounded Drag
          </motion.div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 38. Scroll-linked Parallax Background */}
      <motion.section
        ref={sectionRefs[37][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[37][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="38. Scroll-linked Parallax Background"
          description="Create a classic parallax effect where a background element scrolls slower than the foreground content."
          codeSnippet={`
// This requires a parent element with overflow-hidden and relative positioning
// and the background element using useTransform for its Y position.
// Example:
// <div className="relative h-64 overflow-hidden">
//   <motion.div style={{ y: backgroundY }} className="absolute inset-0 bg-cover bg-center" />
//   <div className="relative z-10">Foreground content</div>
// </div>
          `}
        >
          {(() => {
            const { scrollYProgress } = useScroll();
            const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // Background moves 50% slower

            return (
              <div className="relative w-full h-48 bg-gray-700 rounded-lg overflow-hidden">
                <motion.div
                  style={{ y: backgroundY }}
                  className="absolute inset-0 bg-cover bg-center"
                  // Placeholder image for demo (using a gradient for visual representation)
                  animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundImage: `linear-gradient(45deg, #334155, #1e293b, #334155)` }}
                />
                <div className="relative z-10 flex items-center justify-center h-full text-white text-xl bg-black bg-opacity-50">
                  Scroll for Parallax
                </div>
              </div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 39. Scroll-linked Sticky Header (with opacity/transform) */}
      <motion.section
        ref={sectionRefs[38][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[38][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="39. Scroll-linked Sticky Header"
          description="A header that changes its appearance (e.g., shrinks, changes opacity) as the user scrolls down the page."
          codeSnippet={`
// This typically involves a fixed header component
// that uses useScroll and useTransform to animate its properties.
// Example:
// const { scrollY } = useScroll();
// const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.5]);
// const headerHeight = useTransform(scrollY, [0, 100], [80, 50]);
// <motion.header style={{ opacity: headerOpacity, height: headerHeight }} />
          `}
        >
          {(() => {
            // This is a simplified demo within the card
            const { scrollYProgress } = useScroll();
            const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
            const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.5]);

            return (
              <motion.div
                style={{ scale: headerScale, opacity: headerOpacity, originY: 0 }}
                className="w-full bg-blue-600 text-white p-4 text-center font-bold rounded-lg shadow-lg"
              >
                Sticky Header Demo
              </motion.div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 40. Custom Cursor Animation (Follows mouse) */}
      <motion.section
        ref={sectionRefs[39][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[39][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="40. Custom Cursor Animation"
          description="A custom element that follows the mouse cursor, adding a unique interactive touch to the page."
          codeSnippet={`
// This requires a global component usually in App.jsx or main.jsx
// and event listeners for mousemove.
// Example:
// const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
// useEffect(() => {
//   const updateMousePosition = (e) => { setMousePosition({ x: e.clientX, y: e.clientY }); };
//   window.addEventListener("mousemove", updateMousePosition);
//   return () => window.removeEventListener("mousemove", updateMousePosition);
// }, []);
// <motion.div
//   animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
//   transition={{ type: "spring", stiffness: 100, damping: 10 }}
//   className="fixed w-6 h-6 bg-blue-400 rounded-full pointer-events-none z-50"
// />
          `}
        >
          {(() => {
            // This demo will simulate the cursor movement within the card for demonstration
            const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
            const cardRef = useRef(null);

            const handleMouseMove = (e) => {
              if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect();
                setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }
            };

            return (
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                className="relative w-full h-48 bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center text-gray-400 text-lg"
              >
                Move mouse here
                <motion.div
                  animate={{ x: mousePos.x - 12, y: mousePos.y - 12 }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  className="absolute w-6 h-6 bg-blue-400 rounded-full pointer-events-none"
                />
              </div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 41. Text Highlight on Hover */}
      <motion.section
        ref={sectionRefs[40][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[40][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="41. Text Highlight on Hover"
          description="Individual words or phrases highlight with an animated background on hover."
          codeSnippet={`
const highlightVariants = {
  rest: { backgroundColor: "rgba(0,0,0,0)" },
  hover: { backgroundColor: "rgba(96, 165, 250, 0.2)" }, // blue-400 with opacity
};
<p className="text-xl text-white">
  This is a <motion.span variants={highlightVariants} initial="rest" whileHover="hover" className="rounded px-1 cursor-pointer">highlighted</motion.span> word.
</p>
          `}
        >
          {(() => {
            const highlightVariants = {
              rest: { backgroundColor: "rgba(0,0,0,0)" },
              hover: { backgroundColor: "rgba(96, 165, 250, 0.2)" }, // blue-400 with opacity
            };
            return (
              <p className="text-xl text-white">
                This is a <motion.span variants={highlightVariants} initial="rest" whileHover="hover" className="rounded px-1 cursor-pointer">highlighted</motion.span> word.
              </p>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 42. Pop-up Modal with AnimatePresence */}
      <motion.section
        ref={sectionRefs[41][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[41][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="42. Pop-up Modal"
          description="A modal window that fades in and out with a subtle scale animation, using AnimatePresence for smooth entry/exit."
          codeSnippet={`
const [showModal, setShowModal] = useState(false);
const modalVariants = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.75, transition: { duration: 0.15 } },
};
<div className="flex flex-col items-center">
  <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4">
    Open Modal
  </button>
  <AnimatePresence>
    {showModal && (
      <motion.div
        variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center">
          <h3 className="text-2xl font-bold mb-4">Modal Title</h3>
          <p className="text-gray-300 mb-6">This is a smoothly animated modal!</p>
          <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-red-500 text-white rounded-lg">
            Close
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
          `}
        >
          {(() => {
            const [showModal, setShowModal] = useState(false);
            const modalVariants = {
              hidden: { opacity: 0, scale: 0.75 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
              exit: { opacity: 0, scale: 0.75, transition: { duration: 0.15 } },
            };
            return (
              <div className="flex flex-col items-center">
                <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4">
                  Open Modal
                </button>
                <AnimatePresence>
                  {showModal && (
                    <motion.div
                      variants={modalVariants} initial="hidden" animate="visible" exit="exit"
                      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                      <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center">
                        <h3 className="text-2xl font-bold mb-4">Modal Title</h3>
                        <p className="text-gray-300 mb-6">This is a smoothly animated modal!</p>
                        <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                          Close
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 43. Confetti Burst on Click */}
      <motion.section
        ref={sectionRefs[42][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[42][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="43. Confetti Burst on Click"
          description="Simulate a confetti burst animation on click, adding a celebratory visual effect."
          codeSnippet={`
// This involves creating many small animated divs on click.
// For a simple demo, we can animate a single element to simulate a burst.
const [burst, setBurst] = useState(false);
<motion.div
  onClick={() => setBurst(true)}
  onAnimationComplete={() => setBurst(false)} // Reset after animation
  animate={burst ? { scale: [1, 2, 0], opacity: [1, 0.5, 0] } : {}}
  transition={{ duration: 0.5 }}
  className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-lg cursor-pointer flex items-center justify-center text-white font-bold"
>
  Click for Burst!
</motion.div>
          `}
        >
          {(() => {
            const [burst, setBurst] = useState(false);
            return (
              <motion.div
                onClick={() => setBurst(true)}
                onAnimationComplete={() => setBurst(false)} // Reset after animation
                animate={burst ? { scale: [1, 2, 0], opacity: [1, 0.5, 0] } : {}}
                transition={{ duration: 0.5 }}
                className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-lg cursor-pointer flex items-center justify-center text-white font-bold"
              >
                Click for Burst!
              </motion.div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 44. Typing Text Animation */}
      <motion.section
        ref={sectionRefs[43][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[43][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="44. Typing Text Animation"
          description="Text appears as if being typed out, character by character, creating an engaging entrance."
          codeSnippet={`
const text = "This text is typing...";
<motion.p
  initial={{ width: 0 }}
  animate={{ width: "100%" }}
  transition={{ duration: 2, ease: "linear", delay: 0.5 }}
  className="overflow-hidden whitespace-nowrap border-r-2 border-white pr-1 text-xl font-mono text-white"
>
  {text}
</motion.p>
          `}
        >
          {(() => {
            const text = "This text is typing...";
            return (
              <motion.p
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "linear", delay: 0.5 }}
                className="overflow-hidden whitespace-nowrap border-r-2 border-white pr-1 text-xl font-mono text-white"
              >
                {text}
              </motion.p>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* 45. Card Flip with Content Change */}
      <motion.section
        ref={sectionRefs[44][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[44][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="45. Card Flip with Content Change"
          description="A card flips to reveal new content on its back side, demonstrating complex 3D transforms and content switching."
          codeSnippet={`
const [cardFlip, setCardFlip] = useState(false);
const flipVariants = {
  front: { rotateY: 0 },
  back: { rotateY: 180 },
};
<motion.div
  onClick={() => setCardFlip(!cardFlip)}
  variants={flipVariants}
  animate={cardFlip ? "back" : "front"}
  transition={{ duration: 0.8 }}
  className="relative w-48 h-64 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl shadow-lg cursor-pointer preserve-3d"
  style={{ transformStyle: "preserve-3d" }}
>
  <div className="absolute inset-0 backface-hidden flex items-center justify-center text-white text-2xl font-bold">
    Front Content
  </div>
  <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center text-white text-2xl font-bold">
    Back Content
  </div>
</motion.div>
// Add global CSS for .preserve-3d, .backface-hidden, .rotate-y-180 (see index.css)
          `}
        >
          {(() => {
            const [cardFlip, setCardFlip] = useState(false);
            const flipVariants = {
              front: { rotateY: 0 },
              back: { rotateY: 180 },
            };
            return (
              <motion.div
                onClick={() => setCardFlip(!cardFlip)}
                variants={flipVariants}
                animate={cardFlip ? "back" : "front"}
                transition={{ duration: 0.8 }}
                className="relative w-48 h-64 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl shadow-lg cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 backface-hidden flex items-center justify-center text-white text-2xl font-bold">
                  Front Content
                </div>
                <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center text-white text-2xl font-bold">
                  Back Content
                </div>
              </motion.div>
            );
          })()}
        </AnimationDescriptionCard>
      </motion.section>

      {/* --- Category 7: Loading & Progress Animations (10 Animations) --- */}

      {/* 46. Pulsating Grid Dots Loader */}
      <motion.section
        ref={sectionRefs[45][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[45][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="46. Pulsating Grid Dots Loader"
          description="An elegant loader with a grid of dots that pulsate in a staggered pattern, creating a sophisticated loading indicator."
          codeSnippet={`
<div className="grid grid-cols-5 gap-2 p-4 rounded-lg bg-gray-800 border border-gray-700">
  {Array.from({ length: 25 }).map((_, i) => (
    <motion.div
      key={i}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: [0.5, 1, 0.5], opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: i * 0.1, repeatDelay: 0.5 }}
      className="w-4 h-4 rounded-full bg-blue-500"
    />
  ))}
</div>
          `}
        >
          <div className="grid grid-cols-5 gap-2 p-4 rounded-lg bg-gray-800 border border-gray-700">
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
          </div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 47. Expanding Concentric Circles Loader */}
      <motion.section
        ref={sectionRefs[46][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[46][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="47. Expanding Concentric Circles Loader"
          description="A hypnotic loader with circles expanding outwards, fading as they grow, creating a smooth, ethereal effect."
          codeSnippet={`
<div className="relative w-48 h-48 flex items-center justify-center">
  {Array.from({ length: 4 }).map((_, i) => (
    <motion.div
      key={i}
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: [0, 1, 1], opacity: [1, 0.5, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
      className="absolute border-4 border-purple-500 rounded-full"
      style={{ width: \`\${(i + 1) * 25}%\`, height: \`\${(i + 1) * 25}%\` }}
    />
  ))}
</div>
          `}
        >
          <div className="relative w-48 h-48 flex items-center justify-center">
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
          </div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 48. Text Wave Loader */}
      <motion.section
        ref={sectionRefs[47][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[47][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="48. Text Wave Loader"
          description="A dynamic text loader where each character bobs up and down in a wave-like motion, creating a playful loading message."
          codeSnippet={`
<div className="text-white text-4xl font-bold flex">
  {"LOADING...".split("").map((char, i) => (
    <motion.span
      key={i}
      initial={{ y: "0%" }}
      animate={{ y: ["0%", "-50%", "0%"] }}
      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
      className="inline-block mx-0.5"
    >
      {char}
    </motion.span>
  ))}
</div>
          `}
        >
          <div className="text-white text-4xl font-bold flex">
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
          </div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 49. Spinning Hexagon Loader */}
      <motion.section
        ref={sectionRefs[48][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[48][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="49. Spinning Hexagon Loader"
          description="A futuristic loader with two layered hexagons spinning in opposite directions, creating a mesmerizing geometric effect."
          codeSnippet={`
<div className="relative w-32 h-32 flex items-center justify-center">
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
  {/* Add clip-path-hexagon to global CSS (index.css) */}
</div>
          `}
        >
          <div className="relative w-32 h-32 flex items-center justify-center">
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
          </div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 50. Line Progress Bar Loader */}
      <motion.section
        ref={sectionRefs[49][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[49][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="50. Line Progress Bar Loader"
          description="A sleek, minimalist progress bar that animates its width from 0% to 100% and back, indicating continuous progress."
          codeSnippet={`
<div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
  <motion.div
    initial={{ width: "0%" }}
    animate={{ width: ["0%", "100%", "0%"] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="h-full bg-blue-500 rounded-full"
  />
</div>
          `}
        >
          <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-full bg-blue-500 rounded-full"
            />
          </div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 51. Bouncing Dots Loader */}
      <motion.section
        ref={sectionRefs[50][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[50][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="51. Bouncing Dots Loader"
          description="A playful and classic loader featuring three dots bouncing up and down in a staggered sequence."
          codeSnippet={`
<div className="flex space-x-2">
  {Array.from({ length: 3 }).map((_, i) => (
    <motion.div
      key={i}
      initial={{ y: "0%" }}
      animate={{ y: ["0%", "-50%", "0%"] }}
      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
      className="w-4 h-4 rounded-full bg-red-500"
    />
  ))}
</div>
          `}
        >
          <div className="flex space-x-2">
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
          </div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 52. Rotating Cube Loader (Simple 3D-like) */}
      <motion.section
        ref={sectionRefs[51][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[51][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="52. Rotating Cube Loader"
          description="A simple cube continuously rotates on its X and Y axes, creating a basic 3D-like loading animation."
          codeSnippet={`
<div className="relative w-24 h-24 flex items-center justify-center perspective-1000">
  <motion.div
    animate={{ rotateY: 360, rotateX: 360 }}
    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 transform-style-3d"
  >
    <div className="absolute inset-0 border-2 border-white opacity-20"></div>
  </motion.div>
  {/* Add perspective-1000 and transform-style-3d to global CSS (index.css) */}
</div>
          `}
        >
          <div className="relative w-24 h-24 flex items-center justify-center perspective-1000">
            <motion.div
              animate={{ rotateY: 360, rotateX: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 transform-style-3d"
            >
              <div className="absolute inset-0 border-2 border-white opacity-20"></div>
            </motion.div>
          </div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 53. Radial Wipe Loader (Smooth & Elegant) */}
      <motion.section
        ref={sectionRefs[52][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[52][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="53. Radial Wipe Loader"
          description="A smooth, elegant loader where a circular gradient expands from the center, creating a radial wipe effect."
          codeSnippet={`
<div className="relative w-32 h-32 rounded-full bg-gray-700 overflow-hidden">
  <motion.div
    initial={{ rotate: 0, scale: 0 }}
    animate={{ rotate: [0, 360], scale: [0, 1] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500"
    style={{ clipPath: 'circle(50% at 50% 50%)' }}
  />
</div>
          `}
        >
          <div className="relative w-32 h-32 rounded-full bg-gray-700 overflow-hidden">
            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              animate={{ rotate: [0, 360], scale: [0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500"
              style={{ clipPath: 'circle(50% at 50% 50%)' }}
            />
          </div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 54. Expanding Lines Loader (Modern & Minimal) */}
      <motion.section
        ref={sectionRefs[53][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[53][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="54. Expanding Lines Loader"
          description="A modern and minimalist loader with three horizontal lines expanding and contracting in a staggered sequence."
          codeSnippet={`
<div className="flex flex-col space-y-2 w-48">
  {Array.from({ length: 3 }).map((_, i) => (
    <motion.div
      key={i}
      initial={{ width: "0%" }}
      animate={{ width: ["0%", "100%", "0%"] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
      className="h-2 bg-purple-500 rounded-full"
    />
  ))}
</div>
          `}
        >
          <div className="flex flex-col space-y-2 w-48">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ width: "0%" }}
                animate={{ width: ["0%", "100%", "0%"] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                className="h-2 bg-purple-500 rounded-full"
              />
            ))}
          </div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* 55. Morphing Circle to Square Loader (Creative & Fluid)
      <motion.section
        ref={sectionRefs[54][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[54][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="55. Morphing Circle to Square Loader"
          description="A creative and fluid loader where a shape continuously morphs between a circle and a square, with rotation and color changes."
          codeSnippet={`
<div className="w-32 h-32 flex items-center justify-center">
  <motion.div
    animate={{
      borderRadius: ["50%", "0%", "50%"], // Morph from circle to square and back
      rotate: [0, 90, 180, 270, 360],
      backgroundColor: ["#FF007F", "#00BFFF", "#FF007F"], // Color change
    }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className="w-24 h-24 shadow-lg"
  />
</div>
          `}
        >
          <div className="w-32 h-32 flex items-center justify-center">
            <motion.div
              animate={{
                borderRadius: ["50%", "0%", "50%"],
                rotate: [0, 90, 180, 270, 360],
                backgroundColor: ["#FF007F", "#00BFFF", "#FF007F"],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 shadow-lg"
            />
          </div>
        </AnimationDescriptionCard>
      </motion.section>

      
      <AboutMe />

    </div>
  );
};

export default Home; }






// src/Home.jsx (Only the very end of the return statement, showing the change)
// ... (all 55 animation sections)

      {/* 55. Morphing Circle to Square Loader (Creative & Fluid) */}
      <motion.section
        ref={sectionRefs[54][0]} initial={{ opacity: 0, y: 100 }} animate={sectionRefs[54][1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} className="mb-24"
      >
        <AnimationDescriptionCard
          title="55. Morphing Circle to Square Loader"
          description="A creative and fluid loader where a shape continuously morphs between a circle and a square, with rotation and color changes."
          codeSnippet={`
<div className="w-32 h-32 flex items-center justify-center">
  <motion.div
    animate={{
      borderRadius: ["50%", "0%", "50%"],
      rotate: [0, 90, 180, 270, 360],
      backgroundColor: ["#FF007F", "#00BFFF", "#FF007F"],
    }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className="w-24 h-24 shadow-lg"
  />
</div>
          `}
        >
          <div className="w-32 h-32 flex items-center justify-center">
            <motion.div
              animate={{
                borderRadius: ["50%", "0%", "50%"],
                rotate: [0, 90, 180, 270, 360],
                backgroundColor: ["#FF007F", "#00BFFF", "#FF007F"],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 shadow-lg"
            />
          </div>
        </AnimationDescriptionCard>
      </motion.section>

      {/* About Me Section - REMOVED FROM HERE */}

    </div>
  );
};

export default Home;
