// 045 Basic enterprise integration on Azure.
export const meta = {
  num: 45,
  slug: "basic-enterprise-integration",
  title: "Basic enterprise integration on Azure",
  url: "https://learn.microsoft.com/azure/architecture/reference-architectures/enterprise-integration/basic-enterprise-integration",
  category: "Integration",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Microsoft Entra": "entra-connect", "Client (internet)": "globe-success", "Developer": "users", "API gateway (API Management)": "api-management-services", "Developer portal": "management-portal", "Logic Apps": "logic-apps", "Azure services": "azure-a", "SaaS services": "cloud-services-classic", "REST / SOAP web services": "gear", "Resource group": "resource-groups" },
  differences: [],
};

export function draw(k) {
  const { TINT, txt, card, group, arrow, step } = k;
  txt("title", 60, 10, "Basic enterprise integration on Azure", { size: 30 });
  card("entra", 80, 80, 200, 150, "entra-connect", "Microsoft\nEntra");
  step("s2", 300, 90, 2);
  card("web", 80, 520, 200, 150, "globe-success", "Client app");
  step("s1", 300, 460, 1);
  txt("auth-lbl", 200, 360, "Authentication", { size: 16 });
  txt("ca-lbl", 200, 760, "Create\napplication", { size: 16 });
  card("dev", 80, 920, 200, 150, "users", "Developer");
  txt("cons-lbl", 300, 1080, "Consume API\ndocumentation", { size: 16 });
  txt("http-lbl", 340, 610, "HTTP", { size: 16 });

  group("rg", 500, 240, 1060, 1000, "Resource group", { fill: TINT.white, dashed: true, stroke: "#74c0fc", iconName: "resource-groups" });
  group("apim", 560, 300, 400, 840, "API Management", { fill: TINT.mg });
  step("s3", 590, 380, 3);
  card("gw", 650, 480, 240, 170, "api-management-services", "API gateway");
  txt("pub-lbl", 600, 780, "Publish interfaces", { size: 16 });
  card("portal", 650, 870, 240, 170, "management-portal", "Developer portal");
  group("wf", 1060, 300, 400, 480, "Workflow and\norchestration", { fill: TINT.mg });
  step("s4", 1090, 420, 4);
  card("la", 1140, 480, 240, 170, "logic-apps", "Logic Apps");
  txt("pub2-lbl", 1180, 900, "Publish interfaces", { size: 16 });

  txt("be-lbl", 1720, 200, "Back-end systems", { size: 22 });
  card("az", 1720, 250, 300, 170, "azure-a", "Azure services");
  step("s5", 1610, 470, 5);
  card("saas", 1720, 470, 300, 170, "cloud-services-classic", "SaaS services");
  group("ws", 1720, 700, 300, 620, "Web services", { fill: TINT.white, align: "center" });
  card("rest", 1760, 770, 220, 220, "gear", "REST", { fill: TINT.mg });
  card("soap", 1760, 1040, 220, 220, "gear", "SOAP", { fill: TINT.mg });

  arrow("auth", "web", "top", 180, "entra", "bottom", 180, [], { dashed: true });
  arrow("gw-en", "gw", "top", 860, "entra", "right", 200, [200], { dashed: true });
  arrow("http", "web", "right", 595, "gw", "left", 595);
  arrow("gw-la", "gw", "right", 565, "la", "left", 565);
  arrow("la-az", "la", "right", 530, "az", "left", 335, [1600]);
  arrow("la-saas", "la", "right", 600, "saas", "left", 600);
  arrow("gw-ws", "gw", "right", 630, "ws", "left", 1290, [1000]);
  arrow("wf-pt", "wf", "bottom", 1120, "portal", "top", 790, [830], { dashed: true });
  arrow("ws-pt", "ws", "left", 955, "portal", "right", 955, [], { dashed: true });
  arrow("pt-dev", "portal", "left", 1000, "dev", "right", 1000, [], { dashed: true });
  arrow("dev-web", "dev", "top", 180, "web", "bottom", 180, [], { dashed: true });

  txt("footer", 60, 1370, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Basic enterprise integration on Azure\"", { size: 20, color: "#495057" });
}
