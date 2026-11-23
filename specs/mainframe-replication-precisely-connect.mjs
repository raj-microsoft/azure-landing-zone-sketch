// 004 Replicate mainframe data by using Precisely Connect. Redraw of the article's architecture diagram.
export const meta = {
  num: 4,
  slug: "mainframe-replication-precisely-connect",
  title: "Replicate mainframe data by using Precisely Connect",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/mainframe/mainframe-replication-precisely-connect",
  category: "Mainframe + migration",
  status: "done",
  otherDiagrams: [],
  substitutions: {
    "Azure Data Lake Storage": "data-lake-storage-gen1", "Azure SQL": "azure-sql", "Azure Database for PostgreSQL": "azure-database-postgresql-server",
    "Azure Database for MySQL": "azure-database-mysql-server", "Power BI": "power-bi-embedded", "Logs": "storage-container", "Capture logs (CDC)": "storage-container",
  },
  differences: [
    "OneLake and Microsoft Fabric have no sketch icon; they are labelled sketch boxes.",
    "Db2, IMS, VSAM and files, the listener, publisher, controller daemons and the replicator engine are labelled sketch shapes (non-Azure).",
    "The on-premises building icon and Microsoft Azure logo are omitted.",
    "The unlabelled router icons on each side of ExpressRoute are drawn as an on-premises data gateway card and a plain Gateway box; the small engine inbound icon is an empty grey shape.",
  ],
};

