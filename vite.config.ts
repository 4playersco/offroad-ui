import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import graphqlLoader from "vite-plugin-graphql-loader";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src"),
    },
  },
  plugins: [react(), graphqlLoader()],
});
