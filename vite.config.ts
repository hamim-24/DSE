import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    // Disable minification for debugging
    minify: process.env.NODE_ENV === "production" ? "esbuild" : false,
    sourcemap: true,
    // Ensure proper chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  // Ensure proper handling of CSS
  css: {
    devSourcemap: true,
  },
  // Ensure proper handling of static assets
  assetsInclude: ["**/*.svg", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif"],

export default defineConfig({
  base: '/TeamenigmaSNIH202507/',
  // other config...
})