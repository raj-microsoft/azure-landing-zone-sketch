// 139 Gateway Routing pattern.
export const meta = {
  num: 139,
  slug: "gateway-routing",
  title: "Gateway Routing pattern",
  url: "https://learn.microsoft.com/azure/architecture/patterns/gateway-routing",
  category: "Design patterns",
  status: "done",
  otherDiagrams: ["img1: multi-region search routing", "img2: versioned search routing"],
  substitutions: {},
  differences: ["Conceptual diagram with no product icons; all nodes are labelled sketch shapes like the original."],
};

export function draw(k) {
  const { TINT, txt, box, arrow } = k;
  const S = 18;
  box("con", 640, 20, 240, 70, "Consumer", { fill: TINT.sub, size: S });
  box("gw", 640, 160, 240, 70, "Gateway", { fill: TINT.hub, size: S });
  const names = ["Search service", "Checkout service", "Order history service", "Cart service", "Reviews service"];
  names.forEach((n, i) => box(`s${i}`, 20 + i * 300, 340, 260, 70, n, { fill: TINT.white, size: S }));
  arrow("a0", "con", "bottom", 760, "gw", "top", 760, [], {});
  [150, 450, 760, 1050, 1350].forEach((x, i) => arrow(`r${i}`, "gw", "bottom", 700 + i * 30, `s${i}`, "top", x, [[250, 280, 265, 280, 250][i]], {}));
  txt("footer", 20, 460, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Gateway in front of multiple services\"", { size: 20, color: "#495057" });
}
