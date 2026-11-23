// 130 Private Link and DNS in Virtual WAN: single-region workload.
export const meta = {
  num: 130,
  slug: "private-link-virtual-wan-dns-single-region-workload",
  title: "Single region scenario - Private Link and DNS in Azure Virtual WAN",
  url: "https://learn.microsoft.com/azure/architecture/networking/guide/private-link-virtual-wan-dns-single-region-workload",
  category: "Networking",
  status: "done",
  otherDiagrams: ["img1: single-region challenge", "img2: working solution with a virtual hub extension for DNS", "img3-10: portal screenshots"],
  substitutions: { "Azure Virtual WAN": "virtual-wans", "Virtual hub": "virtual-wan-hub", "Azure Firewall (DNS server)": "firewalls", "Azure DNS": "dns-zones", "Client": "virtual-machine", "Private Link endpoint": "private-link", "stgworkload00": "storage-accounts", "Subnet NSG": "network-security-groups" },
  differences: ["Region shown as a tinted frame with the label below.", "NSG shields drawn as small icons in subnet corners."],
};

export function draw(k) {
  const { TINT, txt, card, group, icon, arrow } = k;
  const S = 16;
  card("vwan", 80, 20, 200, 120, "virtual-wans", "Azure Virtual WAN", { size: S });
  card("dns", 600, 20, 170, 110, "dns-zones", "Azure DNS", { size: S });
  group("reg", 40, 210, 860, 900, null, { fill: TINT.subBox });
  txt("reg-lbl", 390, 1125, "West US3 region", { size: 20 });
  group("hub", 330, 260, 380, 180, null, { fill: TINT.white });
  card("vhub", 350, 280, 180, 120, "virtual-wan-hub", "Virtual hub", { size: S });
  card("fw", 575, 290, 120, 130, "firewalls", "Azure\nFirewall", { size: S });
  card("stg", 90, 800, 180, 110, "storage-accounts", "stgworkload00", { size: S });
  group("sp", 330, 540, 380, 540, null, { fill: TINT.white });
  group("ws", 350, 560, 340, 190, null, { fill: TINT.white, dashed: true });
  icon("ws-i", "subnet", 360, 570, 30);
  txt("ws-lbl", 400, 574, "Workload subnet", { size: 18 });
  card("client", 440, 615, 150, 110, "virtual-machine", "Client", { size: S });
  icon("ws-n", "network-security-groups", 650, 710, 30);
  group("ps", 350, 770, 340, 190, null, { fill: TINT.white, dashed: true });
  card("pe", 420, 790, 200, 110, "private-link", "Private Link endpoint", { size: S });
  icon("ps-i", "subnet", 360, 918, 30);
  txt("ps-lbl", 400, 922, "Private endpoint subnet", { size: 18 });
  icon("ps-n", "network-security-groups", 650, 918, 30);
  icon("sp-i", "virtual-networks", 350, 1015, 36);
  txt("sp-lbl", 395, 1012, "Workload spoke\nvirtual network", { size: 18 });
  arrow("peer", "hub", "bottom", 515, "sp", "top", 515, [], { head: null, color: "#1971c2" });
  txt("peer-lbl", 430, 480, "Peered", { size: 18, color: "#1971c2" });
  arrow("dnsq", "sp", "top", 680, "fw", "bottom", 680, [], { dashed: true, color: "#1971c2" });
  txt("dnsq-lbl", 700, 480, "DNS server", { size: 18, color: "#1971c2" });
  arrow("dnsf", "fw", "top", 680, "dns", "bottom", 680, [], { dashed: true, color: "#1971c2" });
  txt("footer", 20, 1170, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Single-region architecture\"", { size: 20, color: "#495057" });
}
