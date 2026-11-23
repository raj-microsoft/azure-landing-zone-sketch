// 048 Migrate mainframe data tier to Azure with mLogica LIBER*IRIS.
export const meta = {
  num: 48,
  slug: "mainframe-data-replication-azure-data-platform",
  title: "Migrate mainframe data tier to Azure with mLogica LIBER*IRIS",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/mainframe/mainframe-data-replication-azure-data-platform",
  category: "Mainframe",
  status: "done",
  otherDiagrams: [],
  substitutions: { "VPN gateway": "virtual-network-gateways", "ExpressRoute": "expressroute-circuits", "Site-to-site VPN": "connections", "Linux VMs (LIBER*IRIS cluster)": "azure-linux", "Azure SQL": "sql-database", "Azure Database for PostgreSQL": "azure-database-postgresql-server", "Azure Database for MySQL": "azure-database-mysql-server", "Azure Cosmos DB": "azure-cosmos-db", "Data Lake Storage / Blob Storage": "data-lake-storage-gen1" },
  differences: ["Mainframe, Db2, IMS, IDMS, ADABAS, VSAM, PS, GDG, copybooks and mLogica scripts are labelled sketch boxes (non-Azure, no logos)."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, both, step } = k;
  txt("title", 60, 10, "Migrate mainframe data tier to Azure with mLogica LIBER*IRIS", { size: 30 });
  group("dc", 60, 70, 1040, 1680, "Enterprise mainframe datacenter", { fill: TINT.onprem, size: 24 });
  box("mf", 880, 90, 180, 70, "Mainframe", { size: 16, fill: TINT.mg });
  group("tier", 100, 240, 960, 1460, "Mainframe data tier", { fill: TINT.white, dashed: true, align: "center", size: 20 });
  group("rel", 360, 300, 260, 220, "Relational", { fill: TINT.sub, align: "center", size: 16 });
  box("db2", 400, 360, 180, 120, "Db2", { type: "ellipse", fill: TINT.white });
  box("cpy", 680, 340, 280, 120, "Copybooks, data\ndefinite language files", { size: 16 });
  group("nrel", 300, 580, 400, 230, "Nonrelational", { fill: TINT.sub, align: "center", size: 16 });
  box("ims", 320, 650, 120, 120, "IMS", { size: 16 });
  box("idms", 450, 650, 120, 120, "IDMS", { size: 16 });
  box("ada", 580, 650, 120, 120, "ADABAS", { size: 16, type: "ellipse" });
  group("files", 300, 870, 400, 220, "Files", { fill: TINT.sub, align: "center", size: 16 });
  box("vsam", 320, 940, 120, 120, "VSAM", { size: 16 });
  box("ps", 450, 940, 120, 120, "PS", { size: 16 });
  box("gdg", 580, 940, 120, 120, "GDG", { size: 16 });
  box("jcl", 260, 1220, 300, 140, "mLogica\nExtract job control language\nscripts and programs", { size: 16 });
  step("s4", 600, 1190, 4);
  box("seq", 640, 1230, 220, 100, "Sequential files", { size: 16 });
  box("lds", 560, 1480, 220, 100, "mLogica\nLoad scripts", { size: 16 });
  step("s5", 900, 1380, 5);

  card("vpn1", 1120, 860, 180, 150, "virtual-network-gateways", "VPN gateway", { size: 16 });
  card("er", 1390, 720, 200, 120, "expressroute-circuits", "ExpressRoute", { size: 16 });
  card("s2s", 1390, 1030, 200, 120, "connections", "Site-to-site VPN", { size: 16 });
  card("vpn2", 1680, 860, 180, 150, "virtual-network-gateways", "VPN gateway", { size: 16 });

  group("az", 1920, 70, 1100, 1680, "Azure cloud", { fill: TINT.sub, size: 24, align: "center" });
  group("lib", 1960, 300, 540, 620, "mLogica LIBER*IRIS\nData migration cluster", { fill: TINT.white, iconName: "azure-linux", size: 18 });
  box("esg", 2100, 450, 300, 110, "Extract script\ngenerator", { size: 18 });
  step("s2", 2420, 470, 2);
  step("s6", 2010, 640, 6);
  box("lse", 2100, 640, 300, 110, "Load script\nexecutor", { size: 18 });
  txt("nfs-lbl", 1990, 1000, "NFS", { size: 16 });
  txt("logs-lbl", 2290, 1000, "Logs", { size: 16 });

  group("adp", 2560, 200, 440, 1500, "Azure data platform", { fill: TINT.white, dashed: true, align: "center", size: 20 });
  group("relz", 2590, 250, 380, 630, "Relational", { fill: TINT.sub, align: "center", size: 16 });
  card("sql", 2620, 300, 320, 150, "sql-database", "Azure SQL", { size: 16 });
  card("pg", 2620, 460, 320, 190, "azure-database-postgresql-server", "Azure Database for\nPostgreSQL", { size: 16 });
  card("my", 2620, 660, 320, 190, "azure-database-mysql-server", "Azure Database\nfor MySQL", { size: 16 });
  group("nosql", 2590, 920, 380, 260, "NoSQL database", { fill: TINT.sub, align: "center", size: 16 });
  card("cos", 2620, 980, 320, 170, "azure-cosmos-db", "Azure\nCosmos DB", { size: 16 });
  step("s7", 2500, 300, 7);
  step("s8", 2500, 1100, 8);
  group("stor", 2590, 1220, 380, 440, "Azure Storage", { fill: TINT.sub, align: "center", size: 16 });
  card("dls", 2620, 1290, 320, 330, "data-lake-storage-gen1", "Data Lake Storage/\nBlob Storage", { size: 16 });

  arrow("ftp1", "cpy", "right", 400, "esg", "left", 480, [1090]);
  step("s1", 1150, 380, 1);
  txt("ftp1-lbl", 1220, 395, "FTPS", { size: 16 });
  arrow("ftp2", "esg", "left", 530, "jcl", "top", 360, [1080, 1170], { firstDir: "h" });
  step("s3", 1300, 560, 3);
  txt("ftp2-lbl", 1220, 545, "FTPS", { size: 16 });
  arrow("j-db2", "db2", "left", 420, "jcl", "left", 1340, [140]);
  arrow("j-nr", "nrel", "left", 700, "jcl", "left", 1300, [180]);
  arrow("j-f", "files", "left", 980, "jcl", "left", 1260, [220]);
  arrow("j-seq", "jcl", "right", 1280, "seq", "left", 1280);
  arrow("j-lds", "jcl", "bottom", 330, "lds", "left", 1530);
  both("vpn", "vpn1", "right", 935, "vpn2", "left", 935, [], { color: "#1971c2" });
  arrow("seq-dl", "seq", "right", 1280, "dls", "left", 1500, [1880]);
  txt("sftp1-lbl", 900, 1240, "Binary SFTP", { size: 16 });
  arrow("lds-dl", "lds", "right", 1530, "dls", "left", 1580);
  txt("sftp2-lbl", 1140, 1490, "Binary SFTP", { size: 16 });
  arrow("l-sql", "lse", "right", 670, "relz", "left", 375, [2530]);
  txt("bulk-lbl", 2390, 210, "SQL bulk\nupload", { size: 16 });
  arrow("l-cos", "lse", "right", 720, "nosql", "left", 1050, [2470]);
  txt("api-lbl", 2440, 1190, "SQL API", { size: 16 });
  arrow("l-logs", "lse", "bottom", 2270, "stor", "left", 1280);
  arrow("nfs", "stor", "left", 1400, "lse", "bottom", 2140);

  txt("footer", 60, 1790, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Migrate mainframe data tier to Azure with mLogica LIBER*IRIS\"", { size: 20, color: "#495057" });
}
