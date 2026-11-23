// 046 Hub-spoke network topology in Azure.
export const meta = {
  num: 46,
  slug: "hub-spoke",
  title: "Hub-spoke network topology in Azure",
  url: "https://learn.microsoft.com/azure/architecture/networking/architecture/hub-spoke",
  category: "Networking",
  status: "done",
  otherDiagrams: ["Routing between spokes through Azure Firewall", "Virtual Network Manager direct connectivity between spokes", "Spoke global mesh across regions"],
  substitutions: { "Azure Virtual Network Manager": "network-managers", "Virtual network": "virtual-networks", "Azure Bastion": "bastions", "Azure Firewall": "firewalls", "VPN Gateway": "virtual-network-gateways", "Azure Monitor": "monitor", "Virtual machine": "virtual-machine", "NSG": "network-security-groups" },
  differences: ["The Virtual Network Manager membership bus (dots on the hub) is shown as the enclosing group only."],
};

function spoke(k, id, x, y, sub) {
  const { TINT, card, group } = k;
  group(id, x, y, 720, 300, null, { fill: TINT.white, dashed: true, stroke: "#1971c2", iconName: "virtual-networks" });
  group(`${id}-s`, x + 30, y + 20, 620, 260, sub, { fill: TINT.white, dashed: true, stroke: "#868e96", iconName: "network-security-groups", align: "center", size: 16 });
  for (let i = 0; i < 3; i++) card(`${id}-vm${i}`, x + 60 + i * 195, y + 80, 170, 170, "virtual-machine", "Virtual\nmachine", { size: 16 });
}

export function draw(k) {
  const { TINT, txt, card, group, arrow, both } = k;
  txt("title", 60, 10, "Hub-spoke network topology in Azure", { size: 30 });
  group("avnm", 540, 60, 1820, 1360, "Azure Virtual Network Manager", { fill: TINT.white, stroke: "#1971c2", iconName: "network-managers" });

  group("cp", 60, 450, 420, 420, "Cross-premises network", { fill: TINT.white, dashed: true, stroke: "#1971c2" });
  card("cpvm1", 90, 510, 170, 150, "virtual-machine", "Virtual\nmachine", { size: 16 });
  card("cpvm2", 280, 510, 170, 150, "virtual-machine", "Virtual\nmachine", { size: 16 });
  card("cpgw", 170, 690, 180, 150, "virtual-network-gateways", "VPN gateway", { size: 16 });

  group("hub", 640, 120, 380, 820, "Hub virtual network", { fill: TINT.white, dashed: true, stroke: "#1971c2", iconName: "virtual-networks" });
  card("bas", 680, 180, 280, 180, "bastions", "Azure Bastion");
  card("fw", 680, 420, 280, 180, "firewalls", "Azure Firewall");
  card("vpn", 680, 660, 280, 180, "virtual-network-gateways", "VPN Gateway");
  card("mon", 1180, 440, 240, 180, "monitor", "Azure Monitor");

  txt("p1-t", 1600, 90, "Production spoke virtual network", { size: 18 });
  spoke(k, "p1", 1600, 130, "Resource subnet");
  txt("p2-t", 1600, 540, "Production spoke virtual network", { size: 18 });
  spoke(k, "p2", 1600, 580, "Resource subnets");
  spoke(k, "n1", 640, 1040, "Resource subnets");
  txt("n1-t", 700, 1350, "Nonproduction spoke virtual network", { size: 18 });
  spoke(k, "n2", 1600, 1040, "Resource subnets");
  txt("n2-t", 1660, 1350, "Nonproduction spoke virtual network", { size: 18 });

  both("h-p1", "hub", "right", 160, "p1", "left", 160, [], { dashed: true });
  txt("hp1-lbl", 1060, 175, "Virtual networks connected\nor peered through hub", { size: 16 });
  both("h-p2", "hub", "right", 860, "p2", "left", 860, [], { dashed: true });
  txt("hp2-lbl", 1100, 870, "Virtual networks connected or\npeered through hub", { size: 16 });
  both("h-n1", "hub", "bottom", 760, "n1", "top", 760, [], { dashed: true });
  txt("hn1-lbl", 790, 960, "Connected virtual networks", { size: 16 });
  both("h-n2", "hub", "right", 920, "n2", "top", 2000, [], { dashed: true });
  txt("hn2-lbl", 2030, 950, "Connected virtual\nnetworks", { size: 16 });
  both("n1-n2", "n1", "right", 1150, "n2", "left", 1150, [], { dashed: true });
  txt("nn-lbl", 1370, 1180, "Peered or directly\nconnected", { size: 16 });
  both("cp-vpn", "cpgw", "right", 765, "vpn", "left", 765, [], { dashed: true });

  arrow("diag1", "bas", "right", 270, "mon", "top", 1300, [], { dashed: true, color: "#868e96" });
  txt("diag-lbl", 1060, 300, "Diagnostics", { size: 16 });
  arrow("diag2", "fw", "right", 560, "mon", "left", 560, [], { dashed: true, color: "#868e96" });
  arrow("diag3", "vpn", "right", 720, "mon", "bottom", 1300, [], { dashed: true, color: "#868e96" });
  arrow("ft1", "p1", "left", 400, "fw", "right", 450, [1100], { dashed: true, color: "#2f9e44" });
  txt("ft1-lbl", 1450, 330, "Forced\ntunnel", { size: 16 });
  arrow("ft2", "p2", "left", 760, "fw", "right", 500, [1130], { dashed: true, color: "#2f9e44" });
  txt("ft2-lbl", 1450, 680, "Forced\ntunnel", { size: 16 });

  txt("footer", 60, 1460, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Hub-spoke network topology in Azure\"", { size: 20, color: "#495057" });
}
