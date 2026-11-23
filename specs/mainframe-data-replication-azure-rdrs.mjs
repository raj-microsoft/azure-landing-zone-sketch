// 084 Replicate mainframe data by using Azure RDRS.
export const meta = {
  num: 84,
  slug: "mainframe-data-replication-azure-rdrs",
  title: "Replicate mainframe data by using Precisely Connect / Azure RDRS",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/mainframe/mainframe-data-replication-azure-rdrs",
  category: "Mainframe + migration",
  status: "done",
  otherDiagrams: ["Full and change data replication from Db2 z/OS to a Fabric native SQL database by using RDRS (change-data-capture-mainframe-data-with-azure.svg)"],
  substitutions: { "LUW VM": "virtual-machine", "VPN device": "virtual-router", "VPN gateway": "virtual-network-gateways", "ExpressRoute / site-to-site VPN": "expressroute-circuits", "Consumer (Logic Apps, Functions or VM)": "function-apps", "Azure Data Lake Storage": "data-lake-storage-gen1", "Power BI": "power-bi-embedded", "Client apps": "client-apps", "Azure services": "azure-a", "VSAM files": "file" },
  differences: ["Db2, IMS, other DBMS, the flat-file list and the z/OS mainframe are plain labelled sketch shapes.", "The VPN device, ExpressRoute and VPN gateway sit in a lane between the two zones instead of straddling the boundary."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, icon, arrow, both, step } = k;
  const M = { size: 16 };
  txt("title", 40, 10, "Mainframe data replication with Azure RDRS", { size: 30 });
  group("dc", 40, 70, 860, 1480, "Enterprise mainframe datacenter", { align: "center", fill: TINT.onprem, size: 22 });
  group("dbms", 80, 140, 300, 640, "Database management\nsystem", { fill: TINT.white });
  box("db2", 110, 220, 240, 100, "Relational\nDb2", { size: 16, fill: TINT.app });
  box("ims", 110, 380, 240, 100, "Hierarchical\nIMS", { size: 16, fill: TINT.app });
  box("odb", 110, 560, 240, 140, "Other DBMS\nAdabas, Datacom,\nIDMS", { size: 16, fill: TINT.app });
  step("s1", 400, 150, 1);
  group("mgr", 520, 140, 340, 560, null, { fill: TINT.white });
  txt("mgr-t", 690, 150, "Started task on\nmainframe", { size: 18, align: "center" });
  box("capL", 560, 230, 260, 80, "Capture agents", { size: 16 });
  box("apL", 560, 380, 260, 80, "Apply agents", { size: 16 });
  txt("mgr-b", 690, 610, "RDRS\nmainframe manager", { size: 18, align: "center" });
  step("s3", 805, 150, 3);
  group("files", 80, 820, 300, 200, "Files", { fill: TINT.white });
  card("vsam", 120, 870, 220, 130, "file", "VSAM", M);
  step("s2", 400, 830, 2);
  group("flat", 80, 1060, 300, 420, "Database unloaded\nto flat files", { fill: TINT.white });
  box("flat-list", 100, 1120, 260, 340, "Datacom\nIDMS\nVSAM\nAdabas\nIMS\nDb2\nPS files", { size: 16 });
  step("s11", 400, 1070, 11);
  box("zos", 560, 1410, 300, 100, "z/OS - Mainframe", { size: 18, fill: TINT.mg });

  card("vpndev", 930, 860, 160, 150, "virtual-router", "VPN device", M);
  card("vpngw", 1110, 860, 160, 150, "virtual-network-gateways", "VPN gateway", M);
  card("er", 1020, 1050, 160, 160, "expressroute-circuits", "ExpressRoute\nSite-to-site VPN", M);
  both("a-er", "vpndev", "right", 935, "vpngw", "left", 935, [], { color: "#000000" });
  txt("bidi", 1100, 325, "Bidirectional\ndata replication", { size: 16, align: "center" });

  group("az", 1300, 70, 1620, 1480, "Microsoft Azure", { fill: TINT.sub, size: 22 });
  group("opm", 1340, 180, 340, 500, null, { fill: TINT.white });
  icon("opm-vm", "virtual-machine", 1350, 190, 48);
  box("apR", 1380, 250, 260, 80, "Apply agents", { size: 16 });
  box("capR", 1380, 370, 260, 80, "Capture agents", { size: 16 });
  txt("opm-b", 1510, 590, "RDRS\nopen platform manager", { size: 18, align: "center" });
  step("s4", 1690, 190, 4);
  card("eh", 1740, 100, 180, 150, "event-hubs", "Azure Event Hubs", M);
  step("s7", 1930, 110, 7);
  card("cons", 1980, 100, 220, 170, "function-apps", "Consumer\nLogic Apps, Functions,\nor a VM-based solution", M);
  group("ds", 2240, 110, 320, 1100, "Azure data services", { fill: TINT.white });
  card("sql", 2280, 170, 240, 170, "azure-sql", "Azure SQL", M);
  card("mysql", 2280, 360, 240, 170, "azure-database-mysql-server", "Azure Database\nfor MySQL", M);
  card("pg", 2280, 550, 240, 170, "azure-database-postgresql-server", "Azure Database\nfor PostgreSQL", M);
  card("dls", 2280, 740, 240, 170, "data-lake-storage-gen1", "Azure Data Lake\nStorage", M);
  card("cos", 2280, 930, 240, 170, "azure-cosmos-db", "Azure Cosmos DB", M);
  step("s8", 2580, 120, 8);
  card("pbi", 2640, 250, 180, 150, "power-bi-embedded", "Power BI", M);
  step("s9", 2840, 200, 9);
  card("capp", 2640, 560, 180, 150, "client-apps", "Client apps", M);
  card("azs", 2640, 860, 180, 150, "azure-a", "Azure services", M);
  group("dash", 1340, 760, 340, 320, null, { fill: TINT.white });
  box("dash-b", 1360, 790, 300, 260, "RDRS dashboard\n(Metadata,\ntransformation rules,\nprocess definitions)", { size: 16, iconLeft: "virtual-machine" });
  step("s5", 1690, 770, 5);
  group("bulk", 1340, 1160, 340, 240, null, { fill: TINT.white });
  box("bulk-b", 1360, 1190, 300, 180, "RDRS bulk load", { size: 18, iconLeft: "virtual-machine" });
  step("s12", 1690, 1170, 12);

  both("a-db2", "db2", "right", 270, "capL", "left", 270);
  txt("l-db2", 395, 215, "Log-based\nCDC", { size: 16 });
  both("a-ims", "ims", "right", 420, "apL", "left", 420);
  txt("l-ims", 395, 365, "Log-based\nCDC", { size: 16 });
  both("a-odb", "odb", "right", 650, "mgr", "left", 650);
  txt("l-odb", 395, 595, "Log-based\nCDC", { size: 16 });
  arrow("a-vsam", "mgr", "bottom", 690, "vsam", "right", 935, [935]);
  txt("l-vsam", 420, 890, "CDC", { size: 16 });
  arrow("a-cdc1", "capL", "right", 290, "apR", "left", 290, [], { dashed: true });
  txt("l-cdc1", 1060, 250, "CDC", { size: 16 });
  arrow("a-cdc2", "capR", "left", 410, "apL", "right", 410, [], { dashed: true });
  txt("l-cdc2", 1060, 420, "CDC", { size: 16 });
  arrow("a6", "apR", "right", 290, "ds", "left", 290, [], { dashed: true });
  txt("l-6", 1900, 250, "CDC", { size: 16 });
  step("s6", 2000, 300, 6);
  arrow("a10", "ds", "left", 410, "capR", "right", 410, [], { dashed: true });
  txt("l-10", 1900, 370, "CDC", { size: 16 });
  step("s10", 2000, 420, 10);
  arrow("a-eh", "apR", "top", 1620, "eh", "left", 175, [175]);
  arrow("a-cons", "eh", "right", 175, "cons", "left", 175);
  arrow("a-ds", "cons", "right", 185, "ds", "left", 185);
  arrow("a-dopm", "dash", "top", 1510, "opm", "bottom", 1510, [], { dashed: true });
  arrow("a-dmgr", "dash", "left", 790, "mgr", "bottom", 760, [760], { dashed: true });
  arrow("a-copy", "flat", "right", 1300, "bulk", "left", 1300);
  txt("l-copy", 600, 1260, "File copy", { size: 18 });
  arrow("a-bulk", "bulk", "right", 1280, "ds", "bottom", 2400, [2400]);
  txt("l-bulk", 1900, 1240, "Bulk load", { size: 18 });
  arrow("a-pbi", "ds", "right", 600, "pbi", "left", 325, [2580]);
  arrow("a-capp", "ds", "right", 635, "capp", "left", 635);
  arrow("a-azs", "ds", "right", 700, "azs", "left", 935, [2610]);
  txt("footer", 40, 1580, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Mainframe real-time and batch data replication with Azure RDRS\"", { size: 20, color: "#495057" });
}
