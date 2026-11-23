// 097 Map requests to tenants in a multitenant solution.
export const meta = {
  num: 97,
  slug: "map-requests",
  title: "Map requests to tenants in a multitenant solution",
  url: "https://learn.microsoft.com/azure/architecture/guide/multitenant/considerations/map-requests",
  category: "Multitenancy",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Tenant": "users", "Web server": "server-farm", "Database": "sql-database" },
  differences: ["Tenant mapping is a plain labelled shape (conceptual component, no product)."],
};

export function draw(k) {
  const { TINT, txt, box, group, arrow } = k;
  txt("title", 40, 0, "Map requests to tenants", { size: 28 });
  ["A", "B", "C", "D"].forEach((t, i) => box(`t${t}`, 40, 110 + i * 120, 260, 90, `Tenant ${t}`, { size: 20, fill: TINT.sub, iconLeft: "users" }));
  txt("sol-lbl", 400, 60, "Your solution", { size: 20 });
  group("sol", 400, 95, 1060, 500, null, { fill: TINT.white });
  box("map", 430, 120, 220, 440, "Tenant\nmapping", { size: 20, fill: "#fff3bf" });
  ["A", "B", "C", "D"].forEach((t, i) => arrow(`a${t}`, `t${t}`, "right", 155 + i * 120, "map", "left", 155 + i * 120));
  [1, 2].forEach((d, i) => {
    const y = 120 + i * 230;
    txt(`d${d}-lbl`, 720, y, `Deployment ${d}`, { size: 20 });
    group(`d${d}`, 720, y + 40, 700, 160, null, { fill: TINT.mg });
    box(`ws${d}`, 750, y + 60, 300, 120, "Web server", { size: 18, iconLeft: "server-farm" });
    box(`db${d}`, 1090, y + 60, 300, 120, "Database", { size: 18, iconLeft: "sql-database" });
  });
  box("h1", 260, 680, 300, 60, "Tenant ID", { size: 18, fill: TINT.sub });
  box("h2", 580, 680, 300, 60, "Deployment ID", { size: 18, fill: TINT.sub });
  [["A", "1"], ["B", "1"], ["C", "2"], ["D", "2"]].forEach(([t, d], i) => {
    const f = i % 2 ? TINT.mg : TINT.sub;
    box(`r${i}a`, 260, 750 + i * 70, 300, 60, t, { size: 18, fill: f });
    box(`r${i}b`, 580, 750 + i * 70, 300, 60, d, { size: 18, fill: f });
  });
  arrow("a-tbl", "map", "bottom", 540, "h1", "top", 540);
  txt("footer", 40, 1060, "Pencil-sketch redraw of the Azure Architecture Center diagram \"map requests from tenants to deployments\"", { size: 20, color: "#495057" });
}
