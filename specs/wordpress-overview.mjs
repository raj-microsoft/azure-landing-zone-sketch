// 129 WordPress on Azure (overview).
export const meta = {
  num: 129,
  slug: "wordpress-overview",
  title: "WordPress on Azure",
  url: "https://learn.microsoft.com/azure/architecture/guide/infrastructure/wordpress-overview",
  category: "Web",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Azure Front Door + WAF": "front-door-and-cdn-profiles", "Subnet with NSG": "network-security-groups", "Application Gateway + WAF": "application-gateways", "Azure VPN Gateway": "virtual-network-gateways", "Any WordPress hosting solution": "virtual-machine" },
  differences: ["Public internet and administrator drawn as labelled shapes.", "Chip glyph for the hosting solution shown as a generic VM icon."],
};

export function draw(k) {
  const { TINT, txt, card, group, icon, arrow, box } = k;
  const S = 16;
  group("az", 210, 20, 1280, 700, null, { fill: TINT.white, dashed: true });
  box("inet", 20, 330, 160, 70, "Public internet", { fill: TINT.onprem, size: S });
  txt("urls", 240, 70, "Blocked URLs:\n/wp-admin/*\n/wp-login.php\n/xmlrpc.php\n\nAllowed:\n/wp-admin/admin-ajax.php", { size: 18 });
  card("afd", 250, 300, 230, 150, "front-door-and-cdn-profiles", "Azure Front Door\n+\nAzure Web\nApplication Firewall", { size: S });
  group("spoke", 540, 50, 560, 600, null, { fill: TINT.white, dashed: true });
  icon("sp-i", "virtual-networks", 555, 60, 36);
  txt("sp-lbl", 600, 66, "WordPress spoke virtual network", { size: 18 });
  group("sn", 570, 110, 500, 510, null, { fill: TINT.subBox });
  icon("sn-i", "network-security-groups", 585, 125, 40);
  txt("sn-lbl", 635, 128, "Subnet with network\nsecurity group", { size: 18 });
  group("host", 600, 230, 200, 200, null, { fill: TINT.white, dashed: true });
  card("wp", 615, 260, 170, 140, "virtual-machine", "Any WordPress\nhosting solution", { size: S });
  card("agw", 840, 260, 210, 190, "application-gateways", "Azure Application\nGateway\n+\nAzure Web\nApplication Firewall", { size: S });
  group("hub", 1200, 50, 260, 480, null, { fill: TINT.white, dashed: true });
  icon("hub-i", "virtual-networks", 1215, 60, 36);
  txt("hub-lbl", 1260, 66, "Hub virtual network", { size: 18 });
  card("fw", 1250, 110, 170, 110, "firewalls", "Azure Firewall", { size: S });
  card("vpn", 1250, 290, 170, 120, "virtual-network-gateways", "Azure VPN\nGateway", { size: S });
  box("admin", 1255, 600, 160, 70, "Administrator", { fill: TINT.onprem, size: S });
  arrow("e1", "inet", "right", 365, "afd", "left", 365, []);
  arrow("e2", "afd", "right", 330, "host", "left", 330, []);
  arrow("e3", "agw", "left", 330, "host", "right", 330, []);
  arrow("e4", "vpn", "left", 330, "agw", "right", 330, []);
  arrow("e5", "admin", "top", null, "vpn", "bottom", null, []);
  arrow("ft", "spoke", "right", 165, "fw", "left", 165, [], { dashed: true, color: "#868e96" });
  txt("ft-lbl", 1110, 120, "Forced\ntunnel", { size: S });
  arrow("pe", "spoke", "right", 250, "hub", "left", 250, [], { tail: "arrow", color: "#868e96" });
  txt("pe-lbl", 1110, 265, "Virtual\nnetwork\npeering", { size: S });
  txt("footer", 20, 750, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Blocked public access to the WordPress administration panel\"", { size: 20, color: "#495057" });
}
