// 148 Container orchestration for microservices.
export const meta = {
  num: 148,
  slug: "orchestration",
  title: "Container orchestration for microservices",
  url: "https://learn.microsoft.com/azure/architecture/microservices/design/orchestration",
  category: "Microservices",
  status: "done",
  otherDiagrams: ["img1: microservices cluster with container orchestrator scenarios (service layers, auto scale, unhealthy instance)"],
  substitutions: { "Application Gateway": "application-gateways", "Azure Kubernetes Service (AKS)": "kubernetes-services", "Node VM": "vm-scale-sets", "Orchestrator": "workload-orchestration" },
  differences: ["Users and DevOps drawn as labelled shapes; containers drawn as plain boxes like the original.", "The shared dashed orchestrator bus is drawn as three separate dashed connectors, one per node."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow } = k;
  const S = 16;
  box("users", 20, 40, 140, 70, "Users", { fill: TINT.onprem, size: S });
  card("agw", 60, 220, 180, 120, "application-gateways", "Application\nGateway", { size: S });
  group("clu", 300, 20, 1540, 640, null, { fill: TINT.sub });
  const node = (p, x, title, cs) => {
    group(p, x, 80, 400, 460, title, { fill: TINT.white });
    cs.forEach(([id, l, cx, cy]) => box(`${p}${id}`, x + cx, 130 + cy, 170, 120, l, { fill: TINT.white, size: S }));
    card(`${p}vm`, x + 230, 400, 150, 120, "vm-scale-sets", "Node VMs", { size: S });
  };
  node("n1", 340, "Node 1", [["rp", "Reverse Proxy\nContainer\nRP1", 20, 0], ["a", "Service A\nContainer\nA1", 210, 0], ["b", "Service B\nContainer\nB1", 20, 140]]);
  node("n2", 780, "Node 2", [["rp", "Reverse Proxy\nContainer\nRP2", 20, 0], ["a", "Service A\nContainer\nA2", 210, 0]]);
  node("n3", 1220, "Node 3", [["a", "Service A\nContainer\nA3", 20, 0], ["b", "Service B\nContainer\nB2", 20, 140]]);
  card("aks", 1650, 100, 170, 160, "kubernetes-services", "Azure Kubernetes\nService (AKS)", { size: S });
  card("orc", 1650, 440, 170, 160, "workload-orchestration", "Orchestrator", { size: S });
  txt("cap", 520, 680, "Web app in a multiple-container AKS cluster with an orchestrator", { size: 20 });
  box("devops", 1665, 740, 140, 70, "DevOps", { fill: TINT.onprem, size: S });
  arrow("u", "users", "bottom", 90, "agw", "top", 150, [], {});
  arrow("g", "agw", "right", 280, "clu", "left", 280, [], {});
  arrow("o1", "orc", "left", 580, "n1", "bottom", 520, [], { dashed: true, head: null });
  arrow("o2", "orc", "left", 590, "n2", "bottom", 960, [], { dashed: true, head: null });
  arrow("o3", "orc", "left", 570, "n3", "bottom", 1400, [], { dashed: true, head: null });
  arrow("d", "devops", "top", 1735, "orc", "bottom", 1735, [], {});
  txt("footer", 20, 860, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Conceptual view of a containerized microservices architecture\"", { size: 20, color: "#495057" });
}
