// 093 Automate PDF forms processing.
export const meta = {
  num: 93,
  slug: "automate-pdf-forms-processing",
  title: "Automate PDF forms processing",
  url: "https://learn.microsoft.com/azure/architecture/ai-ml/architecture/automate-pdf-forms-processing",
  category: "AI + Machine Learning",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Azure Data Lake Storage": "data-lake-storage-gen1", "Document Intelligence": "form-recognizers", "Microsoft Power BI": "power-bi-embedded" },
  differences: ["Email attachment, PDF upload and the 'further processing' globe are labelled sketch shapes (no product icons)."],
};

export function draw(k) {
  const { TINT, txt, card, box, arrow, step } = k;
  txt("title", 40, 0, "Automate PDF forms processing", { size: 28 });
  box("ph1", 40, 60, 620, 60, "Collect or upload", { size: 20, fill: TINT.mg });
  box("ph2", 700, 60, 300, 60, "Process", { size: 20, fill: TINT.mg });
  box("ph3", 1040, 60, 240, 60, "Persist", { size: 20, fill: TINT.mg });
  box("ph4", 1320, 60, 280, 60, "Analyze and utilize", { size: 20, fill: TINT.mg });
  box("mail", 40, 170, 180, 120, "PDF files arrive\nas email\nattachments", { size: 16, fill: TINT.onprem });
  card("la1", 270, 160, 180, 140, "logic-apps", "Azure Logic Apps\nProcess email", { size: 16 });
  card("dl", 500, 160, 180, 140, "data-lake-storage-gen1", "Azure Data\nLake Storage", { size: 16 });
  card("la2", 740, 160, 220, 140, "logic-apps", "Azure Logic Apps\nInvoke function app", { size: 16 });
  card("cos", 1040, 160, 220, 140, "azure-cosmos-db", "Azure Cosmos DB", { size: 16 });
  card("pbi", 1360, 160, 180, 140, "power-bi-embedded", "Microsoft\nPower BI", { size: 16 });
  box("upload", 40, 470, 180, 100, "Upload PDF\nfiles", { size: 16, fill: TINT.onprem });
  card("fn", 740, 450, 220, 140, "function-apps", "Azure Functions\nProcess PDF file", { size: 16 });
  card("di", 720, 690, 260, 140, "form-recognizers", "Document Intelligence\nExtract contents\nfrom PDF files", { size: 16 });
  box("further", 1320, 470, 220, 100, "Further processing\nas needed", { size: 16, type: "ellipse", fill: TINT.sub });
  arrow("a1", "mail", "right", 230, "la1", "left", 230);
  step("s1", 225, 180, 1);
  arrow("a2", "la1", "right", 230, "dl", "left", 230);
  step("s2", 455, 180, 2);
  arrow("a3", "upload", "right", 520, "dl", "bottom", 560);
  step("s3", 330, 470, 3);
  arrow("a4", "dl", "right", 230, "la2", "left", 230);
  step("s4", 690, 180, 4);
  arrow("a5", "la2", "bottom", 820, "fn", "top", 820);
  step("s5", 770, 360, 5);
  arrow("a7", "fn", "top", 880, "la2", "bottom", 880);
  step("s7", 895, 360, 7);
  arrow("a6", "dl", "bottom", 620, "fn", "left", 520);
  step("s6", 650, 470, 6);
  arrow("a8", "la2", "right", 230, "cos", "left", 230);
  step("s8", 985, 180, 8);
  arrow("a9", "cos", "right", 230, "pbi", "left", 230);
  step("s9", 1285, 180, 9);
  arrow("a-di", "fn", "bottom", 850, "di", "top", 850, [], { tail: "arrow" });
  arrow("a10", "cos", "bottom", 1110, "further", "left", 520, [], { dashed: true });
  step("s10", 1130, 370, 10);
  txt("footer", 40, 880, "Pencil-sketch redraw of the Azure Architecture Center diagram \"PDF forms processing\"", { size: 20, color: "#495057" });
}
