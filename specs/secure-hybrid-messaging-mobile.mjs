// 134 Enhanced-security hybrid messaging: mobile access.
export const meta = {
  num: 134,
  slug: "secure-hybrid-messaging-mobile",
  title: "Enhanced-security hybrid messaging infrastructure for mobile access",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/hybrid/secure-hybrid-messaging-mobile",
  category: "Hybrid",
  status: "done",
  otherDiagrams: ["img1: alternative architecture (Exchange on-premises)"],
  substitutions: { "Microsoft Entra Connect": "entra-connect-sync", "Microsoft Entra ID": "entra-connect", "AutoDetect": "location", "Conditional Access policy": "conditional-access", "Microsoft Endpoint Manager (Intune)": "intune", "Multifactor authentication": "multi-factor-authentication", "Exchange Online / Authentication policy": "exchange-access" },
  differences: ["Active Directory, AD FS, WAP, Outlook mobile access, Exchange Online user, Microsoft 365, Block access and On-premises drawn as labelled shapes.", "Diagonal step 5 (AutoDetect to Outlook) drawn orthogonally; bundled arrows into Outlook spread on separate lanes."],
};

export function draw(k) {
  const { TINT, txt, card, box, arrow, step } = k;
  const S = 16;
  const R = { color: "#c92a2a", dashed: true };
  box("ad", 60, 40, 180, 70, "Active Directory", { fill: TINT.onprem, size: S });
  card("ec", 300, 20, 180, 110, "entra-connect-sync", "Microsoft Entra\nConnect", { size: S });
  card("eid", 1040, 40, 220, 110, "entra-connect", "Microsoft Entra ID", { size: S });
  box("adfs", 40, 330, 220, 90, "Active Directory\nFederation Services\n(AD FS)", { fill: TINT.onprem, size: S });
  box("wap", 400, 360, 200, 80, "Web Application\nProxy (WAP)", { fill: TINT.onprem, size: S });
  box("m365", 800, 200, 200, 80, "Microsoft 365", { fill: TINT.sub, size: 20 });
  card("auto", 820, 420, 170, 110, "location", "AutoDetect", { size: S });
  card("exo", 1050, 420, 150, 110, "exchange-access", "Exchange\nOnline", { size: S });
  box("ol", 680, 700, 160, 90, "Outlook\nmobile access", { fill: TINT.app, size: S });
  box("user", 670, 830, 180, 70, "Exchange\nOnline user", { fill: TINT.onprem, size: S });
  card("ap", 1110, 890, 170, 110, "exchange-access", "Authentication\npolicy", { size: S });
  box("blk", 1120, 1060, 150, 70, "Block access", { fill: TINT.warn, size: S });
  card("ca", 1500, 220, 170, 110, "conditional-access", "Conditional\nAccess policy", { size: S });
  card("intune", 1490, 460, 200, 110, "intune", "Microsoft Endpoint\nManager (Intune)", { size: S });
  card("mfa", 1400, 700, 180, 110, "multi-factor-authentication", "Multifactor\nauthentication", { size: S });
  box("onp", 60, 1000, 160, 70, "On-premises", { fill: TINT.onprem, size: S });
  arrow("sync1", "ad", "right", null, "ec", "left", 75, [], { dashed: true, tail: "arrow" });
  arrow("sync2", "ec", "right", 60, "eid", "left", 60, [], { dashed: true });
  txt("sync-l", 600, 20, "Microsoft Entra Connect\nsynchronization", { size: S });
  arrow("a9", "ad", "bottom", 130, "adfs", "top", 130, [], { tail: "arrow" });
  arrow("a9b", "ad", "bottom", 170, "adfs", "top", 170, [], { dashed: true, tail: "arrow" });
  step("s9", 60, 200, 9);
  arrow("a10", "adfs", "right", 345, "eid", "left", 95, [640], {});
  step("s10", 300, 280, 10);
  arrow("a7", "eid", "left", 130, "wap", "right", 385, [680], {});
  step("s7", 700, 250, 7);
  arrow("a7b", "wap", "left", 385, "adfs", "right", 385, [], {});
  arrow("a8", "adfs", "right", 412, "wap", "left", 412, [], { dashed: true, tail: "arrow" });
  step("s8", 310, 440, 8);
  arrow("a1", "ol", "top", 700, "auto", "left", 470, [], {});
  txt("email", 450, 520, "Email: user@contoso.com", { size: S });
  step("s1", 715, 590, 1);
  arrow("a2", "auto", "right", 455, "exo", "left", 455, [], {});
  step("s2", 1000, 395, 2);
  arrow("a4", "exo", "left", 500, "auto", "right", 500, [], {});
  step("s4", 1000, 525, 4);
  arrow("a3", "auto", "bottom", 940, "exo", "bottom", 1170, [620], {});
  step("s3", 950, 555, 3);
  arrow("a5", "auto", "bottom", 860, "ol", "top", 790, [650], {});
  step("s5", 805, 560, 5);
  arrow("a15", "ol", "right", 715, "exo", "bottom", 1100, [], {});
  step("s15", 1115, 650, 15);
  arrow("a14", "eid", "bottom", 1225, "ol", "right", 740, [], {});
  step("s14", 1165, 180, 14);
  arrow("a6", "ol", "right", 765, "eid", "bottom", 1250, [], {});
  step("s6", 1270, 790, 6);
  arrow("red", "ol", "right", 785, "ap", "top", 1195, [], R);
  txt("urls", 880, 810, "https://outlook.office365.com/\nMicrosoft-Server-ActiveSync\n(Basic authentication)", { size: S, color: "#c92a2a" });
  arrow("blk-a", "ap", "bottom", 1195, "blk", "top", 1195, [], R);
  arrow("a11", "eid", "right", 70, "ca", "top", 1585, [], {});
  step("s11", 1610, 100, 11);
  arrow("a12", "ca", "bottom", 1585, "intune", "top", 1585, [], {});
  step("s12", 1610, 375, 12);
  arrow("a12b", "intune", "bottom", 1640, "mfa", "right", 760, [], {});
  arrow("a13", "mfa", "top", 1440, "eid", "right", 115, [], {});
  step("s13", 1380, 190, 13);
  txt("footer", 20, 1160, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Enhanced security in an Outlook mobile access scenario\"", { size: 20, color: "#495057" });
}
