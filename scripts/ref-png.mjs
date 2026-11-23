// Rasterises ref/<slug>/img*.svg to img*.png (width 1800) so the official diagram can be viewed. Local only.
// Usage: node scripts/ref-png.mjs <slug...>
import { createRequire } from "node:module";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
const require = createRequire("C:/repos/gh-pages-lab/azure-icons/package.json");
const sharp = require("sharp");
for (const slug of process.argv.slice(2)) {
  const dir = join("ref", slug);
  for (const f of readdirSync(dir).filter((f) => f.endsWith(".svg"))) {
    const out = join(dir, f.replace(/\.svg$/, ".view.png"));
    if (existsSync(out)) continue;
    try {
      await sharp(join(dir, f), { density: 144 }).resize({ width: 1800, withoutEnlargement: false }).flatten({ background: "#ffffff" }).png().toFile(out);
      console.log("ok", out);
    } catch (e) { console.log("ERR", out, e.message); }
  }
}
