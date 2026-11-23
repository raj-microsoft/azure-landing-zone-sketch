// 075 Virtual network connectivity options and spoke-to-spoke communication.
export const meta = {
  num: 75,
  slug: "virtual-network-peering",
  title: "Virtual network connectivity options and spoke-to-spoke communication",
  url: "https://learn.microsoft.com/azure/architecture/reference-architectures/hybrid-networking/virtual-network-peering",
  category: "Networking",
  status: "done",
  otherDiagrams: ["Single-region hub-and-spoke", "Two-region hub-and-spoke", "Peering growth", "Spokes via hub NVA", "Spokes via two NVAs", "Two-region via hub NVAs", "Separate east-west and north-south", "Spokes via Virtual WAN", "Mixed Virtual WAN designs"],
  substitutions: { "Virtual network (hub and spokes)": "virtual-networks" },
  differences: ["Connectors are orthogonal instead of diagonal. In the mesh panel only neighbouring peerings are drawn, with a note that every VNet peers with every other (the original draws all 15 diagonal dotted lines)."],
};

export function draw(k) {
  const { TINT, txt, box, line } = k;
  txt("title", 40, 10, "Topologies that Virtual Network Manager supports", { size: 30 });
  const V = (id, x, y, l, w = 150) => box(id, x, y, w, 80, l, { iconLeft: "virtual-networks", size: 18, fill: TINT.sub });
  const G = { dashed: true, color: "#2f9e44" };

  function star(p, X, ring) {
    V(`${p}hub`, X + 300, 500, "Hub", 180);
    V(`${p}t`, X + 315, 200, "Spoke"); V(`${p}b`, X + 315, 850, "Spoke");
    V(`${p}tl`, X, 330, "Spoke"); V(`${p}tr`, X + 630, 330, "Spoke");
    V(`${p}bl`, X, 700, "Spoke"); V(`${p}br`, X + 630, 700, "Spoke");
    line(`${p}1`, `${p}t`, "bottom", X + 390, `${p}hub`, "top", X + 390);
    line(`${p}2`, `${p}b`, "top", X + 390, `${p}hub`, "bottom", X + 390);
    line(`${p}3`, `${p}tl`, "right", 370, `${p}hub`, "top", X + 330);
    line(`${p}4`, `${p}tr`, "left", 370, `${p}hub`, "top", X + 450);
    line(`${p}5`, `${p}bl`, "right", 740, `${p}hub`, "bottom", X + 330);
    line(`${p}6`, `${p}br`, "left", 740, `${p}hub`, "bottom", X + 450);
    if (!ring) return;
    line(`${p}r1`, `${p}t`, "right", 240, `${p}tr`, "top", X + 705, [], G);
    line(`${p}r2`, `${p}tr`, "right", 370, `${p}br`, "right", 740, [X + 840], G);
    line(`${p}r3`, `${p}br`, "bottom", X + 705, `${p}b`, "right", 890, [], G);
    line(`${p}r4`, `${p}b`, "left", 890, `${p}bl`, "bottom", X + 75, [], G);
    line(`${p}r5`, `${p}bl`, "left", 740, `${p}tl`, "left", 370, [X - 40], G);
    line(`${p}r6`, `${p}tl`, "top", X + 75, `${p}t`, "left", 240, [], G);
  }

  txt("h1", 260, 100, "Hub and spoke", { size: 24 });
  star("a", 60, false);

  txt("h2", 1290, 100, "Mesh", { size: 24 });
  const MX = [1000, 1240, 1480];
  MX.forEach((x, i) => { V(`m${i}`, x, 330, "VNet"); V(`m${i + 3}`, x, 700, "VNet"); });
  line("mh1", "m0", "right", 370, "m1", "left", 370, [], G);
  line("mh2", "m1", "right", 370, "m2", "left", 370, [], G);
  line("mh3", "m3", "right", 740, "m4", "left", 740, [], G);
  line("mh4", "m4", "right", 740, "m5", "left", 740, [], G);
  line("mh5", "m0", "top", 1060, "m2", "top", 1570, [260], G);
  line("mh6", "m3", "bottom", 1060, "m5", "bottom", 1570, [850], G);
  line("mv1", "m0", "bottom", 1075, "m3", "top", 1075, [], G);
  line("mv2", "m1", "bottom", 1315, "m4", "top", 1315, [], G);
  line("mv3", "m2", "bottom", 1555, "m5", "top", 1555, [], G);
  txt("mesh-note", 1000, 900, "Every virtual network peers\nwith every other one", { size: 18 });

  txt("h3", 2000, 80, "Hub and spoke with direct\nconnectivity between spokes", { size: 24 });
  star("c", 1900, true);

  txt("footer", 40, 1040, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Topologies that Virtual Network Manager supports\"", { size: 20, color: "#495057" });
}
