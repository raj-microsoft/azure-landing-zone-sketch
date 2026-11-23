// 020 Build and deploy custom document processing models on Azure. Redraw of the article's diagram.
export const meta = {
  num: 20,
  slug: "build-deploy-custom-models",
  title: "Build and deploy custom document processing models on Azure",
  url: "https://learn.microsoft.com/azure/architecture/ai-ml/architecture/build-deploy-custom-models",
  category: "AI + machine learning",
  status: "done",
  otherDiagrams: [],
  substitutions: {
    "Email servers": "exchange-on-premises-access", "FTP server": "ftp", "Web apps": "app-services", "Document Intelligence": "form-recognizers",
    "Azure Language in Foundry Tools": "language", "Foundry Models (Azure OpenAI)": "azure-openai", "Microsoft Foundry": "ai-foundry",
    "Machine Learning studio": "machine-learning", "Batch and online managed endpoints": "machine-learning",
  },
  differences: ["Each column keeps its services in the original order; the dotted endpoint group in Deployment is a dashed box."],
};

export function draw(k) {
  const { TINT, txt, group, box, card, step, arrow } = k;
  txt("title", 40, 10, "Build and deploy custom document processing models", { size: 30 });
  const col = (id, x, w, title, items, h = 120) => {
    txt(`${id}-h`, x + w / 2, 80, title, { size: 22, align: "center" });
    group(id, x, 150, w, 900, "", { fill: TINT.white, stroke: "#343a40" });
    items.forEach(([n, l], i) => card(`${id}-${i}`, x + 20, 175 + i * (h + 15), w - 40, h, n, l, { size: 16 }));
  };
  col("src", 40, 300, "Source", [["exchange-on-premises-access", "Email servers"], ["ftp", "FTP server"], ["app-services", "Web apps"]], 200);
  col("ing", 480, 300, "Data ingestion and\norchestration", [["logic-apps", "Logic Apps"], ["data-factories", "Azure Data\nFactory"], ["function-apps", "Azure Functions"]], 200);
  col("ds", 920, 300, "Data store", [["blob-block", "Blob Storage"], ["data-lake-storage-gen1", "Data Lake Storage"]], 300);
  col("lab", 1360, 320, "Labeling, tagging, and\ntraining", [["form-recognizers", "Document Intelligence\nStudio"], ["language", "Azure Language in\nFoundry Tools"], ["azure-openai", "Foundry Models\n(Azure OpenAI)"], ["machine-learning", "Machine\nLearning studio"]], 190);
  col("dep", 1880, 440, "Deployment", [["form-recognizers", "Azure Document Intelligence\n(custom model parameters)"], ["language", "Azure Language in Foundry Tools\n(custom model parameters)"], ["ai-foundry", "Microsoft Foundry\n(custom model parameters)"]], 170);
  card("aks", 1900, 720, 170, 300, "kubernetes-services", "AKS cluster", { size: 16 });
  card("mep", 2090, 720, 210, 300, "machine-learning", "Batch and\nonline managed\nendpoints", { size: 16, dashed: true });
  [["src", "ing", 340, 1], ["ing", "ds", 780, 2], ["ds", "lab", 1220, 3], ["lab", "dep", 1680, 4]].forEach(([a, b, x, n]) => {
    arrow(`f${n}`, a, "right", 600, b, "left", 600);
    step(`s${n}`, x + 50, 540, n);
  });
  txt("f4-t", 1720, 470, "Built-in\ndeployment", { size: 18 });
  txt("footer", 40, 1080, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Build and deploy custom document processing models on Azure\"", { size: 20, color: "#495057" });
}
