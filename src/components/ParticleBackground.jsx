// // src/components/ParticleBackground.jsx
// import React, { useCallback } from 'react';
// import Particles from 'react-tsparticles';
// import { loadSlim } from 'tsparticles-slim'; // or 'tsparticles' for full bundle

// // This component creates a dynamic, animated particle background.
// // It's designed to be subtle enough not to distract, but complex enough to impress.
// const ParticleBackground = () => {
//   // useCallback memoizes the particles initialization function.
//   // loadSlim loads a smaller bundle of tsparticles for better performance.
//   const particlesInit = useCallback(async (engine) => {
//     console.log(engine);
//     await loadSlim(engine);
//   }, []);

//   // useCallback memoizes the particles loaded function.
//   const particlesLoaded = useCallback(async (container) => {
//     await console.log(container);
//   }, []);

//   return (
//     // Particles component from react-tsparticles.
//     // It takes an 'id' and 'options' to define the particle system.
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       loaded={particlesLoaded}
//       options={{
//         // Full-screen canvas for the particles
//         fullScreen: {
//           enable: true,
//           zIndex: -1, // Ensures particles are behind other content
//         },
//         // Background color (can be transparent if you want a CSS gradient behind it)
//         background: {
//           color: {
//             value: "#0a0a0a", // Very dark background for particles
//           },
//         },
//         // Frame rate limit for performance
//         fpsLimit: 60,
//         // Interactivity settings
//         interactivity: {
//           events: {
//             onClick: {
//               enable: false, // No click interaction
//               mode: "push",
//             },
//             onHover: {
//               enable: true, // Particles react on hover
//               mode: "repulse", // Particles move away from mouse
//             },
//             resize: true,
//           },
//           modes: {
//             push: {
//               quantity: 4,
//             },
//             repulse: {
//               distance: 100, // How far particles are repulsed
//               duration: 0.4,
//             },
//           },
//         },
//         // Particle settings
//         particles: {
//           color: {
//             value: "#ffffff", // White particles (can be an array for multiple colors)
//           },
//           links: {
//             color: "#ffffff", // White lines connecting particles
//             distance: 150, // Max distance for lines
//             enable: true, // Enable lines
//             opacity: 0.3, // Subtle lines
//             width: 1,
//           },
//           collisions: {
//             enable: false,
//           },
//           move: {
//             direction: "none",
//             enable: true,
//             outModes: {
//               default: "bounce", // Particles bounce off edges
//             },
//             random: false,
//             speed: 0.5, // Slow, gentle movement
//             straight: false,
//           },
//           number: {
//             density: {
//               enable: true,
//               area: 800,
//             },
//             value: 80, // Number of particles
//           },
//           opacity: {
//             value: 0.5, // Particle opacity
//           },
//           shape: {
//             type: "circle", // Circular particles
//           },
//           size: {
//             value: { min: 1, max: 3 }, // Random size for particles
//           },
//         },
//         // Detects retina displays for higher resolution particles
//         detectRetina: true,
//       }}
//     />
//   );
// };

// export default ParticleBackground;

























// src/components/ParticleBackground.jsx
import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim'; // or 'tsparticles' for full bundle

// This component creates a dynamic, animated particle background.
// It's designed to be subtle enough not to distract, but complex enough to impress.
const ParticleBackground = () => {
  // useCallback memoizes the particles initialization function.
  // loadSlim loads a smaller bundle of tsparticles for better performance.
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  // useCallback memoizes the particles loaded function.
  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    // Particles component from react-tsparticles.
    // It takes an 'id' and 'options' to define the particle system.
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        // Full-screen canvas for the particles
        fullScreen: {
          enable: true,
          zIndex: -1, // Ensures particles are behind other content
        },
        // Background color (can be transparent if you want a CSS gradient behind it)
        background: {
          color: {
            value: "#0a0a0a", // Very dark background for particles
          },
        },
        // Frame rate limit for performance
        fpsLimit: 60,
        // Interactivity settings
        interactivity: {
          events: {
            onClick: {
              enable: false, // No click interaction
              mode: "push",
            },
            onHover: {
              enable: true, // Particles react on hover
              mode: "repulse", // Particles move away from mouse
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 100, // How far particles are repulsed
              duration: 0.4,
            },
          },
        },
        // Particle settings
        particles: {
          color: {
            value: "#ffffff", // White particles (can be an array for multiple colors)
          },
          links: {
            color: "#ffffff", // White lines connecting particles
            distance: 150, // Max distance for lines
            enable: true, // Enable lines
            opacity: 0.3, // Subtle lines
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce", // Particles bounce off edges
            },
            random: false,
            speed: 0.5, // Slow, gentle movement
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80, // Number of particles
          },
          opacity: {
            value: 0.5, // Particle opacity
          },
          shape: {
            type: "circle", // Circular particles
          },
          size: {
            value: { min: 1, max: 3 }, // Random size for particles
          },
        },
        // Detects retina displays for higher resolution particles
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;
