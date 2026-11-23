// 070 Basic web application.
export const meta = {
  num: 70,
  slug: "basic-web-app",
  title: "Basic web application",
  url: "https://learn.microsoft.com/azure/architecture/web-apps/app-service/architectures/basic-web-app",
  category: "Web",
  status: "done",
  otherDiagrams: [],
  substitutions: { "User": "users", "App Service built-in authentication (Easy Auth)": "entra-connect", "App Service / instance": "app-services", "Managed identity": "managed-identities", "Azure SQL Database": "sql-database", "Microsoft Entra ID": "entra-connect", "Application Insights": "application-insights", "Azure Monitor (second 'Application Insights' tile)": "monitor", "Health model": "monitor-health-models" },
  differences: ["The official diagram labels the gauge icon 'Application Insights' a second time; the sketch keeps that label with the Azure Monitor icon."],
};

export function draw(k) {
  const { TINT, txt, card, group, arrow, step } = k;
  txt("title", 40, 10, "Basic web application", { size: 30 });

  card("user", 60, 260, 200, 180, "users", "User");
  step("s1", 400, 230, 1);
  txt("url", 300, 370, "https://domainname.\nazurewebsites.net", { size: 16 });

  group("app", 620, 110, 980, 600, null, { fill: TINT.mg });
  step("s2", 640, 130, 2);
  card("easy", 700, 150, 280, 230, "entra-connect", "App Service built-\nin authentication\n(Easy Auth)");
  card("as", 1000, 150, 260, 160, "app-services", "App Service");
  card("mi", 1290, 150, 260, 200, "managed-identities", "Managed\nidentity");
  group("inst", 1010, 340, 240, 340, null, { fill: TINT.white, stroke: "#f08c00" });
  card("asi", 1030, 380, 200, 260, "app-services", "App Service\ninstance");
  arrow("u-app", "user", "right", 350, "app", "left", 350);

  card("sql", 1800, 260, 240, 220, "sql-database", "Azure SQL\nDatabase");
  txt("sql-lbl", 1880, 500, "Data", { size: 18 });
  step("s3", 1680, 260, 3);
  arrow("app-sql", "app", "right", 380, "sql", "left", 380);

  step("s4", 1110, 730, 4);
  card("entra", 620, 820, 240, 260, "entra-connect", "Microsoft\nEntra ID");
  txt("entra-lbl", 680, 1100, "Identity", { size: 18 });
  group("monit", 900, 820, 700, 260, null, { fill: TINT.mg });
  card("ai", 920, 840, 210, 220, "application-insights", "Application\nInsights");
  card("mon", 1150, 840, 210, 220, "monitor", "Application\nInsights");
  card("hm", 1380, 840, 200, 220, "monitor-health-models", "Health\nmodel");
  txt("monit-lbl", 1160, 1100, "Monitoring", { size: 18 });

  txt("footer", 40, 1200, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Basic web application\"", { size: 20, color: "#495057" });
}
