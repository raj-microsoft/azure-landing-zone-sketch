// 100 Use Teamcenter PLM with Azure NetApp Files.
export const meta = {
  num: 100,
  slug: "teamcenter-plm-netapp-files",
  title: "Use Teamcenter PLM with Azure NetApp Files",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/manufacturing/teamcenter-plm-netapp-files",
  category: "Storage",
  status: "done",
  otherDiagrams: ["img1: Azure NetApp Files snapshot restore options", "img2: cross-zone replication DR", "img3: further storage layout"],
  substitutions: { "Tier VMs": "virtual-machine", "Load balancer": "load-balancers", "ExpressRoute": "expressroute-circuits", "Volumes / Data & log": "azure-netapp-files" },
  differences: [
    "Availability zone 1 and 2 bands are drawn as labels plus a dashed divider instead of overlapping rectangles.",
    "Each enterprise column shows two VM icons per zone instead of three; performance-colour tints of VM icons are summarised in the legend only.",
    "On-premises datacenter and the [a]/[b] storage-path markers are labelled sketch shapes.",
  ],
};

export function draw(k) {
  const { TINT, txt, card, box, group, icon, arrow, poly } = k;
  const S = 16;
  txt("title", 40, 0, "Teamcenter PLM on Azure NetApp Files", { size: 28 });
  txt("ct-lbl", 40, 60, "Client tier", { size: 20 });
  group("client", 40, 100, 260, 860, null, { fill: TINT.white, dashed: true });
  box("dc", 60, 470, 220, 110, "On-premises\ndatacenter", { size: S, fill: TINT.onprem });
  card("er", 85, 300, 170, 130, "expressroute-circuits", "ExpressRoute", { size: S });
  txt("vn-lbl", 380, 60, "Virtual network", { size: 18 });
  icon("vn-i", "virtual-networks", 320, 50, 44);
  group("vnet", 320, 100, 2410, 900, null, { fill: TINT.white, dashed: true });
  // web tier
  txt("wt-lbl", 340, 115, "Web tier", { size: 18 });
  group("web", 340, 150, 360, 810, null, { fill: TINT.sub, dashed: true });
  txt("az1", 360, 160, "Availability zone 1", { size: 16 });
  txt("az2", 360, 920, "Availability zone 2", { size: 16 });
  box("lb", 360, 500, 160, 90, "Load\nbalancer", { size: S, iconLeft: "load-balancers" });
  box("w1", 550, 200, 130, 70, "Web 1", { size: S, iconLeft: "virtual-machine" });
  box("wn1", 550, 330, 130, 70, "Web n", { size: S, iconLeft: "virtual-machine" });
  box("wa", 550, 420, 130, 70, "Web\nadmin", { size: S, fill: "#ffc9c9" });
  box("w2", 550, 680, 130, 70, "Web 1", { size: S, iconLeft: "virtual-machine" });
  box("wn2", 550, 820, 130, 70, "Web n", { size: S, iconLeft: "virtual-machine" });
  arrow("a-dc", "dc", "right", 525, "lb", "left", 525, [], { tail: "arrow" });
  arrow("lb-w1", "lb", "top", 440, "w1", "left", 235);
  arrow("lb-wn1", "lb", "top", 470, "wn1", "left", 365);
  arrow("lb-w2", "lb", "bottom", 440, "w2", "left", 715);
  arrow("lb-wn2", "lb", "bottom", 470, "wn2", "left", 855);
  // enterprise tier
  txt("et-lbl", 730, 115, "Enterprise tier", { size: 18 });
  group("ent", 730, 150, 1435, 810, null, { fill: TINT.sub, dashed: true });
  const cols = ["BL", "Reporting\nand\nanalytics", "Utility", "Active\nworkspace", "Engineering\nTranslation", "eM", "Bill of\nmaterials", "Common\nDesktop Env."];
  const xs = [745, 880, 1415, 1540, 1665, 1790, 1915, 2040];
  cols.forEach((c, i) => {
    const x = xs[i];
    group(`c${i}`, x, 180, 120, 760, null, { fill: TINT.white });
    icon(`c${i}-a`, "virtual-machine", x + 32, 200, 56);
    icon(`c${i}-b`, "virtual-machine", x + 32, 280, 56);
    txt(`c${i}-l`, x + 8, 520, c, { size: 16 });
    icon(`c${i}-c`, "virtual-machine", x + 32, 760, 56);
    icon(`c${i}-d`, "virtual-machine", x + 32, 840, 56);
  });
  box("cc", 1010, 180, 190, 70, "Clearance\ncalculator", { size: S, fill: "#ffc9c9" });
  box("etj", 1210, 180, 190, 70, "Eng. Translation\nService JT", { size: S, fill: "#ffc9c9" });
  group("ms", 1010, 290, 190, 620, null, { fill: TINT.white });
  box("ms1", 1030, 330, 150, 70, "Multisite 1", { size: S, iconLeft: "virtual-machine" });
  icon("ms-lb", "load-balancers", 1077, 570, 56);
  box("ms2", 1030, 800, 150, 70, "Multisite 2", { size: S, iconLeft: "virtual-machine" });
  group("cd", 1210, 290, 190, 620, null, { fill: TINT.white });
  box("cd1", 1230, 330, 150, 70, "CeDeP\nfeed 1", { size: S, iconLeft: "virtual-machine" });
  icon("cd-lb", "load-balancers", 1277, 570, 56);
  box("cd2", 1230, 800, 150, 70, "CeDeP\nfeed 2", { size: S, iconLeft: "virtual-machine" });
  txt("cdf", 1250, 260, "CeDeP feed", { size: 16 });
  arrow("ms-u", "ms-lb", "top", 1105, "ms1", "bottom", 1105);
  arrow("ms-d", "ms-lb", "bottom", 1105, "ms2", "top", 1105);
  arrow("cd-u", "cd-lb", "top", 1305, "cd1", "bottom", 1305);
  arrow("cd-d", "cd-lb", "bottom", 1305, "cd2", "top", 1305);
  // resource tier
  txt("rt-lbl", 2185, 115, "Resource tier", { size: 18 });
  group("res", 2185, 150, 230, 810, null, { fill: TINT.sub, dashed: true });
  box("pdb", 2205, 190, 190, 70, "Primary DB", { size: S, iconLeft: "virtual-machine" });
  box("rfsc", 2245, 340, 155, 70, "Root FSC", { size: S, iconLeft: "virtual-machine" });
  box("fms", 2245, 500, 155, 90, "File Mgmt\nSystem", { size: S, iconLeft: "virtual-machine" });
  box("fms2", 2245, 650, 155, 70, "FSC 2", { size: S, iconLeft: "virtual-machine" });
  box("fdb", 2205, 850, 190, 70, "Failover DB", { size: S, iconLeft: "virtual-machine" });
  arrow("a-sync", "pdb", "bottom", 2222, "fdb", "top", 2222, [], { color: "#e8590c" });
  txt("sync-lbl", 2265, 420, "Synchronous\nreplication", { size: 16 });
  // storage subnet
  txt("ss-lbl", 2445, 115, "Storage subnet", { size: 18 });
  group("stor", 2445, 150, 260, 810, null, { fill: TINT.data, dashed: true });
  card("anf1", 2465, 180, 180, 140, "azure-netapp-files", "Azure NetApp\nFiles", { size: S });
  box("vol1", 2465, 350, 180, 90, "Volumes\nData & log", { size: S, fill: "#ffc9c9" });
  box("vol2", 2465, 650, 180, 90, "Volumes\nData & log", { size: S, fill: "#ffc9c9" });
  card("anf2", 2465, 790, 180, 140, "azure-netapp-files", "Azure NetApp\nFiles", { size: S });
  arrow("a-czr", "vol1", "bottom", 2555, "vol2", "top", 2555, [], { color: "#1971c2" });
  txt("czr-lbl", 2570, 530, "Cross-zone\nreplication", { size: 16 });
  arrow("a-pa", "pdb", "right", 225, "anf1", "left", 225);
  arrow("a-pb", "rfsc", "right", 375, "vol1", "left", 375); 
  arrow("a-fb", "fms2", "right", 685, "vol2", "left", 685);
  arrow("a-fa", "fdb", "right", 885, "anf2", "left", 885);
  poly("zdiv", [[740, 600], [2405, 600]], { dashed: true, color: "#868e96" });
  // legend
  box("lg0", 700, 1030, 280, 60, "Performance requirement", { size: S, fill: TINT.mg });
  box("lg1", 1000, 1030, 140, 60, "Low", { size: S, fill: TINT.app });
  box("lg2", 1160, 1030, 160, 60, "Medium", { size: S, fill: "#ffe8cc" });
  box("lg3", 1340, 1030, 180, 60, "Med-High", { size: S, fill: TINT.warn });
  box("lg4", 1540, 1030, 140, 60, "High", { size: S, fill: "#ffc9c9" });
  txt("footer", 40, 1130, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Teamcenter PLM architecture that uses Azure NetApp Files\"", { size: 20, color: "#495057" });
}
