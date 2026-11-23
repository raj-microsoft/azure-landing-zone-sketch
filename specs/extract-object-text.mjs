// 010 Extract text from objects using Power Automate and AI Builder. Redraw of the article's diagram.
export const meta = {
  num: 10,
  slug: "extract-object-text",
  title: "Extract text from objects using Power Automate and AI Builder",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/ai/extract-object-text",
  category: "AI + machine learning",
  status: "done",
  otherDiagrams: [],
  substitutions: {
    "Document Intelligence": "form-recognizers", "Search index": "cognitive-search", "AI processing": "cognitive-services",
    "Business automation": "workflow", "User experience (web page)": "browser", "User experience": "app-services",
  },
  differences: [
    "SharePoint, Teams, OneDrive, Microsoft 365, Power Automate and AI Builder are labelled sketch boxes (Microsoft 365 and Power Platform logos are not in the Azure sketch set).",
    "The original has no connecting arrows; the numbered steps are kept in the same positions.",
  ],
};

export function draw(k) {
  const { TINT, txt, zone, box, icon, card, step } = k;
  txt("title", 60, 10, "Extract text from objects using Power Automate and AI Builder", { size: 30 });
  zone("frame", 60, 70, 2200, 820, TINT.white, { stroke: "#adb5bd" });

  // Microsoft 365 column
  box("sp", 100, 110, 200, 100, "SharePoint", { fill: TINT.onprem, size: 20 });
  box("teams", 100, 280, 200, 100, "Microsoft Teams", { fill: TINT.onprem, size: 18 });
  box("od", 100, 450, 200, 100, "OneDrive", { fill: TINT.onprem, size: 20 });
  zone("bracket", 320, 110, 20, 560, "transparent", { stroke: "#343a40" });
  step("s2", 360, 115, 2);
  step("s7", 360, 630, 7);
  box("m365", 100, 720, 300, 120, "Microsoft 365", { fill: TINT.onprem, size: 22 });

  // AI processing
  box("aib", 480, 320, 240, 220, "AI Builder", { fill: TINT.onprem, size: 22 });
  step("s4", 580, 260, 4);
  step("s1", 500, 440, 1);
  card("di", 780, 320, 240, 220, "form-recognizers", "Document\nIntelligence", { size: 20 });
  step("s5", 880, 260, 5);
  card("fn", 1080, 320, 240, 220, "function-apps", "Azure\nFunctions", { size: 20 });
  step("s6", 1180, 260, 6);
  zone("ai-rule", 470, 690, 900, 6, "#868e96", { stroke: "#868e96" });
  card("ai", 700, 720, 440, 120, "cognitive-services", "AI processing", { size: 22, fill: TINT.sub });

  // Business automation
  box("pa", 1460, 90, 420, 200, "Power Automate", { fill: TINT.onprem, size: 22 });
  step("s3", 1410, 110, 3);
  card("search", 1530, 360, 280, 230, "cognitive-search", "Search index", { size: 20 });
  step("s8", 1650, 620, 8);
  zone("ba-rule", 1460, 690, 420, 6, "#868e96", { stroke: "#868e96" });
  card("ba", 1460, 720, 420, 120, "workflow", "Business\nautomation", { size: 22, fill: TINT.sub });

  // User experience
  card("web", 1960, 330, 260, 230, "browser", "Web page\n(PnP Modern Search)", { size: 18 });
  step("s9", 2070, 620, 9);
  zone("ux-rule", 1950, 690, 280, 6, "#868e96", { stroke: "#868e96" });
  card("ux", 1950, 720, 280, 120, "app-services", "User\nexperience", { size: 22, fill: TINT.sub });

  txt("footer", 60, 920, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Extract text from objects using Power Automate and AI Builder\"", { size: 20, color: "#495057" });
}
