// 120 Enterprise file shares with disaster recovery.
export const meta = {
  num: 120,
  slug: "enterprise-file-shares-disaster-recovery",
  title: "Enterprise file shares with disaster recovery",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/file-storage/enterprise-file-shares-disaster-recovery",
  category: "Storage",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Client / AD DS servers": "virtual-machine", "Vol1 volumes": "azure-netapp-files" },
  differences: ["Volume cylinders drawn as Azure NetApp Files cards.", "Region logo shown as a text label (no sketch icon)."],
};

export function draw(k) {
  const { TINT, txt, card, group, icon, arrow, box, poly } = k;
  const S = 16;
  txt("unc", 610, 10, "\\\\contoso.com\\namespace\\vol1", { size: 22, align: "center" });
  card("client", 540, 50, 140, 110, "virtual-machine", "Client", { size: S });
  card("ad1", 390, 200, 200, 110, "virtual-machine", "Active Directory\nDomain Services", { size: S });
  card("ad2", 750, 200, 200, 110, "virtual-machine", "Active Directory\nDomain Services", { size: S });
  txt("ad1-ns", 490, 322, "DFS Namespaces\n(primary)", { size: S, align: "center" });
  txt("ad2-ns", 850, 322, "DFS Namespaces\n(secondary)", { size: S, align: "center" });
  arrow("adrep", "ad1", "right", null, "ad2", "left", null, [], { tail: "arrow", color: "#1971c2" });
  poly("stem", [[610, 160], [610, 255]], { color: "#7048e8" });
  icon("sub-i", "subscriptions", 110, 380, 36);
  txt("sub-lbl", 155, 386, "Azure subscription", { size: 20 });
  group("sub", 110, 430, 1120, 400, null, { fill: TINT.white, dashed: true, stroke: "#2b8a3e" });
  const region = (p, x, n, vx, vlabel) => {
    txt(`${p}-lbl`, x + 10, 450, `Azure Region ${n}`, { size: 22 });
    icon(`${p}-ai`, "azure-netapp-files", x + 10, 490, 36);
    txt(`${p}-al`, x + 55, 497, "Azure NetApp Files", { size: S });
    group(`${p}-anf`, x + 20, 540, 380, 250, null, { fill: TINT.subBox });
    group(`${p}-sn`, x + 40, 570, 340, 200, null, { fill: TINT.white, dashed: true });
    icon(`${p}-si`, "virtual-networks", x + 50, 720, 36);
    card(`${p}-vol`, vx, 600, 180, 100, "azure-netapp-files", vlabel, { size: S });
  };
  region("r1", 140, 1, 320, "Vol1-Primary");
  region("r2", 780, 2, 960, "Vol1-Secondary");
  arrow("c1", "client", "left", 80, "r1-vol", "top", 420, [365, 530]);
  arrow("c2", "client", "right", 80, "r2-vol", "top", 1080, [], { dashed: true });
  arrow("crr", "r1-anf", "right", 700, "r2-anf", "left", 700, [], { tail: "arrow" });
  txt("crr-lbl", 670, 625, "Azure NetApp Files\ncross-region replication", { size: 18, align: "center", color: "#2b8a3e" });
  txt("footer", 110, 870, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Architecture for file shares with automatic failover\"", { size: 20, color: "#495057" });
}
