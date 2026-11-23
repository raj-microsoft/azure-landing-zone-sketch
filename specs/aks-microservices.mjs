// 086 Microservices architecture on Azure Kubernetes Service.
export const meta = {
  num: 86,
  slug: "aks-microservices",
  title: "Microservices architecture on Azure Kubernetes Service",
  url: "https://learn.microsoft.com/azure/architecture/reference-architectures/containers/aks-microservices/aks-microservices",
  category: "Containers + microservices",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Client apps": "client-apps", "Public IP address": "public-ip-addresses", "Azure Load Balancer": "load-balancers", "Azure Kubernetes Service / Kubernetes cluster": "kubernetes-services", "microservice1-5": "container-instances", "Azure Pipelines": "azure-devops", "Azure Container Registry": "container-registries", "Managed identities": "entra-managed-identities", "Microsoft Entra ID": "entra-connect", "Azure Monitor": "monitor" },
  differences: ["Ingress (NGINX), Helm and Azure CNI powered by Cilium are plain labelled shapes, not logos.", "Public IP address and Azure Load Balancer are drawn as two adjacent cards on the client path."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, step } = k;
  const M = { size: 16 };
  txt("title", 40, 10, "Microservices architecture on AKS", { size: 30 });
  card("client", 60, 300, 180, 150, "client-apps", "Client apps", M);
  card("pip", 300, 300, 170, 150, "public-ip-addresses", "Public IP\naddress", M);
  card("lb", 500, 300, 180, 150, "load-balancers", "Azure Load\nBalancer", M);
  arrow("a-c", "client", "right", 375, "pip", "left", 375);
  arrow("a-p", "pip", "right", 375, "lb", "left", 375);

  box("aks-h", 940, 70, 420, 90, "Azure Kubernetes Service", { iconLeft: "kubernetes-services", size: 20, fill: "transparent" });
  group("aks", 760, 180, 1300, 680, null, { dashed: true, fill: TINT.sub, stroke: "#1971c2" });
  group("clu", 790, 200, 1240, 520, null, { fill: TINT.white });
  group("fe", 810, 220, 260, 420, "Front end", { align: "center" });
  box("ing", 840, 320, 200, 100, "Ingress\n(NGINX)", { size: 16, fill: TINT.app });
  txt("fe-ns", 830, 590, "Namespace", { size: 16 });
  group("be", 1110, 220, 900, 420, "Back end", { align: "center" });
  card("ms1", 1140, 300, 180, 140, "container-instances", "microservice1", M);
  card("ms2", 1380, 300, 180, 140, "container-instances", "microservice2", M);
  card("ms3", 1720, 270, 180, 110, "container-instances", "microservice3", M);
  card("ms4", 1720, 390, 180, 110, "container-instances", "microservice4", M);
  card("ms5", 1720, 510, 180, 110, "container-instances", "microservice5", M);
  txt("be-ns", 1130, 590, "Namespace", { size: 16 });
  box("kc", 810, 650, 320, 60, "Kubernetes cluster", { iconLeft: "kubernetes-services", size: 16, fill: "transparent" });
  arrow("a-lb", "lb", "right", 375, "aks", "left", 375);
  arrow("a-i", "ing", "right", 370, "ms1", "left", 370);
  arrow("a-12", "ms1", "right", 370, "ms2", "left", 370);
  arrow("a-23", "ms2", "right", 340, "ms3", "left", 325, [1640]);
  arrow("a-24", "ms2", "right", 370, "ms4", "left", 445, [1660]);
  arrow("a-25", "ms2", "right", 400, "ms5", "left", 565, [1620]);
  box("cni", 1180, 760, 300, 70, "Azure CNI powered\nby Cilium", { size: 16, fill: TINT.app });
  card("mi", 1600, 735, 200, 115, "entra-managed-identities", "Managed\nidentities", M);
  card("vnet", 1830, 735, 200, 115, "virtual-networks", "Virtual network", M);
  arrow("a-cni", "clu", "bottom", 1150, "cni", "left", 795, [795], { dashed: true });

  group("devops", 60, 560, 220, 300, "CI/CD", { align: "center" });
  card("pipe", 80, 620, 180, 170, "azure-devops", "Azure\nPipelines", M);
  txt("devops-lbl", 120, 870, "DevOps", { size: 18, color: "#495057" });
  box("helm", 330, 560, 130, 60, "Helm", { size: 18, fill: TINT.app });
  arrow("a-helm", "helm", "right", 590, "aks", "left", 590, [], { dashed: true });
  card("acr", 420, 720, 200, 170, "container-registries", "Azure Container\nRegistry", M);
  arrow("a-push", "devops", "right", 805, "acr", "left", 805, [], { dashed: true });
  txt("push-lbl", 300, 820, "Image\npush", { size: 16 });
  arrow("a-pull", "aks", "left", 805, "acr", "right", 805, [], { dashed: true });
  txt("pull-lbl", 650, 820, "Image\npull", { size: 16 });

  const mon = [["entra", "entra-connect", "Microsoft\nEntra ID", 840], ["law", "log-analytics-workspaces", "Log Analytics\nworkspace", 1080], ["ai", "application-insights", "Application\nInsights", 1320], ["kv", "key-vaults", "Azure\nKey Vault", 1600], ["mon", "monitor", "Azure\nMonitor", 1830]];
  for (const [id, ic, l, x] of mon) card(id, x, 990, 200, 160, ic, l, M);
  arrow("a-rbac", "aks", "bottom", 800, "entra", "left", 1070, [1070]);
  txt("rbac-lbl", 820, 880, "Role-based\naccess control", { size: 16 });
  arrow("a-kv", "mi", "bottom", 1700, "kv", "top", 1700);

  txt("ext-lbl", 2240, 70, "External data stores", { size: 20, align: "center" });
  card("ddb", 2130, 120, 220, 150, "azure-documentdb", "Azure DocumentDB", M);
  card("cos", 2130, 300, 220, 150, "azure-cosmos-db", "Azure Cosmos DB", M);
  card("redis", 2130, 480, 220, 150, "azure-managed-redis", "Azure Managed Redis", M);
  card("sb", 2130, 660, 220, 150, "azure-service-bus", "Azure Service Bus", M);
  txt("footer", 40, 1190, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Microservices architecture on AKS\"", { size: 20, color: "#495057" });
}
