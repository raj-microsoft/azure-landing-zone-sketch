// 118 Migrate IBM i series to Skytap on Azure.
export const meta = {
  num: 118,
  slug: "migrate-ibm-i-series-to-azure-with-skytap",
  title: "Migrate IBM i series to Azure with Skytap",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/mainframe/migrate-ibm-i-series-to-azure-with-skytap",
  category: "Mainframe",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Azure Data Box VM / Web application VM / FTP server": "virtual-machine", "Azure Data Box gateway": "data-box", "Azure Private Link endpoint": "private-link", "Azure Storage account": "storage-accounts", "Azure Blob container": "blob-block", "SSD managed disk": "disks", "Accelerated networking": "network-interfaces", "On-premises user": "users" },
  differences: ["Layout derived from the 117 AIX Skytap scene (same structure); IBM i LPARs, COBOL/RPG/BRMS, IBM DB2, IIS, RPG I/O API and FTP service are non-Azure products drawn as labelled sketch shapes.", "Headquarters and datacenter building glyphs omitted.", "Line hops replaced by orthogonal lanes."],
};

export function draw(k) {
  const { TINT, txt, card, group, box, icon, arrow, step } = k;
  const S = 16;
  const both = (id, f, fs, fa, t, ts, ta, lanes = [], o = {}) => arrow(id, f, fs, fa, t, ts, ta, lanes, { tail: "arrow", ...o });
  const C = (id, x, y, ic, l, w = 200, h = 120) => card(id, x, y, w, h, ic, l, { size: S });
  const B = (id, x, y, w, h, l, fill = TINT.white) => box(id, x, y, w, h, l, { size: 16, fill });
  const lpar = (p, x, y, n) => {
    B(`${p}l`, x, y, 200, 70, "IBM i LPAR", TINT.onprem);
    group(`${p}g`, x - 10, y + 90, 220, 210, null, { fill: TINT.white, dashed: true });
    B(`${p}w`, x, y + 100, 200, 95, `COBOL program ${n}\nRPG program ${n}\nBRMS`);
    B(`${p}d`, x, y + 210, 200, 75, "IBM DB2\nfor i series");
  };
  txt("title", 40, 0, "Migrate IBM i series to Skytap on Azure", { size: 28 });
  txt("onp-t", 520, 50, "On-premises", { size: 24 });
  txt("az-t", 900, 50, "Azure", { size: 24 });

  group("off", 40, 110, 760, 380, null, { fill: TINT.onprem, dashed: true });
  txt("off-lbl", 60, 120, "On-premises headquarters", { size: 18 });
  C("opu", 300, 200, "users", "On-premises user", 200, 120);
  step("s1", 240, 230, 1);

  group("dc", 40, 760, 760, 580, null, { fill: TINT.onprem, dashed: true });
  txt("dc-lbl", 60, 770, "On-premises datacenter", { size: 18 });
  txt("ftp1-lbl", 70, 830, "FTP transfer\nincremental backup", { size: 16 });
  lpar("a", 80, 930, 1);
  lpar("b", 330, 930, 2);
  C("dbvm", 560, 790, "virtual-machine", "Azure Data Box VM\nWindows", 220, 110);
  C("dbg1", 580, 920, "data-box", "Azure Data\nBox gateway", 200, 110);
  B("ftp1", 580, 1100, 200, 80, "FTP server\nLinux", TINT.onprem);
  B("fsv1", 580, 1200, 200, 80, "FTP service");
  step("s2", 600, 1045, 2);
  arrow("a-nfs1", "ftp1", "top", 680, "dbg1", "bottom", 680);
  txt("nfs1-lbl", 690, 1050, "NFS\ntransfer", { size: 16 });
  arrow("a-ftp1", "al", "top", 180, "ftp1", "left", 1140, [880, 540, 1140], { firstDir: "v" });

  C("er", 860, 560, "expressroute-circuits", "Azure ExpressRoute", 220, 120);
  both("a-u", "opu", "bottom", 400, "er", "left", 600, [600]);
  arrow("a-db", "dbvm", "top", 670, "er", "left", 650, [650]);

  group("reg", 1120, 110, 1260, 1230, null, { fill: TINT.white, dashed: true });
  txt("reg-lbl", 1140, 120, "Azure Region: US East", { size: 18 });
  group("vn", 1150, 160, 740, 420, null, { fill: TINT.sub, dashed: true });
  icon("vn-i", "virtual-networks", 1165, 170, 40);
  txt("vn-lbl", 1215, 172, "Azure virtual network 10.0.0.0/16\nSubnet 10.0.0.0/24", { size: 16 });
  group("wvm", 1170, 230, 520, 330, null, { fill: TINT.white, dashed: true });
  txt("wvm-lbl", 1190, 240, "Web application VM, Windows Server 2019", { size: 16 });
  B("iis", 1190, 280, 480, 70, "Microsoft Internet Information Services 10 (IIS)");
  B("rpg", 1190, 365, 480, 70, "RPG I/O model API");
  box("ssd", 1190, 450, 230, 90, "SSD managed\ndisk", { size: 16, iconLeft: "disks" });
  box("acc", 1440, 450, 230, 90, "Accelerated\nnetworking", { size: 16, iconLeft: "network-interfaces" });
  C("pl", 1710, 240, "private-link", "Azure Private\nLink endpoint", 160, 140);
  step("s3", 1720, 400, 3);
  icon("nsg", "network-security-groups", 1820, 500, 44);
  txt("nsg-lbl", 1700, 510, "NSG", { size: 16 });
  arrow("a-iis", "pl", "left", 315, "iis", "right", 315);

  group("sto", 1940, 160, 410, 420, null, { fill: TINT.data });
  icon("sto-i", "storage-accounts", 1955, 170, 40);
  txt("sto-lbl", 2005, 172, "Azure Storage account\n(Landing zone from on-premises)", { size: 16 });
  box("bl1", 1960, 240, 370, 90, "Blob container 1\nVirtual tape file a, b, c...", { size: 16, iconLeft: "blob-block" });
  box("bl2", 1960, 345, 370, 90, "Blob container 2\nVirtual tape file x, y, z...", { size: 16, iconLeft: "blob-block" });
  box("bl3", 1960, 450, 370, 90, "Blob container [n]\nVirtual tape file n, n, n...", { size: 16, iconLeft: "blob-block" });

  group("sky", 1150, 720, 1200, 590, null, { fill: TINT.app });
  txt("sky-lbl", 1180, 735, "Skytap dedicated I\nSeries environment", { size: 18 });
  txt("rst-lbl", 1900, 735, "Restore from\nAzure Storage", { size: 18 });
  lpar("c", 1190, 900, 1);
  lpar("d", 1440, 900, 2);
  step("s5", 1680, 880, 5);
  C("dbg2", 2050, 900, "data-box", "Azure Data\nBox gateway", 220, 120);
  step("s4", 2100, 840, 4);
  B("ftp2", 2060, 1130, 200, 80, "FTP server\nLinux", TINT.onprem);
  arrow("a-g2", "dbg2", "bottom", 2160, "ftp2", "top", 2160);
  arrow("a-ftp2", "ftp2", "left", 1170, "dl", "right", 935, [1900, 935]);
  arrow("a-sto-g", "sto", "bottom", 2160, "dbg2", "top", 2160);
  arrow("a-er-sto", "er", "right", 650, "sto", "left", 560, [1910, 560]);
  arrow("a-er-d", "er", "right", 620, "dl", "top", 1540, [1540]);
  arrow("a-er-iis", "er", "right", 590, "wvm", "left", 400, [1130, 400]);
  both("a-rpg-c", "rpg", "left", 420, "cl", "left", 935, [1160, 935]);
  txt("footer", 40, 1390, "Pencil-sketch redraw of the Azure Architecture Center diagram \"migrate IBM i workloads to Skytap on Azure\"", { size: 20, color: "#495057" });
}
