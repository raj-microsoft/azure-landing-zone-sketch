// 089 API gateways (microservices design).
export const meta = {
  num: 89,
  slug: "gateway",
  title: "Use API gateways in microservices",
  url: "https://learn.microsoft.com/azure/architecture/microservices/design/gateway",
  category: "Containers + microservices",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Client apps": "devices", "Routing / aggregation documents": "code" },
  differences: ["Diagonal routes to Service A and Service B are drawn orthogonally.", "The TLS padlock is a plain labelled shape; the gateway box is a labelled shape (platform or custom, no product icon)."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, icon, arrow, step } = k;
  txt("title", 40, 10, "API gateway", { size: 30 });
  box("idp", 760, 70, 320, 120, "Identity Provider\nAuthentication\nand Authorization", { size: 18 });
  box("tls", 300, 260, 300, 120, "TLS operations:\noffloading\nmTLS authentication", { size: 18, fill: TINT.mg });
  group("gw", 680, 300, 1180, 600, null, { fill: TINT.white });
  box("routing", 1060, 340, 240, 70, "Routing", { size: 18, fill: TINT.mg });
  icon("r-doc", "code", 1080, 430, 56);
  box("api", 760, 540, 340, 140, "API gateway\nPlatform or custom", { size: 20, fill: "#d0ebff" });
  box("sa", 1500, 360, 320, 140, "Service A", { size: 20 });
  box("sb", 1500, 700, 320, 140, "Service B", { size: 20 });
  icon("a-doc1", "code", 1080, 710, 56);
  txt("a-dots", 1150, 730, "...", { size: 20 });
  icon("a-doc2", "code", 1190, 710, 56);
  box("agg", 1060, 790, 240, 70, "Aggregation", { size: 18, fill: TINT.mg });
  card("client", 60, 520, 200, 180, "devices", "Client apps", { size: 18 });
  box("lock", 420, 575, 120, 60, "TLS lock", { size: 16, fill: TINT.mg });
  arrow("a-in1", "client", "right", 605, "lock", "left", 605);
  arrow("a-in2", "lock", "right", 605, "api", "left", 605);
  arrow("a-sa", "api", "right", 580, "sa", "left", 430, [1400]);
  arrow("a-sb", "api", "right", 640, "sb", "left", 770, [1440]);
  box("cache", 300, 860, 300, 110, "Response\ncaching", { size: 18, fill: TINT.mg });
  arrow("a-cache", "api", "bottom", 820, "cache", "top", 450, [790]);
  box("mon", 760, 1000, 320, 120, "Monitoring\nLogging\nand Metrics", { size: 18 });
  arrow("a-idp", "api", "top", 920, "idp", "bottom", 920, [], { dashed: true, tail: "arrow" });
  arrow("a-mon", "api", "bottom", 980, "mon", "top", 980, [], { dashed: true, tail: "arrow" });
  txt("footer", 40, 1160, "Pencil-sketch redraw of the Azure Architecture Center diagram \"API gateway\"", { size: 20, color: "#495057" });
}
