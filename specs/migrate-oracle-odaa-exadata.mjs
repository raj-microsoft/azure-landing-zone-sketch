// 102 Migrate an Oracle database to OD@A Exadata Database Service.
export const meta = {
  num: 102,
  slug: "migrate-oracle-odaa-exadata",
  title: "Migrate an Oracle database to OD@A Exadata Database Service",
  url: "https://learn.microsoft.com/azure/architecture/databases/idea/migrate-oracle-odaa-exadata",
  category: "Databases",
  status: "done",
  otherDiagrams: ["img1, img2: migration variants with additional services"],
  substitutions: { "Source database": "oracle-database", "Gateway": "virtual-network-gateways", "Azure Firewall/NVA": "firewalls", "Oracle Database@Azure": "oracle-database", "Gateway subnet": "subnet" },
  differences: ["Same layout as 101 except the target is Oracle Database@Azure in a delegated subnet; on-premises building glyph omitted."],
};

export function draw(k) {
  const { TINT, txt, card, group, icon, arrow } = k;
  const S = 16;
  txt("title", 40, 0, "Migrate Oracle to Oracle Database@Azure Exadata", { size: 28 });
  group("onp", 40, 60, 380, 920, null, { fill: TINT.onprem });
  txt("onp-lbl", 70, 80, "On-premises", { size: 22 });
  group("net", 70, 150, 320, 420, null, { fill: TINT.white, dashed: true });
  card("src", 110, 180, 240, 160, "oracle-database", "Source database", { size: S });
  txt("net-lbl", 200, 500, "Network\n192.168.0.0/16", { size: 16 });
  group("az", 640, 60, 1580, 920, null, { fill: TINT.white });
  txt("az-lbl", 1880, 80, "Azure availability zone 1", { size: 22 });
  group("hub", 670, 150, 560, 800, null, { fill: TINT.sub, dashed: true });
  icon("hub-i", "virtual-networks", 685, 160, 44);
  txt("hub-lbl", 960, 900, "Hub virtual network", { size: 18 });
  group("gws", 700, 230, 500, 300, null, { fill: TINT.white, dashed: true });
  icon("gws-i", "subnet", 1140, 240, 44);
  card("gw", 730, 270, 200, 150, "virtual-network-gateways", "Gateway", { size: S });
  txt("gws-lbl", 1000, 450, "Gateway subnet\n10.0.1.0/24", { size: 16 });
  group("hs", 700, 580, 500, 300, null, { fill: TINT.white, dashed: true });
  card("fw", 730, 610, 240, 160, "firewalls", "Azure Firewall/NVA\n10.0.0.5", { size: S });
  txt("hs-lbl", 1020, 800, "Hub subnet\n10.0.0.0/24", { size: 16 });
  group("ovn", 1560, 300, 620, 640, null, { fill: TINT.sub, dashed: true });
  icon("ovn-i", "virtual-networks", 1575, 310, 44);
  txt("ovn-lbl", 1860, 890, "Database virtual network", { size: 18 });
  group("dbs", 1600, 390, 540, 400, null, { fill: TINT.white, dashed: true });
  card("vm", 1720, 430, 280, 180, "oracle-database", "Oracle Database\n@Azure\n10.42.1.236", { size: S });
  txt("dbs-lbl", 1880, 710, "Oracle delegated subnet\n10.42.1.0/24", { size: 16 });
  arrow("a-er", "net", "right", 345, "gw", "left", 345);
  txt("er-lbl", 440, 280, "Azure\nExpressRoute", { size: 18 });
  arrow("a-peer", "hub", "right", 730, "ovn", "left", 730, [], { head: null });
  txt("peer-lbl", 1340, 690, "Peering", { size: 16 });
  txt("footer", 40, 1010, "Pencil-sketch redraw of the Azure Architecture Center diagram \"migrate a database to ODAA\"", { size: 20, color: "#495057" });
}
