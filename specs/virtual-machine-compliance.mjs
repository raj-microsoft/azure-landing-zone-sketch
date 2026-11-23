// 043 Manage virtual machine compliance.
export const meta = {
  num: 43,
  slug: "virtual-machine-compliance",
  title: "Manage virtual machine compliance",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/security/virtual-machine-compliance",
  category: "Security",
  status: "done",
  otherDiagrams: ["Compliance management with Azure Policy and machine configuration"],
  substitutions: { "Microsoft Marketplace": "marketplace", "Marketplace image": "vm-images-classic", "VM Image Builder": "image-templates", "Image tattooing": "image-definitions", "Automated tests": "test-base", "Image versions": "image-versions", "Compute Gallery": "shared-image-galleries" },
  differences: ["Builder, tattooing and test stages get text captions taken from the article; the official diagram shows them as VM icons with badges only."],
};

export function draw(k) {
  const { txt, card, step, arrow } = k;
  txt("title", 60, 10, "Manage VM compliance: golden image publishing process", { size: 30 });
  card("mkt", 80, 100, 240, 170, "marketplace", "Microsoft Marketplace");
  card("mimg", 80, 480, 240, 170, "vm-images-classic", "Microsoft\nMarketplace image");
  card("vib", 560, 480, 240, 170, "image-templates", "VM Image Builder\n(customize)", { size: 16 });
  card("tat", 1020, 480, 240, 170, "image-definitions", "Image tattooing", { size: 16 });
  card("tst", 1020, 840, 240, 170, "test-base", "Automated tests", { size: 16 });
  card("ver", 1480, 480, 240, 170, "image-versions", "Image versions");
  card("gal", 1480, 100, 240, 170, "shared-image-galleries", "Compute Gallery");

  arrow("a1", "mkt", "bottom", 200, "mimg", "top", 200);
  step("s1", 120, 350, 1);
  arrow("a2", "mimg", "right", 565, "vib", "left", 565);
  step("s2", 410, 500, 2);
  arrow("a3", "vib", "right", 565, "tat", "left", 565);
  step("s3", 870, 500, 3);
  arrow("a4", "tat", "bottom", 1140, "tst", "top", 1140);
  step("s4", 1060, 720, 4);
  arrow("a5", "tst", "left", 925, "vib", "bottom", 680);
  step("s5", 600, 720, 5);
  arrow("a6", "tst", "right", 925, "ver", "bottom", 1600);
  step("s6", 1520, 720, 6);
  arrow("a7", "ver", "top", 1600, "gal", "bottom", 1600);
  step("s7", 1520, 350, 7);

  txt("footer", 60, 1080, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Manage virtual machine compliance\"", { size: 20, color: "#495057" });
}
