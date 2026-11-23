// 031 AKS baseline for multiregion clusters.
export const meta = {
  num: 31,
  slug: "aks-multi-cluster",
  title: "AKS baseline for multiregion clusters",
  url: "https://learn.microsoft.com/azure/architecture/reference-architectures/containers/aks-multi-region/aks-multi-cluster",
  category: "Containers",
  status: "done",
  otherDiagrams: ["Workload traffic in a multiregion deployment", "Container Registry replicas (portal screenshot)"],
  substitutions: { "Kubernetes services / fleet hub cluster": "kubernetes-services", "Azure Kubernetes Fleet Manager": "kubernetes-fleet-manager", "Log Analytics": "log-analytics-workspaces", "Azure Front Door": "front-door-and-cdn-profiles" },
  differences: [
    "Incoming internet traffic to Front Door is drawn from a small 'Internet' shape; the original shows an unlabelled arrow.",
    "Private endpoint and NSG badges on the cards are omitted.",
    "The grey diagnostics lines in Region A are merged into two lines.",
  ],
};

export function draw(k) {
  const { TINT, txt, box, card, group, arrow } = k;
  const G = { dashed: true, color: "#2f9e44" }, R = { dashed: true, color: "#e03131" }, P = { dashed: true, color: "#7048e8" }, Y = { dashed: true, color: "#e8a33d" };
  const VN = { fill: TINT.white, dashed: true, stroke: "#1971c2" };
  txt("title", 60, 10, "AKS baseline for multiregion clusters", { size: 30 });

  group("ra", 90, 100, 1820, 460, "Region A", { fill: "#f8f0f0", size: 22 });
  group("rb", 90, 590, 1820, 790, "Region B", { fill: TINT.warn, size: 22 });
  group("shared", 1970, 200, 270, 1000, null, { fill: TINT.white, dashed: true });
  txt("shared-lbl", 1980, 150, "Shared resources", { size: 20 });

  for (const [r, dy] of [["a", 0], ["b", 480]]) {
    card(`la${r}`, 120, 190 + dy, 220, 170, "log-analytics-workspaces", "Log Analytics\n(regional)");
    txt(`hub${r}-lbl`, 430, 140 + dy, "Hub network (regional)", { size: 20 });
    group(`hub${r}`, 370, 180 + dy, 440, 250, null, VN);
    txt(`sub${r}-lbl`, 550, 190 + dy, "Subnets", { size: 16 });
    card(`bas${r}`, 400, 230 + dy, 170, 170, "bastions", "Azure\nBastion");
    card(`fw${r}`, 610, 230 + dy, 170, 170, "firewalls", "Azure\nFirewall");
    txt(`sp${r}-lbl`, 1150, 140 + dy, "Spoke virtual network", { size: 20 });
    group(`sp${r}`, 950, 180 + dy, 660, 250, null, VN);
    card(`aks${r}`, 980, 230 + dy, 180, 170, "kubernetes-services", "Kubernetes\nservices");
    card(`lb${r}`, 1210, 230 + dy, 170, 170, "load-balancers", "Load\nBalancer");
    card(`agw${r}`, 1420, 230 + dy, 170, 170, "application-gateways", "Application\nGateway");
    card(`kv${r}`, 1720, 130 + dy, 170, 150, "key-vaults", "Key Vault");
    card(`acr${r}`, 1720, 310 + dy, 170, 190, "container-registries", "Container\nRegistry\nreplica", { size: 16 });

    arrow(`hs${r}`, `hub${r}`, "right", 250 + dy, `sp${r}`, "left", 250 + dy, [], { ...G, tail: "arrow" });
    arrow(`lbaks${r}`, `lb${r}`, "left", 315 + dy, `aks${r}`, "right", 315 + dy, [], G);
    arrow(`agwlb${r}`, `agw${r}`, "left", 315 + dy, `lb${r}`, "right", 315 + dy, [], G);
    arrow(`kvl${r}`, `aks${r}`, "top", 1110, `kv${r}`, "left", 230 + dy, [205 + dy, 1690], R);
    arrow(`acrl${r}`, `aks${r}`, "bottom", 1110, `acr${r}`, "left", 450 + dy, [470 + dy, 1690], R);
  }

  txt("fl-lbl", 1010, 1070, "Spoke virtual network", { size: 20 });
  group("fl", 950, 1110, 360, 250, null, VN);
  card("flc", 980, 1140, 300, 200, "kubernetes-services", "Microsoft-managed\nKubernetes services\n(Fleet hub cluster)", { size: 16 });

  card("sacr", 2005, 230, 200, 200, "container-registries", "Container\nRegistry");
  card("afd", 2005, 470, 200, 200, "front-door-and-cdn-profiles", "Azure Front\nDoor");
  card("fleet", 2005, 720, 200, 220, "kubernetes-fleet-manager", "Azure\nKubernetes\nFleet Manager", { size: 16 });
  card("sla", 2005, 980, 200, 190, "log-analytics-workspaces", "Log Analytics");
  box("inet", 2300, 520, 150, 100, "Internet", { fill: TINT.onprem });

  arrow("in", "inet", "left", 570, "afd", "right", 570, [], G);
  arrow("afda", "afd", "left", 560, "agwa", "bottom", 1520, [], G);
  arrow("afdb", "afd", "left", 580, "agwb", "top", 1520, [], G);
  arrow("repa", "sacr", "left", 330, "acra", "right", 420, [1940], R);
  arrow("repb", "sacr", "left", 350, "acrb", "right", 900, [1950], R);
  arrow("loga", "aksa", "left", 370, "sla", "left", 1050, [935, 575, 1930, 1050], P);
  arrow("logb", "aksb", "left", 850, "sla", "left", 1070, [945, 1070], P);
  arrow("fla", "flc", "left", 1200, "aksa", "left", 290, [870], Y);
  arrow("flb", "flc", "left", 1220, "aksb", "left", 770, [880], Y);
  arrow("flhub", "fl", "left", 1280, "hubb", "bottom", 590, [], G);
  arrow("diag1", "huba", "bottom", 700, "laa", "bottom", 200, [520], { dashed: true, color: "#868e96" });
  arrow("diag2", "spa", "bottom", 1300, "laa", "bottom", 260, [530], { dashed: true, color: "#868e96" });

  txt("footer", 60, 1420, "Pencil-sketch redraw of the Azure Architecture Center diagram \"AKS baseline for multiregion clusters\"", { size: 20, color: "#495057" });
}
