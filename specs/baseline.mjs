// 125 Virtual machine baseline architecture.
export const meta = {
  num: 125,
  slug: "baseline",
  title: "Azure Virtual Machines baseline architecture",
  url: "https://learn.microsoft.com/azure/architecture/virtual-machines/baseline",
  category: "Compute",
  status: "done",
  otherDiagrams: ["img1: network layout", "img2-3: ingress flow", "img4: monitoring data flow", "img5: TLS termination"],
  substitutions: { "VMSS (Flexible)": "vm-scale-sets", "Frontend/Backend VM": "virtual-machine", "Managed disks": "disks", "Azure portal": "management-portal", "Internal / public load balancer": "load-balancers" },
  differences: ["Workload user, operator, GitHub actions/repository and public internet drawn as labelled shapes.", "Managed-disk glyphs folded into the VM cards."],
};

export function draw(k) {
  const { TINT, txt, card, group, icon, arrow, box } = k;
  const S = 16;
  box("user", 20, 140, 130, 70, "Workload\nuser", { fill: TINT.onprem, size: S });
  box("gha", 20, 330, 130, 70, "GitHub\nactions", { fill: TINT.onprem, size: S });
  box("ghr", 20, 460, 130, 70, "GitHub\nrepository", { fill: TINT.onprem, size: S });
  arrow("gh", "ghr", "top", null, "gha", "bottom", null, []);
  group("outer", 180, 80, 1120, 760, null, { fill: TINT.white });
  group("wr", 200, 100, 1080, 560, "Workload resources", { fill: TINT.subBox });
  card("agw", 220, 150, 300, 130, "application-gateways", "Application Gateway +\nWeb Application Firewall\nZone redundant", { size: S });
  box("kv", 220, 300, 300, 70, "Azure Key Vault\nZone resilient", { size: S, iconLeft: "key-vaults" });
  group("net", 220, 390, 300, 140, "Networking", { fill: TINT.white });
  icon("n-pe", "private-endpoints", 235, 430, 26); txt("n-pel", 270, 432, "Private Endpoints", { size: S });
  icon("n-sn", "subnet", 235, 462, 26); txt("n-snl", 270, 464, "Subnets", { size: S });
  icon("n-ns", "network-security-groups", 235, 494, 26); txt("n-nsl", 270, 496, "Network Security Groups", { size: S });
  card("fe", 590, 130, 170, 160, "vm-scale-sets", "Frontend\nVMSS\n(Flexible)", { size: S });
  card("ilb", 790, 130, 180, 160, "load-balancers", "Internal\nLoad Balancer\nzone-redundant", { size: S, fill: TINT.app });
  card("be", 1000, 130, 170, 160, "vm-scale-sets", "Backend\nVMSS\n(Flexible)", { size: S });
  [1, 2, 3].forEach((z, i) => {
    const y = 310 + i * 95;
    group(`z${z}`, 560, y, 700, 80, null, { fill: TINT.pim });
    box(`z${z}f`, 575, y + 8, 220, 64, "Frontend VM\n(SKU A)", { size: S, iconLeft: "virtual-machine" });
    txt(`z${z}l`, 870, y + 28, `Zone ${z}`, { size: 18 });
    box(`z${z}b`, 1025, y + 8, 220, 64, "Backend VM\n(SKU B)", { size: S, iconLeft: "virtual-machine" });
  });
  card("plb", 1000, 690, 180, 130, "load-balancers", "Load Balancer\nzone-redundant", { size: S, fill: TINT.app });
  group("ws", 200, 690, 760, 130, "Workload supporting resources", { fill: TINT.subBox });
  box("bas", 215, 740, 210, 66, "Azure Bastion", { size: S, iconLeft: "bastions" });
  box("law", 440, 740, 250, 66, "Azure Log Analytics", { size: S, iconLeft: "log-analytics-workspaces" });
  box("ai", 705, 740, 240, 66, "Azure Application\nInsights", { size: S, iconLeft: "application-insights" });
  box("op", 20, 890, 130, 70, "Operator", { fill: TINT.onprem, size: S });
  card("portal", 250, 880, 170, 100, "management-portal", "Azure portal", { size: S });
  box("inet", 1010, 890, 160, 70, "Public internet", { fill: TINT.onprem, size: S });
  arrow("e1", "user", "right", null, "agw", "left", 175, []);
  arrow("e2", "agw", "right", 175, "fe", "left", 175, []);
  arrow("e3", "fe", "right", 175, "ilb", "left", 175, []);
  arrow("e4", "ilb", "right", 175, "be", "left", 175, []);
  arrow("e5", "z3f", "bottom", 640, "plb", "left", 755, [610, 982, 755], { firstDir: "v" });
  arrow("e6", "z3b", "bottom", 1090, "plb", "top", 1090, []);
  arrow("e7", "plb", "bottom", null, "inet", "top", null, []);
  arrow("e8", "op", "right", null, "portal", "left", 930, []);
  arrow("e9", "portal", "top", null, "bas", "bottom", 335, []);
  txt("footer", 20, 1010, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Virtual machine baseline architecture\"", { size: 20, color: "#495057" });
}
