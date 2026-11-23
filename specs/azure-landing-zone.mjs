// Azure landing zone (ALZ) - Hub & Spoke, with its management group hierarchy (Cloud Adoption Framework).
// Like-for-like redraw of the official hub-and-spoke diagram. Featured first card in the gallery.
export const meta = {
  slug: "azure-landing-zone",
  title: "Azure landing zone (ALZ) - Hub & Spoke",
  url: "https://learn.microsoft.com/azure/cloud-adoption-framework/ready/landing-zone/",
  category: "Landing zone",
  featured: true,
  status: "done",
  otherDiagrams: ["Management group hierarchy (merged into panel C)", "Virtual WAN variant"],
  substitutions: {
    "Action Groups": "automation-accounts", "Role assignment": "entra-identity-roles-and-administrators", "Microsoft Entra ID": "entra-connect",
    "Active Directory Domain Services": "active-directory-connect-health", "DC1-3": "virtual-machine", "Azure DNS": "dns-zones",
    "Applications": "application-group", "Shared services": "shared-image-galleries", "Compliant VM templates": "image-templates",
    "VM SKU server": "server-farm", "Database": "sql-database", "Git repository": "tfs-vc-repository", "Platform DevOps team and IAM": "groups",
    "EA": "cost-management-and-billing", "Subscription key": "subscriptions",
  },
  differences: [
    "Small Sentinel connector icons, stacked-subscription shadow, gear badges, on-premises building icons and the GitHub logo omitted.",
    "Shared tool rows sit inside each subscription panel.",
    "Local management group shows no subscriptions, as in the hub-and-spoke diagram.",
    "Workload A2 to compliant VM templates (G) link drawn once, from region N, dashed.",
  ],
};
export function draw(k) {
  const { TINT, INK, txt, zone, box, icon, iconCap, badge, header, arrow, line, peer } = k;
  const TOOLS = [
    ["automation-accounts", "Action\nGroups"], ["alerts", "Alerts"], ["cost-management", "Cost\nManagement"],
    ["entra-identity-roles-and-administrators", "Role\nassignment"], ["policy", "Policy\nassignment"],
    ["network-watcher", "Network\nWatcher"], ["microsoft-defender-for-cloud", "Defender\nfor Cloud"],
    ["update-management-center", "Azure\nUpdate\nManager"],
  ];
  function toolbar(prefix, cx0, y, items = TOOLS, step = 100) {
    items.forEach(([name, cap], i) => iconCap(`${prefix}-tool${i}`, name, cx0 + i * step - 28, y, cap));
  }
  // Title
  txt("title", 3400, 36, "Azure landing zone (ALZ) – Hub & Spoke", { size: 32 });
  
  // ---------- Security subscription ----------
  header("sec", 100, 46, "Security\nsubscription");
  zone("sec", 100, 120, 960, 350, TINT.sub);
  box("sec-law", 150, 150, 260, 120, "Log Analytics workspace", { valign: "bottom", iconName: "log-analytics-workspaces", size: 18 });
  txt("sec-law-note", 280, 276, "For security logs", { size: 16, align: "center" });
  box("sec-sentinel", 530, 140, 280, 140, "Microsoft Sentinel", { valign: "bottom", iconName: "azure-sentinel" });
  box("sec-other", 850, 150, 190, 120, "Other security\ntools, services\n& resources", { size: 18 });
  toolbar("sec", 180, 330);
  
  // ---------- Management subscription (D) ----------
  header("mgmt", 100, 566, "Management\nsubscription", { letter: "D" });
  zone("mgmt", 100, 650, 960, 440, TINT.sub);
  icon("mgmt-dash", "dashboard", 330, 676, 64);
  txt("mgmt-dash-t", 405, 692, "Dashboards (Azure portal)", { size: 28 });
  box("mgmt-law", 200, 790, 260, 120, "Log Analytics workspace", { valign: "bottom", iconName: "log-analytics-workspaces", size: 18 });
  txt("mgmt-law-note", 330, 916, "For platform logs", { size: 16, align: "center" });
  txt("mgmt-bullets", 540, 780, "• Dashboards\n• Queries\n• Alerting\n• Change tracking\n• Inventory management", { size: 18 });
  toolbar("mgmt", 180, 960);
  txt("subset", 100, 1104, "Subset", { size: 18 });
  box("onprem-sys", 660, 1150, 320, 70, "On-premises systems", { fill: TINT.onprem, size: 22 });
  
  // ---------- Identity and access management (B) ----------
  header("iam", 1300, 300, "Identity and access management", { letter: "B", iconName: "groups", size: 24 });
  zone("iam", 1300, 380, 600, 220, TINT.sub);
  box("iam-list", 1320, 400, 320, 180, "• Approval workflow\n• Notifications\n• Multifactor authentication\n• Access reviews and packages\n• Audit reports", { size: 18, align: "left" });
  box("iam-pim", 1680, 400, 200, 76, "Privileged identity\nmanagement", { fill: TINT.pim, size: 18 });
  txt("iam-pim-list", 1690, 490, "• App/DevOps\n• Subscription manager\n• Other custom roles", { size: 16 });
  
  // ---------- Enterprise Agreement (A) ----------
  header("ea", 1960, 30, "Enterprise Agreement/Microsoft Customer Agreement", { letter: "A", iconName: "cost-management-and-billing", size: 28 });
  zone("ea", 1960, 110, 780, 300, TINT.sub);
  box("ea-enroll", 1990, 140, 220, 64, "Enrollment/Billing\nAccount", { size: 18 });
  box("ea-dept", 1990, 230, 220, 64, "Department/Billing\nProfile", { size: 18 });
  box("ea-account", 1990, 320, 220, 64, "Account/Invoice\nSection", { size: 18 });
  box("ea-sub", 2420, 320, 200, 64, "Subscription", { size: 18 });
  
  // ---------- Microsoft Entra ID + on-premises AD DS ----------
  icon("entra-icon", "entra-connect", 2140, 430, 56);
  txt("entra-title", 2205, 442, "Microsoft Entra ID", { size: 26 });
  box("entra", 1980, 500, 260, 110, "• Service principals\n• Security groups\n• Users", { fill: TINT.hub, size: 18, align: "left" });
  txt("adds-onprem", 2700, 440, "On-premises", { size: 22 });
  box("adds", 2700, 480, 300, 130, "Active Directory\nDomain Services", { fill: TINT.onprem, valign: "bottom", iconName: "active-directory-connect-health" });
  
  // ---------- Management group and subscription organization (C) ----------
  header("c", 1140, 620, "Management group and subscription organization", { letter: "C", iconName: "management-groups" });
  zone("c", 1140, 700, 1620, 880, TINT.sub);
  box("mg-tenant", 1980, 716, 240, 64, "Tenant root group");
  zone("mg", 1170, 800, 1560, 400, TINT.mg);
  txt("mg-title", 1190, 810, "Management groups", { size: 24 });
  box("mg-contoso", 1980, 850, 240, 64, "Contoso");
  box("mg-platform", 1300, 990, 240, 64, "Platform");
  box("mg-wlz", 1970, 990, 260, 64, "Workload landing zones", { size: 18 });
  box("mg-decom", 2280, 990, 200, 64, "Decommissioned", { size: 18 });
  box("mg-sandbox", 2520, 990, 160, 64, "Sandbox");
  box("mg-security", 1180, 1110, 140, 64, "Security", { size: 18 });
  box("mg-management", 1340, 1110, 160, 64, "Management", { size: 18 });
  box("mg-identity", 1520, 1110, 140, 64, "Identity", { size: 18 });
  box("mg-connectivity", 1680, 1110, 150, 64, "Connectivity", { size: 18 });
  box("mg-corp", 1880, 1110, 130, 64, "Corp", { size: 18 });
  box("mg-online", 2035, 1110, 130, 64, "Online", { size: 18 });
  box("mg-local", 2190, 1110, 130, 64, "Local", { size: 18 });
  zone("subs", 1170, 1230, 1560, 330, TINT.sub);
  const Y = TINT.subBox;
  box("sub-security", 1180, 1260, 140, 80, "Security\nsubscription", { fill: Y, size: 18 });
  box("sub-management", 1340, 1260, 160, 80, "Management\nsubscription", { fill: Y, size: 18 });
  box("sub-identity", 1520, 1260, 140, 80, "Identity\nsubscription", { fill: Y, size: 18 });
  box("sub-connectivity", 1680, 1260, 160, 80, "Connectivity\nsubscription", { fill: Y, size: 18 });
  box("sub-a1", 1890, 1260, 210, 64, "Workload landing zone\nA1 subscription", { fill: Y, size: 16 });
  box("sub-p1", 1890, 1334, 210, 64, "Workload landing zone\nP1 subscription", { fill: Y, size: 16 });
  box("sub-a2", 1890, 1408, 210, 64, "Workload landing zone\nA2 subscription", { fill: Y, size: 16 });
  box("sub-decom", 2280, 1260, 200, 80, "Decommissioned\nsubscription", { fill: Y, size: 18 });
  box("sub-sb1", 2520, 1260, 170, 64, "Sandbox\nsubscription 1", { fill: Y, size: 18 });
  box("sub-sb2", 2520, 1340, 170, 64, "Sandbox\nsubscription 2", { fill: Y, size: 18 });
  icon("subs-key", "subscriptions", 1190, 1490, 56);
  txt("subs-title", 1255, 1502, "Subscriptions", { size: 24 });
  
  // ---------- Platform DevOps team + DevOps (I) ----------
  icon("team", "groups", 2930, 640, 56);
  txt("team-title", 3000, 652, "Platform DevOps team", { size: 26 });
  badge("devops-badge", 2800, 776, "I");
  icon("devops-icon", "azure-devops", 2930, 780, 56);
  txt("devops-title", 3000, 792, "DevOps", { size: 26 });
  zone("devops", 2800, 860, 620, 250, TINT.sub);
  box("git", 2830, 880, 200, 130, "Git repository", { valign: "bottom", iconName: "tfs-vc-repository" });
  box("boards", 3060, 880, 140, 60, "Boards", { size: 18 });
  box("wiki", 3060, 960, 140, 60, "Wiki", { size: 18 });
  box("pipelines", 3230, 880, 170, 80, "Deployment\npipelines", { size: 18 });
  txt("git-list", 2830, 1130, "• Role definitions\n• Policy set definitions\n• Policy definitions\n• Role assignments\n• Policy assignments\n• Resource templates", { size: 18 });
  txt("pipe-list", 3120, 1130, "• Subscription provisioning\n• Role provisioning\n• Policy deployment\n• Platform deployment", { size: 18 });
  
  // ---------- Identity subscription ----------
  header("id", 330, 1636, "Identity\nsubscription");
  zone("id", 330, 1720, 810, 845, TINT.sub);
  function vnetStrip(p, x, y, w, region, boxes) {
    zone(p, x, y, w, 90, TINT.mg, { stroke: "#868e96" });
    icon(`${p}-icon`, "virtual-networks", x + 12, y + 17, 56);
    txt(`${p}-t`, x + 76, y + 20, `Virtual network\nregion ${region}`, { size: 18 });
    boxes.forEach(([bx, bw, lbl], i) => box(`${p}-b${i}`, bx, y + 15, bw, 60, lbl, { size: 18 }));
  }
  function identityRegion(p, y, region, vaultCap) {
    vnetStrip(`${p}-vnet`, 350, y, 770, region, [[650, 120, "DNS"], [785, 120, "UDRs"], [920, 180, "NSGs/ASGs"]]);
    txt(`${p}-rg-t`, 560, y + 105, "Resource groups", { size: 22 });
    icon(`${p}-rg-i`, "resource-groups", 760, y + 98, 40);
    zone(`${p}-rg`, 350, y + 150, 610, 180, TINT.mg, { stroke: "#868e96" });
    [0, 1, 2].forEach((i) => iconCap(`${p}-dc${i}`, "virtual-machine", 390 + i * 80, y + 170, `DC${i + 1}`));
    txt(`${p}-or`, 650, y + 185, "OR", { size: 24 });
    iconCap(`${p}-entrads`, "entra-domain-services", 790, y + 160, "Microsoft Entra ID\nDomain Services", { size: 64 });
    iconCap(`${p}-vault`, "recovery-services-vaults", 1000, y + 160, vaultCap, { size: 64 });
    arrow(`${p}-vnet-rg`, `${p}-vnet`, "bottom", 418, `${p}-rg`, "top", 418);
  }
  identityRegion("id1", 1740, "1", "Recovery\nServices vault");
  identityRegion("idn", 2090, "N", "Recovery\nServices vaults");
  toolbar("id", 385, 2430);
  txt("peer-l1", 1155, 1810, "Virtual\nnetwork\npeering", { size: 18 });
  txt("peer-l2", 1155, 2200, "Virtual\nnetwork\npeering", { size: 18 });
  
  // ---------- Connectivity subscription (E) ----------
  header("e", 1300, 1636, "Connectivity\nsubscription", { letter: "E" });
  zone("e", 1300, 1720, 840, 740, TINT.sub);
  iconCap("e-ddos", "ddos-protection-plans", 1352, 1745, "Azure DDoS\nProtection");
  iconCap("e-dns", "dns-zones", 1352, 1925, "Azure DNS");
  iconCap("e-er", "expressroute-circuits", 1352, 2030, "ExpressRoute\ncircuits");
  iconCap("e-fwp", "azure-firewall-policy", 1352, 2200, "Azure Firewall\npolicies");
  function hub(p, y, region) {
    zone(p, 1480, y, 640, 210, TINT.hub, { stroke: "#1971c2" });
    iconCap(`${p}-resolver`, "dns-private-resolver", 1570 - 28, y + 30, "Azure DNS Private\nResolver");
    iconCap(`${p}-gw`, "virtual-network-gateways", 1735 - 28, y + 30, region === "1" ? "VPN/ExpressRoute\ngateways" : "VPN/ExpressRoute\nGateways");
    iconCap(`${p}-fw`, "firewalls", 1900 - 28, y + 30, "Azure Firewall");
    box(`${p}-label`, 1990, y + 40, 120, 100, `Hub virtual\nnetwork\nregion ${region}`, { fill: TINT.hub, size: 16 });
  }
  hub("hub1", 1740, "1");
  hub("hubn", 2020, "N");
  txt("hub-peer-t", 1600, 1966, "Virtual network peering", { size: 18 });
  toolbar("e", 1360, 2320);
  
  // ---------- Workload landing zone P1 (F) ----------
  header("p1", 1300, 2496, "Workload landing zone\nP1 subscription", { letter: "F" });
  zone("p1", 1300, 2580, 840, 480, TINT.sub);
  txt("p1-note", 1320, 2595, "Example of how platform teams host their own services and applications in normal\nlanding zone subscriptions. This can be in one or many subscriptions, depending\non the subscription vending model that has been adopted.", { size: 16 });
  zone("p1-cap", 1320, 2670, 800, 230, TINT.mg, { stroke: "#868e96" });
  txt("p1-cap-t", 1340, 2680, "Platform team-hosted capability", { size: 20 });
  txt("p1-cap-s", 1340, 2710, "Virtual machine image management and platform team APIs for subscription\nvending, Microsoft Entra ID tasks, and others.", { size: 16 });
  ["azure-compute-galleries", "image-templates", "storage-accounts", "key-vaults", "managed-identities", "log-analytics-workspaces", "workflow", "function-apps"]
    .forEach((n, i) => icon(`p1-i${i}`, n, 1345 + i * 95, 2785, 64));
  toolbar("p1", 1360, 2920);
  
  // ---------- Workload landing zone A2 (F) ----------
  header("a2", 2380, 1636, "Workload landing zone\nA2 subscription", { letter: "F" });
  zone("a2", 2380, 1720, 960, 1170, TINT.sub);
  function workloadRegion(p, y, region) {
    vnetStrip(`${p}-vnet`, 2400, y, 920, region, [[2660, 130, "DNS"], [2810, 130, "UDRs"], [2960, 180, "NSGs/ASGs"]]);
    txt(`${p}-rg-t`, 2640, y + 105, "Resource groups", { size: 22 });
    icon(`${p}-rg-i`, "resource-groups", 2840, y + 98, 40);
    const ry = y + 150;
    zone(`${p}-rg`, 2400, ry, 620, 270, TINT.white, { stroke: "#868e96" });
    zone(`${p}-wl`, 2415, ry + 15, 250, 240, "transparent", { dashed: true, stroke: INK });
    icon(`${p}-lb`, "load-balancers", 2512, ry + 30, 56);
    icon(`${p}-vm1`, "virtual-machine", 2437, ry + 110, 56);
    icon(`${p}-vm2`, "virtual-machine", 2587, ry + 110, 56);
    icon(`${p}-db`, "sql-database", 2512, ry + 185, 56);
    const items = [["key-vaults", "Azure Key Vault"], ["storage-accounts", "Storage (file, blob)"], ["recovery-services-vaults", "Backup/Site\nRecovery vaults"], ["log-analytics-workspaces", "Log Analytics workspace\nFor application logs"]];
    items.forEach(([n, t], i) => { icon(`${p}-li${i}`, n, 2690, ry + 20 + i * 60, 44); txt(`${p}-lt${i}`, 2745, ry + 26 + i * 60, t, { size: 18 }); });
    [0, 1, 2].forEach((i) => icon(`${p}-app${i}`, "application-group", 3040, ry + 10 + i * 60, 44));
    txt(`${p}-apps-t`, 3095, ry + 20, "Other\napplications\nor\ncomponents", { size: 20 });
    icon(`${p}-law`, "log-analytics-workspaces", 3040, ry + 190, 44);
    txt(`${p}-law-t`, 3095, ry + 186, "Log Analytics\nworkspace\nfor app team logs", { size: 18 });
    arrow(`${p}-vnet-lb`, `${p}-vnet`, "bottom", 2540, `${p}-lb`, "top", 2540);
    line(`${p}-lb-vm1`, `${p}-lb`, "left", null, `${p}-vm1`, "top", null);
    line(`${p}-lb-vm2`, `${p}-lb`, "right", null, `${p}-vm2`, "top", null);
    line(`${p}-vm1-db`, `${p}-vm1`, "bottom", null, `${p}-db`, "left", null);
    line(`${p}-vm2-db`, `${p}-vm2`, "bottom", null, `${p}-db`, "right", null);
  }
  workloadRegion("a21", 1740, "1");
  workloadRegion("a2n", 2190, "N");
  icon("a2-dash", "dashboard", 2420, 2660, 56);
  txt("a2-dash-t", 2485, 2665, "Dashboards\n(Azure portal)", { size: 20 });
  icon("a2-mi", "managed-identities", 2700, 2660, 56);
  txt("a2-mi-t", 2765, 2665, "Managed\nIdentities", { size: 20 });
  icon("a2-shared", "shared-image-galleries", 2920, 2660, 56);
  txt("a2-shared-t", 2985, 2665, "Shared\nservices", { size: 20 });
  toolbar("a2", 2450, 2750);
  txt("peer-l3", 2170, 1880, "Virtual\nnetwork\npeering", { size: 18 });
  txt("peer-l4", 2290, 1990, "Virtual\nnetwork\npeering", { size: 18 });
  
  // ---------- Sandbox subscription (H) ----------
  header("h", 3420, 1636, "Sandbox\nsubscription", { letter: "H" });
  zone("h", 3420, 1720, 700, 370, TINT.sub);
  icon("h-app1", "application-group", 3480, 1750, 56); txt("h-app1-t", 3545, 1764, "Applications", { size: 22 });
  icon("h-app2", "application-group", 3780, 1750, 56); txt("h-app2-t", 3845, 1764, "Applications", { size: 22 });
  icon("h-app3", "application-group", 3480, 1830, 56); txt("h-app3-t", 3545, 1844, "Applications", { size: 22 });
  toolbar("h", 3530, 1950, TOOLS.slice(2, 7), 120);
  
  // ---------- Compliant VM templates (G) ----------
  badge("g-badge", 3420, 2220, "G");
  zone("g", 3420, 2300, 840, 320, TINT.mg, { stroke: "#868e96" });
  box("g-sku", 3562, 2320, 240, 60, "Virtual machine SKU", { size: 18 });
  icon("g-server", "server-farm", 3460, 2424, 56);
  iconCap("g-template", "image-templates", 3650, 2420, "Compliant virtual\nmachine templates", { size: 64 });
  txt("g-list", 3820, 2402, "• Access credentials\n• In-guest policies/Desired State Configuration\n• Backup policy\n• Extensions\n• Tagging", { size: 16 });
  
  // Footer
  txt("footer", 100, 3110, "Cloud Adoption Framework · pencil-sketch redraw of the Microsoft Azure landing zone reference architecture (hub & spoke) and management group hierarchy", { size: 20, color: "#495057" });
  
  // =====================================================================
  // Connections (all bound, orthogonal, routed in lanes between boxes)
  arrow("c-sentinel-law", "sec-sentinel", "left", 210, "sec-law", "right", 210, [], { dashed: true });
  arrow("c-seclaw-onprem", "sec-law", "left", 210, "onprem-sys", "left", 1200, [60]);
  arrow("c-mgmtlaw-onprem", "mgmt-law", "left", 850, "onprem-sys", "left", 1175, [80]);
  line("c-iam-pim", "iam-pim", "left", 438, "iam-list", "right", 438);
  line("c-ea-1", "ea-enroll", "bottom", 2100, "ea-dept", "top", 2100);
  line("c-ea-2", "ea-dept", "bottom", 2100, "ea-account", "top", 2100);
  line("c-ea-3", "ea-account", "right", 352, "ea-sub", "left", 352);
  line("c-ea-entra", "ea-account", "bottom", 2100, "entra", "top", 2100);
  line("c-ea-sub-c", "ea-sub", "bottom", 2520, "c", "top", 2520);
  line("c-entra-adds", "entra", "right", 555, "adds", "left", 555);
  line("c-entra-tenant", "entra", "bottom", 2100, "mg-tenant", "top", 2100);
  // management group tree
  line("t-tenant-contoso", "mg-tenant", "bottom", 2100, "mg-contoso", "top", 2100);
  line("t-contoso-platform", "mg-contoso", "left", 870, "mg-platform", "top", 1420);
  line("t-contoso-wlz", "mg-contoso", "bottom", 2100, "mg-wlz", "top", 2100);
  line("t-contoso-decom", "mg-contoso", "right", 898, "mg-decom", "top", 2380);
  line("t-contoso-sandbox", "mg-contoso", "right", 866, "mg-sandbox", "top", 2600);
  line("t-platform-security", "mg-platform", "left", 1022, "mg-security", "top", 1250);
  line("t-platform-management", "mg-platform", "bottom", 1420, "mg-management", "top", 1420);
  line("t-platform-identity", "mg-platform", "right", 1040, "mg-identity", "top", 1590);
  line("t-platform-connectivity", "mg-platform", "right", 1005, "mg-connectivity", "top", 1755);
  line("t-wlz-corp", "mg-wlz", "left", 1022, "mg-corp", "top", 1945);
  line("t-wlz-online", "mg-wlz", "bottom", 2100, "mg-online", "top", 2100);
  line("t-wlz-local", "mg-wlz", "right", 1022, "mg-local", "top", 2255);
  line("s-security", "mg-security", "bottom", 1250, "sub-security", "top", 1250);
  line("s-management", "mg-management", "bottom", 1420, "sub-management", "top", 1420);
  line("s-identity", "mg-identity", "bottom", 1590, "sub-identity", "top", 1590);
  line("s-connectivity", "mg-connectivity", "bottom", 1755, "sub-connectivity", "top", 1755);
  line("s-corp-a1", "mg-corp", "bottom", 1990, "sub-a1", "top", 1990);
  line("s-corp-p1", "mg-corp", "left", 1130, "sub-p1", "left", 1366, [1866]);
  line("s-corp-a2", "mg-corp", "left", 1160, "sub-a2", "left", 1440, [1850]);
  line("s-decom", "mg-decom", "bottom", 2380, "sub-decom", "top", 2380);
  line("s-sb1", "mg-sandbox", "bottom", 2600, "sub-sb1", "top", 2600);
  line("s-sb2", "mg-sandbox", "right", 1022, "sub-sb2", "right", 1372, [2710]);
  // subscriptions to their detail panels
  arrow("m-security", "sub-security", "left", 1305, "sec", "right", 300, [1110]);
  arrow("m-management", "sub-management", "bottom", 1470, "mgmt", "right", 870, [1595, 1090]);
  arrow("m-identity", "sub-identity", "bottom", 1590, "id", "top", 1000, [1610]);
  arrow("m-connectivity", "sub-connectivity", "bottom", 1755, "e", "top", 1755);
  arrow("m-p1", "sub-p1", "right", 1366, "p1", "right", 2800, [2160]);
  arrow("m-a2", "sub-a2", "right", 1440, "a2", "top", 2960);
  arrow("m-sandbox", "sub-sb2", "bottom", 2605, "h", "top", 3900, [1470]);
  // DevOps
  line("d-team", "team", "bottom", 2958, "devops-icon", "top", 2958);
  line("d-git", "git", "bottom", 2930, "git-list", "top", 2930);
  line("d-pipe", "pipelines", "bottom", 3315, "pipe-list", "top", 3315);
  // virtual network peering
  peer("p-id1-hub1", "id1-vnet", "right", 1785, "hub1", "left", 1900, [1240]);
  peer("p-idn-hubn", "idn-vnet", "right", 2135, "hubn", "left", 2180, [1270]);
  peer("p-hub1-hubn", "hub1", "bottom", 2050, "hubn", "top", 2050);
  peer("p-hub1-a21", "hub1", "right", 1850, "a21-vnet", "left", 1785, [2240]);
  peer("p-hubn-a2n", "hubn", "right", 2120, "a2n-vnet", "left", 2235, [2270]);
  // G: compliant VM templates
  line("g-sku-template", "g-sku", "bottom", 3682, "g-template", "top", 3682);
  line("g-server-template", "g-server", "right", 2452, "g-template", "left", 2452, [], { dashed: true });
  line("g-template-list", "g-template", "right", 2452, "g-list", "left", 2452);
  line("g-a2-server", "a2n-wl", "bottom", 2600, "g-server", "bottom", 3488, [2635], { dashed: true });
  
}