export function draw(k) {
  const { TINT, txt, zone, group, box, icon, card, step, arrow, both, line } = k;
  const ORANGE = "#e8590c";
  txt("title", 80, 20, "Replicate mainframe data by using Precisely Connect", { size: 32 });

  // On-premises
  txt("op-t", 1000, 90, "On-premises", { size: 26 });
  zone("op", 80, 140, 1180, 1080, TINT.onprem);
  group("mf", 110, 280, 380, 620, "Mainframe and midrange data", { fill: TINT.white });
  box("db2zos", 130, 340, 160, 90, "Db2 for\nz/OS", { size: 18, type: "ellipse" });
  box("db2luw", 310, 340, 160, 90, "Db2 for\nLUW", { size: 18, type: "ellipse" });
  box("db2ibmi", 130, 470, 160, 90, "Db2 for\nIBM i", { size: 18, type: "ellipse" });
  box("ims", 310, 470, 160, 90, "IMS", { size: 18, type: "ellipse" });
  box("vsam", 130, 610, 160, 90, "VSAM", { size: 18 });
  box("files", 310, 610, 160, 90, "Files", { size: 18 });
  step("s1", 525, 480, 1);
  card("logs", 520, 560, 150, 150, "storage-container", "Logs");
  box("listener", 760, 200, 170, 80, "Listener", { size: 18, stroke: ORANGE });
  step("s3", 950, 220, 3);
  zone("cdcw", 700, 380, 440, 400, TINT.white);
  step("s4", 1080, 395, 4);
  zone("cdc", 715, 460, 270, 260, "transparent", { dashed: true, stroke: "#1971c2" });
  step("s2", 940, 470, 2);
  card("capture", 725, 520, 120, 130, "storage-container", "Capture\nlogs");
  box("publisher", 855, 520, 120, 130, "Publisher", { size: 16, stroke: ORANGE });
  txt("cdc-t", 725, 680, "CDC store", { size: 16 });
  box("ctl1", 1000, 540, 120, 120, "Controller\ndaemon", { size: 16 });

  // Network
  card("gw", 1310, 600, 160, 140, "on-premises-data-gateways", "On-premises\ndata gateway");
  card("er", 1500, 410, 170, 130, "expressroute-circuits", "Azure\nExpressRoute");
  box("azgw", 1680, 610, 120, 120, "Gateway", { size: 16 });

  // Azure
  txt("az-t", 1840, 90, "Microsoft Azure", { size: 26 });
  zone("az", 1830, 140, 1740, 1080, TINT.sub);
  box("ctl2", 2260, 180, 170, 100, "Controller\ndaemon", { size: 18 });
  step("s8", 2450, 200, 8);
  step("s5", 2090, 320, 5);
  group("eng", 1860, 380, 720, 520, "Replicator or distributor engine", { fill: TINT.white, align: "center", size: 20 });
  box("disp", 1880, 590, 170, 100, "Dispatcher", { size: 18 });
  zone("dispin", 1880, 440, 170, 100, TINT.mg, { stroke: "#343a40" });
  group("cache", 2100, 440, 200, 430, "", { fill: TINT.mg });
  ["C1", "C2", "C3", "Cn"].forEach((c, i) => box(`c${i}`, 2140, 460 + i * 90, 120, 70, c, { size: 18 }));
  txt("cache-t", 2200, 836, "Cache", { size: 18, align: "center" });
  group("nodes", 2350, 440, 200, 430, "", { fill: TINT.mg });
  ["N1", "N2", "N3", "Nn"].forEach((c, i) => box(`n${i}`, 2390, 460 + i * 90, 120, 70, c, { size: 18 }));
  txt("nodes-t", 2450, 836, "Nodes", { size: 18, align: "center" });
  step("s6", 2760, 480, 6);
  card("eh", 2660, 560, 200, 140, "event-hubs", "Azure Event\nHubs");
  step("s7", 3010, 400, 7);
  zone("proc", 2920, 450, 240, 450, TINT.white);
  card("dbx", 2940, 470, 200, 150, "azure-databricks", "Azure\nDatabricks");
  box("fabricspark", 2940, 660, 200, 120, "Microsoft Fabric\n(Spark)", { size: 18 });
  group("svc", 3220, 160, 330, 1040, "Azure services", { fill: TINT.white, align: "center", size: 20 });
  card("adls", 3260, 210, 250, 120, "data-lake-storage-gen1", "Azure Data\nLake Storage");
  box("onelake", 3260, 345, 250, 70, "OneLake", { size: 18 });
  card("sql", 3260, 430, 250, 110, "azure-sql", "Azure SQL");
  card("pg", 3260, 555, 250, 120, "azure-database-postgresql-server", "Azure Database for\nPostgreSQL");
  card("my", 3260, 690, 250, 120, "azure-database-mysql-server", "Azure Database for\nMySQL");
  box("fabric", 3260, 825, 250, 70, "Microsoft Fabric", { size: 18 });
  card("pbi", 3260, 910, 250, 110, "power-bi-embedded", "Power BI");

  // flows
  arrow("f-mf-logs", "mf", "right", 635, "logs", "left", 635);
  arrow("f-logs-cdc", "logs", "right", 635, "capture", "left", 635);
  arrow("f-listener", "listener", "bottom", 845, "publisher", "top", 915, [340], { dashed: true, color: ORANGE, firstDir: "v" });
  arrow("f-ctl-pub", "ctl1", "left", 600, "publisher", "right", 600, [], { dashed: true });
  arrow("f-cdc-disp", "cdcw", "bottom", 1000, "disp", "left", 660, [820, 1810], { firstDir: "v" });
  arrow("f-gw-ctl", "dispin", "top", 1965, "ctl1", "top", 1060, [330], { dashed: true });
  line("f-gw-er", "gw", "top", 1390, "er", "left", 475, [], { dashed: true, firstDir: "v" });
  both("f-er-azgw", "er", "right", 475, "azgw", "top", 1740, [], { dashed: true });
  arrow("f-ctl2", "ctl2", "bottom", 2345, "eng", "top", 2345, [], { dashed: true });
  arrow("f-disp-cache", "disp", "right", 640, "cache", "left", 640);
  arrow("f-cache-nodes", "cache", "right", 640, "nodes", "left", 640);
  arrow("f-eng-eh", "eng", "right", 630, "eh", "left", 630);
  arrow("f-eh-proc", "eh", "right", 630, "proc", "left", 630);
  arrow("f-proc-svc", "proc", "right", 630, "svc", "left", 630);
  line("c-c2-c3", "c2", "bottom", 2200, "c3", "top", 2200, [], { dashed: true });
  line("c-n2-n3", "n2", "bottom", 2450, "n3", "top", 2450, [], { dashed: true });

  txt("footer", 80, 1250, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Replicate mainframe data by using Precisely Connect\"", { size: 20, color: "#495057" });
}
