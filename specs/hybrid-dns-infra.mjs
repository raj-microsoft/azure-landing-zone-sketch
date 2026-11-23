// 042 Design a hybrid DNS solution by using Azure.
export const meta = {
  num: 42,
  slug: "hybrid-dns-infra",
  title: "Design a hybrid Domain Name System (DNS) solution by using Azure",
  url: "https://learn.microsoft.com/azure/architecture/hybrid/hybrid-dns-infra",
  category: "Networking",
  status: "done",
  otherDiagrams: ["Hybrid resolution from Azure to on-premises", "Hybrid resolution from on-premises to Azure", "Two on-premises locations and two Azure regions (two variants)"],
  substitutions: { "Subscription": "subscriptions", "Forwarding ruleset": "file", "DNS Private Resolver / endpoints": "dns-private-resolver", "Azure private DNS zone": "dns-zones", "VPN/ExpressRoute gateway": "virtual-network-gateways", "Azure Firewall": "firewalls", "DNS servers / workload VMs": "virtual-machine", "On-premises VPN/ExpressRoute termination": "virtual-router", "Virtual network": "virtual-networks" },
  differences: ["Outbound and inbound endpoints use the DNS Private Resolver icon."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, both } = k;
  txt("title", 60, 10, "Hybrid DNS solution by using Azure", { size: 30 });

  group("onp", 60, 820, 520, 520, "On-premises", { fill: TINT.onprem, dashed: true });
  card("dnss", 90, 1030, 200, 170, "virtual-machine", "DNS servers");
  card("term", 320, 1030, 230, 170, "virtual-router", "On-premises\nVPN/ExpressRoute\ntermination", { size: 16 });

  group("conn", 720, 70, 1040, 1360, "Connectivity subscription", { fill: TINT.white, iconName: "subscriptions" });
  card("rules", 780, 140, 200, 150, "file", "Forwarding\nruleset");
  card("dpr", 1180, 140, 260, 150, "dns-private-resolver", "DNS Private Resolver");
  card("pdns", 740, 400, 200, 160, "dns-zones", "Azure private\nDNS zone");
  txt("link-lbl", 760, 310, "DNS virtual\nnetwork link", { size: 16 });
  group("ss", 1000, 340, 700, 420, null, { fill: TINT.sub, dashed: true, stroke: "#1971c2", iconName: "virtual-networks" });
  card("ob", 1060, 380, 240, 220, "dns-private-resolver", "Outbound\n10.1.0.0/26\n10.1.0.4", { size: 16 });
  card("ib", 1380, 380, 240, 220, "dns-private-resolver", "Inbound\n10.1.0.64/26\n10.1.0.68", { size: 16 });
  txt("ss-lbl", 1160, 650, "Shared services\nvirtual network (10.1.0.0/16)", { size: 18 });
  txt("peer1-lbl", 1290, 790, "Virtual network\npeering", { size: 16 });

  group("hub", 900, 880, 800, 500, null, { fill: TINT.sub, dashed: true, stroke: "#1971c2", iconName: "virtual-networks" });
  group("gws", 930, 930, 350, 370, "Gateway subnet\n10.0.1.0/27", { fill: TINT.white, size: 16 });
  card("gw", 960, 1060, 290, 200, "virtual-network-gateways", "VPN/ExpressRoute\ngateway");
  group("fws", 1310, 930, 360, 370, "Azure Firewall subnet\n10.0.1.64/26", { fill: TINT.white, size: 16 });
  card("fw", 1330, 1040, 320, 230, "firewalls", "Azure Firewall\n10.0.1.68\nDNS server: 10.1.0.68", { size: 16 });
  txt("hub-lbl", 930, 1320, "Hub virtual network (10.0.0.0/16)", { size: 18 });
  txt("vpn-lbl", 590, 1060, "VPN/\nExpressRoute", { size: 16 });

  group("wl", 1980, 560, 820, 870, "Workload subscription", { fill: TINT.white, iconName: "subscriptions" });
  group("spoke", 2040, 680, 700, 700, null, { fill: TINT.sub, dashed: true, stroke: "#1971c2", iconName: "virtual-networks" });
  group("wls", 2140, 740, 440, 440, "Workload subnet\n10.2.1.0/24", { fill: TINT.white, size: 16 });
  card("wlvm", 2240, 880, 240, 180, "virtual-machine", "Workload");
  txt("sp-lbl", 2140, 1240, "Spoke virtual network (10.2.0.0/16)\nCustom DNS servers: 10.0.1.68", { size: 18 });
  txt("peer2-lbl", 1815, 900, "Virtual network\npeering", { size: 16 });

  both("r-ob", "rules", "bottom", 940, "ob", "top", 1120, [330]);
  both("d-ob", "dpr", "bottom", 1240, "ob", "top", 1240);
  both("d-ib", "dpr", "bottom", 1400, "ib", "top", 1400);
  both("p-ss", "pdns", "right", 470, "ss", "left", 470);
  both("ss-hub", "ss", "bottom", 1260, "hub", "top", 1260);
  both("vpn", "term", "right", 1140, "gw", "left", 1140, [], { color: "#1e1e1e" });
  both("hub-sp", "hub", "right", 1200, "spoke", "left", 720, [1800]);

  txt("footer", 60, 1490, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Design a hybrid DNS solution by using Azure\"", { size: 20, color: "#495057" });
}
