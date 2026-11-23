// 040 Run a Linux VM on Azure.
export const meta = {
  num: 40,
  slug: "linux-vm",
  title: "Run a Linux VM on Azure",
  url: "https://learn.microsoft.com/azure/architecture/reference-architectures/n-tier/linux-vm",
  category: "Compute",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Internet": "globe-success", "Azure DNS": "dns-zones", "Public IP address": "public-ip-addresses", "Resource group": "resource-groups", "NAT Gateway": "nat", "Network security group": "network-security-groups", "Virtual machine": "virtual-machine", "NIC": "network-interfaces", "Temporary disk (physical SSD)": "ssd", "Managed disks": "disks", "Diagnostic logs": "diagnostics-settings", "Logs storage account": "storage-accounts", "Azure Bastion": "bastions" },
  differences: ["The official diagram is the same image as the Windows VM article.", "The NIC strip on the VM is a separate small card."],
};

export function draw(k) {
  const { TINT, txt, card, group, arrow } = k;
  txt("title", 60, 10, "Run a Linux VM on Azure", { size: 30 });
  card("tmp", 1060, 80, 220, 170, "ssd", "Temporary\n(Physical SSD\non host)", { size: 16 });
  card("inet", 60, 520, 200, 150, "globe-success", "Internet");
  card("dns", 60, 880, 200, 150, "dns-zones", "Azure DNS");
  txt("nr-lbl", 175, 740, "Name\nresolution", { size: 18 });
  group("rg", 340, 330, 1700, 900, "Resource group", { fill: TINT.white, dashed: true, stroke: "#1971c2", iconName: "resource-groups" });
  card("pip", 400, 520, 200, 160, "public-ip-addresses", "Public IP\naddress");
  group("vnet", 680, 420, 780, 770, "Virtual network", { fill: TINT.white, dashed: true, stroke: "#1971c2", iconName: "virtual-networks" });
  group("sub", 710, 480, 720, 330, "Subnet", { fill: TINT.white });
  card("nat", 730, 530, 170, 130, "nat", "NAT Gateway", { size: 16 });
  card("nsg1", 730, 670, 170, 130, "network-security-groups", "Network\nsecurity group", { size: 16 });
  card("nic", 950, 560, 120, 160, "network-interfaces", "NIC", { size: 16 });
  card("vm", 1100, 540, 240, 200, "virtual-machine", "Virtual machine");
  group("bsub", 710, 840, 720, 320, "Azure Bastion subnet", { fill: TINT.white });
  card("nsg2", 730, 980, 170, 140, "network-security-groups", "Network\nsecurity group", { size: 16 });
  card("bas", 1040, 920, 220, 180, "bastions", "Azure\nBastion");
  group("md", 1520, 420, 480, 470, null, { fill: TINT.white });
  txt("md-lbl", 1660, 840, "Managed disks", { size: 18 });
  card("os", 1700, 440, 160, 120, "disks", "OS", { size: 16 });
  card("d1", 1700, 570, 160, 120, "disks", "Data 1", { size: 16 });
  card("d2", 1700, 700, 160, 120, "disks", "Data 2", { size: 16 });
  group("lg", 1520, 930, 480, 260, null, { fill: TINT.white });
  card("dl", 1540, 960, 200, 200, "diagnostics-settings", "Diagnostic\nlogs");
  card("lsa", 1780, 960, 200, 200, "storage-accounts", "Logs storage\naccount", { size: 16 });

  arrow("out1", "nat", "left", 600, "pip", "right", 600);
  arrow("out2", "pip", "left", 600, "inet", "right", 600);
  arrow("nr", "inet", "bottom", 160, "dns", "top", 160, [], { dashed: true });
  arrow("t", "vm", "top", 1170, "tmp", "bottom", 1170);
  arrow("vos", "vm", "right", 600, "os", "left", 500, [1580]);
  arrow("vd1", "vm", "right", 640, "d1", "left", 630, [1600]);
  arrow("vd2", "vm", "right", 680, "d2", "left", 760, [1620]);

  txt("footer", 60, 1270, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Run a Linux VM on Azure\"", { size: 20, color: "#495057" });
}
