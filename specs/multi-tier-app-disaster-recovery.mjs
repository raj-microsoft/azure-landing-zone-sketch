// 049 Multitier web application built for high availability and disaster recovery.
export const meta = {
  num: 49,
  slug: "multi-tier-app-disaster-recovery",
  title: "Multitier web application built for high availability and disaster recovery",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/infrastructure/multi-tier-app-disaster-recovery",
  category: "Compute",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Internet": "globe-success", "Azure Traffic Manager": "traffic-manager-profiles", "Public IP address": "public-ip-addresses", "Load balancer / ILB / Site Recovery LB": "load-balancers", "WEB / APP VMs": "virtual-machine", "DB servers": "sql-server", "Disks / replica disks": "disks", "Virtual network": "virtual-networks" },
  differences: ["The vertical 'Availability sets' and 'Availability zones' brackets are horizontal labels.", "Disaster recovery (grey) components use a grey fill instead of grey icons."],
};

function half(k, Y, zones, s) {
  const { TINT, txt, card, box, group, arrow, line, both, step } = k;
  const X = 220, X2 = 1380;
  txt(`${s}-side`, 40, Y + 560, zones ? "Availability\nzones" : "Availability\nsets", { size: 20 });
  step(`${s}-sa`, 80, Y + 650, zones ? 3 : 4);
  card(`${s}-inet`, 1110, Y, 220, 130, "globe-success", "Internet");
  card(`${s}-tm`, 1110, Y + 200, 220, 150, "traffic-manager-profiles", "Azure Traffic\nManager", { size: 16 });
  step(`${s}-s1`, 1195, Y + 380, 1);
  arrow(`${s}-it`, `${s}-inet`, "bottom", null, `${s}-tm`, "top", null);

  const region = (p, R, ox, dr) => {
    const g = dr ? { fill: TINT.mg } : {};
    group(`${p}`, R, Y + 40, 860, 1320, dr ? "Region 2: disaster recovery site" : "Region 1: high availability", { fill: TINT.white, iconName: "virtual-networks", size: 18 });
    txt(`${p}-vn`, R + 260, Y + 1310, dr ? "Azure Site Recovery virtual network" : "Virtual network", { size: 16 });
    box(`${p}-pip`, ox + 20, Y + 90, 600, 64, "Public IP address", { size: 18, iconLeft: "public-ip-addresses", ...g });
    const lbW = zones ? 120 : 180, lbX = zones ? ox + 270 : ox + 230;
    const names = dr ? ["LB-Site\nRecovery", "ILB-Site\nRecovery", "ILB-Site\nRecovery"] : ["Load\nbalancer", "Internal load\nbalancer", "Internal load\nbalancer"];
    const rows = [["WEB", Y + 340], ["APP", Y + 680], ["DB", Y + 1020]];
    const lbY = [Y + 190, Y + 540, Y + 880];
    if (zones) {
      group(`${p}-z1`, ox, Y + 320, 260, 940, null, { fill: TINT.white });
      group(`${p}-z2`, ox + 400, Y + 320, 240, 940, null, { fill: TINT.white });
      txt(`${p}-z1l`, ox + 40, Y + 1180, "Availability\nzone 1", { size: 16 });
      txt(`${p}-z2l`, ox + 440, Y + 1180, "Availability\nzone 2", { size: 16 });
    } else {
      rows.forEach(([, y], i) => { group(`${p}-t${i}`, ox, y - 20, 640, 200, null, { fill: TINT.white }); txt(`${p}-t${i}l`, ox + 250, y + 145, "Availability set", { size: 16 }); });
    }
    rows.forEach(([n, y], i) => {
      const ic = n === "DB" ? "sql-server" : "virtual-machine";
      card(`${p}-${n}1`, ox + 30, y, 150, 130, ic, `${n}1`, g);
      card(`${p}-${n}2`, ox + 460, y, 150, 130, ic, `${n}2`, g);
      card(`${p}-lb${i}`, lbX, lbY[i], lbW, 110, "load-balancers", names[i], { size: 16, ...g });
      arrow(`${p}-l${i}a`, `${p}-lb${i}`, "left", null, `${p}-${n}1`, "top", null);
      arrow(`${p}-l${i}b`, `${p}-lb${i}`, "right", null, `${p}-${n}2`, "top", null);
    });
    arrow(`${p}-pl`, `${p}-pip`, "bottom", lbX + lbW / 2, `${p}-lb0`, "top", lbX + lbW / 2);
    both(`${p}-rep`, `${p}-DB1`, "right", Y + 1085, `${p}-DB2`, "left", Y + 1085);
    if (zones) txt(`${p}-repl`, ox + 275, Y + 1150, "Replication", { size: 16 });
    else txt(`${p}-repl`, ox + 260, Y + 1035, "Replication", { size: 16 });
    step(`${p}-st`, ox + 140, Y + 200, dr ? 6 : 2);
  };
  region(`${s}-r1`, X, X + 40, false);
  region(`${s}-r2`, X2, X2 + 180, true);
  card(`${s}-dk`, X + 700, Y + 700, 130, 130, "disks", "Disks", { size: 16 });
  card(`${s}-rd`, X2 + 20, Y + 700, 140, 130, "disks", "Replica\ndisks", { size: 16, fill: TINT.mg });
  line(`${s}-d0`, `${s}-r1-WEB2`, "right", null, `${s}-dk`, "top", null);
  line(`${s}-d1`, `${s}-r1-APP2`, "right", Y + 745, `${s}-dk`, "left", Y + 745);
  line(`${s}-d2`, `${s}-r1-DB2`, "right", null, `${s}-dk`, "bottom", null);
  line(`${s}-e0`, `${s}-r2-WEB1`, "left", null, `${s}-rd`, "top", null);
  line(`${s}-e1`, `${s}-r2-APP1`, "left", Y + 745, `${s}-rd`, "right", Y + 745);
  line(`${s}-e2`, `${s}-r2-DB1`, "left", null, `${s}-rd`, "bottom", null);
  arrow(`${s}-rp`, `${s}-dk`, "right", Y + 790, `${s}-rd`, "left", Y + 790, [], { dashed: true });
  step(`${s}-s5`, 1195, Y + 820, 5);
  arrow(`${s}-tp`, `${s}-tm`, "left", Y + 260, `${s}-r1-pip`, "right", Y + 122, [X + 700, Y + 122]);
  arrow(`${s}-fo`, `${s}-tm`, "right", Y + 260, `${s}-r2-pip`, "left", Y + 122, [1355, Y + 122], { dashed: true, color: "#e03131" });
  txt(`${s}-fol`, 1250, Y + 160, "Failover", { size: 16, color: "#e03131" });
}

export function draw(k) {
  k.txt("title", 60, 10, "Multitier web app built for high availability and disaster recovery", { size: 30 });
  half(k, 80, false, "a");
  half(k, 1520, true, "z");
  k.txt("footer", 60, 2930, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Multitier web application built for high availability and disaster recovery\"", { size: 20, color: "#495057" });
}
