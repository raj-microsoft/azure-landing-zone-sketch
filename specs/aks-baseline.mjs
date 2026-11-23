// 012 AKS baseline architecture for Azure Local. Redraw of the article's diagram.
export const meta = {
  num: 12,
  slug: "aks-baseline",
  title: "Azure Kubernetes Service (AKS) baseline architecture for Azure Local",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/hybrid/aks-baseline",
  category: "Containers + microservices",
  status: "done",
  otherDiagrams: [],
  substitutions: {
    "Azure Arc resource bridge": "azure-arc", "Container": "worker-container-app", "Hyper-V virtual machine": "virtual-machine",
    "Load balancer (control plane)": "load-balancers", "API server": "server-farm", "Physical node": "server-farm", "Azure Blob Storage": "blob-block",
  },
  differences: [
    "Dotted Hyper-V VM outlines around system services are drawn as dashed groups.",
    "Each worker node VM shows its containers inside one shared 'User application' group, as in the original.",
  ],
};

export function draw(k) {
  const { TINT, txt, zone, group, box, icon, iconCap, card, arrow, both, line } = k;
  txt("title", 140, 10, "AKS baseline architecture for Azure Local", { size: 30 });
  txt("ch-t", 1100, 64, "Customer-hosted", { size: 24, align: "center" });
  zone("ch", 140, 100, 1980, 1180, "transparent", { dashed: true, stroke: "#343a40" });

  const ctn = (id, x, y) => iconCap(id, "worker-container-app", x, y, "Container", { size: 52 });
  const vm = (id, x, y, w, title) => {
    group(id, x, y, w, 230, title, { dashed: true, fill: TINT.white, size: 16 });
    zone(`${id}-ss`, x + 40, y + 50, w - 60, 165, TINT.mg, { stroke: "#495057" });
    txt(`${id}-ss-t`, x + 50, y + 56, "system services", { size: 16 });
    ctn(`${id}-c1`, x + 70, y + 90); ctn(`${id}-c2`, x + w - 130, y + 90);
  };

  // Arc resource bridge
  icon("arb-i", "azure-arc", 180, 180, 56);
  txt("arb-t", 250, 194, "Azure Arc resource bridge", { size: 22 });
  zone("arb", 200, 260, 460, 680, TINT.mg);
  group("mc", 240, 400, 380, 380, "Management cluster", { fill: TINT.white, align: "center" });
  vm("mcvm", 260, 450, 340, "Hyper-V virtual machine");

  // Kubernetes cluster
  icon("k8s-i", "kubernetes-services", 720, 190, 56);
  txt("k8s-t", 1250, 200, "Kubernetes cluster", { size: 22, align: "center" });
  zone("k8s", 740, 260, 1300, 680, TINT.mg);
  group("cp", 790, 320, 620, 580, "Control plane", { fill: TINT.white, align: "center" });
  card("lb", 810, 420, 140, 120, "load-balancers", "Load\nbalancer", { size: 16 });
  card("api", 810, 680, 140, 120, "server-farm", "API\nserver", { size: 16 });
  vm("cpvm1", 1000, 370, 390, "Hyper-V virtual machine");
  vm("cpvm2", 1000, 640, 390, "Hyper-V virtual machine");
  zone("wn", 1440, 260, 600, 680, TINT.white);
  txt("wn-t", 1740, 275, "Worker nodes", { size: 20, align: "center" });
  card("wvm1", 1460, 330, 140, 120, "virtual-machine", "Hyper-V\nVM", { size: 16 });
  card("wvm2", 1460, 600, 140, 120, "virtual-machine", "Hyper-V\nVM", { size: 16 });
  zone("ua", 1640, 320, 380, 590, TINT.mg, { stroke: "#495057" });
  txt("ua-t", 1830, 580, "User application", { size: 20, align: "center" });
  ctn("u1", 1680, 360); ctn("u2", 1880, 360); ctn("u3", 1680, 700); ctn("u4", 1880, 700);
  line("w1-ua", "wvm1", "right", 390, "ua", "left", 390, [], { dashed: true });
  line("w2-ua", "wvm2", "right", 660, "ua", "left", 660, [], { dashed: true });

  card("user", 1500, 110, 140, 110, "users", "User", { size: 16 });
  arrow("u-lb", "user", "left", 165, "lb", "top", 880, [880]);
  arrow("lb-api", "lb", "bottom", 880, "api", "top", 880);
  line("lb-vm1", "lb", "right", 480, "cpvm1", "left", 480, [], { dashed: true });
  line("api-vm2", "api", "right", 740, "cpvm2", "left", 740, [], { dashed: true });

  // Azure Local instance
  zone("al", 200, 1000, 1840, 240, TINT.sub, { stroke: "#74c0fc" });
  icon("al-i", "azure-local", 215, 1015, 56);
  txt("al-t", 1120, 1100, "Azure Local instance", { size: 24, align: "center" });
  for (let i = 0; i < 4; i++) iconCap(`pn${i}`, "server-farm", 300 + i * 110, 1080, "Physical\nnode", { size: 56 });
  both("al-arb", "arb", "bottom", 430, "al", "top", 430);
  both("al-k8s", "k8s", "bottom", 1100, "al", "top", 1100);
  both("al-wn", "wn", "bottom", 1740, "al", "top", 1740);

  // Azure services
  group("az", 2180, 60, 260, 1180, "Azure", { fill: TINT.sub, align: "center", size: 22 });
  [["azure-arc", "Azure Arc"], ["automation-accounts", "Automation\naccounts"], ["monitor", "Azure\nMonitor"], ["blob-block", "Azure Blob\nStorage"], ["policy", "Azure\nPolicy"], ["microsoft-defender-for-cloud", "Microsoft\nDefender for\nCloud"]]
    .forEach(([n, l], i) => iconCap(`az${i}`, n, 2270, 120 + i * 185, l, { size: 64 }));

  txt("footer", 140, 1300, "Pencil-sketch redraw of the Azure Architecture Center diagram \"AKS baseline architecture for Azure Local\"", { size: 20, color: "#495057" });
}
