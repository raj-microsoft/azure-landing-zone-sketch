// 117 Migrate AIX workloads to Skytap on Azure.
export const meta = {
  num: 117,
  slug: "migrate-aix-workloads-to-azure-with-skytap",
  title: "Migrate AIX workloads to Skytap on Azure",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/mainframe/migrate-aix-workloads-to-azure-with-skytap",
  category: "Mainframe",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Azure Data Box VM / Web application VM": "virtual-machine", "Azure Data Box Gateway": "data-box", "Azure Private Link endpoint": "private-link", "Azure Storage account": "storage-accounts", "Azure Blob container": "blob-block", "SSD managed disk": "disks", "Accelerated networking": "network-interfaces", "On-premises user": "users" },
  differences: ["AIX LPARs, NIM servers, WebSphere, IBM Db2, IIS and RPG I/O API are non-Azure products drawn as labelled sketch shapes.", "Line hops where links cross are replaced by orthogonal lanes; some lanes are rerouted round the Skytap environment."],
};

export function draw(k) {
  const { TINT, txt, card, group, box, icon, arrow, step } = k;
  const S = 16;
  const both = (id, f, fs, fa, t, ts, ta, lanes = [], o = {}) => arrow(id, f, fs, fa, t, ts, ta, lanes, { tail: "arrow", ...o });
  const C = (id, x, y, ic, l, w = 200, h = 120) => card(id, x, y, w, h, ic, l, { size: S });
  const B = (id, x, y, w, h, l, fill = TINT.white) => box(id, x, y, w, h, l, { size: 16, fill });
  const lpar = (p, x, y) => {
    B(`${p}l`, x, y, 200, 70, "AIX LPAR", TINT.onprem);
    group(`${p}g`, x - 10, y + 90, 220, 190, null, { fill: TINT.white, dashed: true });
    B(`${p}w`, x, y + 100, 200, 75, "WebSphere\napplication stack");
    B(`${p}d`, x, y + 190, 200, 75, "IBM Db2 for AIX");
  };
  txt("title", 40, 0, "Migrate AIX workloads to Skytap on Azure", { size: 28 });
  txt("onp-t", 520, 50, "On-premises", { size: 24 });
  txt("az-t", 900, 50, "Azure", { size: 24 });

  group("off", 40, 110, 760, 380, null, { fill: TINT.onprem, dashed: true });
  txt("off-lbl", 60, 120, "On-premises corporate offices", { size: 18 });
  C("opu", 300, 200, "users", "On-premises user", 200, 120);
  step("s1", 240, 230, 1);

  group("dc", 40, 760, 760, 560, null, { fill: TINT.onprem, dashed: true });
  txt("dc-lbl", 60, 770, "On-premises datacenter", { size: 18 });
  txt("nim1-lbl", 70, 850, "NIM management and backup services", { size: 16 });
  lpar("a", 80, 930);
  lpar("b", 330, 930);
  C("dbvm", 560, 790, "virtual-machine", "Azure Data Box VM\nWindows", 220, 110);
  C("dbg1", 580, 920, "data-box", "Azure Data\nBox Gateway", 200, 110);
  step("s2", 600, 1045, 2);
  B("nim1", 580, 1100, 200, 80, "NIM server\nUnix", TINT.onprem);
  B("os1", 580, 1200, 200, 90, "Operating system\nmanagement and\nbackup services");
  arrow("a-nfs1", "nim1", "top", 680, "dbg1", "bottom", 680);
  txt("nfs1-lbl", 690, 1050, "NFS\ntransfer", { size: 16 });
  arrow("a-nim1", "al", "top", 180, "nim1", "left", 1140, [880, 540, 1140], { firstDir: "v" });

  C("er", 860, 560, "expressroute-circuits", "Azure ExpressRoute", 220, 120);
  both("a-u", "opu", "bottom", 400, "er", "left", 600, [600]);
  arrow("a-db", "dbvm", "top", 670, "er", "left", 650, [650]);

  group("reg", 1120, 110, 1260, 1210, null, { fill: TINT.white, dashed: true });
  txt("reg-lbl", 1140, 120, "Azure East US region", { size: 18 });
  group("vn", 1150, 160, 740, 420, null, { fill: TINT.sub, dashed: true });
  icon("vn-i", "virtual-networks", 1165, 170, 40);
  txt("vn-lbl", 1215, 172, "Virtual network 10.0.0.0/16\nSubnet 10.0.0.0/24", { size: 16 });
  group("wvm", 1170, 230, 520, 330, null, { fill: TINT.white, dashed: true });
  txt("wvm-lbl", 1190, 240, "Web application VM, Windows Server 2019", { size: 16 });
  B("iis", 1190, 280, 480, 70, "Microsoft Internet Information Services (IIS) 10");
  B("rpg", 1190, 365, 480, 70, "RPG I/O Model API");
  box("ssd", 1190, 450, 230, 90, "SSD managed\ndisk", { size: 16, iconLeft: "disks" });
  box("acc", 1440, 450, 230, 90, "Accelerated\nnetworking", { size: 16, iconLeft: "network-interfaces" });
  C("pl", 1710, 240, "private-link", "Azure Private\nLink endpoint", 160, 140);
  step("s3", 1720, 400, 3);
  icon("nsg", "network-security-groups", 1820, 500, 44);
  txt("nsg-lbl", 1700, 510, "NSG", { size: 16 });
  both("a-iis", "iis", "right", 315, "pl", "left", 315);

  group("sto", 1940, 160, 410, 420, null, { fill: TINT.data });
  icon("sto-i", "storage-accounts", 1955, 170, 40);
  txt("sto-lbl", 2005, 172, "Azure Storage account\n(Landing zone from on-premises)", { size: 16 });
  box("bl1", 1960, 240, 370, 90, "Blob container 1\nmksysba datab.vg datac.vg...", { size: 16, iconLeft: "blob-block" });
  box("bl2", 1960, 345, 370, 90, "Blob container 2\nmksysbx datay.vg dataz.vg...", { size: 16, iconLeft: "blob-block" });
  box("bl3", 1960, 450, 370, 90, "Blob container [n]\nmksysbn datan.vg...", { size: 16, iconLeft: "blob-block" });
  arrow("a-pl", "pl", "right", 270, "sto", "left", 270);

  group("sky", 1150, 720, 1200, 570, null, { fill: TINT.app });
  txt("sky-lbl", 1700, 735, "Skytap dedicated\nAIX environment", { size: 18 });
  txt("nim2-lbl", 1180, 735, "NIM management and\nbackup services", { size: 16 });
  lpar("c", 1190, 900);
  lpar("d", 1440, 900);
  B("nim2", 1690, 1060, 200, 80, "NIM server\nUnix", TINT.onprem);
  B("os2", 1690, 1160, 200, 100, "Operating system\nmanagement and\nbackup services");
  step("s5", 1720, 960, 5);
  C("dbg2", 2050, 900, "data-box", "Azure Data\nBox Gateway", 220, 120);
  step("s4", 2100, 840, 4);
  arrow("a-nfs2", "dbg2", "bottom", 2160, "nim2", "right", 1100, [1100]);
  txt("nfs2-lbl", 1920, 1060, "NFS transfer", { size: 16 });
  both("a-sb", "sto", "bottom", 2160, "dbg2", "top", 2160);
  arrow("a-nim2", "nim2", "top", 1790, "cl", "top", 1250, [850, 1250], { firstDir: "v" });
  arrow("a-nim3", "nim2", "top", 1840, "dl", "top", 1540, [870, 1540], { firstDir: "v" });
  arrow("a-er-sky", "er", "right", 650, "sky", "top", 1600, [1600]);
  arrow("a-er-pl", "er", "right", 620, "pl", "bottom", 1790, [1790]);
  arrow("a-er-iis", "er", "right", 590, "wvm", "left", 520, [1130, 520]);
  arrow("a-er-c", "er", "bottom", 970, "cl", "left", 935, [700, 1140, 935], { firstDir: "v" });
  txt("footer", 40, 1370, "Pencil-sketch redraw of the Azure Architecture Center diagram \"migrate IBM AIX workloads to Skytap on Azure\"", { size: 20, color: "#495057" });
}
