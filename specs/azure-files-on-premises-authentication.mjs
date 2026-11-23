// 108 Azure Files accessed on-premises and secured by AD DS.
export const meta = {
  num: 108,
  slug: "azure-files-on-premises-authentication",
  title: "Azure Files accessed on-premises and secured by AD DS",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/hybrid/azure-files-on-premises-authentication",
  category: "Hybrid + multicloud",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Microsoft Entra ID": "entra-connect", "Azure VPN Gateway": "virtual-network-gateways", "Azure DNS (proxy VM)": "virtual-machine", "Azure Files": "storage-azure-files", "Azure Backup": "backup-vault", "Azure (Internal) DNS": "dns-zones", "User": "users" },
  differences: ["VPN device and AD DS/DNS server are on-premises products drawn as labelled sketch shapes."],
};

export function draw(k) {
  const { TINT, txt, card, group, box, icon, arrow, step } = k;
  const S = 16;
  const both = (id, f, fs, fa, t, ts, ta, lanes = [], o = {}) => arrow(id, f, fs, fa, t, ts, ta, lanes, { tail: "arrow", ...o });
  const dash = (id, f, fs, fa, t, ts, ta, lanes = []) => arrow(id, f, fs, fa, t, ts, ta, lanes, { dashed: true });
  txt("title", 40, 0, "Azure Files accessed on-premises and secured by AD DS", { size: 28 });
  txt("onp-lbl", 260, 60, "On-premises", { size: 24 });
  group("onp", 40, 100, 600, 560, null, { fill: TINT.onprem, dashed: true });
  txt("az-lbl", 1100, 60, "Azure", { size: 24 });
  group("az", 800, 100, 700, 560, null, { fill: TINT.sub, dashed: true });

  box("vpnd", 380, 180, 200, 110, "VPN device", { size: 18, fill: TINT.white });
  card("user", 70, 440, 160, 130, "users", "User", { size: S });
  box("ads", 360, 450, 220, 130, "AD DS and\nDNS server", { size: 18, fill: TINT.white });
  step("s7", 440, 380, 7);

  card("vgw", 840, 180, 200, 130, "virtual-network-gateways", "Azure VPN\nGateway", { size: S });
  group("pes", 1120, 130, 340, 230, null, { fill: TINT.white });
  txt("pes-lbl", 1150, 140, "Private endpoint subnet", { size: 18 });
  card("pe", 1180, 190, 200, 120, "private-endpoints", "Private endpoint", { size: S });
  step("s5", 1400, 300, 5);
  group("fws", 1120, 400, 340, 230, null, { fill: TINT.white });
  txt("fws-lbl", 1140, 410, "VM or Azure Firewall subnet", { size: 18 });
  card("dnsp", 1180, 460, 180, 140, "virtual-machine", "Azure DNS", { size: S });
  step("s6", 1400, 470, 6);
  icon("vnet-i", "virtual-networks", 820, 600, 40);
  txt("vnet-lbl", 870, 596, "Azure Virtual\nNetwork", { size: 18 });
  step("s2", 1070, 600, 2);

  card("files", 1600, 180, 200, 130, "storage-azure-files", "Azure Files", { size: S });
  step("s4", 1650, 120, 4);
  card("bk", 1600, 420, 200, 130, "backup-vault", "Azure Backup", { size: S });
  card("entra", 640, 800, 220, 140, "entra-connect", "Microsoft Entra ID", { size: S });
  card("dns", 1120, 780, 320, 150, "dns-zones", "Azure (Internal) DNS\nprivatelink.file.core.windows.net", { size: S });

  arrow("a-smb", "user", "top", 150, "vpnd", "left", 235);
  txt("smb-lbl", 170, 330, "SMB (Azure file share)", { size: 16 });
  arrow("a-dq", "user", "right", 505, "ads", "left", 505);
  txt("dq-lbl", 240, 470, "DNS query", { size: 16 });
  both("a-er", "vpnd", "right", 235, "vgw", "left", 235);
  txt("er-lbl", 650, 150, "ExpressRoute or\nVPN site-to-site", { size: 16 });
  step("s3", 700, 50, 3);
  both("a-smb2", "vgw", "right", 250, "pes", "left", 250);
  txt("smb2-lbl", 1060, 200, "SMB", { size: 16 });
  both("a-pe", "pe", "right", 250, "files", "left", 250);
  txt("pe-lbl", 1510, 170, "Private\nendpoint", { size: 16 });
  arrow("a-fwd", "ads", "right", 515, "fws", "left", 515);
  txt("fwd-lbl", 655, 450, "Forwarded\nDNS query", { size: 16 });
  arrow("a-bk", "files", "bottom", 1700, "bk", "top", 1700);
  txt("bk-lbl", 1710, 350, "Backup", { size: 16 });
  arrow("a-dns", "dnsp", "bottom", 1270, "dns", "top", 1270);
  txt("dns-lbl", 1285, 700, "DNS", { size: 16 });
  dash("a-sync", "ads", "bottom", 430, "entra", "left", 870);
  txt("sync-lbl", 450, 830, "Synchronization", { size: 16 });
  step("s1", 520, 760, 1);
  dash("a-rbac", "files", "right", 280, "entra", "bottom", 750, [1860, 1000, 750]);
  txt("rbac-lbl", 800, 1010, "RBAC permission", { size: 16 });
  dash("a-ntfs", "files", "right", 300, "ads", "bottom", 400, [1900, 1080, 400]);
  txt("ntfs-lbl", 420, 1090, "NTFS permission (ACL)", { size: 16 });
  step("s8", 470, 1020, 8);
  txt("footer", 40, 1180, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Azure Files on-premises authentication\"", { size: 20, color: "#495057" });
}
