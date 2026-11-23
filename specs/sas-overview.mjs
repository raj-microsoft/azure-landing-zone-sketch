// 106 SAS on Azure architecture.
export const meta = {
  num: 106,
  slug: "sas-overview",
  title: "SAS on Azure architecture",
  url: "https://learn.microsoft.com/azure/architecture/guide/sas/sas-overview",
  category: "Infrastructure + storage",
  status: "done",
  otherDiagrams: [],
  substitutions: { "VM with P30 disks": "virtual-machine (disk shown in caption)" },
  differences: ["Proximity placement group fully contains both subnets (official diagram shows a partial overlap).", "Each VM-plus-disk glyph is one VM card captioned 'P30 disks'; the separate disk stack is not drawn."],
};

export function draw(k) {
  const { TINT, txt, card, group, icon } = k;
  const S = 16;
  const vm = (id, x, y, label = "P30 disks") => card(id, x, y, 150, 130, "virtual-machine", label, { size: S });
  txt("title", 40, 0, "SAS on Azure", { size: 28 });
  group("vnet", 40, 70, 1540, 1200, null, { fill: TINT.white, dashed: true });
  icon("vnet-i", "virtual-networks", 60, 85, 44);
  txt("vnet-lbl", 120, 92, "Azure Virtual Network", { size: 20 });
  group("ppg", 60, 150, 1500, 1100, null, { fill: TINT.sub, dashed: true });
  icon("ppg-i", "proximity-placement-groups", 75, 160, 44);
  txt("ppg-lbl", 135, 168, "Proximity placement group", { size: 20 });

  group("sas", 80, 230, 1460, 520, null, { fill: TINT.white });
  txt("sas-lbl", 660, 245, "SAS subnet", { size: 22 });
  icon("sas-nsg", "network-security-groups", 1430, 245, 48);
  txt("sas-nsg-lbl", 1240, 250, "Network\nsecurity group", { size: 18 });
  txt("meta-lbl", 470, 290, "Metadata tier\n(Ds_v4 series*)", { size: 18 });
  vm("m1", 430, 350); vm("m2", 600, 350);
  txt("mid-lbl", 830, 290, "Mid tier\n(Es_v4 series*)", { size: 18 });
  vm("t1", 790, 350); vm("t2", 960, 350);
  txt("comp-lbl", 700, 500, "Compute tier\n(Eds_v4 series*)", { size: 18 });
  [0, 1, 2, 3, 4].forEach((i) => vm(`c${i}`, 360 + i * 170, 570));

  group("lus", 80, 790, 1460, 420, null, { fill: TINT.white });
  txt("lus-lbl", 640, 805, "Lustre Storage subnet", { size: 22 });
  icon("lus-nsg", "network-security-groups", 1430, 805, 48);
  txt("lus-nsg-lbl", 1240, 810, "Network\nsecurity group", { size: 18 });
  txt("mgs-lbl", 140, 880, "MGS / MDS servers", { size: 20 });
  card("g1", 620, 860, 150, 110, "virtual-machine", "MGS", { size: S });
  card("g2", 790, 860, 150, 110, "virtual-machine", "MDS", { size: S });
  txt("oss-lbl", 140, 990, "OSS / OST servers", { size: 20 });
  [0, 1, 2, 3, 4, 5, 6].forEach((i) => vm(`o${i}`, 210 + i * 165, 1040));
  txt("footer", 40, 1310, "Pencil-sketch redraw of the Azure Architecture Center diagram \"deploy SAS products on Azure\"", { size: 20, color: "#495057" });
}
