// 132 Private Link and DNS in Azure Virtual WAN (guide).
export const meta = {
  num: 132,
  slug: "private-link-virtual-wan-dns-guide",
  title: "Guide to Private Link and DNS in Azure Virtual WAN",
  url: "https://learn.microsoft.com/azure/architecture/networking/guide/private-link-virtual-wan-dns-guide",
  category: "Networking",
  status: "done",
  otherDiagrams: ["img1: virtual network connection security screenshot", "img2-3: basic Private Link and DNS variants"],
  substitutions: { "Azure Virtual WAN": "virtual-wans", "Virtual WAN hub": "virtual-wan-hub", "Azure Firewall": "firewalls", "Virtual network": "virtual-networks" },
  differences: ["Dashed callouts from the hubs and firewalls to the settings boxes drawn orthogonally.", "Dotted 'configured DNS server' links run from each firewall to its virtual networks."],
};

export function draw(k) {
  const { TINT, txt, card, group, arrow, box } = k;
  const S = 16;
  card("vwan", 530, 10, 220, 130, "virtual-wans", "Azure Virtual WAN", { size: S });
  const region = (p, x, name, fwx) => {
    group(`${p}-r`, x, 200, 480, 440, null, { fill: TINT.subBox });
    txt(`${p}-lbl`, x + 150, 655, name, { size: 22 });
    card(`${p}-hub`, x + 70, 240, 220, 130, "virtual-wan-hub", "Virtual WAN hub", { size: S });
    card(`${p}-fw`, fwx, 400, 130, 90, "firewalls", "Azure Firewall", { size: S });
    card(`${p}-v1`, x + 20, 520, 140, 100, "virtual-networks", "Virtual\nnetwork", { size: S });
    card(`${p}-v2`, x + 180, 520, 140, 100, "virtual-networks", "Virtual\nnetwork", { size: S });
  };
  region("e", 20, "East US region", 345);
  region("w", 780, "West US3 region", 790);
  // East: hub at x 90..310, vnets 40..180, 200..340
  arrow("e-p1", "e-hub", "bottom", 110, "e-v1", "top", 110, [], { head: null, color: "#1971c2" });
  arrow("e-p2", "e-hub", "bottom", 270, "e-v2", "top", 270, [], { head: null, color: "#1971c2" });
  txt("e-pl", 150, 420, "Peered", { size: S, color: "#1971c2" });
  arrow("e-d1", "e-fw", "bottom", 380, "e-v2", "right", 570, [], { dashed: true, color: "#1971c2", head: null });
  txt("e-dl", 392, 520, "Configured\nDNS server", { size: S, color: "#1971c2" });
  // West: hub at 850..1070, vnets 800..940, 960..1100
  arrow("w-p1", "w-hub", "bottom", 932, "w-v1", "top", 932, [], { head: null, color: "#1971c2" });
  arrow("w-p2", "w-hub", "bottom", 1060, "w-v2", "top", 1060, [], { head: null, color: "#1971c2" });
  txt("w-pl", 1110, 420, "Peered", { size: S, color: "#1971c2" });
  arrow("w-d1", "w-fw", "bottom", 860, "w-v1", "top", 860, [], { dashed: true, color: "#1971c2", head: null });
  txt("w-dl", 945, 440, "Configured\nDNS server", { size: S, color: "#1971c2" });
  arrow("conn", "e-hub", "right", 260, "w-hub", "left", 260, [], { head: null, color: "#1971c2" });
  txt("conn-lbl", 580, 228, "Connected", { size: S, color: "#1971c2" });
  box("rt", 515, 290, 250, 100, "Internet traffic:\n  Via Azure Firewall\nPrivate traffic:\n  Via Azure Firewall", { size: S, align: "left" });
  box("dnsb", 515, 420, 250, 80, "DNS Server: Azure DNS\nDNS Proxy: Enabled", { size: S, align: "left" });
  arrow("c1", "e-hub", "right", 340, "rt", "left", 340, [], { dashed: true, head: null, color: "#1971c2" });
  arrow("c2", "w-hub", "left", 340, "rt", "right", 340, [], { dashed: true, head: null, color: "#1971c2" });
  arrow("c3", "e-fw", "right", 460, "dnsb", "left", 460, [], { dashed: true, head: null, color: "#1971c2" });
  arrow("c4", "w-fw", "left", 460, "dnsb", "right", 460, [], { dashed: true, head: null, color: "#1971c2" });
  txt("footer", 20, 710, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Starting Virtual WAN architecture\"", { size: 20, color: "#495057" });
}
