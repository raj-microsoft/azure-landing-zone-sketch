// 014 Quantum computing integration with classical apps. Redraw of the first diagram (direct integration).
export const meta = {
  num: 14,
  slug: "quantum-computing-integration-with-classical-apps",
  title: "Quantum computing integration with classical apps",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/quantum/quantum-computing-integration-with-classical-apps",
  category: "AI + machine learning",
  status: "done",
  otherDiagrams: ["Workflow-orchestrated integration state machine", "Workflow-orchestrated integration topology"],
  substitutions: { "Client app": "browser", "Microsoft Entra ID": "entra-connect", "Provider": "metrics", "Targets (QPU)": "input-output" },
  differences: [
    "Azure Quantum has no sketch icon; the workspace is a labelled group.",
    "Steps 2 and 5 leave the front end through separate lanes instead of the original's shared bend.",
  ],
};

export function draw(k) {
  const { TINT, txt, group, card, step, arrow, both } = k;
  txt("title", 60, 10, "Quantum computing integration with classical apps (direct)", { size: 30 });
  card("user", 160, 90, 160, 130, "users", "User");
  card("entra", 130, 470, 220, 150, "entra-connect", "Microsoft Entra\nID");
  group("fe", 560, 260, 330, 380, "Front end", { fill: TINT.mg, size: 22 });
  card("app", 600, 330, 250, 220, "browser", "Client app", { size: 20 });
  group("qw", 1160, 70, 460, 560, "Azure Quantum\nworkspace", { fill: TINT.mg, size: 22 });
  card("prov", 1220, 220, 340, 340, "metrics", "Provider", { size: 22 });
  group("qp", 1760, 70, 450, 560, "Quantum provider\nservice", { fill: TINT.mg, size: 22 });
  card("tgt", 1820, 220, 330, 340, "input-output", "Targets", { size: 22 });
  group("st", 1160, 770, 460, 260, "Storage", { fill: TINT.mg, size: 22 });
  card("sa", 1270, 820, 240, 180, "storage-accounts", "Storage account", { size: 20 });

  arrow("f1", "user", "right", 155, "fe", "top", 725); step("s1", 640, 170, 1);
  arrow("sign", "user", "bottom", 240, "entra", "top", 240, [], { dashed: true });
  txt("sign-t", 260, 330, "Sign-in", { size: 18 });
  arrow("auth", "fe", "left", 580, "entra", "right", 580, [], { dashed: true });
  txt("auth-t", 380, 590, "Authentication", { size: 18 });
  arrow("f3", "fe", "right", 300, "qw", "left", 300); step("s3", 960, 260, 3);
  arrow("f2", "fe", "right", 360, "st", "left", 860, [1000]); step("s2", 905, 368, 2);
  arrow("f5", "fe", "right", 420, "qw", "left", 420); step("s5", 1060, 380, 5);
  arrow("f6", "st", "left", 960, "fe", "right", 600, [960]); step("s6", 900, 640, 6);
  both("f4", "prov", "right", 390, "tgt", "left", 390); step("s4", 1670, 400, 4);
  both("q-st", "qw", "bottom", 1390, "st", "top", 1390, [], { dashed: true });

  txt("footer", 60, 1070, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Quantum computing integration with classical apps\"", { size: 20, color: "#495057" });
}
