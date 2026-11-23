// 088 Use Azure Front Door to secure AKS workloads.
export const meta = {
  num: 88,
  slug: "aks-front-door",
  title: "Use Azure Front Door to secure AKS workloads",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/aks-front-door/aks-front-door",
  category: "Containers + microservices",
  status: "done",
  otherDiagrams: ["Message flow during deployment and runtime (step diagram)"],
  substitutions: { "Azure Front Door": "front-door-and-cdn-profiles", "Web Application Firewall policy": "web-application-firewall-policies-waf", "Azure DNS zone / Private DNS zones": "dns-zones", "Public IP address": "public-ip-addresses", "Private endpoint(s)": "private-endpoints", "Private Link service": "private-link-service", "Azure Bastion host": "bastions", "Jump box VM": "virtual-machine", "API server": "kubernetes-services", "System / user agent pools": "vm-scale-sets", "Internal load balancer": "load-balancers", "Gateway API": "application-gateway-containers", "httpbin-tls / kube-system": "container-instances", "Azure Managed Grafana": "azure-managed-grafana", "Monitor workspace": "monitor", "Azure Monitor Logs": "log-analytics-workspaces", "Storage account": "storage-accounts", "Key Vault": "key-vaults", "Container Registry": "container-registries", "TLS certificate": "app-service-certificates", "Azure NAT Gateway": "nat", "Internet": "globe-success", "Users and engineers": "users" },
  differences: ["Traffic types (monitoring, SSH, HTTP/S, outbound, private connection, VNet link) are shown with a colour legend; dotted styles are drawn dashed.", "Subnet address ranges are written in the subnet titles."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, step, poly } = k;
  const M = { size: 16 };
  const C = { mon: "#b08900", ssh: "#0c8599", http: "#2b8a3e", out: "#7048e8", pri: "#1c7ed6", link: "#e67700" };
  txt("title", 40, 10, "Use Azure Front Door to secure AKS workloads", { size: 30 });
  group("leg", 500, 60, 420, 300, null, { fill: TINT.white });
  [["Monitoring", "mon"], ["SSH traffic", "ssh"], ["HTTP/S traffic", "http"], ["Outbound traffic", "out"], ["Private connection", "pri"], ["Virtual network link", "link"]].forEach(([l, c], i) => {
    poly(`leg-l${i}`, [[530, 100 + i * 44], [640, 100 + i * 44]], { color: C[c], dashed: true, head: "arrow" });
    txt(`leg-t${i}`, 665, 88 + i * 44, l, { size: 18 });
  });
  card("eng", 1170, 60, 220, 110, "users", "Kubernetes monitoring\nengineers", M);
  card("graf", 1170, 200, 220, 130, "azure-managed-grafana", "Azure Managed\nGrafana", M);
  card("mws", 1170, 360, 220, 130, "monitor", "Monitor workspace", M);
  arrow("a-eng", "eng", "bottom", 1280, "graf", "top", 1280, [], { color: C.mon, dashed: true });
  arrow("a-graf", "graf", "bottom", 1280, "mws", "top", 1280, [], { color: C.mon, dashed: true });
  group("pdns", 1520, 60, 600, 400, "Private DNS zones", { fill: TINT.white });
  box("dz1", 1560, 110, 520, 90, "privatelink.vaultcore.azure.net", { iconLeft: "dns-zones", size: 16 });
  box("dz2", 1560, 220, 520, 90, "privatelink.blob.core.windows.net", { iconLeft: "dns-zones", size: 16 });
  box("dz3", 1560, 330, 520, 90, "privatelink.azurecr.io", { iconLeft: "dns-zones", size: 16 });

  card("admins", 40, 600, 260, 150, "users", "Administrators,\nplatform engineers,\ndevelopers", M);
  card("adns", 40, 800, 260, 130, "dns-zones", "Azure DNS zone", M);
  card("appu", 40, 980, 200, 130, "users", "Application\nusers", M);
  card("afd", 290, 970, 190, 150, "front-door-and-cdn-profiles", "Azure\nFront Door", M);
  card("waf", 290, 1160, 190, 170, "web-application-firewall-policies-waf", "Web Application\nFirewall policy", M);
  card("pip1", 360, 620, 170, 140, "public-ip-addresses", "Public IP\naddress", M);
  card("pe1", 530, 970, 170, 150, "private-endpoints", "Private\nendpoint", M);
  arrow("a-https1", "appu", "right", 1045, "afd", "left", 1045, [], { color: C.http, dashed: true });
  arrow("a-https2", "afd", "right", 1045, "pe1", "left", 1045, [], { color: C.http, dashed: true });
  arrow("a-ssh0", "admins", "right", 690, "pip1", "left", 690, [], { color: C.ssh, dashed: true });

  txt("vnet-lbl", 760, 500, "Virtual network 10.0.0.0/8", { size: 18 });
  group("vnet", 740, 540, 1780, 760, null, { dashed: true, fill: TINT.white, stroke: "#1971c2" });
  group("bas", 770, 570, 620, 280, "AzureBastion 10.243.2.0/24", { dashed: true, iconName: "virtual-networks", iconSize: 32, size: 16 });
  card("bhost", 960, 640, 240, 150, "bastions", "Azure Bastion host", M);
  arrow("a-ssh", "pip1", "right", 715, "bhost", "left", 715, [], { color: C.ssh, dashed: true });
  group("vms", 770, 880, 620, 390, "VmSubnet 10.243.1.0/24", { dashed: true, iconName: "virtual-networks", iconSize: 32, size: 16 });
  card("pls", 1100, 940, 240, 120, "private-link-service", "Private Link service", M);
  card("jump", 790, 1080, 170, 160, "virtual-machine", "Jump box VM\n(Optional)", M);
  card("pe-st", 990, 1110, 120, 130, "private-endpoints", "PE\nstorage", M);
  card("pe-kv", 1125, 1110, 120, 130, "private-endpoints", "PE\nKey Vault", M);
  card("pe-cr", 1260, 1110, 120, 130, "private-endpoints", "PE\nregistry", M);
  txt("pe-lbl", 1010, 1072, "Private endpoints", { size: 16 });
  arrow("a-pls", "pe1", "right", 1000, "pls", "left", 1000, [], { color: C.http, dashed: true });

  group("aks", 1420, 570, 1080, 700, null, { fill: TINT.sub });
  group("api", 1440, 590, 440, 290, "ApiServerSubnet 10.243.0.0/27", { iconName: "virtual-networks", iconSize: 32, size: 16 });
  card("apis", 1560, 660, 200, 150, "kubernetes-services", "API server", M);
  group("usr", 1900, 590, 580, 290, "UserSubnet 10.241.0.0/16", { iconName: "virtual-networks", iconSize: 32, size: 16 });
  card("upool", 2080, 660, 220, 150, "vm-scale-sets", "User agent pool", M);
  txt("aks-lbl", 1860, 895, "AKS", { size: 18 });
  group("sys", 1440, 930, 440, 320, "SystemSubnet 10.240.0.0/16", { iconName: "virtual-networks", iconSize: 32, size: 16 });
  card("spool", 1690, 990, 170, 120, "vm-scale-sets", "System\nagent pool", M);
  card("ilb", 1460, 1110, 240, 120, "load-balancers", "Internal load balancer", M);
  group("pod", 1900, 930, 580, 320, "PodSubnet 10.242.0.0/16", { iconName: "virtual-networks", iconSize: 32, size: 16 });
  card("gapi", 1920, 1040, 170, 150, "application-gateway-containers", "Gateway API", M);
  card("httpbin", 2110, 1040, 170, 150, "container-instances", "httpbin-tls", M);
  card("kubes", 2300, 1040, 160, 150, "container-instances", "kube-system", M);
  arrow("a-ilb", "pls", "right", 1000, "ilb", "top", 1580, [1580], { color: C.http, dashed: true });
  arrow("a-gapi", "ilb", "right", 1170, "gapi", "left", 1170, [], { color: C.http, dashed: true });
  arrow("a-pod", "gapi", "right", 1115, "httpbin", "left", 1115, [], { color: C.http, dashed: true });
  arrow("a-mws", "mws", "bottom", 1280, "aks", "top", 1885, [520, 1885], { color: C.mon, dashed: true });
  arrow("a-dns", "aks", "top", 2460, "pdns", "bottom", 1800, [510, 1800], { color: C.link, dashed: true });

  card("st", 960, 1380, 170, 140, "storage-accounts", "Storage\naccount", M);
  card("kv", 1140, 1520, 150, 140, "key-vaults", "Key\nVault", M);
  card("acr", 1300, 1380, 190, 140, "container-registries", "Container\nRegistry", M);
  card("tls", 1310, 1560, 200, 130, "app-service-certificates", "TLS certificate", M);
  card("aml", 760, 1520, 170, 150, "log-analytics-workspaces", "Azure Monitor\nLogs", M);
  arrow("a-st", "pe-st", "bottom", 1050, "st", "top", 1050, [], { color: C.pri, dashed: true });
  arrow("a-kv", "pe-kv", "bottom", 1185, "kv", "top", 1185, [], { color: C.pri, dashed: true });
  arrow("a-acr", "pe-cr", "bottom", 1340, "acr", "top", 1340, [], { color: C.pri, dashed: true });
  arrow("a-logs", "vms", "bottom", 845, "aml", "top", 845, [], { color: C.mon, dashed: true });

  card("natg", 2300, 1380, 200, 140, "nat", "Azure NAT Gateway", M);
  card("pip2", 2300, 1560, 200, 130, "public-ip-addresses", "Public IP address", M);
  card("inet", 2300, 1730, 200, 130, "globe-success", "Internet", M);
  arrow("a-out1", "ilb", "bottom", 1600, "natg", "left", 1440, [1440], { color: C.out, dashed: true });
  arrow("a-out2", "usr", "right", 760, "natg", "right", 1420, [2580], { color: C.out, dashed: true });
  arrow("a-out3", "pod", "right", 1100, "natg", "right", 1470, [2550], { color: C.out, dashed: true });
  arrow("a-nat", "natg", "bottom", 2400, "pip2", "top", 2400, [], { color: C.out, dashed: true });
  arrow("a-inet", "pip2", "bottom", 2400, "inet", "top", 2400, [], { color: C.http });
  txt("footer", 40, 1900, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Use Azure Front Door to secure AKS workloads\"", { size: 20, color: "#495057" });
}
