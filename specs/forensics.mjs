// 047 Computer forensics chain of custody in Azure.
export const meta = {
  num: 47,
  slug: "forensics",
  title: "Computer forensics chain of custody in Azure",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/forensics/",
  category: "Security",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Microsoft Entra ID": "entra-connect", "Management group organization (people)": "users", "Subscription": "subscriptions", "Internet": "globe-success", "Azure Firewall / on-premises firewall": "firewalls", "ExpressRoute / VPN gateway": "virtual-network-gateways", "ExpressRoute circuit": "expressroute-circuits", "Azure DDoS standard": "ddos-protection-plans", "Azure DNS": "dns-zones", "Resource group": "resource-groups", "Key Vault": "key-vaults", "Azure Monitor": "monitor", "Recovery services vault": "recovery-services-vaults", "DC / VMs / HRW": "virtual-machine", "Microsoft Entra Domain Services": "entra-domain-services", "Cost management": "cost-management", "Role assignment": "entra-identity-roles-and-administrators", "Policy assignment": "policy", "Network Watcher": "network-watcher", "Defender for Cloud": "microsoft-defender-for-cloud", "Azure Update Manager": "update-management-center", "UDR": "route-tables", "NSG": "network-security-groups", "OS / data disks": "disks", "Snapshots": "disks-snapshots", "Automation account / runbook": "automation-accounts", "Log Analytics workspace": "log-analytics-workspaces", "Storage account": "storage-accounts", "File share": "azure-fileshares", "Immutable blob container": "blob-block", "On-premises router": "virtual-router", "Remote P2S VPN users": "users" },
  differences: ["Links from management groups to individual subscriptions are omitted; subscriptions sit under their groups in the same order.", "Identity subscription services are a 3x2 grid instead of one row.", "VM01-to-disk links run as orthogonal lines.", "Application icons on premises are text boxes."],
};

