// // src/animation-demos/Hover3DBall.jsx
// import React, { useRef, useState } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber'; // Added useFrame
// import { OrbitControls, Html } from '@react-three/drei';
// import * as THREE from 'three'; // Import Three.js for color interpolation
// // Note: framer-motion-3d is removed due to dependency conflicts.
// // We will animate the 3D object manually using useFrame and Three.js properties.

// const Sphere = React.forwardRef((props, ref) => {
//   const [hovered, setHovered] = useState(false);
//   const meshRef = useRef(); // Local ref for the mesh

//   // Define target states for scale and color
//   // THREE.Color is used for smooth color interpolation
//   const targetScale = hovered ? 1.2 : 1;
//   const targetColor = hovered ? new THREE.Color('#E94E77') : new THREE.Color('#4A90E2'); // Pink/Red on hover, Blue otherwise

//   // useFrame hook runs on every frame of the Three.js render loop
//   useFrame(() => {
//     if (meshRef.current) {
//       // Smoothly animate scale using linear interpolation (lerp)
//       meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

//       // Animate rotation: continuous while hovered, or smoothly reset when not hovered
//       if (hovered) {
//         meshRef.current.rotation.y += 0.02; // Continuous rotation around Y-axis
//         meshRef.current.rotation.x += 0.01; // Continuous rotation around X-axis
//       } else {
//         // Smoothly reset rotation to 0 when not hovered
//         meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.05);
//         meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.05);
//       }

//       // Smoothly animate color using linear interpolation (lerp)
//       meshRef.current.material.color.lerp(targetColor, 0.1);
//     }
//   });

//   return (
//     // Standard Three.js mesh component
//     <mesh
//       {...props} // Pass any additional props (like position)
//       ref={(el) => {
//         meshRef.current = el; // Assign the DOM element to our local ref
//         if (typeof ref === 'function') ref(el); // If a parent passed a function ref, call it
//         else if (ref) ref.current = el; // If a parent passed an object ref, assign to its current property
//       }}
//       // Event handlers for mouse enter and leave, provided by @react-three/fiber
//       onPointerEnter={() => setHovered(true)}
//       onPointerLeave={() => setHovered(false)}
//     >
//       {/* Defines the geometry of the mesh: a sphere. */}
//       {/* args: [radius, widthSegments, heightSegments] for detail */}
//       <sphereGeometry args={[1, 64, 64]} />
//       {/* Defines the material of the mesh: a standard material for realistic lighting. */}
//       {/* Initial color is set here, but useFrame will continuously update it for animation. */}
//       <meshStandardMaterial color={hovered ? '#E94E77' : '#4A90E2'} />
//     </mesh>
//   );
// });

// // Main component for the 3D Ball Demo
// const Hover3DBall = () => {
//   return (
//     // Canvas component from @react-three/fiber sets up the WebGL rendering context.
//     // 'camera' props define the camera's initial position and field of view.
//     <Canvas camera={{ position: [0, 0, 5], fov: 75 }} className="w-full h-80 rounded-lg bg-gray-900">
//       {/* Lighting for the 3D scene */}
//       <ambientLight intensity={0.5} /> {/* General, even illumination */}
//       <directionalLight position={[10, 10, 5]} intensity={1} /> {/* Light from a specific direction */}
//       <pointLight position={[-10, -10, -10]} intensity={0.5} /> {/* Light from a point source */}

//       {/* The Sphere component, which is our animated 3D object. */}
//       <Sphere position={[0, 0, 0]} /> {/* Position the sphere at the center of the scene */}

//       {/* OrbitControls allows users to interactively rotate and zoom the 3D scene with the mouse. */}
//       <OrbitControls enableZoom={true} enablePan={false} />

