// 078 SQL Server on Azure Virtual Machines with Azure NetApp Files.
export const meta = {
  num: 78,
  slug: "sql-server-azure-netapp-files",
  title: "SQL Server on Azure Virtual Machines with Azure NetApp Files",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/file-storage/sql-server-azure-netapp-files",
  category: "Databases",
  status: "done",
  otherDiagrams: ["Second SQL Server deployment variant", "Benefits of SQL Server with Azure NetApp Files"],
  substitutions: { "SQL Server VM": "azure-sql-vm", "SQL-data volumes": "sql-database", "SQL-log / SQL-backup volumes": "files", "Capacity pool": "azure-netapp-files", "VM subnet / delegated subnet / Virtual Network": "virtual-networks" },
  differences: [],
};

export function draw(k) {
  const { TINT, txt, card, group, line, icon } = k;
  txt("title", 40, 10, "SQL Server on Azure VMs with Azure NetApp Files", { size: 30 });
  group("region", 40, 80, 1420, 1260, "Azure region", { fill: TINT.white, size: 24 });
  group("vnet", 80, 160, 1340, 1140, null, { fill: TINT.sub });
  icon("vnet-i", "virtual-networks", 110, 1180, 48);
  txt("vnet-lbl", 170, 1240, "Virtual Network", { size: 22 });
  txt("az-lbl", 560, 180, "Availability zone 1", { size: 26 });
  group("az", 120, 240, 1260, 920, null, { fill: "#f1f3f5", dashed: true, stroke: "#868e96" });
  icon("vms-i", "virtual-networks", 150, 260, 44);
  txt("vms-lbl", 210, 266, "VM subnet", { size: 22 });
  group("vms", 150, 320, 1200, 280, null, { fill: TINT.white });
  txt("paths", 190, 360, "\\\\SQL\\data1\n\\\\SQL\\data2\n\\\\SQL\\log\n\\\\SQL\\backup", { size: 22 });
  txt("paths2", 460, 360, "\\\\<servername>:\\SQL\\data1\n\\\\<servername>:\\SQL\\data2\n\\\\<servername>:\\SQL\\log\n\\\\<servername>:\\SQL\\backup", { size: 22 });
  card("vm", 1040, 340, 260, 230, "azure-sql-vm", "SQL\nServer VM");

  group("anf", 150, 680, 1200, 360, null, { fill: TINT.white });
  group("pool", 180, 700, 1140, 320, null, { fill: TINT.onprem });
  txt("pool-lbl", 640, 970, "Capacity pool", { size: 24 });
  card("d1", 230, 740, 220, 200, "sql-database", "SQL-data1");
  card("d2", 490, 740, 220, 200, "sql-database", "SQL-data2");
  card("lg", 750, 740, 220, 200, "files", "SQL-log");
  card("bk", 1010, 740, 220, 200, "files", "SQL-backup");
  line("v1", "vm", "bottom", 1140, "d1", "top", 340, [620]);
  line("v2", "vm", "bottom", 1160, "d2", "top", 600, [640]);
  line("v3", "vm", "bottom", 1180, "lg", "top", 860, [660]);
  line("v4", "vm", "bottom", 1120, "bk", "top", 1120, [] );
  icon("anf-i", "virtual-networks", 150, 1060, 44);
  txt("anf-lbl", 210, 1060, "Azure NetApp Files\ndelegated subnet", { size: 22 });
  txt("footer", 40, 1380, "Pencil-sketch redraw of the Azure Architecture Center diagram \"SQL Server deployment with Azure NetApp Files\"", { size: 20, color: "#495057" });
}
