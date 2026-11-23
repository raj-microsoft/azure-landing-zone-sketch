// 008 Automate API Management configuration by using APIOps CLI. Redraw of the article's diagram.
export const meta = {
  num: 8,
  slug: "automated-api-deployments-apiops",
  title: "Automate API Management configuration by using APIOps CLI",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/devops/automated-api-deployments-apiops",
  category: "Integration + DevOps",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Git repository branch": "tfs-vc-repository", "CI/CD workflow": "builds", "API Management artifacts (file)": "file" },
  differences: [
    "The Git and CI/CD glyphs are replaced by the tfs-vc-repository and builds sketch icons (no third-party logos).",
    "Command lines (apiops extract / publish) are written in boxes with the hand-drawn font, not monospace.",
  ],
};

export function draw(k) {
  const { TINT, txt, zone, group, box, icon, card, step, badge, arrow } = k;
  txt("title", 60, 20, "APIOps: automate API Management configuration", { size: 30 });

  // A and B inputs
  group("a", 60, 100, 560, 330, "", { fill: TINT.white, stroke: "#343a40" });
  badge("a-b", 80, 120, "A", { w: 120, h: 64 });
  txt("a-t", 215, 128, "Source API Management\nExisting configuration", { size: 22 });
  icon("a-i", "api-management-services", 100, 260, 96);
  group("ex", 690, 160, 340, 220, "", { fill: TINT.white, stroke: "#343a40" });
  txt("ex-t", 860, 180, "Extract first", { size: 22, align: "center" });
  box("ex-c", 715, 250, 290, 70, "apiops extract", { size: 20, fill: TINT.sub, stroke: "#1971c2" });

  group("b", 60, 530, 900, 330, "", { fill: TINT.white, stroke: "#343a40" });
  badge("b-b", 80, 550, "B", { w: 120, h: 64 });
  txt("b-t", 215, 553, "CLI-compatible API Management artifacts\nCode-first authoring in Git", { size: 22 });
  icon("b-i", "file", 100, 680, 96);
  txt("b-l", 230, 660, "API Management artifacts:\n• JSON information files\n• Policy XML\n• API specifications", { size: 20 });

  // Version control and approval
  zone("vc", 1100, 100, 720, 840, TINT.hub, { stroke: "#4a6b8a" });
  txt("vc-t", 1130, 120, "Version control and approval", { size: 24 });
  box("c1", 1140, 190, 640, 200, "Create configuration change\nGit repository branch", { size: 22 });
  icon("c1-i", "tfs-vc-repository", 1165, 210, 72);
  step("s1", 1180, 320, 1);
  box("c2", 1140, 480, 640, 160, "Review and validate\nPull request checks and review", { size: 22 });
  step("s2", 1165, 540, 2);
  box("c3", 1140, 730, 640, 160, "Approve immutable\ndeployment input\nApproved commit", { size: 22 });
  step("s3", 1165, 790, 3);

  // Controlled deployment
  zone("cd", 1900, 100, 600, 1110, TINT.hub, { stroke: "#4a6b8a" });
  txt("cd-t", 1930, 120, "Controlled deployment", { size: 24 });
  card("d0", 1940, 190, 520, 170, "builds", "CI/CD workflow", { size: 22 });
  box("d4", 1940, 450, 520, 180, "Preview with dry run\n\n", { size: 22, valign: "top" });
  step("s4", 1960, 465, 4);
  box("d4-c", 1965, 545, 470, 64, "apiops publish --dry-run", { size: 20, fill: TINT.white, stroke: "#1971c2" });
  box("d5", 1940, 720, 520, 180, "Publish and promote\n\n", { size: 22, valign: "top" });
  step("s5", 1960, 735, 5);
  box("d5-c", 2045, 815, 310, 64, "apiops publish", { size: 20, fill: TINT.white, stroke: "#1971c2" });
  box("d6", 1940, 990, 520, 190, "Validate and reconcile\nTarget API Management", { size: 22 });
  step("s6", 1960, 1010, 6);
  icon("d6-i", "api-management-services", 2370, 1000, 64);

  arrow("f-a-ex", "a", "right", 270, "ex", "left", 270);
  arrow("f-ex-vc", "ex", "right", 270, "vc", "left", 270);
  arrow("f-b-vc", "b", "right", 695, "vc", "left", 695);
  arrow("f-12", "c1", "bottom", 1460, "c2", "top", 1460);
  arrow("f-23", "c2", "bottom", 1460, "c3", "top", 1460);
  arrow("f-3d", "c3", "right", 810, "d0", "left", 275, [1860]);
  arrow("f-04", "d0", "bottom", 2200, "d4", "top", 2200);
  arrow("f-45", "d4", "bottom", 2200, "d5", "top", 2200);
  arrow("f-56", "d5", "bottom", 2200, "d6", "top", 2200);

  txt("footer", 60, 1240, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Automate API Management configuration by using APIOps CLI\"", { size: 20, color: "#495057" });
}
