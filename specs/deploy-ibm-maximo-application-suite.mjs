// 019 Deploy IBM Maximo Application Suite on Azure Red Hat OpenShift. Redraw of the article's diagram.
export const meta = {
  num: 19,
  slug: "deploy-ibm-maximo-application-suite",
  title: "Deploy IBM Maximo Application Suite on Azure",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/apps/deploy-ibm-maximo-application-suite",
  category: "Web + apps",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Public / Private DNS zone": "dns-zones", "Azure Files Premium/Standard": "storage-azure-files", "Twilio SendGrid": "sendgrid-accounts", "ARO nodes": "virtual-machine" },
  differences: [
    "The virtual network gateway sits just outside the VNet edge with a link to it, instead of straddling the edge.",
    "Network security group badges are shown as small NSG icons at the top right of each subnet.",
    "The public load balancer arrows to the control plane and worker subnet are routed through lanes.",
  ],
};

export function draw(k) {
  const { TINT, txt, zone, group, icon, iconCap, card, arrow, line } = k;
  txt("title", 40, 10, "IBM Maximo Application Suite on Azure Red Hat OpenShift", { size: 30 });
  const NSG = "network-security-groups";
  iconCap("pubdns", "dns-zones", 90, 120, "Public DNS zone");
  card("user1", 40, 280, 180, 120, "users", "User");
  card("plb", 40, 460, 180, 140, "load-balancers", "Public load\nbalancer");
  card("vng", 40, 640, 180, 140, "virtual-network-gateways", "Virtual Network\ngateway");
  card("er", 40, 820, 180, 140, "expressroute-circuits", "ExpressRoute\ncircuit");
  card("user2", 40, 1040, 180, 120, "users", "User");
  line("u1-plb", "user1", "bottom", 130, "plb", "top", 130);
  line("er-vng", "er", "top", 130, "vng", "bottom", 130);
  line("u2-er", "user2", "top", 130, "er", "bottom", 130);

  group("vnet", 300, 70, 2000, 1120, "Azure Virtual Network", { fill: TINT.sub, size: 26, iconName: "virtual-networks", iconSize: 48 });
  line("vng-vnet", "vng", "right", 710, "vnet", "left", 710);
  group("aro", 500, 160, 1760, 620, "Azure Red Hat OpenShift (ARO)", { dashed: true, fill: TINT.white, size: 20, iconName: "azure-red-hat-openshift" });
  group("cps", 530, 240, 820, 510, "ARO control plane subnet", { dashed: true, fill: TINT.white, iconName: NSG });
  card("ilb", 560, 300, 200, 140, "load-balancers", "Internal load\nbalancer");
  group("cp", 820, 400, 500, 330, "ARO managed control plane", { fill: TINT.mg, align: "center" });
  [0, 1, 2].forEach((i) => icon(`cpv${i}`, "virtual-machine", 860 + i * 150, 520, 80));
  group("ws", 1380, 240, 850, 510, "ARO worker subnet", { dashed: true, fill: TINT.white, iconName: NSG });
  group("wn", 1410, 300, 790, 430, "ARO worker nodes with\nIBM Maximo Application Suite", { fill: TINT.mg, align: "center" });
  [0, 1, 2, 3, 4, 5].forEach((i) => icon(`wv${i}`, "virtual-machine", 1500 + (i % 3) * 230, 400 + Math.floor(i / 3) * 150, 80));
  arrow("ilb-cp", "ilb", "right", 370, "cp", "top", 1000, [1000]);
  arrow("plb-cp", "plb", "right", 500, "cp", "left", 500);
  arrow("plb-wn", "plb", "right", 560, "wn", "bottom", 1800, [280, 760]);

  group("eps", 340, 820, 760, 340, "Endpoints and other services\nsubnet", { dashed: true, fill: TINT.white, iconName: NSG });
  card("pe1", 380, 940, 160, 130, "private-endpoints", "Private\nendpoint");
  card("pe2", 580, 940, 160, 130, "private-endpoints", "Private\nendpoint");
  card("jump", 800, 920, 260, 180, "virtual-machine", "Optional jump box\n(B2ms series)");
  group("sqls", 1140, 820, 560, 340, "SQL Managed Instance\ndelegated subnet", { dashed: true, fill: TINT.white, iconName: NSG });
  card("sqlmi", 1300, 920, 260, 170, "sql-managed-instance", "Azure SQL Managed\nInstance");
  group("bas", 1740, 820, 520, 340, "Azure Bastion\nsubnet", { dashed: true, fill: TINT.white, iconName: NSG });
  card("bastion", 1880, 920, 220, 150, "bastions", "Azure Bastion");

  card("fp", 380, 1260, 240, 150, "storage-azure-files", "Azure Files\nPremium (NFS)");
  card("fs", 660, 1260, 240, 150, "storage-azure-files", "Azure Files\nStandard (SMB)");
  card("pdns", 1200, 1260, 220, 140, "dns-zones", "Private DNS zone");
  card("admin", 1880, 1260, 220, 130, "users", "Cluster\nadmin");
  card("sendgrid", 2150, 1260, 200, 130, "sendgrid-accounts", "Twilio\nSendGrid");
  arrow("pe1-fp", "pe1", "bottom", 460, "fp", "top", 460);
  arrow("pe2-fs", "pe2", "bottom", 660, "fs", "top", 660, [1200, 780]);
  line("vnet-dns", "vnet", "bottom", 1310, "pdns", "top", 1310);
  arrow("adm-bas", "admin", "top", 1990, "bastion", "bottom", 1990);

  txt("footer", 40, 1440, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Deploy IBM Maximo Application Suite on Azure\"", { size: 20, color: "#495057" });
}
