// 028 Design a secure research environment for regulated data.
export const meta = {
  num: 28,
  slug: "secure-compute-for-research",
  title: "Design a secure research environment for regulated data",
  url: "https://learn.microsoft.com/azure/architecture/ai-ml/architecture/secure-compute-for-research",
  category: "AI + machine learning",
  status: "done",
  otherDiagrams: [],
  substitutions: { "Blob Storage": "storage-accounts", "Data Factory (Fabric orchestrator)": "data-factories", "Microsoft Power Platform": "power-platform", "Data Science VM": "virtual-machine", "Microsoft Entra ID": "entra-connect", "Microsoft Defender": "microsoft-defender-for-cloud", "UDR": "route-tables" },
  differences: [
    "Fabric Data Science, Microsoft Purview, Internet and the people have no sketch icon; they are plain labelled shapes.",
    "Private endpoints are compact cards on the connection lines.",
    "Lines that cross in the original are rerouted around groups.",
  ],
};

export function draw(k) {
  const { TINT, txt, box, card, group, step, arrow, line, both } = k;
  const pe = (id, x, y, l) => card(id, x, y, 170, 120, "private-endpoints", l, { size: 16 });
  txt("title", 60, 10, "Secure research environment for regulated data", { size: 30 });
  box("owner", 60, 140, 180, 80, "Data owner", { fill: TINT.onprem });
  box("appr", 60, 340, 180, 80, "Approver", { fill: TINT.onprem });
  group("ppz", 60, 560, 260, 230, "Microsoft Power\nPlatform", { fill: TINT.sub, size: 16 });
  card("pp", 90, 630, 200, 130, "power-platform", "Power Platform", { size: 16 });
  box("inet", 60, 1340, 180, 80, "Internet", { fill: TINT.onprem });
  box("res", 60, 1620, 180, 80, "Researcher", { fill: TINT.onprem });

  group("rg", 400, 60, 1600, 1840, null, { fill: TINT.white });
  txt("rg-t", 1820, 1860, "Resource group", { size: 16 });
  group("ing", 460, 100, 300, 200, "Data ingestion", { fill: TINT.sub, size: 16, align: "center" });
  card("bin", 490, 140, 240, 140, "storage-accounts", "Blob Storage");
  group("sec", 460, 560, 300, 230, "Secured data store", { fill: TINT.sub, size: 16, align: "center" });
  card("bsec", 490, 600, 240, 170, "storage-accounts", "Blob Storage\n(Private)");

  group("fab", 900, 100, 940, 560, "Fabric managed virtual network", { fill: TINT.mg, size: 18, align: "center" });
  pe("pe1", 930, 160, "Private endpoint:\nBlob Storage");
  pe("pe2", 930, 320, "Private endpoint:\nBlob Storage");
  pe("pe5", 930, 490, "Private endpoint:\nBlob Storage");
  card("adf", 1250, 200, 240, 170, "data-factories", "Data Factory\n(Orchestrator)");
  box("ds", 1250, 470, 240, 150, "Data Science\n(Fabric)", { fill: TINT.white });
  pe("pe8", 1620, 220, "Private endpoint:\nBlob Storage");

  group("egz", 2080, 100, 340, 340, "Egress (resource group)", { fill: TINT.white, size: 16 });
  card("beg", 2120, 170, 260, 170, "storage-accounts", "Blob Storage");

  group("amlz", 900, 740, 940, 300, "Azure Machine Learning managed virtual network", { fill: TINT.sub, size: 18, align: "center" });
  pe("pe5b", 930, 840, "Private endpoint:\nBlob Storage");
  card("aml", 1250, 820, 240, 180, "machine-learning", "Azure Machine\nLearning");
  pe("pekv", 1620, 840, "Private endpoint:\nKey Vault");
  card("kv", 2120, 820, 220, 160, "key-vaults", "Key vaults");

  group("vnet", 880, 1100, 980, 700, "NSG", { fill: TINT.mg, size: 18, iconName: "network-security-groups" });
  txt("vnet-lbl", 1700, 1775, "Virtual network", { size: 16 });
  pe("peaml", 1250, 1130, "Private endpoint:\nAML workspace");
  group("fwsn", 1180, 1290, 320, 200, "AzureFirewallSubnet", { fill: TINT.white, dashed: true, size: 16 });
  card("fw", 1240, 1330, 200, 140, "firewalls", "Azure Firewall");
  pe("pekv2", 1620, 1300, "Private endpoint:\nKey Vault");
  pe("peb3", 920, 1430, "Private endpoint:\nBlob Storage");
  group("avdsn", 900, 1570, 380, 200, "Subnet", { fill: TINT.white, dashed: true, size: 16 });
  card("avd", 960, 1600, 260, 150, "azure-virtual-desktop", "Azure Virtual Desktop");
  group("dssn", 1440, 1530, 400, 240, "Subnet (UDR)", { fill: TINT.white, dashed: true, size: 16, iconName: "route-tables", iconSize: 32 });
  card("dsvm", 1500, 1590, 280, 160, "virtual-machine", "Data Science\nvirtual machine");

  group("gov", 400, 1960, 1360, 220, "Security and governance", { fill: TINT.sub, size: 18, align: "center" });
  [["g-en", "entra-connect", "Microsoft\nEntra ID"], ["g-se", "azure-sentinel", "Microsoft\nSentinel"], ["g-de", "microsoft-defender-for-cloud", "Microsoft\nDefender"], ["g-po", "policy", "Azure\nPolicy"], ["g-mo", "monitor", "Azure\nMonitor"]]
    .forEach(([id, ic, l], i) => card(id, 430 + i * 215, 2010, 195, 150, ic, l, { size: 16 }));
  box("g-pv", 1505, 2010, 230, 150, "Microsoft\nPurview", { fill: TINT.white, size: 16 });

  arrow("f1", "owner", "right", 180, "bin", "left", 180); step("s1", 300, 130, 1);
  arrow("f2a", "pe1", "left", 220, "bin", "right", 220);
  line("f2b", "adf", "left", 230, "pe1", "right", 230); step("s2", 1140, 165, 2);
  line("f2c", "adf", "left", 330, "pe2", "right", 380, [1200]); step("s2b", 1140, 400, 2);
  arrow("f2d", "pe2", "left", 380, "sec", "top", 700, [700]);
  line("f5a", "ds", "left", 550, "pe5", "right", 550); step("s5", 1140, 560, 5);
  arrow("f5b", "pe5", "left", 550, "sec", "right", 620, [820]);
  arrow("f7", "appr", "right", 360, "adf", "left", 290, [850]); step("s7", 300, 280, 7);
  line("f8a", "adf", "right", 285, "pe8", "left", 285); step("s8", 1540, 220, 8);
  arrow("f8b", "pe8", "right", 285, "beg", "left", 285);
  line("f6", "pp", "right", 695, "bsec", "left", 695); step("s6", 330, 640, 6);
  line("f5c", "aml", "left", 900, "pe5b", "right", 900); step("s5b", 1150, 860, 5);
  arrow("f5d", "pe5b", "left", 900, "sec", "right", 740, [840]);
  line("amlkv", "aml", "right", 900, "pekv", "left", 900);
  arrow("amlkv2", "pekv", "right", 900, "kv", "left", 900);
  line("aml-pe", "aml", "bottom", 1400, "peaml", "top", 1400);
  line("pe-fw", "peaml", "bottom", 1400, "fw", "top", 1400); step("s4", 1200, 1240, 4);
  arrow("fw-in", "fw", "left", 1400, "inet", "right", 1380, [1140, 1380]);
  both("fw-kv", "pekv2", "right", 1360, "kv", "bottom", 2230, [2230]);
  line("fw-pekv2", "fw", "right", 1360, "pekv2", "left", 1360);
  arrow("f3", "res", "right", 1660, "avd", "left", 1660); step("s3", 560, 1610, 3);
  arrow("f4", "avd", "right", 1675, "dsvm", "left", 1675); step("s4b", 1340, 1630, 4);
  arrow("dsfw", "dsvm", "top", 1600, "fw", "right", 1440, [1560]);
  line("dspe", "dsvm", "left", 1720, "peb3", "bottom", 1005, [1400, 1560]);
  arrow("pebs", "peb3", "left", 1490, "bsec", "bottom", 560, [560]);

  txt("footer", 60, 2220, "Pencil-sketch redraw of the Azure Architecture Center diagram \"Design a secure research environment for regulated data\"", { size: 20, color: "#495057" });
}
