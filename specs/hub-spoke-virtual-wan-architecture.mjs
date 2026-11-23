// 016 Hub-spoke network topology with Azure Virtual WAN. Redraw of the first diagram.
export const meta = {
  num: 16,
  slug: "hub-spoke-virtual-wan-architecture",
  title: "Hub-spoke network topology with Azure Virtual WAN",
  url: "https://learn.microsoft.com/azure/architecture/networking/architecture/hub-spoke-virtual-wan-architecture",
  category: "Networking",
  status: "done",
  otherDiagrams: ["Advantages of the hub-spoke reference architecture"],
  substitutions: { "VPN branch (building)": "branch", "VPN P2S user": "users", "Routing configuration": "route-tables" },
  differences: [
    "Diagonal connections from each virtual hub are routed orthogonally; connection names sit beside each line.",
    "Virtual network clouds are labelled cards with the virtual network sketch icon; branch buildings use the 'branch' sketch icon.",
    "The routing configuration cards use the route-tables sketch icon in place of the small virtual hub badge.",
  ],
};

export function draw(k) {
  const { TINT, txt, box, card, iconCap, line } = k;
  txt("title", 40, 10, "Hub-spoke network topology with Azure Virtual WAN", { size: 30 });
  const L = (id, f, fs, fa, t, ts, ta, lanes, label, lx, ly) => { line(id, f, fs, fa, t, ts, ta, lanes); txt(`${id}-t`, lx, ly, label, { size: 18 }); };

  card("v1", 120, 120, 260, 160, "virtual-networks", "Shared services\nvirtual network\nVNet1 10.1.0.0/24");
  card("v2", 480, 120, 240, 160, "virtual-networks", "Virtual network");
  card("v3", 1340, 120, 240, 160, "virtual-networks", "Virtual network");
  card("v4", 1680, 120, 240, 160, "virtual-networks", "Virtual network");
  iconCap("ddos", "ddos-protection-plans", 2080, 130, "DDoS Protection", { size: 64 });
  card("h1", 420, 400, 220, 140, "virtual-wan-hub", "vhubvnet1");
  card("h2", 1400, 400, 220, 140, "virtual-wan-hub", "vhubvnet2");
  line("hh", "h1", "right", 470, "h2", "left", 470, [], { dashed: true });
  txt("hh-t", 800, 430, "Hub-to-hub connectivity", { size: 20 });

  L("c1", "v1", "bottom", 250, "h1", "top", 470, [340], "vnetconn1", 260, 300);
  L("c2", "v2", "bottom", 600, "h1", "top", 590, [340], "vnetconn2", 610, 300);
  L("c3", "v3", "bottom", 1460, "h2", "top", 1450, [340], "vnetconn1", 1300, 300);
  L("c4", "v4", "bottom", 1800, "h2", "top", 1570, [340], "vnetconn2", 1810, 300);

  const leaf = [
    ["p2s1", 40, "users", "VPN P2S user\n10.4.3.0/24", "h1", 440, "p2svpnconfig1"], ["b1", 300, "branch", "VPN branch 1\n10.4.0.0/24", "h1", 490, "vpnconn1"],
    ["b2", 560, "branch", "VPN branch 2\n10.4.1.0/24", "h1", 560, "vpnconn2"], ["er1", 820, "expressroute-circuits", "ExpressRoute\ncircuit 1\n10.4.2.0/24", "h1", 620, "erconn1"],
    ["b3", 1180, "branch", "VPN branch 3\n10.5.0.0/24", "h2", 1430, "vpnconn3"], ["b4", 1440, "branch", "VPN branch 4\n10.5.1.0/24", "h2", 1500, "vpnconn4"],
    ["er2", 1700, "expressroute-circuits", "ExpressRoute\ncircuit 2\n10.5.2.0/24", "h2", 1560, "erconn2"], ["p2s2", 1960, "users", "VPN P2S user\n10.5.3.0/24", "h2", 1610, "p2svpnconfig1"],
  ];
  leaf.forEach(([id, x, n, l, hub, hx, conn], i) => {
    card(id, x, 820, 220, 180, n, l);
    const lane = 600 + (i % 4) * 45;
    line(`l-${id}`, hub, "bottom", hx, id, "top", x + 110, [lane]);
    txt(`l-${id}-t`, x + 118, 770, conn, { size: 16 });
  });
  box("rt1", 80, 1080, 900, 200, "Routing configuration of virtual network connections except\nshared services virtual network\n• associatedRouteTable: RT_VNets\n• propagatedRouteTable: default", { size: 20, align: "left", iconLeft: "route-tables" });
  box("rt2", 1180, 1080, 1000, 200, "Routing configuration of VPN/ExpressRoute/P2S connections\nand shared services virtual network\n• associatedRouteTable: default\n• propagatedRouteTable: default, RT_VNets", { size: 20, align: "left", iconLeft: "route-tables" });

  txt("footer", 40, 1310, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Hub-spoke network topology with Azure Virtual WAN\"", { size: 20, color: "#495057" });
}
