// 143 Optimize administration of SQL Server instances using Azure Arc.
export const meta = {
  num: 143,
  slug: "azure-arc-sql-server",
  title: "Optimize administration of SQL Server instances in on-premises and multicloud environments using Azure Arc",
  url: "https://learn.microsoft.com/azure/architecture/hybrid/azure-arc-sql-server",
  category: "Hybrid",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Azure Arc": "azure-arc", "Virtual server": "virtual-machine", "SQL Server": "sql-server", "Kubernetes cluster": "arc-kubernetes", "Azure Arc data controller": "arc-data-services", "SQL Managed Instance": "arc-sql-managed-instance", "Azure Local": "azure-local", "Azure Kubernetes Service cluster": "kubernetes-services", "SQL Virtual Machine": "azure-sql-vm", "Azure Policy": "policy", "Azure Security Center": "microsoft-defender-for-cloud", "Azure Monitor": "monitor", "Log Analytics workspace": "log-analytics-workspaces", "Azure Sentinel": "azure-sentinel" },
  differences: ["Physical server drawn as a labelled shape; the 'Other cloud providers' cloud outline drawn as a rounded group."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow } = k;
  const S = 16;
  const W = 150, H = 120;
  group("onp", 20, 40, 1040, 820, null, { fill: TINT.onprem, dashed: true });
  txt("onp-l", 460, 0, "On-premises", { size: 20 });
  group("r1", 50, 70, 980, 320, null, { fill: TINT.white, dashed: true });
  card("arc1", 80, 160, W, H, "azure-arc", "Azure Arc", { size: S });
  card("vs", 450, 90, W, H, "virtual-machine", "Virtual server", { size: S });
  box("ps", 450, 250, W, 90, "Physical server", { fill: TINT.onprem, size: S });
  card("sql1", 800, 90, W, H, "sql-server", "SQL Server", { size: S });
  card("sql2", 800, 240, W, H, "sql-server", "SQL Server", { size: S });
  group("r2", 50, 420, 980, 180, null, { fill: TINT.white, dashed: true });
  card("arc2", 80, 445, W, 130, "azure-arc", "Azure Arc", { size: S });
  card("k1", 320, 445, W, 130, "arc-kubernetes", "Kubernetes\ncluster", { size: S });
  card("dc1", 560, 445, W, 130, "arc-data-services", "Azure Arc data\ncontroller", { size: S });
  card("mi1", 800, 445, W, 130, "arc-sql-managed-instance", "SQL Managed\nInstance", { size: S });
  card("arc3", 50, 660, W, 130, "azure-arc", "Azure Arc", { size: S });
  card("loc", 240, 660, W, 130, "azure-local", "Azure Local", { size: S });
  group("r3", 420, 630, 610, 200, null, { fill: TINT.white, dashed: true });
  card("aks", 440, 660, 170, 140, "kubernetes-services", "Azure Kubernetes\nService cluster", { size: S });
  card("dc2", 640, 660, W, 140, "arc-data-services", "Azure Arc data\ncontroller", { size: S });
  card("mi2", 850, 660, W, 140, "arc-sql-managed-instance", "SQL Managed\nInstance", { size: S });
  group("oc", 20, 960, 1040, 520, null, { fill: TINT.sub });
  txt("oc-l", 400, 920, "Other cloud providers", { size: 20 });
  group("c1", 300, 990, 480, 180, null, { fill: TINT.white, dashed: true });
  card("arc4", 330, 1010, W, H, "azure-arc", "Azure Arc", { size: S });
  card("sqlvm", 590, 1010, W, H, "azure-sql-vm", "SQL Virtual\nMachine", { size: S });
  group("c2", 50, 1220, 980, 200, null, { fill: TINT.white, dashed: true });
  card("arc5", 80, 1250, W, 140, "azure-arc", "Azure Arc", { size: S });
  card("k2", 320, 1250, W, 140, "arc-kubernetes", "Kubernetes\ncluster", { size: S });
  card("dc3", 560, 1250, W, 140, "arc-data-services", "Azure Arc data\ncontroller", { size: S });
  card("mi3", 800, 1250, W, 140, "arc-sql-managed-instance", "SQL Managed\nInstance", { size: S });
  group("az", 1260, 560, 820, 640, null, { fill: TINT.hub, dashed: true });
  txt("az-l", 1630, 520, "Azure", { size: 20 });
  card("arcz", 1590, 590, 170, H, "azure-arc", "Azure Arc", { size: S });
  card("pol", 1300, 790, 180, H, "policy", "Azure Policy", { size: S });
  card("sc", 1300, 960, 180, 130, "microsoft-defender-for-cloud", "Azure Security\nCenter", { size: S });
  group("mg", 1560, 760, 230, 400, null, { fill: TINT.white, dashed: true });
  card("mon", 1585, 790, 180, H, "monitor", "Azure Monitor", { size: S });
  card("law", 1585, 960, 180, 140, "log-analytics-workspaces", "Log Analytics\nworkspace", { size: S });
  card("sen", 1860, 960, 190, H, "azure-sentinel", "Azure Sentinel", { size: S });
  arrow("a1", "arc1", "right", 220, "vs", "left", 150, [340], {});
  arrow("a2", "arc1", "right", 240, "ps", "left", 295, [360], {});
  arrow("a3", "vs", "right", 150, "sql1", "left", 150, [], {});
  arrow("a4", "ps", "right", 295, "sql2", "left", 295, [], {});
  arrow("b1", "arc2", "right", 510, "k1", "left", 510, [], {});
  arrow("b2", "k1", "right", 510, "dc1", "left", 510, [], {});
  arrow("b3", "dc1", "right", 510, "mi1", "left", 510, [], {});
  arrow("c1a", "arc3", "right", 725, "loc", "left", 725, [], {});
  arrow("c2a", "loc", "right", 725, "r3", "left", 725, [], {});
  arrow("c3a", "aks", "right", 730, "dc2", "left", 730, [], {});
  arrow("c4a", "dc2", "right", 730, "mi2", "left", 730, [], {});
  arrow("d1", "arc4", "right", 1070, "sqlvm", "left", 1070, [], {});
  arrow("e1", "arc5", "right", 1320, "k2", "left", 1320, [], {});
  arrow("e2", "k2", "right", 1320, "dc3", "left", 1320, [], {});
  arrow("e3", "dc3", "right", 1320, "mi3", "left", 1320, [], {});
  arrow("z1", "sc", "right", 1030, "law", "left", 1030, [], {});
  arrow("z2", "law", "right", 1030, "sen", "left", 1030, [], { tail: "arrow" });
  arrow("x1", "onp", "right", 300, "az", "left", 640, [1160], { tail: "arrow" });
  arrow("x2", "oc", "right", 1300, "az", "left", 1000, [1160], { tail: "arrow" });
  txt("footer", 20, 1520, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Azure Arc scenarios for SQL Server administration\"", { size: 20, color: "#495057" });
}
