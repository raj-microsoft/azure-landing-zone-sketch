// 096 Enterprise deployment that uses App Service Environment.
export const meta = {
  num: 96,
  slug: "app-service-environment-standard-deployment",
  title: "Enterprise deployment that uses App Service Environment",
  url: "https://learn.microsoft.com/azure/architecture/web-apps/app-service-environment/architectures/app-service-environment-standard-deployment",
  category: "Web",
  status: "done",
  otherDiagrams: ["Multisite (zone-redundant) deployment (img1)"],
  substitutions: { "Internet": "globe-success", "App Service Environment ILB": "app-service-environments", "Web app": "app-services", "Private API": "api-connections", "Firewall": "firewalls", "Outbound traffic": "outbound-connection", "Microsoft Entra ID": "entra-connect", "Private endpoints": "private-endpoints", "Private DNS zones": "dns-zones", "Subnet NSG shield": "network-security-groups", "Jump box virtual machine": "virtual-machine" },
  differences: ["GitHub Actions is a labelled sketch shape (no logo).", "Diagonal ILB-to-web-app arrow is drawn orthogonally; small App Service plan glyphs beside each app are omitted."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, icon, arrow } = k;
  const S = 16;
  function subnet(id, x, y, w, h) {
    group(id, x, y, w, h, null, { fill: TINT.white });
    icon(`${id}-nsg`, "network-security-groups", x + 10, y + 10, 40);
    txt(`${id}-lbl`, x + w / 2 - 30, y + 18, "Subnet", { size: 18 });
  }
  txt("title", 40, 0, "Enterprise deployment with App Service Environment", { size: 28 });
  group("vnet", 500, 60, 1140, 1290, null, { fill: TINT.sub, dashed: true });
  icon("vnet-ico", "virtual-networks", 1580, 1360, 48);
  txt("vnet-lbl", 1420, 1370, "Virtual network", { size: 18 });
  card("inet", 60, 420, 180, 140, "globe-success", "Internet", { size: S });
  subnet("sag", 540, 350, 240, 260);
  card("ag", 560, 430, 200, 150, "application-gateways", "Application\nGateway", { size: S });
  subnet("sase", 820, 100, 470, 720);
  card("ilb", 840, 400, 160, 170, "app-service-environments", "App Service\nEnvironment\nILB", { size: S });
  group("webg", 1030, 170, 240, 190, null, { fill: TINT.white, dashed: true });
  card("web", 1045, 185, 210, 160, "app-services", "Web app", { size: S });
  group("apig", 1030, 390, 240, 190, null, { fill: TINT.white, dashed: true });
  card("api", 1045, 405, 210, 160, "api-connections", "Private API", { size: S });
  group("fng", 1030, 610, 240, 190, null, { fill: TINT.white, dashed: true });
  card("fn", 1045, 625, 210, 160, "function-apps", "Function", { size: S });
  subnet("sfw", 1340, 200, 240, 280);
  card("fw", 1360, 290, 200, 150, "firewalls", "Firewall", { size: S });
  card("entra", 1700, 60, 220, 140, "entra-connect", "Microsoft\nEntra ID", { size: S });
  card("out", 1700, 290, 220, 140, "outbound-connection", "Outbound\ntraffic", { size: S });
  subnet("spe", 1340, 720, 240, 600);
  txt("pe-lbl", 1380, 1295, "Private endpoints", { size: 16 });
  const rows = [["redis", "azure-managed-redis", "Azure Managed\nRedis"], ["sb", "azure-service-bus", "Service Bus"], ["cos", "azure-cosmos-db", "Azure Cosmos DB"], ["sql", "sql-database", "Azure SQL\nDatabase"], ["kv", "key-vaults", "Azure Key Vault"]];
  rows.forEach(([id, ic, lbl], i) => {
    const y = 850 + i * 90;
    box(`pe-${id}`, 1360, y, 200, 80, "Endpoint", { size: S, iconLeft: "private-endpoints" });
    box(`dns-${id}`, 1140, y, 160, 80, "DNS", { size: S, iconLeft: "dns-zones" });
    box(`svc-${id}`, 1700, y, 260, 80, lbl, { size: S, iconLeft: ic });
    arrow(`a-dns-${id}`, `dns-${id}`, "right", y + 40, `pe-${id}`, "left", y + 40, [], { dashed: true, head: null });
    arrow(`a-svc-${id}`, `pe-${id}`, "right", y + 40, `svc-${id}`, "left", y + 40, [], { head: null });
  });
  txt("dns-lbl", 1135, 1300, "Private DNS zones", { size: 16 });
  subnet("sjb", 880, 920, 230, 250);
  card("jb", 895, 1000, 200, 150, "virtual-machine", "Jump box virtual\nmachine", { size: S });
  box("gh", 905, 1420, 180, 100, "GitHub\nActions", { size: S, fill: TINT.onprem });
  arrow("a-in", "inet", "right", 490, "ag", "left", 490);
  arrow("a-ag", "ag", "right", 485, "ilb", "left", 485);
  arrow("a-web", "ilb", "top", 920, "webg", "left", 265);
  arrow("a-fw", "web", "right", 265, "fw", "left", 365, [1315], { tail: "arrow" });
  arrow("a-out", "fw", "right", 365, "out", "left", 365);
  arrow("a-gh", "gh", "top", 995, "jb", "bottom", 995, [], { dashed: true });
  arrow("a-jb", "sjb", "top", 995, "sase", "bottom", 995, [], { dashed: true });
  txt("footer", 40, 1560, "Pencil-sketch redraw of the Azure Architecture Center diagram \"App Service Environment reference architecture\"", { size: 20, color: "#495057" });
}
