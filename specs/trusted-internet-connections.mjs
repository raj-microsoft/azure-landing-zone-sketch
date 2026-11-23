// 098 Implement TIC 3.0 compliance (img0: Azure Firewall option).
export const meta = {
  num: 98,
  slug: "trusted-internet-connections",
  title: "Implement TIC 3.0 compliance",
  url: "https://learn.microsoft.com/azure/architecture/networking/architecture/trusted-internet-connections",
  category: "Networking",
  status: "done",
  otherDiagrams: ["img1: Azure Firewall uploads logs to CLAW", "img2-img4: Application Gateway, Front Door and third-party firewall variants"],
  substitutions: { "Subscription key glyph": "subscriptions", "Certificate": "app-service-certificates", "CLAW Registered app": "app-registrations", "Reader (service principal)": "users", "Event hub namespace": "event-hub-clusters", "Event hub": "event-hubs", "Alert on failed job": "alerts", "Diagnostic": "diagnostics-settings", "Azure Firewall table": "log-analytics-workspaces", "App service": "app-services", "Front Door with WAF": "front-door-and-cdn-profiles", "Third-party firewall": "firewalls" },
  differences: ["CLAW/TALON, Email and External users are labelled sketch shapes.", "Curved diagnostic-to-Log Analytics line and the CLAW dotted curve are drawn orthogonally.", "The footnote about FCEB/CISA is shortened into the footer."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, icon, arrow } = k;
  const S = 16;
  function sub(id, x, y, w, h, title) {
    group(id, x, y, w, h, null, { fill: TINT.sub });
    icon(`${id}-k`, "subscriptions", x + 10, y + 8, 40);
    txt(`${id}-lbl`, x + 60, y + 14, title, { size: 18 });
  }
  function rg(id, x, y, w, h, title) {
    group(id, x, y, w, h, null, { fill: TINT.white });
    icon(`${id}-i`, "resource-groups", x + 10, y + 10, 40);
    txt(`${id}-lbl`, x + 60, y + 18, title, { size: 16 });
  }
  txt("title", 40, 0, "TIC 3.0 compliance", { size: 28 });
  box("claw", 520, 50, 180, 80, "CLAW\nTALON", { size: 18, fill: TINT.onprem });
  box("email", 900, 50, 160, 80, "Email", { size: 18, fill: TINT.onprem });
  box("ext", 1330, 50, 200, 80, "External\nusers", { size: 18, fill: TINT.onprem, iconLeft: "users" });
  group("azure", 60, 170, 1740, 1110, null, { fill: TINT.white, dashed: true });
  icon("az-i", "azure-a", 1620, 185, 44);
  txt("az-lbl", 1680, 195, "Azure", { size: 20 });
  sub("s1", 130, 260, 940, 470, "Subscription");
  rg("rg1", 160, 320, 880, 380, "Resource group");
  card("cert", 190, 380, 150, 120, "app-service-certificates", "Certificate", { size: S });
  card("app", 190, 540, 150, 130, "app-registrations", "CLAW\nRegistered app", { size: S });
  group("ehns", 380, 380, 440, 300, null, { fill: TINT.data });
  icon("ehns-i", "event-hub-clusters", 395, 392, 40);
  txt("ehns-lbl", 445, 395, "Event hub namespace\nStandard", { size: 16 });
  card("reader", 400, 520, 150, 130, "users", "Reader", { size: S });
  card("eh", 620, 520, 150, 130, "event-hubs", "Event hub", { size: S });
  card("alert", 860, 520, 150, 130, "alerts", "Alert on\nfailed job", { size: S });
  sub("s2", 1150, 260, 620, 470, "Subscription");
  rg("rg2", 1180, 320, 560, 380, "Resource group");
  card("diag", 1220, 400, 160, 130, "diagnostics-settings", "Diagnostic", { size: S });
  card("fw", 1420, 400, 180, 130, "firewalls", "Azure Firewall", { size: S });
  group("alt", 1840, 300, 500, 330, null, { fill: TINT.white });
  txt("alt-lbl", 1880, 320, "Alternative layer 3 and\nlayer 7 firewall options", { size: 18 });
  card("agw", 1855, 420, 150, 160, "application-gateways", "Application\nGateway\nwith WAF", { size: S });
  card("afd", 2015, 420, 150, 160, "front-door-and-cdn-profiles", "Azure Front\nDoor\nwith WAF", { size: S });
  card("tpf", 2175, 420, 150, 160, "firewalls", "Third-party\nfirewall", { size: S });
  sub("s3", 130, 790, 940, 460, "Subscription");
  rg("rg3", 160, 850, 880, 370, "Resource group");
  group("law", 360, 920, 500, 270, null, { fill: TINT.data });
  icon("law-i", "log-analytics-workspaces", 375, 932, 40);
  txt("law-lbl", 425, 940, "Log Analytics workspace", { size: 16 });
  card("tbl", 520, 1020, 200, 140, "log-analytics-workspaces", "Azure Firewall\ntable", { size: S });
  sub("s4", 1150, 790, 620, 460, "Application subscription");
  rg("rg4", 1180, 850, 560, 370, "Application resource group");
  card("appsvc", 1420, 990, 180, 140, "app-services", "App service", { size: S });
  arrow("a-claw", "claw", "left", 90, "app", "left", 600, [100], { dashed: true });
  arrow("a-talon", "claw", "bottom", 660, "eh", "top", 660, [], { dashed: true });
  arrow("a-rd", "app", "right", 600, "reader", "left", 600, [], { dashed: true });
  arrow("a-re", "reader", "right", 600, "eh", "left", 600, [], { dashed: true });
  arrow("a-al", "alert", "left", 600, "eh", "right", 600, [], { dashed: true });
  arrow("a-em", "alert", "top", 960, "email", "bottom", 960, [], { dashed: true });
  arrow("a-tb", "tbl", "top", 650, "eh", "bottom", 650, [], { dashed: true });
  arrow("a-ext", "ext", "bottom", 1500, "fw", "top", 1500);
  arrow("a-alt", "alt", "left", 480, "fw", "right", 480);
  arrow("a-dg", "fw", "left", 465, "diag", "right", 465);
  arrow("a-lg", "diag", "bottom", 1250, "tbl", "right", 1110, [760, 1110], { color: "#868e96" });
  arrow("a-app", "fw", "bottom", 1510, "appsvc", "top", 1510);
  txt("footer", 40, 1310, "Pencil-sketch redraw of the Azure Architecture Center diagram \"TIC 3.0 compliance architecture\" (suggested configuration for CISA CLAW participation)", { size: 20, color: "#495057" });
}
