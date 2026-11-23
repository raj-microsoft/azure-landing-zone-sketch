// 024 Use Application Gateway for Containers with a multitenant AKS cluster.
export const meta = {
  num: 24,
  slug: "aks-agc",
  title: "Use Application Gateway for Containers with a multitenant Azure Kubernetes Service cluster",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/aks-agic/aks-agc",
  category: "Containers",
  status: "done",
  otherDiagrams: ["Multitenant AKS with per-tenant namespaces fronted by Application Gateway for Containers"],
  substitutions: { "Client application / Internet browser": "browser", "Azure recursive resolvers": "dns-zones", "Application Gateway for Containers": "application-gateway-containers" },
  differences: [
    "NSG shields are noted in the subnet titles instead of as icons.",
    "Azure-provided DNS and service pods are plain shapes (no sketch icon).",
    "Arrow colours follow the original legend; routes are orthogonal.",
  ],
};

export function draw(k) {
  const { TINT, txt, box, card, group, arrow } = k;
  const C = { https: "#1e1e1e", diag: "#868e96", dns: "#2f9e44", pc: "#1c7ed6", link: "#e8a500" };
  txt("title", 60, 10, "Application Gateway for Containers with a multitenant AKS cluster", { size: 30 });
  group("leg", 60, 90, 420, 230, "Legend", { fill: TINT.white });
  txt("leg-body", 80, 140, "Black: HTTPS traffic\nGrey: Diagnostics\nGreen: DNS traffic\nBlue: Private connection\nYellow: Virtual network link", { size: 18 });
  group("sub", 580, 90, 1300, 1500, null, { fill: TINT.white });
  box("dzb", 860, 120, 520, 80, "Private DNS zone\nprivatelink.blob.core.windows.net", { iconLeft: "dns-zones", size: 16 });
  box("dzv", 940, 220, 520, 80, "Private DNS zone\nprivatelink.vaultcore.azure.net", { iconLeft: "dns-zones", size: 16 });
  box("dzc", 1020, 320, 520, 80, "Private DNS zone\nprivatelink.azurecr.io", { iconLeft: "dns-zones", size: 16 });
  box("res", 1160, 420, 440, 80, "Azure recursive resolvers", { iconLeft: "dns-zones", size: 16 });
  box("adns", 860, 540, 340, 110, "Azure-provided DNS\n168.63.129.16", { fill: TINT.mg, size: 18 });
  group("vnet", 620, 700, 1100, 620, null, { fill: TINT.sub, dashed: true, iconName: "virtual-networks" });
  group("agsub", 650, 760, 330, 260, "Application Gateway for\nContainers (NSG)", { fill: TINT.white, size: 16 });
  card("waf", 665, 840, 145, 160, "web-application-firewall-policies-waf", "WAF policy", { size: 16 });
  card("agc", 820, 840, 145, 160, "application-gateway-containers", "Application\nGateway for\nContainers", { size: 16 });
  group("aks", 1030, 760, 660, 260, "Azure Kubernetes Service", { fill: TINT.mg, iconName: "kubernetes-services", size: 16 });
  group("aksin", 1050, 820, 620, 180, null, { fill: TINT.white, dashed: true });
  box("pods", 1070, 850, 250, 120, "Service pods", { fill: "#d0ebff", size: 18 });
  box("albc", 1400, 850, 250, 120, "Application load\nbalancer controller", { fill: "#d0ebff", size: 18 });
  group("bas", 650, 1070, 330, 220, "Azure Bastion (NSG)", { fill: TINT.white, size: 16 });
  card("bastion", 700, 1120, 220, 150, "bastions", "Azure Bastion");
  group("pes", 1030, 1070, 660, 220, "(NSG)", { fill: TINT.white, size: 16 });
  card("vm", 1050, 1110, 150, 160, "virtual-machine", "VM");
  const pe = [["pe1", 1220], ["pe2", 1370], ["pe3", 1520]];
  for (const [id, x] of pe) card(id, x, 1110, 150, 160, "private-endpoints", "Private\nendpoint", { size: 16 });
  card("sa", 1220, 1360, 150, 160, "storage-accounts", "Azure Storage\naccount", { size: 16 });
  card("kv", 1370, 1360, 150, 160, "key-vaults", "Azure Key\nVault", { size: 16 });
  card("acr", 1520, 1360, 150, 160, "container-registries", "Azure Container\nRegistry", { size: 16 });
  card("la", 1700, 1360, 150, 160, "log-analytics-workspaces", "Log\nAnalytics", { size: 16 });
  card("client", 60, 620, 220, 150, "browser", "Client application");
  card("ib", 60, 980, 220, 150, "browser", "Internet browser");
  box("inet", 330, 845, 200, 110, "Internet", { fill: TINT.onprem, size: 20 });

  arrow("c-i", "client", "bottom", 170, "inet", "left", 880, [880], { color: C.https });
  arrow("b-i", "ib", "top", 170, "inet", "left", 920, [920], { color: C.https });
  arrow("i-waf", "inet", "right", 900, "waf", "left", 900, [], { color: C.https });
  arrow("agc-pods", "agc", "right", 900, "pods", "left", 900, [], { color: C.https });
  arrow("d1", "adns", "top", 900, "dzb", "bottom", 900, [], { color: C.dns });
  arrow("d2", "adns", "top", 1000, "dzv", "bottom", 1000, [], { color: C.dns });
  arrow("d3", "adns", "top", 1100, "dzc", "bottom", 1100, [], { color: C.dns });
  arrow("d4", "adns", "top", 1180, "res", "bottom", 1180, [], { color: C.dns });
  arrow("d5", "aks", "top", 1300, "adns", "right", 600, [600], { color: C.dns });
  arrow("d6", "vm", "left", 1190, "adns", "bottom", 1000, [1000], { color: C.dns });
  arrow("l1", "vnet", "top", 640, "dzb", "left", 160, [], { color: C.link });
  arrow("l2", "vnet", "top", 700, "dzv", "left", 260, [], { color: C.link });
  arrow("l3", "vnet", "top", 780, "dzc", "left", 360, [], { color: C.link });
  arrow("p1", "vm", "right", 1150, "pe1", "left", 1150, [], { color: C.pc });
  arrow("p2", "albc", "bottom", 1445, "pe2", "top", 1445, [], { color: C.pc });
  arrow("p3", "albc", "bottom", 1595, "pe3", "top", 1595, [], { color: C.pc });
  arrow("s1", "pe1", "bottom", 1295, "sa", "top", 1295, [], { color: C.pc });
  arrow("s2", "pe2", "bottom", 1445, "kv", "top", 1445, [], { color: C.pc });
  arrow("s3", "pe3", "bottom", 1595, "acr", "top", 1595, [], { color: C.pc });
  arrow("g1", "albc", "right", 910, "la", "top", 1775, [1775], { color: C.pc });
  arrow("g2", "agc", "bottom", 885, "la", "right", 1440, [1045, 1910], { color: C.pc });
  arrow("g3", "vm", "bottom", 1080, "la", "bottom", 1775, [1560], { color: C.pc });

  txt("footer", 60, 1620, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Use Application Gateway for Containers with a multitenant AKS cluster\"", { size: 20, color: "#495057" });
}
