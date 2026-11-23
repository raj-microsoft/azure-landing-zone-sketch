// 128 Messaging Bridge pattern.
export const meta = {
  num: 128,
  slug: "messaging-bridge",
  title: "Messaging Bridge pattern",
  url: "https://learn.microsoft.com/azure/architecture/patterns/messaging-bridge",
  category: "Design patterns",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Service Bus queues": "azure-service-bus", "Azure Functions": "function-apps", "Web app": "app-services", "Container app": "worker-container-app" },
  differences: ["Legacy MSMQ endpoints, MSMQ queues and the bridge drawn as labelled shapes (no sketch icons).", "Envelope glyphs replaced by 'message' labels; diagonal arrows drawn orthogonally."],
};

export function draw(k) {
  const { TINT, txt, card, box, arrow } = k;
  const S = 16;
  const Y = { color: "#e67700" };
  box("ep1", 20, 160, 200, 80, "Legacy endpoint\n+ MSMQ queue", { fill: TINT.onprem, size: S });
  box("ep2", 20, 420, 200, 80, "Legacy endpoint\n+ MSMQ queue", { fill: TINT.onprem, size: S });
  box("mq", 320, 300, 160, 80, "MSMQ queue", { fill: TINT.onprem, size: S });
  box("bridge", 520, 300, 160, 80, "Messaging\nbridge", { fill: TINT.warn, size: S });
  card("sb1", 720, 290, 150, 100, "azure-service-bus", "Service Bus\nqueue", { size: S });
  card("sb2", 900, 120, 150, 100, "azure-service-bus", "Service Bus\nqueue", { size: S });
  card("fn", 1090, 20, 150, 100, "function-apps", "Azure\nFunctions", { size: S });
  card("sb3", 1100, 400, 150, 100, "azure-service-bus", "Service Bus\nqueue", { size: S });
  card("web", 1290, 400, 150, 100, "app-services", "Web app", { size: S });
  card("sb4", 880, 560, 150, 100, "azure-service-bus", "Service Bus\nqueue", { size: S });
  card("ca", 880, 700, 150, 110, "worker-container-app", "Container app", { size: S });
  arrow("a1", "ep1", "bottom", null, "ep2", "top", null, [], Y);
  txt("a1-l", 130, 320, "message", { size: S, color: "#1971c2" });
  arrow("a2", "ep1", "right", null, "mq", "top", 400, [], Y);
  txt("a2-l", 260, 170, "message", { size: S, color: "#1971c2" });
  arrow("a3", "bridge", "right", null, "sb1", "left", null, [], { head: null, color: "#495057" });
  arrow("a3b", "mq", "right", null, "bridge", "left", null, [], { head: null, color: "#495057" });
  arrow("a4", "sb1", "top", null, "sb2", "left", null, [], Y);
  txt("a4-l", 690, 200, "message", { size: S, color: "#1971c2" });
  arrow("a5", "sb3", "top", null, "sb2", "right", null, [], Y);
  txt("a5-l", 1190, 260, "message", { size: S, color: "#1971c2" });
  arrow("a6", "sb4", "right", null, "sb3", "bottom", null, [], Y);
  txt("a6-l", 1060, 580, "message", { size: S, color: "#1971c2" });
  arrow("a7", "sb2", "top", 975, "fn", "left", 70, [], { head: null, color: "#495057" });
  arrow("a8", "sb3", "right", null, "web", "left", null, [], { head: null, color: "#495057" });
  arrow("a9", "sb4", "bottom", null, "ca", "top", null, [], { head: null, color: "#495057" });
  txt("footer", 20, 850, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Messaging Bridge integrating MSMQ and Service Bus\"", { size: 20, color: "#495057" });
}
