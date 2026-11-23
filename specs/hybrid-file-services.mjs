// 030 Hybrid file services.
export const meta = {
  num: 30,
  slug: "hybrid-file-services",
  title: "Hybrid file services",
  url: "https://learn.microsoft.com/azure/architecture/hybrid/hybrid-file-services",
  category: "Hybrid + multicloud",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Microsoft Entra Connect sync": "entra-connect-sync", "Microsoft Entra tenant": "entra-connect", "Azure Storage Sync": "storage-sync-services", "Azure File Share": "storage-azure-files", "Domain controller (Azure)": "virtual-machine" },
  differences: [
    "On-premises domain controllers, file servers and clients are plain labelled shapes (no Azure icon).",
    "Dashed two-way arrows follow orthogonal routes.",
  ],
};

export function draw(k) {
  const { TINT, txt, box, card, group, step, arrow, both } = k;
  const D = { dashed: true };
  txt("title", 60, 10, "Hybrid file services", { size: 30 });
  group("hq", 60, 110, 640, 1220, "On-premises HQ", { fill: TINT.onprem, dashed: true, align: "center", size: 20 });
  box("dc1", 90, 170, 200, 100, "Domain\ncontroller", { fill: TINT.white });
  card("sync", 380, 150, 260, 150, "entra-connect-sync", "Microsoft Entra\nConnect sync");
  box("fshq", 380, 560, 240, 100, "File server\n(HQ)", { fill: TINT.white });
  box("c1hq", 90, 1150, 220, 100, "Client-1 (HQ)", { fill: TINT.white });
  box("c2hq", 400, 1150, 220, 100, "Client-2 (HQ)", { fill: TINT.white });
  txt("dots1", 340, 1180, "...", { size: 24 });

  group("az", 840, 110, 640, 1040, "Azure", { fill: TINT.sub, dashed: true, align: "center", size: 20, iconName: "virtual-networks" });
  txt("az-vn", 1300, 1160, "Azure virtual\nnetwork", { size: 18 });
  card("entra", 880, 170, 260, 150, "entra-connect", "Microsoft\nEntra tenant");
  card("dcaz", 1180, 170, 260, 150, "virtual-machine", "Domain\ncontroller");
  card("ss", 960, 360, 280, 160, "storage-sync-services", "Azure Storage\nSync");
  card("afs", 960, 570, 280, 160, "storage-azure-files", "Azure File\nShare");
  card("vm", 960, 900, 280, 180, "virtual-machine", "Virtual\nMachine");

  group("br", 1620, 110, 640, 1220, "On-premises Branch", { fill: TINT.onprem, dashed: true, align: "center", size: 20 });
  box("dc2", 1960, 170, 220, 100, "Domain\ncontroller", { fill: TINT.white });
  box("fsbr", 1700, 560, 240, 100, "File server\n(Branch)", { fill: TINT.white });
  box("c1br", 1660, 1150, 220, 100, "Client-1 (Branch)", { fill: TINT.white, size: 18 });
  box("c2br", 1990, 1150, 240, 100, "Client-2 (Branch)", { fill: TINT.white, size: 18 });
  txt("dots2", 1910, 1180, "...", { size: 24 });

  arrow("dc-sync", "dc1", "right", 220, "sync", "left", 220);
  arrow("sync-en", "sync", "right", 200, "entra", "left", 200);
  both("m1", "fshq", "top", 500, "ss", "left", 420, [420], D);
  txt("m1-t", 505, 440, "Azure File Sync\nmanagement traffic", { size: 18 }); step("s1", 780, 370, 1);
  both("m2", "ss", "right", 420, "fsbr", "top", 1820, [1820], D);
  both("t1", "fshq", "right", 610, "afs", "left", 610, [], D);
  txt("t1-t", 420, 680, "Azure File Sync traffic", { size: 18 }); step("s2", 780, 560, 2);
  both("t2", "afs", "right", 610, "fsbr", "left", 610, [], D);
  both("c-hq", "fshq", "left", 610, "c1hq", "top", 200, [200], D); step("s3", 220, 850, 3);
  both("c-br", "fsbr", "right", 610, "c2br", "top", 2110, [2110], D); step("s3b", 2130, 850, 3);
  both("afs-vm", "afs", "bottom", 1100, "vm", "top", 1100, [], D); step("s4", 1140, 790, 4);

  txt("footer", 60, 1370, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Hybrid file services\"", { size: 20, color: "#495057" });
}
