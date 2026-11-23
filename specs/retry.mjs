// 113 Retry pattern.
export const meta = {
  num: 113,
  slug: "retry",
  title: "Retry pattern",
  url: "https://learn.microsoft.com/azure/architecture/patterns/retry",
  category: "Design patterns",
  status: "done",
  otherDiagrams: [],
  substitutions: {},
  differences: ["Conceptual pattern diagram with no Azure products: Application (gear) and Hosted service (globe) are labelled sketch shapes; the failure glyph is a text marker."],
};

export function draw(k) {
  const { TINT, txt, box, arrow, step } = k;
  const BLUE = "#1971c2";
  txt("title", 40, 0, "Retry pattern", { size: 28 });
  box("app", 40, 90, 260, 380, "Application", { size: 22, fill: TINT.sub, type: "ellipse" });
  box("svc", 900, 90, 260, 380, "Hosted service", { size: 22, fill: TINT.app, type: "ellipse" });
  [[0, "500", true], [1, "500", true], [2, "200", false]].forEach(([i, code, fail]) => {
    const y = 150 + i * 120;
    step(`s${i + 1}`, 360, y - 60, i + 1);
    arrow(`r${i}`, "app", "right", y, "svc", "left", y, [], { color: BLUE });
    if (fail) txt(`x${i}`, 720, y - 32, "fails", { size: 16, color: "#c92a2a" });
    arrow(`p${i}`, "svc", "left", y + 50, "app", "right", y + 50, [], { color: BLUE });
    txt(`c${i}`, 430, y + 22, code, { size: 18, color: BLUE });
  });
  box("note", 40, 520, 1120, 260,
    "1: Application invokes operation on hosted service. The request fails, and the\nservice host responds with HTTP response code 500 (internal server error).\n2: Application waits for a short interval and tries again. The request still fails\nwith HTTP response code 500.\n3: Application waits for a longer interval and tries again. The request succeeds\nwith HTTP response code 200 (OK).",
    { size: 18, align: "left", fill: TINT.white });
  txt("footer", 40, 820, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Retry pattern\"", { size: 20, color: "#495057" });
}
