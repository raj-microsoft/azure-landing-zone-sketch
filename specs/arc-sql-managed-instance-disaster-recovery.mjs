// 119 Disaster recovery for Azure Arc-enabled SQL Managed Instance.
export const meta = {
  num: 119,
  slug: "arc-sql-managed-instance-disaster-recovery",
  title: "Deploy an Azure Arc-enabled SQL managed instance for disaster recovery",
  url: "https://learn.microsoft.com/azure/architecture/hybrid/arc-sql-managed-instance-disaster-recovery",
  category: "Hybrid",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Pod": "kubernetes-services", "Azure Arc data controller": "arc-data-services", "Domain controller (Entra ID glyph)": "entra-connect", "DNS": "dns-zones" },
  differences: ["Availability group band drawn as a free outline across the pods.", "Domain controller icons given short captions."],
};

export function draw(k) {
  const { TINT, txt, card, group, icon, arrow, box, poly } = k;
  const S = 16;
  poly("divider", [[670, 0], [670, 1120]], { color: "#91a7ff", width: 3 });
  box("peer", 540, 110, 260, 60, "Virtual network peering", { fill: TINT.sub, size: S });
  box("rep", 560, 900, 220, 60, "Active Directory\nreplication", { fill: TINT.sub, size: S });
  const side = (p, x0, dc, site) => {
    txt(`${p}-title`, x0 + 305, 10, `High availability\nsingle Kubernetes cluster onboarded as an\nAzure Arc-enabled Kubernetes cluster in ${dc} (${site} site)`, { size: 16, align: "center" });
    group(`${p}-vnet`, x0, 190, 610, 540, null, { fill: TINT.white, dashed: true });
    icon(`${p}-vi`, "virtual-networks", x0 + 15, 205, 40);
    card(`${p}-dc`, x0 + 215, 215, 180, 120, "arc-data-services", "Azure Arc data controller", { size: S });
    const roles = ["primary", "secondary", "secondary"];
    roles.forEach((r, i) => {
      const px = x0 + 130 + i * 160;
      group(`${p}-pod${i}`, px, 380, 145, 230, null, { fill: TINT.sub });
      txt(`${p}-pl${i}`, px + 55, 388, "Pod", { size: S });
      icon(`${p}-pi${i}`, "kubernetes-services", px + 52, 414, 40);
      card(`${p}-sql${i}`, px + 8, 470, 129, 128, "arc-sql-managed-instance", `SQL Managed\nInstance\n${r}`, { size: S });
    });
    poly(`${p}-ag`, [[x0 + 10, 462], [x0 + 600, 462], [x0 + 600, 606], [x0 + 10, 606], [x0 + 10, 462]], { color: "#868e96" });
    txt(`${p}-dag`, x0 + 15, 392, "Distributed\navailability\ngroup", { size: S });
    txt(`${p}-agl`, x0 + 15, 505, "Availability\ngroup", { size: S });
    icon(`${p}-ki`, "arc-kubernetes", x0 + 120, 640, 52);
    txt(`${p}-kl`, x0 + 180, 652, "Azure Arc-enabled Kubernetes", { size: 24 });
    const L = { head: null };
    arrow(`${p}-t0`, `${p}-dc`, "bottom", x0 + 265, `${p}-pod0`, "top", x0 + 202, [348], { ...L, firstDir: "v" });
    arrow(`${p}-t1`, `${p}-dc`, "bottom", x0 + 305, `${p}-pod1`, "top", x0 + 362, [358], { ...L, firstDir: "v" });
    arrow(`${p}-t2`, `${p}-dc`, "bottom", x0 + 345, `${p}-pod2`, "top", x0 + 522, [368], { ...L, firstDir: "v" });
    group(`${p}-dv`, x0 + 150, 770, 340, 330, null, { fill: TINT.white, dashed: true });
    icon(`${p}-dvi`, "virtual-networks", x0 + 160, 778, 36);
    group(`${p}-dcb`, x0 + 170, 820, 300, 260, "Domain controller", { fill: TINT.sub });
    card(`${p}-en`, x0 + 185, 870, 130, 80, "entra-connect", "Entra ID", { size: S });
    card(`${p}-dns`, x0 + 325, 870, 130, 80, "dns-zones", "DNS", { size: S });
    card(`${p}-vm`, x0 + 255, 985, 130, 80, "virtual-machine", "VM", { size: S });
    arrow(`${p}-v1`, `${p}-vm`, "top", x0 + 290, `${p}-en`, "bottom", x0 + 250, [966]);
    arrow(`${p}-v2`, `${p}-vm`, "top", x0 + 350, `${p}-dns`, "bottom", x0 + 390, [970]);
  };
  side("l", 30, "datacenter 1", "primary");
  side("r", 700, "datacenter 2", "secondary");
  arrow("pl", "peer", "left", null, "l-vnet", "top", 335, []);
  arrow("pr", "peer", "right", null, "r-vnet", "top", 1005, []);
  arrow("rl", "rep", "left", null, "l-dv", "right", 930, []);
  arrow("rr", "rep", "right", null, "r-dv", "left", 930, []);
  txt("footer", 30, 1140, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Azure Arc-enabled SQL Managed Instance topology\"", { size: 20, color: "#495057" });
}
