// Downloads a Learn article's diagram images and main text to ref/<slug>/ (ref/ is local only, never committed).
// Usage: node scripts/fetch-ref.mjs <from> <to>   (queue numbers, inclusive)
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const [from = 1, to = from] = process.argv.slice(2).map(Number);
const queue = readFileSync("work/queue.tsv", "utf8").trim().split(/\r?\n/).map((l) => l.split("\t"));
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "").replace(/<(h[1-4])[^>]*>/g, "\n\n## ").replace(/<li[^>]*>/g, "\n- ").replace(/<\/(p|div|tr)>/g, "\n").replace(/<[^>]+>/g, "")
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\n{3,}/g, "\n\n");

for (const [num, slug, url, title] of queue.filter(([n]) => +n >= from && +n <= to)) {
  const dir = join("ref", slug);
  mkdirSync(dir, { recursive: true });
  try {
    const page = await (await fetch(url.replace("learn.microsoft.com/", "learn.microsoft.com/en-us/"))).text();
    const main = page.match(/<main[\s\S]*<\/main>/)?.[0] ?? page;
    const imgs = [...main.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/g)].map((m) => ({ src: m[1], alt: (m[0].match(/alt="([^"]*)"/) || [])[1] ?? "" }))
      .filter((i) => /_images|\/images\/|media\//.test(i.src) && !/\/media\/index\/|icons?\/|github\.svg/.test(i.src));
    const links = [...main.matchAll(/href="([^"]+\.(?:vsdx|pptx|svg))"/g)].map((m) => m[1]);
    const got = [];
    for (const [i, im] of imgs.entries()) {
      const abs = new URL(im.src, url.replace("learn.microsoft.com/", "learn.microsoft.com/en-us/")).href;
      const ext = abs.split("?")[0].split(".").pop().toLowerCase();
      const f = join(dir, `img${i}.${ext}`);
      if (!existsSync(f)) writeFileSync(f, Buffer.from(await (await fetch(abs)).arrayBuffer()));
      got.push({ file: f, src: abs, alt: im.alt });
    }
    writeFileSync(join(dir, "article.txt"), strip(main));
    writeFileSync(join(dir, "meta.json"), JSON.stringify({ num, slug, url, title, images: got, downloads: links }, null, 1));
    console.log(num, slug, got.length, "images", got.map((g) => g.file.split(/[\\/]/).pop() + " :: " + g.alt.slice(0, 90)).join(" | "));
  } catch (e) { console.log(num, slug, "ERROR", e.message); }
}


