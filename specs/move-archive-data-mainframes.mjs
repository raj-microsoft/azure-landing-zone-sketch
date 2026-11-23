// 122 Move archive data from mainframe systems to Azure.
export const meta = {
  num: 122,
  slug: "move-archive-data-mainframes",
  title: "Move archive data from mainframe systems to Azure",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/mainframe/move-archive-data-mainframes",
  category: "Mainframe",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Tape / VSAM / GDG / sequential files": "file", "Windows VM with self-hosted IR": "virtual-machine", "FTP connector": "ftp", "Copy activity": "code", "Azure hot storage": "storage-accounts", "Azure cold storage": "blob-block", "Azure Backup archive": "backup-vault" },
  differences: ["Db2, IMS, mainframe, application, JCL-to-Blob solution, ISV solutions and Delete drawn as labelled shapes.", "Step 3b placed beside 3a/3c above the JCL solution."],
};

export function draw(k) {
  const { TINT, txt, card, group, arrow, box, step, poly } = k;
  const S = 16;
  txt("op-lbl", 560, 10, "On-premises", { size: 28 });
  txt("az-lbl", 1140, 2, "Azure", { size: 28 });
  group("op", 30, 60, 1060, 760, null, { fill: TINT.white, dashed: true });
  poly("div", [[770, 60], [770, 820]], { color: "#adb5bd", dashed: true });
  group("dl", 190, 90, 560, 700, "Data layer", { fill: TINT.white, dashed: true });
  group("files", 210, 140, 520, 170, "Files", { fill: TINT.white });
  [["tape", "Tape"], ["vsam", "VSAM"], ["gdg", "GDG"], ["psf", "Physical\nsequential\nfiles"]].forEach(([id, l], i) => card(id, 220 + i * 125, 180, 120, 120, "file", l, { size: S }));
  group("db", 270, 400, 400, 130, "Popular databases", { fill: TINT.white });
  box("db2", 300, 450, 150, 66, "Db2", { fill: TINT.data, size: S });
  box("ims", 490, 450, 150, 66, "IMS", { fill: TINT.data, size: S });
  box("mf", 210, 650, 220, 80, "On-premises\nmainframe/midrange", { fill: TINT.onprem, size: S });
  box("app", 45, 400, 130, 70, "Application", { fill: TINT.onprem, size: S });
  txt("vm-hdr", 930, 70, "Windows virtual machine with\nself-hosted integration runtime", { size: S, align: "center" });
  card("vm", 840, 130, 180, 120, "virtual-machine", "Self-hosted IR", { size: S });
  step("s2", 1025, 215, 2);
  step("s3a", 800, 292, "3a"); step("s3b", 910, 292, "3b"); step("s3c", 1010, 292, "3c");
  box("jcl", 820, 355, 220, 90, "Microsoft Mainframe\nJCL to Azure Blob\nsolution", { fill: TINT.app, size: S });
  card("dbox", 850, 470, 160, 110, "data-box", "Azure Data\nBox", { size: S });
  step("s4", 800, 505, 4);
  box("isv", 840, 630, 180, 90, "3rd party ISV\nsolutions", { fill: TINT.app, size: S });
  step("s5", 1025, 590, 5);
  step("s8", 782, 605, 8);
  txt("recall", 776, 664, "Recall", { size: S });
  step("s6", 782, 712, 6);
  txt("sync", 772, 756, "Periodic\nsync", { size: S });
  txt("vnet-lbl", 1300, 30, "Virtual network 10.0.0.0/16\nSubnet 10.0.0.0/24", { size: S });
  group("vnet", 1135, 90, 490, 740, null, { fill: TINT.white, dashed: true });
  k.icon("vnet-ic", "virtual-networks", 1250, 36, 40);
  step("s1", 1040, 150, 1);
  group("adf", 1170, 120, 420, 190, "Azure Data Factory", { fill: TINT.white, dashed: true, iconName: "data-factories" });
  card("ftp", 1190, 175, 160, 110, "ftp", "FTP connector", { size: S });
  card("copy", 1390, 175, 180, 110, "code", "Azure Data Factory\ncopy activity", { size: S });
  group("dt", 1170, 430, 420, 370, "Data tier", { fill: TINT.white, dashed: true });
  card("hot", 1190, 490, 160, 110, "storage-accounts", "Azure hot\nstorage", { size: S });
  box("del", 1400, 490, 160, 110, "Delete", { fill: TINT.warn, size: S });
  step("s7", 1356, 495, 7);
  card("cold", 1190, 670, 160, 110, "blob-block", "Azure cold\nstorage", { size: S });
  card("bk", 1400, 670, 160, 110, "backup-vault", "Azure Backup\narchive", { size: S });
  arrow("e-app", "app", "right", null, "dl", "left", 435, []);
  arrow("e1a", "files", "right", 200, "vm", "left", 200, []);
  arrow("e1b", "vm", "right", 200, "adf", "left", 200, []);
  arrow("edb", "db", "top", 300, "copy", "bottom", 1480, [340], { firstDir: "v" });
  arrow("e3a", "files", "bottom", 500, "jcl", "left", 375, [], { firstDir: "v" });
  arrow("e3c", "jcl", "right", 380, "dt", "top", 1290, []);
  arrow("ecopy", "copy", "bottom", 1540, "dt", "top", 1540, []);
  arrow("e4", "files", "bottom", 230, "dbox", "left", 560, [], { firstDir: "v" });
  arrow("e4b", "dbox", "right", 525, "vnet", "left", 525, []);
  arrow("e5", "isv", "right", 690, "dt", "left", 690, []);
  arrow("e8", "isv", "left", 655, "dl", "right", 655, [], { tail: "arrow" });
  arrow("e6", "dl", "right", 700, "isv", "left", 700, []);
  arrow("hc", "hot", "bottom", null, "cold", "top", null, [], { tail: "arrow" });
  arrow("cb", "cold", "right", null, "bk", "left", null, [], { tail: "arrow" });
  arrow("db-", "del", "bottom", null, "bk", "top", null, [], { tail: "arrow" });
  txt("footer", 30, 860, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Archiving mainframe data to Azure\"", { size: 20, color: "#495057" });
}
