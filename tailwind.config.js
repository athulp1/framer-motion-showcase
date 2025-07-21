    // // tailwind.config.js
    // /** @type {import('tailwindcss').Config} */
    // export default {
    //   content: [
    //     // These paths tell Tailwind CSS where to scan for your utility classes.
    //     // It's crucial for Tailwind to know which files to look at to generate CSS.
    //     "./index.html", // For classes used in your main HTML file
    //     "./src/**/*.{js,ts,jsx,tsx}", // For classes used in all your React components (JS, TS, JSX, TSX files in src/)
    //   ],
    //   theme: {
    //     extend: {
    //       // Extend the default Tailwind theme.
    //       // We're adding a custom font family here.
    //       fontFamily: {
    //         // 'inter' is the custom name you'll use in your Tailwind classes (e.g., 'font-inter').
    //         // 'Inter' is the actual font name to be imported (e.g., from Google Fonts).
    //         // 'sans-serif' is a fallback font in case 'Inter' doesn't load.
    //         inter: ['Inter', 'sans-serif'],
    //       },
    //     },
    //   },
    //   plugins: [], // You can add Tailwind plugins here if needed in the future.
    // }
    












// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // These paths tell Tailwind CSS where to scan for your utility classes.
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom font family for a modern look
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
