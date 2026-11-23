// 036 WordPress on App Service.
export const meta = {
  num: 36,
  slug: "wordpress-app-service",
  title: "WordPress on App Service",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/infrastructure/wordpress-app-service",
  category: "Web",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Internet": "globe-success", "Azure Front Door + WAF": "front-door-and-cdn-profiles", "Azure Blob Storage": "storage-accounts", "Private DNS zone": "dns-zones", "Azure App Service plan": "app-service-plans", "Azure App Service": "app-services", "Private endpoint": "private-endpoints", "Azure Database for MySQL flexible server": "azure-database-mysql-server", "Premium storage": "disks" },
  differences: ["The Storage account wrapper is a titled group around the Blob Storage card."],
};

export function draw(k) {
  const { TINT, txt, card, group, arrow } = k;
  txt("title", 60, 10, "WordPress on App Service", { size: 30 });
  card("inet", 60, 560, 160, 150, "globe-success", "Internet");
  card("afd", 300, 540, 260, 200, "front-door-and-cdn-profiles", "Azure Front Door\n+ Azure Web\nApplication Firewall", { size: 16 });
  group("sa", 620, 80, 340, 240, "Storage account", { fill: TINT.white, iconName: "storage-accounts" });
  card("blob", 650, 140, 280, 150, "storage-accounts", "Azure Blob Storage");
  txt("static-lbl", 300, 120, "Static web content", { size: 18 });
  card("dns", 1180, 80, 200, 160, "dns-zones", "Private\nDNS zone");

  group("vnet", 600, 400, 1060, 640, "10.0.0.0/16 (virtual network)", { fill: TINT.white, dashed: true, stroke: "#1971c2", iconName: "virtual-networks" });
  group("app", 640, 480, 400, 520, "10.0.0.0/24 (appsubnet)\nAzure App Service delegated subnet", { fill: TINT.mg, size: 16 });
  group("plan", 680, 570, 320, 400, null, { fill: TINT.white });
  card("asp", 700, 590, 280, 130, "app-service-plans", "Azure App\nService plan", { size: 16 });
  card("as", 700, 760, 280, 180, "app-services", "Azure App\nService");
  group("pe", 1120, 480, 500, 520, "10.0.1.0/24 (pesubnet)\nPrivate endpoint subnet", { fill: TINT.mg, size: 16 });
  card("pep", 1170, 720, 400, 200, "private-endpoints", "Private endpoint\n(Azure Database for\nMySQL flexible server)", { size: 16 });
  txt("linked", 1300, 330, "Linked", { size: 18 });

  group("pri", 1740, 480, 340, 620, "Azure Database for\nMySQL flexible\nserver (primary)", { fill: TINT.white, align: "center" });
  card("my1", 1790, 620, 240, 160, "azure-database-mysql-server", "MySQL", { size: 16 });
  card("ps1", 1790, 880, 240, 170, "disks", "Premium storage");
  group("sby", 2280, 400, 340, 700, "Azure Database for\nMySQL flexible\nserver (standby)", { fill: TINT.sub, align: "center" });
  card("my2", 2330, 620, 240, 160, "azure-database-mysql-server", "MySQL", { size: 16 });
  card("ps2", 2330, 880, 240, 170, "disks", "Premium storage");
  txt("rep-lbl", 2100, 800, "Locally redundant\nsynchronous\nreplication\nof data and logs", { size: 16 });

  arrow("a1", "inet", "right", 635, "afd", "left", 635);
  arrow("a2", "afd", "right", 640, "plan", "left", 640);
  arrow("a3", "as", "right", 850, "pep", "left", 850);
  arrow("a4", "pep", "right", 820, "pri", "left", 820);
  arrow("blobs", "as", "right", 880, "blob", "right", 215, [1080]);
  arrow("static", "blob", "left", 200, "afd", "top", 430, [], { dashed: true, color: "#868e96" });
  arrow("dnsl", "dns", "bottom", 1280, "vnet", "top", 1280, [], { dashed: true, color: "#868e96" });
  arrow("m1", "my1", "bottom", 1910, "ps1", "top", 1910);
  arrow("m2", "my2", "bottom", 2450, "ps2", "top", 2450);
  arrow("rep", "ps1", "right", 965, "ps2", "left", 965, [], { dashed: true, color: "#868e96" });

  txt("footer", 60, 1150, "Pencil-sketch redraw of the Azure Architecture Center diagram \"WordPress on App Service\"", { size: 20, color: "#495057" });
}
