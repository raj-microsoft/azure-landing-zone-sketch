// 038 Extract and analyze call center data.
export const meta = {
  num: 38,
  slug: "call-center-openai-analytics",
  title: "Extract and analyze call center data",
  url: "https://learn.microsoft.com/azure/architecture/ai-ml/openai/architecture/call-center-openai-analytics",
  category: "AI + machine learning",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Caller / call center agent": "users", "Telephony server": "server-farm", "Blob Storage": "storage-accounts", "Azure Speech to text": "speech-services", "Microsoft Foundry": "ai-foundry", "Azure Content Understanding": "cognitive-services", "Power BI": "power-bi-embedded", "Web app": "app-services" },
  differences: ["CRM is a labelled shape (non-Azure).", "Caller and agent both use the users sketch icon."],
};

export function draw(k) {
  const { TINT, txt, box, card, group, step, arrow } = k;
  const Z = { fill: TINT.white, dashed: true, stroke: "#1971c2", align: "center" };
  txt("title", 60, 10, "Extract and analyze call center data", { size: 30 });
  card("caller", 100, 120, 200, 150, "users", "Caller");
  card("agent", 100, 600, 200, 150, "users", "Call center agent", { size: 16 });
  txt("p2p", 215, 380, "Person-to-person\nconversation", { size: 18 });
  card("tel", 400, 380, 200, 170, "server-farm", "Telephony\nserver");
  card("blob1", 680, 380, 200, 170, "storage-accounts", "Blob Storage"); step("s1", 720, 250, 1);
  txt("fu", 610, 320, "File\nupload", { size: 16 });
  txt("af", 890, 320, "Audio\nfiles", { size: 16 });

  txt("it-lbl", 1220, 40, "Intelligent transcription", { size: 22 });
  group("it", 970, 90, 900, 990, "Extract insights from call transcripts", { ...Z, size: 20 });
  group("ext", 1000, 230, 260, 360, "Extraction", Z); step("s2", 1110, 170, 2);
  card("spch", 1030, 320, 200, 180, "speech-services", "Azure speech\nto text");
  group("sto", 1300, 230, 260, 360, "Storage", Z); step("s3", 1410, 170, 3);
  card("blob2", 1330, 320, 200, 180, "storage-accounts", "Blob Storage");
  group("ana", 1600, 230, 240, 360, "Analysis", Z); step("s4", 1700, 170, 4);
  card("fdy", 1620, 320, 200, 180, "ai-foundry", "Microsoft\nFoundry");
  group("cu-z", 1270, 660, 320, 360, null, Z); step("s5", 1410, 680, 5);
  card("cu", 1290, 740, 280, 200, "cognitive-services", "Azure Content\nUnderstanding", { size: 18 });

  card("blob3", 1940, 380, 200, 170, "storage-accounts", "Blob Storage"); step("s6", 2020, 310, 6);
  txt("iv-lbl", 2240, 40, "Interact and visualize", { size: 22 });
  group("iv", 2220, 90, 360, 990, null, Z);
  card("pbi", 2250, 130, 300, 200, "power-bi-embedded", "Insights in Power BI\n(Near real time)", { size: 18 });
  card("web", 2250, 380, 300, 170, "app-services", "Web app");
  box("crm", 2250, 620, 300, 260, "CRM\n\nDetailed call\nhistory, summaries,\nand reasons for\ncalling", { size: 18, fill: TINT.onprem });

  arrow("c-t", "caller", "right", 195, "tel", "top", 500);
  arrow("t-a", "tel", "bottom", 500, "agent", "bottom", 200, [800]);
  arrow("conv", "caller", "bottom", 200, "agent", "top", 200, [], { dashed: true, tail: "arrow" });
  arrow("up", "tel", "right", 465, "blob1", "left", 465);
  arrow("au", "blob1", "right", 450, "ext", "left", 450);
  arrow("au2", "blob1", "bottom", 800, "cu-z", "left", 840);
  arrow("e-s", "ext", "right", 410, "sto", "left", 410);
  arrow("s-a", "sto", "right", 410, "ana", "left", 410);
  arrow("it-b", "it", "right", 460, "blob3", "left", 460);
  arrow("cu-b", "cu-z", "right", 840, "blob3", "bottom", 2040, [], {});
  arrow("b-iv", "blob3", "right", 465, "iv", "left", 465);

  txt("footer", 60, 1120, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Extract and analyze call center data\"", { size: 20, color: "#495057" });
}
