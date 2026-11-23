// 001 Massive-scale VWAN architecture design. Like-for-like redraw of the article's single diagram.
export const meta = {
  num: 1,
  slug: "massive-scale-azure-architecture",
  title: "Massive-scale VWAN architecture design",
  url: "https://learn.microsoft.com/azure/architecture/networking/architecture/massive-scale-azure-architecture",
  category: "Networking",
  status: "done",
  otherDiagrams: [],
  substitutions: {},
  differences: [
    "Diagonal hub-to-ExpressRoute lines are drawn as orthogonal routes through lanes between the regions and the ExpressRoute groups.",
    "The Primary/Backup line legend is written as text.",
    "Flows 1 and 2 into Spoke VNet1 are drawn as two red arrows from the firewall NVA; the Microsoft Azure logo is omitted.",
  ],
};

export function draw(k) {
  const { TINT, txt, zone, group, box, icon, iconCap, card, step, arrow, line, both } = k;
  const RED = "#e03131", BLUE = "#1971c2";
  const red = (id, f, fs, fa, t, ts, ta, lanes = [], o = {}) => arrow(id, f, fs, fa, t, ts, ta, lanes, { color: RED, ...o });
  const blue = (id, f, fx, t, tx, lane, dashed) => line(id, f, "bottom", fx, t, "top", tx, [lane], { color: BLUE, dashed });

  txt("title", 640, 50, "Massive-scale Azure Virtual WAN architecture", { size: 32 });
  box("internet", 40, 30, 160, 64, "Internet", { fill: TINT.onprem });

  const spokes = [["Spoke VNet1\n10.0.1.0/24", "Spoke VNet2\n10.0.2.0/24", "Spoke VNet3\n10.1.1.0/24", "Spoke VNet4\n10.1.2.0/24"],
    ["Spoke VNet5\n10.2.1.0/24", "Spoke VNet6\n10.2.2.0/24", "Spoke VNet7\n10.3.1.0/24", "Spoke VNet8\n10.3.2.0/24"]];
  const secs = [["Security VNet1\n192.168.0.0/24", "Security VNet2\n192.168.1.0/24"], ["Security VNet3\n192.168.2.0/24", "Security VNet4\n192.168.3.0/24"]];
  for (const r of [0, 1]) {
    const o = r * 1360, R = r + 1;
    zone(`region${R}`, 140 + o, 150, 1300, 680, TINT.sub);
    txt(`region${R}-t`, 790 + o, 162, `Region ${R}`, { size: 32, align: "center" });
    [310, 560, 920, 1170].forEach((x, i) => {
      const id = `vnet${r * 4 + i + 1}`;
      group(id, x + o, 260, 220, 210, spokes[r][i], { iconName: "virtual-networks" });
      box(`${id}-subnet`, x + o + 20, 340, 180, 100, "Subnet", { dashed: true, size: 18, stroke: "#4a6b8a" });
    });
    [[160, 280], [800, 240]].forEach(([x, w], i) => {
      const n = r * 2 + i + 1, id = `sec${n}`;
      group(id, x + o, 510, w, 270, secs[r][i], { iconName: "virtual-networks" });
      group(`${id}-fw`, x + o + 14, 585, w - 28, 180, "Firewall subnet", { dashed: true, size: 16 });
      const fx = x + o + w - 110;
      if (i === 0) iconCap(`fw${n}`, "vm-scale-sets", fx, 630, "Firewall NVA\nscale set", { size: 64 });
      else icon(`fw${n}`, "vm-scale-sets", fx, 630, 64);
    });
    card(`hub${R}1`, 560 + o, 560, 160, 130, "virtual-wan-hub", `Region${R}\nVWAN Hub1`);
    card(`hub${R}2`, 1100 + o, 560, 160, 130, "virtual-wan-hub", `Region${R}\nVWAN Hub2`);
    const v = (i) => `vnet${r * 4 + i}`;
    line(`b${R}-1`, v(1), "bottom", 500 + o, `hub${R}1`, "left", 600);
    line(`b${R}-2`, v(2), "bottom", 640 + o, `hub${R}1`, "top", 640 + o);
    line(`b${R}-3`, `sec${r * 2 + 1}`, "right", 660, `hub${R}1`, "left", 660);
    line(`b${R}-4`, v(3), "bottom", 1130 + o, `hub${R}2`, "top", 1130 + o);
    line(`b${R}-5`, v(4), "bottom", 1220 + o, `hub${R}2`, "top", 1220 + o);
    line(`b${R}-6`, `sec${r * 2 + 2}`, "right", 625, `hub${R}2`, "left", 625);
  }

  // ExpressRoute groups
  const er = (id, x0, labels) => {
    zone(id, x0, 1230, 612, 280, TINT.white, { dashed: true, stroke: BLUE });
    labels.forEach((l, i) => iconCap(`${id}-c${i}`, "expressroute-circuits", x0 + [72, 212, 342, 482][i] - 28, 1250, `${l}\nExpressRoute`));
    iconCap(`${id}-direct`, "expressroute-direct", x0 + 306 - 28, 1365, "ExpressRoute\nDirect\n(optional)");
  };
  er("erL", 788, ["Local", "Local", "Standard", "Standard"]);
  er("erR", 1620, ["Standard", "Standard", "Local", "Local"]);
  box("onprem", 1270, 1560, 500, 180, "On-premises\n172.16.0.0/16", { fill: TINT.onprem, size: 26 });
  line("er-l-onprem", "erL", "right", 1420, "onprem", "top", 1460);
  line("er-r-onprem", "erR", "left", 1420, "onprem", "top", 1580);

  // Hub to ExpressRoute: primary solid, backup dashed
  const cx = (z, i) => (z === "erL" ? 788 : 1620) + [72, 212, 342, 482][i];
  blue("p11", "hub11", 590, "erL-c0", cx("erL", 0), 870);
  blue("p12", "hub12", 1170, "erL-c1", cx("erL", 1), 900);
  blue("k11", "hub11", 690, "erR-c0", cx("erR", 0), 960, true);
  blue("k12", "hub12", 1230, "erR-c1", cx("erR", 1), 1000, true);
  blue("p21", "hub21", 1950, "erR-c2", cx("erR", 2), 870);
  blue("p22", "hub22", 2530, "erR-c3", cx("erR", 3), 900);
  blue("k21", "hub21", 2050, "erL-c2", cx("erL", 2), 1060, true);
  blue("k22", "hub22", 2590, "erL-c3", cx("erL", 3), 1100, true);

  // Numbered flows (red)
  red("f1", "fw1", "left", 650, "internet", "bottom", 100, [100]);
  red("f1b", "fw1", "top", 1 * 0 + 345, "vnet1", "bottom", 345);
  red("f2", "fw1", "left", 685, "onprem", "left", 1650, [60]);
  red("f2b", "fw1", "top", 375, "vnet1", "bottom", 375);
  red("f2r", "fw4", "right", 680, "onprem", "right", 1650, [2430]);
  red("f2rb", "fw4", "top", 2335, "vnet7", "bottom", 2335);
  red("f3", "vnet1", "top", 400, "vnet5", "top", 1760, [225], { tail: "arrow" });
  red("f4", "vnet1", "bottom", 420, "vnet2", "bottom", 590, [495], { tail: "arrow" });
  step("s1", 50, 300, 1);
  step("s2l", 12, 1200, 2);
  step("s2r", 2448, 1200, 2);
  step("s3", 1450, 172, 3);
  step("s4", 515, 500, 4);

  txt("legend", 2480, 1580, "Blue solid line: primary\nBlue dashed line: backup\nRed numbered arrows: traffic flows 1-4", { size: 18 });
  txt("footer", 40, 1790, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Massive-scale VWAN architecture design\"", { size: 20, color: "#495057" });
}
