// 136 Data warehousing and analytics.
export const meta = {
  num: 136,
  slug: "data-warehouse",
  title: "Data warehousing and analytics",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/data/data-warehouse",
  category: "Analytics",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Microsoft SQL Server (on-premises)": "sql-server", "Other relational databases": "sql-database", "Azure SQL Database": "sql-database", "Table Storage": "table", "Azure Data Lake Storage": "data-lake-store-gen1", "Azure Analysis Services": "analysis-services", "Power BI": "power-bi-embedded", "Microsoft Entra ID": "entra-connect" },
  differences: [],
};

export function draw(k) {
  const { TINT, txt, card, group, arrow, step } = k;
  const S = 16;
  group("src", 20, 20, 300, 840, "Data sources", { fill: TINT.onprem });
  card("sqls", 70, 70, 200, 110, "sql-server", "Microsoft SQL Server\n(on-premises)", { size: S });
  card("ordb", 70, 220, 200, 110, "sql-database", "Other relational\ndatabases (on-premises)", { size: S });
  card("sqldb", 70, 370, 200, 110, "sql-database", "Azure SQL\nDatabase", { size: S });
  card("tbl", 70, 520, 200, 110, "table", "Table Storage", { size: S });
  card("cos", 70, 690, 200, 110, "azure-cosmos-db", "Azure Cosmos DB", { size: S });
  group("orch", 400, 20, 620, 840, "Orchestration", { fill: TINT.sub });
  group("ing", 460, 200, 220, 380, "Ingestion", { fill: TINT.white });
  card("adls", 480, 300, 180, 120, "data-lake-store-gen1", "Azure Data\nLake Storage", { size: S });
  group("sto", 740, 200, 220, 380, "Storage", { fill: TINT.white });
  card("syn", 760, 300, 180, 120, "azure-synapse-analytics", "Azure Synapse\nAnalytics", { size: S });
  card("adf", 610, 680, 180, 110, "data-factories", "Data Factory", { size: S });
  group("ana", 1100, 60, 260, 360, "Analysis", { fill: TINT.data });
  card("aas", 1140, 160, 180, 120, "analysis-services", "Azure Analysis\nServices", { size: S });
  group("vis", 1420, 60, 240, 360, "Visualization", { fill: TINT.app });
  card("pbi", 1450, 160, 180, 120, "power-bi-embedded", "Power BI", { size: S });
  card("eid", 1140, 680, 200, 110, "entra-connect", "Microsoft Entra ID", { size: S });
  arrow("f1", "sqls", "right", 125, "ing", "top", 560, [], {});
  step("s1", 380, -30, 1);
  arrow("f2", "ordb", "right", 275, "ing", "left", 260, [], {});
  arrow("f3", "sqldb", "right", 425, "ing", "left", 330, [370], {});
  arrow("f4", "tbl", "right", 575, "ing", "left", 450, [380], {});
  arrow("f5", "cos", "right", 745, "ing", "bottom", 570, [], {});
  arrow("f6", "ing", "right", 360, "sto", "left", 360, [], {});
  step("s2", 690, 130, 2);
  arrow("f7", "sto", "right", 360, "ana", "left", 240, [1060], {});
  step("s3", 1040, 130, 3);
  arrow("f8", "ana", "right", 220, "vis", "left", 220, [], {});
  step("s4", 1370, 130, 4);
  arrow("auth", "eid", "top", 1240, "ana", "bottom", 1240, [], {});
  txt("auth-l", 1260, 560, "Authentication", { size: S });
  arrow("auth2", "eid", "left", 735, "sto", "bottom", 850, [], {});
  txt("footer", 20, 900, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Data warehousing and analysis scenario\"", { size: 20, color: "#495057" });
}
