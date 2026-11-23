// 081 Azure API Management landing zone architecture.
export const meta = {
  num: 81,
  slug: "app-gateway-internal-api-management-function",
  title: "Azure API Management landing zone architecture",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/integration/app-gateway-internal-api-management-function",
  category: "Integration",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Subscription": "subscriptions", "Public IP addresses": "public-ip-addresses", "Application Gateway": "application-gateways", "Web Application Firewall policies (WAF)": "web-application-firewall-policies-waf", "API Management (Premium)": "api-management-services", "Private endpoint": "private-endpoints", "Key vaults": "key-vaults", "Log Analytics workspaces": "log-analytics-workspaces", "Application Insights": "application-insights", "azure-api.net (DNS)": "dns-zones", "Virtual network / subnets": "virtual-networks" },
  differences: ["Subnet NSG shields are omitted; each subnet icon and label sits below its subnet as in the original."],
};

export function draw(k) {
  const { TINT, txt, card, group, arrow, both, icon } = k;
  const M = { size: 16 };
  txt("title", 40, 10, "Azure API Management: secure baseline", { size: 30 });
  card("sub", 40, 90, 200, 160, "subscriptions", "Subscription", M);
  card("pip", 40, 360, 200, 160, "public-ip-addresses", "Public IP\naddresses", M);

  group("vnet", 300, 80, 1880, 960, null, { fill: TINT.white });
  icon("vnet-i", "virtual-networks", 330, 100, 56);
  txt("vnet-lbl", 1000, 110, "Azure API Management - Secure baseline", { size: 22 });

  group("ags", 360, 200, 520, 440, null, { fill: "#f1f3f5", stroke: "#adb5bd" });
  card("ag", 390, 280, 220, 180, "application-gateways", "Application\nGateway", M);
  card("waf", 640, 380, 220, 200, "web-application-firewall-policies-waf", "Web Application\nFirewall policies\n(WAF)", M);
  box2("agsl", 560, 680, "Application Gateway\nsubnet");

  group("apims", 960, 200, 520, 440, null, { fill: "#f1f3f5", stroke: "#adb5bd" });
  card("apim", 1110, 280, 240, 200, "api-management-services", "API Management\n(Premium)", M);
  box2("apsl", 1280, 680, "API Management\nsubnet");

  group("pes", 1560, 200, 520, 440, null, { fill: "#f1f3f5", stroke: "#adb5bd" });
  card("pe", 1700, 280, 240, 180, "private-endpoints", "Private endpoint", M);
  box2("pesl", 1960, 680, "Private endpoint\nsubnet");

  arrow("pip-ag", "pip", "right", 400, "ag", "left", 400, [], { color: "#1c7ed6" });
  both("ag-apim", "ag", "right", 330, "apim", "left", 330, [], { color: "#1c7ed6" });
  card("kv", 1710, 820, 220, 180, "key-vaults", "Key vaults", M);
  arrow("pe-kv", "pe", "bottom", null, "kv", "top", null, [], { color: "#1c7ed6" });

  card("la", 620, 820, 220, 180, "log-analytics-workspaces", "Log Analytics\nworkspaces", M);
  card("ai", 880, 820, 220, 180, "application-insights", "Application Insights", M);
  card("dns", 1140, 820, 220, 180, "dns-zones", "azure-api.net", M);

  function box2(id, x, y, label) {
    icon(`${id}-ic`, "virtual-networks", x - 70, y, 48);
    txt(id, x, y, label, { size: 18 });
  }
  txt("footer", 40, 1080, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Azure API Management secure baseline\"", { size: 20, color: "#495057" });
}
