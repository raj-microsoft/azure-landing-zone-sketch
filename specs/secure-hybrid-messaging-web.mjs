// 135 Enhanced-security hybrid messaging: web access.
export const meta = {
  num: 135,
  slug: "secure-hybrid-messaging-web",
  title: "Enhanced-security hybrid messaging infrastructure for web access",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/hybrid/secure-hybrid-messaging-web",
  category: "Hybrid",
  status: "done",
  otherDiagrams: ["img1-img4: AD FS and Conditional Access configuration screenshots"],
  substitutions: { "Microsoft Entra Connect": "entra-connect-sync", "Microsoft Entra ID": "entra-connect", "Exchange on-premises / Exchange Edge": "exchange-on-premises-access", "Exchange Online": "exchange-access", "Conditional Access policy": "conditional-access", "Multifactor authentication": "multi-factor-authentication", "Outlook on the web / ECP": "browser", "Outlook mobile access": "mobile" },
  differences: ["Active Directory, AD FS, WAP, Outlook access, Exchange users, Edge subscription, Microsoft 365 and On-premises drawn as labelled shapes.", "Diagonal step 6 (WAP to Exchange on-premises) drawn orthogonally."],
};

export function draw(k) {
  const { TINT, txt, card, box, arrow, step } = k;
  const S = 16;
  box("ad", 60, 40, 180, 70, "Active Directory", { fill: TINT.onprem, size: S });
  card("ec", 400, 20, 180, 110, "entra-connect-sync", "Microsoft Entra\nConnect", { size: S });
  card("eid", 1260, 40, 220, 110, "entra-connect", "Microsoft Entra ID", { size: S });
  box("adfs", 40, 310, 220, 90, "Active Directory\nFederation Services\n(AD FS)", { fill: TINT.onprem, size: S });
  box("wap", 560, 290, 200, 80, "Web Application\nProxy (WAP)", { fill: TINT.onprem, size: S });
  card("exop", 360, 440, 170, 110, "exchange-on-premises-access", "Exchange\non-premises", { size: S });
  box("edgesub", 115, 620, 120, 60, "Edge\nsubscription", { fill: TINT.badge, size: S });
  card("edge", 360, 700, 170, 110, "exchange-on-premises-access", "Exchange Edge\non-premises", { size: S });
  card("owa1", 640, 860, 190, 130, "browser", "Outlook on the web /\nExchange Control\nPanel access", { size: S });
  box("ol1", 860, 860, 130, 70, "Outlook\naccess", { fill: TINT.app, size: S });
  card("mob1", 1010, 860, 150, 110, "mobile", "Outlook\nmobile access", { size: S });
  box("u1", 820, 1010, 200, 70, "Exchange\non-premises user", { fill: TINT.onprem, size: S });
  box("m365", 1090, 230, 200, 80, "Microsoft 365", { fill: TINT.sub, size: 20 });
  card("exo", 1300, 440, 160, 110, "exchange-access", "Exchange\nOnline", { size: S });
  card("owa2", 1180, 860, 190, 130, "browser", "Outlook on the web /\nExchange Control\nPanel access", { size: S });
  box("ol2", 1390, 860, 130, 70, "Outlook\naccess", { fill: TINT.app, size: S });
  card("mob2", 1540, 860, 150, 110, "mobile", "Outlook\nmobile access", { size: S });
  box("u2", 1380, 1010, 170, 70, "Exchange\nOnline user", { fill: TINT.onprem, size: S });
  card("ca", 1740, 330, 170, 110, "conditional-access", "Conditional\nAccess policy", { size: S });
  card("mfa", 1700, 640, 180, 110, "multi-factor-authentication", "Multifactor\nauthentication", { size: S });
  box("onp", 280, 1000, 160, 70, "On-premises", { fill: TINT.onprem, size: S });
  arrow("sync1", "ad", "right", null, "ec", "left", 75, [], { dashed: true, tail: "arrow" });
  arrow("sync2", "ec", "right", 75, "eid", "left", 75, [], { dashed: true, tail: "arrow" });
  txt("sync-l", 820, 20, "Microsoft Entra Connect\nsynchronization", { size: S });
  arrow("a3", "ad", "bottom", 130, "adfs", "top", 130, [], { tail: "arrow" });
  arrow("a3b", "ad", "bottom", 170, "adfs", "top", 170, [], { dashed: true, tail: "arrow" });
  step("s3", 60, 190, 3);
  arrow("a2", "wap", "left", 310, "adfs", "right", 325, [], {});
  step("s2a", 330, 260, 2);
  arrow("a2d", "adfs", "right", 350, "wap", "left", 350, [], { dashed: true, tail: "arrow" });
  arrow("a2b", "exop", "top", 400, "adfs", "right", 385, [], {});
  step("s2b", 300, 395, 2);
  arrow("a6", "wap", "bottom", 580, "exop", "top", 500, [410], {});
  step("s6a", 600, 392, 6);
  arrow("edge-a", "exop", "bottom", 445, "edge", "top", 445, [], { dashed: true, tail: "arrow" });
  arrow("intra", "owa1", "top", 700, "exop", "right", 520, [], {});
  txt("intra-l", 545, 450, "https://mail.contoso\n.com/owa (user connects\nfrom intranet)", { size: S });
  step("s1a", 650, 700, 1);
  step("s6b", 650, 760, 6);
  arrow("inet", "owa1", "top", 760, "wap", "right", 340, [800], {});
  txt("inet-l", 800, 290, "https://mail.contoso.com/owa\n(user connects from internet)", { size: S });
  step("s1b", 810, 700, 1);
  arrow("cl", "owa2", "top", 1240, "exo", "left", 495, [], {});
  txt("cl-l", 1260, 640, "https://outlook.office.com/owa", { size: S });
  step("s1c", 1200, 720, 1);
  arrow("e2", "exo", "top", 1350, "eid", "bottom", 1350, [], {});
  step("s2c", 1290, 300, 2);
  arrow("e6", "eid", "bottom", 1410, "exo", "top", 1410, [], {});
  step("s6c", 1430, 300, 6);
  arrow("c3", "eid", "right", 60, "ca", "top", 1830, [], {});
  step("s3b", 1860, 160, 3);
  arrow("c4", "ca", "bottom", 1890, "mfa", "right", 700, [500, 1960], {});
  step("s4b", 1980, 560, 4);
  arrow("c5", "mfa", "top", 1740, "eid", "right", 110, [], {});
  step("s5b", 1680, 280, 5);
  arrow("a4", "adfs", "bottom", 245, "mfa", "bottom", 1760, [1130], {});
  step("s4a", 255, 800, 4);
  arrow("a5", "mfa", "bottom", 1850, "adfs", "bottom", 100, [1160], {});
  step("s5a", 50, 560, 5);
  txt("footer", 20, 1210, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Enhanced security in a web access scenario\"", { size: 20, color: "#495057" });
}
