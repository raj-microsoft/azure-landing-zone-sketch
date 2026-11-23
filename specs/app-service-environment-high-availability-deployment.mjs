// 022 High availability enterprise deployment that uses App Service Environment.
export const meta = {
  num: 22,
  slug: "app-service-environment-high-availability-deployment",
  title: "High availability enterprise deployment that uses App Service Environment",
  url: "https://learn.microsoft.com/azure/architecture/web-apps/app-service-environment/architectures/app-service-environment-high-availability-deployment",
  category: "Web",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Private API (API app)": "api-proxy", "Web app instance": "app-services", "Function instance": "function-apps", "Microsoft Entra ID": "entra-connect", "Jump box VM": "virtual-machine", "Private DNS zone": "dns-zones" },
  differences: [
    "Internet and GitHub Actions are plain shapes (no Azure icon).",
    "Each private endpoint row carries a short label; the original shows only icons.",
    "Diagonal arrows are drawn as orthogonal routes.",
  ],
};

export function draw(k) {
  const { TINT, txt, box, card, group, arrow, both, line } = k;
  txt("title", 60, 10, "High availability enterprise deployment with App Service Environment", { size: 30 });
  group("vnet", 570, 70, 1470, 1430, null, { fill: TINT.white, dashed: true, iconName: "virtual-networks" });
  txt("vnet-t", 1450, 1460, "Virtual network", { size: 18 });
  box("inet", 290, 450, 200, 120, "Internet", { fill: TINT.onprem, size: 20 });
  group("agsub", 620, 400, 240, 260, "Subnet", { fill: TINT.hub, iconName: "subnet", iconSize: 32 });
  card("appgw", 650, 460, 180, 160, "application-gateways", "Application\nGateway");
  group("asesub", 910, 100, 550, 890, "Subnet", { fill: TINT.app, iconName: "subnet", iconSize: 32, align: "center" });
  card("ase", 925, 400, 210, 240, "app-service-environments", "Zone-redundant App\nService Environment\nwith an internal\nload balancer", { size: 16 });
  const pool = (p, y, title, ic) => {
    group(p, 1150, y, 290, 250, title, { fill: TINT.white, dashed: true, align: "center" });
    card(`${p}-lb`, 1160, y + 50, 130, 180, "load-balancers", "Load\nBalancer");
    for (let i = 0; i < 3; i++) {
      box(`${p}-z${i + 1}`, 1300, y + 40 + i * 68, 130, 60, `Z${i + 1}`, { iconLeft: ic, size: 18 });
      arrow(`${p}-a${i + 1}`, `${p}-lb`, "right", y + 70 + i * 68, `${p}-z${i + 1}`, "left", y + 70 + i * 68);
    }
  };
  pool("web", 170, "Web app", "app-services");
  pool("api", 440, "Private API", "api-proxy");
  pool("fn", 710, "Function", "function-apps");

  group("fwsub", 1700, 240, 260, 280, "Subnet", { fill: TINT.warn, iconName: "subnet", iconSize: 32 });
  card("fw", 1730, 320, 200, 150, "firewalls", "Firewall");
  card("entra", 2090, 100, 220, 140, "entra-connect", "Microsoft Entra ID");
  card("out", 2090, 330, 220, 140, "outbound-connection", "Outbound traffic");

  group("pesub", 1700, 800, 260, 660, "Subnet", { fill: TINT.data, iconName: "subnet", iconSize: 32 });
  txt("pe-t", 1830, 1420, "Private endpoints", { size: 18, align: "center" });
  const svc = [["redis", "azure-managed-redis", "Azure Managed\nRedis"], ["sb", "azure-service-bus", "Service Bus"], ["cos", "azure-cosmos-db", "Azure Cosmos DB"], ["sql", "sql-database", "Azure SQL\nDatabase"], ["kv", "key-vaults", "Azure Key Vault"]];
  svc.forEach(([id, ic, lab], i) => {
    const y = 860 + i * 110;
    box(`pe-${id}`, 1720, y, 220, 90, "Private\nendpoint", { iconLeft: "private-endpoints", size: 16 });
    box(`dns-${id}`, 1490, y, 180, 90, "Private\nDNS zone", { iconLeft: "dns-zones", size: 16, fill: TINT.hub });
    box(id, 2090, y, 260, 90, lab, { iconLeft: ic, size: 18 });
    line(`l-dns-${id}`, `dns-${id}`, "right", y + 45, `pe-${id}`, "left", y + 45, [], { dashed: true });
    line(`l-pe-${id}`, `pe-${id}`, "right", y + 45, id, "left", y + 45);
  });

  group("jbsub", 1030, 1060, 260, 280, "Subnet", { fill: TINT.mg, iconName: "subnet", iconSize: 32 });
  card("jb", 1060, 1130, 200, 180, "virtual-machine", "Jump box virtual\nmachine");
  box("gha", 1060, 1560, 200, 100, "GitHub Actions", { fill: TINT.onprem, size: 20 });

  arrow("i-ag", "inet", "right", 510, "appgw", "left", 540, [580]);
  arrow("ag-ase", "appgw", "right", 540, "ase", "left", 520, [890]);
  arrow("ase-web", "ase", "right", 470, "web", "left", 300, [1142]);
  both("web-fw", "web", "right", 300, "fw", "left", 395, [1480]);
  arrow("fw-out", "fw", "right", 395, "out", "left", 400);
  both("web-pe", "web", "right", 390, "pesub", "top", 1830, [1470, 770]);
  arrow("gha-jb", "gha", "top", 1160, "jb", "bottom", 1160, [], { dashed: true });
  arrow("jb-ase", "jbsub", "top", 1160, "asesub", "bottom", 1160, [], { dashed: true });

  txt("footer", 60, 1700, "Pencil-sketch redraw of the Azure Architecture Center diagram \"High availability enterprise deployment that uses App Service Environment\"", { size: 20, color: "#495057" });
}
