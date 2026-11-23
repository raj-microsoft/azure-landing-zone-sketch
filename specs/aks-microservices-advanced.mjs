// 073 Advanced AKS microservices architecture.
export const meta = {
  num: 73,
  slug: "aks-microservices-advanced",
  title: "Advanced Azure Kubernetes Service (AKS) microservices architecture",
  url: "https://learn.microsoft.com/azure/architecture/reference-architectures/containers/aks-microservices/aks-microservices-advanced",
  category: "Containers",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Azure Application Gateway with WAF": "application-gateways", "Azure Kubernetes Service": "kubernetes-services", "Pods (Ingestion, Workflow, Scheduler, Package, Delivery, Node-managed identity, Secrets Store CSI Driver, Kubelet)": "container-instances", "Kubernetes services": "load-balancers", "Advanced Container Networking Services": "aks-network-policy", "Azure Bastion": "bastions", "Azure Firewall": "firewalls", "Route": "route-tables", "Azure Cosmos DB": "azure-cosmos-db", "Azure DocumentDB": "azure-documentdb", "Azure Service Bus": "azure-service-bus", "Azure Managed Redis": "azure-managed-redis", "Azure Monitor": "monitor", "Azure Cloud Services": "cloud-services-classic", "Key Vault": "key-vaults", "Container Registry": "container-registries" },
  differences: ["Public internet, Gateway API proxy (NGINX), Flux, Azure CNI powered by Cilium and FQDNs are plain sketch shapes (no sketch icon or non-Azure logo).", "Port numbers are folded into the service captions; private endpoint glyphs and the green allow tick are omitted."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, line, both, step, icon } = k;
  txt("title", 40, 10, "Advanced AKS microservices architecture", { size: 30 });

  box("inet", 40, 545, 180, 110, "Public\ninternet", { fill: TINT.mg, size: 18 });

  group("spoke", 260, 140, 1500, 1560, null, { fill: TINT.white, dashed: true, stroke: "#1971c2" });
  txt("spoke-lbl", 290, 152, "SPOKE", { size: 20 });
  group("agws", 300, 440, 320, 320, "Subnet", { fill: TINT.sub, align: "center" });
  card("agw", 330, 500, 260, 200, "application-gateways", "Azure Application\nGateway with WAF");
  step("s1", 440, 800, 1);
  arrow("in-agw", "inet", "right", 600, "agw", "left", 600, [], { dashed: true });

  group("aksnet", 680, 180, 1040, 1460, null, { fill: TINT.sub });
  txt("aksnet-lbl", 1150, 192, "Subnet", { size: 18 });
  group("aks", 710, 240, 980, 1250, "Azure Kubernetes Service (AKS)", { fill: TINT.white, dashed: true, stroke: "#868e96", iconName: "kubernetes-services" });
  group("pool", 730, 320, 940, 700, "User node pool", { fill: "#f1f3f5", stroke: "#868e96" });
  box("gwapi", 750, 560, 180, 90, "Gateway API\nproxy", { fill: TINT.mg, size: 16 });
  arrow("agw-gw", "agw", "right", 600, "gwapi", "left", 600, [], { dashed: true });

  card("ing1", 1180, 350, 160, 130, "container-instances", "Ingestion", { size: 16 });
  card("acns", 1380, 350, 220, 150, "aks-network-policy", "Advanced Container\nNetworking Services", { size: 16 });
  card("isvc", 990, 520, 160, 130, "load-balancers", "Ingestion", { size: 16 });
  card("wf", 1180, 520, 160, 130, "container-instances", "Workflow", { size: 16 });
  step("s3", 990, 450, 3);
  arrow("gi", "gwapi", "right", 590, "ing1", "left", 390, [960], { dashed: true, color: "#1971c2" });
  line("l1", "isvc", "top", 1070, "ing1", "left", 440, [], { dashed: true, color: "#e8590c" });

  icon("sv1", "load-balancers", 1038, 700, 64);
  icon("sv2", "load-balancers", 1228, 700, 64);
  icon("sv3", "load-balancers", 1418, 700, 64);
  arrow("w1", "wf", "bottom", 1230, "sv1", "top", null, [675], { dashed: true });
  arrow("w2", "wf", "bottom", 1260, "sv2", "top", null, [], { dashed: true });
  arrow("w3", "wf", "bottom", 1290, "sv3", "top", null, [675], { dashed: true });
  card("sched", 990, 840, 160, 130, "container-instances", "Scheduler", { size: 16 });
  card("pkg", 1180, 840, 160, 130, "container-instances", "Package", { size: 16 });
  card("dlv", 1370, 840, 160, 130, "container-instances", "Delivery", { size: 16 });
  arrow("gs", "gwapi", "bottom", 840, "sched", "left", 905, [], { dashed: true, color: "#1971c2" });
  line("o1", "sv1", "bottom", null, "sched", "top", null, [], { dashed: true, color: "#e8590c" });
  line("o2", "sv2", "bottom", null, "pkg", "top", null, [], { dashed: true, color: "#e8590c" });
  line("o3", "sv3", "bottom", null, "dlv", "top", null, [], { dashed: true, color: "#e8590c" });
  step("s4", 1560, 880, 4);

  group("sys", 730, 1050, 940, 270, "System node pool", { fill: "#f1f3f5", stroke: "#868e96" });
  card("secrets", 760, 1110, 220, 170, "container-instances", "Secrets Store\nCSI Driver", { size: 16 });
  box("nmi", 1380, 1080, 260, 100, "Node-managed\nidentity", { iconLeft: "container-instances", size: 16 });
  box("flux", 1380, 1200, 260, 90, "Flux", { fill: TINT.mg, size: 18 });
  box("kubelet", 1380, 1350, 260, 100, "Kubelet", { iconLeft: "container-instances", size: 18 });
  box("cni", 1060, 1520, 320, 90, "Azure CNI powered\nby Cilium", { fill: TINT.mg, size: 16 });
  arrow("ak-cni", "aks", "bottom", 1000, "cni", "left", 1565, [], { dashed: true });

  card("kv", 760, 1780, 200, 170, "key-vaults", "Key Vault");
  card("acr", 1120, 1780, 200, 170, "container-registries", "Container\nRegistry");
  arrow("sec-kv", "secrets", "bottom", 860, "kv", "top", 860, [], { dashed: true });
  line("cni-acr", "cni", "bottom", 1220, "acr", "top", 1220, [], { dashed: true });

  group("hub", 1920, 140, 560, 1340, null, { fill: TINT.white, dashed: true, stroke: "#1971c2" });
  txt("hub-lbl", 1940, 152, "HUB", { size: 20 });
  group("bass", 1960, 200, 480, 320, "Subnet", { fill: TINT.sub, align: "center" });
  card("bas", 2010, 260, 380, 220, "bastions", "Azure Bastion");
  group("fws", 1960, 580, 480, 860, "Subnet", { fill: TINT.sub, align: "center" });
  card("fw", 2010, 660, 380, 300, "firewalls", "Azure\nFirewall");
  box("route", 2220, 1340, 200, 80, "Route", { iconLeft: "route-tables", size: 18 });

  both("peer", "spoke", "top", 900, "hub", "top", 2200, [90]);
  txt("peer-lbl", 1480, 50, "Peering", { size: 18 });

  arrow("acns-fw", "acns", "right", 425, "fw", "left", 700, [1840], { dashed: true });
  txt("obs-lbl", 1770, 250, "L4-L7 pod level\nobservability\nand security", { size: 16 });
  arrow("wf-fw", "wf", "right", 560, "fw", "left", 800, [1820], { dashed: true });
  arrow("pool-fw", "pool", "right", 950, "fw", "left", 880, [1800], { dashed: true });
  arrow("nmi-fw", "nmi", "right", 1130, "fw", "bottom", 2080, [], { dashed: true });
  arrow("flux-fw", "flux", "right", 1245, "fw", "bottom", 2120, [], { dashed: true });
  arrow("kub-fw", "kubelet", "right", 1400, "fw", "bottom", 2160, [], { dashed: true });

  const G = { dashed: true, color: "#2f9e44" };
  card("cosmos", 2700, 140, 280, 200, "azure-cosmos-db", "Azure Cosmos DB\n:443", { size: 16 });
  card("docdb", 2700, 370, 280, 200, "azure-documentdb", "Azure DocumentDB\n:10255", { size: 16 });
  card("sb", 2700, 600, 280, 200, "azure-service-bus", "Azure Service Bus\n:5671", { size: 16 });
  card("redis", 2700, 830, 280, 200, "azure-managed-redis", "Azure Managed Redis\n:6380", { size: 16 });
  card("mon", 2700, 1060, 280, 200, "monitor", "Azure Monitor\n:443", { size: 16 });
  card("cloud", 2700, 1290, 280, 200, "cloud-services-classic", "Azure Cloud Services\nKubernetes API server\n:443, 22, 9000", { size: 16 });
  box("fqdn", 2700, 1540, 280, 200, "FQDNs :443\nmcr.microsoft.com,\nlogin.microsoftonline.com", { fill: TINT.mg, size: 16, type: "ellipse" });
  arrow("f1", "fw", "right", 690, "cosmos", "left", 240, [2500], G);
  arrow("f2", "fw", "right", 730, "docdb", "left", 470, [2520], G);
  arrow("f3", "fw", "right", 770, "sb", "left", 700, [2540], G);
  arrow("f4", "fw", "right", 810, "redis", "left", 930, [2620], G);
  arrow("f5", "fw", "right", 850, "mon", "left", 1160, [2600], G);
  arrow("f6", "fw", "right", 890, "cloud", "left", 1390, [2580], G);
  arrow("f7", "fw", "right", 930, "fqdn", "left", 1640, [2560], G);
  step("s2", 2650, 620, 2);
  step("s5", 2650, 850, 5);

  txt("footer", 40, 2010, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Advanced AKS microservices architecture\"", { size: 20, color: "#495057" });
}
