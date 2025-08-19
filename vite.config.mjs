import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// base conditionnelle : / en dev, /portfolio-nicolas/ sur GitHub Pages
export default defineConfig(({ mode }) => ({
    base: mode === "production" ? "/portfolio-nicolas/" : "/",
    plugins: [react()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)), // <= alias @ -> src
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:4000",
                changeOrigin: true,
            },
        },
    },
}));
