// 044 Certificate life cycle management on Azure.
export const meta = {
  num: 44,
  slug: "certificate-lifecycle",
  title: "Certificate life cycle management on Azure",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/certificate-lifecycle/",
  category: "Security",
  status: "done",
  otherDiagrams: ["Automatic certificate renewal workflow", "Certificate status dashboard (screenshot)"],
  substitutions: { "Subscription": "subscriptions", "CERTLC resource group": "resource-groups", "Virtual network": "virtual-networks", "NSG": "network-security-groups", "UDR": "route-tables", "DC / ENT-CA / servers": "virtual-machine", "Automation account": "automation-accounts", "Runbook script": "file", "Webhook": "api-connections", "Schedule": "scheduler", "Automation account identity": "entra-managed-identities", "Storage account (queue)": "storage-queue", "Event Grid": "event-grid-topics", "Key Vault": "key-vaults", "Log Analytics workspace": "log-analytics-workspaces", "Workbook": "workbooks", "Recovery services vault": "recovery-services-vaults", "Role assignment": "entra-identity-roles-and-administrators", "Policy assignment": "policy", "Network Watcher": "network-watcher", "Defender for Cloud": "microsoft-defender-for-cloud", "Active Directory": "entra-domain-services", "Azure Arc-enabled server": "arc-machines", "Hybrid connection (router)": "virtual-router" },
  differences: ["Key Vault extension and custom script markers on servers are folded into the server captions.", "Hybrid Runbook Worker is a text label on the dashed worker link."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, line } = k;
  txt("title", 60, 10, "Certificate life cycle management on Azure", { size: 30 });
  group("lz", 60, 70, 1820, 1700, "Azure landing zone subscription", { fill: TINT.sub, iconName: "subscriptions", align: "center", size: 22 });
  group("rg", 140, 150, 1640, 1360, "CERTLC", { fill: TINT.mg, iconName: "resource-groups" });
  group("vnet", 200, 240, 1500, 380, "Virtual network", { fill: TINT.white, iconName: "virtual-networks" });
  group("sub", 260, 320, 1380, 270, "Subnet", { fill: TINT.hub, iconName: "network-security-groups" });
  card("udr", 275, 465, 120, 110, "route-tables", "UDR", { size: 16 });
  card("dc", 420, 380, 180, 170, "virtual-machine", "DC");
  card("ca", 620, 380, 180, 170, "virtual-machine", "ENT-CA");
  card("srv1", 1000, 380, 240, 170, "virtual-machine", "Server\n(Key Vault extension)", { size: 16 });
  card("srv2", 1300, 380, 240, 170, "virtual-machine", "Server\n(custom script)", { size: 16 });

  group("aa", 220, 690, 600, 760, "Automation account", { fill: TINT.white, iconName: "automation-accounts" });
  group("rb1", 260, 790, 520, 260, "CERTLC runbook", { fill: TINT.white, dashed: true, stroke: "#7048e8" });
  card("scr1", 290, 850, 160, 140, "file", "Script", { size: 16 });
  card("wh", 590, 850, 160, 140, "api-connections", "Webhook", { size: 16 });
  group("rb2", 260, 1090, 520, 260, "Dashboard ingestion runbook", { fill: TINT.white, dashed: true, stroke: "#7048e8" });
  card("scr2", 290, 1150, 160, 140, "file", "Script", { size: 16 });
  card("sch", 590, 1150, 160, 140, "scheduler", "Scheduled", { size: 16 });
  box("aaid", 260, 1370, 520, 64, "Automation account identity", { size: 16, iconLeft: "entra-managed-identities" });

  card("sq", 900, 760, 220, 180, "storage-queue", "Storage account\nQueue", { size: 16 });
  card("eg", 1180, 760, 260, 180, "event-grid-topics", "Event Grid\nfor certificate\nexpiration events", { size: 16 });
  card("kv", 1500, 760, 220, 180, "key-vaults", "Key Vault");
  card("law", 900, 1110, 260, 190, "log-analytics-workspaces", "Log Analytics\nworkspace\nCustom table", { size: 16 });
  card("wb", 1300, 1110, 220, 190, "workbooks", "Workbook\nDashboard", { size: 16 });
  txt("hrw-lbl", 840, 640, "Hybrid Runbook Worker", { size: 16 });

  card("rsv", 120, 1560, 240, 170, "recovery-services-vaults", "Recovery\nservices vault", { size: 16 });
  card("ra", 470, 1560, 240, 170, "entra-identity-roles-and-administrators", "Role\nassignment", { size: 16 });
  card("pa", 820, 1560, 240, 170, "policy", "Policy\nassignment", { size: 16 });
  card("nw", 1170, 1560, 240, 170, "network-watcher", "Network\nWatcher", { size: 16 });
  card("dfc", 1520, 1560, 240, 170, "microsoft-defender-for-cloud", "Defender\nfor Cloud", { size: 16 });

  group("onp", 1960, 200, 400, 1500, "On-premises", { fill: TINT.onprem, size: 22 });
  card("ad", 2000, 280, 320, 140, "entra-domain-services", "Active Directory");
  group("arc1", 2000, 460, 320, 500, "Azure Arc-enabled server", { fill: TINT.hub, size: 16 });
  card("arcs1", 2040, 560, 240, 340, "arc-machines", "Ubuntu / Windows\nKey Vault extension", { size: 16 });
  card("rt", 1980, 1000, 140, 110, "virtual-router", "Router", { size: 16 });
  group("arc2", 2000, 1150, 320, 520, "Azure Arc-enabled server\nUnsupported Key Vault\nextension, Azure Arc", { fill: TINT.hub, size: 16 });
  card("arcs2", 2040, 1290, 240, 340, "arc-machines", "Red Hat\nCustom script", { size: 16 });

  line("wl", "ca", "bottom", 760, "rb1", "top", 700, [660], { dashed: true, color: "#7048e8" });
  line("s1", "scr1", "right", 920, "wh", "left", 920);
  line("s2", "scr2", "right", 1220, "sch", "left", 1220);
  line("ing", "rb2", "right", 1205, "law", "left", 1205, [], { dashed: true, color: "#7048e8" });
  line("hy", "sub", "right", 450, "rt", "left", 1055, [1930], { color: "#495057" });

  txt("footer", 60, 1810, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Certificate life cycle management on Azure\"", { size: 20, color: "#495057" });
}
