import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync, readdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

// docs/videos holds the explainer videos (committed once, ~740 MB), so the build must not wipe it.
// Instead of emptyOutDir, clear everything in the output folder except videos/.
const KEEP = new Set(["videos"]);
const keepVideos = (outDir) => ({
  name: "keep-videos",
  apply: "build",
  buildStart() {
    const dir = resolve(outDir);
    if (!existsSync(dir)) return;
    for (const f of readdirSync(dir)) if (!KEEP.has(f)) rmSync(join(dir, f), { recursive: true, force: true });
  },
});

export default defineConfig(({ mode }) => {
  const outDir = process.env.SKETCH_OUT || "docs";
  return { base: "/azure-landing-zone-sketch/", plugins: [react(), keepVideos(outDir)], build: { outDir, emptyOutDir: false } };
});
