// 027 Baseline Microsoft Foundry chat reference architecture in an Azure landing zone.
export const meta = {
  num: 27,
  slug: "baseline-microsoft-foundry-landing-zone",
  title: "Baseline Microsoft Foundry chat reference architecture in an Azure landing zone",
  url: "https://learn.microsoft.com/azure/architecture/ai-ml/architecture/baseline-microsoft-foundry-landing-zone",
  category: "AI + machine learning",
  status: "done",
  otherDiagrams: ["Network ingress flows", "Network egress flows"],
  substitutions: { "Knowledge store": "storage-accounts", "Azure AI Search": "cognitive-search", "Microsoft Foundry": "ai-foundry", "Build agents / jump boxes": "virtual-machine", "Spoke / Hub virtual network": "virtual-networks", "User-defined route": "route-tables", "Org policy assignments": "policy", "Role assignments": "entra-identity-roles-and-administrators", "Defender for Cloud": "microsoft-defender-for-cloud", "Azure DNS Private Resolver": "dns-private-resolver", "VPN Gateway / ExpressRoute": "virtual-network-gateways", "Managed identity": "entra-managed-identities" },
  differences: [
    "Private endpoints are one row of labelled cards; the many crossing lines from endpoints to resources are reduced to one link per resource.",
    "Platform services (cost, policy, Defender, roles) are compact icon boxes.",
  ],
};

