// 131 Virtual hub extension pattern - Private Link and DNS in Azure Virtual WAN.
export const meta = {
  num: 131,
  slug: "private-link-virtual-wan-dns-virtual-hub-extension-pattern",
  title: "Virtual hub extension pattern",
  url: "https://learn.microsoft.com/azure/architecture/networking/guide/private-link-virtual-wan-dns-virtual-hub-extension-pattern",
  category: "Networking",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Azure Virtual WAN": "virtual-wans", "Virtual hub": "virtual-wan-hub", "Azure DNS / Private DNS zone": "dns-zones", "DNS Private Resolver": "dns-private-resolver", "Client": "virtual-machine", "Subnet NSG": "network-security-groups" },
  differences: ["Hub-extension dotted outlines start below the virtual hub instead of overlapping it.", "Peered asterisks kept in the labels."],
};

export function draw(k) {
  const { TINT, txt, card, group, icon, arrow, step } = k;
  const S = 16;
  card("vwan", 60, 20, 200, 120, "virtual-wans", "Azure Virtual WAN", { size: S });
  card("adns", 960, 20, 160, 110, "dns-zones", "Azure DNS", { size: S });
  group("reg", 40, 180, 1110, 650, null, { fill: TINT.subBox });
  txt("reg-lbl", 500, 845, "West US3 region", { size: 20 });
  group("hub", 70, 210, 840, 110, null, { fill: TINT.white });
  card("vhub", 410, 215, 180, 100, "virtual-wan-hub", "Virtual hub", { size: S });
  const vnet = (p, x, title, comp, compIcon, sub, nsg) => {
    group(`${p}-v`, x, 410, 250, 230, null, { fill: TINT.white });
    group(`${p}-s`, x + 12, 422, 226, 146, null, { fill: TINT.white, dashed: true });
    card(`${p}-c`, x + 30, 432, 170, 90, compIcon, comp, { size: S });
    icon(`${p}-si`, "subnet", x + 20, 530, 24);
    txt(`${p}-sl`, x + 50, sub.includes("\n") ? 522 : 532, sub, { size: S });
    if (nsg) icon(`${p}-n`, "network-security-groups", x + 206, 428, 24);
    icon(`${p}-vi`, "virtual-networks", x + 12, 585, 30);
    txt(`${p}-vl`, x + 50, 580, title, { size: S });
    arrow(`${p}-peer`, "hub", "bottom", x + 125, `${p}-v`, "top", x + 125, [], { head: null, color: "#1971c2" });
    txt(`${p}-pl`, x + 135, 355, "Peered *", { size: S, color: "#1971c2" });
  };
  vnet("w", 90, "Workload spoke\nvirtual network", "Client", "virtual-machine", "Workload subnet", false);
  group("ext1", 370, 340, 290, 460, null, { fill: TINT.subBox, dashed: true });
  group("ext2", 680, 340, 450, 460, null, { fill: TINT.subBox, dashed: true });
  vnet("b", 390, "Bastion hub extension\nvirtual network", "Azure Bastion", "bastions", "Azure Bastion subnet", true);
  vnet("d", 700, "DNS hub extension\nvirtual network", "DNS Private\nResolver", "dns-private-resolver", "Inbound endpoint\nsubnet", true);
  step("s1", 495, 650, 1);
  txt("e1-lbl", 400, 700, "Hub extension for\nAzure Bastion", { size: S, color: "#1971c2" });
  step("s2", 880, 650, 2);
  txt("e2-lbl", 820, 700, "Hub extension for DNS", { size: S, color: "#1971c2" });
  card("pdz", 970, 450, 140, 110, "dns-zones", "Private DNS\nzone", { size: S });
  arrow("lk", "pdz", "left", 480, "d-v", "right", 480, [], { dashed: true, color: "#1971c2" });
  txt("lk-lbl", 955, 420, "Linked", { size: S, color: "#1971c2" });
  arrow("ad", "adns", "bottom", 1040, "pdz", "top", 1040, [], { dashed: true, color: "#1971c2" });
  txt("footer", 20, 890, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Hub extension pattern\"", { size: 20, color: "#495057" });
}
