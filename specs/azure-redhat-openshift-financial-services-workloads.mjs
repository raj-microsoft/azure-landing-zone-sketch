// 074 Azure Red Hat OpenShift in the financial services industry.
export const meta = {
  num: 74,
  slug: "azure-redhat-openshift-financial-services-workloads",
  title: "Use Azure Red Hat OpenShift in the financial services industry",
  url: "https://learn.microsoft.com/azure/architecture/reference-architectures/containers/aro/azure-redhat-openshift-financial-services-workloads",
  category: "Containers",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Client / Developers / End customers": "users", "Azure Front Door + WAF": "front-door-and-cdn-profiles", "Private Link service": "private-link-service", "Private endpoints": "private-endpoints", "Private DNS zones": "dns-zones", "Azure Red Hat OpenShift private cluster / OpenShift cluster / pipelines": "azure-red-hat-openshift", "Control plane and worker nodes": "virtual-machine", "Route table": "route-tables", "Azure Cosmos DB": "azure-cosmos-db", "Key vault": "key-vaults", "Microsoft Entra ID": "entra-connect", "Azure Firewall": "firewalls", "Firewall IP address": "public-ip-addresses", "Azure Bastion": "bastions", "Virtual machine": "virtual-machine", "Gateway (on-premises)": "virtual-network-gateways", "Spoke / hub virtual network": "virtual-networks", "Logging and monitoring": "monitor", "Azure Arc": "azure-arc", "Customer's container registry": "container-registries", "On-premises databases": "sql-database", "Internet": "globe-success" },
  differences: ["GitHub Enterprise and the on-premises firewall and gateway are plain sketch shapes (non-Azure, no logos).", "Subnet NSG shields, the 'interchangeable product' orange markers and the colour legend are omitted; inbound arrows are green, outbound red, internal dark as in the original."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, both, step, icon } = k;
  const IN = { color: "#2f9e44" }, OUT = { color: "#e03131" };
  txt("title", 40, 10, "Azure Red Hat OpenShift hybrid reference architecture: FSI use case", { size: 30 });

  card("client", 40, 90, 200, 150, "users", "Client accesses\nweb app", { size: 16 });
  card("afd", 40, 430, 200, 160, "front-door-and-cdn-profiles", "Azure Front\nDoor + WAF", { size: 16 });
  arrow("c-afd", "client", "bottom", null, "afd", "top", null, [], IN);
  step("s5", 160, 330, 5);

  group("aro", 300, 260, 1340, 680, "Azure Red Hat OpenShift private cluster implementation", { fill: TINT.sub });
  group("afds", 360, 380, 380, 250, "Azure Front Door subnet", { fill: TINT.white });
  card("pls", 450, 440, 220, 160, "private-link-service", "Private Link service", { size: 16 });
  arrow("afd-pls", "afd", "right", 520, "pls", "left", 520, [], IN);
  step("s6", 300, 470, 6);
  group("pes", 500, 680, 480, 210, "Azure private endpoint subnet", { fill: TINT.white });
  card("pe1", 540, 730, 160, 130, "private-endpoints", "Private\nendpoint", { size: 16 });
  card("pe2", 780, 730, 160, 130, "private-endpoints", "Private\nendpoint", { size: 16 });
  card("pdns", 320, 700, 160, 160, "dns-zones", "Private DNS\nzones", { size: 16 });

  group("cl", 1080, 360, 520, 540, null, { fill: TINT.white, dashed: true, stroke: "#868e96" });
  card("arocl", 1100, 380, 180, 170, "azure-red-hat-openshift", "Azure Red Hat\nOpenShift\nprivate cluster", { size: 16 });
  group("cps", 1300, 380, 280, 220, "Control plane\nsubnet", { fill: TINT.sub, size: 16 });
  icon("cp1", "virtual-machine", 1320, 480, 56); icon("cp2", "virtual-machine", 1410, 480, 56); icon("cp3", "virtual-machine", 1500, 480, 56);
  group("wks", 1300, 640, 280, 220, "Worker subnet", { fill: TINT.sub, size: 16 });
  icon("wk1", "virtual-machine", 1320, 730, 56); icon("wk2", "virtual-machine", 1410, 730, 56); icon("wk3", "virtual-machine", 1500, 730, 56);
  arrow("pls-cl", "pls", "right", 560, "cl", "left", 600, [900], IN);
  both("pes-cl", "pes", "right", 760, "cl", "left", 760);
  box("rt", 1680, 560, 160, 110, "Route\ntable", { iconLeft: "route-tables", size: 16 });

  card("cosmos", 120, 1000, 220, 160, "azure-cosmos-db", "Azure Cosmos DB", { size: 16 });
  card("kv", 780, 1000, 200, 160, "key-vaults", "Key vault", { size: 16 });
  card("entra", 1180, 1000, 220, 160, "entra-connect", "Microsoft Entra ID", { size: 16 });
  arrow("cos-pe", "cosmos", "right", 1080, "pe1", "bottom", 620, [], { color: "#343a40" });
  arrow("kv-pe", "kv", "top", 860, "pe2", "bottom", 860);
  arrow("cl-en", "cl", "bottom", 1290, "entra", "top", 1290);

  group("hub", 1960, 260, 860, 680, null, { fill: TINT.sub });
  group("fws", 2000, 300, 340, 200, "AzureFirewallSubnet", { fill: TINT.white, size: 16 });
  card("fw", 2080, 340, 200, 150, "firewalls", "Azure Firewall", { size: 16 });
  card("fwip", 2470, 320, 220, 160, "public-ip-addresses", "Firewall IP\naddress", { size: 16 });
  arrow("fw-ip", "fw", "right", 400, "fwip", "left", 400, [], OUT);
  group("bass", 2000, 530, 340, 200, "AzureBastionSubnet", { fill: TINT.white, size: 16 });
  card("bas", 2080, 570, 200, 150, "bastions", "Azure Bastion", { size: 16 });
  group("vms", 2400, 530, 380, 200, "VMSubnet", { fill: TINT.white, size: 16 });
  card("vm", 2490, 560, 200, 150, "virtual-machine", "Virtual machine", { size: 16 });
  arrow("bas-vm", "bas", "right", 640, "vm", "left", 640);
  group("gws", 2000, 760, 340, 160, "GatewaySubnet", { fill: TINT.white, size: 16 });
  box("gw", 2030, 810, 280, 90, "Gateway\n(On-premises)", { iconLeft: "virtual-network-gateways", size: 16 });

  arrow("cp-fw", "cps", "right", 420, "fw", "left", 420, [1880], OUT);
  step("s4", 1880, 300, 4);
  arrow("wk-fw", "wks", "right", 820, "fw", "left", 460, [1900], OUT);
  arrow("rt-fw", "rt", "right", 600, "fw", "left", 480, [1920]);
  txt("rt-lbl", 1640, 190, "Route 0.0.0.0 Azure Firewall\nRegress forced route", { size: 16 });
  arrow("gw-wk", "gw", "left", 830, "wks", "right", 680, [1940], OUT);
  step("s3a", 1720, 760, 3);
  txt("dep-lbl", 1660, 820, "Deploy to Azure Red\nHat OpenShift cluster", { size: 16 });

  card("inet", 3000, 520, 180, 150, "globe-success", "Internet", { size: 16 });
  arrow("ip-inet", "fwip", "right", 400, "inet", "top", 3090, [], { color: "#e03131", dashed: true });
  txt("noi-lbl", 2860, 300, "No internet\naccess allowed", { size: 16, color: "#e03131" });

  card("spv", 1460, 1000, 200, 150, "virtual-networks", "Spoke virtual\nnetwork", { size: 16 });
  card("hbv", 1960, 1000, 200, 150, "virtual-networks", "Hub virtual\nnetwork", { size: 16 });
  both("peer", "spv", "bottom", null, "hbv", "bottom", null, [1220]);
  txt("peer-lbl", 1700, 1170, "Virtual network\npeering", { size: 16 });
  card("logm", 2400, 1000, 200, 160, "monitor", "Logging and\nmonitoring", { size: 16 });
  card("arc", 2660, 1000, 180, 160, "azure-arc", "Azure Arc", { size: 16 });

  group("ocp", 1000, 1360, 1480, 900, "OpenShift Container Platform (OCP) implementation (on-premises, other cloud, IaaS)", { fill: TINT.sub });
  card("dev", 1120, 1560, 200, 160, "users", "Developers", { size: 16 });
  box("gh", 1120, 1880, 200, 120, "GitHub\nEnterprise", { fill: TINT.mg, size: 16 });
  arrow("dev-gh", "dev", "bottom", null, "gh", "top", null);
  step("s1", 1240, 1780, 1);
  card("pdns2", 1060, 2080, 180, 160, "dns-zones", "Private DNS\nzones", { size: 16 });

  group("oc", 1460, 1500, 960, 720, null, { fill: TINT.white, dashed: true, stroke: "#868e96" });
  card("odb", 1900, 1400, 220, 80, "sql-database", "On-premises databases", { size: 16 });
  card("ocl", 1700, 1520, 200, 160, "azure-red-hat-openshift", "OpenShift\ncluster", { size: 16 });
  card("creg", 1480, 1700, 200, 160, "container-registries", "Customer's\ncontainer registry", { size: 16 });
  card("pipe", 1480, 1900, 200, 160, "azure-red-hat-openshift", "OpenShift\npipelines", { size: 16 });
  both("gh-pipe", "gh", "right", 1940, "pipe", "left", 1940);
  arrow("pipe-reg", "pipe", "top", null, "creg", "bottom", null);
  step("s2", 1690, 1800, 2);
  arrow("db-ocl", "odb", "left", 1440, "ocl", "top", 1800, [1800], { firstDir: "h" });
  step("s3b", 1930, 1560, 3);
  txt("dep2-lbl", 2190, 1520, "Deploy to Azure Red\nHat OpenShift cluster", { size: 16 });
  arrow("ocl-gw", "ocl", "right", 1620, "gw", "bottom", 2170, [], OUT);
  txt("er-lbl", 2200, 1240, "ExpressRoute - Private", { size: 16 });

  group("ocpc", 1740, 1720, 620, 220, "OCP control plane", { fill: TINT.sub, size: 16 });
  icon("oc1", "virtual-machine", 1800, 1800, 56); icon("oc2", "virtual-machine", 1960, 1800, 56); icon("oc3", "virtual-machine", 2120, 1800, 56);
  group("ocpw", 1740, 1980, 620, 220, "OCP worker nodes", { fill: TINT.sub, size: 16 });
  icon("ow1", "virtual-machine", 1800, 2060, 56); icon("ow2", "virtual-machine", 1960, 2060, 56); icon("ow3", "virtual-machine", 2120, 2060, 56);

  box("opfw", 2560, 1860, 260, 120, "On-premises firewall\nand gateway", { fill: TINT.mg, size: 16, stroke: "#e03131" });
  card("inet2", 2900, 1840, 180, 150, "globe-success", "Internet", { size: 16 });
  card("cust", 3160, 1840, 200, 150, "users", "End customers\naccess web app", { size: 16 });
  arrow("cu-in", "cust", "left", 1920, "inet2", "right", 1920, [], IN);
  arrow("in-fw", "inet2", "left", 1920, "opfw", "right", 1920, [], IN);

  txt("footer", 40, 2320, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Azure Red Hat OpenShift hybrid reference architecture: FSI use case\"", { size: 20, color: "#495057" });
}
