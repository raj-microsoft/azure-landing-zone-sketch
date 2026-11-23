// 107 Virtual WAN architecture optimized for department-specific requirements.
export const meta = {
  num: 107,
  slug: "performance-security-optimized-vwan",
  title: "Virtual WAN architecture optimized for department-specific requirements",
  url: "https://learn.microsoft.com/azure/architecture/networking/guide/performance-security-optimized-vwan",
  category: "Networking",
  status: "done",
  otherDiagrams: ["img1: traffic pathways", "img2: cross-regional traffic problem"],
  substitutions: { "VNet1-4 / NVA VNets": "virtual-networks", "NVA1 / NVA2": "virtual-machine", "Virtual WAN hub": "virtual-wan-hub", "ExpressRoute": "expressroute-circuits" },
  differences: ["Diagonal connections redrawn orthogonally; the line hop where peering crosses a hub connection is avoided by routing VNet4's hub connection round the right side.", "Branch building and firewall glyphs drawn as a labelled on-premises shape.", "Route tables drawn as sketch grids."],
};

export function draw(k) {
  const { TINT, txt, card, group, box, arrow, poly } = k;
  const S = 16;
  const BLUE = "#1971c2", ORANGE = "#e8590c";
  const ln = (id, f, fs, fa, t, ts, ta, lanes = [], o = {}) => arrow(id, f, fs, fa, t, ts, ta, lanes, { head: null, color: BLUE, ...o });
  txt("title", 40, 0, "Performance- and security-optimized Virtual WAN", { size: 28 });

  group("az", 40, 60, 1200, 960, null, { fill: TINT.white });
  txt("az-lbl", 60, 70, "Azure", { size: 20 });
  group("sec", 70, 110, 570, 610, null, { fill: TINT.onprem });
  txt("sec-lbl", 90, 120, "Security optimized", { size: 20 });
  card("v1", 110, 170, 200, 150, "virtual-networks", "VNet1\n10.1.1.0/24", { size: S });
  card("v2", 390, 170, 200, 150, "virtual-networks", "VNet2\n10.1.2.0/24", { size: S });
  card("n1", 230, 430, 220, 170, "virtual-machine", "NVA1\nNVA VNet1\n10.3.1.0/24", { size: S });
  group("perf", 680, 110, 530, 610, null, { fill: TINT.onprem });
  txt("perf-lbl", 700, 120, "Performance optimized", { size: 20 });
  card("v3", 720, 170, 200, 150, "virtual-networks", "VNet3\n10.2.1.0/24", { size: S });
  card("v4", 980, 170, 200, 150, "virtual-networks", "VNet4\n10.2.2.0/24", { size: S });
  card("n2", 970, 430, 200, 170, "virtual-machine", "NVA2\nNVA VNet2\n10.4.0.0/24", { size: S });
  card("hub", 560, 800, 200, 150, "virtual-wan-hub", "Virtual WAN hub", { size: S });

  card("er", 560, 1080, 200, 130, "expressroute-circuits", "ExpressRoute", { size: S });
  box("br", 550, 1290, 220, 120, "Branch\n10.179.0.0/16", { size: 18, fill: TINT.onprem });

  ln("c1", "v1", "bottom", 210, "n1", "top", 280, [380]);
  ln("c2", "v2", "bottom", 490, "n1", "top", 400, [390]);
  ln("c-sec", "n1", "bottom", 340, "hub", "left", 850, [850]);
  txt("sec-c-lbl", 360, 755, "secOptConnection", { size: 18 });
  ln("c3", "v3", "bottom", 780, "hub", "top", 640, [750]);
  ln("p3", "v3", "bottom", 880, "n2", "left", 515, [515], { color: ORANGE });
  ln("p4", "v4", "bottom", 1070, "n2", "top", 1070, [], { color: ORANGE });
  ln("c-perf", "n2", "bottom", 1050, "hub", "right", 860, [860]);
  ln("c4", "v4", "right", 245, "hub", "right", 900, [1200, 900]);
  txt("perf-c-lbl", 800, 960, "perfOptConnection", { size: 18 });
  ln("c-er", "hub", "bottom", 660, "er", "top", 660, [], { color: "#343a40" });
  ln("c-br", "er", "bottom", 660, "br", "top", 660, [], { color: "#343a40" });

  // Route tables
  const W = [230, 180, 200, 250];
  const tbl = (id, x, y, title, rows) => {
    txt(`${id}-t`, x, y, title, { size: 20 });
    [["Name", "Address prefix", "Next hop type", "Next hop IP address"], ...rows].forEach((r, ri) => {
      let cx = x;
      r.forEach((c, ci) => { box(`${id}-${ri}-${ci}`, cx, y + 40 + ri * 60, W[ci], 60, c, { size: 16, fill: ri === 0 ? TINT.sub : TINT.white }); cx += W[ci]; });
    });
  };
  tbl("t1", 1300, 80, "UDR route table for all subnets in VNet1 and VNet2", [["rt-to-secOptimized", "10.1.0.0/16", "Virtual appliance", "<ip address NVA1>"]]);
  tbl("t2", 1300, 290, "UDR route table for all subnets in VNet3 and VNet4", [["rt-to-internet", "0.0.0.0/0", "Virtual appliance", "<ip address NVA2>"], ["vnet-to-vnet", "10.2.0.0/16", "Virtual appliance", "<ip address NVA2>"]]);
  tbl("t3", 1300, 560, "Static routes on secOptConnection", [["rt-to-secOptimized", "10.1.0.0/16", "Virtual appliance", "<ip address NVA1>"]]);
  txt("t4", 1300, 770, "Static routes on perfOptConnection\nNone", { size: 20 });

  poly("lg1", [[1300, 1130], [1400, 1130]], { color: BLUE });
  txt("lg1-t", 1420, 1118, "Hub virtual network connection", { size: 18 });
  poly("lg2", [[1300, 1180], [1400, 1180]], { color: ORANGE });
  txt("lg2-t", 1420, 1168, "Virtual network peering", { size: 18 });
  txt("footer", 40, 1460, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Virtual WAN optimized for security or performance\"", { size: 20, color: "#495057" });
}
