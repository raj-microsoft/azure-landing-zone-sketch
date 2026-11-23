// 085 General mainframe refactor to Azure (refactored architecture, img1).
export const meta = {
  num: 85,
  slug: "general-mainframe-refactor",
  title: "General mainframe refactor to Azure",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/mainframe/general-mainframe-refactor",
  category: "Mainframe + migration",
  status: "done",
  otherDiagrams: ["First image shows the components of a typical (pre-migration) mainframe system; this scene draws the second, refactored Azure architecture."],
  substitutions: { "Azure load balancers": "load-balancers", "Peered virtual networks": "virtual-networks", "Network security group": "network-security-groups", "Java app server": "app-services", "Java services": "virtual-machine", "Partner Java classes": "container-instances", "Refactored app server": "virtual-machine", "Client transaction runtimes": "gear", "Partner data services integration": "api-connections", "Applications (COBOL / PL/I)": "function-apps", "SSD Managed Disk": "disks", "Accelerated Networking with RDMA": "network-interfaces", "Azure Files / NetApp Files": "files", "Private Link endpoints": "private-link", "Azure Managed Redis": "azure-managed-redis", "Azure SQL Database logical server": "sql-server", "Azure Blob container": "blob-block", "Azure Site Recovery": "recovery-services-vaults", "Microsoft Entra ID": "entra-connect", "Azure Networking": "virtual-networks", "Power BI": "power-bi-embedded", "Azure users / on-premises users": "users" },
  differences: ["RDMA memory sharing and External data sources are plain labelled shapes.", "Step markers 4-6 sit in the gap between the AKS and VM groups."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, icon, arrow, both, step, poly } = k;
  const M = { size: 16 };
  txt("title", 40, 10, "General mainframe refactor to Azure", { size: 30 });
  txt("onp", 100, 70, "On-premises", { size: 30, color: "#868e96" });
  poly("divider", [[600, 60], [600, 1900]], { dashed: true, color: "#adb5bd", width: 1.5 });
  card("er", 100, 170, 200, 160, "expressroute-circuits", "ExpressRoute", M);
  card("opu", 100, 560, 200, 160, "users", "On-premises\nusers", M);
  both("a-web", "er", "bottom", 200, "opu", "top", 200);
  txt("web-lbl", 230, 400, "Web browsing or\nBastion host\nTLS over port 443", { size: 16 });
  icon("az-logo", "azure-a", 640, 70, 56);
  txt("az-lbl", 710, 85, "Azure", { size: 20 });
  box("azu", 1520, 40, 320, 100, "Azure users", { iconLeft: "users", size: 18 });
  box("peer", 1520, 170, 300, 100, "Peered virtual\nnetworks", { iconLeft: "virtual-networks", size: 16 });
  step("s1", 1250, 200, 1);

  txt("vnet-lbl", 1070, 300, "Virtual network (10.0.0.0/24)", { size: 18 });
  group("vnet", 660, 290, 1460, 1140, null, { dashed: true, fill: TINT.white, stroke: "#1971c2" });
  card("nsg", 1900, 320, 200, 150, "network-security-groups", "Network security\ngroup", M);
  card("lb1", 880, 330, 170, 140, "load-balancers", "Load balancer", M);
  card("lb2", 1480, 330, 170, 140, "load-balancers", "Load balancer", M);
  txt("lb-lbl", 1265, 340, "Azure load balancers", { size: 18, align: "center" });
  both("a-lb", "lb1", "right", 420, "lb2", "left", 420);
  step("s2", 1245, 440, 2);
  arrow("a-er", "er", "right", 250, "lb1", "top", 965, [], { tail: "arrow" });
  arrow("a-azu", "azu", "left", 90, "lb2", "top", 1500, [1500]);
  card("aks", 720, 520, 300, 150, "kubernetes-services", "Azure Kubernetes Service\ncluster", M);
  card("vms", 1440, 520, 260, 150, "virtual-machine", "Azure VMs", M);
  arrow("a-aks", "lb1", "bottom", 965, "aks", "top", 965);
  arrow("a-vms", "lb2", "bottom", 1565, "vms", "top", 1565);
  step("s3", 1250, 680, 3);

  group("L", 680, 720, 570, 690, null, { dashed: true, fill: TINT.mg });
  box("kn", 695, 740, 540, 100, "Kubernetes node\nKubelet\nPod 1, Pod 2", { iconLeft: "kubernetes-services", size: 16, align: "left" });
  box("jas", 695, 850, 540, 100, "Java app server\nDatabase emulation and\ninteroperability services", { iconLeft: "app-services", size: 16, align: "left" });
  box("jsv", 695, 960, 540, 100, "Java services\nUX, transaction,\ndata access layer", { iconLeft: "virtual-machine", size: 16, align: "left" });
  box("pjc", 695, 1070, 540, 100, "Partner Java classes\nJava App 1\nJava App 2", { iconLeft: "container-instances", size: 16, align: "left" });
  card("dk1", 695, 1185, 165, 175, "disks", "SSD Managed\nDisk", M);
  card("an1", 870, 1185, 180, 175, "network-interfaces", "Accelerated\nNetworking\nwith RDMA", M);
  card("fl1", 1060, 1185, 180, 175, "files", "Azure Files\nAzure NetApp Files\nCIFS or NFS", M);

  group("R", 1310, 720, 510, 690, null, { dashed: true, fill: TINT.mg });
  box("ras", 1325, 740, 480, 100, "Refactored app server", { iconLeft: "virtual-machine", size: 16, align: "left" });
  box("ctr", 1325, 850, 480, 100, "Client transaction\nruntimes", { iconLeft: "gear", size: 16, align: "left" });
  box("pds", 1325, 960, 480, 100, "Partner data services\nintegration", { iconLeft: "api-connections", size: 16, align: "left" });
  box("apps", 1325, 1070, 480, 100, "Applications\nCOBOL or PL/I App 1\nCOBOL or PL/I App 2", { iconLeft: "function-apps", size: 16, align: "left" });
  card("dk2", 1325, 1185, 160, 175, "disks", "SSD Managed\nDisk", M);
  card("an2", 1495, 1185, 170, 175, "network-interfaces", "Accelerated\nNetworking\nwith RDMA", M);
  card("fl2", 1675, 1185, 135, 175, "files", "Azure Files\nCIFS or NFS", M);
  step("s4", 1260, 880, 4);
  step("s5", 1260, 990, 5);
  step("s6", 1260, 1250, 6);

  card("pl-r", 1850, 500, 240, 150, "private-link", "Private Link for\nAzure Managed Redis", M);
  card("pl-s", 1850, 680, 240, 160, "private-link", "Private Link for\nAzure SQL Database", M);
  card("pl-p", 1850, 870, 240, 170, "private-link", "Private Link for\nAzure Database\nfor PostgreSQL", M);
  card("pl-c", 1850, 1070, 240, 150, "private-link", "Private Link for\nAzure Cosmos DB", M);
  card("pl-st", 1850, 1240, 240, 150, "private-link", "Private Link for\nAzure Storage", M);
  both("a-r", "ctr", "right", 900, "pl-r", "left", 575, [1815]);
  both("a-s", "pds", "right", 990, "pl-s", "left", 760, [1828]);
  both("a-p", "pds", "right", 1020, "pl-p", "left", 955, [1841]);
  both("a-c", "pds", "right", 1045, "pl-c", "left", 1145, [1815]);
  arrow("a-st2", "pl-st", "left", 1300, "fl2", "right", 1300);
  arrow("a-st1", "pl-st", "bottom", 1970, "fl1", "bottom", 1150, [1420]);

  card("redis", 2180, 300, 170, 170, "azure-managed-redis", "Azure Managed\nRedis", M);
  box("rdma", 2380, 340, 170, 100, "RDMA memory\nsharing", { size: 16, fill: TINT.mg });
  both("a-redis", "pl-r", "right", 575, "redis", "bottom", 2265, [2265]);
  group("sqls", 2180, 600, 420, 300, "Azure SQL Database\nlogical server", { iconName: "sql-server" });
  box("sql1", 2200, 690, 380, 90, "Azure SQL Database 1", { iconLeft: "sql-database", size: 16 });
  box("sql2", 2200, 795, 380, 90, "Azure SQL Database 2", { iconLeft: "sql-database", size: 16 });
  both("a-sql", "pl-s", "right", 760, "sqls", "left", 760);
  box("pg", 2180, 920, 420, 100, "Azure Database for\nPostgreSQL - Hyperscale", { iconLeft: "azure-database-postgresql-server", size: 16 });
  both("a-pg", "pl-p", "right", 955, "pg", "left", 955);
  box("cos", 2180, 1100, 420, 90, "Azure Cosmos DB", { iconLeft: "azure-cosmos-db", size: 16 });
  both("a-cos", "pl-c", "right", 1145, "cos", "left", 1145);
  const legend = [["entra", "entra-connect", "Microsoft Entra ID"], ["net", "virtual-networks", "Azure Networking"], ["asa", "stream-analytics-jobs", "Azure Stream\nAnalytics"], ["dbx", "azure-databricks", "Azure Databricks"], ["pbi", "power-bi-embedded", "Power BI"]];
  legend.forEach(([id, ic, l], i) => box(id, 2180, 1230 + i * 85, 300, 75, l, { iconLeft: ic, size: 16, align: "left" }));
  step("s9", 2500, 1247, 9);

  box("ext", 100, 1510, 320, 90, "External data sources", { size: 18, fill: TINT.mg });
  group("blob", 660, 1480, 480, 400, "Azure Blob Storage account\nLanding zone from external sources", { iconName: "storage-accounts", size: 16 });
  [1, 2, "[n]"].forEach((n, i) => box(`bc${i}`, 690, 1590 + i * 90, 420, 75, `Azure Blob container ${n}`, { iconLeft: "blob-block", size: 16, align: "left" }));
  arrow("a-ext", "ext", "right", 1555, "blob", "left", 1555);
  step("s7", 560, 1610, 7);
  card("adf", 1190, 1490, 400, 180, "data-factories", "Azure Data Factory\nEvent trigger-based pipeline", M);
  arrow("a-adf", "blob", "right", 1580, "adf", "left", 1580);
  group("fsa", 1640, 1480, 440, 240, "Azure Files storage account\nLocal working share", { iconName: "storage-accounts", size: 16 });
  box("fs", 1670, 1600, 380, 90, "Azure Files fileshare", { iconLeft: "file", size: 16 });
  arrow("a-fsa", "adf", "right", 1580, "fsa", "left", 1580);
  arrow("a-fs", "fs", "right", 1645, "pl-st", "right", 1315, [2140]);
  box("asr", 1210, 1760, 820, 90, "Azure Site Recovery to secondary Azure region\nfor disaster recovery capabilities", { iconLeft: "recovery-services-vaults", size: 16 });
  step("s8", 1150, 1785, 8);
  txt("footer", 40, 1920, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Refactored mainframe system on Azure\"", { size: 20, color: "#495057" });
}
