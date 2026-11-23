// 123 Blue-green deployment of AKS clusters.
export const meta = {
  num: 123,
  slug: "blue-green-deployment-for-aks",
  title: "Blue-green deployment of AKS clusters",
  url: "https://learn.microsoft.com/azure/architecture/guide/aks/blue-green-deployment-for-aks",
  category: "Containers",
  status: "done",
  otherDiagrams: ["img1: private-facing architecture", "img2-3, img8-10: T0-T4 deployment stages", "img4: AKS monitoring levels", "img5-7: screenshots"],
  substitutions: { "Azure Front Door with WAF": "front-door-and-cdn-profiles", "WAF policy": "web-application-firewall-policies-waf", "App endpoints (internal load balancer)": "load-balancers", "AKS cluster": "kubernetes-services", "DNS": "dns-zones", "Azure Monitor": "monitor" },
  differences: ["User drawn as a labelled shape.", "Blue and green colour squares shown as small labelled tags."],
};

export function draw(k) {
  const { TINT, txt, card, group, icon, arrow, box } = k;
  const S = 16;
  const BLUE = "#1971c2", GREEN = "#2b8a3e";
  card("dns", 180, 10, 130, 90, "dns-zones", "DNS", { size: S });
  group("edge", 160, 130, 170, 780, null, { fill: TINT.white });
  card("afd", 175, 260, 140, 110, "front-door-and-cdn-profiles", "Front Door", { size: S });
  card("waf", 175, 400, 140, 100, "web-application-firewall-policies-waf", "WAF", { size: S });
  box("user", 20, 480, 120, 70, "User", { fill: TINT.onprem, size: S });
  group("az", 390, 130, 1080, 780, null, { fill: TINT.white, dashed: true });
  txt("az-lbl", 1390, 98, "Azure", { size: 22 });
  const lane = (p, y, color, tag) => {
    group(`${p}-gsn`, 545, y, 170, 330, null, { fill: TINT.white, dashed: true });
    card(`${p}-pip`, 405, y + 40, 120, 90, "public-ip-addresses", "Public IP", { size: S });
    card(`${p}-agw`, 568, y + 30, 125, 110, "application-gateways", `App Gateway\n(${tag})`, { size: S });
    icon(`${p}-gsi`, "subnet", 565, y + 270, 36);
    txt(`${p}-gsl`, 610, y + 278, "Subnet", { size: S });
    group(`${p}-asn`, 740, y, 680, 330, null, { fill: TINT.white, dashed: true });
    card(`${p}-lb`, 780, y + 40, 170, 110, "load-balancers", `App endpoints\n(${tag})`, { size: S });
    card(`${p}-aks`, 1060, y + 40, 200, 110, "kubernetes-services", `AKS cluster (${tag})`, { size: S });
    icon(`${p}-asi`, "subnet", 1300, y + 270, 36);
    txt(`${p}-asl`, 1345, y + 278, "Subnet", { size: S });
    arrow(`${p}-a1`, `${p}-pip`, "right", y + 85, `${p}-agw`, "left", y + 85, [], { color });
    arrow(`${p}-a2`, `${p}-agw`, "right", y + 85, `${p}-lb`, "left", y + 95, [728], { color });
    arrow(`${p}-a3`, `${p}-lb`, "right", y + 95, `${p}-aks`, "left", y + 95, [], { color });
  };
  lane("b", 170, BLUE, "blue");
  lane("g", 540, GREEN, "green");
  icon("vn-i", "virtual-networks", 1250, 875, 30);
  txt("vn-lbl", 1290, 877, "Virtual network", { size: S });
  arrow("u1", "user", "right", 505, "afd", "left", 300, [150], { color: BLUE });
  arrow("u2", "user", "right", 525, "afd", "left", 330, [158], { color: GREEN });
  arrow("f1", "afd", "right", 290, "b-pip", "left", 250, [370], { color: BLUE });
  arrow("f2", "afd", "right", 330, "g-pip", "left", 625, [360], { color: GREEN });
  group("shared", 1520, 130, 160, 780, null, { fill: TINT.white });
  card("kv", 1535, 220, 130, 100, "key-vaults", "Key Vault", { size: S });
  card("acr", 1535, 420, 130, 120, "container-registries", "Container\nRegistry", { size: S });
  card("mon", 1535, 640, 130, 100, "monitor", "Monitor", { size: S });
  txt("footer", 20, 940, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Public-facing architecture\"", { size: 20, color: "#495057" });
}
