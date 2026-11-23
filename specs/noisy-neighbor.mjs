// 082 Noisy Neighbor antipattern.
export const meta = {
  num: 82,
  slug: "noisy-neighbor",
  title: "Noisy Neighbor antipattern",
  url: "https://learn.microsoft.com/azure/architecture/antipatterns/noisy-neighbor/noisy-neighbor",
  category: "Design guidance",
  status: "done",
  otherDiagrams: ["Three tenants each below max throughput that together consume all system resources (noisy-neighbor-multiple.png)"],
  substitutions: {},
  differences: ["Conceptual chart diagram: axes, capacity line and usage curves are drawn as freehand lines rather than Azure components.", "The red failure cross is a plain labelled sketch shape (no matching sketch icon)."],
};

export function draw(k) {
  const { TINT, txt, group, card, poly } = k;
  const BLUE = "#1864ab";
  txt("title", 40, 10, "Noisy Neighbor antipattern", { size: 30 });
  const panel = (p, x, name) => {
    group(p, x, 70, 640, 560, null, { fill: TINT.sub });
    txt(`${p}-name`, x + 320, 84, name, { size: 22, align: "center" });
    txt(`${p}-y`, x + 24, 130, "Resource\nusage", { size: 18 });
    txt(`${p}-x`, x + 560, 580, "Time", { size: 18 });
    poly(`${p}-ax`, [[x + 40, 200], [x + 40, 570], [x + 540, 570]], { head: null });
    poly(`${p}-ay`, [[x + 40, 570], [x + 40, 190]]); poly(`${p}-ayh`, [[x + 30, 205], [x + 40, 190], [x + 50, 205]]);
    poly(`${p}-axh`, [[x + 540, 570], [x + 620, 570]]); poly(`${p}-axa`, [[x + 605, 560], [x + 620, 570], [x + 605, 580]]);
    txt(`${p}-cap`, x + 60, 222, "Total system capacity", { size: 18 });
    poly(`${p}-capl`, [[x + 50, 262], [x + 620, 262]], { dashed: true, width: 1.5 });
  };
  panel("ta", 40, "Tenant A");
  panel("tb", 720, "Tenant B");
  // Tenant A: usage peaks at total capacity
  poly("ta-curve", [[90, 500], [200, 400], [330, 264], [440, 330], [560, 520]], { color: BLUE, smooth: true, width: 3 });
  // Tenant B: rising usage, then failures while A consumes the capacity
  poly("tb-curve", [[770, 520], [1010, 445]], { color: BLUE, width: 3 });
  k.zone("fail", 1030, 264, 130, 304, "#ffc9c9", { stroke: "#e03131" }); poly("failx1", [[1070, 300], [1120, 350]], { color: "#e03131", width: 5 }); poly("failx2", [[1120, 300], [1070, 350]], { color: "#e03131", width: 5 }); txt("fail-lbl", 1095, 390, "Failures", { size: 20, align: "center" });
  txt("footer", 40, 660, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Noisy Neighbor antipattern\" (resource usage of two tenants)", { size: 18, color: "#495057" });
}
