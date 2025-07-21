// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })




import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- CRITICAL FIX: Ensure 'base' path is EXACTLY '/your-repo-name/' ---
  // The 'base' option specifies the base URL for your deployed application.
  // For GitHub Pages, this should be your repository name, enclosed in slashes.
  base: '/framer-motion-showcase/', // <<< CONFIRM THIS IS EXACTLY '/framer-motion-showcase/'
  // ------------------------------------
})
