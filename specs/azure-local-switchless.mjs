// 005 Azure Local hyperconverged storage switchless architecture. Redraw of the first diagram (three-machine switchless network).
export const meta = {
  num: 5,
  slug: "azure-local-switchless",
  title: "Azure Local hyperconverged storage switchless architecture",
  url: "https://learn.microsoft.com/azure/architecture/hybrid/azure-local-switchless",
  category: "Hybrid + multicloud",
  status: "done",
  otherDiagrams: ["Physical networking topology (three machines)", "Logical networking topology"],
  substitutions: {},
  differences: [
    "Dark slide styling replaced by the calm light sketch palette.",
    "Switches, router, NICs and ports are labelled sketch shapes (no Azure sketch icon); the port glyphs are omitted.",
    "The original's shared management band and machine band are drawn as one panel per machine.",
    "Subnet links route through lanes under the machines instead of the original's free-form paths; the six subnet labels sit in one row rather than staggered.",
  ],
};

export function draw(k) {
  const { TINT, txt, zone, group, box, card, line } = k;
  txt("title", 600, 4, "Azure Local - three-machine storage switchless", { size: 28 });

  txt("key", 30, 50, "Azure Local instance networks key\n• Management and compute intent converged using a\n   switch Embedded Team (SET) of 2 NICs and Trunk port\n• Multiple compute logical networks with different\n   VLAN IDs for VM, AKS cluster or AVD workloads\n• Single VLAN for the Management network\n• Storage intent uses 6 x separate layer 2 networks,\n   no default gateway on the ethernet interface", { size: 16 });
  txt("req1", 1850, 50, "Network interface requirements\n• Management and compute intent: minimum 2 x 1 Gbps+\n   ports, one connected to each switch\n• Converged using a SET for resiliency and load balancing", { size: 16 });
  txt("req2", 1850, 170, "Network interface requirements\n• Storage traffic has two (dual) links for redundancy\n• Dedicated 4 x 10 Gbps (or higher) RDMA-capable ports", { size: 16 });

  box("router", 1020, 80, 360, 100, "Switch / Router / Firewall", { size: 22 });
  group("sw1", 600, 260, 400, 200, "Network switch", { fill: TINT.mg });
  box("trunk1", 640, 370, 180, 64, "Trunk port", { size: 18, stroke: "#e67700" });
  group("sw2", 1400, 260, 400, 200, "Network switch", { fill: TINT.mg });
  box("trunk2", 1500, 370, 180, 64, "Trunk port", { size: 18, stroke: "#2f9e44" });
  box("mcn", 1020, 370, 360, 64, "Management and compute networks", { size: 16, fill: "#e5dbff" });
  line("r-sw1", "router", "left", 130, "sw1", "top", 800);
  line("r-sw2", "router", "right", 130, "sw2", "top", 1600);

  zone("inst", 100, 620, 2160, 1000, TINT.sub);
  card("inst-i", 120, 640, 165, 130, "azure-local", "Azure Local\ninstance");

  const X = [300, 960, 1620];
  const IPS = [["10.0.1.1", "10.0.2.1", "10.0.3.1", "10.0.4.1"], ["10.0.1.2", "10.0.2.2", "10.0.5.2", "10.0.6.2"], ["10.0.3.3", "10.0.4.3", "10.0.5.3", "10.0.6.3"]];
  X.forEach((x0, m) => {
    const id = `m${m + 1}`;
    zone(id, x0, 660, 600, 460, TINT.white, { stroke: "#4a6b8a" });
    box(`${id}-ma`, x0 + 40, 675, 200, 90, "1 Gbps+\nEthernet port", { size: 16 });
    box(`${id}-mb`, x0 + 340, 675, 200, 90, "1 Gbps+\nEthernet port", { size: 16 });
    box(`${id}-mbar`, x0 + 20, 780, 560, 60, "Management + compute intent", { size: 18, fill: "#d0ebff" });
    txt(`${id}-t`, x0 + 300, 852, `Azure Local machine ${m + 1}`, { size: 26, align: "center" });
    box(`${id}-rdma`, x0 + 20, 905, 560, 60, "RDMA NICs | Storage intent", { size: 18, fill: "#e5dbff" });
    IPS[m].forEach((ip, i) => box(`${id}-p${i}`, x0 + 20 + i * 145, 980, 130, 110, `10 Gbps+\nport\nIP: ${ip}`, { size: 16 }));
  });
  // trunk ports to the management ports (one link from each switch to each machine)
  [670, 720, 770].forEach((sx, m) => line(`t1-${m}`, "trunk1", "bottom", sx, `m${m + 1}-ma`, "top", X[m] + 140, [470 + m * 25], { color: "#e67700" }));
  [1530, 1590, 1650].forEach((sx, m) => line(`t2-${m}`, "trunk2", "bottom", sx, `m${m + 1}-mb`, "top", X[m] + 440, [545 + m * 25], { color: "#2f9e44" }));

  // six storage subnets, each a direct link between two machines
  const S = [
    ["Subnet 1: 10.0.1.x/24", "#2f9e44", [0, 0], [1, 0]], ["Subnet 2: 10.0.2.x/24", "#c2255c", [0, 1], [1, 1]],
    ["Subnet 5: 10.0.3.x/24", "#1098ad", [0, 2], [2, 0]], ["Subnet 4: 10.0.4.x/24", "#e8590c", [0, 3], [2, 1]],
    ["Subnet 3: 10.0.5.x/24", "#e67700", [1, 2], [2, 2]], ["Subnet 6: 10.0.6.x/24", "#e03131", [1, 3], [2, 3]],
  ];
  let lane = 0;
  S.forEach(([label, color, a, b], j) => {
    const bx = 340 + j * 310, id = `sn${j}`;
    box(id, bx, 1440, 250, 60, label, { size: 16, stroke: color });
    [[a, bx + 50], [b, bx + 200]].forEach(([[m, p], dx], e) => {
      const px = X[m] + 85 + p * 145;
      line(`${id}-${e}`, `m${m + 1}-p${p}`, "bottom", px, id, "top", dx, [1135 + lane++ * 24, dx], { color, firstDir: "v" });
    });
  });
  box("atc", 860, 1530, 680, 64, "Storage Network ATC intent: VLAN 711, AutoIP=False", { size: 18, fill: "#e5dbff" });

  txt("footer", 100, 1650, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Azure Local storage switchless architecture\"", { size: 20, color: "#495057" });
}
