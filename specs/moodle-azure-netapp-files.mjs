// 099 Moodle deployment with Azure NetApp Files (img0: multiple zones with cross-zone replication).
export const meta = {
  num: 99,
  slug: "moodle-azure-netapp-files",
  title: "Moodle deployment with Azure NetApp Files",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/file-storage/moodle-azure-netapp-files",
  category: "Storage",
  status: "done",
  otherDiagrams: ["img1: single-zone Moodle with Azure NetApp Files"],
  substitutions: { "Students": "users", "Azure VPN Gateway": "virtual-network-gateways", "Virtual machine scale set": "vm-scale-sets", "Azure Database for MySQL": "azure-database-mysql-server", "NSG": "network-security-groups" },
  differences: ["Customer datacenter, VPN lock, NFS volumes and the NGINX/PHP/Apache/Moodle stack logos are labelled sketch shapes.", "Diagonal app-gateway-to-VM fan lines and the cross-zone replication ellipse are simplified."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, icon, arrow } = k;
  const S = 16;
  txt("title", 600, 0, "Highly available architecture for Moodle on Azure (multiple zones)", { size: 26 });
  card("stud", 60, 80, 160, 130, "users", "Students", { size: S });
  card("tm", 1000, 70, 220, 140, "traffic-manager-profiles", "Azure Traffic\nManager", { size: S });
  box("dc", 40, 620, 180, 110, "Customer\ndatacenter", { size: S, fill: TINT.onprem });
  box("lock", 260, 640, 120, 70, "VPN lock", { size: S, fill: TINT.onprem });
  card("vpng", 420, 600, 170, 150, "virtual-network-gateways", "Azure VPN\nGateway", { size: S });
  group("region", 620, 250, 1720, 820, null, { fill: TINT.white });
  txt("reg-lbl", 640, 260, "Azure region", { size: 18 });
  // Zone 1
  group("z1", 650, 300, 1120, 740, null, { fill: TINT.white });
  txt("z1-lbl", 1500, 312, "Zone 1", { size: 18 });
  group("vn1", 670, 350, 750, 670, null, { fill: TINT.sub });
  txt("vn1-lbl", 690, 360, "Virtual network  /  NSG", { size: 16 });
  card("ag1", 860, 400, 220, 120, "application-gateways", "Application\nGateway", { size: S });
  group("vmss1", 690, 550, 470, 160, null, { fill: TINT.white, dashed: true });
  card("vm1", 705, 565, 210, 130, "vm-scale-sets", "Virtual machine\nscale set", { size: S });
  box("stack1", 935, 580, 210, 100, "NGINX · PHP\nApache · Moodle", { size: S, fill: TINT.mg });
  card("redis1", 1180, 400, 220, 160, "azure-managed-redis", "Azure Managed\nRedis", { size: S });
  card("mysql", 1440, 400, 300, 170, "azure-database-mysql-server", "Azure Database for MySQL\nmanaged instance", { size: S });
  group("del1", 690, 740, 710, 260, null, { fill: TINT.white, dashed: true });
  txt("del1-lbl", 710, 750, "Delegated subnet", { size: 16 });
  card("anf1", 710, 800, 220, 150, "azure-netapp-files", "Azure NetApp\nFiles", { size: S });
  box("v1a", 1060, 790, 200, 60, "vol1", { size: S, fill: "#ffc9c9" });
  box("v2a", 1060, 860, 200, 60, "vol2", { size: S, fill: "#ffd8a8" });
  box("v3a", 1060, 930, 200, 60, "vol3", { size: S, fill: "#ffd8a8" });
  txt("nfs1-lbl", 1060, 750, "NFS volumes", { size: 16 });
  // Zone 2
  group("z2", 1800, 300, 520, 740, null, { fill: TINT.white });
  txt("z2-lbl", 2000, 312, "Zone 2", { size: 18 });
  group("vn2", 1820, 350, 480, 670, null, { fill: TINT.sub });
  txt("vn2-lbl", 1960, 360, "VNet / NSG", { size: 16 });
  card("ag2", 1840, 400, 200, 110, "application-gateways", "Application\nGateway", { size: S });
  card("vm2", 1840, 540, 200, 140, "vm-scale-sets", "VM scale set\n+ Moodle stack", { size: S });
  card("redis2", 2070, 400, 210, 130, "azure-managed-redis", "Azure Managed\nRedis", { size: S });
  card("mysql2", 2070, 550, 210, 150, "azure-database-mysql-server", "Azure Database\nfor MySQL\nmanaged instance", { size: S });
  group("del2", 1840, 740, 440, 260, null, { fill: TINT.white, dashed: true });
  icon("anf2", "azure-netapp-files", 1855, 748, 40);
  txt("anf2-lbl", 1905, 756, "NetApp Files", { size: 16 });
  box("v1b", 2060, 790, 200, 60, "vol1", { size: S, fill: TINT.app });
  box("v2b", 2060, 860, 200, 60, "vol2", { size: S, fill: TINT.app });
  box("v3b", 2060, 930, 200, 60, "vol3", { size: S, fill: TINT.app });
  txt("dr-lbl", 1860, 960, "NFS DR volumes", { size: 16 });
  txt("czr-lbl", 1450, 830, "Cross-zone replication", { size: 18 });
  arrow("a-st", "stud", "right", 140, "tm", "left", 140);
  arrow("a-tm1", "tm", "bottom", 1000, "ag1", "top", 1000, [], { color: "#1098ad" });
  arrow("a-tm2", "tm", "right", 140, "ag2", "top", 1880, [], { dashed: true, color: "#1098ad" });
  arrow("a-dc", "dc", "right", 675, "lock", "left", 675, [], { head: null });
  arrow("a-lk", "lock", "right", 675, "vpng", "left", 675);
  arrow("a-vg", "vpng", "right", 675, "vn1", "left", 675);
  arrow("a-ag1", "ag1", "bottom", 920, "vmss1", "top", 920, [], { color: "#1098ad" });
  arrow("a-sql", "redis1", "right", 480, "mysql", "left", 480, [], { head: null });
  arrow("r1", "v1a", "right", 820, "v1b", "left", 820, [], { dashed: true });
  arrow("r2", "v2a", "right", 890, "v2b", "left", 890, [], { dashed: true });
  arrow("r3", "v3a", "right", 960, "v3b", "left", 960, [], { dashed: true });
  txt("footer", 40, 1110, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Azure NetApp Files for Moodle with cross-zone replication\"", { size: 20, color: "#495057" });
}
