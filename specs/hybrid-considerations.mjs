// 011 Azure hybrid options. Redraw of the article's decision diagram.
export const meta = {
  num: 11,
  slug: "hybrid-considerations",
  title: "Azure hybrid options",
  url: "https://learn.microsoft.com/azure/architecture/guide/technology-choices/hybrid-considerations",
  category: "Hybrid + multicloud",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Site-to-site VPN": "virtual-network-gateways" },
  differences: ["Dark header bars are drawn as pale blue banners."],
};

export function draw(k) {
  const { TINT, txt, box, arrow } = k;
  txt("title", 40, 10, "Azure hybrid options", { size: 30 });
  box("env", 40, 70, 2160, 90, "Operating environments and connections", { fill: "#d0ebff", size: 26 });
  box("sol", 40, 700, 2160, 90, "Hybrid solutions", { fill: "#d0ebff", size: 26 });
  const cols = [
    ["Azure-hosted", TINT.sub, "Azure connected with\nExpressRoute or encrypted\nsite-to-site VPN", "ExpressRoute or\nsite-to-site VPN", ["expressroute-circuits", "virtual-network-gateways"], "#1971c2"],
    ["Distributed resources", TINT.app, "Existing servers or\nmulticloud resources", "Azure Arc\nmanagement", ["azure-arc"], "#2b8a3e"],
    ["Local with Azure connection", TINT.sub, "Azure control plane with\non-premises or edge\nworkloads and data", "Azure Local\nconnected", ["azure-local"], "#1971c2"],
    ["No persistent Azure connection", TINT.mg, "Local control plane, extended\nor permanent disconnected\nstate", "Azure Local\ndisconnected", ["azure-local"], "#343a40"],
  ];
  cols.forEach(([h, fill, d, s, icons, stroke], i) => {
    const x = 40 + i * 550, cx = x + 250;
    box(`h${i}`, x, 210, 500, 120, h, { fill, size: 22 });
    box(`d${i}`, x, 400, 500, 220, d, { size: 20 });
    box(`s${i}`, x, 840, 500, 140, s, { size: 22, stroke });
    icons.forEach((n, j) => k.icon(`s${i}-i${j}`, n, j ? x + 420 : x + 16, 880, 64));
    arrow(`a-env${i}`, "env", "bottom", cx, `h${i}`, "top", cx);
    arrow(`a-hd${i}`, `h${i}`, "bottom", cx, `d${i}`, "top", cx);
    arrow(`a-ds${i}`, `d${i}`, "bottom", cx, "sol", "top", cx);
    arrow(`a-sol${i}`, "sol", "bottom", cx, `s${i}`, "top", cx);
  });
  txt("footer", 40, 1010, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Azure hybrid options\"", { size: 20, color: "#495057" });
}
