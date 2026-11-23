// 032 Automate document classification in Azure.
export const meta = {
  num: 32,
  slug: "automate-document-classification-durable-functions",
  title: "Automate document classification in Azure",
  url: "https://learn.microsoft.com/azure/architecture/ai-ml/architecture/automate-document-classification-durable-functions",
  category: "AI + machine learning",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Azure web app": "app-services", "Service Bus queue": "azure-service-bus", "Durable Functions activities": "function-apps", "Document Intelligence": "form-recognizers", "Blob Storage": "storage-accounts", "Azure AI Search": "cognitive-search", "text-embedding-3-large": "azure-openai", "Microsoft Foundry Agent Service": "foundry-agent-service" },
  differences: ["The OpenAI logo for text-embedding-3-large is replaced by the Azure OpenAI sketch icon."],
};

export function draw(k) {
  const { TINT, txt, card, group, step, arrow } = k;
  const Z = { fill: TINT.white, dashed: true, align: "center" };
  txt("title", 60, 10, "Automate document classification in Azure", { size: 30 });
  group("ing", 60, 80, 260, 850, "Ingestion", Z);
  group("act", 360, 80, 260, 340, "Activation", Z);
  group("orch", 660, 80, 1100, 340, "Azure Functions orchestration", { ...Z, fill: TINT.app });
  group("store", 360, 460, 260, 470, null, Z); txt("store-lbl", 400, 870, "Document store", { size: 18 });
  group("proc", 660, 460, 340, 470, null, Z); txt("proc-lbl", 690, 870, "Document processing", { size: 18 });
  group("meta", 1040, 460, 340, 470, null, Z); txt("meta-lbl", 1080, 850, "Document metadata\ncollection", { size: 18 });
  group("vec", 1420, 460, 340, 470, null, Z); txt("vec-lbl", 1470, 870, "Vectorize and index", { size: 18 });
  group("chat", 1820, 460, 360, 470, null, Z); txt("chat-lbl", 1890, 870, "Chat with your data", { size: 18 });

  card("web", 90, 140, 200, 160, "app-services", "Azure web app");
  card("sb", 390, 140, 200, 160, "azure-service-bus", "Service Bus\nqueue");
  card("an", 730, 140, 200, 160, "function-apps", "Analyze\nactivity");
  card("ms", 1110, 140, 200, 160, "function-apps", "Metadata store\nactivity");
  card("em", 1490, 140, 200, 160, "function-apps", "Embedding\nactivity");
  card("blob", 390, 560, 200, 160, "storage-accounts", "Blob Storage");
  card("di", 730, 600, 200, 170, "form-recognizers", "Document\nIntelligence");
  card("cos", 1110, 600, 200, 170, "azure-cosmos-db", "Azure\nCosmos DB");
  card("srch", 1480, 600, 220, 170, "cognitive-search", "Azure AI Search\n(Vector store)", { size: 18 });
  card("emb", 1860, 500, 280, 160, "azure-openai", "text-embedding-\n3-large", { size: 18 });
  card("fas", 1860, 680, 280, 160, "foundry-agent-service", "Microsoft Foundry\nAgent Service", { size: 18 });

  arrow("a1b", "web", "right", 220, "sb", "left", 220); step("s1b", 250, 95, "1b");
  arrow("a1a", "web", "bottom", 150, "blob", "left", 640); step("s1a", 200, 560, "1a");
  arrow("a2", "an", "left", 220, "sb", "right", 220); step("s2", 675, 150, 2);
  arrow("a3", "an", "bottom", 830, "di", "top", 830); step("s3", 700, 490, 3);
  arrow("a4", "an", "right", 220, "ms", "left", 220); step("s4", 1000, 160, 4);
  arrow("a4b", "ms", "bottom", 1210, "cos", "top", 1210);
  arrow("a5", "ms", "right", 220, "em", "left", 220); step("s5", 1380, 160, 5);
  arrow("a5b", "em", "bottom", 1590, "srch", "top", 1590);
  arrow("a5c", "em", "right", 220, "emb", "top", 2000);
  arrow("a6", "ing", "bottom", 190, "chat", "bottom", 2000, [1000]); step("s6", 1080, 950, 6);
  arrow("a7", "chat", "left", 700, "srch", "right", 700); step("s7", 1770, 620, 7);

  txt("footer", 60, 1080, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Automate document classification in Azure\"", { size: 20, color: "#495057" });
}
