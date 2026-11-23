// 026 Basic Microsoft Foundry chat reference architecture.
export const meta = {
  num: 26,
  slug: "basic-microsoft-foundry-chat",
  title: "Basic Microsoft Foundry chat reference architecture",
  url: "https://learn.microsoft.com/azure/architecture/ai-ml/architecture/basic-microsoft-foundry-chat",
  category: "AI + machine learning",
  status: "done",
  otherDiagrams: [],
  substitutions: { "App Service built-in authentication (Easy Auth)": "entra-connect", "Microsoft Foundry resource": "ai-foundry", "Foundry Agent Service": "foundry-agent-service", "Azure AI Search": "cognitive-search", "Managed identity": "entra-managed-identities" },
  differences: [],
};

export function draw(k) {
  const { TINT, txt, card, group, step, arrow } = k;
  txt("title", 60, 10, "Basic Microsoft Foundry chat reference architecture", { size: 30 });
  card("user", 60, 360, 200, 150, "users", "User");
  group("as", 640, 220, 620, 520, null, { fill: TINT.mg });
  card("auth", 670, 260, 220, 170, "entra-connect", "App Service built-\nin authentication\n(Easy Auth)", { size: 16 });
  card("asp", 910, 260, 160, 170, "app-services", "App Service");
  card("mi1", 1090, 260, 150, 170, "entra-managed-identities", "Managed\nidentity", { size: 16 });
  card("inst", 910, 470, 180, 230, "app-services", "App\nService\ninstance", { stroke: "#f08c00" });
  group("mon", 640, 830, 360, 240, null, { fill: TINT.mg });
  txt("mon-t", 820, 1080, "Monitoring", { size: 18, align: "center" });
  card("ai", 660, 860, 150, 180, "application-insights", "Application\nInsights", { size: 16 });
  card("am", 830, 860, 150, 180, "monitor", "Azure\nMonitor", { size: 16 });
  group("mf", 1460, 60, 600, 960, "Microsoft Foundry", { fill: TINT.white, dashed: true, align: "center" });
  card("res", 1520, 110, 200, 200, "ai-foundry", "Microsoft\nFoundry\nresource");
  group("proj", 1490, 400, 540, 290, null, { fill: TINT.mg });
  txt("proj-t", 1760, 650, "Microsoft Foundry project", { size: 18, align: "center" });
  card("agent", 1520, 430, 200, 190, "foundry-agent-service", "Foundry\nAgent\nService");
  card("mi2", 1800, 430, 200, 160, "entra-managed-identities", "Managed\nidentities", { size: 16 });
  card("oai", 1520, 790, 200, 200, "azure-openai", "Azure\nOpenAI\nmodel");
  card("srch", 1860, 1100, 200, 200, "cognitive-search", "Azure AI\nSearch");

  arrow("f1", "user", "right", 435, "as", "left", 435);
  txt("f1-t", 290, 450, "https://domainname.azurewebsites.net", { size: 16 }); step("s1", 420, 380, 1);
  step("s2", 650, 450, 2);
  arrow("f3", "inst", "right", 560, "agent", "left", 560); step("s3", 1300, 500, 3);
  arrow("res-ag", "res", "bottom", 1620, "agent", "top", 1620, [], { dashed: true });
  arrow("f5", "agent", "bottom", 1620, "oai", "top", 1620); step("s5", 1650, 720, 5);
  arrow("f4", "proj", "bottom", 1960, "srch", "top", 1960); step("s4", 1980, 800, 4);
  step("s6", 800, 780, 6);

  txt("footer", 60, 1340, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Basic Microsoft Foundry chat reference architecture\"", { size: 20, color: "#495057" });
}
