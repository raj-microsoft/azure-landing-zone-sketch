// 025 Run SAP BW/4HANA with Linux virtual machines on Azure.
export const meta = {
  num: 25,
  slug: "run-sap-bw4hana-with-linux-virtual-machines",
  title: "Run SAP BW/4HANA with Linux virtual machines on Azure",
  url: "https://learn.microsoft.com/azure/architecture/reference-architectures/sap/run-sap-bw4hana-with-linux-virtual-machines",
  category: "SAP",
  status: "done",
  otherDiagrams: [],
  substitutions: { "VPN or Azure ExpressRoute": "expressroute-circuits", "SAP VM pools / iSCSI target VMs / SAP HANA database": "virtual-machine", "Microsoft Power BI": "power-bi-embedded", "Azure Backup and Azure Site Recovery": "recovery-services-vaults", "Azure Managed Disks": "disks" },
  differences: [
    "On-premises datacenter is a plain grey shape with the gateway icon.",
    "Dotted connections are drawn as dashed lines along orthogonal routes.",
  ],
};

export function draw(k) {
  const { TINT, txt, box, card, group, step, line, both } = k;
  txt("title", 60, 10, "SAP BW/4HANA with Linux virtual machines on Azure", { size: 30 });
  group("onp", 60, 120, 220, 200, null, { fill: TINT.onprem, dashed: true });
  card("onpgw", 80, 140, 180, 160, "virtual-network-gateways", "On-premises\ndatacenter");
  card("er", 300, 220, 210, 150, "expressroute-circuits", "VPN or Azure\nExpressRoute", { size: 16 });
  group("az", 560, 70, 2000, 1270, null, { fill: TINT.white });
  group("hub", 620, 100, 360, 470, "Hub virtual network", { fill: TINT.hub, dashed: true, iconName: "virtual-networks", align: "center" });
  card("gw", 680, 160, 240, 150, "virtual-network-gateways", "Gateway");
  card("bas", 680, 350, 240, 150, "bastions", "Azure Bastion");
  card("pbi", 680, 720, 240, 150, "power-bi-embedded", "Microsoft Power BI");
  card("bk", 650, 980, 300, 160, "recovery-services-vaults", "Azure Backup and\nAzure Site Recovery");
  group("sap", 1060, 100, 1460, 1220, "SAP workload virtual network", { fill: TINT.white, dashed: true, iconName: "virtual-networks", align: "center" });
  group("app", 1100, 150, 1000, 800, null, { fill: TINT.mg, iconName: "virtual-networks" });
  txt("app-t", 1110, 960, "Application tier subnet", { size: 18 });
  card("lb1", 1150, 170, 230, 150, "load-balancers", "Azure Load\nBalancer");
  card("lb2", 1750, 170, 230, 150, "load-balancers", "Azure Load\nBalancer");
  card("web", 1150, 440, 230, 180, "virtual-machine", "SAP Web\nDispatcher pool", { dashed: true });
  card("as", 1460, 440, 230, 180, "virtual-machine", "SAP application\nservers pool", { dashed: true });
  card("cs", 1750, 440, 230, 180, "virtual-machine", "SAP Central\nServices cluster", { dashed: true });
  card("iscsi", 1750, 690, 230, 160, "virtual-machine", "iSCSI target\nvirtual machines", { dashed: true });
  box("nsg", 1150, 760, 320, 90, "Network security group", { iconLeft: "network-security-groups", size: 18 });
  group("db", 2160, 150, 330, 440, null, { fill: TINT.mg });
  txt("db-t", 2170, 600, "Database subnet", { size: 18 });
  card("hana", 2190, 250, 270, 240, "virtual-machine", "SAP HANA\ndatabase");
  card("disk", 2200, 700, 250, 160, "disks", "Azure\nManaged Disks");
  group("st", 1100, 1030, 1390, 260, null, { fill: TINT.mg, iconName: "virtual-networks" });
  txt("st-t", 1110, 1250, "Delegated storage subnet", { size: 18 });
  card("anf", 1640, 1080, 300, 170, "azure-netapp-files", "Azure NetApp Files");

  both("f1", "onpgw", "right", 215, "gw", "left", 215); step("s1", 380, 150, 1);
  step("s2", 630, 250, 2);
  both("hub-sap", "hub", "right", 520, "app", "left", 520);
  line("g-lb", "gw", "right", 235, "lb1", "left", 235, [], { dashed: true });
  line("lb-lb", "lb1", "right", 215, "lb2", "left", 215, [], { dashed: true });
  line("lb-as", "lb1", "right", 275, "as", "top", 1575, [1575], { dashed: true });
  line("lb-db", "lb2", "right", 245, "db", "left", 245, [], { dashed: true });
  step("s3", 1600, 330, 3);
  line("lb-web", "lb1", "bottom", 1265, "web", "top", 1265, [], { dashed: true }); step("s4", 1190, 380, 4);
  step("s5", 1710, 520, 5);
  line("lb-cs", "lb2", "bottom", 1865, "cs", "top", 1865, [], { dashed: true });
  step("s6", 2200, 520, 6);
  line("db-disk", "db", "bottom", 2400, "disk", "top", 2400, [], { dashed: true });
  line("db-st", "db", "bottom", 2470, "st", "top", 2470, [], { dashed: true });

  txt("footer", 60, 1370, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Run SAP BW/4HANA with Linux virtual machines on Azure\"", { size: 20, color: "#495057" });
}
