


// // src/components/AnimationDescriptionCard.jsx
// import React from 'react';

// const AnimationDescriptionCard = ({ title, description, children, codeSnippet }) => {
//   return (
//     <div className="
//       relative
//       /* Changed from flat bg-gray-800 to a subtle gradient for premium look */
//       bg-gradient-to-br from-gray-800 to-gray-900
//       rounded-2xl shadow-xl p-6 md:p-8 mb-12
//       border border-gray-700
//       flex flex-col items-center text-center
//       w-full max-w-2xl mx-auto
//       transform transition-all duration-300
//       hover:shadow-2xl hover:border-blue-500 hover:scale-[1.01]
//       overflow-hidden
//       group
//     ">
//       {/* Inner background gradient for more depth and subtle texture */}
//       {/* Increased opacity and changed to radial for a different effect */}
//       <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-70 -z-10 rounded-2xl"></div>
      
//       {/* Dynamic border effect on hover */}
//       <div className="absolute inset-0 rounded-2xl border-4 border-transparent group-hover:border-blue-500 transition-all duration-300 pointer-events-none"></div>

//       {/* Title of the animation */}
//       <h3 className="text-3xl font-bold text-blue-400 mb-3">
//         {title}
//       </h3>
//       {/* Description of the animation */}
//       <p className="text-gray-300 text-lg mb-8 leading-relaxed">
//         {description}
//       </p>
      
//       {/* Container for the actual animated element */}
//       <div className="flex-grow flex items-center justify-center w-full mb-8 min-h-[150px] relative z-10">
//         {children}
//       </div>

//       {/* Code Snippet Section */}
//       {codeSnippet && (
//         <div className="w-full text-left bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm font-mono text-gray-200 overflow-x-auto relative z-10">
//           <h4 className="font-semibold text-blue-300 mb-2">Code Logic:</h4>
//           <pre><code>{codeSnippet}</code></pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AnimationDescriptionCard;






















// src/components/AnimationDescriptionCard.jsx
import React from 'react';

// This component serves as the aesthetic box to describe each animation.
// It will have a title, description, and a place for the animated element itself,
// and later, a code snippet.
const AnimationDescriptionCard = ({ title, description, children, codeSnippet }) => {
  return (
    // Main container for the description card.
    // Styled with a dark background, rounded corners, shadow, and a subtle border.
    // The hover effect adds a dynamic shining border.
    <div className="
      relative
      bg-gradient-to-br from-gray-800 to-gray-900
      rounded-2xl shadow-xl p-6 md:p-8 mb-12
      border border-gray-700
      flex flex-col items-center text-center
      w-full max-w-2xl mx-auto
      transform transition-all duration-300
      hover:shadow-2xl hover:border-blue-500 hover:scale-[1.01]
      overflow-hidden
      group /* Added for group-hover effects */
    ">
      {/* Inner background gradient for more depth and subtle texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-70 -z-10 rounded-2xl"></div>
      
      {/* Dynamic border effect on hover */}
      <div className="absolute inset-0 rounded-2xl border-4 border-transparent group-hover:border-blue-500 transition-all duration-300 pointer-events-none"></div>

      {/* Title of the animation */}
      <h3 className="text-3xl font-bold text-blue-400 mb-3">
        {title}
      </h3>
      {/* Description of the animation */}
      <p className="text-gray-300 text-lg mb-8 leading-relaxed">
        {description}
      </p>
      
      {/* Container for the actual animated element */}
      <div className="flex-grow flex items-center justify-center w-full mb-8 min-h-[150px] relative z-10">
        {children} {/* This is where the motion.div or 3D canvas will go */}
      </div>

      {/* Code Snippet Section */}
      {codeSnippet && (
        <div className="w-full text-left bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm font-mono text-gray-200 overflow-x-auto relative z-10">
          <h4 className="font-semibold text-blue-300 mb-2">Code Logic:</h4>
          <pre><code>{codeSnippet}</code></pre>
        </div>
      )}
    </div>
  );
};

export default AnimationDescriptionCard;
