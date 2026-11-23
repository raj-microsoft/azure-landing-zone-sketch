// 006 Baseline Azure Machine Learning inference reference architecture. Redraw of the first diagram (development environment).
export const meta = {
  num: 6,
  slug: "baseline-azure-machine-learning-inference",
  title: "Baseline Azure Machine Learning inference reference architecture",
  url: "https://learn.microsoft.com/azure/architecture/ai-ml/architecture/baseline-azure-machine-learning-inference",
  category: "AI + machine learning",
  status: "done",
  otherDiagrams: ["Staging environment architecture", "Production environment architecture", "End-to-end promotion workflow (Dev, Stage, Prod)"],
  substitutions: {
    "Azure Machine Learning (workspace, registry, model registration)": "machine-learning", "Data Lake Storage": "data-lake-storage-gen1",
    "AKS inference cluster, jump box, runners, compute": "virtual-machine", "User Defined Route": "route-tables", "Azure Monitor Private Link Scope": "private-endpoints",
  },
  differences: [
    "Fabric and source control are labelled sketch boxes (no sketch icon / customer-provided).",
    "The small UDR and NSG badges on every subnet are shown once, in the legend only.",
    "The Azure Machine Learning registry link to the shared subscription routes down the left edge instead of straight through the managed virtual network.",
  ],
};

