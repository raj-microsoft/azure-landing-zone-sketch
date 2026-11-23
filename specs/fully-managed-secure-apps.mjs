// 080 Securely managed web applications.
export const meta = {
  num: 80,
  slug: "fully-managed-secure-apps",
  title: "Securely managed web applications",
  url: "https://learn.microsoft.com/azure/architecture/example-scenario/apps/fully-managed-secure-apps",
  category: "Web",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Employee / Customers": "users", "On-premises gateway": "virtual-router", "ExpressRoute / site-to-site VPN": "connections", "VPN Gateway": "virtual-network-gateways", "ILB": "load-balancers", "App Service Environment": "app-service-environments", "Azure DevOps agent": "virtual-machine", "Azure DevOps": "azure-devops", "Azure SQL Database": "sql-database", "DDoS Protection": "ddos-protection-plans", "Internet": "globe-success", "Web Application Firewall": "web-application-firewall-policies-waf", "L7 load balancer": "application-gateways", "Azure virtual network": "virtual-networks" },
  differences: ["Subnet NSG shields are omitted."],
};

export function draw(k) {
  const { TINT, txt, card, box, group, arrow, both, icon } = k;
  const M = { size: 16 };
  txt("title", 40, 10, "Securely managed web applications", { size: 30 });

  group("onp", 40, 120, 560, 260, null, { fill: TINT.white, dashed: true, stroke: "#1971c2" });
  card("emp", 70, 160, 200, 170, "users", "Employee");
  card("gw", 360, 160, 200, 170, "virtual-router", "Gateway");
  arrow("e-g", "emp", "right", 245, "gw", "left", 245);
  txt("onp-lbl", 40, 400, "On-premises network\n192.168.0.0/16", { size: 18 });
  card("er", 680, 160, 200, 170, "connections", "ExpressRoute/\nsite-to-site VPN", M);

  group("vnet", 960, 80, 1860, 1240, null, { fill: TINT.white, dashed: true, stroke: "#1971c2" });
  icon("vnet-i", "virtual-networks", 2700, 1200, 56);
  txt("vnet-lbl", 2340, 1340, "Azure virtual network\n10.0.0.0/16", { size: 18 });

  group("gws", 1000, 110, 420, 400, "Gateway subnet\n10.0.255.224/27", { fill: TINT.sub, align: "center" });
  card("vpn", 1090, 200, 240, 200, "virtual-network-gateways", "VPN\nGateway");
  both("gw-er", "gw", "right", 245, "er", "left", 245);
  arrow("er-vpn", "er", "right", 245, "vpn", "left", 245);

  group("webs", 1460, 110, 620, 400, "Web tier subnet\n10.0.1.0/24", { fill: TINT.sub, align: "center" });
  card("ilb", 1490, 200, 140, 170, "load-balancers", "ILB", M);
  card("ase", 1680, 200, 360, 260, "app-service-environments", "App Service\nEnvironment");
  arrow("vpn-ilb", "vpn", "right", 285, "ilb", "left", 285);

  group("cis", 2120, 110, 520, 400, "CI/CD subnet\n10.0.2.0/24", { fill: TINT.sub, align: "center" });
  card("agent", 2180, 200, 400, 260, "virtual-machine", "Azure DevOps\nagent");
  arrow("ag-ase", "agent", "left", 330, "ase", "right", 330);
  card("ado", 2900, 160, 220, 180, "azure-devops", "Azure\nDevOps");
  both("ag-ado", "agent", "right", 250, "ado", "left", 250);
  card("sql", 2900, 560, 220, 180, "sql-database", "Azure SQL\nDatabase");
  arrow("ase-sql", "ase", "bottom", 1860, "sql", "left", 650, [650], { firstDir: "v", tail: "arrow" });
  txt("se-lbl", 2230, 560, "Virtual network\nservice endpoint", { size: 18 });

  card("ddos", 1000, 600, 220, 180, "ddos-protection-plans", "DDoS\nProtection");
  card("cust", 70, 820, 200, 170, "users", "Customers");
  card("inet", 560, 820, 200, 170, "globe-success", "Internet");
  arrow("c-i", "cust", "right", 905, "inet", "left", 905, [], { head: null });

  group("ags", 1300, 640, 880, 600, "Application Gateway subnet\n10.0.3.0/24", { fill: TINT.sub, align: "center" });
  group("agw", 1340, 760, 800, 440, "Application Gateway", { fill: TINT.white, align: "center" });
  card("waf", 1400, 840, 300, 260, "web-application-firewall-policies-waf", "Web Application\nFirewall");
  card("l7", 1780, 840, 300, 260, "application-gateways", "L7 load\nbalancer");
  arrow("i-ag", "inet", "right", 905, "agw", "left", 905);
  arrow("ag-ilb", "ags", "top", 1560, "ilb", "bottom", 1560);

  txt("footer", 40, 1420, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Securely managed web applications\"", { size: 20, color: "#495057" });
}
