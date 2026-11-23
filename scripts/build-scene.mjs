// Builds every scene from specs/<slug>.mjs into public/scenes/<slug>.excalidraw and writes public/scenes/index.json
// (all 148 queue entries plus the featured landing zone; entries without a finished spec are "pending").
// Usage: node scripts/build-scene.mjs [slug...]   (default: all specs)
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, copyFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { createScene, SRC } from "./lib/sketch.mjs";
import { checkScene } from "./check-geometry.mjs";

const OUT = "public/scenes";
mkdirSync(OUT, { recursive: true });
const only = process.argv.slice(2);
const specFiles = readdirSync("specs").filter((f) => f.endsWith(".mjs") && !f.startsWith("_"));
const idxPath = join(OUT, "index.json");
const prev = existsSync(idxPath) ? JSON.parse(readFileSync(idxPath, "utf8")) : { scenes: [] };
const prevBy = new Map(prev.scenes.map((s) => [s.slug, s]));
const built = new Map();
const allIcons = new Set();
let bad = 0;

for (const f of specFiles) {
  const spec = await import(pathToFileURL(join("specs", f)).href);
  const { meta } = spec;
  if (only.length && !only.includes(meta.slug)) {
    const p = prevBy.get(meta.slug);
    if (p) built.set(meta.slug, { ...p, ...entryMeta(meta), checks: p.checks });
    for (const i of p?.icons ?? []) allIcons.add(i);
    continue;
  }
  const k = createScene({ seed: meta.seed ?? 4100 });
  spec.draw(k);
  const { scene, usedIcons } = k.finish();
  writeFileSync(join(OUT, `${meta.slug}.excalidraw`), JSON.stringify(scene));
  const r = checkScene(scene);
  if (!r.pass) { bad++; console.log(r.fail.join("\n")); }
  console.log(`${r.pass ? "PASS" : "FAIL"} ${meta.slug}: ${r.summary}; icons=${usedIcons.join(",")}`);
  usedIcons.forEach((i) => allIcons.add(i));
  built.set(meta.slug, { ...entryMeta(meta), icons: usedIcons, checks: { geometry: r.pass ? "PASS" : `FAIL (${r.fail.length})`, summary: r.summary, ...(meta.checks ?? {}) } });
}

function entryMeta(m) {
  return {
    slug: m.slug, title: m.title, url: m.url, category: m.category, status: m.status ?? "pending", featured: !!m.featured,
    num: m.num ?? null, otherDiagrams: m.otherDiagrams ?? [], substitutions: m.substitutions ?? {}, differences: m.differences ?? [],
  };
}

// queue -> category from the Learn path
const CAT = [
  [/\/ai-ml\/|\/ai\/|openai|quantum/, "AI + machine learning"], [/\/hybrid\/|hybrid-networking|azure-local/, "Hybrid + multicloud"],
  [/mainframe|unix-migration/, "Mainframe + migration"], [/\/databases\/|relational-data|\/data\/|analytics|hadoop|dataplate/, "Databases + analytics"],
  [/networking|dmz/, "Networking"], [/containers|aks|aro|microservices|orchestration|gitops/, "Containers + microservices"],
  [/web-apps|\/apps\/|app-modernization|api-management|serverless/, "Web + apps"], [/integration|devops|monitoring/, "Integration + DevOps"],
  [/security|identity|forensics|certificate/, "Security + identity"], [/sap/, "SAP"], [/iot|manufacturing/, "IoT + manufacturing"],
  [/file-storage|virtual-machines|infrastructure|spot|sas/, "Infrastructure + storage"], [/aws/, "Multicloud"],
];
export const categoryOf = (url) => (CAT.find(([re]) => re.test(url)) ?? [null, "Design guidance"])[1];

const queue = readFileSync("work/queue.tsv", "utf8").trim().split(/\r?\n/).map((l) => l.split("\t"));
const scenes = [];
const seenUrl = new Map();
const lz = built.get("azure-landing-zone");
if (lz) scenes.push(lz);
for (const [num, slug, url, title] of queue) {
  const b = built.get(slug);
  const base = { slug, title, url, category: categoryOf(url), num: +num, status: "pending", featured: false, otherDiagrams: [], substitutions: {}, differences: [], icons: [], checks: {} };
  // The queue lists some articles twice under different slugs; draw once and mark the repeat.
  if (!b && seenUrl.has(url)) { scenes.push({ ...base, status: "duplicate", duplicateOf: seenUrl.get(url) }); continue; }
  seenUrl.set(url, slug);
  scenes.push(b ? { ...base, ...b, num: +num, category: b.category ?? base.category } : base);
}
const listed = scenes.filter((s) => s.status !== "duplicate");
writeFileSync(idxPath, JSON.stringify({ updated: new Date().toISOString().slice(0, 10), count: listed.length, done: listed.filter((s) => s.status === "done").length, scenes }, null, 1));

// keep public/icons in sync with every icon used by any scene (reference copies of the sketch SVGs)
mkdirSync("public/icons", { recursive: true });
for (const n of allIcons) copyFileSync(join(SRC, "sketchnote-gpt/svg", `${n}.svg`), join("public/icons", `${n}.svg`));
console.log(`index: ${scenes.length} entries, ${scenes.filter((s) => s.status === "done").length} done`);
if (bad) process.exit(1);
