// 009 AI inferencing with Silk virtual SAN. Redraw of the first architecture diagram.
export const meta = {
  num: 9,
  slug: "ai-inferencing-on-azure-iaas",
  title: "AI inferencing with Silk virtual SAN",
  url: "https://learn.microsoft.com/azure/architecture/ai-ml/architecture/ai-inferencing-on-azure-iaas",
  category: "AI + machine learning",
  status: "done",
  otherDiagrams: ["Silk virtual SAN architecture in a Silk Cloud Data Platform deployment"],
  substitutions: {
    "AI agent": "foundry-agent-service", "Inferencing models in AKS cluster": "kubernetes-services", "Azure OneLake": "data-lake-storage-gen1",
    "Operational database (Prod, Echo)": "sql-server", "Public endpoint": "public-ip-addresses", "Application": "virtual-machine",
  },
  differences: [
    "The neural-network drawing over the AKS cluster is a labelled card with the AKS sketch icon.",
    "Silk virtual SAN is a non-Azure labelled sketch shape; its compute and storage node glyphs are omitted.",
    "Diagonal arrows (fine tuning, historic data, public endpoint) are routed orthogonally.",
  ],
};

export function draw(k) {
  const { TINT, txt, zone, box, card, step, arrow, both } = k;
  txt("title", 60, 10, "AI inferencing with Silk virtual SAN", { size: 30 });

  card("aml", 40, 100, 220, 160, "machine-learning", "Azure\nMachine\nLearning", { fill: TINT.white });
  card("onelake", 40, 780, 220, 150, "data-lake-storage-gen1", "Azure\nOneLake");
  zone("vnet", 360, 70, 1600, 1460, TINT.sub, { stroke: "#1971c2" });
  txt("vnet-t", 1700, 90, "Azure VNet", { size: 22 });

  card("ag1", 660, 100, 180, 140, "foundry-agent-service", "AI agent");
  card("ag2", 940, 100, 180, 140, "foundry-agent-service", "AI agent");
  card("users1", 1440, 110, 200, 140, "users", "Users");
  card("models", 600, 400, 600, 400, "kubernetes-services", "Inferencing models\nin AKS cluster", { size: 22, fill: "#f3f0ff" });
  box("app", 1410, 560, 380, 220, "Application", { valign: "bottom", size: 22 });
  card("app-vm", 1520, 590, 160, 0 + 100, "virtual-machine", "VMs", { size: 16 });
  box("db", 690, 960, 520, 220, "Operational database\nMsv3/Esv6/Esv7", { size: 20 });
  k.iconCap("db-prod", "sql-server", 720, 1060, "Prod", { size: 56 });
  k.iconCap("db-echo", "sql-server", 1120, 1060, "Echo", { size: 56 });
  box("silk", 690, 1260, 520, 220, "Silk virtual SAN\n(compute nodes + storage nodes)", { size: 20, stroke: "#c2255c" });
  card("pub", 2080, 600, 220, 130, "public-ip-addresses", "Public endpoint");
  card("ag3", 2100, 330, 180, 140, "foundry-agent-service", "AI agent");
  card("users2", 2100, 900, 180, 140, "users", "Users");

  both("a-a", "ag1", "right", 170, "ag2", "left", 170);
  both("a2-u", "ag2", "right", 170, "users1", "left", 170);
  arrow("f4a", "models", "top", 750, "ag1", "bottom", 750); step("s4a", 680, 300, 4);
  arrow("f2a", "ag2", "bottom", 1030, "models", "top", 1030); step("s2a", 1050, 300, 2);
  arrow("f1u", "users1", "bottom", 1490, "app", "top", 1490); step("s1u", 1430, 380, 1);
  arrow("f5u", "app", "top", 1590, "users1", "bottom", 1590); step("s5u", 1610, 440, 5);
  arrow("f2api", "app", "left", 620, "models", "right", 620); step("s2b", 1260, 550, 2);
  arrow("f4api", "models", "right", 720, "app", "left", 720); step("s4b", 1260, 740, 4);
  txt("api-t", 1225, 650, "API calls", { size: 18 });
  arrow("f1pub", "pub", "left", 630, "app", "right", 630); step("s1p", 1880, 570, 1);
  arrow("f5pub", "app", "right", 720, "pub", "left", 700); step("s5p", 1880, 740, 5);
  both("pub-ag", "pub", "top", 2190, "ag3", "bottom", 2190);
  both("pub-u", "pub", "bottom", 2190, "users2", "top", 2190);
  both("f7", "aml", "right", 180, "models", "left", 450, [480]); step("s7", 400, 240, 7);
  txt("f7-t", 380, 140, "Fine tuning", { size: 18 });
  arrow("f3h", "onelake", "top", 150, "models", "left", 720, [], { firstDir: "v" }); step("s3h", 400, 660, 3);
  txt("f3h-t", 400, 720, "Historic data", { size: 18 });
  arrow("f1e", "db", "top", 820, "models", "bottom", 820); step("s1e", 760, 860, 1);
  txt("f1e-t", 840, 860, "Event\ntrigger", { size: 16 });
  arrow("f3c", "db", "top", 1080, "models", "bottom", 1080); step("s3c", 1000, 860, 3);
  txt("f3c-t", 1100, 860, "Current\ndata", { size: 16 });
  arrow("f6", "db", "left", 1060, "onelake", "bottom", 150, [], {}); step("s6", 420, 1000, 6);
  txt("f6-t", 470, 1000, "Async\nupdates", { size: 18 });
  arrow("db-silk", "silk", "top", 950, "db", "bottom", 950, [], { tail: "arrow" });

  txt("footer", 60, 1560, "Pencil-sketch redraw of the Azure Architecture Center diagram \"AI inferencing with Silk virtual SAN\"", { size: 20, color: "#495057" });
}
