// 053 Azure DNS Private Resolver (main diagram: the DNS Private Resolver hub-and-spoke architecture, img1).
export const meta = {
  num: 53,
  slug: "azure-dns-private-resolver",
  title: "Azure DNS Private Resolver",
  url: "https://learn.microsoft.com/azure/architecture/networking/architecture/azure-dns-private-resolver",
  category: "Networking",
  status: "done",
  otherDiagrams: ["DNS forwarder VM solution (without DNS Private Resolver), shown first in the article as the starting point", "Traffic flow: on-premises DNS query", "Traffic flow: VM DNS query (decentralized)", "Traffic flow: VM DNS query (centralized)", "Traffic flow: VM DNS query via on-premises DNS server", "Traffic flow: nested DNS resolver", "Traffic flow: nested resolver forwarding bypass"],
  substitutions: { "On-premises server": "server-farm", "Windows desktops": "device-security-windows", "On-premises DNS servers 192.168.0.1 & 2": "dns-zones", "On-premises router": "virtual-router", "Azure ExpressRoute": "expressroute-circuits", "Site-to-site or ExpressRoute gateway": "virtual-network-gateways", "Azure DNS": "dns-zones", "Azure private DNS": "dns-zones", "Inbound / outbound endpoint": "dns-private-resolver", "DNS Private Resolver": "dns-private-resolver", "Spoke VM": "virtual-machine", "DNS forwarding rule set": "file", "Virtual network": "virtual-networks" },
  differences: ["The article's first diagram shows the older DNS forwarder VM design; the DNS Private Resolver architecture (second diagram) is drawn as the main diagram.", "On-premises cloud/building glyph omitted (no sketch icon)."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, both, line, step } = k;
  txt("title", 40, 10, "Azure DNS Private Resolver", { size: 30 });

  group("onp", 40, 400, 560, 500, "On-premises", { fill: TINT.white, dashed: true, size: 20, align: "center" });
  card("srv", 70, 470, 170, 130, "server-farm", "On-premises\nserver");
  card("win", 70, 640, 170, 130, "device-security-windows", "Windows\ndesktops");
  box("app1", 280, 470, 150, 60, "App 1", { fill: TINT.badge, size: 18 });
  box("app2", 280, 550, 150, 60, "App 2", { fill: TINT.badge, size: 18 });
  box("app3", 280, 630, 150, 60, "App 3", { fill: TINT.badge, size: 18 });
  card("onpdns", 280, 720, 200, 150, "dns-zones", "192.168.0.1 & 2");
  card("rtr", 640, 560, 150, 130, "virtual-router", "Router");
  txt("onp-rec", 60, 930, "App1.onpremises.company.com - 192.168.0.8\nApp2.onpremises.company.com - 192.168.0.9\nblob.core.windows.net - 10.0.0.8 (forwarder)\nazure-api.net - 10.0.0.8 (forwarder)", { size: 18 });

  card("er", 870, 450, 240, 140, "expressroute-circuits", "Azure ExpressRoute");

  group("az", 1180, 80, 1560, 1040, "Azure", { fill: TINT.white, dashed: true, size: 22, align: "right" });
  txt("pl-rec", 1210, 120, "abc.privatelink.blob.core.windows.net - 10.4.0.1\nabc.privatelink.azure-api.net - 10.4.0.2", { size: 18 });
  card("pdns", 1950, 110, 240, 150, "dns-zones", "Azure private DNS");
  txt("vnl", 2210, 250, "Virtual network link", { size: 16 });
  card("azdns", 1620, 280, 180, 130, "dns-zones", "Azure DNS");

  group("hub", 1220, 470, 720, 610, "Hub 10.0.0.0/24", { fill: TINT.mg, iconName: "virtual-networks", size: 18 });
  card("gw", 1250, 560, 220, 190, "virtual-network-gateways", "Site-to-site or\nAzure ExpressRoute\ngateway");
  group("in", 1530, 540, 340, 230, "10.0.0.0/28", { fill: TINT.white, size: 16 });
  card("inep", 1570, 590, 260, 160, "dns-private-resolver", "Inbound endpoint\n10.0.0.8");
  group("out", 1530, 820, 340, 230, "10.0.0.16/28", { fill: TINT.white, size: 16 });
  card("outep", 1570, 870, 260, 160, "dns-private-resolver", "Outbound endpoint\n10.0.0.19");
  card("dpr", 1960, 700, 200, 150, "dns-private-resolver", "DNS Private\nResolver");

  group("sp1", 2420, 470, 280, 220, "Spoke 1 10.1.0.0/24", { fill: TINT.mg, iconName: "virtual-networks", size: 16 });
  card("vm1", 2470, 530, 180, 140, "virtual-machine", "VM 1");
  group("sp2", 2200, 900, 280, 200, "Spoke 2 10.2.0.0/24", { fill: TINT.mg, iconName: "virtual-networks", size: 16 });
  card("vm2", 2250, 950, 180, 140, "virtual-machine", "VM 2");

  card("rules", 1960, 1200, 240, 150, "file", "DNS forwarding\nrule set");
  txt("rules-rec", 1820, 1370, "App1.onpremises.company.com - 192.168.0.1 & 2\nApp2.onpremises.company.com - 192.168.0.1 & 2", { size: 18 });

  line("onp-rtr", "onp", "right", 625, "rtr", "left", 625);
  both("rtr-er", "rtr", "right", 625, "gw", "left", 625);
  txt("er-lbl", 850, 640, "ExpressRoute\nconnection", { size: 16 });
  line("hub-pdns", "hub", "top", 1900, "pdns", "left", 185, [185]);
  line("sp1-pdns", "sp1", "top", 2560, "pdns", "right", 185, [185]);
  line("sp2-pdns", "sp2", "top", 2340, "pdns", "bottom", 2160, [800, 2160]);
  line("peer1", "hub", "right", 560, "sp1", "left", 560, [], { dashed: true, color: "#1971c2" });
  line("peer2", "hub", "right", 1000, "sp2", "left", 1000, [], { dashed: true, color: "#1971c2" });
  txt("peer-lbl", 1990, 590, "Virtual network\npeering", { size: 16 });
  line("out-rules", "outep", "bottom", 1700, "rules", "left", 1275, [1275], { dashed: true });
  line("rules-sp1", "rules", "right", 1275, "sp1", "bottom", 2660, [2660], { dashed: true });
  txt("fwd-lbl", 2680, 1150, "DNS forwarding\nvirtual network link", { size: 16 });

  txt("footer", 40, 1480, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Azure DNS Private Resolver\"", { size: 20, color: "#495057" });
}
