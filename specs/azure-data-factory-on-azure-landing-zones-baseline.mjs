// 110 Data Factory on Azure landing zones: baseline architecture.
export const meta = {
  num: 110,
  slug: "azure-data-factory-on-azure-landing-zones-baseline",
  title: "Baseline Azure Data Factory architecture in an Azure landing zone",
  url: "https://learn.microsoft.com/azure/architecture/databases/architecture/azure-data-factory-on-azure-landing-zones-baseline",
  category: "Analytics",
  status: "done",
  otherDiagrams: ["img1: medallion architecture network design"],
  substitutions: { "Power BI": "power-bi-embedded", "Bronze/Silver/Gold": "data-lake-storage-gen1", "Microsoft Entra ID": "entra-connect", "Azure Site Recovery": "recovery-services-vaults", "Microsoft Cost Management": "cost-management" },
  differences: ["Ingest group shortened so the data-source arrow passes below it rather than through it.", "Data source (on-premises) and Delta Lake / Apache Spark are drawn as labelled shapes.", "Purview Data Governance has no sketch icon: plain labelled box."],
};

export function draw(k) {
  const { TINT, txt, card, group, box, arrow, step } = k;
  const S = 16;
  const both = (id, f, fs, fa, t, ts, ta, lanes = [], o = {}) => arrow(id, f, fs, fa, t, ts, ta, lanes, { tail: "arrow", ...o });
  txt("title", 40, 0, "Data Factory medallion baseline on Azure landing zones", { size: 28 });
  group("onp", 40, 460, 260, 290, null, { fill: TINT.onprem, dashed: true });
  txt("onp-lbl", 70, 470, "On-premises", { size: 18 });
  box("src", 70, 540, 200, 150, "Data source", { size: 18, fill: TINT.white });

  group("az", 380, 60, 1580, 1000, null, { fill: TINT.white, dashed: true });
  txt("az-lbl", 400, 70, "Azure", { size: 22 });
  group("ing", 410, 120, 280, 440, null, { fill: TINT.sub, dashed: true });
  txt("ing-lbl", 430, 130, "Ingest", { size: 18 });
  card("adf", 450, 300, 200, 150, "data-factories", "Azure Data Factory", { size: S });

  group("proc", 750, 120, 720, 270, null, { fill: TINT.app, dashed: true });
  txt("proc-lbl", 770, 130, "Process", { size: 18 });
  card("dbx", 990, 160, 240, 200, "azure-databricks", "Azure Databricks\nApache Spark", { size: S });
  group("srv", 1510, 120, 420, 270, null, { fill: TINT.data, dashed: true });
  txt("srv-lbl", 1530, 130, "Serve", { size: 18 });
  card("pbi", 1620, 180, 200, 150, "power-bi-embedded", "Power BI", { size: S });

  group("store", 750, 430, 1180, 330, null, { fill: TINT.sub, dashed: true });
  txt("store-lbl", 1300, 720, "Store", { size: 18 });
  group("dls", 780, 460, 720, 240, null, { fill: TINT.white });
  card("br", 810, 490, 180, 130, "data-lake-storage-gen1", "Bronze", { size: S });
  card("si", 1050, 490, 180, 130, "data-lake-storage-gen1", "Silver", { size: S });
  card("go", 1290, 490, 180, 130, "data-lake-storage-gen1", "Gold", { size: S });
  txt("dls-lbl", 810, 640, "Data Lake Storage  (Delta Lake)", { size: 18 });
  card("sql", 1620, 490, 200, 150, "sql-server", "SQL Server", { size: S });

  group("mon", 410, 800, 1520, 230, null, { fill: TINT.onprem, dashed: true });
  txt("mon-lbl", 430, 810, "Monitor and govern", { size: 18 });
  const items = [["devops", "azure-devops", "Azure DevOps"], ["entra", "entra-connect", "Microsoft\nEntra ID"], ["kv", "key-vaults", "Azure Key\nVault"], ["monr", "monitor", "Azure Monitor"], ["cost", "cost-management", "Microsoft Cost\nManagement"], ["pv", null, "Purview Data\nGovernance"], ["asr", "recovery-services-vaults", "Azure Site\nRecovery"]];
  items.forEach(([id, ic, l], i) => ic ? card(id, 440 + i * 210, 850, 190, 150, ic, l, { size: S }) : box(id, 440 + i * 210, 850, 190, 150, l, { size: 18, fill: TINT.white }));
  step("s5", 1700, 810, 5);

  arrow("a1", "src", "right", 615, "dls", "left", 615);
  step("s1", 320, 560, 1);
  both("a2a", "dbx", "bottom", 1030, "br", "top", 900, [400, 900], { firstDir: "v" });
  both("a2b", "dbx", "bottom", 1130, "si", "top", 1140, [410, 1140], { firstDir: "v" });
  both("a2c", "dbx", "bottom", 1210, "go", "top", 1380, [400, 1380], { firstDir: "v" });
  step("s2", 700, 395, 2);
  arrow("a-bs", "br", "right", 555, "si", "left", 555);
  arrow("a-sg", "si", "right", 555, "go", "left", 555);
  arrow("a3", "dls", "right", 560, "sql", "left", 560);
  step("s3", 1540, 500, 3);
  arrow("a-sp", "sql", "top", 1720, "pbi", "bottom", 1720);
  arrow("a4", "proc", "right", 230, "srv", "left", 230);
  step("s4", 1530, 170, 4);
  txt("footer", 40, 1110, "Pencil-sketch redraw of the Azure Architecture Center diagram \"medallion architecture and data flow\"", { size: 20, color: "#495057" });
}
