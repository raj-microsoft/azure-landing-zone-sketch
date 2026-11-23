// 050 Use a message broker and events to integrate enterprise systems.
export const meta = {
  num: 50,
  slug: "queues-events",
  title: "Use a message broker and events to integrate enterprise systems",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/integration/queues-events",
  category: "Integration",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Client apps": "management-portal", "Microsoft Entra ID": "entra-connect", "API Gateway (API Management)": "api-management-services", "Logic app": "logic-apps", "Service Bus": "azure-service-bus", "Event Grid": "event-grid-topics", "SaaS / message-based service": "cloud-services-classic", "Azure services": "azure-a", "REST or SOAP web service": "globe-success", "Resource group": "resource-groups" },
  differences: ["Message and event links between logic apps and Service Bus/Event Grid are routed on separate lanes; the official diagram bundles them."],
};

export function draw(k) {
  const { TINT, txt, card, group, arrow, both } = k;
  txt("title", 60, 10, "Use a message broker and events to integrate enterprise systems", { size: 30 });
  card("cli", 60, 160, 200, 150, "management-portal", "Client apps");
  card("entra", 60, 760, 200, 160, "entra-connect", "Microsoft\nEntra ID");
  txt("auth-lbl", 150, 520, "Authentication", { size: 16 });

  group("rg", 400, 70, 1240, 1060, null, { fill: TINT.white, dashed: true, stroke: "#74c0fc", iconName: "resource-groups" });
  group("apim", 430, 130, 380, 320, "API Management", { fill: TINT.hub });
  card("gw", 490, 210, 260, 170, "api-management-services", "API Gateway");
  txt("https1", 290, 300, "HTTPS", { size: 16 });
  group("wf", 900, 130, 700, 500, "Workflow and orchestration", { fill: TINT.hub });
  card("la1", 940, 200, 220, 160, "logic-apps", "Logic app");
  card("la2", 1340, 200, 220, 160, "logic-apps", "Logic app");
  card("la3", 1140, 420, 220, 160, "logic-apps", "Logic app");
  group("q", 720, 700, 880, 340, null, { fill: TINT.hub });
  txt("q-lbl", 1060, 990, "Queues, topics, subscriptions, and events", { size: 16 });
  card("sb", 800, 790, 240, 180, "azure-service-bus", "Service Bus");
  card("eg", 1180, 790, 240, 180, "event-grid-topics", "Event Grid");

  txt("be-lbl", 1720, 90, "Back-end systems", { size: 22, color: "#1971c2" });
  card("saas", 1760, 160, 260, 160, "cloud-services-classic", "SaaS service");
  card("az", 1760, 420, 260, 160, "azure-a", "Azure services");
  card("msg", 1760, 760, 260, 180, "cloud-services-classic", "Message-based\nservice");
  card("rest", 1760, 1180, 260, 170, "globe-success", "REST or SOAP\nweb service", { size: 16 });

  arrow("c-gw", "cli", "right", 290, "gw", "left", 290);
  arrow("c-en", "cli", "bottom", 130, "entra", "top", 130, [], { dashed: true });
  arrow("gw-rest", "gw", "bottom", 560, "rest", "left", 1270, [1270]);
  txt("https4", 1100, 1220, "HTTPS", { size: 16 });
  arrow("la1-sb", "la1", "bottom", 1050, "sb", "left", 870, [660, 760], { dashed: true });
  arrow("sb-la2", "sb", "left", 920, "la2", "bottom", 1400, [740, 680, 1400], { dashed: true });
  arrow("eg-la3", "eg", "right", 830, "la3", "bottom", 1250, [1460, 660], { dashed: true });
  arrow("la2-saas", "la2", "right", 240, "saas", "left", 240);
  txt("https2", 1650, 200, "HTTPS", { size: 16 });
  arrow("la2-az", "la2", "right", 300, "az", "left", 460, [1630]);
  arrow("la3-saas", "la3", "right", 500, "saas", "bottom", 1890, [1680, 360]);
  txt("https3", 1690, 325, "HTTPS", { size: 16 });
  arrow("la3-az", "la3", "right", 540, "az", "left", 540);
  arrow("az-eg", "az", "bottom", 1890, "eg", "right", 880, [660, 1620], { dashed: true });
  txt("ev-lbl", 1660, 620, "Events", { size: 16 });
  arrow("eg-msg", "eg", "right", 930, "msg", "left", 930, [], { dashed: true });
  txt("msg-lbl", 1650, 945, "Messages", { size: 16 });
  both("msg-sb", "msg", "bottom", 1890, "sb", "bottom", 920, [1080], { dashed: true });
  txt("sp-lbl", 1180, 1090, "Send or pull messages", { size: 16 });

  txt("footer", 60, 1400, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Use a message broker and events to integrate enterprise systems\"", { size: 20, color: "#495057" });
}
