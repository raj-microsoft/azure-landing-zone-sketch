// 041 Use a split-brain DNS configuration to host a web app in Azure.
export const meta = {
  num: 41,
  slug: "split-brain-dns",
  title: "Use a split-brain DNS configuration to host a web app in Azure",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/networking/split-brain-dns",
  category: "Networking",
  status: "done",
  otherDiagrams: ["Public internet workflow", "Private enterprise workflow", "Alternate split-brain DNS hosting architecture"],
  substitutions: { "Internet user / on-premises user": "users", "Internet": "globe-success", "Azure DNS zone": "dns-zones", "Azure Front Door": "front-door-and-cdn-profiles", "Public IP (pip-appgw)": "public-ip-addresses", "Application Gateway": "application-gateways", "App (VM)": "virtual-machine", "Network security group": "network-security-groups", "ExpressRoute circuit": "expressroute-circuits", "Site-to-site VPN connection": "connections", "AD DS DNS server": "entra-domain-services", "Virtual network": "virtual-networks", "Subnet": "subnet" },
  differences: ["The public IP is drawn as a card on the Front Door path instead of a floating label.", "On-premises building shown as a dashed group (no sketch building icon)."],
};

export function draw(k) {
  const { TINT, txt, card, group, arrow, both, line } = k;
  txt("title", 60, 10, "Split-brain DNS for a web app in Azure", { size: 30 });
  card("user", 140, 80, 220, 150, "users", "app.contoso.com");
  card("inet", 640, 80, 200, 150, "globe-success", "Internet");
  card("dns", 1100, 80, 240, 150, "dns-zones", "Azure DNS zone\ncontoso.com");
  card("fd", 640, 320, 200, 160, "front-door-and-cdn-profiles", "Azure Front\nDoor");
  card("pip", 220, 470, 220, 140, "public-ip-addresses", "207.x.x.x\n(pip-appgw)", { size: 16 });

  group("vnet", 60, 660, 1400, 520, "Virtual network", { fill: TINT.white, dashed: true, stroke: "#0c8599", iconName: "virtual-networks" });
  group("agsub", 120, 730, 460, 370, null, { fill: TINT.mg, iconName: "network-security-groups" });
  txt("agsub-lbl", 140, 1110, "AppGW subnet", { size: 18 });
  card("agw", 200, 830, 280, 180, "application-gateways", "207.x.x.x (pip)\n192.168.200.4");
  group("appsub", 900, 730, 460, 370, null, { fill: TINT.mg, iconName: "network-security-groups" });
  txt("appsub-lbl", 920, 1110, "App subnet", { size: 18 });
  card("app", 1030, 830, 200, 180, "virtual-machine", "App");

  group("onp", 180, 1340, 1120, 720, "On-premises", { fill: TINT.white, dashed: true, stroke: "#7048e8" });
  group("onpz", 300, 1410, 880, 610, null, { fill: TINT.onprem, iconName: "network-security-groups" });
  card("er", 360, 1480, 220, 160, "expressroute-circuits", "ExpressRoute\ncircuit");
  card("vpn", 880, 1480, 240, 160, "connections", "Site-to-site VPN\nconnection");
  card("ad", 620, 1620, 200, 150, "entra-domain-services", "AD DS DNS");
  card("ouser", 600, 1840, 240, 150, "users", "app.contoso.com");

  both("u-i", "user", "right", 155, "inet", "left", 155);
  both("i-d", "inet", "right", 155, "dns", "left", 155);
  arrow("i-fd", "inet", "bottom", 740, "fd", "top", 740);
  arrow("fd-pip", "fd", "bottom", 740, "pip", "right", 540, [540]);
  arrow("pip-agw", "pip", "bottom", 330, "agw", "top", 330);
  arrow("agw-app", "agw", "right", 920, "app", "left", 920);
  arrow("er-agw", "er", "top", 470, "agw", "bottom", 330, [1240], { color: "#7048e8" });
  line("vpn-agw", "vpn", "top", 1000, "agw", "bottom", 380, [1270], { color: "#7048e8" });
  line("er-ad", "er", "bottom", 470, "ad", "left", 1695, [], { dashed: true, color: "#7048e8" });
  line("vpn-ad", "vpn", "bottom", 1000, "ad", "right", 1695, [], { dashed: true, color: "#7048e8" });
  arrow("u-ad", "ouser", "top", 720, "ad", "bottom", 720, [], { color: "#7048e8" });

  txt("footer", 60, 2110, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Use a split-brain DNS configuration to host a web app in Azure\"", { size: 20, color: "#495057" });
}
