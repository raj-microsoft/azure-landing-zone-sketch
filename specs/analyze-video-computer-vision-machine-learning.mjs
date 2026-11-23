// 072 Automate video analysis by using Azure Machine Learning and Azure Vision in Foundry Tools.
export const meta = {
  num: 72,
  slug: "analyze-video-computer-vision-machine-learning",
  title: "Automate video analysis by using Azure Machine Learning and Azure Vision in Foundry Tools",
  url: "https://learn.microsoft.com/azure/architecture/ai-ml/architecture/analyze-video-computer-vision-machine-learning",
  category: "AI + machine learning",
  status: "done",
  otherDiagrams: ["Automated video analysis by using Video Indexer"],
  substitutions: { "Video files": "video-analyzers", "Machine learning storage account": "storage-accounts", "Jupyter Notebook": "code", "Azure Machine Learning": "azure-machine-learning", "Inference cluster": "kubernetes-services", "Picture files": "image", "Azure Data Lake Storage": "data-lake-storage-gen1", "Azure Logic Apps": "logic-apps", "Custom Vision API": "custom-vision", "Azure AI Vision API": "computer-vision", "Power BI": "power-bi-embedded" },
  differences: ["FFmpeg, the JSON glyph and Microsoft Fabric are text labels or plain sketch shapes (no sketch icon)."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, step } = k;
  txt("title", 40, 10, "Automate video analysis with Azure Machine Learning and Azure Vision", { size: 30 });

  group("ing", 40, 90, 380, 1000, "Ingest", { fill: TINT.sub, stroke: "#a5d8ff", size: 20, align: "center" });
  card("vid", 110, 180, 240, 170, "video-analyzers", "Video files");
  card("mlst", 80, 460, 300, 200, "storage-accounts", "Machine learning\nstorage account");
  arrow("v-m", "vid", "bottom", 230, "mlst", "top", 230);
  step("s1", 260, 380, 1);

  group("tr", 470, 90, 1080, 1000, "Transform", { fill: TINT.sub, stroke: "#a5d8ff", size: 20, align: "center" });
  group("mlbox", 620, 170, 380, 860, null, { fill: TINT.white });
  card("nb", 660, 200, 300, 200, "code", "Jupyter\nNotebook");
  card("aml", 660, 450, 300, 200, "azure-machine-learning", "Azure Machine\nLearning");
  card("inf", 660, 780, 300, 200, "kubernetes-services", "Inference cluster");
  arrow("ml-st", "mlbox", "left", 520, "mlst", "right", 520);
  arrow("st-ml", "mlst", "right", 600, "mlbox", "left", 600);
  txt("pipe-lbl", 482, 640, "Machine\nlearning\npipeline", { size: 16 });
  step("s2", 520, 440, 2);

  card("pics", 1180, 250, 300, 200, "image", "Picture files");
  arrow("ml-pic", "mlbox", "right", 350, "pics", "left", 350);
  step("s3", 1040, 260, 3);
  txt("ff-lbl", 1030, 380, "FFmpeg run", { size: 16 });
  card("adls", 1180, 620, 300, 200, "data-lake-storage-gen1", "Azure Data\nLake Storage");
  arrow("pic-adls", "pics", "bottom", 1330, "adls", "top", 1330);
  step("s4", 1360, 500, 4);

  group("es", 1600, 90, 1000, 1000, "Enrich and serve", { fill: TINT.sub, stroke: "#a5d8ff", size: 20, align: "center" });
  group("lbox", 1660, 200, 480, 820, null, { fill: TINT.white });
  card("la", 1750, 230, 300, 200, "logic-apps", "Azure Logic Apps");
  card("cv", 1680, 740, 210, 220, "custom-vision", "Custom\nVision API");
  card("vis", 1910, 740, 210, 220, "computer-vision", "Azure AI\nVision API");
  arrow("adls-l", "lbox", "left", 680, "adls", "right", 680);
  arrow("l-adls", "adls", "right", 770, "lbox", "left", 770);
  step("s5", 1495, 840, 5);
  arrow("post", "la", "bottom", 1800, "cv", "top", 1800);
  txt("post-lbl", 1700, 560, "Post", { size: 16 });
  arrow("get", "vis", "top", 2000, "la", "bottom", 2000);
  txt("get-lbl", 2020, 560, "Get", { size: 16 });
  step("s6", 1880, 560, 6);

  box("fab", 2290, 250, 260, 160, "Microsoft Fabric", { fill: TINT.mg, size: 18 });
  arrow("l-fab", "lbox", "right", 330, "fab", "left", 330);
  step("s7", 2170, 230, 7);
  txt("json-lbl", 2170, 420, "Parsing\nJSON", { size: 16 });

  group("vz", 2650, 90, 380, 1000, "Visualize", { fill: TINT.sub, stroke: "#a5d8ff", size: 20, align: "center" });
  card("pbi", 2710, 230, 260, 200, "power-bi-embedded", "Power BI");
  arrow("fab-pbi", "fab", "right", 330, "pbi", "left", 330);
  step("s8", 2540, 190, 8);

  txt("footer", 40, 1160, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Automate video analysis by using Azure Machine Learning and Azure Vision\"", { size: 20, color: "#495057" });
}
