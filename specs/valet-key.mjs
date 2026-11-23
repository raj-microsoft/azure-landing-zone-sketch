// 124 Valet Key pattern.
export const meta = {
  num: 124,
  slug: "valet-key",
  title: "Valet Key pattern",
  url: "https://learn.microsoft.com/azure/architecture/patterns/valet-key",
  category: "Design patterns",
  status: "done",
  otherDiagrams: ["img1: client accessing a storage account with a SAS token"],
  substitutions: { "Token": "keys" },
  differences: ["Circular nodes drawn as rounded boxes.", "User, application and target resource drawn as labelled shapes (generic glyphs)."],
};

export function draw(k) {
  const { TINT, txt, card, box, arrow, step } = k;
  const S = 16;
  const C = { color: "#3b5bdb" };
  box("user", 20, 60, 160, 110, "User", { fill: TINT.onprem, size: S });
  box("app", 640, 60, 180, 110, "Application", { fill: TINT.app, size: S });
  card("tok1", 440, 210, 130, 100, "keys", "Token", { size: S });
  card("tok2", 35, 300, 130, 100, "keys", "Token", { size: S });
  box("res", 20, 540, 160, 110, "Target resource", { fill: TINT.data, size: S });
  arrow("e1", "user", "right", 90, "app", "left", 90, [], C);
  txt("e1-l", 320, 40, "Request resource", { size: S, color: "#3b5bdb" });
  step("s1", 390, 104, 1);
  arrow("e2", "app", "right", 80, "app", "bottom", 760, [880, 200], C);
  step("s2", 890, 210, 2);
  txt("e2-l", 930, 60, "Check validity\nof request and\ngenerate\nkey token", { size: S, color: "#3b5bdb" });
  arrow("e3a", "app", "left", 150, "tok1", "right", 250, [610], { ...C, head: null });
  arrow("e3", "tok1", "left", 250, "user", "right", 150, [300], C);
  step("s3", 230, 190, 3);
  txt("e3-l", 250, 250, "Return token", { size: S, color: "#3b5bdb" });
  arrow("e4a", "user", "bottom", null, "tok2", "top", null, [], C);
  arrow("e4", "tok2", "bottom", null, "res", "top", null, [], C);
  step("s4", 120, 450, 4);
  txt("e4-l", 180, 445, "Access resource\nusing token", { size: S, color: "#3b5bdb" });
  txt("footer", 20, 690, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Typical valet key pattern workflow\"", { size: 20, color: "#495057" });
}
