// 035 SAP deployment on Azure by using an Oracle database.
export const meta = {
  num: 35,
  slug: "sap-production",
  title: "SAP deployment on Azure by using an Oracle database",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/apps/sap-production",
  category: "SAP",
  status: "done",
  otherDiagrams: ["Production SAP system on Oracle with disaster recovery region"],
  substitutions: { "On-premises VMs / SAP VMs / observer VMs": "virtual-machine", "Gateway / zone-redundant gateway": "virtual-network-gateways", "ExpressRoute": "expressroute-circuits", "Internal load balancers": "load-balancers", "Azure Files NFS ZRS": "storage-azure-files", "Oracle database": "oracle-database" },
  differences: ["NSG shield badges are omitted.", "The shared app-tier line linking the pools to the database subnet is drawn as two arrows."],
};

export function draw(k) {
  const { TINT, txt, box, icon, card, group, step, arrow } = k;
  const VN = { fill: TINT.white, dashed: true, stroke: "#1971c2" };
  txt("title", 60, 10, "SAP deployment on Azure by using an Oracle database", { size: 30 });
  group("op", 60, 420, 380, 360, "On-premises\nnetwork", { fill: TINT.onprem, align: "center", size: 20 });
  box("ov1", 90, 500, 130, 80, "VM", { size: 16, iconLeft: "virtual-machine" });
  box("ov2", 90, 590, 130, 80, "VM", { size: 16, iconLeft: "virtual-machine" });
  box("ov3", 90, 680, 130, 80, "VM", { size: 16, iconLeft: "virtual-machine" });
  card("gw", 250, 540, 170, 170, "virtual-network-gateways", "Gateway");
  card("er", 470, 380, 170, 150, "expressroute-circuits", "ExpressRoute", { size: 16 });

  group("reg", 680, 90, 2500, 1080, "Region 1 (Primary region)", { fill: TINT.sub, size: 22 });
  group("hub", 710, 160, 560, 970, "Hub virtual network", { ...VN, align: "center", iconName: "virtual-networks" });
  group("gws", 740, 240, 240, 860, "Gateway\nsubnet", { fill: TINT.mg, align: "center" });
  card("zgw", 760, 520, 200, 200, "virtual-network-gateways", "Zone-\nredundant\ngateway", { size: 16 });
  step("s1", 840, 750, 1);
  group("ssn", 1000, 240, 240, 860, "Shared services\nsubnet", { fill: TINT.mg, align: "center" });
  card("bas", 1020, 500, 200, 160, "bastions", "Azure Bastion");

  group("spk", 1420, 160, 1730, 970, "Spoke virtual network", { ...VN, align: "center", iconName: "virtual-networks" });
  group("app", 1450, 240, 1000, 860, "Application layer subnet", { fill: TINT.mg, align: "center" });
  group("pools", 1480, 330, 740, 620, null, { fill: TINT.white, dashed: true, stroke: "#1971c2" });
  for (const [c, x, lbl] of [["wd", 1500, "SAP Web\nDispatcher pool"], ["as", 1740, "SAP application\nserver pool"], ["cs", 1980, "SAP Central\nServices cluster"]]) {
    card(`${c}1`, x, 360, 140, 120, "virtual-machine", "VM", { size: 16 });
    card(`${c}2`, x, 730, 140, 120, "virtual-machine", "VM", { size: 16 });
    txt(`${c}-lbl`, x - 10, 975, lbl, { size: 16 });
  }
  box("lbw", 1630, 540, 120, 70, "ILB", { size: 16, iconLeft: "load-balancers" });
  box("lbc", 2100, 540, 120, 70, "ILB", { size: 16, iconLeft: "load-balancers" });
  arrow("wd-v", "wd1", "bottom", 1570, "wd2", "top", 1570, [], { head: null });
  arrow("as-v", "as1", "bottom", 1810, "as2", "top", 1810, [], { head: null });
  arrow("cs-v", "cs1", "bottom", 2050, "cs2", "top", 2050, [], { head: null });
  arrow("wd-lb", "wd1", "right", 450, "lbw", "top", 1690, [], { head: null });
  arrow("cs-lb", "cs1", "right", 450, "lbc", "top", 2160, [], { head: null });
  step("s2", 2160, 880, 2);
  card("afs", 2260, 500, 160, 160, "storage-azure-files", "Azure Files\nNFS ZRS", { size: 16 });
  step("s5", 2320, 880, 5);

  group("dbs", 2480, 240, 640, 860, "Database layer subnet", { fill: TINT.mg, align: "center" });
  card("obs1", 2510, 340, 150, 120, "virtual-machine", "VM", { size: 16 });
  card("obs2", 2510, 720, 150, 120, "virtual-machine", "VM", { size: 16 });
  card("ora1", 2900, 330, 180, 150, "oracle-database", "Oracle DB", { size: 16 });
  card("ora2", 2900, 710, 180, 150, "oracle-database", "Oracle DB", { size: 16 });
  step("s4", 2560, 580, 4); step("s3", 3040, 580, 3);
  arrow("o1", "obs1", "right", 400, "ora1", "left", 400, [], { dashed: true, head: null });
  arrow("o2", "obs2", "right", 780, "ora2", "left", 780, [], { dashed: true, head: null });
  txt("obs-lbl", 2690, 540, "Observer\nmonitoring\ndatabase\nstatus", { size: 16 });
  arrow("rep", "ora1", "bottom", 2990, "ora2", "top", 2990, [], { dashed: true, tail: "arrow" });
  txt("rep-lbl", 2860, 540, "Database\nreplication", { size: 16 });

  arrow("ergw", "gw", "right", 625, "zgw", "left", 625, [], { head: null });
  arrow("peer", "hub", "right", 520, "spk", "left", 520, [], { tail: "arrow" });
  txt("peer-lbl", 1290, 560, "Virtual\nnetwork\npeering", { size: 16 });
  arrow("app-db1", "as1", "top", 1850, "ora1", "top", 3030, [320]);
  arrow("app-db2", "as1", "top", 1770, "ora2", "right", 785, [310, 3130]);

  txt("footer", 60, 1210, "Pencil-sketch redraw of the Azure Architecture Center diagram \"SAP deployment on Azure by using an Oracle database\"", { size: 20, color: "#495057" });
}
