// 002 Azure Local hyperconverged baseline reference architecture. Redraw of the first architecture diagram.
export const meta = {
  num: 2,
  slug: "azure-local-baseline",
  title: "Azure Local hyperconverged baseline reference architecture",
  url: "https://learn.microsoft.com/azure/architecture/hybrid/azure-local-baseline",
  category: "Hybrid + multicloud",
  status: "done",
  otherDiagrams: ["Storage architecture (all-flash)", "Physical networking topology", "Logical networking topology"],
  substitutions: {
    "Microsoft Entra ID": "entra-connect", "Azure Site Recovery": "recovery-services-vaults", "Azure Backup": "backup-vault",
    "Additional Azure services via Azure Arc": "azure-arc", "Azure Arc resource bridge": "azure-arc", "Outbound access to URL endpoints": "globe-success",
    "Kubernetes-based applications": "kubernetes-services", "Traditional applications": "application-group", "Control plane tools": "management-portal, azure-cloud-shell",
  },
  differences: [
    "Dark slide styling replaced by the calm light sketch palette.",
    "Hyper-V, Storage Spaces Direct, ToR switches, the router/firewall and the machines are labelled sketch shapes (no Azure sketch icon).",
    "The large Azure logo on the left of the Azure services row is omitted.",
  ],
};

export function draw(k) {
  const { TINT, txt, zone, group, box, icon, card, step, arrow, both } = k;
  const GREEN = "#2b8a3e";
  txt("title", 60, 30, "Azure Local - baseline reference architecture", { size: 34 });

  // 6 Control plane
  zone("cp", 60, 100, 2280, 110, TINT.sub);
  icon("cp-i1", "management-portal", 90, 125, 56);
  icon("cp-i2", "azure-cloud-shell", 160, 125, 56);
  txt("cp-t", 1200, 116, "Control plane\nAzure portal, ARM and Bicep templates, Azure CLI and tools", { size: 22, align: "center" });
  step("s6", 2260, 135, 6);

  // Azure services
  zone("az", 60, 230, 2280, 300, TINT.sub);
  card("entra", 290, 250, 200, 260, "entra-connect", "Microsoft\nEntra ID");
  const svc = [["recovery-services-vaults", "Azure Site Recovery"], ["policy", "Azure Policy"], ["backup-vault", "Azure Backup"], ["monitor", "Azure Monitor"],
    ["container-registries", "Azure Container Registry"], ["key-vaults", "Azure Key Vault"], ["update-management-center", "Update Manager"], ["microsoft-defender-for-cloud", "Microsoft Defender for Cloud"]];
  svc.forEach(([n, l], i) => card(`svc${i}`, 510 + Math.floor(i / 2) * 330, 250 + (i % 2) * 135, 310, 125, n, l));
  card("arc-svc", 1840, 250, 200, 260, "azure-arc", "Additional\nAzure services\nintegration via\nAzure Arc");
  card("outbound", 2070, 270, 250, 160, "globe-success", "Outbound access\nto required URL endpoints");

  // Azure Local instance
  zone("inst", 60, 560, 2280, 440, TINT.app);
  card("inst-i", 80, 640, 180, 150, "azure-local", "Azure Local\ninstance");
  step("s4", 150, 820, 4);
  box("trad", 290, 580, 1110, 64, "Traditional, non-containerized applications", { size: 20, iconName: undefined });
  step("s5", 1350, 592, 5);
  card("k8s-apps", 1420, 580, 410, 64 + 26, "kubernetes-services", "Kubernetes-based applications", { valign: "middle", iconName: undefined });
  card("arc-enabled", 1850, 580, 330, 90, "azure-arc", "Azure Arc-enabled services", { valign: "middle", iconName: undefined });
  zone("vms", 290, 690, 640, 140, TINT.white);
  for (let i = 0; i < 5; i++) icon(`vm${i}`, "virtual-machine", 330 + i * 120, 700, 56);
  txt("vms-t", 610, 790, "Azure Local VMs", { size: 20, align: "center" });
  card("avd", 950, 690, 450, 140, "azure-virtual-desktop", "Azure Virtual Desktop (session hosts)");
  card("aks", 1420, 690, 760, 140, "kubernetes-services", "Azure Kubernetes Service (AKS) on Azure Local");
  zone("rel", 290, 850, 1890, 130, TINT.hub);
  box("hyperv", 310, 865, 640, 64, "Hyper-V", { size: 20 });
  card("bridge", 970, 860, 400, 74, "azure-arc", "Azure Arc\nresource bridge", { valign: "middle", iconName: undefined });
  icon("bridge-i", "azure-arc", 985, 868, 56);
  box("s2d", 1390, 865, 770, 64, "Storage Spaces Direct (S2D)", { size: 20 });
  txt("rel-t", 1235, 944, "Azure Local version releases", { size: 20, align: "center" });

  // 3 Corp firewall
  box("corpfw", 2380, 620, 180, 180, "Corp\nfirewall", { valign: "bottom", iconName: "firewalls", dashed: true, stroke: "#c92a2a" });
  step("s3", 2500, 840, 3);

  // 1 Validated hardware
  zone("hw", 60, 1030, 2280, 400, TINT.mg, { stroke: "#7048e8" });
  txt("hw-t", 80, 1060, "Validated hardware\n\nScale: 2 to 16\nmachines\n\nSolution categories", { size: 20 });
  step("s1", 140, 1280, 1);
  zone("hw-in", 330, 1050, 1990, 360, TINT.white);
  box("tor1", 430, 1070, 380, 110, "ToR switch 1", { size: 20 });
  box("router", 1140, 1070, 380, 110, "Switch / Router / Firewall", { size: 20 });
  box("tor2", 1850, 1070, 380, 110, "ToR switch 2", { size: 20 });
  for (let i = 0; i < 6; i++) box(`m${i}`, 350 + i * 325, 1200, 310, 64, `Azure Local machine ${i + 1}`, { size: 18 });
  box("premier", 560, 1300, 520, 64, "Premier Solutions for Azure Local", { size: 20 });
  box("integrated", 1240, 1300, 520, 64, "Integrated Systems for Azure Local", { size: 20 });
  both("ew1", "tor1", "right", null, "router", "left", null);
  both("ew2", "router", "right", null, "tor2", "left", null);
  txt("ew1-t", 975, 1080, "East/west traffic", { size: 16, align: "center" });
  txt("ew2-t", 1685, 1080, "East/west traffic", { size: 16, align: "center" });
  step("s2", 955, 1135, 2);

  // instance -> corp firewall -> outbound
  arrow("egress1", "rel", "bottom", 1500, "corpfw", "bottom", 2470, [1010, ], { color: GREEN, firstDir: "v" });
  arrow("egress2", "corpfw", "top", 2470, "outbound", "bottom", 2200, [545], { color: GREEN });

  txt("footer", 60, 1460, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Azure Local baseline reference architecture\"", { size: 20, color: "#495057" });
}
