// 105 Improved-security access to App Service web apps from an on-premises network.
export const meta = {
  num: 105,
  slug: "access-multitenant-web-app-from-on-premises",
  title: "Improved-security access to App Service web apps from an on-premises network",
  url: "https://learn.microsoft.com/azure/architecture/web-apps/guides/networking/access-multitenant-web-app-from-on-premises",
  category: "Web",
  status: "done",
  otherDiagrams: [],
  substitutions: { "UDR": "route-tables", "S2S VPN/ExpressRoute": "expressroute-circuits", "Private endpoint": "private-endpoints", "DNS Private Resolver inbound/outbound endpoint": "dns-private-resolver", "Private DNS zones": "dns-zones", "Client virtual machine / DNS server": "virtual-machine", "Gateway subnet": "virtual-network-gateways" },
  differences: ["On-premises building glyph and subscription key badges omitted.", "UDR callouts are drawn as notes inside each subnet rather than on the vnet border.", "VNet integration dot-and-line drawn as a plain App Service card."],
};

export function draw(k) {
  const { TINT, txt, card, group, icon, arrow, box } = k;
  const S = 16;
  const both = (id, f, fs, fa, t, ts, ta, lanes = [], o = {}) => arrow(id, f, fs, fa, t, ts, ta, lanes, { tail: "arrow", ...o });
  const pl = { color: "#1971c2" };
  txt("title", 40, 0, "Secure access to multitenant web apps from on-premises", { size: 28 });

  // Spoke1
  group("spoke", 820, 70, 940, 500, null, { fill: TINT.sub, dashed: true });
  icon("spoke-i", "virtual-networks", 840, 440, 44);
  txt("spoke-lbl", 900, 450, "Spoke1 virtual network\n10.0.1.0/24", { size: 18 });
  group("cvs", 850, 100, 260, 310, null, { fill: TINT.white, dashed: true });
  txt("cvs-udr", 870, 110, "UDR: 10.0.2.0/24\n-> 10.0.0.68", { size: 16 });
  card("cvm", 900, 170, 160, 130, "virtual-machine", "Client VM", { size: S });
  txt("cvs-lbl", 870, 330, "Client VM subnet\n10.0.1.0/26", { size: 16 });
  group("vis", 1140, 100, 340, 310, null, { fill: TINT.white, dashed: true });
  txt("vis-udr", 1160, 110, "UDR: 10.0.2.0/24\n-> 10.0.0.68", { size: 16 });
  icon("vis-nsg", "network-security-groups", 1420, 110, 40);
  icon("cvs-nsg", "network-security-groups", 1060, 110, 40);
  card("app", 1230, 170, 170, 130, "app-services", "App Service", { size: S });
  txt("vis-lbl", 1160, 330, "VNet integration subnet\n10.0.1.64/26", { size: 16 });
  card("st", 1520, 90, 200, 110, "storage-accounts", "Storage account", { size: S });
  card("sql", 1520, 220, 200, 110, "sql-database", "Azure SQL", { size: S });
  card("kv", 1520, 350, 200, 110, "key-vaults", "Key Vault", { size: S });

  // On-premises
  group("onp", 40, 660, 600, 440, null, { fill: TINT.onprem });
  txt("fwd", 60, 600, "DNS conditional forwarder:\nazurewebsites.net -> 10.0.0.132", { size: 16 });
  group("onpn", 70, 690, 540, 300, null, { fill: TINT.white, dashed: true });
  card("ocvm", 100, 720, 220, 170, "virtual-machine", "IP: 192.168.0.10\nClient virtual machine", { size: S });
  card("odns", 360, 720, 220, 170, "virtual-machine", "IP: 192.168.0.254\nOn-premises DNS server", { size: S });
  txt("onp-lbl", 70, 1010, "On-premises network\n192.168.0.0/24", { size: 18 });

  // Hub
  group("hub", 820, 680, 940, 440, null, { fill: TINT.sub, dashed: true });
  icon("hub-i", "virtual-networks", 840, 1050, 44);
  txt("hub-lbl", 900, 1060, "Hub virtual network\n10.0.0.0/24", { size: 18 });
  txt("hub-udr", 1060, 620, "UDR: 10.0.2.0/24 -> 10.0.0.68", { size: 16 });
  card("gw", 850, 710, 190, 220, "virtual-network-gateways", "Gateway subnet\n10.0.0.0/26", { size: S });
  card("fw", 1060, 710, 200, 220, "firewalls", "IP: 10.0.0.68\nAzure firewall subnet\n10.0.0.64/26", { size: S });
  group("dpr", 1280, 700, 460, 320, null, { fill: TINT.onprem });
  card("inb", 1300, 720, 200, 210, "dns-private-resolver", "Inbound endpoint\nIP: 10.0.0.132\nInbound subnet\n10.0.0.128/28", { size: S });
  card("outb", 1520, 720, 200, 210, "dns-private-resolver", "Outbound endpoint\nOutbound subnet\n10.0.0.144/28", { size: S });
  txt("dpr-lbl", 1310, 960, "DNS Private Resolver service", { size: 18 });

  // Private endpoint vnet
  group("pev", 820, 1240, 940, 460, null, { fill: TINT.sub, dashed: true });
  icon("pev-i", "virtual-networks", 840, 1630, 44);
  txt("pev-lbl", 900, 1640, "Private endpoint virtual network\n10.0.2.0/24", { size: 18 });
  group("pes", 1130, 1270, 360, 340, null, { fill: TINT.white });
  card("pe1", 1150, 1290, 150, 120, "private-endpoints", "10.0.2.4", { size: S });
  card("pe2", 1320, 1290, 150, 120, "private-endpoints", "10.0.2.5", { size: S });
  card("pe3", 1150, 1430, 150, 120, "private-endpoints", "10.0.2.6", { size: S });
  card("pe4", 1320, 1430, 150, 120, "private-endpoints", "10.0.2.7", { size: S });
  txt("pes-lbl", 1200, 1560, "Private endpoint subnet\n10.0.2.0/24", { size: 16 });
  card("pa", 880, 1290, 170, 120, "app-services", "App Service", { size: S });
  card("pk", 880, 1430, 170, 120, "key-vaults", "Key Vault", { size: S });
  card("ps", 1560, 1290, 170, 120, "storage-accounts", "Storage", { size: S });
  card("pq", 1560, 1430, 170, 120, "sql-database", "Azure SQL", { size: S });

  // DNS zones
  card("dns", 1890, 790, 140, 120, "dns-zones", "DNS", { size: S });
  txt("dns-lbl", 2060, 780, "Private DNS zones:\nprivatelink.azurewebsites.net\nprivatelink.database.windows.net\nprivatelink.file.core.windows.net\nprivatelink.vaultcore.azure.net", { size: 16 });

  // Connections
  both("a-er", "onpn", "right", 880, "hub", "left", 880);
  card("er", 650, 900, 160, 150, "expressroute-circuits", "S2S VPN/\nExpressRoute", { size: S });
  both("a-p1", "spoke", "bottom", 1400, "hub", "top", 1400);
  both("a-p2", "hub", "bottom", 1400, "pev", "top", 1400);
  both("l1", "pa", "right", 1350, "pe1", "left", 1350, [], pl);
  both("l2", "pk", "right", 1490, "pe3", "left", 1490, [], pl);
  both("l3", "pe2", "right", 1350, "ps", "left", 1350, [], pl);
  both("l4", "pe4", "right", 1490, "pq", "left", 1490, [], pl);
  arrow("d1", "spoke", "right", 500, "dns", "top", 1960, [1960], { head: null, dashed: true, color: "#1971c2" });
  arrow("d2", "hub", "right", 850, "dns", "left", 850, [], { head: null, dashed: true, color: "#1971c2" });
  arrow("d3", "pev", "right", 1460, "dns", "bottom", 1960, [1960], { head: null, dashed: true, color: "#1971c2" });

  // Legend
  txt("leg", 60, 1250, "Legend\n<-> black: virtual network peering\n<-> blue: Private Link\n- - blue dashed: virtual network link with private DNS zones", { size: 18 });
  txt("footer", 40, 1760, "Pencil-sketch redraw of the Azure Architecture Center diagram \"multitenant web apps from on-premises\"", { size: 20, color: "#495057" });
}
