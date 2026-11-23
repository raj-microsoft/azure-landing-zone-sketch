// 095 Provide custom authentication to Foundry Models through a gateway (img1: gateway with JWT validation).
export const meta = {
  num: 95,
  slug: "generative-ai-gateway-custom-authentication",
  title: "Provide custom authentication to Foundry Models through a gateway",
  url: "https://learn.microsoft.com/azure/architecture/ai-ml/guide/generative-ai-gateway-custom-authentication",
  category: "AI + Machine Learning",
  status: "done",
  otherDiagrams: ["img0: direct API-key access without a gateway (the 'before' state)", "img2-img8: certificate, managed identity, shared key, per-subscription key, multiple instances and external IdP variants"],
  substitutions: { "Intelligent application": "mobile", "JWT": "keys", "Gateway": "ai-gateway", "Azure managed identity": "entra-managed-identities", "gpt-35-turbo": "foundry-models" },
  differences: ["img0 is the no-gateway baseline; the gateway architecture (img1) is drawn as the main diagram.", "Identity provider is a labelled sketch shape (generic external IdP)."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, icon, arrow } = k;
  txt("title", 40, 0, "Custom authentication through a gateway", { size: 28 });
  box("idp", 600, 60, 220, 110, "Identity\nprovider", { size: 18, fill: TINT.onprem });
  card("app", 60, 330, 180, 150, "mobile", "Intelligent\napplication", { size: 16 });
  card("jwt", 300, 345, 120, 120, "keys", "JWT", { size: 16 });
  group("rg", 500, 260, 1080, 520, null, { fill: TINT.white });
  txt("rg-lbl", 960, 800, "rg-aoai-eastus", { size: 18 });
  txt("val-lbl", 720, 215, "Validate JWT", { size: 16 });
  card("gw", 560, 330, 160, 150, "ai-gateway", "Gateway", { size: 16 });
  card("mi", 790, 330, 180, 150, "entra-managed-identities", "Azure managed\nidentity", { size: 16 });
  group("aoai", 1060, 300, 340, 260, null, { fill: TINT.sub });
  card("model", 1110, 340, 220, 150, "foundry-models", "gpt-35-turbo", { size: 16 });
  card("oai", 1320, 560, 200, 140, "azure-openai", "Azure OpenAI", { size: 16 });
  arrow("a-idp", "app", "top", 150, "idp", "left", 100, [], { dashed: true, tail: "arrow", color: "#868e96" });
  arrow("a-val", "gw", "top", 650, "idp", "bottom", 650, [], { dashed: true, tail: "arrow", color: "#868e96" });
  arrow("a1", "app", "right", 405, "jwt", "left", 405);
  arrow("a2", "jwt", "right", 405, "gw", "left", 405);
  arrow("a3", "gw", "right", 405, "mi", "left", 405);
  arrow("a4", "mi", "right", 405, "model", "left", 405);
  txt("footer", 40, 860, "Pencil-sketch redraw of the Azure Architecture Center diagram \"gateway between client apps and Azure OpenAI\"", { size: 20, color: "#495057" });
}
