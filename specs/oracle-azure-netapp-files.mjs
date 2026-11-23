// 114 Oracle Database with Azure NetApp Files.
export const meta = {
  num: 114,
  slug: "oracle-azure-netapp-files",
  title: "Oracle Database with Azure NetApp Files",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/file-storage/oracle-azure-netapp-files",
  category: "Databases",
  status: "done",
  otherDiagrams: ["img1: consolidated Oracle databases", "img2-5: replication, backup and DR variants"],
  substitutions: { "Oracle VM": "virtual-machine", "Volume NIC": "network-interfaces", "ANF volumes": "azure-netapp-files" },
  differences: ["Volume cylinders drawn as Azure NetApp Files cards.", "Capacity pool drawn fully around the application volume group (official shows the pool behind its lower part)."],
};

export function draw(k) {
  const { TINT, txt, card, group, icon, arrow } = k;
  const S = 16;
  txt("title", 40, 0, "Oracle Database on Azure NetApp Files", { size: 28 });
  group("reg", 40, 60, 1200, 1100, null, { fill: TINT.white });
  icon("reg-i", "virtual-networks", 60, 75, 44);
  txt("reg-lbl", 120, 82, "Azure region", { size: 24 });
  group("az1", 70, 140, 1140, 990, null, { fill: TINT.white, dashed: true });
  txt("az1-lbl", 90, 150, "Availability zone 1", { size: 22 });
  group("vms", 100, 200, 1080, 240, null, { fill: TINT.white, dashed: true });
  icon("vms-i", "subnet", 120, 210, 40);
  txt("vms-lbl", 170, 218, "VM subnet", { size: 20 });
  card("vm", 420, 240, 200, 150, "virtual-machine", "Oracle VM", { size: S });
  txt("mounts", 680, 250, "/oracle/db1-ora-data1    10.0.1.1:/db1-ora-data1\n/oracle/db1-ora-log      10.0.1.2:/db1-ora-log\n/oracle/db1-ora-binary   10.0.1.3:/db1-ora-binary\n/oracle/db1-ora-backup   10.0.1.3:/db1-ora-backup", { size: 16 });

  group("anf", 100, 480, 1080, 620, null, { fill: TINT.white, dashed: true });
  icon("anf-i", "subnet", 120, 1040, 40);
  txt("anf-lbl", 170, 1048, "ANF delegated subnet", { size: 20 });
  group("cp", 130, 500, 1020, 530, null, { fill: TINT.warn });
  txt("cp-lbl", 150, 985, "Capacity pool (manual QoS)", { size: 20 });
  group("avg", 170, 520, 900, 450, null, { fill: TINT.sub });
  txt("avg-lbl", 190, 910, "Application volume group db1", { size: 20 });
  const X = [220, 520, 820];
  ["10.0.1.1", "10.0.1.2", "10.0.1.3"].forEach((ip, i) => card(`nic${i}`, X[i], 550, 180, 120, "network-interfaces", ip, { size: S }));
  card("v1", 220, 720, 180, 140, "azure-netapp-files", "db1-ora-data1", { size: S });
  card("v2", 520, 720, 180, 120, "azure-netapp-files", "db1-ora-log", { size: S });
  card("v3", 820, 700, 180, 80, "azure-netapp-files", "db1-ora-binary", { size: S });
  card("v4", 820, 790, 180, 110, "azure-netapp-files", "db1-ora-backup", { size: S });
  const C = { head: null, color: "#0b7285" };
  arrow("l0", "vm", "bottom", 500, "nic0", "top", 310, [470], { ...C, firstDir: "v" });
  arrow("l1", "vm", "bottom", 520, "nic1", "top", 610, [490], { ...C, firstDir: "v" });
  arrow("l2", "vm", "bottom", 540, "nic2", "top", 910, [470], { ...C, firstDir: "v" });
  arrow("n0", "nic0", "bottom", 310, "v1", "top", 310, [], C);
  arrow("n1", "nic1", "bottom", 610, "v2", "top", 610, [], C);
  arrow("n2", "nic2", "bottom", 910, "v3", "top", 910, [], C);
  txt("footer", 40, 1200, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Oracle VMs deployed on Azure NetApp Files\"", { size: 20, color: "#495057" });
}
