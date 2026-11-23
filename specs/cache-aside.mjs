// 077 Cache-Aside pattern.
export const meta = {
  num: 77,
  slug: "cache-aside",
  title: "Cache-Aside pattern",
  url: "https://learn.microsoft.com/azure/architecture/patterns/cache-aside",
  category: "Databases",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Cache (grid of items)": "table", "Data store (cylinder)": "sql-database", "Data store items": "table" },
  differences: ["The item grids are drawn as the table sketch icon; the red 'requested item' cell is described in a note instead."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, step } = k;
  txt("title", 40, 10, "Cache-Aside pattern", { size: 30 });
  box("app", 80, 100, 340, 150, "App", { size: 28 });
  card("cache", 80, 560, 340, 300, "table", "Cache", { size: 24 });
  arrow("r1", "cache", "top", 190, "app", "bottom", 190, [], { color: "#1971c2" });
  arrow("r3", "app", "bottom", 310, "cache", "top", 310, [], { color: "#1971c2" });
  step("s1", 120, 380, 1);
  step("s3", 340, 380, 3);
  group("store", 760, 380, 500, 520, null, { fill: TINT.white, stroke: "#1971c2" });
  txt("store-lbl", 900, 920, "Data store", { size: 26, color: "#1971c2" });
  card("items", 840, 520, 340, 280, "table", "Data items", { size: 20 });
  arrow("r2", "items", "top", 1010, "app", "right", 175, [], { color: "#1971c2" });
  step("s2", 1040, 230, 2);
  txt("note", 80, 980, "1 Check whether the item is in the cache.  2 If not, read it from the data store.  3 Store a copy in the cache.", { size: 18 });
  txt("footer", 40, 1040, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Cache-Aside pattern\"", { size: 20, color: "#495057" });
}
