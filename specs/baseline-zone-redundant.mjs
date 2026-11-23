// 063 Baseline highly available zone-redundant web application.
export const meta = {
  num: 63,
  slug: "baseline-zone-redundant",
  title: "Baseline highly available zone-redundant web application",
  url: "https://learn.microsoft.com/azure/architecture/web-apps/app-service/architectures/baseline-zone-redundant",
  category: "Web",
  status: "done",
  otherDiagrams: ["Network flows", "Encryption flow", "Deployment architecture"],
  substitutions: { "User": "users", "Private DNS zones": "dns-zones", "DDoS Protection": "ddos-protection-plans", "Virtual network": "virtual-networks", "Application Gateway with WAF": "application-gateways", "Virtual interface": "network-interfaces", "Private endpoints": "private-link", "App Service / instances": "app-services", "Managed identity": "managed-identities", "Azure SQL Database": "sql-database", "Azure Key Vault": "key-vaults", "Azure Storage": "storage-accounts", "Microsoft Entra ID": "entra-connect", "Application Insights": "application-insights", "Azure Monitor": "monitor", "Health Model": "monitor-health-models" },
  differences: ["Subnet NSG shields are omitted."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow } = k;
  txt("title", 40, 10, "Baseline highly available zone-redundant web application", { size: 30 });

  card("user", 60, 220, 200, 180, "users", "User");
  card("dns", 180, 470, 240, 200, "dns-zones", "Private\nDNS zones");
  txt("lnk-lbl", 440, 500, "Linked", { size: 16 });
  card("ddos", 420, 800, 220, 170, "ddos-protection-plans", "DDoS\nProtection");

  group("vnet", 560, 80, 2060, 700, "Virtual network", { fill: TINT.white, stroke: "#1971c2", iconName: "virtual-networks" });
  group("agws", 580, 150, 440, 610, "Application Gateway subnet", { fill: TINT.mg, size: 16 });
  card("agw", 620, 250, 360, 310, "application-gateways", "Application Gateway\nwith Azure Web\nApplication Firewall");
  group("ints", 1040, 150, 1560, 250, "App Service integration subnet", { fill: TINT.mg, size: 16 });
  card("vif", 1985, 180, 260, 170, "network-interfaces", "Virtual interface");
  group("pes", 1040, 420, 1560, 340, "Private endpoint subnet", { fill: TINT.mg, size: 16 });
  card("aspe", 1120, 490, 250, 210, "private-link", "App Service\nprivate endpoint");
  card("dbpe", 1680, 490, 250, 210, "private-link", "Database private\nendpoint");
  card("cfgpe", 1990, 490, 250, 210, "private-link", "Configuration\nprivate endpoint");
  card("stpe", 2300, 490, 250, 210, "private-link", "Storage private\nendpoint");

  arrow("u-agw", "user", "right", 310, "agw", "left", 310);
  arrow("dns-l", "dns", "right", 570, "vnet", "left", 570, [], { dashed: true });
  arrow("agw-pe", "agw", "right", 520, "aspe", "left", 520);
  arrow("v-db", "vif", "bottom", 2045, "dbpe", "top", 1805, [380]);
  arrow("v-cfg", "vif", "bottom", 2115, "cfgpe", "top", 2115);
  arrow("v-st", "vif", "bottom", 2185, "stpe", "top", 2425, [380]);

  group("asp", 1060, 880, 580, 720, null, { fill: TINT.mg });
  box("mi", 1075, 900, 170, 80, "Managed\nidentity", { iconLeft: "managed-identities", size: 16 });
  card("app", 1270, 900, 230, 150, "app-services", "App Service");
  for (let i = 0; i < 3; i++) {
    group(`z${i}`, 1080 + i * 185, 1080, 170, 500, `Zone ${i + 1}`, { fill: TINT.white, stroke: "#f08c00", size: 18, align: "center" });
    card(`inst${i}`, 1095 + i * 185, 1140, 140, 220, "app-services", "App\nService\ninstance", { size: 16 });
  }
  txt("region-lbl", 1300, 1620, "Region", { size: 18 });
  arrow("pe-asp", "aspe", "bottom", 1245, "asp", "top", 1245);
  arrow("asp-vif", "asp", "top", 1600, "vif", "left", 270, [840, 1030, 270]);

  card("sql", 1695, 920, 220, 190, "sql-database", "Azure SQL\nDatabase");
  txt("sql-lbl", 1760, 1125, "Data", { size: 18 });
  card("kv", 2005, 920, 220, 190, "key-vaults", "Azure Key\nVault");
  txt("kv-lbl", 2040, 1125, "Certificates", { size: 18 });
  card("st", 2315, 920, 220, 190, "storage-accounts", "Azure\nStorage");
  txt("st-lbl", 2340, 1125, "Storage for\ndeployment", { size: 18 });
  arrow("db-sql", "dbpe", "bottom", 1805, "sql", "top", 1805);
  arrow("cfg-kv", "cfgpe", "bottom", 2115, "kv", "top", 2115);
  arrow("st-st", "stpe", "bottom", 2425, "st", "top", 2425);

  card("entra", 640, 1000, 220, 200, "entra-connect", "Microsoft\nEntra ID");
  txt("entra-lbl", 695, 1215, "Identity", { size: 18 });
  group("monit", 340, 1300, 680, 290, null, { fill: TINT.mg });
  card("ai", 360, 1330, 200, 230, "application-insights", "Application\nInsights");
  card("mon", 580, 1330, 200, 230, "monitor", "Azure\nMonitor");
  card("hm", 800, 1330, 200, 230, "monitor-health-models", "Health\nModel");
  txt("monit-lbl", 610, 1610, "Monitoring", { size: 18 });

  txt("footer", 40, 1720, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Baseline highly available zone-redundant web application\"", { size: 20, color: "#495057" });
}
