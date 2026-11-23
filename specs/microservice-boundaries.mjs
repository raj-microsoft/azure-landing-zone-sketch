// 142 Identify microservice boundaries.
export const meta = {
  num: 142,
  slug: "microservice-boundaries",
  title: "Identify microservice boundaries",
  url: "https://learn.microsoft.com/azure/architecture/microservices/model/microservice-boundaries",
  category: "Microservices",
  status: "done",
  otherDiagrams: ["img1: Drone Delivery microservices design"],
  substitutions: {},
  differences: ["Conceptual diagram with no product icons; diagonal arrows from Scheduler drawn orthogonally."],
};

export function draw(k) {
  const { TINT, txt, box, group, arrow } = k;
  const S = 18;
  box("acc", 760, 20, 200, 80, "Accounts", { fill: TINT.onprem, size: S });
  box("tpt", 1040, 110, 220, 80, "Third-party\ntransportation", { fill: TINT.onprem, size: S });
  group("ctx", 20, 240, 960, 520, null, { fill: TINT.white, stroke: "#1971c2" });
  txt("ctx-l", 380, 780, "Shipping bounded context", { size: 20 });
  box("sch", 80, 300, 200, 90, "Scheduler", { fill: TINT.sub, size: S });
  box("pkg", 520, 430, 200, 90, "Package", { fill: TINT.sub, size: S });
  box("del", 320, 620, 200, 90, "Delivery", { fill: TINT.sub, size: S });
  box("dh", 680, 620, 200, 90, "Delivery\nhistory", { fill: TINT.sub, size: S });
  box("dm", 1100, 300, 200, 90, "Drone\nmanagement", { fill: TINT.onprem, size: S });
  arrow("a1", "sch", "top", 180, "acc", "left", 60, [], {});
  arrow("a2", "sch", "top", 230, "tpt", "left", 150, [], {});
  arrow("a3", "sch", "right", 345, "dm", "left", 345, [], {});
  arrow("a4", "sch", "right", 370, "pkg", "left", 475, [400], {});
  arrow("a5", "sch", "bottom", 180, "del", "left", 665, [], {});
  arrow("a6", "del", "right", 665, "dh", "left", 665, [], {});
  txt("footer", 20, 840, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Bounded contexts\"", { size: 20, color: "#495057" });
}