const SVC = [["cost-management", "Cost\nmanagement"], ["entra-identity-roles-and-administrators", "Role\nassignment"], ["policy", "Policy\nassignment"], ["network-watcher", "Network\nWatcher"], ["microsoft-defender-for-cloud", "Defender\nfor Cloud"], ["update-management-center", "Update\nManager"]];

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, line, both } = k;
  const svc = (p, x, y, w, h, stepX, cols = 6, stepY = 0) => SVC.forEach(([ic, l], i) => card(`${p}${i}`, x + (i % cols) * stepX, y + Math.floor(i / cols) * stepY, w, h, ic, l, { size: 16 }));
  txt("title", 60, 10, "Computer forensics chain of custody in Azure", { size: 30 });
  card("entra", 940, 40, 340, 190, "entra-connect", "Microsoft Entra ID\nService principal(s)\nSecurity group(s)\nUsers", { size: 16 });
  card("inet1", 40, 860, 160, 120, "globe-success", "Internet", { size: 16 });

  // Management groups and subscriptions
  group("org", 220, 240, 1160, 740, "Management group and subscription organization", { fill: TINT.sub, iconName: "users" });
  box("root", 860, 290, 280, 60, "Tenant root group", { size: 16 });
  group("mg", 260, 380, 1080, 330, "Management group", { fill: TINT.mg });
  box("contoso", 900, 400, 200, 60, "Contoso", { size: 16 });
  box("plat", 380, 520, 180, 60, "Platform", { size: 16 });
  box("lzs", 700, 520, 200, 60, "Landing zones", { size: 16 });
  box("dec", 940, 520, 220, 60, "Decommissioned", { size: 16 });
  box("sbx", 1180, 520, 140, 60, "Sandbox", { size: 16 });
  box("idm", 270, 630, 150, 60, "Identity", { size: 16 });
  box("mgm", 430, 630, 170, 60, "Management", { size: 16 });
  box("con", 610, 630, 170, 60, "Connectivity", { size: 16 });
  box("corp", 790, 630, 120, 60, "Corp", { size: 16 });
  box("onl", 920, 630, 120, 60, "Online", { size: 16 });
  group("subs", 260, 740, 1080, 210, null, { fill: TINT.white });
  txt("subs-lbl", 560, 895, "Subscriptions", { size: 18 });
  const subs = [["idsub", "Identity\nsubscription"], ["mgsub", "Management\nsubscription"], ["cnsub", "Connectivity\nsubscription"], ["lzpsub", "Landing zone\nproduction"], ["decsub", "Decommissioned\nsubscription"], ["sbsub", "Sandbox\nsubscription 1"]];
  subs.forEach(([id, l], i) => box(id, 275 + i * 177, 760, 165, 70, l, { size: 16 }));
  box("socsub", 1160, 860, 165, 70, "SOC\nsubscription", { size: 16 });
  line("t0", "root", "bottom", 1000, "contoso", "top", 1000);
  line("t1", "contoso", "bottom", 920, "plat", "top", 470, [480]);
  line("t2", "contoso", "bottom", 960, "lzs", "top", 800, [495]);
  line("t3", "contoso", "bottom", 1040, "dec", "top", 1050, [495]);
  line("t4", "contoso", "bottom", 1080, "sbx", "top", 1250, [480]);
  line("t5", "plat", "bottom", 400, "idm", "top", 345, [605]);
  line("t6", "plat", "bottom", 470, "mgm", "top", 470);
  line("t7", "plat", "bottom", 540, "con", "top", 695, [605]);
  line("t8", "lzs", "bottom", 780, "corp", "top", 850, [605]);
  line("t9", "lzs", "bottom", 860, "onl", "top", 980, [615]);
  line("e-root", "entra", "bottom", 1000, "root", "top", 1100, [], {});

  // On-premises
  group("onp", 1600, 280, 580, 360, "On-premises", { fill: TINT.onprem });
  box("eds", 1640, 330, 500, 70, "Microsoft Entra Domain Services", { size: 16, iconLeft: "entra-domain-services" });
  for (let i = 0; i < 3; i++) box(`app${i}`, 1640, 420 + i * 70, 500, 60, "Application", { size: 16 });
  card("rt", 1620, 680, 170, 110, "virtual-router", "Router", { size: 16 });
  card("opfw", 1960, 680, 170, 110, "firewalls", "Firewall", { size: 16 });
  card("inet2", 1660, 1040, 170, 120, "globe-success", "Internet", { size: 16 });
  card("p2s", 2080, 1030, 300, 150, "users", "Remote P2S VPN users", { size: 16 });

  // Connectivity subscription
  group("conn", 700, 1030, 780, 560, "Connectivity subscription", { fill: TINT.sub, iconName: "subscriptions" });
  group("hub", 730, 1090, 460, 320, "Hub virtual network 1", { fill: TINT.hub, iconName: "virtual-networks" });
  group("fwsub", 745, 1140, 200, 250, "AzureFirewallSubnet", { fill: TINT.white, size: 16 });
  card("fw", 755, 1200, 180, 150, "firewalls", "Azure Firewall", { size: 16 });
  group("gwsub", 960, 1140, 215, 260, "GatewaySubnet", { fill: TINT.white, size: 16 });
  card("ergw", 975, 1175, 185, 100, "virtual-network-gateways", "ExpressRoute\ngateway", { size: 16 });
  card("vpngw", 975, 1290, 185, 100, "virtual-network-gateways", "VPN gateway\n(S2S & P2S)", { size: 16 });
  card("ddos", 1210, 1080, 125, 95, "ddos-protection-plans", "DDoS\nstandard", { size: 16 });
  card("adns", 1345, 1085, 120, 90, "dns-zones", "Azure\nDNS", { size: 16 });
  card("erc", 1220, 1180, 200, 110, "expressroute-circuits", "ExpressRoute\ncircuit", { size: 16 });
  txt("vpn-lbl", 1240, 1300, "VPN", { size: 16 });
  svc("cs", 720, 1440, 120, 130, 125);

  // Identity subscription
  group("ids", 40, 1160, 640, 680, "Identity subscription", { fill: TINT.sub, iconName: "subscriptions" });
  [["resource-groups", "Resource group(s)"], ["key-vaults", "Azure Key Vault"], ["monitor", "Azure Monitor"], ["recovery-services-vaults", "Recovery services\nvault(s)"]].forEach(([ic, l], i) => box(`idl${i}`, 60, 1220 + i * 80, 250, 70, l, { size: 16, iconLeft: ic }));
  group("idv", 330, 1220, 330, 300, "Identity virtual\nnetwork region", { fill: TINT.white, iconName: "virtual-networks", size: 16 });
  card("dcs", 350, 1280, 290, 90, "virtual-machine", "DC1, DC2", { size: 16 });
  txt("or-lbl", 470, 1378, "OR", { size: 16 });
  card("ideds", 350, 1410, 290, 100, "entra-domain-services", "Microsoft Entra\nDomain Services", { size: 16 });
  svc("is", 60, 1560, 190, 120, 200, 3, 140);

  // Landing zone production subscription
  group("lz", 700, 1640, 780, 900, "Landing zone production subscription", { fill: TINT.sub, iconName: "subscriptions" });
  group("prg", 730, 1700, 700, 640, null, { fill: TINT.mg, iconName: "resource-groups" });
  txt("prg-lbl", 1200, 1712, "CoC-Production", { size: 16 });
  group("pvn", 750, 1750, 660, 200, "CoC-Production-vnet (server subnet)", { fill: TINT.hub, iconName: "virtual-networks", size: 16 });
  card("udr", 765, 1800, 120, 130, "route-tables", "UDR", { size: 16 });
  ["VM01", "VM02", "VM_n"].forEach((v, i) => card(`pvm${i}`, 900 + i * 130, 1800, 120, 130, "virtual-machine", `CoC-Prod-\n${v}`, { size: 16 }));
  card("pnsg", 1285, 1800, 120, 130, "network-security-groups", "NSG", { size: 16 });
  ["osdisk", "DataDisk-00", "DataDisk-01"].forEach((d, i) => card(`pd${i}`, 900 + i * 130, 1980, 120, 110, "disks", d, { size: 16 }));
  line("vd0", "pvm0", "bottom", 940, "pd0", "top", 940, [], { dashed: true });
  line("vd1", "pvm0", "bottom", 980, "pd1", "top", 1070, [1970], { dashed: true });
  line("vd2", "pvm0", "bottom", 1000, "pd2", "top", 1220, [1960], { dashed: true });
  group("psn", 750, 2110, 660, 210, "Temporary snapshots created by CoC Runbook", { fill: TINT.white, size: 16 });
  ["osdisk", "DataDisk-00", "DataDisk-01"].forEach((d, i) => card(`ps${i}`, 770 + i * 150, 2155, 140, 150, "disks-snapshots", `Temporary\n${d}\nsnapshot`, { size: 16 }));
  svc("ls", 720, 2370, 120, 130, 125);

  // Sandbox SOC subscription
  group("soc", 1520, 1280, 880, 1140, "Sandbox SOC subscription", { fill: TINT.sub, iconName: "subscriptions" });
  group("srg", 1550, 1340, 820, 900, "CoC-SOC", { fill: TINT.mg, iconName: "resource-groups" });
  group("svn", 1570, 1390, 360, 260, "CoC-SOC-vnet", { fill: TINT.hub, iconName: "virtual-networks", size: 16 });
  card("hrw", 1590, 1460, 190, 160, "virtual-machine", "CoC-SOC-HRW\n(soc-subnet01)", { size: 16 });
  card("snsg", 1800, 1460, 120, 160, "network-security-groups", "Subnet\nNSG", { size: 16 });
  group("auto", 1960, 1390, 260, 260, "CoC-SOC-\nAutomationAcct", { fill: TINT.white, iconName: "automation-accounts", size: 16 });
  card("rb", 1975, 1460, 230, 170, "file", "Copy-VmDigital\nEvidenceWin\nCoC RunBook", { size: 16 });
  card("law", 2240, 1390, 125, 140, "log-analytics-workspaces", "CoC-SOC-\nLogAnWks", { size: 16 });
  card("kv", 2240, 1540, 125, 140, "key-vaults", "CoC-SOC-\nkeyvault", { size: 16 });
  group("sst", 1570, 1690, 780, 520, "cocsocstoragexxx", { fill: TINT.white, iconName: "storage-accounts", size: 16 });
  group("fs", 1590, 1740, 740, 220, null, { fill: TINT.sub, iconName: "azure-fileshares" });
  ["OSdisk", "DataDisk-00", "DataDisk-01"].forEach((d, i) => card(`fs${i}`, 1610 + i * 150, 1770, 130, 160, "disks-snapshots", `Temporary\n${d}\nsnapshot`, { size: 16 }));
  txt("fs-lbl", 2060, 1800, "Temporary snapshots stored\nin the File Share for\nhash calculation", { size: 16 });
  group("blob", 1590, 1990, 740, 200, null, { fill: TINT.sub, iconName: "blob-block" });
  ["osdisk", "DataDisk-00", "DataDisk-01"].forEach((d, i) => card(`bd${i}`, 1610 + i * 150, 2020, 130, 150, "disks", d, { size: 16 }));
  txt("blob-lbl", 2060, 2040, "Digital evidences stored\nin the immutable\nblob container", { size: 16 });
  svc("ss", 1560, 2270, 125, 130, 135);

  // Connections
  both("e-onp", "entra", "right", 130, "onp", "top", 1900);
  arrow("id-l", "idsub", "bottom", 300, "ids", "top", 300, [], { dashed: true });
  arrow("lz-l", "lzpsub", "bottom", 880, "lz", "top", 1440, [1005, 1480, 1620], { dashed: true });
  arrow("soc-l", "socsub", "right", 895, "soc", "top", 1560, [1500, 1260], { dashed: true });
  both("er-c", "ergw", "right", 1230, "erc", "left", 1230);
  both("c-rt", "erc", "right", 1235, "rt", "bottom", 1630);
  both("vpn-i", "vpngw", "right", 1340, "inet2", "left", 1115, [1490]);
  both("i-p2s", "inet2", "right", 1100, "p2s", "left", 1100);
  arrow("i-fw", "inet2", "top", 1760, "opfw", "bottom", 2020, [900]);
  line("peer1", "idv", "right", 1300, "hub", "left", 1300, [], { color: "#1971c2" });
  line("peer2", "hub", "left", 1380, "pvn", "top", 760, [715, 1730], { color: "#1971c2" });
  txt("peer-lbl", 730, 1600, "Virtual network peering", { size: 16 });
  both("hrw-rb", "hrw", "bottom", 1690, "rb", "left", 1545, [1670, 1950], { dashed: true, color: "#7048e8" });
  arrow("rb-fs", "rb", "bottom", 2090, "fs", "top", 2090, [], { dashed: true });
  arrow("rb-bl", "rb", "bottom", 2000, "blob", "left", 2090, [1680, 1580], { dashed: true });

  txt("footer", 60, 2580, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Computer forensics chain of custody in Azure\"", { size: 20, color: "#495057" });
}
