import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({ base: "/azure-landing-zone-sketch/", plugins: [react()], build: { outDir: "docs", emptyOutDir: true } });
