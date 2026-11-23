// 126 VM baseline in an application landing zone.
export const meta = {
  num: 126,
  slug: "baseline-landing-zone",
  title: "Azure Virtual Machines baseline architecture in an Azure landing zone",
  url: "https://learn.microsoft.com/azure/architecture/virtual-machines/baseline-landing-zone",
  category: "Compute",
  status: "done",
  otherDiagrams: ["img1-2: hub-spoke network layout", "img3: workload monitoring resources"],
  substitutions: { "Scale Set (Flexible)": "vm-scale-sets", "Frontend/Backend VM": "virtual-machine", "User defined route": "route-tables", "Spoke virtual network": "virtual-networks", "Hub virtual network": "virtual-networks", "Org policy assignments": "policy", "Role assignments": "entra-identity-roles-and-administrators", "VPN (P2S/S2S)": "virtual-network-gateways", "VNet peering": "peerings", "Private DNS Zones": "dns-zones" },
  differences: ["User, GitHub actions and repository drawn as labelled shapes.", "Stacked hub regions drawn as a single hub card.", "ExpressRoute placed beside VPN rather than below it.", "Subscription title tabs drawn as labels above/below the subscription frames."],
};

export function draw(k) {
  const { TINT, txt, card, group, icon, arrow, box } = k;
  const S = 16;
  icon("alz-i", "subscriptions", 190, 20, 36);
  txt("alz-lbl", 235, 26, "Azure application landing zone subscription", { size: 20 });
  group("alz", 180, 70, 1120, 1000, null, { fill: TINT.sub });
  box("user", 20, 150, 130, 70, "User", { fill: TINT.onprem, size: S });
  box("gha", 20, 360, 130, 70, "GitHub\nactions", { fill: TINT.onprem, size: S });
  box("ghr", 20, 490, 130, 70, "GitHub\nrepository", { fill: TINT.onprem, size: S });
  arrow("gh", "ghr", "top", null, "gha", "bottom", null, []);
  group("wr", 200, 90, 1080, 630, "Workload resources", { fill: TINT.subBox });
  card("agw", 220, 140, 300, 130, "application-gateways", "Application Gateway +\nWeb Application Firewall\nzone-redundant", { size: S });
  box("kv", 220, 290, 300, 70, "Azure Key Vault\nZone resilient", { size: S, iconLeft: "key-vaults" });
  group("net", 220, 380, 300, 140, "Networking", { fill: TINT.white });
  icon("n-pe", "private-endpoints", 235, 420, 26); txt("n-pel", 270, 422, "Private Endpoints", { size: S });
  icon("n-sn", "subnet", 235, 452, 26); txt("n-snl", 270, 454, "Subnets", { size: S });
  icon("n-ns", "network-security-groups", 235, 484, 26); txt("n-nsl", 270, 486, "Network Security Groups", { size: S });
  group("mon", 220, 540, 300, 150, "Monitoring", { fill: TINT.white });
  icon("m-la", "log-analytics-workspaces", 235, 580, 26); txt("m-lal", 270, 582, "Log Analytics workspace", { size: S });
  icon("m-dc", "data-collection-rules", 235, 614, 26); txt("m-dcl", 270, 616, "Data collection rules", { size: S });
  icon("m-ds", "diagnostics-settings", 235, 648, 26); txt("m-dsl", 270, 650, "Diagnostics settings", { size: S });
  card("fe", 590, 130, 170, 160, "vm-scale-sets", "Frontend\nScale Set\n(Flexible)", { size: S });
  card("ilb", 790, 130, 180, 160, "load-balancers", "Internal Load\nBalancer\nzone-redundant", { size: S, fill: TINT.app });
  card("be", 1000, 130, 170, 160, "vm-scale-sets", "Backend\nScale Set\n(Flexible)", { size: S });
  [1, 2, 3].forEach((z, i) => {
    const y = 310 + i * 95;
    group(`z${z}`, 560, y, 700, 80, null, { fill: TINT.pim });
    box(`z${z}f`, 575, y + 8, 220, 64, "Frontend VM\n(SKU A)", { size: S, iconLeft: "virtual-machine" });
    txt(`z${z}l`, 870, y + 28, `Zone ${z}`, { size: 18 });
    box(`z${z}b`, 1025, y + 8, 220, 64, "Backend VM\n(SKU B)", { size: S, iconLeft: "virtual-machine" });
  });
  group("sv", 200, 740, 1080, 310, "Subscription vending provisioned resources", { fill: TINT.subBox });
  card("mg", 220, 790, 170, 140, "management-groups", "Management\nGroup\nplacement", { size: S });
  card("spoke", 410, 790, 190, 140, "virtual-networks", "Spoke virtual\nnetwork (DNS\nprovided by hub)", { size: S });
  card("udr", 620, 790, 190, 140, "route-tables", "User defined\nroute (to region\nhub firewall)", { size: S });
  txt("plus", 840, 840, "+", { size: 36 });
  box("v1", 900, 785, 360, 60, "Microsoft Defender for\nCloud enrollment", { size: S, iconLeft: "microsoft-defender-for-cloud" });
  box("v2", 900, 850, 360, 60, "Cost Management", { size: S, iconLeft: "cost-management" });
  box("v3", 900, 915, 360, 60, "Org policy assignments", { size: S, iconLeft: "policy" });
  box("v4", 900, 980, 360, 60, "Role assignments", { size: S, iconLeft: "entra-identity-roles-and-administrators" });
  group("con", 180, 1130, 1120, 420, null, { fill: TINT.warn });
  icon("con-i", "subscriptions", 830, 1495, 36);
  txt("con-lbl", 875, 1502, "Connectivity subscription", { size: S });
  card("hub", 260, 1170, 280, 110, "virtual-networks", "Hub virtual network\nRegion n", { size: S });
  box("fw", 300, 1300, 240, 60, "Azure Firewall", { size: S, iconLeft: "firewalls" });
  box("bas", 300, 1370, 240, 60, "Azure Bastion", { size: S, iconLeft: "bastions" });
  box("vpn", 300, 1440, 240, 60, "VPN (P2S/S2S)", { size: S, iconLeft: "virtual-network-gateways" });
  box("er", 560, 1440, 240, 60, "ExpressRoute", { size: S, iconLeft: "expressroute-circuits" });
  box("pdz", 800, 1170, 440, 70, "Private DNS Zones\nfor Private Link", { size: S, iconLeft: "dns-zones" });
  box("ddos", 800, 1255, 440, 60, "Azure DDoS Protection", { size: S, iconLeft: "ddos-protection-plans" });
  card("p1", 820, 1340, 130, 130, "entra-identity-roles-and-administrators", "Role\nassignments", { size: S });
  card("p2", 955, 1340, 130, 130, "network-watcher", "Network\nWatcher", { size: S });
  card("p3", 1090, 1340, 130, 130, "policy", "Policy\nassignment", { size: S });
  card("p4", 1160, 1480, 130, 60, "microsoft-defender-for-cloud", "Defender", { size: S });
  icon("plz-i", "subscriptions", 190, 1570, 36);
  txt("plz-lbl", 235, 1576, "Azure platform landing zone subscription", { size: 20 });
  arrow("e1", "user", "right", null, "agw", "left", 185, []);
  arrow("e2", "agw", "right", 185, "fe", "left", 185, []);
  arrow("e3", "fe", "right", 185, "ilb", "left", 185, []);
  arrow("e4", "ilb", "right", 185, "be", "left", 185, []);
  arrow("peer", "spoke", "bottom", 505, "hub", "top", 505, [], { head: null });
  icon("peer-i", "peerings", 470, 1078, 36);
  txt("peer-lbl", 330, 1085, "VNet peering", { size: S });
  arrow("egress", "wr", "right", 690, "fw", "right", 1330, [1290, 1110, 780, 1330], { dashed: true, color: "#e8590c" });
  txt("eg-lbl", 800, 1136, "Egress and DNS requests", { size: S });
  txt("footer", 20, 1640, "Pencil-sketch redraw of the Azure Architecture Center diagram \"VM baseline architecture in a workload landing zone\"", { size: 20, color: "#495057" });
}
