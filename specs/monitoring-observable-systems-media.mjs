// 121 Build real-time monitoring and observable systems for media.
export const meta = {
  num: 121,
  slug: "monitoring-observable-systems-media",
  title: "Build real-time monitoring and observable systems for media",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/monitoring/monitoring-observable-systems-media",
  category: "Analytics",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Collect device telemetry (Azure Functions)": "function-apps", "Azure Event Hubs": "event-hubs", "Azure Blob Storage": "storage-accounts", "Azure Event Grid": "event-grid-topics" },
  differences: ["Users, client devices, applications and Fabric items (Eventstream, Eventhouse, Data Activator, Real-Time hub) drawn as labelled shapes; no sketch icons exist for them.", "Dashed diagonal from eventstream to Data Activator drawn orthogonally."],
};

export function draw(k) {
  const { TINT, txt, card, group, arrow, box, step } = k;
  const S = 16;
  box("users", 20, 160, 130, 70, "Users", { fill: TINT.onprem, size: S });
  step("s1a", 250, 40, 1);
  box("client", 200, 150, 160, 90, "Client devices\nwith players", { fill: TINT.onprem, size: S });
  box("apps", 200, 480, 160, 90, "Applications\nand services", { fill: TINT.onprem, size: S });
  step("s1b", 260, 600, 1);
  group("az", 515, 100, 965, 600, null, { fill: TINT.white, dashed: true });
  txt("az-lbl", 530, 112, "Azure", { size: 22 });
  group("fab", 880, 140, 580, 540, null, { fill: TINT.white, dashed: true, stroke: "#2b8a3e" });
  txt("fab-lbl", 900, 152, "Fabric", { size: 20 });
  card("fn", 550, 150, 170, 110, "function-apps", "Collect device\ntelemetry", { size: S });
  step("s2a", 730, 160, 2);
  card("eh", 690, 300, 160, 110, "event-hubs", "Azure Event\nHubs", { size: S });
  card("blob", 530, 470, 160, 110, "storage-accounts", "Azure Blob\nStorage", { size: S });
  step("s2b", 600, 600, 2);
  card("eg", 710, 470, 150, 110, "event-grid-topics", "Azure Event\nGrid", { size: S });
  box("es", 920, 470, 150, 110, "Ingest and\ntransform\neventstream", { fill: TINT.data, size: S });
  step("s3", 1020, 610, 3);
  box("eho", 1110, 470, 130, 110, "Eventhouse", { fill: TINT.data, size: S });
  box("da", 1110, 200, 130, 80, "Data\nActivator", { fill: TINT.data, size: S });
  step("s5", 1260, 220, 5);
  box("rti", 1280, 470, 140, 110, "Real-Time\nIntelligence\nhub", { fill: TINT.data, size: S });
  step("s4", 1330, 600, 4);
  arrow("a1", "users", "right", null, "client", "left", null, []);
  arrow("a2", "client", "right", 180, "fn", "left", 180, []);
  txt("a2-l1", 385, 150, "Telemetry", { size: S });
  txt("a2-l2", 385, 190, "HTTP trigger", { size: S });
  arrow("a3", "fn", "right", 230, "eh", "top", 790, []);
  arrow("a4", "eh", "left", 340, "blob", "top", 600, []);
  arrow("a5", "eh", "right", 340, "es", "top", 990, []);
  arrow("a6", "apps", "right", 520, "blob", "left", 520, []);
  txt("a6-l1", 375, 480, "Telemetry", { size: S });
  txt("a6-l2", 372, 535, "Connectors to\nBlob Storage or\nEvent Hubs", { size: S });
  arrow("a7", "blob", "right", null, "eg", "left", null, []);
  arrow("a8", "eg", "right", null, "es", "left", null, []);
  arrow("a9", "es", "right", null, "eho", "left", null, []);
  arrow("a10", "eho", "top", null, "da", "bottom", null, []);
  arrow("a11", "es", "top", 1040, "da", "left", 260, [], { dashed: true, head: null, color: "#868e96" });
  arrow("a12", "eho", "right", null, "rti", "left", null, []);
  txt("footer", 20, 730, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Near real-time monitoring and observability\"", { size: 20, color: "#495057" });
}
