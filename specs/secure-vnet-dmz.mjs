// 138 Implement a secure hybrid network.
export const meta = {
  num: 138,
  slug: "secure-vnet-dmz",
  title: "Implement a secure hybrid network",
  url: "https://learn.microsoft.com/azure/architecture/reference-architectures/dmz/secure-vnet-dmz",
  category: "Networking",
  status: "done",
  otherDiagrams: [],
  substitutions: { "VM": "virtual-machine", "Local Network Gateway": "local-network-gateways", "VPN Connection": "connections", "Virtual Network Gateway": "virtual-network-gateways", "Azure Bastion": "bastions", "Azure Firewall": "firewalls", "Load balancer": "load-balancers", "VM Scale Sets": "vm-scale-sets", "Azure Monitor": "monitor", "NSG shield": "network-security-groups", "Subnet connectors": "omitted" },
  differences: ["Blue subnet connector dots and NSG shields on Bastion and resource subnet are omitted.", "Fan-out from load balancer to VM Scale Sets drawn as one arrow."],
};

export function draw(k) {
  const { TINT, txt, card, group, arrow } = k;
  const S = 16;
  const G = { color: "#2b8a3e", dashed: true };
  const M = { color: "#868e96", dashed: true };
  group("onp", 20, 340, 560, 420, null, { fill: TINT.onprem, dashed: true });
  txt("onp-l", 160, 295, "On-premises network", { size: 20 });
  card("vm1", 50, 370, 150, 110, "virtual-machine", "VM", { size: S });
  card("vm2", 225, 370, 150, 110, "virtual-machine", "VM", { size: S });
  card("vm3", 400, 370, 150, 110, "virtual-machine", "VM", { size: S });
  group("onpgw", 40, 520, 520, 220, null, { fill: TINT.white });
  card("lng1", 60, 560, 150, 130, "local-network-gateways", "Local Network\nGateway", { size: S });
  card("vpn1", 225, 560, 150, 130, "connections", "VPN\nConnection", { size: S });
  card("vng1", 390, 560, 150, 130, "virtual-network-gateways", "Virtual Network\nGateway", { size: S });
  group("hub", 720, 60, 640, 700, null, { fill: TINT.hub, dashed: true });
  txt("hub-l", 910, 15, "Hub virtual network", { size: 20 });
  card("bas", 760, 90, 200, 130, "bastions", "Azure Bastion", { size: S });
  card("fw", 760, 290, 200, 140, "firewalls", "Azure Firewall", { size: S });
  group("hubgw", 740, 520, 600, 220, null, { fill: TINT.white });
  card("vng2", 760, 560, 170, 130, "virtual-network-gateways", "Virtual Network\nGateway", { size: S });
  card("vpn2", 955, 560, 170, 130, "connections", "VPN\nConnection", { size: S });
  card("lng2", 1150, 560, 170, 130, "local-network-gateways", "Local Network\nGateway", { size: S });
  card("mon", 1390, 520, 200, 130, "monitor", "Azure Monitor", { size: S });
  group("spoke", 1520, 60, 540, 380, null, { fill: TINT.sub, dashed: true });
  txt("spoke-l", 1680, 15, "Spoke virtual network", { size: 20 });
  group("rs", 1550, 90, 480, 320, "Resource subnet", { fill: TINT.white });
  card("lb", 1580, 180, 160, 120, "load-balancers", "Load balancer", { size: S });
  card("vmss", 1820, 180, 180, 120, "vm-scale-sets", "VM Scale Sets", { size: S });
  arrow("vmgw", "vm3", "bottom", 475, "vng1", "top", 475, [], G);
  arrow("tun", "onpgw", "right", 630, "hubgw", "left", 630, [], G);
  txt("tun-l", 585, 590, "IPSec / IKE\nTunnel", { size: S });
  arrow("fwgw", "fw", "bottom", 860, "hubgw", "top", 860, [], G);
  arrow("peer", "hub", "right", 75, "spoke", "left", 75, [], { dashed: true, tail: "arrow" });
  txt("peer-l", 1370, 20, "Peered Virtual\nNetworks", { size: S });
  arrow("fw-lb", "fw", "right", 340, "lb", "left", 220, [1450], G);
  arrow("lb-vmss", "lb", "right", 240, "vmss", "left", 240, [], G);
  arrow("vmss-fw", "vmss", "bottom", 1910, "fw", "right", 400, [470], G);
  arrow("bas-m", "bas", "right", 150, "mon", "top", 1490, [], M);
  arrow("fw-m", "fw", "right", 380, "mon", "top", 1430, [], M);
  arrow("gw-m", "hubgw", "right", 620, "mon", "left", 620, [], M);
  arrow("rs-m", "spoke", "bottom", 1960, "mon", "right", 600, [], M);
  txt("footer", 20, 800, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Secure hybrid network architecture\"", { size: 20, color: "#495057" });
}
