// 090 Azure Arc hybrid management and deployment for Kubernetes clusters.
export const meta = {
  num: 90,
  slug: "arc-hybrid-kubernetes",
  title: "Azure Arc hybrid management and deployment for Kubernetes clusters",
  url: "https://learn.microsoft.com/azure/architecture/hybrid/arc-hybrid-kubernetes",
  category: "Hybrid + multicloud",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Azure Arc-enabled Kubernetes cluster": "arc-kubernetes", "Azure Monitor": "monitor", "Azure Policy": "policy", "Azure Kubernetes Service cluster": "kubernetes-services" },
  differences: ["The shared Monitor and Policy trunk lines are drawn as separate parallel arrows, one per target cluster."],
};

export function draw(k) {
  const { TINT, txt, card, group, arrow, both } = k;
  const M = { size: 18 };
  txt("title", 40, 10, "Azure Arc hybrid management for Kubernetes", { size: 30 });
  txt("onp-t", 360, 70, "On-premises", { size: 26, align: "center" });
  group("onp", 100, 120, 520, 900, null, { dashed: true, fill: TINT.white });
  txt("az-t", 1020, 70, "Azure", { size: 26, align: "center" });
  group("az", 760, 120, 520, 900, null, { dashed: true, fill: TINT.mg, stroke: "#1971c2" });
  card("arc1", 250, 300, 260, 180, "arc-kubernetes", "Azure Arc-enabled\nKubernetes cluster", M);
  card("arc2", 250, 700, 260, 180, "arc-kubernetes", "Azure Arc-enabled\nKubernetes cluster", M);
  card("mon", 900, 170, 240, 160, "monitor", "Azure\nMonitor", M);
  card("pol", 900, 380, 240, 160, "policy", "Azure\nPolicy", M);
  card("aks1", 900, 600, 240, 160, "kubernetes-services", "Azure Kubernetes\nService cluster", M);
  card("aks2", 900, 820, 240, 160, "kubernetes-services", "Azure Kubernetes\nService cluster", M);
  arrow("m1", "mon", "left", 250, "arc1", "left", 390, [150]);
  arrow("m2", "mon", "left", 270, "arc2", "left", 790, [170]);
  arrow("p1", "pol", "left", 460, "arc1", "right", 390, [560]);
  arrow("p2", "pol", "left", 480, "arc2", "right", 790, [580]);
  arrow("p3", "pol", "left", 420, "aks1", "left", 680, [860]);
  arrow("p4", "pol", "left", 440, "aks2", "left", 900, [840]);
  both("k1", "aks1", "right", 680, "mon", "right", 250, [1200]);
  both("k2", "aks2", "right", 900, "mon", "right", 280, [1220]);
  txt("footer", 40, 1060, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Azure Arc for Kubernetes topology\"", { size: 20, color: "#495057" });
}
