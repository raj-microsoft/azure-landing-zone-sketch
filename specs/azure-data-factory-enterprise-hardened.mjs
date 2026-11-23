// 111 Enterprise-hardened Azure Data Factory architecture.
export const meta = {
  num: 111,
  slug: "azure-data-factory-enterprise-hardened",
  title: "Enterprise-hardened Azure Data Factory architecture",
  url: "https://learn.microsoft.com/azure/architecture/databases/architecture/azure-data-factory-enterprise-hardened",
  category: "Analytics",
  status: "done",
  otherDiagrams: ["img1: hardened network design"],
  substitutions: { "Power BI": "power-bi-embedded", "Bronze/Silver/Gold / Azure Data Lake Storage": "data-lake-storage-gen1", "Microsoft Entra": "entra-connect", "Azure Site Recovery": "recovery-services-vaults", "Foundry Tools": "ai-foundry", "Azure Cost Management and Billing": "cost-management-and-billing" },
  differences: ["Delta Lake and Apache Spark logos shown as text.", "Purview Data Governance has no sketch icon: plain labelled box.", "Domain 2 and Domain N stacked frames drawn as offset outlines behind Domain 1."],
};

export function draw(k) {
  const { TINT, txt, card, group, box, step, poly } = k;
  const S = 16;
  const C = (id, x, y, ic, l, w = 180) => card(id, x, y, w, 140, ic, l, { size: S });
  txt("title", 40, 0, "Enterprise-hardened Data Factory medallion architecture", { size: 28 });
  group("az", 40, 60, 2000, 1260, null, { fill: TINT.white, dashed: true });
  txt("az-lbl", 60, 70, "Azure", { size: 22 });

  group("ing", 70, 120, 230, 600, null, { fill: TINT.sub, dashed: true });
  txt("ing-lbl", 90, 130, "Ingest", { size: 18 });
  C("adf", 95, 330, "data-factories", "Azure Data\nFactory");
  step("s1", 310, 120, 1);
  group("proc", 360, 120, 420, 260, null, { fill: TINT.app, dashed: true });
  txt("proc-lbl", 380, 130, "Process", { size: 18 });
  C("dbx", 470, 170, "azure-databricks", "Azure Databricks\nApache Spark", 200);
  group("store", 360, 410, 420, 310, null, { fill: TINT.sub, dashed: true });
  txt("store-lbl", 520, 680, "Store", { size: 18 });
  C("br", 380, 440, "data-lake-storage-gen1", "Bronze", 120);
  C("si", 510, 440, "data-lake-storage-gen1", "Silver", 120);
  C("go", 640, 440, "data-lake-storage-gen1", "Gold", 120);
  txt("dl-lbl", 390, 600, "Data Lake Storage\n(Delta Lake)", { size: 16 });

  group("mod", 820, 120, 330, 260, null, { fill: TINT.data, dashed: true });
  txt("mod-lbl", 840, 130, "Model", { size: 18 });
  C("sql", 880, 180, "sql-server", "Azure SQL Server", 210);
  step("s2", 1160, 120, 2);
  group("srv", 1210, 120, 300, 260, null, { fill: TINT.data, dashed: true });
  txt("srv-lbl", 1230, 130, "Serve", { size: 18 });
  C("pbi", 1270, 180, "power-bi-embedded", "Power BI");
  group("adv", 1550, 120, 460, 260, null, { fill: TINT.data, dashed: true });
  txt("adv-lbl", 1570, 130, "Advanced Analytics", { size: 18 });
  C("ft", 1570, 180, "ai-foundry", "Foundry Tools", 135);
  C("aml", 1720, 180, "azure-machine-learning", "Azure Machine\nLearning", 135);
  C("aoai", 1865, 180, "azure-openai", "Azure OpenAI", 135);
  step("s3", 1960, 70, 3);

  // Domains
  poly("dN", [[960, 890], [960, 1030], [2000, 1030], [2000, 470], [1920, 470]], { color: "#1971c2" });
  txt("dN-lbl", 1880, 990, "Domain N", { size: 18, color: "#1971c2" });
  poly("d2", [[920, 890], [920, 960], [1960, 960], [1960, 440], [1920, 440]], { color: "#1971c2" });
  txt("d2-lbl", 1840, 920, "Domain 2", { size: 18, color: "#1971c2" });
  group("d1", 880, 410, 1040, 480, null, { fill: TINT.white, stroke: "#1971c2" });
  txt("d1-lbl", 1800, 850, "Domain 1", { size: 18, color: "#1971c2" });
  step("s4", 840, 400, 4);
  group("dmod", 1140, 430, 260, 200, null, { fill: TINT.data, dashed: true });
  txt("dmod-lbl", 1160, 440, "Model", { size: 18 });
  C("dsql", 1180, 475, "sql-server", "Azure SQL Server");
  group("dsrv", 1420, 430, 240, 200, null, { fill: TINT.data, dashed: true });
  txt("dsrv-lbl", 1440, 440, "Serve", { size: 18 });
  C("dpbi", 1450, 475, "power-bi-embedded", "Power BI");
  step("s5", 1680, 540, 5);
  group("dadv", 940, 650, 480, 220, null, { fill: TINT.data, dashed: true });
  txt("dadv-lbl", 960, 660, "Advanced Analytics", { size: 18 });
  C("dft", 955, 700, "ai-foundry", "Foundry\nTools", 145);
  C("daml", 1105, 700, "azure-machine-learning", "Azure Machine\nLearning", 145);
  C("daoai", 1255, 700, "azure-openai", "Azure\nOpenAI", 145);
  group("sand", 1450, 650, 260, 220, null, { fill: TINT.data, dashed: true });
  txt("sand-lbl", 1470, 660, "Innovation Sandpit", { size: 18 });
  C("sdl", 1480, 700, "data-lake-storage-gen1", "Azure Data\nLake Storage", 200);

  group("mon", 70, 1070, 1940, 230, null, { fill: TINT.onprem });
  txt("mon-lbl", 90, 1080, "Monitor and Govern", { size: 18 });
  const items = [["devops", "azure-devops", "Azure DevOps"], ["entra", "entra-connect", "Microsoft Entra"], ["kv", "key-vaults", "Azure Key Vault"], ["monr", "monitor", "Azure Monitor"], ["cost", "cost-management-and-billing", "Azure Cost\nManagement and Billing"], ["pv", null, "Purview Data\nGovernance"], ["asr", "recovery-services-vaults", "Azure Site\nRecovery"]];
  items.forEach(([id, ic, l], i) => ic ? card(id, 110 + i * 270, 1120, 230, 150, ic, l, { size: S }) : box(id, 110 + i * 270, 1120, 230, 150, l, { size: 18, fill: TINT.white }));

  poly("axis", [[60, 1380], [2020, 1380]], { head: "arrow" });
  poly("axis2", [[2020, 1380], [60, 1380]], { head: "arrow" });
  txt("src-al", 400, 1395, "Source Aligned", { size: 18 });
  txt("con-al", 1300, 1395, "Consumer Aligned", { size: 18 });
  txt("key", 1500, 1460, "Ownership key:", { size: 18 });
  box("k1", 1660, 1450, 200, 60, "Central function", { size: 16, stroke: "#868e96" });
  box("k2", 1660, 1520, 200, 60, "Domain", { size: 16, stroke: "#1971c2" });
  box("k3", 1660, 1590, 200, 60, "Optional domain", { size: 16, stroke: "#1971c2", dashed: true });
  txt("footer", 40, 1690, "Pencil-sketch redraw of the Azure Architecture Center diagram \"hardened medallion architecture\"", { size: 20, color: "#495057" });
}
