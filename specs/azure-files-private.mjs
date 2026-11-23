// 054 Azure enterprise cloud file share (055 is the same article).
export const meta = {
  num: 54,
  slug: "azure-files-private",
  title: "Azure enterprise cloud file share",
  url: "https://learn.microsoft.com/azure/architecture/hybrid/azure-files-private",
  category: "Storage",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Customer edge router / VPN device": "virtual-router", "ExpressRoute / VPN Gateway": "virtual-network-gateways", "Private endpoint": "private-endpoints", "Azure File Sync": "storage-sync-services", "Azure Files": "storage-azure-files", "Azure Backup": "backup-vault", "DNS server / Azure DNS private resolver": "dns-private-resolver", "Private DNS zones": "dns-zones", "Azure virtual network": "virtual-networks" },
  differences: ["On-premises file server, clients and domain controller are plain sketch shapes (non-Azure)."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, both, line, step } = k;
  txt("title", 40, 10, "Azure enterprise cloud file share", { size: 30 });

  group("onp", 40, 120, 1000, 720, "On-premises", { fill: TINT.white, dashed: true, stroke: "#4a90d9", size: 20, align: "center" });
  box("fs", 120, 200, 220, 110, "File server\n(cloud tiering)", { fill: TINT.mg, size: 18 });
  step("s4", 70, 200, 4);
  card("edge", 700, 190, 240, 160, "virtual-router", "Customer edge\nrouter/VPN device");
  step("s5", 960, 190, 5);
  box("c1", 120, 620, 180, 90, "Client-1", { fill: TINT.mg, size: 18 });
  step("s1", 70, 640, 1);
  txt("dots", 320, 650, "...", { size: 20 });
  box("c2", 400, 620, 180, 90, "Client-2", { fill: TINT.mg, size: 18 });
  step("s2", 350, 580, 2);
  box("dc", 700, 610, 240, 110, "Domain controller\nand DNS server", { fill: TINT.mg, size: 18 });
  step("s3", 960, 640, 3);

  both("fs-edge", "fs", "right", 255, "edge", "left", 255, [], { dashed: true });
  txt("afs-lbl", 400, 210, "Azure File Sync traffic", { size: 16 });
  both("fs-c1", "fs", "bottom", 180, "c1", "top", 180, [], { dashed: true });
  txt("smb1", 60, 430, "SMB (file\nserver)", { size: 16 });
  both("c1-edge", "c1", "top", 260, "edge", "bottom", 740, [400], { dashed: true });
  txt("smb2", 380, 360, "SMB (Azure file share)", { size: 16 });
  arrow("fs-dc", "fs", "bottom", 300, "dc", "top", 780, [470], { dashed: true });
  txt("dnsq1", 520, 480, "DNS query", { size: 16 });
  both("c2-dc", "c2", "right", 665, "dc", "left", 665, [], { dashed: true });
  txt("dnsq2", 595, 625, "DNS\nquery", { size: 16 });
  both("edge-dc", "edge", "bottom", 880, "dc", "top", 880, [], { dashed: true });
  txt("fwd1", 890, 420, "Forwarded\nDNS query", { size: 16 });

  group("az", 1260, 120, 1060, 720, "Azure", { fill: TINT.white, dashed: true, stroke: "#4a90d9", size: 20, align: "center" });
  card("gw", 1320, 190, 240, 160, "virtual-network-gateways", "ExpressRoute/VPN\nGateway");
  step("s6", 1280, 190, 6);
  group("pe", 1800, 160, 300, 620, "Private endpoint\nsubnet", { fill: TINT.mg, size: 16 });
  step("s7", 1820, 230, 7);
  card("pe1", 1870, 290, 200, 160, "private-endpoints", "Private\nendpoint");
  card("pe2", 1870, 560, 200, 160, "private-endpoints", "Private\nendpoint");
  card("dnsr", 1320, 600, 260, 170, "dns-private-resolver", "DNS server/Azure\nDNS private resolver");
  step("s8", 1280, 600, 8);
  card("vnet", 2120, 700, 180, 120, "virtual-networks", "Azure virtual\nnetwork");

  card("afsync", 2400, 290, 220, 160, "storage-sync-services", "Azure File Sync");
  step("s9", 2640, 290, 9);
  card("afiles", 2400, 560, 220, 160, "storage-azure-files", "Azure Files");
  step("s10", 2640, 560, 10);
  card("bkp", 2400, 900, 220, 160, "backup-vault", "Azure Backup");
  step("s13", 2640, 900, 13);

  both("tunnel", "edge", "right", 270, "gw", "left", 270, [], { dashed: true });
  txt("tun-lbl", 1050, 290, "ExpressRoute circuit/\nVPN tunnel\nSMB, DNS, Azure\nFile Sync traffic", { size: 16 });
  both("gw-pe", "gw", "right", 230, "pe", "left", 230, [], { dashed: true });
  txt("gwpe-lbl", 1590, 170, "SMB, Azure File\nSync traffic", { size: 16 });
  both("gw-dnsr", "gw", "bottom", 1440, "dnsr", "top", 1440, [], { dashed: true });
  txt("fwd2", 1455, 440, "Forwarded\nDNS query", { size: 16 });
  line("pe1-afs", "pe1", "right", 370, "afsync", "left", 370);
  line("pe2-af", "pe2", "right", 640, "afiles", "left", 640);
  arrow("af-bkp", "afiles", "bottom", 2510, "bkp", "top", 2510);
  txt("bkp-lbl", 2525, 790, "Backup", { size: 16 });

  card("pdns1", 1100, 1000, 340, 170, "dns-zones", "<region>.privatelink.afs.azure.net\nAzure File Sync private DNS");
  step("s11", 1460, 1000, 11);
  card("pdns2", 1620, 1000, 340, 170, "dns-zones", "privatelink.file.core.windows.net\nAzure Files private DNS");
  step("s12", 1980, 1000, 12);
  both("d1", "dnsr", "bottom", 1380, "pdns1", "top", 1380, [], { dashed: true });
  txt("dns1", 1395, 900, "DNS", { size: 16 });
  both("d2", "dnsr", "bottom", 1500, "pdns2", "top", 1700, [900], { dashed: true });
  txt("dns2", 1715, 930, "DNS", { size: 16 });

  txt("footer", 40, 1240, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Azure enterprise cloud file share\"", { size: 20, color: "#495057" });
}
