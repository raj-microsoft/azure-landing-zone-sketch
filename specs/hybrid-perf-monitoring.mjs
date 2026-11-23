// 140 Hybrid availability and performance monitoring.
export const meta = {
  num: 140,
  slug: "hybrid-perf-monitoring",
  title: "Hybrid availability and performance monitoring",
  url: "https://learn.microsoft.com/azure/architecture/hybrid/hybrid-perf-monitoring",
  category: "Hybrid",
  status: "done",
  otherDiagrams: [],
  substitutions: { "VM 1-6 / Application server": "virtual-machine", "Log Analytics gateway": "log-analytics-workspaces", "Firewall (public IP)": "firewalls", "Router": "virtual-router", "Azure Monitor metrics": "metrics", "Log Analytics workspace": "log-analytics-workspaces", "Alerts": "alerts", "Virtual machine scale sets and extension": "vm-scale-sets" },
  differences: ["Autoscale, Partner integrations, Insights/Analysis/Visualizations/Integrations/Actions drawn as labelled shapes (no sketch icon for Autoscale or partner integrations).", "Line-style legend shown as a text box; TCP 443 labels, defender shields, VM extension glyphs and the third-party cloud glyph omitted.", "The blue dashed bus between metrics/workspace and the function column is drawn as separate arrows; application server to metrics link omitted."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow } = k;
  const S = 16;
  const D = { dashed: true, color: "#1971c2" };
  const DOT = { dashed: true, color: "#495057" };
  group("tp", 20, 60, 640, 480, "Third-party cloud provider", { fill: TINT.onprem });
  txt("pip1", 270, 110, "Public IP address", { size: S });
  card("vm5", 50, 110, 180, 140, "virtual-machine", "VM 5\nWeb app\nand agents", { size: S });
  card("vm6", 50, 340, 180, 140, "virtual-machine", "VM 6\nDatastore\nand agents", { size: S });
  card("lag1", 270, 220, 170, 130, "log-analytics-workspaces", "Log Analytics\ngateway", { size: S });
  card("fw1", 470, 220, 160, 130, "firewalls", "Firewall", { size: S });
  group("main", 20, 660, 640, 720, "On-premises main office", { fill: TINT.onprem });
  txt("pip2", 270, 720, "Public IP address", { size: S });
  card("vm1", 50, 710, 180, 140, "virtual-machine", "VM 1\nWeb app\nand agents", { size: S });
  card("vm2", 50, 920, 180, 150, "virtual-machine", "VM 2\nBusiness logic\nand agents", { size: S });
  card("vm3", 50, 1150, 180, 140, "virtual-machine", "VM 3\nData store\nand agents", { size: S });
  card("lag2", 270, 920, 170, 130, "log-analytics-workspaces", "Log Analytics\ngateway", { size: S });
  card("fw2", 470, 920, 160, 130, "firewalls", "Firewall", { size: S });
  card("rt", 240, 1420, 180, 120, "virtual-router", "Router", { size: S });
  group("branch", 20, 1590, 640, 260, "On-premises branch office", { fill: TINT.onprem });
  txt("pip3", 300, 1660, "Public IP address", { size: S });
  card("vm4", 50, 1650, 200, 150, "virtual-machine", "VM 4\nVM and agents", { size: S });
  box("legend", 800, 40, 760, 330, "Legend\n\u2014\u2014 solid: within on-premises, or on-premises to Azure\n\u2013 \u2013 long dash: on-premises to Azure Monitor metrics\n- - blue dash: within Azure\n\u00b7\u00b7\u00b7 dotted: within third-party cloud, or third-party cloud to Azure\n\u00b7\u00b7\u00b7 grey dotted: Azure to partner integrations", { fill: TINT.white, size: S, align: "left" });
  group("az", 760, 560, 1380, 1120, "Azure", { fill: TINT.sub });
  group("mon", 800, 660, 1080, 680, "Azure Monitor", { fill: TINT.white, iconName: "monitor" });
  card("metrics", 840, 720, 220, 140, "metrics", "Azure Monitor\nmetrics", { size: S });
  card("law", 840, 950, 220, 150, "log-analytics-workspaces", "Log Analytics\nworkspace", { size: S });
  const fn = ["Insights", "Analysis", "Visualizations", "Integrations", "Actions"];
  ["ins", "ana", "vis", "integ", "act"].forEach((id, i) => box(id, 1120, 720 + i * 110, 200, 70, fn[i], { fill: TINT.hub, size: S }));
  box("insd", 1380, 710, 470, 90, "1. Application Insights: availability ping test\n2. Azure Monitor for VMs", { fill: TINT.onprem, size: S, align: "left" });
  box("anad", 1380, 815, 470, 110, "1. Azure Monitor for VMs: Map\n2. Storage\n3. Networks", { fill: TINT.onprem, size: S, align: "left" });
  box("visd", 1380, 940, 470, 70, "In-box visualizations", { fill: TINT.onprem, size: S, align: "left" });
  box("autos", 1380, 1150, 180, 120, "Autoscale", { fill: TINT.app, size: S });
  card("alerts", 1620, 1150, 200, 120, "alerts", "Alerts", { size: S });
  box("partner", 1920, 800, 190, 140, "Partner\nintegrations", { fill: TINT.hub, size: S });
  card("app", 820, 1400, 220, 150, "virtual-machine", "Application server\nand agents", { size: S });
  card("vmss", 1100, 1400, 250, 150, "vm-scale-sets", "Virtual machine scale\nsets and extension", { size: S });
  // third-party cloud
  arrow("t5", "vm5", "right", 200, "lag1", "left", 260, [250], DOT);
  arrow("t6", "vm6", "right", 400, "lag1", "left", 320, [250], DOT);
  arrow("t7", "lag1", "right", 285, "fw1", "left", 285, [], DOT);
  arrow("t1", "fw1", "right", 300, "metrics", "left", 760, [710], {});
  // main office
  arrow("m1", "vm1", "right", 780, "lag2", "top", 330, [], {});
  arrow("m2", "vm2", "right", 985, "lag2", "left", 985, [], {});
  arrow("m3", "vm3", "right", 1220, "lag2", "bottom", 330, [], {});
  arrow("m4", "lag2", "right", 985, "fw2", "left", 985, [], {});
  arrow("m5", "fw2", "right", 1000, "law", "left", 1000, [], {});
  arrow("m6", "fw2", "right", 960, "metrics", "left", 820, [740], { dashed: true });
  arrow("rt1", "rt", "top", 330, "main", "bottom", 330, [], { tail: "arrow" });
  arrow("rt2", "rt", "bottom", 330, "branch", "top", 330, [], { tail: "arrow" });
  arrow("b4", "vm4", "right", 1700, "law", "left", 1070, [720], {});
  // Azure Monitor internals
  arrow("f1", "metrics", "right", 755, "ins", "left", 755, [], D);
  arrow("f2", "metrics", "right", 820, "ana", "left", 865, [1090], D);
  arrow("f3", "law", "right", 975, "vis", "left", 975, [], { ...D, tail: "arrow" });
  arrow("f4", "law", "right", 1040, "integ", "left", 1085, [1090], D);
  arrow("f5", "law", "right", 1080, "act", "left", 1195, [1070], D);
  arrow("d1", "ins", "right", 755, "insd", "left", 755, [], D);
  arrow("d2", "ana", "right", 865, "anad", "left", 865, [], D);
  arrow("d3", "vis", "right", 975, "visd", "left", 975, [], D);
  arrow("d4", "act", "right", 1210, "autos", "left", 1210, [], D);
  arrow("d5", "act", "right", 1180, "alerts", "top", 1660, [1340, 1120], D);
  arrow("p1", "visd", "right", 975, "partner", "bottom", 1980, [], DOT);
  arrow("p2", "integ", "right", 1085, "partner", "bottom", 2020, [], DOT);
  arrow("p3", "alerts", "top", 1720, "partner", "bottom", 2060, [1110], DOT);
  arrow("x1", "app", "top", 900, "law", "bottom", 900, [], D);
  arrow("x2", "vmss", "top", 1110, "law", "bottom", 1030, [1360], D);
  arrow("x3", "autos", "bottom", 1470, "vmss", "right", 1480, [], D);
  arrow("x4", "alerts", "bottom", 1660, "app", "bottom", 930, [1620], D);
  // back to on-premises and third-party
  arrow("r1", "insd", "top", 1600, "vm1", "right", 740, [620, 690], {});
  arrow("r2", "insd", "top", 1640, "vm5", "right", 160, [480, 690], DOT);
  arrow("r3", "alerts", "right", 1200, "tp", "right", 100, [2180, 450, 670], DOT);
  arrow("r4", "alerts", "bottom", 1680, "main", "right", 1300, [1720, 690], {});
  arrow("r5", "alerts", "bottom", 1760, "branch", "right", 1800, [], {});
  txt("footer", 20, 1900, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Monitoring and availability functions of Azure Monitor\"", { size: 20, color: "#495057" });
}
