// 051 Migrate a web app by using Azure API Management.
export const meta = {
  num: 51,
  slug: "apim-api-scenario",
  title: "Migrate a web app by using Azure API Management",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/apps/apim-api-scenario",
  category: "Web",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Existing HTTP services and APIs": "gear", "Existing browser-based web UI": "browser", "Internet": "globe-success", "Azure API Management": "api-management-services", "New API (API app)": "app-services", "New browser-based web UI": "app-services", "E-commerce users": "users" },
  differences: ["Padlock icons on the secured links are drawn as 'TLS' labels (no sketch padlock icon).", "The on-premises building is a plain sketch shape."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, both, step } = k;
  txt("title", 60, 10, "Migrate a web app by using Azure API Management", { size: 30 });
  group("onp", 60, 170, 640, 760, "On-premises", { fill: TINT.white, dashed: true, stroke: "#4a90d9", size: 22 });
  box("bldg", 100, 330, 160, 240, "Corporate\nbuilding", { fill: TINT.mg, size: 16 });
  card("http", 400, 240, 240, 170, "gear", "Existing HTTP\nservices and APIs");
  card("oldui", 400, 650, 240, 170, "browser", "Existing browser-\nbased web UI");
  step("s1", 330, 760, 1);
  step("s2", 540, 500, 2);
  card("inet", 860, 60, 200, 150, "globe-success", "Internet");

  group("az", 1180, 170, 660, 760, "Azure", { fill: TINT.white, dashed: true, stroke: "#4a90d9", size: 22 });
  card("apim", 1240, 240, 240, 170, "api-management-services", "Azure API\nManagement");
  card("newapi", 1580, 240, 220, 170, "app-services", "New API");
  card("newui", 1240, 650, 240, 170, "app-services", "New browser-\nbased web UI");
  step("s5", 1510, 690, 5);
  card("users", 860, 980, 200, 160, "users", "E-commerce\nusers");

  both("h3", "http", "right", 325, "apim", "left", 325);
  txt("tls3", 925, 280, "TLS", { size: 16 });
  step("s3", 920, 350, 3);
  both("h4", "apim", "right", 325, "newapi", "left", 325);
  txt("tls4", 1505, 280, "TLS", { size: 16 });
  step("s4", 1510, 350, 4);
  both("h2", "http", "bottom", 520, "oldui", "top", 520);
  both("h5", "apim", "bottom", 1360, "newui", "top", 1360);
  arrow("u-old", "users", "top", 900, "oldui", "right", 735, [735]);
  txt("tls6a", 720, 690, "TLS", { size: 16 });
  arrow("u-new", "users", "top", 1020, "newui", "left", 735, [735]);
  txt("tls6b", 1100, 690, "TLS", { size: 16 });
  step("s6", 940, 820, 6);

  txt("footer", 60, 1190, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Migrate a web app by using Azure API Management\"", { size: 20, color: "#495057" });
}