export function draw(k) {
  const { TINT, txt, box, card, group, arrow, line } = k;
  const E = { dashed: true, color: "#e8590c" };
  txt("title", 60, 10, "Baseline Microsoft Foundry chat in an Azure landing zone", { size: 30 });
  box("wlz", 300, 60, 380, 80, "Workload landing zone\nsubscription", { fill: "#4dabf7", size: 20 });
  txt("leg", 720, 70, "Black: protected ingress\nOrange dashed: controlled egress", { size: 18 });
  card("users", 40, 230, 180, 150, "users", "Users");
  group("wl", 300, 150, 2080, 1240, "Workload resources", { fill: TINT.sub, size: 22 });
  group("agwz", 330, 210, 360, 200, null, { fill: TINT.white });
  box("agw", 340, 220, 340, 180, "Application Gateway +\nWeb Application Firewall\n(zone-redundant)", { iconLeft: "application-gateways", size: 16 });
  card("jb", 330, 430, 360, 170, "virtual-machine", "Build agents / Jump boxes");
  group("net", 330, 620, 360, 210, "Networking", { fill: TINT.white });
  box("n-pe", 340, 660, 165, 70, "Private\nendpoints", { iconLeft: "private-endpoints", size: 16 });
  box("n-sn", 515, 660, 165, 70, "Subnets", { iconLeft: "subnet", size: 16 });
  box("n-nsg", 340, 745, 340, 70, "Network security groups", { iconLeft: "network-security-groups", size: 16 });
  group("mon", 330, 850, 360, 180, "Monitoring", { fill: TINT.white });
  box("m-la", 340, 895, 165, 120, "Log Analytics\nworkspace", { iconLeft: "log-analytics-workspaces", size: 16 });
  box("m-ds", 515, 895, 165, 120, "Diagnostic\nsettings", { iconLeft: "diagnostics-settings", size: 16 });

  group("asint", 760, 170, 240, 110, "App Service\nintegration subnet", { fill: TINT.white, size: 16, iconName: "subnet", iconSize: 28 });
  group("faint", 1300, 170, 260, 110, "Foundry Agent Service\nintegration subnet", { fill: TINT.white, size: 16, iconName: "subnet", iconSize: 28 });
  group("pesn", 760, 300, 1100, 235, null, { fill: TINT.white });
  txt("pesn-t", 1150, 495, "Private endpoints subnet", { size: 16 });
  const pes = [["pe-as", "Azure App\nService"], ["pe-st", "Azure\nStorage"], ["pe-kv", "Azure Key\nVault"], ["pe-mf", "Microsoft\nFoundry"], ["pe-ks", "Knowledge\nstore"], ["pe-sr", "Azure AI\nSearch"], ["pe-cos", "Azure\nCosmos DB"], ["pe-st2", "Azure\nStorage"]];
  pes.forEach(([id, l], i) => card(id, 775 + i * 135, 340, 125, 145, "private-endpoints", l, { size: 16 }));

  group("asp", 760, 540, 520, 790, null, { fill: TINT.mg });
  card("mi", 775, 560, 150, 140, "entra-managed-identities", "Managed\nidentity", { size: 16 });
  card("app", 960, 560, 280, 140, "app-services", "App Service (Chat UI)");
  ["Zone 1", "Zone 2", "Zone 3"].forEach((z, i) => card(`inst${i + 1}`, 775 + i * 165, 760, 150, 280, "app-services", `App Service\ninstance\n${z}`, { size: 16, stroke: "#f08c00" }));
  card("st", 1290, 540, 160, 170, "storage-accounts", "Azure\nStorage", { size: 16 });
  txt("st-t", 1290, 720, "Storage for\nclient app\ndeployment", { size: 16 });
  card("kv", 1470, 540, 160, 170, "key-vaults", "Azure Key\nVault", { size: 16 });
  card("sr", 1650, 540, 150, 170, "cognitive-search", "Azure AI\nSearch", { size: 16 });

  group("fp", 1920, 170, 420, 520, null, { fill: TINT.white, dashed: true });
  group("fproj", 1940, 190, 260, 200, "Foundry project", { fill: TINT.mg, size: 16 });
  card("fas", 1960, 230, 220, 140, "foundry-agent-service", "Foundry Agent\nService", { size: 16 });
  card("oai", 1960, 470, 220, 190, "azure-openai", "Azure OpenAI\nmodel");
  card("mf", 2210, 300, 120, 170, "ai-foundry", "Microsoft\nFoundry", { size: 16 });
  group("fdep", 1720, 760, 620, 300, null, { fill: TINT.white, dashed: true });
  txt("fdep-t", 2030, 1020, "Foundry Agent Service dependencies", { size: 16, align: "center" });
  card("d-sr", 1740, 790, 180, 210, "cognitive-search", "Azure AI\nSearch", { size: 16 });
  card("d-cos", 1940, 790, 180, 210, "azure-cosmos-db", "Azure\nCosmos DB", { size: 16 });
  card("d-st", 2140, 790, 180, 210, "storage-accounts", "Azure\nStorage", { size: 16 });

  group("sv", 300, 1430, 1300, 330, "Subscription vending provisioned resources", { fill: TINT.mg, size: 22 });
  card("v-mg", 320, 1490, 230, 170, "management-groups", "Management group\nplacement", { size: 16 });
  card("v-sp", 570, 1490, 240, 170, "virtual-networks", "Spoke virtual network\n(DNS provided by hub)", { size: 16 });
  card("v-udr", 830, 1490, 260, 170, "route-tables", "User-defined route\n(to regional hub firewall)", { size: 16 });
  card("v-cost", 1120, 1480, 220, 130, "cost-management", "Cost management", { size: 16 });
  card("v-def", 1360, 1480, 220, 130, "microsoft-defender-for-cloud", "Defender for\nCloud enrollment", { size: 16 });
  card("v-pol", 1120, 1620, 220, 130, "policy", "Org policy\nassignments", { size: 16 });
  card("v-role", 1360, 1620, 220, 130, "entra-identity-roles-and-administrators", "Role\nassignments", { size: 16 });

  group("conn", 300, 1880, 1300, 690, "Connectivity subscription", { fill: TINT.subBox, stroke: "#f59f00", size: 20 });
  txt("plz-t", 1250, 2510, "Platform landing zone\nsubscription", { size: 18 });
  card("hub", 360, 1950, 520, 150, "virtual-networks", "Hub virtual network, Region n", { fill: TINT.hub });
  box("fw", 420, 2140, 300, 70, "Azure Firewall", { iconLeft: "firewalls", size: 18 });
  box("bas", 420, 2220, 300, 70, "Azure Bastion", { iconLeft: "bastions", size: 18 });
  box("vpn", 420, 2300, 300, 100, "VPN Gateway\nor ExpressRoute", { iconLeft: "virtual-network-gateways", size: 18 });
  box("pdns", 960, 1940, 400, 80, "Private DNS zones\nfor Private Link", { iconLeft: "dns-zones", size: 18 });
  box("res", 960, 2035, 400, 100, "Azure DNS Private Resolver\n(linked rulesets)", { iconLeft: "dns-private-resolver", size: 18 });
  box("ddos", 960, 2230, 400, 80, "Azure DDoS Protection", { iconLeft: "ddos-protection-plans", size: 18 });
  box("c-role", 960, 2330, 195, 70, "Role\nassignments", { iconLeft: "entra-identity-roles-and-administrators", size: 16 });
  box("c-pol", 1165, 2330, 195, 70, "Policy\nassignments", { iconLeft: "policy", size: 16 });
  box("c-nw", 960, 2415, 195, 70, "Network\nWatcher", { iconLeft: "network-watcher", size: 16 });
  box("c-def", 1165, 2415, 195, 70, "Defender\nfor Cloud", { iconLeft: "microsoft-defender-for-cloud", size: 16 });

  arrow("in1", "users", "right", 305, "agw", "left", 305);
  arrow("in2", "agw", "right", 380, "pe-as", "left", 380, [745]);
  line("pe-app", "pe-as", "bottom", 840, "asp", "top", 840);
  line("pe-st-l", "pe-st", "bottom", 970, "st", "top", 1370, [520]);
  line("pe-kv-l", "pe-kv", "bottom", 1105, "kv", "top", 1550, [528]);
  line("pe-sr-l", "pe-sr", "bottom", 1512, "sr", "top", 1725, [520]);
  line("pe-fd-l", "pe-st2", "bottom", 1820, "fdep", "top", 1820);
  arrow("e1", "asint", "bottom", 970, "pe-st", "top", 970, [], E);
  arrow("e2", "asint", "right", 225, "pe-mf", "top", 1240, [1240], E);
  arrow("e3", "faint", "bottom", 1380, "pe-ks", "top", 1380, [], E);
  arrow("e4", "faint", "right", 225, "pe-sr", "top", 1520, [1520], E);
  arrow("e5", "faint", "right", 250, "pe-cos", "top", 1655, [1655], E);
  arrow("e6", "faint", "right", 265, "pe-st2", "top", 1790, [1790], E);
  arrow("pe-mf-fp", "pe-mf", "top", 1270, "fproj", "top", 2070, [140], { color: "#1971c2" });
  arrow("fas-int", "fproj", "left", 290, "faint", "right", 200, [1900], { color: "#1971c2" });
  line("fas-oai", "fas", "bottom", 2070, "oai", "top", 2070);
  arrow("egress", "wl", "bottom", 1650, "fw", "right", 2182, [2182], E);
  txt("eg-t", 1670, 1790, "Egress and DNS requests", { size: 16 });
  line("peer", "v-sp", "bottom", 690, "hub", "top", 690);
  txt("peer-t", 710, 1800, "Virtual network peering", { size: 16 });

  txt("footer", 60, 2610, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Baseline Microsoft Foundry chat reference architecture in an Azure landing zone\"", { size: 20, color: "#495057" });
}
