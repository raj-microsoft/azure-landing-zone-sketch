// 059 ArcGIS Pro on Azure Virtual Desktop.
export const meta = {
  num: 59,
  slug: "esri-arcgis-azure-virtual-desktop",
  title: "ArcGIS Pro on Azure Virtual Desktop",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/data/esri-arcgis-azure-virtual-desktop",
  category: "Virtual desktop",
  status: "done",
  otherDiagrams: ["Screenshot of ArcGIS and VMs in the Remote Desktop tool"],
  substitutions: { "Resource group": "resource-groups", "Azure NetApp Files": "azure-netapp-files", "Azure SQL Managed Instance": "sql-managed-instance", "Windows desktop VMs / ArcGIS VMs": "virtual-machine", "Azure Virtual Desktop host pool": "host-pools", "Azure Virtual Desktop workspace": "workspaces", "Azure Application Gateway": "application-gateways", "GIS subscription": "key-vaults", "Azure Virtual Desktop service": "azure-virtual-desktop", "Users": "users", "Azure virtual network": "virtual-networks" },
  differences: ["FSLogix user profile management is a plain labelled box (no logo)."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, line } = k;
  txt("title", 40, 10, "ArcGIS Pro on Azure Virtual Desktop", { size: 30 });
  group("reg", 80, 110, 1700, 1440, "Azure region", { fill: TINT.white, dashed: true, stroke: "#4a90d9", size: 20, align: "center" });

  group("strg", 260, 190, 1240, 380, "Storage resource group", { fill: TINT.white, dashed: true, stroke: "#74c0fc", iconName: "resource-groups", size: 18, align: "right" });
  group("anfs", 330, 260, 320, 270, "Azure NetApp\nFiles subnet", { fill: TINT.mg, size: 18, align: "center" });
  card("anf", 370, 340, 240, 160, "azure-netapp-files", "Azure NetApp Files");
  group("sqls", 1020, 260, 320, 270, "SQL subnet", { fill: TINT.mg, size: 18, align: "center" });
  card("sqlmi", 1050, 320, 260, 180, "sql-managed-instance", "Azure SQL\nManaged Instance");

  group("drg", 120, 650, 760, 430, "Desktop resource group", { fill: TINT.white, dashed: true, stroke: "#74c0fc", iconName: "resource-groups", size: 18 });
  group("ds", 150, 730, 700, 320, "Desktop subnet", { fill: TINT.mg, size: 18, align: "center" });
  k.icon("vm1", "virtual-machine", 190, 800, 72);
  k.icon("vm2", "virtual-machine", 300, 800, 72);
  k.icon("vm3", "virtual-machine", 410, 800, 72);
  txt("vms-lbl", 180, 900, "Windows desktop virtual\nmachines", { size: 18 });
  box("fsl", 560, 790, 260, 110, "FSLogix\nUser profile\nmanagement", { fill: TINT.white, size: 18 });

  group("avdrg", 150, 1150, 680, 360, "Azure Virtual Desktop resource group", { fill: TINT.white, dashed: true, stroke: "#74c0fc", iconName: "resource-groups", size: 18 });
  card("hp", 190, 1240, 260, 220, "host-pools", "Azure Virtual\nDesktop host\npool");
  card("ws", 520, 1240, 260, 220, "workspaces", "Azure Virtual\nDesktop workspace");

  group("erg", 960, 650, 800, 870, "Esri resource group", { fill: TINT.white, dashed: true, stroke: "#74c0fc", iconName: "resource-groups", size: 18, align: "right" });
  group("es", 990, 730, 740, 760, "Esri subnet", { fill: TINT.mg, size: 18, align: "center" });
  card("arcs", 1030, 800, 360, 220, "virtual-machine", "ArcGIS Web Adaptor,\nArcGIS Server\n(Federated)");
  card("ds2", 1430, 800, 260, 220, "virtual-machine", "ArcGIS Data\nStore");
  card("portal", 1200, 1060, 320, 180, "virtual-machine", "ArcGIS Web\nAdaptor, Portal");
  card("agw", 1200, 1280, 320, 180, "application-gateways", "Azure Application\nGateway");

  card("gis", 1840, 860, 200, 170, "key-vaults", "GIS\nsubscription");
  card("vnet", 1600, 1580, 240, 140, "virtual-networks", "Azure virtual network");

  card("avds", 330, 1620, 260, 170, "azure-virtual-desktop", "Azure Virtual\nDesktop service");
  card("rdu", 300, 1880, 320, 190, "users", "Remote desktop user\nArcGIS analyst");
  card("ext", 1200, 1880, 320, 190, "users", "External access for\npublic users");
  line("u-avd", "rdu", "top", 460, "avds", "bottom", 460, [], { dashed: true });
  line("ext-agw", "ext", "top", 1360, "agw", "bottom", 1360, [], { dashed: true });

  txt("footer", 40, 2120, "Pencil-sketch redraw of the Azure Architecture Center diagram \"ArcGIS Pro on Azure Virtual Desktop\"", { size: 20, color: "#495057" });
}
