// 058 Siemens Teamcenter baseline architecture on Azure.
export const meta = {
  num: 58,
  slug: "teamcenter-baseline",
  title: "Siemens Teamcenter baseline architecture on Azure",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/manufacturing/teamcenter-baseline",
  category: "Manufacturing",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Internet": "globe-success", "Microsoft Entra ID": "entra-connect", "Teamcenter clients / Customer Support Team": "users", "Azure Virtual Desktop / CAD workstation": "azure-virtual-desktop", "Resource group": "resource-groups", "Virtual network / subnet": "virtual-networks", "Azure Firewall": "firewalls", "Azure Bastion": "bastions", "VPN Gateway": "virtual-network-gateways", "ExpressRoute": "expressroute-circuits", "App Gateway": "application-gateways", "Proximity placement group": "proximity-placement-groups", "Teamcenter tier VMs": "virtual-machine", "SQL Server / Oracle": "sql-server", "Azure NetApp Files": "azure-netapp-files", "Azure Files Premium": "storage-azure-files", "Metrics": "metrics", "Azure Backup Center": "azure-backup-center", "Service Health": "service-health", "Activity Log": "activity-log", "Key Vaults": "key-vaults" },
  differences: ["Per-subnet NSG shields and subnet glyphs are omitted; the Teamcenter URL is a plain box."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, both, line, step, icon } = k;
  txt("title", 40, 10, "Siemens Teamcenter baseline architecture on Azure", { size: 30 });
  card("inet", 120, 70, 180, 130, "globe-success", "Internet");
  box("url", 560, 90, 300, 80, "Teamcenter URL\nhttps://tc.company.com", { size: 16 });
  card("entra", 860, 70, 220, 130, "entra-connect", "Microsoft Entra ID");
  step("s2", 930, 220, 2);

  group("clt", 40, 280, 380, 1200, null, { fill: TINT.white, dashed: true });
  group("ct", 90, 300, 290, 520, "Client tier", { fill: TINT.mg, size: 18 });
  step("s1", 50, 300, 1);
  card("thin", 110, 360, 250, 200, "users", "Teamcenter\nThin Active\nWorkspace client");
  card("rich", 110, 590, 250, 200, "users", "Teamcenter Rich\nclient");
  group("op", 90, 900, 290, 540, "On-premise network", { fill: TINT.white, size: 16 });
  step("s9", 50, 960, 9);
  card("avd", 110, 960, 250, 200, "azure-virtual-desktop", "Azure Virtual\nDesktop/CAD\nworkstation");
  card("cst", 110, 1200, 250, 190, "users", "Customer\nSupport Team");

  group("hrg", 500, 420, 520, 920, "Resource group", { fill: TINT.white, dashed: true, iconName: "resource-groups", size: 16 });
  group("hub", 530, 500, 460, 800, "Hub virtual network", { fill: TINT.mg, dashed: true, iconName: "virtual-networks", size: 16 });
  step("s3", 680, 580, 3);
  card("fw", 740, 580, 220, 200, "firewalls", "Azure Firewall\nsubnet");
  card("bas", 560, 1020, 200, 180, "bastions", "Azure Bastion\nsubnet");
  card("vpn", 780, 1020, 190, 180, "virtual-network-gateways", "VPN Gateway\nsubnet");
  card("er", 760, 1420, 220, 140, "expressroute-circuits", "ExpressRoute");

  group("rg", 1100, 40, 1790, 1500, "Resource group", { fill: TINT.white, dashed: true, iconName: "resource-groups", size: 16 });
  group("sp", 1130, 130, 1730, 1340, "Spoke virtual network", { fill: TINT.white, dashed: true, iconName: "virtual-networks", size: 16 });
  card("agw", 1160, 560, 220, 260, "application-gateways", "App Gateway\n\nApp gateway\nsubnet");
  step("s4", 1160, 500, 4);
  group("ppg", 1432, 230, 1398, 1150, "Proximity placement groups", { fill: TINT.white, dashed: true, stroke: "#e8590c", iconName: "proximity-placement-groups", size: 16 });

  group("web", 1450, 330, 330, 1010, "Web tier - Web subnet", { fill: TINT.mg, size: 16 });
  step("s5", 1450, 280, 5);
  [["w1", "Teamcenter\nSecurity Services"], ["w2", "Web tier1\nTeamcenter\nHTTP Server"], ["w3", "Web tier2\nTeamcenter\nHTTP server"], ["w4", "Active Workspace\ngateway"]].forEach(([id, l], i) => card(id, 1480, 390 + i * 230, 270, 200, "virtual-machine", l));

  group("ent", 1820, 330, 560, 1010, "Enterprise tier - Enterprise subnet", { fill: TINT.mg, size: 16 });
  step("s6", 1820, 280, 6);
  [["e1", "Enterprise tier"], ["e2", "Active workspace"], ["e3", "Visualization"]].forEach(([id, l], i) => card(id, 1845, 390 + i * 300, 250, 200, "virtual-machine", l));
  [["e4", "File Management\nSystem"], ["e5", "File Server Cache"], ["e6", "Search Server\nApache Solr"], ["e7", "License\nServer"]].forEach(([id, l], i) => card(id, 2115, 390 + i * 230, 250, 200, "virtual-machine", l));

  group("res", 2432, 330, 380, 420, "Resource tier - Database subnet", { fill: TINT.mg, size: 16 });
  step("s7", 2432, 280, 7);
  card("sql", 2470, 420, 280, 220, "sql-server", "SQLServer/\nOracle");
  group("sto", 2432, 820, 368, 520, "Storage subnet", { fill: TINT.mg, size: 16 });
  step("s8", 2432, 770, 8);
  card("anf", 2445, 900, 160, 200, "azure-netapp-files", "Azure\nNetApp\nFiles");
  card("afp", 2620, 900, 160, 200, "storage-azure-files", "Azure Files\nPremium");

  group("sup", 2950, 40, 280, 1500, null, { fill: TINT.mg });
  [["m", "metrics", "Metrics"], ["bc", "azure-backup-center", "Azure Backup\nCenter"], ["sh", "service-health", "Service Health"], ["al", "activity-log", "Activity Log"], ["kv", "key-vaults", "Key Vaults"]].forEach(([id, ic, l], i) => card(id, 2980, 80 + i * 250, 220, 190, ic, l));
  txt("sup-lbl", 2980, 1350, "Azure backbone\nsupporting services", { size: 16 });

  arrow("ct-in", "ct", "top", 210, "inet", "bottom", 210);
  arrow("in-url", "inet", "right", 130, "url", "left", 130);
  arrow("url-en", "url", "right", 130, "entra", "left", 130);
  arrow("url-fw", "url", "bottom", 800, "fw", "top", 800);
  arrow("fw-agw", "fw", "right", 690, "agw", "left", 690);
  arrow("agw-web", "agw", "right", 700, "web", "left", 700);
  txt("http1", 1385, 650, "HTTP", { size: 16 });
  arrow("web-ent", "web", "right", 720, "ent", "left", 720);
  txt("http2", 1782, 680, "HTTP", { size: 16 });
  arrow("ent-res", "ent", "right", 480, "res", "left", 480);
  txt("tcp", 2385, 440, "TCP", { size: 16 });
  both("ent-sto", "ent", "right", 1000, "sto", "left", 1000);
  txt("smb", 2386, 1030, "SMB/\nNSF", { size: 16 });
  both("peer", "hub", "right", 1200, "rg", "left", 1200);
  txt("peer-lbl", 1030, 1130, "vnet\npeering", { size: 16 });
  both("vpn-er", "vpn", "bottom", 875, "er", "top", 875);
  arrow("cst-er", "cst", "right", 1340, "er", "left", 1490, [600]);

  txt("footer", 40, 1600, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Siemens Teamcenter baseline architecture on Azure\"", { size: 20, color: "#495057" });
}
