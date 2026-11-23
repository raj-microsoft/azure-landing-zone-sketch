// 037 WordPress on Azure Kubernetes Service.
export const meta = {
  num: 37,
  slug: "wordpress-container",
  title: "WordPress on Azure Kubernetes Service",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/infrastructure/wordpress-container",
  category: "Containers",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Public internet": "globe-success", "Azure Front Door + WAF": "front-door-and-cdn-profiles", "Internal load balancer": "load-balancers", "AKS": "kubernetes-services", "WordPress pod": "worker-container-app", "Private endpoint": "private-endpoints", "Azure Container Registry": "container-registries", "Azure Key Vault": "key-vaults", "Azure Database for MySQL flexible server": "azure-database-mysql-server", "Azure Managed Redis": "azure-managed-redis", "Azure NetApp Files": "azure-netapp-files" },
  differences: ["Ingress and Secret store CSI have no sketch icon and are labelled shapes.", "NSG shield icons on the subnets are omitted; subnet titles keep the label."],
};

export function draw(k) {
  const { TINT, txt, box, card, group, step, arrow } = k;
  txt("title", 60, 10, "WordPress on Azure Kubernetes Service", { size: 30 });
  card("inet", 60, 380, 180, 150, "globe-success", "Public internet", { size: 16 });
  step("s1", 180, 300, 1);
  card("afd", 300, 370, 260, 200, "front-door-and-cdn-profiles", "Azure Front Door\n+ Azure Web\nApplication Firewall", { size: 16 });
  group("out", 600, 70, 2160, 1140, null, { fill: TINT.white, dashed: true });
  group("vnet", 640, 110, 1680, 1060, "Virtual network", { fill: TINT.white, dashed: true, stroke: "#1971c2", iconName: "virtual-networks" });
  group("sn1", 680, 180, 1100, 720, "Subnet with network\nsecurity group", { fill: TINT.mg, size: 16 });
  card("ilb", 720, 380, 200, 170, "load-balancers", "Internal\nload balancer"); step("s2", 740, 300, 2);
  group("aks", 980, 260, 760, 600, "Azure Kubernetes Service (AKS)", { fill: TINT.white, dashed: true, iconName: "kubernetes-services" });
  box("ing", 1150, 400, 180, 100, "Ingress", { fill: TINT.onprem }); step("s3", 1360, 340, 3);
  box("csi", 1500, 400, 200, 100, "Secret store\nCSI", { fill: TINT.onprem, size: 18 });
  card("wp1", 1010, 600, 200, 160, "worker-container-app", "WordPress\npod");
  card("wp2", 1300, 600, 200, 160, "worker-container-app", "WordPress\npod");
  txt("pa", 1180, 780, "Pod\nautoscaling", { size: 16 });
  group("sn2", 1840, 180, 440, 720, "Subnet with network\nsecurity group", { fill: TINT.mg, size: 16 });
  for (const [n, y] of [["pe1", 260], ["pe2", 420], ["pe3", 580], ["pe4", 740]]) card(n, 1900, y, 320, 130, "private-endpoints", "Private endpoint", { size: 16 });
  card("acr", 2400, 250, 280, 150, "container-registries", "Azure Container\nRegistry", { size: 16 });
  card("kv", 2400, 410, 280, 150, "key-vaults", "Azure Key Vault", { size: 16 }); step("s4", 2340, 520, 4);
  card("my", 2400, 570, 280, 150, "azure-database-mysql-server", "Azure Database for\nMySQL flexible server", { size: 16 }); step("s5", 2340, 680, 5);
  card("red", 2400, 730, 280, 150, "azure-managed-redis", "Azure Managed\nRedis", { size: 16 });
  group("sn3", 1000, 940, 760, 210, "Subnet with network\nsecurity group", { fill: TINT.mg, size: 16 });
  card("anf", 1300, 960, 260, 170, "azure-netapp-files", "Azure\nNetApp Files"); step("s6", 1600, 1020, 6);

  arrow("a1", "inet", "right", 455, "afd", "left", 455);
  arrow("a2", "afd", "right", 465, "ilb", "left", 465);
  arrow("a3", "ilb", "right", 450, "ing", "left", 450);
  arrow("ing1", "ing", "bottom", 1240, "wp2", "left", 620, [], { head: null });
  arrow("pas", "wp1", "right", 640, "wp2", "left", 640, [], { tail: "arrow" });
  arrow("acr1", "aks", "right", 320, "pe1", "left", 320);
  arrow("acr2", "pe1", "right", 320, "acr", "left", 320);
  arrow("kv1", "csi", "right", 470, "pe2", "left", 470);
  arrow("kv2", "pe2", "right", 480, "kv", "left", 480);
  arrow("db1", "wp1", "bottom", 1110, "pe3", "left", 640, [820, 1860]);
  arrow("db2", "wp2", "bottom", 1400, "pe4", "left", 800, [840, 1870]);
  arrow("db3", "pe3", "right", 640, "my", "left", 640);
  arrow("db4", "pe4", "right", 800, "red", "left", 800);
  arrow("nfs", "aks", "bottom", 1430, "anf", "top", 1430);

  txt("footer", 60, 1250, "Pencil-sketch redraw of the Azure Architecture Center diagram \"WordPress on Azure Kubernetes Service\"", { size: 20, color: "#495057" });
}
