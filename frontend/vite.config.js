import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config. The dev server proxies /api to the FastAPI backend (port 8000).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