//       {/* Html component from @react-three/drei allows embedding HTML elements in the 3D scene. */}
//       {/* Useful for overlaying UI elements like text or buttons in 3D space. */}
//       <Html position={[0, 2, 0]}>
//         <div className="text-white text-lg font-bold bg-black bg-opacity-50 px-3 py-1 rounded-md">
//           Hover Me!
//         </div>
//       </Html>
//     </Canvas>
//   );
// };

// export default Hover3DBall;













// src/animation-demos/Hover3DBall.jsx
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'; // Added useFrame
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three'; // Import Three.js for color interpolation

// Note: framer-motion-3d is removed due to dependency conflicts.
// We animate the 3D object manually using useFrame and Three.js properties.

// Sphere component with interactive hover effects and manual animation
const Sphere = React.forwardRef((props, ref) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef(); // Local ref for the mesh

  // Define target states for scale and color
  // THREE.Color is used for smooth color interpolation
  const targetScale = hovered ? 1.2 : 1;
  const targetColor = hovered ? new THREE.Color('#E94E77') : new THREE.Color('#4A90E2'); // Pink/Red on hover, Blue otherwise

  // useFrame hook runs on every frame of the Three.js render loop
  useFrame(() => {
    if (meshRef.current) {
      // Smoothly animate scale using linear interpolation (lerp)
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      // Animate rotation: continuous while hovered, or smoothly reset when not hovered
      if (hovered) {
        meshRef.current.rotation.y += 0.02; // Continuous rotation around Y-axis
        meshRef.current.rotation.x += 0.01; // Continuous rotation around X-axis
      } else {
        // Smoothly reset rotation to 0 when not hovered
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.05);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.05);
      }

      // Smoothly animate color using linear interpolation (lerp)
      meshRef.current.material.color.lerp(targetColor, 0.1);
    }
  });

  return (
    // Standard Three.js mesh component
    <mesh
      {...props} // Pass any additional props (like position)
      ref={(el) => {
        meshRef.current = el; // Assign the DOM element to our local ref
        if (typeof ref === 'function') ref(el); // If a parent passed a function ref, call it
        else if (ref) ref.current = el; // If a parent passed an object ref, assign to its current property
      }}
      // Event handlers for mouse enter and leave, provided by @react-three/fiber
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Defines the geometry of the mesh: a sphere. */}
      {/* args: [radius, widthSegments, heightSegments] for detail */}
      <sphereGeometry args={[1, 64, 64]} />
      {/* Defines the material of the mesh: a standard material for realistic lighting. */}
      {/* Initial color is set here, but useFrame will continuously update it for animation. */}
      <meshStandardMaterial color={hovered ? '#E94E77' : '#4A90E2'} />
    </mesh>
  );
});

// Main component for the 3D Ball Demo
const Hover3DBall = () => {
  return (
    // Canvas component from @react-three/fiber sets up the WebGL rendering context.
    // 'camera' props define the camera's initial position and field of view.
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }} className="w-full h-80 rounded-lg bg-gray-900">
      {/* Lighting for the 3D scene */}
      <ambientLight intensity={0.5} /> {/* General, even illumination */}
      <directionalLight position={[10, 10, 5]} intensity={1} /> {/* Light from a specific direction */}
      <pointLight position={[-10, -10, -10]} intensity={0.5} /> {/* Light from a point source */}

      {/* The Sphere component, which is our animated 3D object. */}
      <Sphere position={[0, 0, 0]} /> {/* Position the sphere at the center of the scene */}

      {/* OrbitControls allows users to interactively rotate and zoom the 3D scene with the mouse. */}
      <OrbitControls enableZoom={true} enablePan={false} />

      {/* Html component from @react-three/drei allows embedding HTML elements in the 3D scene. */}
      {/* Useful for overlaying UI elements like text or buttons in 3D space. */}
      <Html position={[0, 2, 0]}>
        <div className="text-white text-lg font-bold bg-black bg-opacity-50 px-3 py-1 rounded-md">
          Hover Me!
        </div>
      </Html>
    </Canvas>
  );
};

export default Hover3DBall;
