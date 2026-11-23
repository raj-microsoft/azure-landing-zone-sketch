// 034 Run SAP HANA for Linux virtual machines in a scale-up architecture on Azure.
export const meta = {
  num: 34,
  slug: "run-sap-hana-for-linux-virtual-machines",
  title: "Run SAP HANA for Linux virtual machines in a scale-up architecture on Azure",
  url: "https://learn.microsoft.com/azure/architecture/reference-architectures/sap/run-sap-hana-for-linux-virtual-machines",
  category: "SAP",
  status: "done",
  otherDiagrams: ["Architecture with disaster recovery"],
  substitutions: { "On-premises VMs": "virtual-machine", "Gateway / zone-redundant gateway": "virtual-network-gateways", "ExpressRoute": "expressroute-circuits", "HANA VMs / SBD VMs": "virtual-machine" },
  differences: ["NSG shield badges on the subnets are omitted."],
};

export function draw(k) {
  const { TINT, txt, box, card, group, step, arrow } = k;
  const VN = { fill: TINT.white, dashed: true, stroke: "#1971c2" };
  txt("title", 60, 10, "Run SAP HANA for Linux virtual machines in a scale-up architecture on Azure", { size: 30 });
  txt("op-lbl", 90, 310, "On-premises network", { size: 22 });
  group("op", 60, 360, 420, 400, null, { fill: TINT.onprem });
  card("ov1", 90, 380, 140, 110, "virtual-machine", "VM", { size: 16 });
  card("ov2", 90, 505, 140, 110, "virtual-machine", "VM", { size: 16 });
  card("ov3", 90, 630, 140, 110, "virtual-machine", "VM", { size: 16 });
  card("gw", 270, 470, 180, 170, "virtual-network-gateways", "Gateway");
  card("er", 520, 330, 170, 150, "expressroute-circuits", "ExpressRoute", { size: 16 });

  group("reg", 740, 100, 1940, 1060, "Region 1 (primary region)", { fill: TINT.sub, size: 22 });
  group("hub", 770, 170, 600, 850, "Hub virtual network", { ...VN, iconName: "virtual-networks" });
  group("gws", 800, 240, 240, 750, "Gateway\nsubnet", { fill: TINT.white, align: "center" });
  card("zgw", 820, 500, 200, 200, "virtual-network-gateways", "Zone-\nredundant\ngateway", { size: 16 });
  step("s1", 900, 850, 1);
  group("ssn", 1070, 240, 270, 750, "Shared services\nsubnet", { fill: TINT.white, align: "center" });
  card("bas", 1105, 340, 200, 160, "bastions", "Azure Bastion");

  group("spk", 1530, 170, 1120, 850, "Spoke virtual network", { ...VN, iconName: "virtual-networks" });
  group("db", 1560, 240, 1060, 750, "Database layer subnet", { fill: TINT.white, align: "center" });
  card("lb", 1590, 430, 180, 180, "load-balancers", "Load\nBalancer");
  card("h1", 1880, 300, 180, 170, "virtual-machine", "HANA\nVM1");
  card("h2", 1880, 560, 180, 170, "virtual-machine", "HANA\nVM2");
  card("sbd1", 2360, 300, 160, 140, "virtual-machine", "SBD VM", { size: 16 });
  card("sbd2", 2360, 480, 160, 140, "virtual-machine", "SBD VM", { size: 16 });
  card("sbd3", 2360, 660, 160, 140, "virtual-machine", "SBD VM", { size: 16 });
  step("s2", 1660, 870, 2); step("s3", 1950, 870, 3); step("s4", 2420, 870, 4);
  txt("hana-lbl", 1860, 1040, "HANA virtual\nmachines", { size: 18 });
  txt("sbd-lbl", 2300, 1040, "SBD virtual\nmachines (optional)", { size: 18 });

  arrow("ergw", "gw", "right", 555, "zgw", "left", 555, [], { head: null });
  arrow("peer", "hub", "right", 450, "spk", "left", 450, [], { tail: "arrow" });
  txt("peer-lbl", 1385, 480, "Virtual\nnetwork\npeering", { size: 16 });
  arrow("lb1", "lb", "right", 500, "h1", "left", 385, [1820]);
  arrow("lb2", "lb", "right", 540, "h2", "left", 645, [1820]);
  arrow("rep", "h1", "right", 350, "h2", "right", 680, [2160], { dashed: true, color: "#e8590c" });
  txt("rep-lbl", 2180, 440, "HANA system\nreplication", { size: 16 });

  txt("footer", 60, 1200, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Run SAP HANA for Linux virtual machines in a scale-up architecture\"", { size: 20, color: "#495057" });
}
