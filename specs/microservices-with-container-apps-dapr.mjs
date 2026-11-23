// 003 Deploy microservices with Azure Container Apps and Dapr. Redraw of the first architecture diagram.
export const meta = {
  num: 3,
  slug: "microservices-with-container-apps-dapr",
  title: "Deploy microservices with Azure Container Apps and Dapr",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/serverless/microservices-with-container-apps-dapr",
  category: "Containers + microservices",
  status: "done",
  otherDiagrams: ["Application Insights application map (screenshot)"],
  substitutions: { "Container app (each service)": "worker-container-app", "Azure Blob Storage": "blob-block", "Envoy ingress": "worker-container-app" },
  differences: [
    "Dapr sidecars and the envoy proxy are labelled sketch boxes (no Azure icon, no third-party logo).",
    "The Dapr API arrows inside each service are written as a 'Dapr API' label.",
    "The Service Bus topic is a labelled bar under the Service Bus icon.",
  ],
};

export function draw(k) {
  const { TINT, txt, zone, group, box, card, step, arrow, line, both } = k;
  const PURPLE = "#7048e8", BLUE = "#1c3d8f";
  txt("title", 150, 30, "Microservices with Azure Container Apps and Dapr", { size: 32 });

  card("sb", 1230, 110, 220, 130, "azure-service-bus", "Azure Service Bus");
  box("topic", 740, 290, 1200, 70, "Publish-subscribe topic", { fill: "#d0ebff", size: 22, stroke: "#1971c2" });

  txt("env-t", 150, 440, "Azure Container Apps\nenvironment", { size: 20 });
  zone("env", 150, 500, 1810, 700, "transparent", { dashed: true, stroke: "#343a40" });
  zone("ded", 180, 540, 860, 260, "#f8f0fc", { dashed: true, stroke: PURPLE });
  txt("ded-t", 610, 548, "Dedicated profile", { size: 18, align: "center" });
  zone("con", 1070, 540, 860, 260, "#f8f0fc", { dashed: true, stroke: PURPLE });
  txt("con-t", 1500, 548, "Consumption profile", { size: 18, align: "center" });

  const svc = (id, x, y, n, name, dapr = true) => {
    const w = dapr ? 400 : 270;
    group(id, x, y, w, 160, "", { fill: TINT.white, stroke: "#343a40" });
    step(`${id}-s`, x + 8, y + 10, n);
    card(`${id}-app`, x + 56, y + 10, 200, 110, "worker-container-app", name);
    if (dapr) { box(`${id}-dapr`, x + 270, y + 10, 120, 100, "dapr", { fill: TINT.onprem, size: 18 }); txt(`${id}-api`, x + 200, y + 122, "Dapr API", { size: 18, align: "center" }); }
  };
  svc("order", 200, 590, 4, "Order service");
  svc("acct", 620, 590, 5, "Accounting\nservice");
  svc("receipt", 1090, 590, 6, "Receipt service");
  svc("loyalty", 1510, 590, 7, "Loyalty service");
  svc("vcust", 200, 900, 3, "Virtual\ncustomer");
  svc("ui", 680, 850, 2, "UI", false);
  svc("worker", 1090, 900, 9, "Virtual worker");
  svc("make", 1510, 900, 8, "Makeline\nservice");
  group("envoy", 680, 1040, 270, 120, "", { fill: TINT.white, stroke: "#343a40" });
  step("envoy-s", 688, 1050, 1);
  box("envoy-b", 736, 1050, 200, 60, "envoy proxy", { fill: TINT.onprem, size: 18 });
  card("user", 735, 1260, 160, 110, "users", "User");

  card("cosmos", 2060, 620, 190, 130, "azure-cosmos-db", "Azure\nCosmos DB");
  card("blob", 2290, 620, 190, 150, "blob-block", "Azure Blob\nStorage\nbinding");
  card("redis", 2060, 960, 190, 150, "azure-managed-redis", "Azure\nManaged\nRedis");
  card("sql", 2290, 960, 190, 150, "sql-database", "Azure SQL\nDatabase");

  arrow("order-sb", "order", "top", 400, "sb", "left", 175, [175]);
  arrow("t-acct", "topic", "bottom", 820, "acct", "top", 820);
  arrow("t-receipt", "topic", "bottom", 1290, "receipt", "top", 1290);
  arrow("t-loyalty", "topic", "bottom", 1710, "loyalty", "top", 1710);
  arrow("t-make", "topic", "bottom", 1925, "make", "top", 1850, [880]);
  arrow("vcust-order", "vcust", "top", 400, "order", "bottom", 400);
  arrow("user-envoy", "user", "top", 815, "envoy", "bottom", 815);
  both("envoy-ui", "envoy", "top", 815, "ui", "bottom", 815);
  arrow("envoy-acct", "envoy", "left", 1100, "acct", "bottom", 650, [650]);
  arrow("envoy-make", "envoy", "right", 1120, "make", "bottom", 1800, [1800]);
  both("worker-make", "worker", "bottom", 1290, "make", "bottom", 1610, [1140]);
  arrow("acct-sql", "acct", "bottom", 900, "sql", "top", 2385, [840, 2385], { firstDir: "v" });
  txt("ef", 930, 806, "Entity Framework", { size: 18 });
  line("loyalty-cosmos", "loyalty", "right", 680, "cosmos", "left", 680, [], { head: "circle_outline", color: BLUE });
  line("receipt-blob", "receipt", "bottom", 1200, "blob", "bottom", 2330, [815, 2330], { firstDir: "v", head: "circle_outline", color: BLUE });
  line("make-redis", "make", "right", 1035, "redis", "left", 1035, [], { head: "circle_outline", color: BLUE });

  txt("footer", 150, 1410, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Deploy microservices with Azure Container Apps and Dapr\"", { size: 20, color: "#495057" });
}
