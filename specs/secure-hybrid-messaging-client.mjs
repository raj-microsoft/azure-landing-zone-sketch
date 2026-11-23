// 133 Enhanced-security hybrid messaging: client access.
export const meta = {
  num: 133,
  slug: "secure-hybrid-messaging-client",
  title: "Enhanced-security hybrid messaging infrastructure for desktop-client access",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/hybrid/secure-hybrid-messaging-client",
  category: "Hybrid",
  status: "done",
  otherDiagrams: ["img1: alternative architecture (Exchange on-premises)", "img2+: screenshots"],
  substitutions: { "Microsoft Entra Connect": "entra-connect-sync", "Microsoft Entra ID": "entra-connect", "Conditional Access policy": "conditional-access", "Multifactor authentication": "multi-factor-authentication", "Exchange Online / Authentication policy": "exchange-access" },
  differences: ["Active Directory, AD FS, WAP, Outlook, Exchange Online user, Microsoft 365, Block access and On-premises drawn as labelled shapes.", "Bundled parallel arrows into Outlook spread on separate lanes."],
};

export function draw(k) {
  const { TINT, txt, card, box, arrow, step } = k;
  const S = 16;
  const R = { color: "#c92a2a", dashed: true };
  box("ad", 60, 40, 180, 70, "Active Directory", { fill: TINT.onprem, size: S });
  card("ec", 300, 20, 180, 110, "entra-connect-sync", "Microsoft Entra\nConnect", { size: S });
  card("eid", 1040, 40, 180, 110, "entra-connect", "Microsoft Entra ID", { size: S });
  box("adfs", 40, 330, 220, 90, "Active Directory\nFederation Services\n(AD FS)", { fill: TINT.onprem, size: S });
  box("wap", 400, 360, 200, 80, "Web Application\nProxy (WAP)", { fill: TINT.onprem, size: S });
  box("m365", 820, 210, 200, 80, "Microsoft 365", { fill: TINT.sub, size: 20 });
  card("exo", 1080, 390, 160, 110, "exchange-access", "Exchange\nOnline", { size: S });
  card("ap", 1030, 590, 170, 110, "exchange-access", "Authentication\npolicy", { size: S });
  box("blk", 1040, 770, 150, 70, "Block access", { fill: TINT.warn, size: S });
  box("ol", 740, 640, 140, 70, "Outlook\naccess", { fill: TINT.app, size: S });
  box("user", 730, 750, 160, 70, "Exchange\nOnline user", { fill: TINT.onprem, size: S });
  card("ca", 1380, 220, 170, 110, "conditional-access", "Conditional\nAccess policy", { size: S });
  card("mfa", 1300, 680, 180, 110, "multi-factor-authentication", "Multifactor\nauthentication", { size: S });
  box("onp", 60, 760, 160, 70, "On-premises", { fill: TINT.onprem, size: S });
  arrow("sync1", "ad", "right", null, "ec", "left", 75, [], { dashed: true, tail: "arrow" });
  arrow("sync2", "ec", "right", 60, "eid", "left", 60, [], { dashed: true });
  txt("sync-l", 600, 20, "Microsoft Entra Connect\nsynchronization", { size: S });
  arrow("a5", "ad", "bottom", 130, "adfs", "top", 130, [], { tail: "arrow" });
  arrow("a5b", "ad", "bottom", 170, "adfs", "top", 170, [], { dashed: true, tail: "arrow" });
  step("s5", 60, 200, 5);
  arrow("a6", "adfs", "right", 345, "eid", "left", 95, [640], {});
  step("s6", 300, 280, 6);
  arrow("a4", "eid", "left", 130, "wap", "right", 385, [680], {});
  step("s4a", 700, 200, 4);
  arrow("a4b", "wap", "left", 385, "adfs", "right", 385, [], {});
  arrow("a4c", "adfs", "right", 412, "wap", "left", 412, [], { dashed: true, tail: "arrow" });
  step("s4b", 310, 440, 4);
  arrow("a3", "ol", "top", 770, "eid", "bottom", 1170, [320], {});
  step("s3", 1180, 180, 3);
  arrow("a10", "eid", "bottom", 1110, "ol", "top", 760, [300], {});
  step("s10", 1060, 170, 10);
  step("s2", 785, 350, 2);
  arrow("a1", "ol", "top", 830, "exo", "left", 420, [], {});
  step("s1", 900, 440, 1);
  arrow("a1b", "ol", "top", 860, "ap", "left", 620, [], R);
  txt("urls", 870, 512, "https://outlook.office.com/mapi\nhttps://outlook.office.com/ews\n(Basic authentication)", { size: S, color: "#c92a2a" });
  arrow("blk-a", "ap", "bottom", 1115, "blk", "top", 1115, [], R);
  arrow("a7", "eid", "right", 70, "ca", "top", 1460, [], {});
  step("s7", 1480, 100, 7);
  arrow("a8", "ca", "bottom", 1500, "mfa", "right", 735, [500, 1590], {});
  step("s8", 1605, 580, 8);
  arrow("a9", "mfa", "top", 1360, "eid", "right", 110, [], {});
  step("s9", 1290, 180, 9);
  arrow("a11", "ol", "right", 690, "exo", "bottom", 1160, [960, 850, 1285, 520], {});
  step("s11", 970, 760, 11);
  txt("footer", 20, 900, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Enhanced security in an Outlook client access scenario\"", { size: 20, color: "#495057" });
}
