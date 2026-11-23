// 057 Azure Virtual Desktop for Azure Local.
export const meta = {
  num: 57,
  slug: "azure-local-workload-virtual-desktop",
  title: "Azure Virtual Desktop for Azure Local",
  url: "https://learn.microsoft.com/azure/architecture/hybrid/azure-local-workload-virtual-desktop",
  category: "Hybrid",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Azure portal": "management-portal", "ARM / Bicep templates": "templates", "Azure CLI and tools": "azure-cloud-shell", "Azure": "azure-a", "Microsoft Entra ID": "entra-connect", "Azure Virtual Desktop": "azure-virtual-desktop", "Azure Site Recovery": "recovery-services-vaults", "Azure Backup": "backup-vault", "Azure File Sync": "storage-sync-services", "Azure Update Manager": "update-management-center", "Azure Policy": "policy", "Azure Monitor": "monitor", "Azure Key Vault": "key-vaults", "Microsoft Defender for Cloud": "microsoft-defender-for-cloud", "Azure Arc / Arc agent / Arc resource bridge": "azure-arc", "AD DS": "entra-domain-services", "Azure Local instance": "azure-local", "Azure Local VMs": "virtual-machine", "User profiles": "users" },
  differences: ["Hyper-V, Storage Spaces Direct and NAS / SMB file share are plain sketch shapes."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, both, step, icon } = k;
  const RED = "#c92a2a", NAVY = "#364fc7", LB = "#4dabf7", OR = "#e8590c";
  txt("title", 40, 10, "Azure Virtual Desktop for Azure Local", { size: 30 });

  group("cp", 40, 70, 2400, 120, null, { fill: TINT.mg });
  icon("cp-i1", "management-portal", 70, 100, 48);
  icon("cp-i2", "templates", 130, 100, 48);
  icon("cp-i3", "azure-cloud-shell", 190, 100, 48);
  txt("cp-lbl", 1240, 90, "Control plane\nThe Azure portal, Azure Resource Management template and Bicep templates, the Azure CLI and tools", { size: 20, align: "center" });

  group("az", 40, 220, 2400, 290, null, { fill: TINT.mg });
  icon("az-i", "azure-a", 80, 320, 64);
  card("entra", 220, 240, 200, 240, "entra-connect", "Microsoft\nEntra ID");
  card("avd", 690, 240, 200, 240, "azure-virtual-desktop", "Azure Virtual\nDesktop");
  txt("auth-lbl", 440, 250, "User authentication\nand token exchange\nduring login", { size: 16 });
  step("s2", 520, 400, 2);
  const svc = [["asr", "recovery-services-vaults", "Azure Site Recovery"], ["bk", "backup-vault", "Azure Backup"], ["afs", "storage-sync-services", "Azure File Sync"], ["upd", "update-management-center", "Azure Update Manager"],
    ["pol", "policy", "Azure Policy"], ["mon", "monitor", "Azure Monitor"], ["kv", "key-vaults", "Azure Key Vault"], ["def", "microsoft-defender-for-cloud", "Microsoft Defender\nfor Cloud"]];
  svc.forEach(([id, ic, l], i) => box(id, 920 + (i % 4) * 320, 240 + Math.floor(i / 4) * 125, 300, 110, l, { iconLeft: ic, size: 18 }));
  card("other", 2210, 240, 210, 240, "azure-arc", "Other Azure\nservices\nintegration\nvia Azure Arc");

  box("adds", 160, 700, 420, 140, "Active Directory Domain\nServices (AD DS)", { fill: TINT.mg, iconLeft: "entra-domain-services", size: 18 });
  group("dev", 1600, 580, 420, 330, null, { fill: TINT.mg });
  card("avdc", 1630, 600, 360, 190, "azure-virtual-desktop", "Azure Virtual Desktop client");
  txt("dev-lbl", 1730, 840, "User devices", { size: 18 });
  step("s1", 1530, 570, 1);
  step("s3", 780, 540, 3);
  step("s4", 2340, 520, 4);

  both("e-ad", "entra", "bottom", 320, "adds", "top", 320, [], { color: NAVY });
  txt("sync-lbl", 340, 530, "Hybrid identity sync between\non-premises AD DS and cloud-based\nMicrosoft Entra ID for local\nauthentication and cloud access", { size: 16, color: NAVY });
  both("e-avd", "entra", "right", 360, "avd", "left", 360, [], { color: NAVY });
  arrow("dev-avd", "dev", "left", 620, "avd", "bottom", 840, [840], { color: RED });
  txt("sess-lbl", 860, 590, "Session initiation to Azure Virtual Desktop in Azure from user's device", { size: 16, color: RED });

  group("loc", 40, 1000, 1960, 760, null, { fill: "#fff0f0" });
  card("aloc", 60, 1240, 200, 180, "azure-local", "Azure Local\ninstance");
  group("vms", 290, 1030, 320, 330, null, { fill: TINT.white });
  [[310, 1050], [460, 1050], [310, 1190], [460, 1190]].forEach(([x, y], i) => k.icon(`vm${i}`, "virtual-machine", x + 40, y + 20, 64));
  txt("vms-lbl", 340, 1300, "Azure Local VMs", { size: 18 });
  group("sh", 650, 1030, 1000, 330, null, { fill: TINT.white });
  box("agent", 680, 1060, 450, 110, "Azure Virtual Desktop agent", { iconLeft: "azure-virtual-desktop", fill: TINT.mg, size: 18 });
  box("arcag", 1160, 1060, 460, 110, "Azure Arc agent", { iconLeft: "azure-arc", fill: TINT.mg, size: 18 });
  card("shosts", 950, 1190, 400, 150, "azure-virtual-desktop", "Azure Virtual Desktop (session hosts)");
  txt("prof-lbl", 1680, 1030, "User profile storage location:\nDedicated NAS or SMB file share\nstorage (preferred option)\nor\nS2D pool on Azure Local instance", { size: 16, color: "#1971c2" });

  group("rel", 290, 1400, 1690, 330, null, { fill: "#fffbe6" });
  box("hv", 320, 1430, 420, 180, "Hyper-V", { size: 20 });
  card("arb", 770, 1430, 300, 180, "azure-arc", "Azure Arc\nresource bridge");
  box("s2d", 1100, 1430, 500, 180, "Storage Spaces Direct (S2D)", { size: 20, align: "left" });
  card("up1", 1640, 1430, 300, 180, "users", "User profiles");
  txt("rel-lbl", 900, 1650, "Azure Local version releases", { size: 18 });
  step("s5", 1600, 1640, 5);

  group("nas", 2070, 1300, 370, 380, null, { fill: "#ebfbee" });
  card("up2", 2110, 1330, 290, 180, "users", "User profiles");
  txt("nas-lbl", 2090, 1560, "Network attached storage\nor SMB file share", { size: 16 });

  arrow("ad-sh", "adds", "right", 770, "sh", "top", 700, [700], { color: NAVY, tail: "arrow" });
  txt("cred-lbl", 800, 740, "User credential validation, group policy application", { size: 16, color: NAVY });
  arrow("sh-avd", "sh", "top", 760, "avd", "bottom", 760, [], { color: LB });
  txt("ag-lbl", 800, 860, "Azure Virtual Desktop agent connects to Azure and handles\nsession brokering, user sessions, metering, and diagnostics", { size: 16, color: LB });
  both("rdp", "dev", "bottom", 1700, "sh", "top", 1300, [960], { color: RED });
  txt("rdp-lbl", 1720, 912, "RDP Shortpath (with VPN)\nor Direct UDP connection", { size: 16, color: RED });
  arrow("arc", "other", "bottom", 2320, "sh", "top", 1500, [980], { color: OR });
  txt("arc-lbl", 2060, 600, "Azure Arc agent integration\nfor extra governance,\nmonitoring, and life cycle\nmanagement", { size: 16, color: OR });
  both("sh-up1", "sh", "right", 1250, "up1", "top", 1880, [1880], { color: "#1971c2" });
  both("sh-up2", "sh", "right", 1340, "up2", "top", 2250, [2030, 1240, 2250], { color: "#1971c2" });

  txt("footer", 40, 1800, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Azure Virtual Desktop for Azure Local\"", { size: 20, color: "#495057" });
}
