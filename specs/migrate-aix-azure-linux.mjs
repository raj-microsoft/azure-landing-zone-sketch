// 116 Migrate AIX workloads to Azure (post-migration architecture).
export const meta = {
  num: 116,
  slug: "migrate-aix-azure-linux",
  title: "Migrate IBM AIX workloads to Azure",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/mainframe/migrate-aix-azure-linux",
  category: "Mainframe",
  status: "done",
  otherDiagrams: ["img0: pre-migration AIX system architecture"],
  substitutions: { "Web Application Firewall (WAF)": "web-application-firewall-policies-waf", "Azure Files shared storage": "storage-azure-files", "Azure SQL Database": "sql-database", "Microsoft Entra ID": "entra-connect", "Azure Site Recovery": "recovery-services-vaults", "Azure Service Bus": "azure-service-bus", "Users": "users", "Private Endpoint": "private-endpoints" },
  differences: ["Main diagram is img1 (img0 is the pre-migration AIX system).", "Diagonal VM-to-private-endpoint lines and line hops redrawn orthogonally; cross-region storage replication lines are routed below the subnets.", "Secondary private endpoint sits just below its virtual network instead of inside it.", "Availability set icon and Azure Files share are shown as one card between the app servers."],
};

export function draw(k) {
  const { TINT, txt, card, group, icon, arrow, step } = k;
  const S = 16;
  const both = (id, f, fs, fa, t, ts, ta, lanes = [], o = {}) => arrow(id, f, fs, fa, t, ts, ta, lanes, { tail: "arrow", ...o });
  const C = (id, x, y, ic, l, w = 200, h = 130) => card(id, x, y, w, h, ic, l, { size: S });
  txt("title", 40, 0, "Migrate AIX workloads to Azure (post-migration)", { size: 28 });

  C("er", 40, 80, "expressroute-circuits", "ExpressRoute", 200, 130);
  C("users", 40, 420, "users", "Users", 200, 130);
  both("a-u", "er", "bottom", 140, "users", "top", 140);
  txt("u-lbl", 150, 260, "Web browser,\nTLS over\nport 443", { size: 16 });
  txt("az-lbl", 320, 60, "Azure", { size: 22 });

  C("tm", 1120, 100, "traffic-manager-profiles", "Azure Traffic Manager", 240, 130);
  both("a1", "er", "top", 140, "tm", "top", 1240, [60, 1240]);
  step("s1", 1000, 75, 1);
  txt("pr-lbl", 900, 160, "Primary region", { size: 18 });
  txt("sr-lbl", 1380, 160, "Secondary region", { size: 18 });

  C("lb", 560, 260, "load-balancers", "Azure Load Balancer", 220, 120);
  arrow("a-tm-lb", "tm", "left", 200, "lb", "top", 670, [670]);
  step("s2", 600, 390, 2);
  txt("wfe", 330, 270, "Web front end", { size: 16 });
  C("w1", 330, 430, "web-application-firewall-policies-waf", "Web Application\nFirewall (WAF)", 220, 130);
  C("w2", 800, 430, "web-application-firewall-policies-waf", "Web Application\nFirewall (WAF)", 220, 130);
  arrow("a-lb1", "lb", "left", 320, "w1", "top", 440, [440]);
  arrow("a-lb2", "lb", "right", 320, "w2", "top", 910, [910]);
  C("as1", 330, 600, "app-services", "App Service", 220, 110);
  C("as2", 800, 600, "app-services", "App Service", 220, 110);
  step("s3", 640, 630, 3);
  arrow("a-w1", "w1", "bottom", 440, "as1", "top", 440);
  arrow("a-w2", "w2", "bottom", 910, "as2", "top", 910);

  // Primary vnet
  group("v1", 300, 760, 920, 840, null, { fill: TINT.sub, dashed: true });
  txt("v1-lbl", 320, 1160, "Virtual network (10.0.0.0/16)", { size: 16 });
  step("s4", 1160, 810, 4);
  group("ats", 320, 810, 820, 330, null, { fill: TINT.white });
  txt("ats-lbl", 340, 820, "Application tier subnet", { size: 16 });
  step("s5", 560, 815, 5);
  C("vm1", 340, 860, "virtual-machine", "Azure VM (App Server 1)\n(Windows or Linux) [Active]", 250, 160);
  C("avs", 610, 860, "storage-azure-files", "Availability set\nAzure Files\nshared storage", 170, 160);
  C("vm2", 800, 860, "virtual-machine", "Azure VM (App Server 2)\n(Windows or Linux) [Active]", 250, 160);
  icon("ats-nsg", "network-security-groups", 1070, 870, 50);
  txt("ats-nsg-lbl", 1050, 930, "NSG", { size: 16 });
  arrow("a-as1", "as1", "bottom", 440, "ats", "top", 440);
  arrow("a-as2", "as2", "bottom", 910, "ats", "top", 910);
  group("mgs", 320, 1290, 380, 280, null, { fill: TINT.white });
  txt("mgs-lbl", 340, 1300, "Management subnet", { size: 16 });
  C("mvm", 350, 1340, "virtual-machine", "Azure VM (Management and\nAdministration Server)\n(Windows or Linux) [Active]", 320, 190);
  C("pe1", 720, 1340, "private-endpoints", "Private\nEndpoint", 150, 150);
  group("nss", 890, 1290, 310, 280, null, { fill: TINT.white });
  txt("nss-lbl", 910, 1300, "Network storage subnet", { size: 16 });
  C("anf1", 930, 1360, "azure-netapp-files", "Azure NetApp Files", 230, 150);
  step("s7", 900, 1520, 7);
  arrow("a-vm1-pe", "ats", "bottom", 760, "pe1", "top", 760);
  arrow("a-vm2-pe", "ats", "bottom", 830, "pe1", "top", 830);
  arrow("a-vm-nss", "ats", "bottom", 1000, "nss", "top", 1000);
  icon("v1-nsg", "network-security-groups", 1160, 880, 50);

  // Secondary
  C("w3", 1500, 430, "web-application-firewall-policies-waf", "Web Application\nFirewall (WAF)", 220, 130);
  txt("wfe2", 1630, 300, "Web front end", { size: 16 });
  arrow("a-tm-w3", "tm", "right", 200, "w3", "top", 1610, [1610]);
  C("as3", 1500, 600, "app-services", "App Service", 220, 110);
  arrow("a-w3", "w3", "bottom", 1610, "as3", "top", 1610);
  group("v2", 1300, 760, 860, 840, null, { fill: TINT.sub, dashed: true });
  txt("v2-lbl", 1800, 770, "Virtual network (10.1.0.0/16)", { size: 16 });
  icon("v2-nsg", "network-security-groups", 2080, 820, 50);
  group("ats2", 1320, 810, 520, 330, null, { fill: TINT.white });
  txt("ats2-lbl", 1340, 820, "Application tier subnet", { size: 16 });
  C("vm3", 1350, 860, "virtual-machine", "Azure VM (App Server 1)\n(Windows or Linux) [Passive]", 280, 160);
  icon("ats2-nsg", "network-security-groups", 1700, 880, 50);
  arrow("a-as3", "as3", "bottom", 1610, "ats2", "top", 1610);
  group("mgs2", 1320, 1290, 400, 280, null, { fill: TINT.white });
  txt("mgs2-lbl", 1340, 1300, "Management subnet", { size: 16 });
  C("mvm2", 1350, 1340, "virtual-machine", "Azure VM (Management and\nAdministration Server)\n(Windows or Linux) [Passive]", 340, 190);
  group("nss2", 1740, 1290, 400, 280, null, { fill: TINT.white });
  txt("nss2-lbl", 1760, 1300, "Network storage subnet", { size: 16 });
  C("anf2", 1820, 1360, "azure-netapp-files", "Azure NetApp Files", 240, 150);
  arrow("a-x2", "ats2", "bottom", 1780, "nss2", "top", 1780);
  C("pe2", 1320, 1640, "private-endpoints", "Private Endpoint", 200, 120);
  arrow("a-vm3-pe", "ats2", "left", 1100, "pe2", "left", 1700, [1270], {});
  arrow("a-x1", "ats", "bottom", 1100, "nss2", "top", 1900, [1220, 1900], { firstDir: "v" });

  // Data
  group("db1", 300, 1830, 640, 220, null, { fill: TINT.data, dashed: true });
  txt("db1-lbl", 320, 1840, "Azure SQL Database", { size: 18 });
  C("sql1", 330, 1880, "sql-database", "Database", 250, 140);
  C("sql2", 600, 1880, "sql-database", "Database", 250, 140);
  step("s6", 880, 1880, 6);
  arrow("a-pe1", "pe1", "bottom", 795, "db1", "top", 795);
  group("db2", 1300, 1830, 640, 220, null, { fill: TINT.data, dashed: true });
  txt("db2-lbl", 1320, 1840, "Azure SQL Database", { size: 18 });
  C("sql3", 1330, 1880, "sql-database", "Database (Replica)", 270, 140);
  C("sql4", 1620, 1880, "sql-database", "Database (Replica)", 270, 140);
  step("s8", 1960, 1880, 8);
  arrow("a-pe2", "pe2", "bottom", 1420, "db2", "top", 1420);
  both("geo", "db1", "right", 1960, "db2", "left", 1960);
  txt("geo-lbl", 950, 1990, "Azure SQL geo-\nreplication and\nauto-failover\ngroups", { size: 16 });
  C("sb", 600, 2120, "azure-service-bus", "Azure Service Bus", 220, 130);
  C("ent", 860, 2120, "entra-connect", "Microsoft Entra ID", 220, 130);
  C("asr", 1120, 2120, "recovery-services-vaults", "Azure Site Recovery", 220, 130);
  arrow("a-asr", "tm", "bottom", 1260, "asr", "top", 1260, [], { head: null, dashed: true });
  txt("footer", 40, 2300, "Pencil-sketch redraw of the Azure Architecture Center diagram \"post-migration Azure architecture\"", { size: 20, color: "#495057" });
}
