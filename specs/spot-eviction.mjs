// 092 Build workloads on spot virtual machines (example scenario architecture, img1).
export const meta = {
  num: 92,
  slug: "spot-eviction",
  title: "Build workloads on spot virtual machines",
  url: "https://learn.microsoft.com/azure/architecture/guide/spot/spot-eviction",
  category: "Compute",
  status: "done",
  otherDiagrams: ["Workload lifecycle with application warmup period (img0, conceptual chart)"],
  substitutions: { "VM application definition": "vm-app-definitions", "Application version": "vm-app-versions", "orchestrate.sh": "dev-console", ".NET worker app": "code", "Scheduled Events endpoint": "scheduled-actions", "worker-0.1.0.tar.gz": "file" },
  differences: ["First image is a conceptual lifecycle chart; the example scenario architecture (img1) is drawn.", "Light-cone from storage account to the package file is omitted; package is a card beside the storage account."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, icon, arrow, step } = k;
  txt("title", 40, 0, "Spot VM workload with eviction handling", { size: 28 });
  group("azure", 270, 50, 1580, 970, null, { fill: TINT.white });
  icon("az-ico", "azure-a", 320, 900, 56);
  txt("az-lbl", 318, 962, "Azure", { size: 18 });
  card("entra", 740, 70, 200, 110, "entra-connect", "Microsoft Entra ID", { size: 16 });
  card("sched", 1320, 70, 230, 110, "scheduled-actions", "Scheduled Events\nendpoint", { size: 16 });
  step("s6", 1270, 80, 6);
  group("rg", 675, 200, 1105, 790, null, { fill: TINT.white });
  icon("rg-ico", "resource-groups", 1690, 905, 56);
  txt("rg-lbl", 1560, 920, "rg-spotvm", { size: 18 });
  card("queue", 960, 220, 140, 110, "storage-queue", "Storage queue", { size: 16 });
  step("s4", 912, 225, 4);
  card("appins", 1150, 220, 150, 110, "application-insights", "Application\nInsights", { size: 16 });
  step("s7", 1108, 225, 7);
  group("vnet", 705, 360, 1030, 360, null, { fill: TINT.sub, dashed: true });
  icon("vn-ico", "virtual-networks", 1680, 662, 48);
  txt("vn-lbl", 1580, 685, "vnet-spot", { size: 18 });
  group("snet", 730, 420, 540, 220, null, { fill: TINT.white, dashed: true });
  group("bsnet", 1310, 420, 400, 220, null, { fill: TINT.white, dashed: true });
  txt("snet-lbl", 900, 650, "snet-spot subnet\n(10.200.0.64/27)", { size: 16 });
  txt("bsnet-lbl", 1370, 648, "AzureBastionSubnet\n(10.200.0.0/26)", { size: 16 });
  step("s3", 740, 430, 3);
  card("vm", 785, 470, 140, 120, "virtual-machine", "Spot virtual\nmachine", { size: 16 });
  card("orch", 950, 470, 140, 120, "dev-console", "orchestrate.sh", { size: 16 });
  step("s5", 1105, 430, 5);
  card("worker", 1115, 470, 140, 120, "code", ".NET worker\napp", { size: 16 });
  card("bastion", 1330, 470, 160, 120, "bastions", "Azure Bastion", { size: 16 });
  card("pip", 1520, 470, 160, 120, "public-ip-addresses", "Public IP\naddress", { size: 16 });
  group("gal", 330, 430, 320, 220, null, { fill: TINT.white });
  card("defn", 345, 450, 120, 140, "vm-app-definitions", "VM application\ndefinition", { size: 16 });
  step("s1", 472, 460, 1);
  card("appver", 515, 450, 120, 140, "vm-app-versions", "Application\nversion", { size: 16 });
  txt("gal-lbl", 420, 605, "Compute gallery", { size: 16 });
  txt("link-lbl", 380, 690, "App version linked to\nsource app package in\nstorage account", { size: 16 });
  group("sa", 800, 770, 380, 150, null, { fill: TINT.data });
  card("sacc", 830, 785, 140, 120, "storage-accounts", "Storage\naccount", { size: 16 });
  card("tar", 1010, 785, 150, 120, "file", "worker-0.1.0\n.tar.gz", { size: 16 });
  step("s2", 760, 930, 2);
  txt("dl-lbl", 895, 735, "download tar.gz", { size: 16 });
  txt("md-lbl", 1400, 250, "Metadata query", { size: 16 });
  txt("tel-lbl", 1195, 385, "Telemetry", { size: 16 });
  arrow("a1", "appver", "right", 530, "vm", "left", 530);
  arrow("a-orch", "vm", "right", 530, "orch", "left", 530);
  arrow("a-wk", "orch", "right", 530, "worker", "left", 530);
  arrow("a-entra", "vm", "top", 820, "entra", "bottom", 820, [], { tail: "arrow" });
  arrow("a-queue", "vm", "top", 890, "queue", "left", 275, [], { tail: "arrow" });
  arrow("a-tel", "worker", "top", 1190, "appins", "bottom", 1190);
  arrow("a-md", "sched", "bottom", 1400, "worker", "right", 520, [410, 1290]);
  arrow("a-dl", "sacc", "top", 880, "vm", "bottom", 880);
  arrow("a-bas", "bastion", "bottom", 1400, "vm", "bottom", 820, [615]);
  arrow("a-link", "gal", "bottom", 350, "sacc", "left", 845);
  txt("footer", 40, 1050, "Pencil-sketch redraw of the Azure Architecture Center diagram \"spot VM example scenario architecture\"", { size: 20, color: "#495057" });
}
