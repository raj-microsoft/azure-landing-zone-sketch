// 056 Sync MongoDB Atlas data changes to Microsoft Fabric.
export const meta = {
  num: 56,
  slug: "sync-mongodb-atlas-fabric-analytics",
  title: "Sync MongoDB Atlas data changes to Microsoft Fabric",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/analytics/sync-mongodb-atlas-fabric-analytics",
  category: "Analytics",
  status: "done",
  otherDiagrams: ["Mirroring integration architecture", "MongoDB Atlas triggers and functions pushing data to OneLake", "Connector architecture for Fabric pipelines", "Two screenshots of pipeline stages"],
  substitutions: { "User": "users", "Power BI": "power-bi-embedded", "App Service": "app-services" },
  differences: ["The collection loop is a rounded zone, not an ellipse.", "Fabric, OneLake and GitHub are plain sketch shapes (no sketch logos)."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, step } = k;
  txt("title", 40, 10, "Sync MongoDB Atlas data changes to Microsoft Fabric", { size: 30 });
  card("user", 40, 330, 160, 150, "users", "User");
  step("s1", 220, 520, 1);

  group("fab", 300, 120, 380, 720, null, { fill: TINT.mg });
  box("fabric", 330, 150, 150, 80, "Fabric", { fill: TINT.white, size: 18 });
  card("pbi", 500, 140, 150, 130, "power-bi-embedded", "Power BI");
  txt("mir", 330, 320, "Fabric\ngeneric mirroring\n(MirrorDB creation)", { size: 22 });
  box("onelake", 390, 640, 200, 90, "OneLake", { fill: TINT.white, size: 18 });

  txt("mir-lbl", 700, 290, "MongoDB\nmirrored\nlanding zone", { size: 16 });
  step("s2", 740, 520, 2);
  box("gh", 900, 150, 160, 80, "GitHub", { fill: TINT.white, size: 18 });
  box("deploy", 860, 330, 300, 170, "Deploy to Azure\n(Trigger Azure Resource\nManager template)", { fill: TINT.mg, size: 18 });
  card("app", 1230, 330, 200, 160, "app-services", "App Service");
  step("s3", 1200, 520, 3);

  txt("py-lbl", 1500, 160, "Python app", { size: 22 });
  group("py", 1500, 200, 1000, 400, null, { fill: TINT.mg });
  step("s4", 1580, 240, 4);
  box("apppy", 1540, 380, 200, 70, "app.py", { fill: TINT.badge, size: 18 });
  box("mirror", 1800, 380, 200, 70, "mirror", { fill: TINT.badge, size: 18 });
  group("coll", 2080, 260, 380, 300, null, { fill: TINT.white });
  txt("coll-lbl", 2170, 500, "For each collection", { size: 18 });
  box("listen", 2160, 300, 220, 60, "Listening", { fill: TINT.badge, size: 18 });
  box("init", 2160, 410, 220, 60, "Initial_sync", { fill: TINT.badge, size: 18 });

  arrow("u-f", "user", "right", 405, "fab", "left", 405);
  arrow("f-d", "fab", "right", 415, "deploy", "left", 415);
  arrow("d-a", "deploy", "right", 410, "app", "left", 410);
  arrow("a-p", "app", "right", 410, "apppy", "left", 410);
  arrow("p-m", "apppy", "right", 415, "mirror", "left", 415);
  arrow("m-l", "mirror", "right", 415, "listen", "left", 330, [2050]);
  arrow("l-i", "listen", "bottom", 2270, "init", "top", 2270);
  arrow("back", "py", "bottom", 1990, "fab", "bottom", 490, [920]);
  step("s6", 800, 860, 6);
  step("s5", 940, 860, 5);

  txt("footer", 40, 980, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Sync MongoDB Atlas data changes to Microsoft Fabric\"", { size: 20, color: "#495057" });
}
