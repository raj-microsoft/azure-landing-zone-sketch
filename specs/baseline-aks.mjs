// 062 Baseline architecture for an AKS cluster.
export const meta = {
  num: 62,
  slug: "baseline-aks",
  title: "Baseline architecture for an Azure Kubernetes Service (AKS) cluster",
  url: "https://learn.microsoft.com/azure/architecture/reference-architectures/containers/aks/baseline-aks",
  category: "Containers",
  status: "done",
  otherDiagrams: ["AKS hub-and-spoke network topology", "Cluster traffic flow", "TLS termination", "Workload CI/CD", "GitOps flow"],
  substitutions: { "Via native client": "users", "Azure Bastion": "bastions", "Azure Firewall": "firewalls", "Gateway subnet": "virtual-network-gateways", "Private Link endpoints": "private-link", "Internal load balancer": "load-balancers", "Application Gateway": "application-gateways", "Key Vault": "key-vaults", "Container Registry": "container-registries", "AKS cluster": "kubernetes-services", "Pods (CoreDNS, metric-server, Traefik, workload)": "container-instances", "Azure Monitor workspace": "monitor", "Metrics": "metrics", "Log Analytics": "log-analytics-workspaces", "Health Model": "monitor-health-models" },
  differences: ["On-premises network, remote office spoke, Internet and Managed Prometheus are plain sketch shapes (no sketch icon).", "Per-subnet NSG shields and peering glyphs are omitted; peering is shown as labelled dotted arrows."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, both, step } = k;
  txt("title", 40, 10, "Baseline architecture for an AKS cluster", { size: 30 });

  card("user", 40, 250, 200, 180, "users", "Via native\nclient");
  txt("bt-lbl", 250, 250, "Azure Bastion tunnel\nkubectl", { size: 16 });

  group("hub", 470, 110, 1120, 520, null, { fill: TINT.white, dashed: true, stroke: "#1971c2" });
  txt("hub-lbl", 1230, 122, "Hub virtual network", { size: 18 });
  card("bas", 520, 180, 300, 260, "bastions", "Azure Bastion subnet\n(Management)");
  card("fw", 880, 180, 300, 260, "firewalls", "Azure Firewall subnet\n(Outbound)");
  card("gw", 1240, 180, 300, 260, "virtual-network-gateways", "Gateway subnet\n(To on-premises)");
  arrow("u-bas", "user", "right", 330, "bas", "left", 330);

  box("onp", 1850, 200, 260, 200, "On-premises\nnetwork", { fill: TINT.mg, size: 18 });
  arrow("onp-gw", "onp", "left", 310, "gw", "right", 310);
  box("remote", 2150, 600, 260, 180, "Spoke\n(Remote office)", { fill: TINT.mg, size: 18 });

  group("spoke", 470, 800, 1460, 1060, null, { fill: TINT.white, dashed: true, stroke: "#1971c2" });
  txt("spoke-lbl", 1560, 812, "Spoke virtual network", { size: 18 });
  card("pl", 520, 870, 310, 260, "private-link", "Private Link\nendpoints subnet");
  card("api", 880, 870, 310, 260, "load-balancers", "API server VNet integration\ndelegated subnet:\ninternal load balancer", { size: 16 });
  card("ing", 1240, 870, 310, 260, "load-balancers", "Ingress resources subnet:\ninternal load balancer", { size: 16 });
  card("agw", 1600, 870, 310, 260, "application-gateways", "Application Gateway\nsubnet");

  both("peer1", "hub", "bottom", 720, "spoke", "top", 720, [], { dashed: true });
  txt("peer1-lbl", 500, 660, "Virtual network\npeering", { size: 16 });
  both("peer2", "hub", "bottom", 1300, "remote", "left", 690, [690], { dashed: true });
  txt("peer2-lbl", 1700, 640, "Virtual network peering", { size: 16 });
  arrow("pip", "bas", "right", 400, "api", "left", 1000, [850, 1000]);
  txt("pip-lbl", 870, 660, "Private IP address", { size: 16 });

  card("kv", 40, 860, 240, 200, "key-vaults", "Key Vault");
  card("acr", 40, 1110, 240, 200, "container-registries", "Container\nRegistry");
  arrow("kv-pl", "kv", "right", 960, "pl", "left", 960);
  arrow("acr-pl", "acr", "right", 1210, "pl", "left", 1060, [400]);

  box("inet", 2150, 930, 240, 140, "Internet", { fill: TINT.mg, size: 18 });
  arrow("inet-agw", "inet", "left", 1000, "agw", "right", 1000);

  group("csub", 520, 1190, 1380, 640, "Cluster nodes subnet", { fill: TINT.white, size: 18, align: "center" });
  group("aks", 550, 1250, 1320, 550, "Azure Kubernetes Service (AKS) cluster", { fill: TINT.sub, iconName: "kubernetes-services" });
  group("sys", 590, 1340, 600, 420, "System node pool", { fill: TINT.white, dashed: true, stroke: "#868e96" });
  box("coredns", 860, 1420, 290, 100, "CoreDNS", { iconLeft: "container-instances", size: 18 });
  box("metric", 860, 1590, 290, 100, "metric-server", { iconLeft: "container-instances", size: 18 });
  group("usr", 1230, 1340, 600, 420, "User node pool", { fill: TINT.white, dashed: true, stroke: "#868e96" });
  box("traefik", 1500, 1420, 290, 100, "Traefik ingress\ncontroller", { iconLeft: "container-instances", size: 18 });
  box("workload", 1500, 1590, 290, 100, "Workload", { iconLeft: "container-instances", size: 18 });

  group("mon", 1990, 1200, 620, 660, "Azure Monitor workspace", { fill: TINT.white, dashed: true, stroke: "#1971c2", iconName: "monitor" });
  card("metrics", 2030, 1300, 250, 220, "metrics", "Metrics");
  card("la", 2320, 1300, 250, 220, "log-analytics-workspaces", "Log Analytics");
  box("prom", 2030, 1580, 250, 220, "Managed\nPrometheus", { fill: TINT.mg, size: 18 });
  card("health", 2320, 1580, 250, 220, "monitor-health-models", "Health Model");
  arrow("csub-mon", "csub", "right", 1520, "mon", "left", 1520);

  txt("footer", 40, 1920, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Baseline architecture for an AKS cluster\"", { size: 20, color: "#495057" });
}
