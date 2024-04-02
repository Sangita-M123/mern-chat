import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target:
          "https://2484d1d7-965f-4234-9c16-685119e29ddb-00-3vnfkc3kz4k62.sisko.replit.dev",
      },
    },
  },
});
