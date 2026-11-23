// 029 Deploy AD DS in an Azure virtual network.
export const meta = {
  num: 29,
  slug: "adds-extend-domain",
  title: "Deploy AD DS in an Azure virtual network",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/identity/adds-extend-domain",
  category: "Identity",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Active Directory servers / AD DS servers": "entra-domain-services", "Load balancer (router icon)": "load-balancers", "Internet": "globe-success" },
  differences: ["The two load-balanced VMs and the two AD DS servers are each one card per server inside a dashed set, as in the original."],
};

export function draw(k) {
  const { TINT, txt, box, card, group, arrow, both, line } = k;
  txt("title", 60, 10, "Deploy AD DS in an Azure virtual network", { size: 30 });
  txt("onp-h", 80, 80, "On-premises network", { size: 24 });
  group("onp", 60, 130, 420, 620, "contoso.com", { fill: TINT.mg, size: 20, align: "center" });
  card("ogw", 150, 210, 240, 150, "virtual-network-gateways", "Gateway");
  card("ad1", 80, 470, 180, 170, "entra-domain-services", "Active Directory\nserver", { size: 16 });
  card("ad2", 280, 470, 180, 170, "entra-domain-services", "Active Directory\nserver", { size: 16 });
  card("inet", 80, 880, 200, 160, "globe-success", "Internet");
  box("pip", 340, 910, 220, 100, "Public IP\naddress", { size: 20, iconLeft: "public-ip-addresses" });
  card("ddos", 640, 1180, 260, 150, "ddos-protection-plans", "DDoS Protection");

  group("vnet", 620, 60, 1460, 1060, "Virtual network", { fill: TINT.white, dashed: true, stroke: "#1971c2", iconName: "virtual-networks", align: "center", size: 22 });
  group("gws", 660, 130, 300, 420, "Gateway subnet", { fill: TINT.mg, size: 20 });
  card("gw", 690, 230, 240, 150, "virtual-network-gateways", "Gateway");
  group("app", 1020, 130, 680, 470, "Application subnet", { fill: TINT.mg, size: 20 });
  box("nsg1", 1040, 190, 220, 100, "Network security\ngroups", { iconLeft: "network-security-groups", size: 16 });
  card("lb", 1060, 320, 180, 140, "load-balancers", "Load balancer", { size: 16 });
  group("vms", 1340, 180, 330, 400, null, { fill: TINT.white, dashed: true });
  card("vm1", 1370, 200, 270, 170, "virtual-machine", "Virtual machine");
  card("vm2", 1370, 390, 270, 170, "virtual-machine", "Virtual machine");
  group("mgmt", 660, 640, 340, 440, "Management subnet\n(Jump box)", { fill: TINT.mg, size: 20 });
  box("nsg2", 680, 730, 220, 100, "Network security\ngroups", { iconLeft: "network-security-groups", size: 16 });
  card("jb", 720, 880, 250, 170, "virtual-machine", "Virtual machine");
  group("adds", 1060, 680, 700, 400, "AD DS subnet", { fill: TINT.mg, size: 20 });
  box("nsg3", 1080, 750, 220, 100, "Network security\ngroups", { iconLeft: "network-security-groups", size: 16 });
  group("adset", 1340, 740, 400, 300, "AD DS servers", { fill: TINT.white, dashed: true, size: 18 });
  card("dc1", 1360, 800, 180, 200, "entra-domain-services", "AD DS\nserver", { size: 16 });
  card("dc2", 1550, 800, 180, 200, "entra-domain-services", "AD DS\nserver", { size: 16 });

  both("vpn", "ogw", "right", 285, "gw", "left", 285);
  arrow("gw-app", "gw", "right", 340, "lb", "left", 390, [990]);
  arrow("lb-v1", "lb", "right", 360, "vm1", "left", 285, [1290]);
  arrow("lb-v2", "lb", "right", 420, "vm2", "left", 475, [1290]);
  arrow("auth", "vms", "right", 500, "adds", "right", 880, [1920]);
  txt("auth-t", 1800, 380, "Authentication\nrequest", { size: 20 });
  line("in-pip", "inet", "right", 960, "pip", "left", 960);
  arrow("pip-jb", "pip", "right", 960, "jb", "left", 960);

  txt("footer", 60, 1380, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Deploy AD DS in an Azure virtual network\"", { size: 20, color: "#495057" });
}
