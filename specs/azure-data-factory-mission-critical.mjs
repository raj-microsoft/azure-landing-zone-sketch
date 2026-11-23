// 112 Mission-critical Azure Data Factory architecture.
export const meta = {
  num: 112,
  slug: "azure-data-factory-mission-critical",
  title: "Mission-critical Azure Data Factory architecture",
  url: "https://learn.microsoft.com/azure/architecture/databases/architecture/azure-data-factory-mission-critical",
  category: "Analytics",
  status: "done",
  otherDiagrams: ["img1: hardened network design"],
  substitutions: { "Web App for Containers": "app-services", "Bronze / Data Lake Storage": "data-lake-storage-gen1", "Azure Front Door": "front-door-and-cdn-profiles", "Azure DNS": "dns-zones", "Jump hosts / Self-hosted build agents": "virtual-machine", "Private endpoint glyph": "private-endpoints" },
  differences: ["Private endpoint glyphs next to Key Vault and Data Lake Storage drawn as separate small cards."],
};

export function draw(k) {
  const { TINT, txt, card, group, step } = k;
  const S = 16;
  const C = (id, x, y, ic, l, w = 180, h = 130) => card(id, x, y, w, h, ic, l, { size: S });
  const G = (id, x, y, w, h, title, fill = TINT.white) => { group(id, x, y, w, h, null, { fill }); txt(`${id}-lbl`, x + 20, y + 10, title, { size: 18 }); };
  txt("title", 40, 0, "Mission-critical Data Factory architecture", { size: 28 });
  group("az", 40, 60, 2060, 1140, null, { fill: TINT.white, dashed: true });
  txt("az-lbl", 60, 70, "Azure", { size: 22 });

  G("dp", 70, 160, 520, 560, "Data platform", TINT.onprem);
  step("s1", 550, 108, 1);
  G("dt", 90, 210, 230, 220, "Data transfer");
  C("adf", 110, 260, "data-factories", "Azure Data\nFactory", 190, 140);
  G("dls", 340, 210, 230, 220, "Data Lake Storage");
  C("bz", 360, 260, "data-lake-storage-gen1", "Bronze", 190, 140);
  G("aa", 90, 460, 480, 240, "Advanced Analytics");
  C("acr0", 110, 520, "container-registries", "Azure Container\nRegistry", 210, 150);
  C("web0", 340, 520, "app-services", "Web App for\nContainers", 210, 150);
  G("ci", 70, 790, 300, 230, "CI/CD", TINT.onprem);
  step("s2", 330, 738, 2);
  C("devops", 110, 850, "azure-devops", "Azure DevOps", 200, 140);

  group("mc", 640, 120, 1430, 1050, null, { fill: TINT.sub });
  txt("mc-lbl", 660, 130, "Mission-critical solution", { size: 20 });
  step("s3", 2020, 72, 3);
  G("gr", 960, 170, 820, 240, "Global resources");
  C("afd", 980, 220, "front-door-and-cdn-profiles", "Azure\nFront Door", 170, 160);
  C("acr", 1170, 220, "container-registries", "Azure Container\nRegistry", 170, 160);
  G("gm", 1360, 200, 400, 200, "Monitoring");
  C("gla", 1380, 245, "log-analytics-workspaces", "Log Analytics", 170, 140);
  C("gdl", 1570, 245, "data-lake-storage-gen1", "Data Lake\nStorage", 170, 140);
  step("s4", 1790, 160, 4);

  const region = (p, x, label) => {
    G(`${p}r`, x, 450, 590, 700, label);
    G(`${p}st`, x + 20, 500, 320, 630, label === "Region 1" ? "Service stamp 1" : "Service stamp n");
    C(`${p}web`, x + 40, 545, "app-services", "Web App for\nContainers", 280, 120);
    C(`${p}kv`, x + 40, 680, "key-vaults", "Azure Key Vault", 140, 130);
    C(`${p}pe1`, x + 190, 680, "private-endpoints", "Private\nendpoint", 130, 130);
    C(`${p}dl`, x + 40, 825, "data-lake-storage-gen1", "Data Lake\nStorage", 140, 130);
    C(`${p}pe2`, x + 190, 825, "private-endpoints", "Private\nendpoint", 130, 130);
    C(`${p}dns`, x + 40, 970, "dns-zones", "Azure DNS", 280, 130);
    G(`${p}m`, x + 360, 500, 210, 630, "Monitoring");
    C(`${p}la`, x + 375, 545, "log-analytics-workspaces", "Log\nAnalytics", 180, 150);
    C(`${p}ai`, x + 375, 715, "application-insights", "Azure\nApplication\nInsights", 180, 170);
    C(`${p}mdl`, x + 375, 905, "data-lake-storage-gen1", "Data Lake\nStorage", 180, 150);
  };
  region("a", 670, "Region 1");
  step("s5", 1220, 410, 5);
  step("s6", 1000, 455, 6);
  region("b", 1280, "Region n");
  G("sup", 1890, 450, 160, 700, "Support");
  step("s7", 2000, 410, 7);
  C("bas", 1900, 500, "bastions", "Azure\nBastion", 140, 140);
  C("jh", 1900, 680, "virtual-machine", "Jump hosts", 140, 140);
  C("sh", 1900, 860, "virtual-machine", "Self-hosted\nbuild\nagents", 140, 170);
  txt("footer", 40, 1240, "Pencil-sketch redraw of the Azure Architecture Center diagram \"design for a mission-critical workload\"", { size: 20, color: "#495057" });
}
