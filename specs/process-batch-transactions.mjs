// 146 High-volume batch transaction processing.
export const meta = {
  num: 146,
  slug: "process-batch-transactions",
  title: "High-volume batch transaction processing",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/mainframe/process-batch-transactions",
  category: "Mainframe",
  status: "done",
  otherDiagrams: [],
  substitutions: { "ExpressRoute": "expressroute-circuits", "Azure Service Bus topics and queues": "azure-service-bus", "Peer virtual network": "virtual-network-gateways", "Azure load balancers": "load-balancers", "AKS queue cluster": "kubernetes-services", "Kubernetes node": "kubernetes-services", "Java App Services": "app-services", "Java Services / Contribution Java Classes": "code", "Accelerated networking": "network-interfaces", "Managed disk": "disks", "Azure Managed Redis": "azure-managed-redis", "Azure Cosmos DB": "azure-cosmos-db", "Azure Stream Analytics": "stream-analytics-jobs", "SQL Managed Instance": "sql-managed-instance", "Azure Log Analytics": "log-analytics-workspaces", "Azure Data Factory": "data-factories", "Azure geo-redundant storage account": "storage-accounts", "Azure Blob Storage": "blob-block", "Azure Files": "storage-azure-files", "Network security group": "network-security-groups" },
  differences: ["External input and Azure-based input users drawn as labelled shapes.", "Diagonal arrows to SQL MI, Log Analytics, Data Factory and from storage drawn orthogonally.", "Network security group badge drawn as a separate card beside the virtual network instead of on its corner."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, step } = k;
  const S = 16;
  box("onp-t", 20, 20, 180, 60, "On-premises", { fill: TINT.onprem, size: 20 });
  card("er", 40, 120, 180, 110, "expressroute-circuits", "ExpressRoute", { size: S });
  box("ext", 40, 400, 180, 70, "External\ninput/deeds", { fill: TINT.onprem, size: S });
  txt("az-l", 300, 20, "Azure", { size: 24 });
  card("sb", 760, 80, 220, 120, "azure-service-bus", "Azure Service Bus\ntopics and queues", { size: S });
  step("s1", 1000, 40, 1);
  box("ain", 1260, 20, 180, 70, "Azure-based\ninput", { fill: TINT.onprem, size: S });
  card("peer", 1250, 130, 200, 110, "virtual-network-gateways", "Peer virtual\nnetwork", { size: S });
  txt("bas-l", 420, 152, "Azure Bastion host\n(TLS over port 443)", { size: S });
  txt("web-l", 240, 240, "Web browsing\n(TLS over port 443)", { size: S });
  txt("deq", 1000, 230, "Messages dequeued by\ntopic and transaction type", { size: S });
  group("vnet", 300, 300, 1100, 1060, "Virtual network", { fill: TINT.sub, dashed: true, iconName: "virtual-networks" });
  const cl = (p, x, n) => {
    card(`${p}lb`, x + 60, 340, 200, 110, "load-balancers", "Azure load balancer", { size: S });
    card(`${p}aks`, x + 60, 490, 200, 110, "kubernetes-services", `AKS queue ${n}\ncluster ${n}`, { size: S });
    group(`${p}c`, x, 640, 440, 690, null, { fill: TINT.white });
    card(`${p}n`, x + 20, 660, 400, 110, "kubernetes-services", "Kubernetes node\nKubelet; Pod1, Pod2, Pod3...", { size: S });
    card(`${p}j`, x + 20, 790, 400, 110, "app-services", "Java App Services (JMS, Database\nconnectivity and Interoperability Services)", { size: S });
    card(`${p}s`, x + 20, 920, 400, 110, "code", "Java Services\nUnit of work, Transaction, Data", { size: S });
    card(`${p}cj`, x + 20, 1050, 400, 110, "code", "Contribution Java Classes\nJava App1, App2, App3", { size: S });
    card(`${p}an`, x + 20, 1190, 190, 120, "network-interfaces", "Accelerated\nnetworking", { size: S });
    card(`${p}md`, x + 230, 1190, 190, 120, "disks", "Managed disk", { size: S });
    arrow(`${p}a`, `${p}lb`, "bottom", x + 160, `${p}aks`, "top", x + 160, [], {});
  };
  cl("q1", 330, 1);
  cl("q2", 870, 2);
  step("s2", 820, 380, 2);
  step("s3", 790, 690, 3);
  step("s4", 790, 820, 4);
  step("s5", 790, 1000, 5);
  step("s6", 790, 1230, 6);
  group("data", 1560, 300, 420, 400, null, { fill: TINT.data, dashed: true });
  card("redis", 1590, 320, 360, 110, "azure-managed-redis", "Azure Managed Redis", { size: S });
  card("cos", 1590, 445, 360, 110, "azure-cosmos-db", "Azure Cosmos DB", { size: S });
  card("asa", 1590, 570, 360, 110, "stream-analytics-jobs", "Azure Stream Analytics\n(Parquet, Databricks, etc.)", { size: S });
  step("s7", 1470, 250, 7);
  txt("tr-l", 1420, 760, "Transition data\nRepository", { size: S });
  card("sqlmi", 1500, 880, 280, 110, "sql-managed-instance", "SQL Managed Instance", { size: S });
  card("law", 1500, 1020, 280, 110, "log-analytics-workspaces", "Azure Log Analytics", { size: S });
  step("s8", 1800, 1050, 8);
  card("adf", 1500, 1160, 280, 110, "data-factories", "Azure Data Factory", { size: S });
  card("nsg", 1820, 1300, 280, 90, "network-security-groups", "Network security group", { size: S });
  group("geo", 560, 1440, 460, 330, "Azure geo-redundant storage account", { fill: TINT.data, dashed: true, iconName: "storage-accounts" });
  step("s9", 1040, 1440, 9);
  card("blob", 600, 1510, 380, 100, "blob-block", "Azure Blob Storage", { size: S });
  card("files", 600, 1640, 380, 100, "storage-azure-files", "Azure Files", { size: S });
  arrow("x1", "er", "bottom", 130, "ext", "top", 130, [], { tail: "arrow" });
  arrow("x2", "sb", "left", 140, "er", "right", 175, [], {});
  arrow("x3", "ain", "bottom", 1350, "peer", "top", 1350, [], {});
  arrow("x4", "peer", "left", 185, "sb", "right", 185, [], {});
  arrow("x5", "sb", "bottom", 830, "q1lb", "top", 490, [270], {});
  arrow("x6", "sb", "bottom", 910, "q2lb", "top", 1030, [280], {});
  arrow("x7", "q2j", "right", 845, "data", "bottom", 1700, [], {});
  arrow("x8", "q2c", "right", 935, "sqlmi", "left", 935, [], {});
  arrow("x9", "q2c", "right", 1075, "law", "left", 1075, [], {});
  arrow("x10", "q2c", "right", 1215, "adf", "left", 1215, [], {});
  arrow("x11", "blob", "right", 1560, "adf", "bottom", 1600, [], {});
  arrow("x12", "files", "right", 1690, "adf", "bottom", 1700, [], {});
  txt("footer", 20, 1820, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Architecture implemented by using AKS and Service Bus\"", { size: 20, color: "#495057" });
}