export function draw(k) {
  const { TINT, txt, group, box, icon, card, step, arrow, both } = k;
  const PE = "private-endpoints";
  txt("title", 220, 30, "Baseline Azure Machine Learning inference: development environment", { size: 30 });

  box("law", 1620, 10, 340, 60, "Log Analytics Workspace", { size: 18, iconLeft: "log-analytics-workspaces" });
  box("mi", 1620, 80, 340, 60, "Managed identities", { size: 18, iconLeft: "managed-identities" });
  box("mon", 1620, 150, 340, 60, "Azure Monitor", { size: 18, iconLeft: "monitor" });

  box("src", 220, 150, 300, 120, "Source control\n(customer provided)", { fill: TINT.onprem, size: 20 });
  step("s7", 530, 150, 7);
  group("ds", 220, 320, 320, 270, "Data source", { fill: TINT.mg });
  box("fabric", 235, 365, 150, 64, "Fabric", { size: 18 });
  box("dls", 235, 445, 150, 80, "Data Lake\nStorage", { size: 16, iconLeft: "data-lake-storage-gen1" });
  card("df", 400, 365, 125, 130, "data-factories", "Data\nFactory");
  txt("ds-note", 235, 545, "Customer provided resource", { size: 16 });
  group("legend", 220, 620, 320, 180, "Legend", { fill: TINT.white });
  icon("lg-udr", "route-tables", 240, 665, 40); txt("lg-udr-t", 290, 673, "User Defined Route", { size: 16 });
  icon("lg-nsg", "network-security-groups", 240, 725, 40); txt("lg-nsg-t", 290, 723, "Network Security\nGroup", { size: 16 });

  group("dev", 560, 230, 1860, 880, "Dev subscription", { fill: "#fff5f5", stroke: "#e8590c", iconName: "subscriptions" });
  group("vnet", 600, 290, 1800, 580, "Dev BYO Virtual Network", { fill: TINT.mg, stroke: "#7048e8", dashed: true, iconName: "virtual-networks" });

  group("pes", 830, 400, 950, 250, "Private Endpoints subnet", { fill: TINT.white, size: 16 });
  txt("pes-t2", 1305, 436, "Private Endpoints", { size: 16, align: "center" });
  const pes = ["Azure Machine\nLearning\nregistry", "Azure Machine\nLearning\nworkspace", "Storage\nAccount", "Azure\nContainer\nRegistry", "Key\nVault", "Azure Monitor\nPrivate Link\nScope"];
  pes.forEach((l, i) => card(`pe${i}`, 845 + i * 155, 470, 145, 165, PE, l, { size: 16 }));
  card("st", 1155, 690, 145, 130, "storage-accounts", "Storage\nAccount", { size: 16 });
  card("acr", 1310, 690, 145, 130, "container-registries", "Azure\nContainer\nRegistry", { size: 16 });
  card("kv", 1465, 690, 145, 130, "key-vaults", "Key Vault", { size: 16 });
  group("dnsr", 620, 740, 280, 110, "Private Resolver subnet", { fill: TINT.white, size: 16 });
  box("dns", 635, 775, 250, 64, "Azure DNS\nPrivate Resolver", { size: 16, iconLeft: "dns-private-resolver" });

  group("inf", 1800, 400, 260, 250, "Inference subnet", { fill: TINT.white, size: 16 });
  step("s6", 2010, 405, 6);
  card("infc", 1815, 450, 230, 185, "virtual-machine", "AKS inference\ncluster with Azure\nMachine Learning\nextension", { size: 16 });
  card("aks", 1830, 690, 200, 120, "kubernetes-services", "Azure Kubernetes\nService", { size: 16 });

  group("jump", 2080, 345, 150, 255, "Jump box\nsubnet", { fill: TINT.white, size: 16 });
  card("jb", 2090, 410, 130, 140, "virtual-machine", "SRE\nJump box", { size: 16 });
  group("run", 2245, 345, 145, 255, "Runners\nsubnet", { fill: TINT.white, size: 16 });
  card("runner", 2255, 410, 125, 140, "virtual-machine", "Self-hosted\nCI/CD\nrunner", { size: 16 });
  step("s5", 2340, 175, 5);
  group("fsn", 2080, 620, 310, 140, "Feature store subnet", { fill: TINT.white, size: 16 });
  box("fs", 2095, 665, 280, 80, "Online feature store\n(customer provided)", { size: 16 });

  group("mvn", 600, 880, 1800, 210, "Azure Machine\nLearning\nWorkspace Managed\nVirtual Network", { fill: TINT.mg, stroke: "#7048e8", dashed: true, size: 16 });
  step("s4", 950, 905, 4);
  card("mlreg", 1000, 900, 200, 170, "machine-learning", "Azure Machine\nLearning + Model\nregistration\n(candidates)", { size: 16 });
  card("autope", 1240, 930, 260, 130, PE, "Auto-provisioned\nPrivate Endpoints", { size: 16, fill: "#e3fafc" });
  const sub = (id, x, title, label, n) => {
    group(id, x, 895, 265, 185, title, { fill: TINT.white, size: 16 });
    step(`${id}-s`, x + 215, 900, n);
    card(`${id}-c`, x + 15, 945, 235, 125, "virtual-machine", label, { size: 16 });
  };
  sub("train", 1560, "Training subnet", "Azure Machine Learning\ntraining compute\ncluster", 3);
  sub("spark", 1840, "Spark subnet", "Azure Machine Learning\nserverless Spark\ncluster", 2);
  sub("ci", 2120, "AML compute subnet", "Compute instances", 1);

  box("egress", 2500, 350, 240, 110, "Controlled egress\nthrough shared\ninspection", { size: 18, fill: TINT.warn });

  group("shared", 620, 1180, 900, 330, "Shared Subscription", { fill: "#fff5f5", stroke: "#e8590c", iconName: "subscriptions" });
  box("mreg", 660, 1230, 500, 70, "Azure Machine Learning model registry", { size: 18, iconLeft: "machine-learning" });
  group("rg", 650, 1320, 840, 170, "Azure Machine Learning registry Resource Group", { fill: TINT.white, size: 16, iconName: "resource-groups", iconSize: 32 });
  box("rst", 670, 1370, 380, 90, "Azure Machine Learning\nregistry storage", { size: 16, iconLeft: "storage-accounts" });
  box("racr", 1070, 1370, 400, 90, "Azure Machine Learning registry\nAzure Container Registry", { size: 16, iconLeft: "container-registries" });

  // flows
  arrow("f-src", "src", "right", 225, "run", "top", 2330, [], { dashed: true });
  arrow("f-push", "run", "top", 2270, "pes", "top", 1300, [320], { dashed: true, firstDir: "v" });
  txt("f-push-t", 870, 330, "Push image and register environment version", { size: 16 });
  arrow("f-df", "df", "right", 420, "st", "left", 720, [800], { dashed: true });
  arrow("f-pe2", "pe2", "bottom", 1227, "st", "top", 1227);
  arrow("f-pe3", "pe3", "bottom", 1382, "acr", "top", 1382);
  arrow("f-pe4", "pe4", "bottom", 1537, "kv", "top", 1537);
  arrow("f-mon", "pe5", "top", 1700, "mon", "bottom", 1700);
  arrow("f-ws", "pe1", "bottom", 1070, "mlreg", "top", 1070);
  arrow("f-reg", "pe0", "bottom", 930, "mreg", "left", 1265, [870, 580]);
  arrow("f-inf", "infc", "bottom", 1930, "aks", "top", 1930);
  both("f-st-auto", "st", "bottom", 1270, "autope", "top", 1270);
  both("f-acr-auto", "acr", "bottom", 1350, "autope", "top", 1350);
  arrow("f-fs", "fs", "bottom", 2110, "spark-c", "top", 2000, [870], { dashed: true, head: null, firstDir: "v" });
  arrow("f-egress", "dev", "right", 405, "egress", "left", 405);
  arrow("f-pub", "mvn", "bottom", 1100, "shared", "top", 1100, [], { dashed: true });
  step("s8", 1000, 1122, 8);
  txt("f-pub-t", 1120, 1118, "Publish approved model\nand environment", { size: 16 });

  txt("footer", 220, 1540, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Baseline Azure Machine Learning inference\" (development environment)", { size: 20, color: "#495057" });
}
