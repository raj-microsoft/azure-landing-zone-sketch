// 079 Protect APIs by using Application Gateway and API Management.
export const meta = {
  num: 79,
  slug: "protect-apis",
  title: "Protect APIs by using Application Gateway and API Management",
  url: "https://learn.microsoft.com/azure/architecture/web-apps/api-management/architectures/protect-apis",
  category: "Web",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Clients": "devices", "External APIs": "gear", "Internet": "globe-success", "API Management": "api-management-services", "App Service Environment": "app-service-environments", "SQL Managed Instance": "sql-managed-instance", "Application Gateway": "application-gateways", "Web Application Firewall": "web-application-firewall-policies-waf", "Azure Kubernetes Service": "kubernetes-services", "Virtual network": "virtual-networks", "DDoS Protection": "ddos-protection-plans" },
  differences: ["Padlock overlays on the subnets are omitted. The dead-end sinkpool is a small labelled shape."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, both, arrow, icon } = k;
  const M = { size: 16 };
  txt("title", 40, 10, "Protect APIs with Application Gateway and API Management", { size: 30 });

  card("cl1", 40, 220, 200, 150, "devices", "Clients");
  card("ext", 40, 640, 200, 150, "gear", "External APIs");
  card("inet", 400, 640, 200, 150, "globe-success", "Internet");
  card("cl2", 40, 1100, 200, 150, "devices", "Clients");
  both("c1-in", "cl1", "right", 295, "inet", "top", 500, [], {});
  txt("c1-lbl", 260, 230, "api.<some-domain>/external/api1", M);
  both("ex-in", "ext", "right", 715, "inet", "left", 715);

  group("az", 720, 90, 1960, 1160, "Microsoft Azure", { fill: TINT.white, dashed: true, stroke: "#868e96", size: 20 });
  group("vnet", 760, 150, 1880, 980, null, { fill: TINT.white, dashed: true, stroke: "#1971c2" });
  icon("vnet-i", "virtual-networks", 2560, 160, 48);
  group("lane", 790, 190, 460, 900, null, { fill: TINT.sub, stroke: "#d0ebff" });

  group("apims", 820, 230, 400, 300, "apim-subnet", { fill: TINT.white, align: "center" });
  card("apim", 860, 290, 320, 210, "api-management-services", "aumanager-apim\n(API Management)", M);
  group("ases", 1340, 230, 400, 300, "ase-subnet", { fill: TINT.white, align: "center" });
  card("ase", 1380, 290, 320, 210, "app-service-environments", "aumanager-ase-linux\n(App Service\nEnvironment)", M);
  group("sqls", 1840, 230, 400, 300, "sqlmi-subnet", { fill: TINT.white, align: "center" });
  card("sql", 1880, 290, 320, 210, "sql-managed-instance", "aumanager-sqlmi\n(SQL Managed\nInstance)", M);
  both("apim-ase", "apim", "right", 380, "ase", "left", 380);
  both("ase-sql", "ase", "right", 380, "sql", "left", 380);

  group("ags", 820, 690, 400, 320, "ag-subnet", { fill: TINT.white, align: "center" });
  card("ag", 860, 750, 320, 210, "application-gateways", "aumanager-ag\n(Application Gateway)", M);
  box("waf", 800, 1020, 260, 60, "Web Application Firewall", { iconLeft: "web-application-firewall-policies-waf", size: 16, fill: TINT.white });
  group("akss", 1340, 690, 400, 320, "aks-subnet", { fill: TINT.white, align: "center" });
  card("aks", 1380, 750, 320, 210, "kubernetes-services", "aumanager-aks\n(Azure Kubernetes Service)", M);

  both("ag-apim", "apim", "bottom", 940, "ag", "top", 940);
  both("apim-aks", "apim", "bottom", 1100, "aks", "top", 1660, [640]);
  txt("rt-lbl", 1290, 545, "api.<some-domain>/external/api1\napi.<some-domain>/internal/api2\nportal.<some-domain>", M);
  both("sql-aks", "sql", "bottom", 2040, "aks", "right", 860, []);
  both("in-ag", "inet", "right", 715, "ags", "left", 715);
  txt("in-lbl", 450, 820, "portal.<some-domain>", M);
  both("cl2-ag", "cl2", "right", 1175, "ag", "bottom", 1100, [], {});
  txt("c2-lbl", 260, 1190, "api.<some-domain>/internal/api2", M);

  box("sink", 1300, 1160, 260, 60, "Dead end (sinkpool)", { fill: TINT.mg, size: 16 });
  arrow("ag-sink", "ag", "bottom", 1160, "sink", "left", 1190, [], { color: "#868e96" });
  card("ddos", 2470, 1140, 180, 100, "ddos-protection-plans", "DDoS Protection", M);

  txt("footer", 40, 1300, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Protect APIs with Application Gateway and API Management\"", { size: 20, color: "#495057" });
}
