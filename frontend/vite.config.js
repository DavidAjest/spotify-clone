// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        // Allow serving files from the node_modules directory
        "C:/Users/Win11 User/VsCode_2024/MERN/spotify-clone/node_modules/slick-carousel/slick/fonts",
        // Allow serving files from the frontend directory
        "C:/Users/Win11 User/VsCode_2024/MERN/spotify-clone/frontend",
      ],
    },
  },
});

//before using react-slick

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     fs: {
//       allow: [
//         // Allow serving files from the node_modules directory
//         'node_modules'
//       ]
//     }
//   }
// });
