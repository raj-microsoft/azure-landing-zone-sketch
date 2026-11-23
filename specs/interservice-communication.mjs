// 144 Design interservice communication for microservices.
export const meta = {
  num: 144,
  slug: "interservice-communication",
  title: "Design interservice communication for microservices",
  url: "https://learn.microsoft.com/azure/architecture/microservices/design/interservice-communication",
  category: "Microservices",
  status: "done",
  otherDiagrams: ["img1: Supervisor microservice"],
  substitutions: {},
  differences: ["Conceptual diagram with no product icons; all nodes are labelled sketch shapes like the original.", "The single REST trunk from Scheduler is split into five offset lanes (overlapping arrows fail geometry)."],
};

export function draw(k) {
  const { TINT, txt, box, arrow, poly } = k;
  const S = 18;
  const E = { dashed: true };
  box("ing", 20, 400, 160, 80, "Ingestion", { fill: TINT.sub, size: S });
  box("sch", 380, 420, 180, 90, "Scheduler", { fill: TINT.sub, size: S });
  box("sup", 380, 640, 180, 90, "Supervisor", { fill: TINT.sub, size: S });
  const svc = [["acc", "Account"], ["tpt", "3rd Party\nTransport"], ["pkg", "Package"], ["drn", "Drone"], ["del", "Delivery"]];
  svc.forEach(([id, l], i) => box(id, 760, 20 + i * 190, 180, 100, l, { fill: TINT.sub, size: S }));
  box("dh", 1100, 780, 180, 100, "Delivery\nHistory", { fill: TINT.sub, size: S });
  arrow("e1", "ing", "right", 440, "sch", "left", 440, [], E);
  arrow("e2", "sch", "bottom", 470, "sup", "top", 470, [], E);
  arrow("r1", "sch", "right", 450, "acc", "left", 70, [660], {});
  arrow("r2", "sch", "right", 470, "tpt", "left", 260, [680], {});
  arrow("r3", "sch", "right", 490, "pkg", "left", 450, [700], {});
  arrow("r4", "sch", "right", 500, "drn", "left", 640, [700], {});
  arrow("r5", "sch", "right", 495, "del", "left", 830, [660], {});
  arrow("e3", "drn", "bottom", 850, "del", "top", 850, [], E);
  arrow("e4", "del", "right", 830, "dh", "left", 830, [], E);
  poly("lg1", [[20, 640], [180, 640]], { head: true });
  txt("lg1-t", 200, 625, "REST API", { size: S });
  poly("lg2", [[20, 720], [180, 720]], { head: true, dashed: true });
  txt("lg2-t", 200, 705, "Event", { size: S });
  txt("footer", 20, 940, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Drone communication\"", { size: 20, color: "#495057" });
}
